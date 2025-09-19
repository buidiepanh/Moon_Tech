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
    gender: {
      type: String,
      enum: ["male, female, other"],
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
        type: Schema.Types.ObjectId,
        ref: "shippingAddresses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
