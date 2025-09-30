const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getTotalRevenue,
  getMonthlyRevenue,
  getMonthRevenue,
  getAverageMoneyEachOrder,
  getCategoryMoney,
} = require("../services/CRUDServices");

const revenueRouter = express.Router();
revenueRouter.use(bodyParser.json());
revenueRouter.use(authenticate);

revenueRouter.route("/total-revenue").get(getTotalRevenue);
revenueRouter.route("/monthly-revenue").get(getMonthlyRevenue);
revenueRouter.route("/month-revenue").get(getMonthRevenue);
revenueRouter.route("/average-revenue").get(getAverageMoneyEachOrder);
revenueRouter.route("/category-revenue").get(getCategoryMoney);

module.exports = revenueRouter;
