const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();

router.get('/', userController.home);

router.post('/create', userController.create);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/delete', userController.delete);

module.exports = router;