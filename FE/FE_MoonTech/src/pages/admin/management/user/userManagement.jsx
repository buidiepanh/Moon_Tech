import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllUsers } from "../../../../services/apiServices";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
      </div>

      {/* Table */}
      <div className="bg-gray-800 p-6 rounded-xl">
        {/* Search */}
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

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-300 font-medium">ID</th>
                <th className="pb-4 text-gray-300 font-medium">Username</th>
                <th className="pb-4 text-gray-300 font-medium">Email</th>
                <th className="pb-4 text-gray-300 font-medium">Phone</th>
                <th className="pb-4 text-gray-300 font-medium">Gender</th>
                <th className="pb-4 text-gray-300 font-medium">Avatar</th>
                <th className="pb-4 text-gray-300 font-medium">Join Date</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="py-4 text-gray-400 text-sm">{user._id}</td>
                  <td className="py-4 text-white font-medium">
                    {user.username}
                  </td>
                  <td className="py-4 text-gray-300">{user.email}</td>
                  <td className="py-4 text-gray-300">{user.phone}</td>
                  <td className="py-4 text-gray-300 capitalize">
                    {user.gender}
                  </td>
                  <td className="py-4">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
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
