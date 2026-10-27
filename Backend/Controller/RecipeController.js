const Recipe = require("../models/RecipeSchema");
const api = require("./handlersFactory");
// desc    Create a new Recipe
//  route   POST /api/recipe
// @access
module.exports.postRecipe = api.post(Recipe);
// desc    Get recipe
//  route   GET /api/recipe
// @access
module.exports.getRecipes = api.getAll(Recipe);
// desc    Get recipe with user
//  route   GET /api/recipe/my-recipes
// @access
module.exports.getMyRecipes = api.getMyRecipes(Recipe);
// desc    Get recipe
//  route   Get /api/recipe/:Id
// @access
module.exports.getRecipe = api.getOne(Recipe);
// desc    UPDATE a new recipe
//  route   Put /api/recipe/:Id
// @access
module.exports.updateRecipe = api.update(Recipe);
// desc    DELETE a new recipe
//  route   DELETE /api/recipe/:Id
// @access
module.exports.deleteRecipe = api.delete(Recipe);
