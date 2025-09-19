const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllUserOrders,
  addNewOrder,
  updateOrderStatus,
} = require("../services/CRUDServices");

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());
orderRouter.use(authenticate);

orderRouter.route("/").get(getAllUserOrders).post(addNewOrder);
orderRouter.route("/:orderId").put(updateOrderStatus);

module.exports = orderRouter;
