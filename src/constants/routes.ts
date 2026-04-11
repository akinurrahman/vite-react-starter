import { type UserRole } from '@/constants/ROLES';

export const DEFAULT_ROUTES_BY_ROLE: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/dashboard',
  MEMBER: '/notifications',
};

export const AUTH_ROUTES = ['/login', '/forgot-password'];
