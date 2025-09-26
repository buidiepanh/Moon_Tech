const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getProductComments,
  addNewComment,
  deleteComment,
  updateComment,
} = require("../services/CRUDServices");

const commentRouter = express.Router();
commentRouter.use(bodyParser.json());
commentRouter.use(authenticate);

commentRouter.route("").get(getProductComments).post(addNewComment);
commentRouter.route("/:commentId").put(updateComment).delete(deleteComment);

module.exports = commentRouter;
