const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

module.exports = {
    register: function(req, res, next) {
        User.find({ email: req.body.email }).exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({ message: 'The user already exist'})
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) return res.status(500).json({ error: err });
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({ message: 'User was created' });
                                next();
                            })
                            .catch(err => {
                                res.status(500).json({ error: err });
                                next();
                            })
                    });
                }
            })
    },
    login: function(req, res, next) {
        User.findOne({ email: req.body.email }).exec()
            .then(user => {
                if (!user) return res.status(401).json({ message: 'Authentication failed' });
                bcrypt.compare(req.body.password, user.password, (err, data) => {
                    if (err) return res.status(401).json({ message: 'Authentication failed' });
                    if (data) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }, 
                        config.env.JWT_SECRET,
                        {
                            expiresIn: "1h"
                        }
                        )
                        return res.status(200).json({ message: 'Authentication successful', token: token });
                    }
                    res.status(401).json({ message: 'Authentication failed' });
                })
            })
            .catch(err => {
                res.status(500).json({ error: err });
                next();
            })
    }
}