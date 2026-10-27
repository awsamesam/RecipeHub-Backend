const express = require("express");
const Router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  addfavourites,
  getMyFavourites,
} = require("../Controller/UserController");
const {
  creatUserValidation,
  loginUserValidation,
  resetPasswordValidation,
} = require("../utils/validator/userValidator");
Router.route("/register").post(creatUserValidation, register);
Router.route("/login").post(loginUserValidation, login);
Router.route("/forgot-password").post(forgotPassword);
Router.route("/reset-password/:token").post(resetPasswordValidation,resetPassword);
Router.route("/favourites").get(verifyToken, getMyFavourites);
Router.route("/favourites/:id").post(verifyToken, addfavourites);
module.exports = Router;
