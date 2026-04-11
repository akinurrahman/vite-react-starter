import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutWrapper from '@/components/layout';
import AuthGuard from '@/components/providers/auth-guard';
import AuthLayout from '@/components/providers/auth-layout';
import {
    LandingPage,
    LoginPage, ForgotPasswordPage,
    DashboardPage, ThemeSwitcherPage,
    AccessDeniedPage, NotFoundPage,
    ActivityPage, NotificationsPage,
    ProjectsPage, TasksPage, CalendarPage, FilesPage,
    MembersPage, RolesPage, InvitationsPage,
    AnalyticsPage, AnalyticsOverviewPage, AnalyticsUsagePage,
    AnalyticsPerformancePage, LogsPage,
    ProfilePage, BillingPage, IntegrationsPage, ApiKeysPage,
} from '@/lazy-pages';
import { FullScreenLoader } from './components/loader/loader';

const s = (el: React.ReactNode) => <Suspense fallback={<FullScreenLoader />}>{el}</Suspense>;

export const router = createBrowserRouter([
    { path: '/', element: s(<LandingPage />) },

    /* ── Auth routes ── */
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: s(<LoginPage />) },
            { path: '/forgot-password', element: s(<ForgotPasswordPage />) },
        ],
    },

    /* ── Protected routes ── */
    {
        element: <AuthGuard><LayoutWrapper /></AuthGuard>,
        children: [
            { path: '/dashboard', element: s(<DashboardPage />) },
            { path: '/notifications', element: s(<NotificationsPage />) },
            { path: '/projects', element: s(<ProjectsPage />) },
            { path: '/tasks', element: s(<TasksPage />) },
            { path: '/calendar', element: s(<CalendarPage />) },
            { path: '/activity', element: s(<ActivityPage />) },
            { path: '/files', element: s(<FilesPage />) },

            /* Team */
            { path: '/team/members', element: s(<MembersPage />) },
            { path: '/team/invitations', element: s(<InvitationsPage />) },
            { path: '/team/roles', element: s(<RolesPage />) },

            /* Reports */
            { path: '/reports/analytics', element: s(<AnalyticsPage />) },
            { path: '/reports/analytics/overview', element: s(<AnalyticsOverviewPage />) },
            { path: '/reports/analytics/usage', element: s(<AnalyticsUsagePage />) },
            { path: '/reports/analytics/performance', element: s(<AnalyticsPerformancePage />) },
            { path: '/reports/logs', element: s(<LogsPage />) },

            /* Settings */
            { path: '/settings/profile', element: s(<ProfilePage />) },
            { path: '/settings/billing', element: s(<BillingPage />) },
            { path: '/settings/integrations', element: s(<IntegrationsPage />) },
            { path: '/settings/api-keys', element: s(<ApiKeysPage />) },
        ],
    },

    /* ── Standalone ── */
    { path: '/theme-switcher', element: s(<ThemeSwitcherPage />) },
    { path: '/access-denied', element: s(<AccessDeniedPage />) },
    { path: '*', element: s(<NotFoundPage />) },
]);