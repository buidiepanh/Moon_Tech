const { Schema, default: mongoose } = require("mongoose");

var cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    cartItem: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Carts = mongoose.model("Carts", cartSchema);
module.exports = Carts;
