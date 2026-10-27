const express = require("express");
const upload = require("../Middleware/uploadMiddleware");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const {
  postRecipe,
  getRecipes,
  getMyRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../Controller/RecipeController");
const {
  getOneRecipeValidation,
  creatRecipeValidation,
  updateRecipeValidation,
  deleteRecipeValidation,
} = require("../utils/validator/recipeValidator");
// api/recipe
router

  .route("/")
  .post(
    verifyToken,
    upload.single("coverImage"),
    creatRecipeValidation,
    postRecipe,
  )
  .get(getRecipes);
router.route("/my-recipes").get(verifyToken, getMyRecipes);
router
  .route("/:Id")
  .get(getOneRecipeValidation, getRecipe)
  .put(
    verifyToken,
    upload.single("coverImage"),
    updateRecipeValidation,
    updateRecipe,
  )
  .delete(verifyToken, deleteRecipeValidation, deleteRecipe);
module.exports = router;
