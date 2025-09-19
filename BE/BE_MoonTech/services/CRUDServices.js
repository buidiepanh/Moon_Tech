const Products = require("../models/product");
const Categories = require("../models/category");
const Carts = require("../models/cart");
const Brands = require("../models/brand");
const Users = require("../models/user");
const Orders = require("../models/order");
const ShippingAddresses = require("../models/shippingAddress");

//==================Product API================
const getAllProducts = async (req, res, next) => {
  try {
    const result = await Products.find({})
      .populate("category", "cateName")
      .populate("brand", "brandName");

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
      const brandId = req.body.brand;

      if (!result) {
        res.status(400).json("Cannot add product!");
        return null;
      }
      await Categories.findByIdAndUpdate(cateId, {
        $push: { products: result._id },
      });
      await Brands.findByIdAndUpdate(brandId, {
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

//=================Category API================
const getAllCategory = async (req, res, next) => {
  try {
    const result = await Categories.find({}).populate("products", "name");

    if (!result) {
      res.status(404).json("No category found!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Categories.create(req.body);

      if (!result) {
        res.status(400).json("Cannot add product!");
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

const updateCategory = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Categories.findByIdAndUpdate(
        req.params.categoryId,
        { $set: req.body },
        { new: true }
      );

      if (!result) {
        res.status(400).json("Cannot update category!");
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

const deleteCategory = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Categories.findByIdAndDelete(req.params.categoryId);

      if (!result) {
        res.status(400).json("Cannot delete category!");
        return null;
      }
      return res.status(200).json("Delete category success!");
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

//==================Cart API=====================
const getUserCartItem = async (req, res, next) => {
  try {
    const result = await Carts.findOne({ user: req.user._id }).populate(
      "cartItem.product",
      "name price"
    );

    if (!result) {
      res.status(400).json("User cart is empty!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewCart = async (req, res, next) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Carts.findOne({ user: req.user._id });

    if (!cart) {
      const result = await Carts.create({
        user: req.user._id,
        cartItem: [{ product, quantity }],
      });

      if (result) {
        return res.status(200).json(result);
      } else {
        res.status(400).json("Cannot add item to cart!");
        return null;
      }
    } else {
      const existedItem = cart.cartItem?.findIndex(
        (item) => item.product.toString() === product.toString()
      );
      if (existedItem > -1) {
        cart.cartItem[existedItem].quantity += 1;
      } else {
        cart.cartItem.push({ product, quantity });
      }
    }

    await cart.save();
    return res.status(200).json("Update cart success!");
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Carts.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json("Cart not found!");
    }

    const productId = req.params.itemId;
    if (!productId) {
      return res.status(400).json("Product ID is required");
    }

    const index = cart.cartItem.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (index === -1) {
      return res.status(404).json("Product not found in cart!");
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json("Quantity must be at least 1");
    }

    cart.cartItem[index].quantity = quantity;
    await cart.save();

    return res.status(200).json("Update item quantity success!");
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const product = req.params.itemId;
    if (!product) {
      return res.status(400).json("Product ID is required");
    }

    const cart = await Carts.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    const selectedItem = cart.cartItem.findIndex(
      (item) => item.product.toString() === product.toString()
    );
    if (selectedItem === -1) {
      return res.status(404).json("Product not found in cart!");
    }

    cart.cartItem.splice(selectedItem, 1);
    await cart.save();

    return res.status(200).json("Delete item success!");
  } catch (error) {
    next(error);
  }
};

//==================Brand API====================
const getAllBrand = async (req, res, next) => {
  try {
    const result = await Brands.find({}).populate("products", "name");

    if (!result) {
      res.status(404).json("No brand found!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewBrand = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Brands.create(req.body);

      if (!result) {
        res.status(400).json("Cannot add brand!");
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

const updateBrand = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Brands.findByIdAndUpdate(
        req.params.brandId,
        { $set: req.body },
        { new: true }
      );

      if (!result) {
        res.status(400).json("Cannot update brand!");
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

const deleteBrand = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Brands.findByIdAndDelete(req.params.brandId);

      if (!result) {
        res.status(400).json("Cannot delete brand!");
        return null;
      }
      return res.status(200).json("Delete brand success!");
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

//====================User API=====================
const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Users.find({});

      if (!result) {
        res.status(404).json("No user found!");
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

const getAuthenticatedUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      res.status(404).json("User not found!");
      return null;
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await Users.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update user's information!");
      return null;
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.admin) {
      const result = await Users.findByIdAndDelete(req.params.userId);

      if (!result) {
        res.status(400).json("Cannot delete this user!");
        return null;
      }
      return res.status(200).json("Delete user success!");
    } else {
      return res.status(401).json("You don't have permisson to do this!");
    }
  } catch (error) {
    next(error);
  }
};

//====================Order API=======================
const getAllUserOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({ user: req.user._id });

    if (!orders) {
      res.status(400).json("No orders found!");
      return null;
    }

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const addNewOrder = async (req, res, next) => {
  try {
    const result = await Orders.create(req.body);

    if (!result) {
      res.status(400).json("Cannot add order!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const result = await Orders.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!result) {
      res.status(400).json("Cannot update order status!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//===================Shipping Address API=============
const getAllUserAddresses = async (req, res, next) => {
  try {
    const result = await ShippingAddresses.find({ user: req.user._id });

    if (!result) {
      res.status(400).json("No address found!");
      return null;
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewAddress = async (req, res, next) => {
  try {
    const userId = req.body.user;
    const result = await ShippingAddresses.create(req.body);

    if (!result) {
      res.status(400).json("Cannot add address!");
      return null;
    }

    await Users.findByIdAndUpdate(userId, {
      $push: { shippingAddress: result._id },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUserAddress = async (req, res, next) => {
  try {
    const { isDefault } = req.body;

    if (isDefault) {
      await ShippingAddresses.updateMany(
        { user: req.user._id, _id: { $ne: req.params.addressId } },
        { $set: { isDefault: false } }
      );
    }
    const result = await ShippingAddresses.findByIdAndUpdate(
      req.params.addressId,
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update user's address!");
      return null;
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUserAddress = async (req, res, next) => {
  try {
    const response = await ShippingAddresses.findByIdAndDelete(
      req.params.addressId
    );

    if (!response) {
      res.status(400).json("Cannot delete address!");
      return null;
    }
    return res.status(200).json("Delete address success!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,

  getAllCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,

  getUserCartItem,
  addNewCart,
  updateCartItem,
  deleteCartItem,

  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,

  getAllUsers,
  getAuthenticatedUser,
  updateUser,
  deleteUser,

  getAllUserOrders,
  addNewOrder,
  updateOrderStatus,

  getAllUserAddresses,
  addNewAddress,
  updateUserAddress,
  deleteUserAddress,
};
