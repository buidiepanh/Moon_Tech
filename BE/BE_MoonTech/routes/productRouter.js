const express = require("express");
const bodyparser = require("body-parser");

const productRouter = express.Router();
productRouter.use(bodyparser.json());

productRouter.route("/").get().post();
productRouter.route("/:productId").put().delete();

module.exports = productRouter;
