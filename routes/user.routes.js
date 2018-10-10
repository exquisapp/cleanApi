const express = require('express');
const router = express.Router();

const userAuth = require('../controllers/user.controller');

module.exports = router;

// Authentication routes
router.post('/signup', userAuth.register);
router.post('/login', userAuth.login);
