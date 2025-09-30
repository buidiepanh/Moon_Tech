const { Schema, mongo, default: mongoose } = require("mongoose");

const shippingAddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["HoChiMinh", "CanTho", "QuyNhon", "HaNoi", "DaNang"],
    default: "HoChiMinh",
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

shippingAddressSchema.index(
  { user: 1, isDefault: 1 },
  { unique: true, partialFilterExpression: { isDefault: true } }
);

const ShippingAddresses = mongoose.model(
  "shippingAddresses",
  shippingAddressSchema
);
module.exports = ShippingAddresses;
