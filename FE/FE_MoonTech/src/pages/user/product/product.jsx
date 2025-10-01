import React, { useEffect, useState } from "react";
import { Card, Input, Slider, Select, Badge, Rate, Empty, Spin } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllBrands,
  getAllCategories,
  getAllProducts,
} from "../../../services/apiServices";

const { Meta } = Card;
const { Option } = Select;

function Product() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [maxPrice, setMaxPrice] = useState(50000000);

  useEffect(() => {
    fetchInformations();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedBrands, selectedCategories, priceRange]);

  const fetchInformations = async () => {
    try {
      setLoading(true);
      const res1 = await getAllProducts();
      setProducts(res1);
      setFilteredProducts(res1);

      const res2 = await getAllBrands();
      setBrands(res2);

      const res3 = await getAllCategories();
      setCategories(res3);

      // Calculate max price
      if (res1.length > 0) {
        const max = Math.max(...res1.map((p) => p.price));
        setMaxPrice(max);
        setPriceRange([0, max]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand._id)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category._id)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateDiscountedPrice = (price, sale) => {
    return price - (price * sale) / 100;
  };

  const handleCardClick = (productId) => {
    // Replace with your navigation logic
    // Example: navigate(`/product-detail/${productId}`);
    window.location.href = `/product-detail/${productId}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-red-600 mb-2">Our Products</h1>
          <p className="text-gray-600">
            Discover amazing deals on our latest collection
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-red-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <FilterOutlined className="text-red-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <Input
                placeholder="Search by name..."
                prefix={<SearchOutlined className="text-red-400" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hover:border-red-400 focus:border-red-500"
                size="large"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <Select
                mode="multiple"
                placeholder="Select brands"
                value={selectedBrands}
                onChange={setSelectedBrands}
                className="w-full"
                size="large"
                maxTagCount={1}
              >
                {brands.map((brand) => (
                  <Option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                mode="multiple"
                placeholder="Select categories"
                value={selectedCategories}
                onChange={setSelectedCategories}
                className="w-full"
                size="large"
                maxTagCount={1}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.cateName}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="pt-2">
                <Slider
                  range
                  min={0}
                  max={maxPrice}
                  value={priceRange}
                  onChange={setPriceRange}
                  tooltip={{
                    formatter: (value) => formatPrice(value),
                  }}
                  trackStyle={[{ backgroundColor: "#dc2626" }]}
                  handleStyle={[
                    { borderColor: "#dc2626" },
                    { borderColor: "#dc2626" },
                  ]}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-red-600">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <Empty description="No products found" className="my-16" />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                >
                  <Badge.Ribbon
                    text={product.sale > 0 ? `-${product.sale}%` : null}
                    color="red"
                    className={product.sale > 0 ? "" : "hidden"}
                  >
                    <Card
                      hoverable
                      onClick={() => handleCardClick(product._id)}
                      cover={
                        <div className="relative overflow-hidden h-64 bg-gray-100">
                          <img
                            alt={product.name}
                            src={product.image}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/400x400?text=No+Image";
                            }}
                          />
                        </div>
                      }
                      className="h-full border-2 border-transparent hover:border-red-200 transition-all duration-300 rounded-xl overflow-hidden"
                      bodyStyle={{ padding: "16px" }}
                    >
                      {/* Category Badge */}
                      <div className="mb-2">
                        <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                          {product.category.cateName}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                        {product.name}
                      </h3>

                      {/* Brand */}
                      <p className="text-sm text-gray-500 mb-3">
                        {product.brand.brandName}
                      </p>

                      {/* Rating */}
                      <div className="mb-3">
                        <Rate
                          disabled
                          defaultValue={product.rating}
                          allowHalf
                          className="text-sm"
                          style={{ color: "#dc2626" }}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        {product.sale > 0 ? (
                          <>
                            <span className="text-xl font-bold text-red-600">
                              {formatPrice(
                                calculateDiscountedPrice(
                                  product.price,
                                  product.sale
                                )
                              )}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-red-600">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Product;
