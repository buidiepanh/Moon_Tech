const { Schema, default: mongoose } = require("mongoose");

var commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
