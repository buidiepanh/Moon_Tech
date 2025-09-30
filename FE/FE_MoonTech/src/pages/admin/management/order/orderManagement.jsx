import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  MoreVertical,
  Package,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Dropdown, Menu, Button, Tag, Modal, Descriptions, Table } from "antd";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../../services/apiServices";
import toast from "react-hot-toast";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, filterStatus]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.user?.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items?.cartItem?.some((item) =>
            item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, { status: newStatus });
      if (res) {
        toast.success(`Order ${newStatus} successfully!`);
        fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      case "canceled":
        return "red";
      case "delivered":
        return "blue";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "canceled":
        return <XCircle size={14} />;
      case "delivered":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionMenu = (order) => {
    // Không cho phép thay đổi status nếu đang pending
    if (order.status === "pending") {
      return (
        <Menu>
          <Menu.Item disabled>
            Order is pending - no actions available
          </Menu.Item>
        </Menu>
      );
    }

    // Chỉ cho phép delivered/canceled khi status là paid
    if (order.status === "paid") {
      return (
        <Menu>
          <Menu.Item
            key="delivered"
            icon={<CheckCircle size={16} />}
            onClick={() => handleStatusChange(order._id, "delivered")}
          >
            Mark as Delivered
          </Menu.Item>
          <Menu.Item
            key="canceled"
            icon={<XCircle size={16} />}
            onClick={() => handleStatusChange(order._id, "canceled")}
            danger
          >
            Cancel Order
          </Menu.Item>
        </Menu>
      );
    }

    // Không có actions cho delivered hoặc canceled orders
    return (
      <Menu>
        <Menu.Item disabled>
          No actions available for {order.status} orders
        </Menu.Item>
      </Menu>
    );
  };

  const showOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const getFilterMenu = () => (
    <Menu>
      <Menu.Item
        key="all"
        onClick={() => setFilterStatus("all")}
        className={filterStatus === "all" ? "bg-violet-50" : ""}
      >
        All Orders
      </Menu.Item>
      <Menu.Item
        key="pending"
        onClick={() => setFilterStatus("pending")}
        className={filterStatus === "pending" ? "bg-violet-50" : ""}
      >
        Pending
      </Menu.Item>
      <Menu.Item
        key="paid"
        onClick={() => setFilterStatus("paid")}
        className={filterStatus === "paid" ? "bg-violet-50" : ""}
      >
        Paid
      </Menu.Item>
      <Menu.Item
        key="delivered"
        onClick={() => setFilterStatus("delivered")}
        className={filterStatus === "delivered" ? "bg-violet-50" : ""}
      >
        Delivered
      </Menu.Item>
      <Menu.Item
        key="canceled"
        onClick={() => setFilterStatus("canceled")}
        className={filterStatus === "canceled" ? "bg-violet-50" : ""}
      >
        Canceled
      </Menu.Item>
    </Menu>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Management</h2>
          <p className="text-gray-400 mt-1">
            Manage customer orders and track their status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Package className="text-violet-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Orders</p>
            <p className="text-xl font-bold text-white">{orders.length}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Orders",
            value: orders.length,
            icon: Package,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            title: "Pending",
            value: orders.filter((o) => o.status === "pending").length,
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
          {
            title: "Delivered",
            value: orders.filter((o) => o.status === "delivered").length,
            icon: CheckCircle,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            title: "Canceled",
            value: orders.filter((o) => o.status === "canceled").length,
            icon: XCircle,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        {/* Search + Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by order ID, customer, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none w-80"
            />
          </div>

          <Dropdown overlay={getFilterMenu()} placement="bottomRight">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Filter size={20} />
              Filter ({filterStatus})
            </button>
          </Dropdown>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-300 font-medium">Order ID</th>
                <th className="pb-4 text-gray-300 font-medium">Customer</th>
                <th className="pb-4 text-gray-300 font-medium">Products</th>
                <th className="pb-4 text-gray-300 font-medium">Total</th>
                <th className="pb-4 text-gray-300 font-medium">Status</th>
                <th className="pb-4 text-gray-300 font-medium">Date</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <td className="py-4 text-gray-400 text-sm font-mono">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {order.user?.username || "Unknown User"}
                          </p>
                          <p className="text-gray-400 text-xs">
                            ID: {order.user?._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        {order.items?.cartItem?.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="text-white">
                              {item.product?.name}
                            </span>
                            <span className="text-gray-400 ml-2">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                        {order.items?.cartItem?.length > 2 && (
                          <p className="text-gray-400 text-xs">
                            +{order.items.cartItem.length - 2} more items
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-white font-semibold">
                        {formatPrice(order.totalPrice)}₫
                      </div>
                    </td>
                    <td className="py-4">
                      <Tag
                        color={getStatusColor(order.status)}
                        icon={getStatusIcon(order.status)}
                        className="capitalize"
                      >
                        {order.status}
                      </Tag>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Calendar size={14} />
                        <span className="text-sm">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => showOrderDetail(order)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <Dropdown
                          overlay={getActionMenu(order)}
                          placement="bottomRight"
                          trigger={["click"]}
                          disabled={order.status === "pending"}
                        >
                          <button
                            className={`p-2 rounded-lg transition-all ${
                              order.status === "pending"
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                            }`}
                            disabled={order.status === "pending"}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </Dropdown>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal
        title={
          <span className="text-white">
            Order Details - #{selectedOrder?._id?.slice(-8)}
          </span>
        }
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={800}
        className="order-detail-modal"
        styles={{
          content: {
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
          },
          header: {
            backgroundColor: "#1f2937",
            borderBottom: "1px solid #374151",
          },
        }}
      >
        {selectedOrder && (
          <div className="space-y-6 mt-4">
            <Descriptions
              title={<span className="text-white">Order Information</span>}
              bordered
              column={2}
              size="small"
              className="order-descriptions"
            >
              <Descriptions.Item
                label={<span className="text-gray-300">Order ID</span>}
                span={2}
              >
                <span className="text-white font-mono">
                  #{selectedOrder._id}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="text-gray-300">Customer</span>}
              >
                <span className="text-white">
                  {selectedOrder.user?.username}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="text-gray-300">Status</span>}
              >
                <Tag
                  color={getStatusColor(selectedOrder.status)}
                  icon={getStatusIcon(selectedOrder.status)}
                  className="capitalize"
                >
                  {selectedOrder.status}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="text-gray-300">Total Amount</span>}
              >
                <span className="text-green-400 font-semibold">
                  {formatPrice(selectedOrder.totalPrice)}₫
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="text-gray-300">Order Date</span>}
              >
                <span className="text-white">
                  {formatDate(selectedOrder.createdAt)}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="text-gray-300">Shipping Address</span>}
                span={2}
              >
                <span className="text-white">
                  {selectedOrder.shippingAddress}
                </span>
              </Descriptions.Item>
            </Descriptions>

            <div>
              <h4 className="text-white font-semibold mb-4">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.items?.cartItem?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {item.product?.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Price: {formatPrice(item.product?.price)}₫
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">Quantity: {item.quantity}</p>
                      <p className="text-green-400 font-semibold">
                        {formatPrice(item.product?.price * item.quantity)}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom CSS for dark theme */}
      <style jsx>{`
        .order-detail-modal .ant-modal-content {
          background-color: #1f2937 !important;
        }

        .order-detail-modal .ant-modal-header {
          background-color: #1f2937 !important;
          border-bottom: 1px solid #374151 !important;
        }

        .order-descriptions
          .ant-descriptions-bordered
          .ant-descriptions-item-label {
          background-color: #374151 !important;
          color: #d1d5db !important;
        }

        .order-descriptions
          .ant-descriptions-bordered
          .ant-descriptions-item-content {
          background-color: #1f2937 !important;
          color: white !important;
        }

        .order-descriptions .ant-descriptions-title {
          color: white !important;
        }
      `}</style>
    </motion.div>
  );
}

export default OrderManagement;
