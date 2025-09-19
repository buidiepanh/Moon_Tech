const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllUsers,
  getAuthenticatedUser,
  updateUser,
  deleteUser,
} = require("../services/CRUDServices");

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(authenticate);

userRouter.route("/").get(getAllUsers);
userRouter.route("/authenticatedUser").get(getAuthenticatedUser);
userRouter.route("/:userId").put(updateUser).delete(deleteUser);

module.exports = userRouter;
