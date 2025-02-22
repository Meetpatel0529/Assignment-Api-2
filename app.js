/**
 * File: app.js
 * Author: Your Name
 * Student ID: 12345678
 * Date: 2025-02-22
 * Description: Main application file for Recipe API Assignment 2.
 */

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
