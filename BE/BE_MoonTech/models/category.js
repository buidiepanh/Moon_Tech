const { Schema, default: mongoose } = require("mongoose");

var categorySchema = new Schema(
  {
    cateName: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;
