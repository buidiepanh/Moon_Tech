const express = require("express");
const bodyparser = require("body-parser");
const {
  getAllproducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const productRouter = express.Router();
productRouter.use(bodyparser.json());
productRouter.use(authenticate);

productRouter.route("/").get(getAllproducts).post(addNewProduct);
productRouter.route("/:productId").put(updateProduct).delete(deleteProduct);

module.exports = productRouter;
