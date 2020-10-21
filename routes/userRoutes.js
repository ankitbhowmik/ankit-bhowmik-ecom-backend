const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signup', userController.signUp_post);

router.post('/login', userController.login_post);

router.get('/logout', userController.logout);

router.get('/verify-token', userController.verifyToken);

module.exports = router;