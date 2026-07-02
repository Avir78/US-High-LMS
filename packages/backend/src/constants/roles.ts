export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export enum BusinessType {
  ENTREPRENEURSHIP = 'entrepreneurship',
  HOTEL_MANAGEMENT = 'hotel',
  RESTAURANT = 'restaurant',
  FASHION_RETAIL = 'fashion',
  SPORTS_ENTERTAINMENT = 'sports',
  RETAIL = 'retail',
  PERSONAL_FINANCE = 'finance',
  ACCOUNTING = 'accounting',
  CONSTRUCTION = 'construction',
  AGRICULTURE = 'agriculture',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  CINEMATOGRAPHY = 'cinematography',
  ARCHITECTURE = 'architecture',
  FISHING = 'fishing',
  AUTOMOTIVE = 'automotive',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  DROPPED = 'dropped',
}

export enum GradeLetter {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export const PERMISSIONS = {
  STUDENT: ['view_courses', 'enroll_course', 'take_exam', 'view_grades', 'view_own_profile'],
  TEACHER: [
    'create_course',
    'manage_course',
    'view_students',
    'grade_students',
    'send_messages',
    'view_analytics',
  ],
  ADMIN: [
    'manage_all_users',
    'manage_courses',
    'manage_system',
    'reset_accounts',
    'view_analytics',
    'manage_finances',
    'revoke_accounts',
  ],
} as const;
