import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { simulationAPI } from '@/api';
import { Simulation } from '@/types';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

export const SimulationsPage: React.FC = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const data = await simulationAPI.getMySimulations();
        setSimulations(data);
      } catch (error) {
        toast.error('Failed to load simulations');
      } finally {
        setLoading(false);
      }
    };

    fetchSimulations();
  }, []);

  const handleCreateSimulation = async () => {
    // This would open a modal for creating a new simulation
    console.log('Create simulation');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">🏢 Business Simulations</h1>
                <p className="text-gray-600">Manage and track your virtual businesses</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateSimulation}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition"
              >
                + New Simulation
              </motion.button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"
                />
              </div>
            ) : simulations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Target size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No simulations yet. Create your first one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {simulations.map((sim, index) => (
                  <motion.div
                    key={sim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sim.business_name}</h3>
                    <p className="text-gray-600 text-sm mb-4 capitalize">{sim.business_type}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-primary-600" />
                        <span className="font-semibold text-gray-900">
                          {(sim.capital / 1000000).toFixed(1)}M XAF
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition"
                    >
                      Open Dashboard
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
