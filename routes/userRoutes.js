const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

if (!userController.registerUser || !userController.loginUser || !userController.logoutUser) {
  console.error("Error: userController functions are not properly imported.");
}

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
