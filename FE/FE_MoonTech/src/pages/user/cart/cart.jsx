import React, { useEffect, useState } from "react";
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
import {
  addNewOrder,
  deleteItemFromCart,
  getAuthenticatedUser,
  getUserCart,
  updateItemQuantity,
} from "../../../services/apiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

function Cart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserCart();
    fetchUser();
  }, []);

  const fetchUserCart = async () => {
    try {
      const res = await getUserCart();
      setCart(res);
      setCartItems(res?.cartItem);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getAuthenticatedUser();
      setUser(res);
      const addr = res.shippingAddress.find((item) => item.isDefault);
      setAddress(addr._id);
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      const payload = {
        quantity: newQuantity,
      };

      const res = await updateItemQuantity(id, payload);

      if (!res) {
        toast.error("Cannot update item's quantity!");
      } else {
        toast.success("Update item's quantity success!");
        fetchUserCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await deleteItemFromCart(id);

      if (!res) {
        toast.error("Remove item failed!");
      } else {
        toast.success("Remove item success!");
        fetchUserCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCreateOrder = async () => {
    try {
      const payload = {
        user: user._id,
        items: cart._id,
        totalPrice: total,
        shippingAddress: address,
      };
      const res = await addNewOrder(payload);

      if (!res) {
        toast.error("Cannot add new order!");
      } else {
        toast.success("Add new order success!");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 10000000 ? 0 : 50000; // Free shipping over 10M VND
  const tax = subtotal * 0.1; // 10% VAT
  const total = subtotal + shipping + tax;

  // Format VND currency
  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  if (cartItems?.length === 0) {
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
                    You haven't added any items to your cart yet.
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
                  {cartItems?.map((item, index) => (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md bg-white border-gray-200 hover:border-red-300"
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex-shrink-0"
                        >
                          <div className="relative">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <Title
                                level={4}
                                className="m-0 text-gray-900 mb-2"
                              >
                                {item.product.name}
                              </Title>
                              <Text type="secondary" className="text-sm">
                                ID: {item.product._id}
                              </Text>
                            </div>

                            {/* Actions */}
                            <Space>
                              <Popconfirm
                                title="Remove from cart?"
                                description="Are you sure you want to remove this item?"
                                onConfirm={() =>
                                  handleDeleteItem(item.product._id)
                                }
                                okText="Remove"
                                cancelText="Cancel"
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
                              <Space direction="vertical" size={0}>
                                <Text className="text-2xl font-bold text-red-600">
                                  {formatVND(item.product.price)}
                                </Text>
                                <Text className="text-sm text-gray-600">
                                  Unit Price
                                </Text>
                              </Space>
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
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="flex items-center justify-center w-8 h-8"
                                />
                              </motion.div>

                              <InputNumber
                                min={1}
                                max={99}
                                value={item.quantity}
                                onChange={(value) =>
                                  updateQuantity(item.product._id, value)
                                }
                                className="w-16 text-center"
                                size="small"
                              />

                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="flex items-center justify-center w-8 h-8"
                                />
                              </motion.div>
                            </div>
                          </div>

                          {/* Subtotal for this item */}
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <Text className="text-gray-600">Subtotal:</Text>
                              <Text className="text-lg font-semibold text-red-600">
                                {formatVND(item.product.price * item.quantity)}
                              </Text>
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
                      Subtotal ({cartItems?.length} items)
                    </Text>
                    <Text className="font-semibold">{formatVND(subtotal)}</Text>
                  </div>

                  <div className="flex justify-between">
                    <Text className="text-gray-600">Shipping</Text>
                    <Text
                      className={`font-semibold ${
                        shipping === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shipping === 0 ? "FREE" : formatVND(shipping)}
                    </Text>
                  </div>

                  <div className="flex justify-between">
                    <Text className="text-gray-600">VAT (10%)</Text>
                    <Text className="font-semibold">{formatVND(tax)}</Text>
                  </div>

                  <Divider className="my-4" />

                  <div className="flex justify-between">
                    <Title level={4} className="text-gray-900 m-0">
                      Total
                    </Title>
                    <Title level={4} className="text-red-600 m-0">
                      {formatVND(total)}
                    </Title>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
                    <Text className="text-red-700 text-sm">
                      <GiftOutlined className="mr-2" />
                      Add {formatVND(10000000 - subtotal)} more to get FREE
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
                    onClick={handleCreateOrder}
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
