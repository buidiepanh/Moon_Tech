import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, Card, Button, Rate, Badge, Tag } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
  FireOutlined,
  ThunderboltFilled,
  StarFilled,
} from "@ant-design/icons";

function Home() {
  const [currentHotIndex, setCurrentHotIndex] = useState(0);

  // Carousel banners data
  const banners = [
    {
      id: 1,
      title: "Latest iPhone 15 Pro",
      subtitle: "Experience the Future",
      description: "Revolutionary camera system and A17 Pro chip",
      image:
        "https://images.unsplash.com/photo-1592286630995-d4eb48be8924?w=800&h=400&fit=crop",
      buttonText: "Shop Now",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      title: "Gaming Laptops",
      subtitle: "Power Your Gaming",
      description: "High-performance laptops for ultimate gaming experience",
      image:
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=400&fit=crop",
      buttonText: "Explore",
      gradient: "from-red-600 to-orange-600",
    },
    {
      id: 3,
      title: "Smart Watches",
      subtitle: "Stay Connected",
      description: "Track your fitness and stay connected on the go",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      buttonText: "Discover",
      gradient: "from-green-600 to-teal-600",
    },
    {
      id: 4,
      title: "Wireless Headphones",
      subtitle: "Immersive Audio",
      description: "Premium sound quality with noise cancellation",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop",
      buttonText: "Listen Now",
      gradient: "from-purple-600 to-pink-600",
    },
  ];

  // Big Deal products data
  const bigDeals = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      originalPrice: 1199,
      salePrice: 999,
      discount: 17,
      image:
        "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 2547,
      badge: "LIMITED TIME",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      originalPrice: 1499,
      salePrice: 1299,
      discount: 13,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 1823,
      badge: "BEST SELLER",
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      originalPrice: 349,
      salePrice: 249,
      discount: 29,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 3241,
      badge: "HOT DEAL",
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      originalPrice: 899,
      salePrice: 749,
      discount: 17,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 1456,
      badge: "NEW ARRIVAL",
    },
  ];

  // Hot products data (high rating products)
  const hotProducts = [
    {
      id: 1,
      name: 'iPad Pro 12.9"',
      price: 1099,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 1567,
      category: "Tablet",
    },
    {
      id: 2,
      name: "AirPods Pro 2nd Gen",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 2890,
      category: "Audio",
    },
    {
      id: 3,
      name: "Dell XPS 13",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 945,
      category: "Laptop",
    },
    {
      id: 4,
      name: "Apple Watch Ultra",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 1234,
      category: "Wearable",
    },
    {
      id: 5,
      name: "PlayStation 5",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 3567,
      category: "Gaming",
    },
    {
      id: 6,
      name: "Samsung OLED TV",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 789,
      category: "TV",
    },
  ];

  // Auto-slide hot products
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHotIndex(
        (prev) => (prev + 1) % Math.ceil(hotProducts.length / 3)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [hotProducts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Carousel */}
      <motion.section variants={itemVariants} className="relative">
        <Carousel
          autoplay
          autoplaySpeed={4000}
          effect="fade"
          className="h-96 lg:h-[500px]"
        >
          {banners.map((banner) => (
            <div key={banner.id}>
              <div
                className="relative h-96 lg:h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} bg-opacity-80`}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white max-w-lg"
                    >
                      <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl lg:text-6xl font-bold mb-4"
                      >
                        {banner.title}
                      </motion.h1>
                      <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl lg:text-2xl mb-2 font-medium"
                      >
                        {banner.subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-lg mb-6 opacity-90"
                      >
                        {banner.description}
                      </motion.p>
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="primary"
                          size="large"
                          className="bg-white text-gray-800 border-none hover:bg-gray-100 font-semibold px-8 py-6 h-auto text-lg"
                        >
                          {banner.buttonText}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </motion.section>

      {/* Big Deal Section */}
      <motion.section
        variants={itemVariants}
        className="py-16 bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🔥</div>
          <div className="absolute top-20 right-20 text-6xl">💥</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">⚡</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FireOutlined className="text-4xl text-yellow-400" />
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                BIG DEALS
              </h2>
              <FireOutlined className="text-4xl text-yellow-400" />
            </div>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Unbeatable prices on premium electronics - Limited time offers!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bigDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                <Card
                  hoverable
                  className="h-full shadow-2xl border-0 overflow-hidden bg-white"
                  cover={
                    <div className="relative overflow-hidden">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <Badge.Ribbon
                        text={`-${product.discount}%`}
                        color="red"
                        className="text-sm font-bold"
                      />
                      <Tag
                        color="volcano"
                        className="absolute top-2 left-2 font-bold"
                      >
                        {product.badge}
                      </Tag>
                    </div>
                  }
                  actions={[
                    <Button
                      key="cart"
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="bg-red-500 hover:bg-red-600 border-none"
                    >
                      Add to Cart
                    </Button>,
                    <HeartOutlined
                      key="wishlist"
                      className="text-gray-400 hover:text-red-500"
                    />,
                    <EyeOutlined
                      key="view"
                      className="text-gray-400 hover:text-blue-500"
                    />,
                  ]}
                >
                  <Card.Meta
                    title={
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Rate
                            disabled
                            defaultValue={product.rating}
                            className="text-sm"
                          />
                          <span className="text-gray-500 text-sm">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">
                            ${product.salePrice}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <div className="text-green-600 font-semibold">
                          Save ${product.originalPrice - product.salePrice}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hot Products Section */}
      <motion.section variants={itemVariants} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <StarFilled className="text-4xl text-yellow-500" />
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                HOT PRODUCTS
              </h2>
              <StarFilled className="text-4xl text-yellow-500" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Top-rated products loved by our customers
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHotIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {hotProducts
                  .slice(currentHotIndex * 3, (currentHotIndex + 1) * 3)
                  .map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                    >
                      <Card
                        hoverable
                        className="h-full shadow-lg hover:shadow-xl transition-all duration-300"
                        cover={
                          <div className="relative overflow-hidden">
                            <img
                              alt={product.name}
                              src={product.image}
                              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-2 right-2">
                              <Tag color="blue">{product.category}</Tag>
                            </div>
                          </div>
                        }
                        actions={[
                          <Button
                            key="cart"
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            className="bg-gradient-to-r from-red-500 to-red-600 border-none"
                          >
                            Add to Cart
                          </Button>,
                          <HeartOutlined
                            key="wishlist"
                            className="text-gray-400 hover:text-red-500"
                          />,
                          <EyeOutlined
                            key="view"
                            className="text-gray-400 hover:text-blue-500"
                          />,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold line-clamp-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Rate
                                  disabled
                                  defaultValue={product.rating}
                                  className="text-sm"
                                />
                                <span className="text-gray-500 text-sm">
                                  ({product.reviews})
                                </span>
                              </div>
                            </div>
                          }
                          description={
                            <div className="space-y-2">
                              <div className="text-2xl font-bold text-gray-900">
                                ${product.price}
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(hotProducts.length / 3) }).map(
              (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentHotIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentHotIndex === index ? "bg-red-500" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              )
            )}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Home;
