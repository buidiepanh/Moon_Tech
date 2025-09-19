const express = require("express");
const bodyparser = require("body-parser");
const { loginUser, registerUser } = require("../services/AuthenServices");

const authenRouter = express.Router();
authenRouter.use(bodyparser.json());

authenRouter.route("/login").post(loginUser);
authenRouter.route("/register").post(registerUser);

module.exports = authenRouter;
