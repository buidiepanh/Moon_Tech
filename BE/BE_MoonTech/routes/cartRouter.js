const express = require("express");
const bodyparser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getUserCartItem,
  addNewCart,
  updateCartItem,
  deleteCartItem,
} = require("../services/CRUDServices");

const cartRouter = express.Router();
cartRouter.use(bodyparser.json());
cartRouter.use(authenticate);

cartRouter.route("/").get(getUserCartItem).post(addNewCart);
cartRouter.route("/:itemId").put(updateCartItem).delete(deleteCartItem);

module.exports = cartRouter;
