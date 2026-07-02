import { UserRole } from '@/constants/roles';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  birth_date?: string;
  institution?: string;
  class_level?: number;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserProfile extends User {
  total_points: number;
  badges_count: number;
  courses_enrolled: number;
  simulations_count: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number;
  instructor_id: string;
  duration_hours: number;
  content_url?: string;
  pdf_url?: string;
  thumbnail_url?: string;
  students_count: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number;
  completed_at?: string;
  status: 'active' | 'completed' | 'paused' | 'dropped';
}

export interface Simulation {
  id: string;
  student_id: string;
  business_type: string;
  business_name: string;
  capital: number;
  created_at: string;
  updated_at: string;
  year_simulated: number;
  is_active: boolean;
}

export interface Transaction {
  id: string;
  simulation_id: string;
  transaction_type: 'income' | 'expense' | 'loan' | 'investment';
  amount: number;
  description: string;
  created_at: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: Record<string, string>;
  meta?: {
    timestamp: string;
    version: string;
  };
}
