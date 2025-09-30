import React, { useEffect, useState } from "react";
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
import { BarChart3, Coins, DollarSign, ShoppingCart } from "lucide-react";
import {
  getAverageRevenue,
  getCategoryPercentage,
  getMonthlyRevenue,
  getMonthRevenue,
  getTotalRevenue,
} from "../../../../services/apiServices";

const COLORS = [
  "#8b5cf6",
  "#06d6a0",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#10b981",
];

function Revenue() {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [avgRevenue, setAvgRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const res1 = await getMonthlyRevenue();
      setMonthlyRevenue(res1);

      const res2 = await getMonthRevenue();
      const formatted = Object.entries(res2).map(([month, revenue]) => ({
        month,
        revenue,
      }));
      setRevenueData(formatted);

      const res3 = await getTotalRevenue();
      setTotalRevenue(res3);

      const res4 = await getCategoryPercentage();
      setCategoryData(res4);

      const res5 = await getAverageRevenue();
      setAvgRevenue(res5);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);
  };

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
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Coins className="text-white" size={26} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(monthlyRevenue)}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <ShoppingCart className="text-white" size={26} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200 text-sm">Average Revenue / Order</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(avgRevenue)}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <BarChart3 className="text-white" size={26} />
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
