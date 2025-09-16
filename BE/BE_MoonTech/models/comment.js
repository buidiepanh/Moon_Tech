const { Schema, default: mongoose } = require("mongoose");

var commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
