import { Suspense } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import LayoutWrapper from '@/components/layout';
import AuthGuard from '@/components/providers/auth-guard';
import AuthLayout from '@/components/providers/auth-layout';
import {
    AccessDeniedPage,
    DashboardPage,
    ForgotPasswordPage,
    LoginPage,
    ManagementPage,
    NotFoundPage,
    ThemeSwitcherPage,
} from '@/lazy-pages';

const s = (el: React.ReactNode) => <Suspense fallback={null}>{el}</Suspense>;

export const router = createBrowserRouter([
    /* ── Root redirect ── */
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },

    /* ── Auth routes ── */
    {
        path: '/login',
        element: <AuthLayout>{s(<LoginPage />)}</AuthLayout>,
    },
    {
        path: '/forgot-password',
        element: <AuthLayout>{s(<ForgotPasswordPage />)}</AuthLayout>,
    },

    /* ── Protected routes ── */
    {
        path: '/dashboard',
        element: (
            <AuthGuard>
                <LayoutWrapper>{s(<DashboardPage />)}</LayoutWrapper>
            </AuthGuard>
        ),
    },
    {
        path: '/management',
        element: (
            <AuthGuard>
                <LayoutWrapper>{s(<ManagementPage />)}</LayoutWrapper>
            </AuthGuard>
        ),
    },

    /* ── Standalone pages ── */
    {
        path: '/theme-switcher',
        element: s(<ThemeSwitcherPage />),
    },
    {
        path: '/access-denied',
        element: s(<AccessDeniedPage />),
    },

    /* ── 404 catch-all ── */
    {
        path: '*',
        element: s(<NotFoundPage />),
    },
]);

