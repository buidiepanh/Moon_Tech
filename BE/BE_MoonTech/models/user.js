const { Schema, default: mongoose } = require("mongoose");

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+84|84|0)[35789]\d{8}$/.test(v);
        },
        message: "Invalid phone number format",
      },
    },
    male: {
      type: String,
      enum: ["Male, Female, Other"],
      required: true,
    },
    avatar: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    shippingAddress: [
      {
        address: {
          type: String,
        },
        city: {
          type: String,
          enum: ["HoChiMinh", "CanTho", "QuyNhon", "HaNoi", "DaNang"],
          default: "HoChiMinh",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
