import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Link } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate register API call
    setTimeout(() => {
      console.log("Register values:", values);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
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
        </div>

        {/* Title */}
        <Title level={2} className="text-center text-red-600">
          Register
        </Title>

        {/* Form */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="mt-6"
        >
          {/* Username Input */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-red-500" />}
              placeholder="Username"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-red-500" />}
              placeholder="Email"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Phone Input */}
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number must start with 0 and have 10 digits!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-red-500" />}
              placeholder="Phone Number"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-red-500" />}
              placeholder="Password"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Confirm Password Input */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-red-500" />}
              placeholder="Confirm Password"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-red-600 hover:bg-red-700 border-none"
              size="large"
            >
              Register
            </Button>
          </Form.Item>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-red-500 hover:text-red-700">
              Login
            </Link>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default Register;
