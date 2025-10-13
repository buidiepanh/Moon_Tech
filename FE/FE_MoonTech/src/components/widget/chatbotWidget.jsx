import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Button, Spin } from "antd";
import { chatWithAI } from "../../services/apiServices";

const formatBotReply = (text) => {
  const productRegex =
    /\*\*Tên:\*\*\s*(.*?)\s*\*\*Giá:\*\*\s*(.*?)\s*\*\*Giảm giá:\*\*\s*(.*?)\%?\s*\*\*Mô tả:\*\*\s*(.*?)\s*\*\*Đánh giá:\*\*\s*(.*?)\/5/;

  const match = text.match(productRegex);

  if (match) {
    const [fullMatch, name, price, sale, desc, rating] = match;

    // Tách phần text trước sản phẩm
    const beforeText = text.substring(0, text.indexOf(fullMatch)).trim();

    // Format giá (loại bỏ dấu ₫ và spaces nếu có)
    const cleanPrice = price.replace(/[₫\s]/g, "").trim();

    // Format % giảm giá (loại bỏ % nếu có)
    const cleanSale = sale.replace(/[%\s]/g, "").trim();

    return (
      <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 shadow-sm">
        {beforeText && (
          <p className="text-gray-700 mb-3 pb-3 border-b">💬 {beforeText}</p>
        )}

        <div className="bg-white rounded-lg border p-4 space-y-2">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            {name.trim()}
          </h3>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">
              <b>Giá:</b>
            </span>
            <span className="text-lg font-bold text-red-600">
              {cleanPrice.trim()}₫
            </span>
          </div>

          {/* Sale */}
          {cleanSale && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">
                <b>Giảm giá:</b>
              </span>
              <span className="text-green-600 font-semibold">
                -{cleanSale}%
              </span>
            </div>
          )}

          {/* Description */}
          <div className="pt-2 border-t">
            <p className="text-sm text-gray-700 leading-relaxed">
              <b>Mô tả:</b> {desc.trim()}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-semibold">
              {rating.trim()}/5 ({rating.trim()} sao)
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (text.includes("**")) {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return (
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  }

  return <span className="text-gray-700 leading-relaxed">{text}</span>;
};

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Xin chào 👋! Mình là MoontechBot. Bạn muốn tìm sản phẩm điện tử nào ạ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        message: input,
      };
      const res = await chatWithAI(payload);
      if (res && res.reply) {
        setMessages((prev) => [...prev, { role: "bot", text: res.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Xin lỗi, mình không hiểu câu hỏi của bạn 😅" },
        ]);
      }
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Đã xảy ra lỗi khi kết nối với máy chủ 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nút mở chat */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageOutlined />}
          onClick={toggleChat}
          className="bg-red-600 border-none shadow-lg"
        />
      </motion.div>

      {/* Cửa sổ chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RobotOutlined className="text-xl" />
                <span className="font-semibold text-lg">MoontechBot</span>
              </div>
              <CloseOutlined
                onClick={toggleChat}
                className="cursor-pointer hover:text-gray-200"
              />
            </div>

            {/* Nội dung chat */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <RobotOutlined className="mr-2 text-gray-500" />
                    )}
                    {msg.role === "bot" ? formatBotReply(msg.text) : msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <Spin size="small" />
                </div>
              )}
            </div>

            {/* Ô nhập tin nhắn */}
            <div className="border-t p-3 flex items-center space-x-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={loading}
                className="bg-red-600 border-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBotWidget;
