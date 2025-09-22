import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Moon,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Package,
  DollarSign,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";
import UserManagement from "./management/user/userManagement";
import Revenue from "./management/revenue/revenue";
import ProductManagement from "./management/product/productManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "users", label: "User Management", icon: Users },
    { id: "revenue", label: "Revenue", icon: TrendingUp },
    { id: "products", label: "Product Management", icon: Package },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "revenue":
        return <Revenue />;
      case "products":
        return <ProductManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarOpen ? 256 : 80 }}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 shadow-xl relative"
      >
        <div className="p-6">
          <motion.div
            className="flex items-center gap-3"
            animate={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Moon className="text-white" size={20} />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-xl font-bold text-white"
                >
                  MoonTech
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-violet-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {sidebarOpen && activeTab === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-auto"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-gray-800 border border-gray-700 rounded-full p-1 text-gray-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome Admin</h1>
              <p className="text-gray-400">Manage your e-commerce platform</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;
