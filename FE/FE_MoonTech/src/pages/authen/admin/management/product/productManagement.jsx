import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 150,
    status: "Active",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 75,
    status: "Active",
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 49.99,
    stock: 200,
    status: "Active",
  },
  {
    id: 4,
    name: "USB-C Cable",
    category: "Accessories",
    price: 19.99,
    stock: 0,
    status: "Out of Stock",
  },
];

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
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

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-300 font-medium">Product Name</th>
                <th className="pb-4 text-gray-300 font-medium">Category</th>
                <th className="pb-4 text-gray-300 font-medium">Price</th>
                <th className="pb-4 text-gray-300 font-medium">Stock</th>
                <th className="pb-4 text-gray-300 font-medium">Status</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="py-4 text-white font-medium">
                    {product.name}
                  </td>
                  <td className="py-4 text-gray-300">{product.category}</td>
                  <td className="py-4 text-white">${product.price}</td>
                  <td className="py-4">
                    <span
                      className={`${
                        product.stock === 0 ? "text-red-400" : "text-gray-300"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
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
    </motion.div>
  );
}

export default ProductManagement;
