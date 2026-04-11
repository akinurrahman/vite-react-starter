import { lazy } from 'react';

export const LoginPage = lazy(() => import('@/features/auth/login/pages/login'));
export const ForgotPasswordPage = lazy(
  () => import('@/features/auth/forgot-password/pages/forgot-password')
);
export const DashboardPage = lazy(() => import('@/pages/dashboard'));
export const ManagementPage = lazy(() => import('@/pages/management'));
export const ThemeSwitcherPage = lazy(() => import('@/pages/theme-switcher'));
export const AccessDeniedPage = lazy(() => import('@/pages/access-denied'));
export const NotFoundPage = lazy(() => import('@/pages/not-found'));
