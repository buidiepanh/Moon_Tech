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

categoryRouter
  .route("/")
  .get(getAllCategory)
  .post(authenticate, addNewCategory);

categoryRouter
  .route("/:categoryId")
  .put(authenticate, updateCategory)
  .delete(authenticate, deleteCategory);

module.exports = categoryRouter;
