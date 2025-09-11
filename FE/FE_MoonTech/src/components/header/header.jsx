import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "home", label: "Home", href: "#" },
    { key: "products", label: "Products", href: "#" },
    { key: "contact", label: "Contact", href: "#" },
    { key: "about", label: "About Us", href: "#" },
  ];

  const authMenuItems = [
    {
      key: "1",
      label: "Sign In",
    },
    {
      key: "2",
      label: "Sign Up",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "My Account",
    },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-lg border-b-4 border-red-500 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-white text-lg lg:text-xl font-bold"
                >
                  🌙
                </motion.div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                MoonTech
              </h1>
              <p className="text-xs text-gray-500 hidden lg:block">
                Electronics Store
              </p>
            </div>
          </motion.div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{
                  scale: 1.1,
                  color: "#DC2626",
                }}
                className="text-gray-700 hover:text-red-600 font-medium text-base transition-all duration-300 relative group"
              >
                {item.label}
                <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Right Section - Auth & Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
            >
              <ShoppingCartOutlined className="text-xl text-gray-600 hover:text-red-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.div>

            {/* Authentication Dropdown */}
            <Dropdown
              menu={{ items: authMenuItems }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  className="bg-gradient-to-r from-red-500 to-red-600 border-none hover:from-red-600 hover:to-red-700 shadow-lg"
                  icon={<UserOutlined />}
                >
                  <span className="hidden sm:inline ml-1">Account</span>
                </Button>
              </motion.div>
            </Dropdown>

            {/* Mobile Menu Toggle */}
            <motion.div whileTap={{ scale: 0.9 }} className="lg:hidden">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden border-t border-gray-200"
        >
          <nav className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ x: -50, opacity: 0 }}
                animate={{
                  x: isMenuOpen ? 0 : -50,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{ delay: index * 0.1 }}
                className="block px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}

export default Header;
