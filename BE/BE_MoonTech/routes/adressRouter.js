const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllUserAddresses,
  addNewAddress,
  updateUserAddress,
  deleteUserAddress,
} = require("../services/CRUDServices");

const addressRouter = express.Router();
addressRouter.use(bodyParser.json());
addressRouter.use(authenticate);

addressRouter.route("/").get(getAllUserAddresses).post(addNewAddress);
addressRouter
  .route("/:addressId")
  .put(updateUserAddress)
  .delete(deleteUserAddress);

module.exports = addressRouter;
