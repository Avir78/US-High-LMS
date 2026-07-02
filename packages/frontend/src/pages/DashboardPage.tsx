import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Award, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { userAPI } from '@/api';
import { useAuthStore } from '@/store/authStore';
import { UserProfile } from '@/types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Courses', value: profile?.courses_enrolled || 0 },
    { icon: Zap, label: 'Simulations', value: profile?.simulations_count || 0 },
    { icon: Award, label: 'Badges', value: profile?.badges_count || 0 },
    { icon: TrendingUp, label: 'Points', value: profile?.total_points || 0 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user?.first_name}! 👋
            </h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <Icon className="w-12 h-12 text-primary-500 opacity-20" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                🎓 Browse Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-600 to-secondary-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                🏢 Create Simulation
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};
