import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Eye, Filter, Plus, Search, Trash2, X } from "lucide-react";
import { Form, Input, Select, InputNumber, Button, message, Modal } from "antd";
import {
  addNewProduct,
  deleteProduct,
  getAllBrands,
  getAllCategories,
  getAllProducts,
  updateProduct,
} from "../../../../../services/apiServices";
import toast from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllDatas();
  }, []);

  const fetchAllDatas = async () => {
    try {
      const res1 = await getAllProducts();
      const res2 = await getAllBrands();
      const res3 = await getAllCategories();
      setProducts(res1);
      setBrand(res2);
      setCategory(res3);
    } catch (error) {
      console.log(error);
      message.error("Failed to load data");
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      description: product.description,
      brand: product.brand._id || product.brand.brandName,
      category: product.category._id || product.category.cateName,
      image: product.image,
      sale: product.sale,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProduct) {
        const res = await updateProduct(editingProduct._id, values);
        if (!res) {
          toast.error("Update product failed!");
        } else {
          toast.success("Product updated successfully!");
          fetchAllDatas();
        }
      } else {
        const res = await addNewProduct(values);
        if (!res) {
          toast.error("Product added failed!");
        } else {
          toast.success("Product added successfully!");
          fetchAllDatas();
        }
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);

      if (!res) {
        toast.error("Delete product failed!");
        setDeleteProductId(null);
      } else {
        toast.success("Delete product success!");
        fetchAllDatas();
        setDeleteProductId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.cateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <button
          onClick={openAddModal}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-gray-800 p-6 rounded-xl">
        {/* Search + Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Filter size={20} />
            Filter
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-300 font-medium">ID</th>
                <th className="pb-4 text-gray-300 font-medium">Product Name</th>
                <th className="pb-4 text-gray-300 font-medium">Category</th>
                <th className="pb-4 text-gray-300 font-medium">Brand</th>
                <th className="pb-4 text-gray-300 font-medium">Price (VND)</th>
                <th className="pb-4 text-gray-300 font-medium">Sale (%)</th>
                <th className="pb-4 text-gray-300 font-medium">Image</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="py-4 text-gray-400 text-sm">{product._id}</td>
                  <td className="py-4 text-white font-medium">
                    {product.name}
                  </td>
                  <td className="py-4 text-gray-300">
                    {product.category.cateName}
                  </td>
                  <td className="py-4 text-gray-300">
                    {product.brand.brandName}
                  </td>
                  <td className="py-4 text-white">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="py-4 text-white">{product.sale}%</td>
                  <td className="py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => setDeleteProductId(product._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {deleteProductId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteProductId(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteProductId)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ant Design Modal */}
      <Modal
        title={
          <span className="text-white">
            {editingProduct ? "Edit Product" : "Add Product"}
          </span>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="product-modal"
        styles={{
          content: {
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
          },
          header: {
            backgroundColor: "#1f2937",
            borderBottom: "1px solid #374151",
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          {/* Name Field */}
          <Form.Item
            name="name"
            label={<span className="text-gray-300">Name</span>}
            rules={[
              { required: true, message: "Please enter product name!" },
              {
                min: 2,
                message: "Product name must be at least 2 characters!",
              },
            ]}
          >
            <Input
              placeholder="Enter product name"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          {/* Price Field */}
          <Form.Item
            name="price"
            label={<span className="text-gray-300">Price (VND)</span>}
            rules={[
              { required: true, message: "Please enter product price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be greater than 0!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter price"
              className="w-full bg-gray-700 border-gray-600"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            name="description"
            label={<span className="text-gray-300">Description</span>}
            rules={[
              { required: true, message: "Please enter product description!" },
              {
                min: 10,
                message: "Description must be at least 10 characters!",
              },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Enter product description"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          {/* Brand Dropdown */}
          <Form.Item
            name="brand"
            label={<span className="text-gray-300">Brand</span>}
            rules={[{ required: true, message: "Please select a brand!" }]}
          >
            <Select
              placeholder="Select a brand"
              className="brand-select"
              dropdownClassName="custom-select-dropdown"
            >
              {brand.map((brandItem) => (
                <Option key={brandItem._id} value={brandItem._id}>
                  {brandItem.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Category Dropdown */}
          <Form.Item
            name="category"
            label={<span className="text-gray-300">Category</span>}
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select a category"
              className="category-select"
              dropdownClassName="custom-select-dropdown"
            >
              {category.map((categoryItem) => (
                <Option key={categoryItem._id} value={categoryItem._id}>
                  {categoryItem.cateName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Image URL Field */}
          <Form.Item
            name="image"
            label={<span className="text-gray-300">Image URL</span>}
            rules={[
              { required: true, message: "Please enter image URL!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input
              placeholder="Enter image URL"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          {/* Sale Field */}
          <Form.Item
            name="sale"
            label={<span className="text-gray-300">Sale (%)</span>}
            rules={[
              { required: true, message: "Please enter sale percentage!" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Sale must be between 0 and 100!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter sale percentage"
              className="w-full bg-gray-700 border-gray-600"
              min={0}
              max={100}
            />
          </Form.Item>

          {/* Form Actions */}
          <Form.Item className="mb-0 mt-6">
            <div className="flex justify-end gap-2">
              <Button
                onClick={closeModal}
                className="bg-gray-600 border-gray-600 text-white hover:bg-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-violet-600 border-violet-600 hover:bg-violet-700"
              >
                {editingProduct ? "Update" : "Add"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Custom CSS for dark theme */}
      <style jsx>{`
        .product-modal .ant-modal-content {
          background-color: #1f2937 !important;
        }

        .product-modal .ant-modal-header {
          background-color: #1f2937 !important;
          border-bottom: 1px solid #374151 !important;
        }

        .product-modal .ant-form-item-label > label {
          color: #d1d5db !important;
        }

        .product-modal .ant-input,
        .product-modal .ant-input-number,
        .product-modal .ant-select-selector {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }

        .product-modal .ant-input::placeholder,
        .product-modal .ant-input-number input::placeholder {
          color: #9ca3af !important;
        }

        .product-modal .ant-select-arrow {
          color: #9ca3af !important;
        }

        .custom-select-dropdown {
          background-color: #374151 !important;
        }

        .custom-select-dropdown .ant-select-item {
          color: white !important;
        }

        .custom-select-dropdown .ant-select-item-option-selected {
          background-color: #4f46e5 !important;
        }

        .custom-select-dropdown .ant-select-item:hover {
          background-color: #4b5563 !important;
        }

        .product-modal .ant-form-item-explain-error {
          color: #f87171 !important;
        }

        .product-modal .ant-input:focus,
        .product-modal .ant-input-focused,
        .product-modal .ant-input-number:focus,
        .product-modal .ant-input-number-focused,
        .product-modal .ant-select:focus .ant-select-selector,
        .product-modal .ant-select-focused .ant-select-selector {
          border-color: #8b5cf6 !important;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
        }
      `}</style>
    </motion.div>
  );
}

export default ProductManagement;
