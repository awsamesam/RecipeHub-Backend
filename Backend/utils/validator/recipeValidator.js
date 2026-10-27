const { body, param } = require("express-validator");

const {
  validationMiddleware,
} = require("../../Middleware/validationMiddleware");

const getOneRecipeValidation = [
  param("Id").isMongoId().withMessage("Invalid Recipe format"),
  validationMiddleware,
];
const creatRecipeValidation = [
  body("title").notEmpty().withMessage("recipe title is required"),
  body("ingredients").notEmpty().withMessage("recipe ingredients is required"),
  body("instructions")
    .notEmpty()
    .withMessage("recipe instructions is required"),
  body().custom((value, { req }) => {
    if (!req.file) {
      throw new Error("recipe coverImage is required");
    }
    return true;
  }),
  validationMiddleware,
];
const updateRecipeValidation = [
  param("Id").isMongoId().withMessage("Invalid Recipe format"),
  validationMiddleware,
];
const deleteRecipeValidation = [
  param("Id").isMongoId().withMessage("Invalid Recipe format"),
  validationMiddleware,
];
module.exports = {
  getOneRecipeValidation,
  creatRecipeValidation,
  updateRecipeValidation,
  deleteRecipeValidation,
};
