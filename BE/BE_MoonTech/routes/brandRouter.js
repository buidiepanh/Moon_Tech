const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} = require("../services/CRUDServices");

const brandRouter = express.Router();
brandRouter.use(bodyParser.json());
brandRouter.use(authenticate);

brandRouter.route("/").get(getAllBrand).post(addNewBrand);
brandRouter.route("/:brandId").put(updateBrand).delete(deleteBrand);

module.exports = brandRouter;
