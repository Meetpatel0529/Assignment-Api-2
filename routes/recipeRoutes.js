/**
 * File: routes/recipeRoutes.js
 * Author: Your Name
 * Student ID: 12345678
 * Date: 2025-02-22
 * Description: Routes for recipe CRUD operations.
 */

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET /api/recipes - List all recipes
router.get('/', recipeController.getAllRecipes);

// GET /api/recipes/:id - Get a single recipe by ID
router.get('/:id', recipeController.getRecipeById);

// POST /api/recipes - Create a new recipe
router.post('/', recipeController.createRecipe);

// PUT /api/recipes/:id - Update an existing recipe
router.put('/:id', recipeController.updateRecipe);

// DELETE /api/recipes/:id - Delete a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
