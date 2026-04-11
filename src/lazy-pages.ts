import { lazy } from 'react';

import { dummy } from '@/lib/dummy-page';

export const LoginPage = lazy(() => import('@/features/auth/login/pages/login'));
export const ForgotPasswordPage = lazy(
  () => import('@/features/auth/forgot-password/pages/forgot-password')
);
export const DashboardPage = lazy(() => import('@/pages/dashboard'));
export const ThemeSwitcherPage = lazy(() => import('@/pages/theme-switcher'));
export const AccessDeniedPage = lazy(() => import('@/pages/access-denied'));
export const NotFoundPage = lazy(() => import('@/pages/not-found'));

// Dummy pages
export const ActivityPage = dummy('Activity');
export const NotificationsPage = dummy('Notifications');
export const ProjectsPage = dummy('Projects');
export const TasksPage = dummy('Tasks');
export const CalendarPage = dummy('Calendar');
export const FilesPage = dummy('Files');
export const MembersPage = dummy('Members');
export const RolesPage = dummy('Roles & Permissions');
export const InvitationsPage = dummy('Invitations');
export const AnalyticsPage = dummy('Analytics');
export const AnalyticsOverviewPage = dummy('Analytics — Overview');
export const AnalyticsUsagePage = dummy('Analytics — Usage');
export const AnalyticsPerformancePage = dummy('Analytics — Performance');
export const LogsPage = dummy('Logs');
export const ProfilePage = dummy('Profile');
export const BillingPage = dummy('Billing');
export const IntegrationsPage = dummy('Integrations');
export const ApiKeysPage = dummy('API Keys');
