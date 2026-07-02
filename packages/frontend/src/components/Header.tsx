import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-800 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">LMS</span>
          </div>
          <h1 className="text-white font-bold text-2xl hidden sm:block">US High LMS</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-white bg-opacity-10 rounded-lg px-3 py-2 flex-1 max-w-xs mx-8">
          <Search size={18} className="text-gray-300" />
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition">
            <Bell size={20} className="text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.first_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-sm">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-gray-300 text-xs capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition text-red-300"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
