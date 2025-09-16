import React, { useState } from "react";
import {
  Card,
  Button,
  InputNumber,
  Badge,
  Avatar,
  Divider,
  Tag,
  Space,
  Empty,
  message,
  Popconfirm,
  Row,
  Col,
  Typography,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  CreditCardOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

// Mock cart data
const initialCartData = [
  {
    id: 1,
    name: "Premium Wireless Headphones Pro",
    category: "Electronics",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    quantity: 2,
    sale: 25,
    inStock: true,
  },
  {
    id: 2,
    name: "Gaming Mechanical Keyboard",
    category: "Gaming",
    price: 159.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
    quantity: 1,
    sale: 0,
    inStock: true,
  },
  {
    id: 3,
    name: "Ultra HD Webcam 4K",
    category: "Electronics",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=300&fit=crop",
    quantity: 3,
    sale: 25,
    inStock: false,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartData);

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    message.success("Item removed from cart");
  };

  const moveToWishlist = (id) => {
    removeItem(id);
    message.success("Item moved to wishlist");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="space-y-4">
                  <Title level={3} className="text-gray-600">
                    Your Cart is Empty
                  </Title>
                  <Text className="text-gray-500">
                    Looks like you haven't added any items to your cart yet.
                  </Text>
                </div>
              }
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="bg-red-600 hover:bg-red-700 border-red-600 px-8 py-6 h-auto text-lg"
                  icon={<ShoppingCartOutlined />}
                >
                  Start Shopping
                </Button>
              </motion.div>
            </Empty>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="text-gray-600 hover:text-red-600"
                size="large"
              >
                Continue Shopping
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Title
                  level={2}
                  className="text-gray-900 m-0 font-bold text-3xl bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
                  style={{
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Shopping Cart
                </Title>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <Row gutter={[24, 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-md ${
                        item.inStock
                          ? "bg-white border-gray-200 hover:border-red-300"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex-shrink-0"
                        >
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            {item.sale > 0 && (
                              <Badge
                                count={`${item.sale}%`}
                                className="absolute -top-2 -right-2 bg-red-500"
                              />
                            )}
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <Text className="text-white text-xs font-semibold">
                                  Out of Stock
                                </Text>
                              </div>
                            )}
                          </div>
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <Tag color="red" className="mb-2">
                                {item.category}
                              </Tag>
                              <Title
                                level={4}
                                className={`m-0 ${
                                  !item.inStock
                                    ? "text-gray-500"
                                    : "text-gray-900"
                                }`}
                              >
                                {item.name}
                              </Title>
                              {!item.inStock && (
                                <Text type="danger" className="text-sm">
                                  Currently unavailable
                                </Text>
                              )}
                            </div>

                            {/* Actions */}
                            <Space>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  type="text"
                                  icon={<HeartOutlined />}
                                  className="text-gray-400 hover:text-red-500"
                                  onClick={() => moveToWishlist(item.id)}
                                />
                              </motion.div>
                              <Popconfirm
                                title="Remove from cart?"
                                description="Are you sure you want to remove this item?"
                                onConfirm={() => removeItem(item.id)}
                                okText="Remove"
                                okButtonProps={{
                                  className:
                                    "bg-red-600 hover:bg-red-700 border-red-600",
                                }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    className="text-gray-400 hover:text-red-500"
                                    danger
                                  />
                                </motion.div>
                              </Popconfirm>
                            </Space>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex justify-between items-end">
                            <div>
                              <Space align="baseline">
                                <Text className="text-2xl font-bold text-red-600">
                                  ${item.price.toFixed(2)}
                                </Text>
                                {item.originalPrice && (
                                  <Text
                                    delete
                                    className="text-gray-400 text-lg"
                                  >
                                    ${item.originalPrice.toFixed(2)}
                                  </Text>
                                )}
                              </Space>
                              {item.originalPrice && (
                                <div className="mt-1">
                                  <Text className="text-sm text-green-600 font-medium">
                                    You save $
                                    {(
                                      (item.originalPrice - item.price) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </Text>
                                </div>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="small"
                                  icon={<MinusOutlined />}
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1 || !item.inStock}
                                  className="flex items-center justify-center w-8 h-8"
                                />
                              </motion.div>

                              <InputNumber
                                min={1}
                                max={99}
                                value={item.quantity}
                                onChange={(value) =>
                                  updateQuantity(item.id, value)
                                }
                                className="w-16 text-center"
                                size="small"
                                disabled={!item.inStock}
                              />

                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  disabled={!item.inStock}
                                  className="flex items-center justify-center w-8 h-8"
                                />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Summary Card */}
              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden sticky top-6">
                <Title level={3} className="text-gray-900 mb-6">
                  Order Summary
                </Title>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <Text className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </Text>
                    <Text className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </Text>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between">
                      <Text className="text-green-600">Total Savings</Text>
                      <Text className="font-semibold text-green-600">
                        -${savings.toFixed(2)}
                      </Text>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Text className="text-gray-600">Shipping</Text>
                    <Text
                      className={`font-semibold ${
                        shipping === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </Text>
                  </div>

                  <div className="flex justify-between">
                    <Text className="text-gray-600">Tax</Text>
                    <Text className="font-semibold">${tax.toFixed(2)}</Text>
                  </div>

                  <Divider className="my-4" />

                  <div className="flex justify-between">
                    <Title level={4} className="text-gray-900 m-0">
                      Total
                    </Title>
                    <Title level={4} className="text-red-600 m-0">
                      ${total.toFixed(2)}
                    </Title>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
                    <Text className="text-red-700 text-sm">
                      <GiftOutlined className="mr-2" />
                      Add ${(100 - subtotal).toFixed(2)} more to get FREE
                      shipping!
                    </Text>
                  </div>
                )}

                {/* Create Order Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<FileTextOutlined />}
                    className="bg-red-600 hover:bg-red-700 border-red-600 h-14 text-lg font-semibold mb-4"
                    disabled={cartItems.some((item) => !item.inStock)}
                  >
                    Create Order
                  </Button>
                </motion.div>

                {/* Security Notice */}
                <div className="text-center">
                  <Text className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <SafetyCertificateOutlined />
                    Secure checkout with 256-bit SSL encryption
                  </Text>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

export default Cart;
