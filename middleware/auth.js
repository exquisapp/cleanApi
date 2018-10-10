const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, config.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};