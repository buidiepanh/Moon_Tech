import React from "react";
import { motion } from "framer-motion";
import { Button, Input, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  HeartFilled,
} from "@ant-design/icons";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Contact", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const productCategories = [
    { label: "Smartphones", href: "#" },
    { label: "Laptops", href: "#" },
    { label: "Headphones", href: "#" },
    { label: "Smart Watches", href: "#" },
    { label: "Gaming", href: "#" },
    { label: "Accessories", href: "#" },
  ];

  const socialIcons = [
    { icon: <FacebookOutlined />, href: "#", color: "#1877F2" },
    { icon: <TwitterOutlined />, href: "#", color: "#1DA1F2" },
    { icon: <InstagramOutlined />, href: "#", color: "#E4405F" },
    { icon: <YoutubeOutlined />, href: "#", color: "#FF0000" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-white text-xl font-bold"
                  >
                    🌙
                  </motion.div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  MoonTech
                </h2>
                <p className="text-sm text-gray-300">Electronics Store</p>
              </div>
            </motion.div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted destination for the latest electronics and
              technology. We bring innovation to your fingertips with premium
              quality products and exceptional customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sm text-gray-300"
              >
                <EnvironmentOutlined className="text-red-400" />
                <span>123 Tech Street, Silicon Valley, CA 94025</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sm text-gray-300"
              >
                <PhoneOutlined className="text-red-400" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-sm text-gray-300"
              >
                <MailOutlined className="text-red-400" />
                <span>info@moontech.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-red-500 pb-2 inline-block">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ x: 5, color: "#EF4444" }}
                  className="block text-gray-300 hover:text-red-400 text-sm transition-all duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Categories */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-red-500 pb-2 inline-block">
              Categories
            </h3>
            <div className="space-y-3">
              {productCategories.map((category, index) => (
                <motion.a
                  key={index}
                  href={category.href}
                  whileHover={{ x: 5, color: "#EF4444" }}
                  className="block text-gray-300 hover:text-red-400 text-sm transition-all duration-300"
                >
                  {category.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b-2 border-red-500 pb-2 inline-block">
              Stay Connected
            </h3>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                Subscribe to get updates on new products and exclusive offers!
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  suffix={<MailOutlined className="text-gray-400" />}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    className="bg-gradient-to-r from-red-500 to-red-600 border-none"
                  />
                </motion.div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm font-medium">Follow Us:</p>
              <div className="flex space-x-3">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{
                      scale: 1.2,
                      y: -3,
                      color: social.color,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Divider className="border-gray-700 my-0" />

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>
              &copy; 2025 MoonTech Electronics Store. All rights reserved.
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 text-gray-400 text-sm"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartFilled className="text-red-500" />
            </motion.div>
            <span>for tech enthusiasts</span>
          </motion.div>

          <div className="flex space-x-4 text-gray-400 text-sm">
            <motion.a
              href="#"
              whileHover={{ color: "#EF4444" }}
              className="hover:text-red-400 transition-colors"
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#EF4444" }}
              className="hover:text-red-400 transition-colors"
            >
              Terms
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#EF4444" }}
              className="hover:text-red-400 transition-colors"
            >
              Support
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
