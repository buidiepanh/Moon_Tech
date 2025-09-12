const Products = require("../models/product");
const Categories = require("../models/category");

//==================CRUD Product==============
const getAllproducts = async (req, res, next) => {
  try {
    const result = await Products.find({}).populate("category", "cateName");

    if (!result) {
      res.status(404).json("No product found!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Products.create(req.body);
      const cateId = req.body.category;

      if (!result) {
        res.status(400).json("Cannot add product!");
        return null;
      }
      await Categories.findByIdAndUpdate(cateId, {
        $push: { products: result._id },
      });
      return res.status(200).json(result);
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Products.findByIdAndUpdate(
        req.params.productId,
        { $set: req.body },
        { new: true }
      );

      if (!result) {
        res.status(400).json("Cannot update product!");
        return null;
      }

      return res.status(200).json(result);
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Products.findByIdAndDelete(req.params.productId);

      if (!result) {
        res.status(400).json("Cannot delete product!");
        return null;
      }
      return res.status(200).json("Delete product success!");
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllproducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
