const express = require("express");
const bodyparser = require("body-parser");
const {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const productRouter = express.Router();
productRouter.use(bodyparser.json());

productRouter.route("/").get(getAllProducts).post(authenticate, addNewProduct);
productRouter
  .route("/:productId")
  .put(authenticate, updateProduct)
  .delete(authenticate, deleteProduct);

module.exports = productRouter;
