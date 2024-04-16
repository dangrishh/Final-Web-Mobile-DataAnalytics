const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getHome); // Home page

router.get('/dashboard', userController.authentication, userController.getDashboard); // Secret page (requires authentication)

router.route('/register')
    .get(userController.getRegister) // Register form
    .post(userController.postRegister); // Handle user signup

router.route('/login')
    .get(userController.getLogin) // Login form
    .post(userController.postLogin); // Handle user login

    
router.get('/logout', userController.logout); // Logout

module.exports = router;
