const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllUserOrders,
  addNewOrder,
  updateOrderStatus,
  deleteAllOrders,
} = require("../services/CRUDServices");
const { createVNPayUrl, vnpayReturn } = require("../services/paymentServices");

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());
orderRouter.use(authenticate);

orderRouter
  .route("/")
  .get(getAllUserOrders)
  .post(addNewOrder)
  .delete(deleteAllOrders);
orderRouter.route("/:orderId").put(updateOrderStatus);
orderRouter.route("/create-payment").post(createVNPayUrl);
orderRouter.route("/vnpay-return").get(vnpayReturn);

module.exports = orderRouter;
