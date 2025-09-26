var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var authenRouter = require("./routes/authenRouter");
var productRouter = require("./routes/productRouter");
var categoryRouter = require("./routes/categoryRouter");
var brandRouter = require("./routes/brandRouter");
var cartRouter = require("./routes/cartRouter");
var orderRouter = require("./routes/orderRouter");
var userRouter = require("./routes/userRouter");
var addressRouter = require("./routes/adressRouter");
var commentRouter = require("./routes/commentRouter");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/authen", authenRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/shippingAddress", addressRouter);
app.use("/api/v1/comments", commentRouter);

module.exports = app;
