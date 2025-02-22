/**
 * File: controllers/recipeController.js
 * Author: Your Name
 * Student ID: 12345678
 * Date: 2025-02-22
 * Description: Controller for handling recipe CRUD operations.
 */

const Recipe = require('../models/Recipe');

/**
 * Get all recipes.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving recipes.' });
  }
};

/**
 * Get a recipe by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the recipe.' });
  }
};

/**
 * Create a new recipe.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the recipe.' });
  }
};

/**
 * Update an existing recipe.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the recipe.' });
  }
};

/**
 * Delete a recipe.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the recipe.' });
  }
};
