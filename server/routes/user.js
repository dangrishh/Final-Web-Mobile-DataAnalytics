const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


// Define routes and link them to controller functions
router.post('/login', userController.login);
router.post('/forget-password', userController.forgetPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/signup', userController.signup);

// Define a protected route
router.get('/protected-route', userController.authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route!' });
});

module.exports = router;

