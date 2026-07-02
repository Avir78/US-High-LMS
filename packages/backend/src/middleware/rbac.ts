import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../exceptions/AppError';
import { UserRole, PERMISSIONS } from '../constants/roles';

export const rbacMiddleware = (requiredRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ForbiddenError('User not authenticated');
    }

    const userRole = req.user.role as UserRole;

    // Admin has all permissions
    if (userRole === UserRole.ADMIN) {
      return next();
    }

    // Check if user has the required role or higher
    const roleHierarchy = [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN];
    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

    if (userRoleIndex < requiredRoleIndex) {
      throw new ForbiddenError('Insufficient permissions for this action');
    }

    next();
  };
};

export const hasPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ForbiddenError('User not authenticated');
    }

    const userRole = req.user.role as UserRole;
    const userPermissions = PERMISSIONS[userRole] || [];

    if (!userPermissions.includes(permission)) {
      throw new ForbiddenError('Permission denied');
    }

    next();
  };
};
