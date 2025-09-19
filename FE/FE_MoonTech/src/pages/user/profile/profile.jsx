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

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
    avatar: null,
  });

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "456 Oak Avenue",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States",
      isDefault: false,
    },
  ]);

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: 3,
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 149.99 },
        { name: "Phone Case", quantity: 2, price: 75.0 },
      ],
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      status: "shipping",
      total: 89.99,
      items: 1,
      products: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      status: "processing",
      total: 199.99,
      items: 2,
      products: [{ name: "Smart Watch", quantity: 1, price: 199.99 }],
    },
  ]);

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

  // Initialize forms with user data
  useEffect(() => {
    personalForm.setFieldsValue({
      ...userInfo,
      dateOfBirth: userInfo.dateOfBirth ? dayjs(userInfo.dateOfBirth) : null,
    });
  }, [userInfo, personalForm]);

  const handlePersonalSave = (values) => {
    const updatedInfo = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : null,
    };
    setUserInfo(updatedInfo);
    setEditingPersonal(false);
    message.success("Personal information updated successfully!");
  };

  const handleAddressAdd = (values) => {
    const newAddress = {
      id: Date.now(),
      ...values,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
    addressForm.resetFields();
    message.success("Address added successfully!");
  };

  const handleAddressDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    message.success("Address deleted successfully!");
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    message.success("Default address updated!");
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Text className="font-mono font-medium text-red-600">{text}</Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      render: (items) => <Badge count={items} className="bg-red-600" />,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
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
                src={userInfo.avatar}
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
                {userInfo.name}
              </Title>
              <Space direction="vertical" size={4}>
                <Text className="text-gray-600 flex items-center gap-2">
                  <MailOutlined className="text-red-600" />
                  {userInfo.email}
                </Text>
                <Text className="text-gray-600 flex items-center gap-2">
                  <PhoneOutlined className="text-red-600" />
                  {userInfo.phone}
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
                          name="name"
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
                                <Input placeholder="Enter city" />
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
                        key={address.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="relative border border-gray-200 hover:border-red-300 transition-colors">
                          {address.isDefault && (
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
                                    {address.name}
                                  </Title>
                                  <Text className="text-gray-600">
                                    {address.phone}
                                  </Text>
                                  <Text className="text-gray-700">
                                    {address.address}, {address.city},{" "}
                                    {address.state} {address.zipCode}
                                  </Text>
                                </Space>
                              </div>
                            </Col>
                            <Col xs={24} lg={6}>
                              <div className="flex flex-col gap-2 lg:items-end">
                                {!address.isDefault && (
                                  <Button
                                    size="small"
                                    onClick={() =>
                                      handleSetDefaultAddress(address.id)
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
                                    handleAddressDelete(address.id)
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
              Order Details - {selectedOrder?.id}
            </div>
          }
          open={orderDetailVisible}
          onCancel={() => setOrderDetailVisible(false)}
          footer={null}
          width={700}
        >
          {selectedOrder && (
            <div className="space-y-6">
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Order ID">
                  {selectedOrder.id}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {dayjs(selectedOrder.date).format("MMMM DD, YYYY")}
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
                    {formatCurrency(selectedOrder.total)}
                  </Text>
                </Descriptions.Item>
              </Descriptions>

              <div>
                <Title level={5} className="text-gray-900 mb-3">
                  Order Items
                </Title>
                <div className="space-y-3">
                  {selectedOrder.products?.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <Text className="font-medium">{product.name}</Text>
                        <Text className="text-gray-600 block">
                          Quantity: {product.quantity}
                        </Text>
                      </div>
                      <Text className="font-semibold text-red-600">
                        {formatCurrency(product.price)}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              <Timeline
                items={[
                  {
                    color: "green",
                    children: "Order placed",
                  },
                  {
                    color:
                      selectedOrder.status === "processing" ? "red" : "green",
                    children: "Processing",
                  },
                  {
                    color: ["shipping", "delivered"].includes(
                      selectedOrder.status
                    )
                      ? "green"
                      : "gray",
                    children: "Shipped",
                  },
                  {
                    color:
                      selectedOrder.status === "delivered" ? "green" : "gray",
                    children: "Delivered",
                  },
                ]}
              />
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
