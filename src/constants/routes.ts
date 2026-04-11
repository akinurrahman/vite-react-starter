import { type UserRole } from '@/constants/ROLES';

export const DEFAULT_ROUTES_BY_ROLE: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/dashboard',
  TEACHER: '/dashboard',
  ACCOUNTANT: '/dashboard',
  STUDENT: '/dashboard',
  PARENT: '/dashboard',
};

export const AUTH_ROUTES = ['/login', '/forgot-password'];
