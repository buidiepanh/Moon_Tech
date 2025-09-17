import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getAuthenticatedUser, getUserCart } from "../../services/apiServices";
import toast from "react-hot-toast";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchNumberOfItem();
  }, [token]);

  const fetchNumberOfItem = async () => {
    try {
      const res = await getUserCart();
      setNumber(res.cartItem.length);
    } catch (error) {
      console.log(error);
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

  const handleLogout = () => {
    toast.success("Logout success!");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!token) {
      toast.error("Please login to view your cart!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const navItems = [
    { key: "home", label: "Home", href: "#" },
    { key: "products", label: "Products", href: "#" },
    { key: "contact", label: "Contact", href: "#" },
    { key: "about", label: "About Us", href: "#" },
  ];

  // Menu items for authenticated users
  const authenticatedMenuItems = [
    {
      key: "1",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  const guestMenuItems = [
    {
      key: "1",
      label: "Sign In",
      onClick: () => navigate("/login"),
    },
    {
      key: "2",
      label: "Sign Up",
      onClick: () => navigate("/signup"),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "My Account",
      onClick: () => navigate("/profile"),
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
            onClick={() => navigate("/")}
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
              <ShoppingCartOutlined
                className="text-xl text-gray-600 hover:text-red-600 transition-colors"
                onClick={() => handleCartClick()}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {number}
              </span>
            </motion.div>

            {/* User Welcome & Authentication */}
            {user ? (
              // Authenticated User Section
              <div className="flex items-center space-x-3">
                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hidden sm:block"
                >
                  <span className="text-gray-600 text-sm">Welcome back,</span>
                  <span className="ml-1 font-semibold text-red-600">
                    {user.username}
                  </span>
                </motion.div>

                {/* User Avatar Dropdown */}
                <Dropdown
                  menu={{ items: authenticatedMenuItems }}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <Avatar
                      size="large"
                      icon={<UserOutlined />}
                      className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg border-2 border-white"
                      style={{
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      }}
                    />
                  </motion.div>
                </Dropdown>
              </div>
            ) : (
              // Guest User Section
              <Dropdown
                menu={{ items: guestMenuItems }}
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
            )}

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
            {/* Mobile Welcome Message for authenticated users */}
            {user && (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{
                  x: isMenuOpen ? 0 : -50,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                className="px-4 py-2 bg-red-50 rounded-lg mb-3"
              >
                <span className="text-gray-600 text-sm">Welcome back,</span>
                <span className="ml-1 font-semibold text-red-600">
                  {user.username}
                </span>
              </motion.div>
            )}

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
