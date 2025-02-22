/**
 * File: controllers/userController.js
 * Author: Your Name
 * Student ID: 12345678
 * Date: 2025-02-22
 * Description: Controller for handling user authentication operations.
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Register a new user.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering the user.' });
  }
};

/**
 * Login a user.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    
    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Login successful.', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in the user.' });
  }
};

/**
 * Logout a user.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: 'Logout successful.' });
};

// Ensure .env configurations are properly loaded
console.log("Connected to MongoDB URI:", process.env.MONGODB_URI);


// middleware/authMiddleware.js
/**
 * Middleware to authenticate JWT tokens.
 */
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
