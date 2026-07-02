import { create } from 'zustand';
import { Course } from '@/types';

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  setCourses: (courses: Course[]) => void;
  setSelectedCourse: (course: Course | null) => void;
  addCourse: (course: Course) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  selectedCourse: null,
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  addCourse: (course) =>
    set((state) => ({
      courses: [course, ...state.courses],
    })),
}));
