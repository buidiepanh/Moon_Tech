const { Schema, default: mongoose } = require("mongoose");

var orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: {
      type: Schema.Types.ObjectId,
      ref: "Carts",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "shippingAddresses",
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
