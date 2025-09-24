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

brandRouter.route("/").get(getAllBrand).post(authenticate, addNewBrand);

brandRouter
  .route("/:brandId")
  .put(authenticate, updateBrand)
  .delete(authenticate, deleteBrand);

module.exports = brandRouter;
