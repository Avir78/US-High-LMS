import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { courseAPI } from '@/api';
import { Course } from '@/types';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { BookOpen, Users, Clock } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseAPI.getAllCourses();
        setCourses(data);
      } catch (error) {
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      await courseAPI.enrollCourse(courseId);
      toast.success('Enrolled successfully!');
      // Refresh courses
      const data = await courseAPI.getAllCourses();
      setCourses(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to enroll');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Courses</h1>
            <p className="text-gray-600 mb-8">Explore and enroll in our comprehensive courses</p>

            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="h-40 bg-gradient-to-br from-primary-400 to-secondary-400" />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{course.duration_hours}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{course.students_count} students</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEnroll(course.id)}
                        className="w-full bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition"
                      >
                        Enroll Now
                      </motion.button>
                    </div>
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
