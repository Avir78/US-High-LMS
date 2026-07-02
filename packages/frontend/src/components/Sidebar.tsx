import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen, Zap, BarChart3, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/constants/roles';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', roles: [UserRole.STUDENT, UserRole.TEACHER] },
    { icon: BookOpen, label: 'Courses', path: '/courses', roles: [UserRole.STUDENT, UserRole.TEACHER] },
    { icon: Zap, label: 'Simulations', path: '/simulations', roles: [UserRole.STUDENT] },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: [UserRole.TEACHER, UserRole.ADMIN] },
    { icon: Settings, label: 'Admin Panel', path: '/admin', roles: [UserRole.ADMIN] },
  ];

  const filteredItems = menuItems.filter((item) => item.roles.includes(user?.role as UserRole));

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 bg-primary-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : 0 }}
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed md:relative md:translate-x-0 top-0 left-0 mt-20 md:mt-0 w-64 h-screen bg-gradient-to-b from-primary-950 to-primary-900 border-r border-primary-800 overflow-y-auto z-30`}
      >
        <div className="p-6">
          <h2 className="text-white font-bold text-xl mb-8">Menu</h2>
          <nav className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};
