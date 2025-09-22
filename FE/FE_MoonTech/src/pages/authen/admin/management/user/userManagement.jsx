import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-12-20",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2024-02-10",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2024-01-28",
  },
];

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add User
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
              placeholder="Search users..."
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
                <th className="pb-4 text-gray-300 font-medium">Name</th>
                <th className="pb-4 text-gray-300 font-medium">Email</th>
                <th className="pb-4 text-gray-300 font-medium">Role</th>
                <th className="pb-4 text-gray-300 font-medium">Status</th>
                <th className="pb-4 text-gray-300 font-medium">Join Date</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="py-4 text-white font-medium">{user.name}</td>
                  <td className="py-4 text-gray-300">{user.email}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-violet-600 text-white"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">{user.joinDate}</td>
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

export default UserManagement;
