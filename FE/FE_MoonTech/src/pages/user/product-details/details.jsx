import React, { useEffect, useState } from "react";
import {
  Card,
  Rate,
  Button,
  Badge,
  Avatar,
  Divider,
  Tag,
  InputNumber,
  Tabs,
  Space,
  Input,
  Form,
  message,
  Spin,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  StarFilled,
  UserOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import {
  addNewComment,
  addToCart,
  getAllProductComments,
  getAllProducts,
  getAuthenticatedUser,
  isPaidProduct,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

const { TabPane } = Tabs;
const { TextArea } = Input;

function Details() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    fetchProductInfo();
  }, [productId]);

  const fetchProductInfo = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();
      const res1 = await isPaidProduct(productId);
      const res2 = await getAllProductComments(productId);
      const p = res.find(
        (item) => item._id.toString() === productId.toString()
      );
      setProduct(p);
      setIsPaid(res1);
      setComments(res2);
    } catch (error) {
      console.log(error);
      message.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthenticatedUser = async () => {
    try {
      const res = await getAuthenticatedUser();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const payload = {
        product: productId,
        quantity: quantity,
      };
      const res = await addToCart(payload);

      if (!res) {
        toast.error("Add product to cart failed!");
      } else {
        toast.success("Add product to cart success!");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const handleReviewSubmit = async (values) => {
    try {
      const payload = {
        author: user._id,
        product: productId,
        content: values.content,
      };
      const res = await addNewComment(payload);

      if (!res) {
        toast.error("Cannot post this comment!");
      } else {
        toast.success("Comment posted success!");
        fetchProductInfo();
      }
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit review. Please try again.");
    }
  };

  const calculateOriginalPrice = (price, salePercentage) => {
    if (!salePercentage) return null;
    return Math.round(price / (1 - salePercentage / 100));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const originalPrice = calculateOriginalPrice(product.price, product.sale);
  const savings = originalPrice ? originalPrice - product.price : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
              variants={imageVariants}
              whileHover="hover"
            >
              {product.sale > 0 && (
                <Badge.Ribbon
                  text={`${product.sale}% OFF`}
                  color="red"
                  className="text-sm font-bold"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 lg:h-[500px] object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/500x500?text=No+Image";
                    }}
                  />
                </Badge.Ribbon>
              )}
              {product.sale === 0 && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/500x500?text=No+Image";
                  }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Tag color="red" className="px-3 py-1 text-sm font-medium">
                  {product.category?.cateName || "General"}
                </Tag>
                {product.brand?.brandName && (
                  <Tag color="blue" className="px-3 py-1 text-sm font-medium">
                    {product.brand.brandName}
                  </Tag>
                )}
              </div>
              <motion.h1
                className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                {product.name}
              </motion.h1>
            </div>

            {/* Rating & Reviews */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <Rate
                disabled
                defaultValue={product.rating || 0}
                className="text-red-500"
                allowHalf
              />
              <span className="text-lg font-semibold text-gray-700">
                {product.rating || 0}
              </span>
              <span className="text-gray-500">
                ({product.review?.length || 0} reviews)
              </span>
            </motion.div>

            {/* Price */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 flex-wrap"
            >
              <span className="text-4xl font-bold text-red-600">
                {formatPrice(product.price)}₫
              </span>
              {originalPrice && product.sale > 0 && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(originalPrice)}₫
                  </span>
                  <Badge
                    count={`Save ${formatPrice(savings)}₫`}
                    className="bg-red-500"
                    style={{ backgroundColor: "#ef4444" }}
                  />
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>

            {/* Quantity & Actions */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">
                  Quantity:
                </span>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={setQuantity}
                  size="large"
                  className="w-24"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart()}
                    className="bg-red-600 hover:bg-red-700 border-red-600 h-12 px-8 text-lg font-semibold w-full sm:w-auto"
                  >
                    Add to Cart
                  </Button>
                </motion.div>

                <Space>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="large"
                      icon={<HeartOutlined />}
                      className="h-12 w-12 flex items-center justify-center border-red-300 text-red-500 hover:bg-red-50"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="large"
                      icon={<ShareAltOutlined />}
                      className="h-12 w-12 flex items-center justify-center border-red-300 text-red-500 hover:bg-red-50"
                    />
                  </motion.div>
                </Space>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Rate
                      disabled
                      defaultValue={product.rating || 0}
                      className="text-red-500"
                      allowHalf
                    />
                    <span className="text-lg font-semibold">
                      {product.rating || 0} out of 5
                    </span>
                    <span className="text-gray-500">
                      Based on {product.review?.length || 0} reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 p-6 rounded-xl border border-red-100"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Write a Review
                </h4>

                {!isPaid ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl"></div>

                    {/* Content Container */}
                    <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-200 shadow-lg">
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="flex justify-center mb-6"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl font-bold text-gray-800 text-center mb-4"
                      >
                        Purchase Required
                      </motion.h3>

                      {/* Main Message */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-700 text-center text-lg leading-relaxed mb-6"
                      >
                        To ensure authentic and helpful reviews, you need to{" "}
                        <span className="font-semibold text-orange-600">
                          purchase and experience
                        </span>{" "}
                        this product first.
                      </motion.p>

                      {/* Features List */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border border-orange-100"
                      >
                        <div className="space-y-4">
                          {[
                            {
                              icon: "✨",
                              text: "Share genuine experiences",
                              color: "from-yellow-400 to-orange-500",
                            },
                            {
                              icon: "🤝",
                              text: "Help other customers decide",
                              color: "from-orange-400 to-red-500",
                            },
                            {
                              icon: "🏆",
                              text: "Build trusted community reviews",
                              color: "from-red-400 to-pink-500",
                            },
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + index * 0.1 }}
                              className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mr-4 text-white text-sm font-bold shadow-sm`}
                              >
                                {feature.icon}
                              </div>
                              <span className="text-gray-700 font-medium">
                                {feature.text}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Call to Action */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-center"
                      >
                        <p className="text-xs text-gray-500 mt-3">
                          Once purchased, you can write your review here
                        </p>
                      </motion.div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-orange-200 rounded-full opacity-20"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-200 rounded-full opacity-20"></div>
                      <div className="absolute top-1/2 left-2 w-4 h-4 bg-yellow-200 rounded-full opacity-20"></div>
                    </div>
                  </motion.div>
                ) : (
                  <Form
                    form={form}
                    onFinish={handleReviewSubmit}
                    layout="vertical"
                  >
                    {/* Bỏ Rating đi */}
                    <Form.Item
                      name="content"
                      label="Your Review"
                      rules={[
                        {
                          required: true,
                          message: "Please write your review!",
                        },
                        {
                          min: 10,
                          message:
                            "Review must be at least 10 characters long!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Share your experience with this product..."
                        className="rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item className="mb-0">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SendOutlined />}
                          size="large"
                          className="bg-red-600 hover:bg-red-700 border-red-600 px-8"
                        >
                          Submit Review
                        </Button>
                      </motion.div>
                    </Form.Item>
                  </Form>
                )}
              </motion.div>

              <Divider className="border-gray-300" />

              {/* Existing Reviews */}
              <div className="grid gap-6">
                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar
                          size="large"
                          src={comment.author?.avatar || null}
                          icon={!comment.author?.avatar && <UserOutlined />}
                          className="bg-red-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg text-gray-900">
                              {comment.author?.username || "Anonymous"}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-500 text-sm">
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                              {/* Edit & Delete buttons */}
                              <Button
                                size="small"
                                type="link"
                                onClick={() => handleEditComment(comment)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                type="link"
                                danger
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>

                          <p className="text-gray-700 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">No reviews yet</p>
                    <p>Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Details;
