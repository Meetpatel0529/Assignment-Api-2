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
    console.log("Register attempt for:", email); // Debugging
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists"); // Debugging
      return res.status(400).json({ error: 'User already exists.' });
    }
    
    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password // Do NOT hash here, let `User.js` handle it
    });
    await newUser.save();
    
    console.log("User registered successfully!"); // Debugging
    res.status(201).json({ message: 'User registered successfully!', user: { _id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error("Registration error:", error); // Debugging
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
    console.log("Login attempt for:", email);  // Debugging

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");  // Debugging
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    console.log("User found:", user);  // Debugging

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");  // Debugging
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("Login successful!");  // Debugging
    res.status(200).json({ message: 'Login successful.', token, userId: user._id });
  } catch (error) {
    console.error("Login error:", error);  // Debugging
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

module.exports = {
  registerUser: exports.registerUser,
  loginUser: exports.loginUser,
  logoutUser: exports.logoutUser
};

