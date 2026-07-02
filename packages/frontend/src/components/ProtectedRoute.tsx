import React, { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/constants/roles';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== UserRole.ADMIN) {
    navigate('/dashboard');
    return null;
  }

  return <>{children}</>;
};
