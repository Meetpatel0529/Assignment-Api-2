/**
 * File: models/Recipe.js
 * Author: Your Name
 * Student ID: 12345678
 * Date: 2025-02-22
 * Description: Mongoose model for recipes.
 */

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], default: [] },
  instructions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
