const { body } = require("express-validator");

const {
  validationMiddleware,
} = require("../../Middleware/validationMiddleware");

const creatUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("user password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationMiddleware,
];
const loginUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("user password is required"),
  validationMiddleware,
];
const resetPasswordValidation = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationMiddleware,
];
module.exports = {
  creatUserValidation,
  loginUserValidation,
  resetPasswordValidation,
};
