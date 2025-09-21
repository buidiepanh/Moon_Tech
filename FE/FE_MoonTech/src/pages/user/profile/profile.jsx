import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Button,
  Avatar,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  Badge,
  Tag,
  Table,
  Space,
  Divider,
  Upload,
  message,
  Modal,
  Descriptions,
  Timeline,
  Empty,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  CameraOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  GiftOutlined,
  UploadOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import {
  addNewAddress,
  deleteAddress,
  getAllUserOrders,
  getAuthenticatedUser,
  getUserAddresses,
  getUserCart,
  updateDefaultAddress,
  updateUserInfo,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [orderDetailVisible, setOrderDetailVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserAddress();
    fetchUserOrders();
  }, []);
  console.log(orders);

  const fetchUserInfo = async () => {
    try {
      const res = await getAuthenticatedUser();
      setUserInfo(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const res = await getUserAddresses();
      setAddresses(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const res = await getAllUserOrders();
      setOrders(res);
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
  };

  useEffect(() => {
    personalForm.setFieldsValue({
      ...userInfo,
    });
  }, [userInfo, personalForm]);

  const handlePersonalSave = async (values) => {
    try {
      const res = await updateUserInfo(userInfo._id, values);

      if (!res) {
        toast.error("Update information failed!");
      } else {
        toast.success("Update information success!");
        fetchUserInfo();
      }
      setEditingPersonal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressAdd = async (values) => {
    try {
      const newAddress = {
        ...values,
        user: userInfo._id,
        isDefault: false,
      };
      const res = await addNewAddress(newAddress);

      if (!res) {
        toast.error("Cannot add new address!");
      } else {
        toast.success("Add new address success!");
        setEditingAddress(false);
        fetchUserAddress();
      }
      addressForm.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressDelete = async (id) => {
    try {
      const res = await deleteAddress(id);

      if (!res) {
        toast.error("Delete address failed!");
      } else {
        toast.success("Delete address success!");
        fetchUserAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      const payload = {
        isDefault: true,
      };
      const res = await updateDefaultAddress(id, payload);

      if (!res) {
        toast.error("Cannot set default this address!");
      } else {
        toast.success("Set default this address success!");
        fetchUserAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setOrderDetailVisible(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: "orange",
      shipping: "blue",
      delivered: "green",
      cancelled: "red",
    };
    return colors[status] || "default";
  };

  const getStatusIcon = (status) => {
    const icons = {
      processing: <ClockCircleOutlined />,
      shipping: <TruckOutlined />,
      delivered: <CheckCircleOutlined />,
      cancelled: <CloseCircleOutlined />,
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <Text className="font-mono font-medium text-red-600">{text}</Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          icon={getStatusIcon(status)}
          className="capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <Badge count={items?.cartItem?.length || 0} className="bg-red-600" />
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total) => (
        <Text className="font-semibold text-red-600">
          {formatCurrency(total)}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleOrderView(record)}
          className="text-red-600 hover:text-red-700"
        >
          View Details
        </Button>
      ),
    },
  ];

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
          <div className="flex items-center gap-6 mb-6">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Avatar
                size={120}
                src={userInfo?.avatar}
                icon={<UserOutlined />}
                className="border-4 border-red-600 shadow-lg"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 border-red-600"
              />
            </motion.div>
            <div>
              <Title level={2} className="text-gray-900 m-0 mb-2">
                {userInfo?.username}
              </Title>
              <Space direction="vertical" size={4}>
                <Text className="text-gray-600 flex items-center gap-2">
                  <MailOutlined className="text-red-600" />
                  {userInfo?.email}
                </Text>
                <Text className="text-gray-600 flex items-center gap-2">
                  <PhoneOutlined className="text-red-600" />
                  {userInfo?.phone}
                </Text>
              </Space>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className="profile-tabs"
              tabBarStyle={{
                borderBottom: "2px solid #fee2e2",
                marginBottom: "24px",
              }}
            >
              {/* Personal Information Tab */}
              <TabPane
                tab={
                  <span className="flex items-center gap-2 text-lg">
                    <UserOutlined />
                    Personal Information
                  </span>
                }
                key="personal"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <Title level={3} className="text-gray-900 m-0">
                      Personal Information
                    </Title>
                    <Button
                      type={editingPersonal ? "default" : "primary"}
                      icon={<EditOutlined />}
                      onClick={() => setEditingPersonal(!editingPersonal)}
                      className={
                        editingPersonal
                          ? ""
                          : "bg-red-600 hover:bg-red-700 border-red-600"
                      }
                    >
                      {editingPersonal ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <Form
                    form={personalForm}
                    layout="vertical"
                    onFinish={handlePersonalSave}
                    disabled={!editingPersonal}
                  >
                    <Row gutter={[24, 16]}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="username"
                          label="Full Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter your full name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="email"
                          label="Email Address"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            {
                              type: "email",
                              message: "Please enter a valid email",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Enter your email" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="phone"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your phone",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter your phone number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="gender" label="Gender">
                          <Select size="large" placeholder="Select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    {editingPersonal && (
                      <div className="flex justify-end gap-3 mt-6">
                        <Button
                          size="large"
                          onClick={() => setEditingPersonal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          size="large"
                          htmlType="submit"
                          className="bg-red-600 hover:bg-red-700 border-red-600"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </Form>
                </motion.div>
              </TabPane>

              {/* Shipping Addresses Tab */}
              <TabPane
                tab={
                  <span className="flex items-center gap-2 text-lg">
                    <EnvironmentOutlined />
                    Shipping Addresses
                  </span>
                }
                key="addresses"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <Title level={3} className="text-gray-900 m-0">
                      Shipping Addresses
                    </Title>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setEditingAddress(true)}
                      className="bg-red-600 hover:bg-red-700 border-red-600"
                    >
                      Add New Address
                    </Button>
                  </div>

                  {/* Add Address Form */}
                  {editingAddress && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-6"
                    >
                      <Card className="border border-red-200 bg-red-50">
                        <Title level={4} className="text-gray-900 mb-4">
                          Add New Address
                        </Title>
                        <Form
                          form={addressForm}
                          layout="vertical"
                          onFinish={handleAddressAdd}
                        >
                          <Row gutter={[16, 16]}>
                            <Col xs={24}>
                              <Form.Item
                                name="address"
                                label="Street Address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter address",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter street address" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                              <Form.Item
                                name="city"
                                label="City"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter city",
                                  },
                                ]}
                              >
                                <Select placeholder="Select city">
                                  <Option value="HoChiMinh">Ho Chi Minh</Option>
                                  <Option value="CanTho">Can Tho</Option>
                                  <Option value="QuyNhon">Quy Nhon</Option>
                                  <Option value="HaNoi">Ha Noi</Option>
                                  <Option value="DaNang">Da Nang</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <div className="flex justify-end gap-3">
                            <Button onClick={() => setEditingAddress(false)}>
                              Cancel
                            </Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="bg-red-600 hover:bg-red-700 border-red-600"
                            >
                              Add Address
                            </Button>
                          </div>
                        </Form>
                      </Card>
                    </motion.div>
                  )}

                  {/* Addresses List */}
                  <div className="space-y-4">
                    {addresses.map((address, index) => (
                      <motion.div
                        key={address?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="relative border border-gray-200 hover:border-red-300 transition-colors">
                          {address?.isDefault && (
                            <div className="absolute -top-2 -right-2 z-10">
                              <Badge.Ribbon text="Default" color="red" />
                            </div>
                          )}
                          <Row gutter={[16, 16]}>
                            <Col xs={24} lg={18}>
                              <div className="pr-4">
                                <Space
                                  direction="vertical"
                                  size={2}
                                  className="w-full"
                                >
                                  <Title
                                    level={5}
                                    className="text-gray-900 m-0"
                                  >
                                    {userInfo?.username}
                                  </Title>
                                  <Text className="text-gray-600">
                                    {userInfo?.phone}
                                  </Text>
                                  <Text className="text-gray-700">
                                    {address?.address}, {address?.city}
                                  </Text>
                                </Space>
                              </div>
                            </Col>
                            <Col xs={24} lg={6}>
                              <div className="flex flex-col gap-2 lg:items-end">
                                {!address?.isDefault && (
                                  <Button
                                    size="small"
                                    onClick={() =>
                                      handleSetDefaultAddress(address._id)
                                    }
                                    className="text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                                  >
                                    Set Default
                                  </Button>
                                )}
                                <Button
                                  size="small"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() =>
                                    handleAddressDelete(address._id)
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabPane>

              {/* Orders Tab */}
              <TabPane
                tab={
                  <span className="flex items-center gap-2 text-lg">
                    <ShoppingOutlined />
                    Your Orders
                  </span>
                }
                key="orders"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Title level={3} className="text-gray-900 mb-6">
                    Order History
                  </Title>

                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} orders`,
                    }}
                    className="orders-table"
                  />
                </motion.div>
              </TabPane>
            </Tabs>
          </Card>
        </motion.div>

        {/* Order Detail Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <ShoppingOutlined className="text-red-600" />
              Order Details - {selectedOrder?._id}
            </div>
          }
          open={orderDetailVisible}
          onCancel={() => setOrderDetailVisible(false)}
          footer={null}
          width={700}
        >
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Order ID">
                  {selectedOrder._id}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {dayjs(selectedOrder.createdAt).format("MMMM DD, YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={getStatusColor(selectedOrder.status)}
                    icon={getStatusIcon(selectedOrder.status)}
                  >
                    {selectedOrder.status.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Total">
                  <Text className="font-semibold text-red-600 text-lg">
                    {formatCurrency(selectedOrder.totalPrice)}
                  </Text>
                </Descriptions.Item>
              </Descriptions>

              {/* Items */}
              <div>
                <Title level={5} className="text-gray-900 mb-3">
                  Order Items
                </Title>
                <div className="space-y-3">
                  {selectedOrder.items?.cartItem?.map((cart, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <Text className="font-medium">
                          {cart.product?.name}
                        </Text>
                        <Text className="text-gray-600 block">
                          Quantity: {cart.quantity}
                        </Text>
                      </div>
                      <Text className="font-semibold text-red-600">
                        {formatCurrency(cart.product?.price)}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <Timeline
                items={[
                  {
                    color: selectedOrder.status === "pending" ? "red" : "green",
                    children: "Pending Payment",
                  },
                  {
                    color: selectedOrder.status === "paid" ? "green" : "gray",
                    children: "Paid",
                  },
                  {
                    color:
                      selectedOrder.status === "delivered" ? "green" : "gray",
                    children: "Delivered",
                  },
                ]}
              />

              {/* Pay Button */}
              {selectedOrder.status === "pending" && (
                <div className="flex justify-end">
                  <Button
                    type="primary"
                    className="bg-red-600 hover:bg-red-700 border-red-600"
                    onClick={() => {
                      // TODO: Call API to update order status -> paid
                      toast.success("Redirecting to payment...");
                    }}
                  >
                    Pay Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal>
      </motion.div>

      <style jsx>{`
        .profile-tabs .ant-tabs-tab {
          font-weight: 500;
        }
        .profile-tabs .ant-tabs-tab.ant-tabs-tab-active {
          color: #dc2626 !important;
        }
        .profile-tabs .ant-tabs-ink-bar {
          background: #dc2626 !important;
        }
        .orders-table .ant-table-thead > tr > th {
          background: #fef2f2;
          border-bottom: 2px solid #fecaca;
        }
      `}</style>
    </div>
  );
}

export default Profile;
