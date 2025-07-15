import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

// Define valid roles
export const ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

// Type guard to check if a string is a valid role
const isRole = (role: string): role is Role => {
  return Object.values(ROLES).includes(role as Role);
};

// Middleware to check if user has required role
export const requireRole = (requiredRoles: Role | Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    // Get user role, defaulting to 'user' for backward compatibility
    const userRole = (req.user as any).role || 'user';
    
    // Ensure the role is valid
    if (!isRole(userRole)) {
      throw new ApiError(403, 'Invalid user role');
    }

    // Convert single role to array for consistent handling
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Check if user has required role
    if (!roles.includes(userRole)) {
      throw new ApiError(403, 'Insufficient permissions');
    }

    next();
  };
};

// Middleware specifically for admin routes
export const requireAdmin = requireRole(ROLES.ADMIN);

// Middleware for admin or moderator routes
export const requireModerator = requireRole([ROLES.ADMIN, ROLES.MODERATOR]);

// Type augmentation for Express Request to include user with role
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: Role;
      isAdmin?: boolean; // For backward compatibility
    }
  }
}
