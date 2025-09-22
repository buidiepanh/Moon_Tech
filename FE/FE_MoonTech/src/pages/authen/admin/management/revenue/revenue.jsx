import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, DollarSign, ShoppingCart } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 12000, orders: 150 },
  { month: "Feb", revenue: 19000, orders: 230 },
  { month: "Mar", revenue: 15000, orders: 180 },
  { month: "Apr", revenue: 22000, orders: 280 },
  { month: "May", revenue: 18000, orders: 220 },
  { month: "Jun", revenue: 25000, orders: 310 },
];

const categoryData = [
  { name: "Electronics", value: 40, color: "#8b5cf6" },
  { name: "Clothing", value: 30, color: "#06d6a0" },
  { name: "Books", value: 20, color: "#f59e0b" },
  { name: "Home & Garden", value: 10, color: "#ef4444" },
];

function Revenue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Revenue Management</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">$125,000</p>
              <p className="text-green-400 text-sm">+12% from last month</p>
            </div>
            <div className="p-3 bg-violet-600 rounded-lg">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">1,370</p>
              <p className="text-green-400 text-sm">+8% from last month</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <ShoppingCart className="text-white" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Order</p>
              <p className="text-2xl font-bold text-white">$91.20</p>
              <p className="text-red-400 text-sm">-2% from last month</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Revenue Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Revenue;
