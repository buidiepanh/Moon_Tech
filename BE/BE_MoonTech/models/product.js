const { Schema, default: mongoose } = require("mongoose");

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Price must above 0 dong"],
    },
    image: {
      type: String,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
