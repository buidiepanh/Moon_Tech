const { Schema, default: mongoose } = require("mongoose");

const brandSchema = new Schema(
  {
    brandName: {
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

const Brands = mongoose.model("Brands", brandSchema);
module.exports = Brands;
