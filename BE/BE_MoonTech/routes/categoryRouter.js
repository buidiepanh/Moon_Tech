const authenticate = require("../middleware/authenticate");
const express = require("express");
const bodyparser = require("body-parser");
const {
  getAllCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
} = require("../services/CRUDServices");

const categoryRouter = express.Router();
categoryRouter.use(bodyparser.json());
categoryRouter.use(authenticate);

categoryRouter.route("/").get(getAllCategory).post(addNewCategory);
categoryRouter.route("/:categoryId").put(updateCategory).delete(deleteCategory);

module.exports = categoryRouter;
