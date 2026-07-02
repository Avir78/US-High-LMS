import { UserRole, UserStatus, EnrollmentStatus, BusinessType } from '../constants/roles';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  birth_date?: Date;
  institution?: string;
  class_level?: number;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

export interface UserProfile extends Omit<User, 'password_hash'> {
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
  created_at: Date;
  updated_at: Date;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: Date;
  progress_percentage: number;
  completed_at?: Date;
  status: EnrollmentStatus;
}

export interface Simulation {
  id: string;
  student_id: string;
  business_type: BusinessType;
  business_name: string;
  capital: number;
  created_at: Date;
  updated_at: Date;
  year_simulated: number;
  is_active: boolean;
}

export interface Transaction {
  id: string;
  simulation_id: string;
  transaction_type: 'income' | 'expense' | 'loan' | 'investment';
  amount: number;
  description: string;
  created_at: Date;
}

export interface Badge {
  id: string;
  student_id: string;
  badge_name: string;
  icon_url: string;
  earned_at: Date;
  description: string;
}

export interface Points {
  id: string;
  student_id: string;
  points_earned: number;
  reason: string;
  created_at: Date;
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

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
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

export interface EnrollmentRequest {
  course_id: string;
}

export interface SimulationSetupRequest {
  business_type: BusinessType;
  business_name: string;
}
