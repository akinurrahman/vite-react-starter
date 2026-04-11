import { type SidebarGroup } from '@/types/sidebar';

import { USER_ROLES } from './ROLES';

const SA = USER_ROLES.keys.SUPER_ADMIN;
const AD = USER_ROLES.keys.ADMIN;
const ME = USER_ROLES.keys.MEMBER;

export const SIDEBAR_ITEMS = (): SidebarGroup[] => [
  {
    group: 'General',
    roles: [SA, AD, ME],
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: 'LayoutDashboard', roles: [SA, AD, ME] },
      { title: 'Activity', url: '/activity', icon: 'Activity', roles: [SA, AD] },
      { title: 'Notifications', url: '/notifications', icon: 'Bell', roles: [SA, AD, ME] },
    ],
  },
  {
    group: 'Workspace',
    roles: [SA, AD, ME],
    items: [
      { title: 'Projects', url: '/projects', icon: 'FolderKanban', roles: [SA, AD, ME] },
      { title: 'Tasks', url: '/tasks', icon: 'CheckSquare', roles: [SA, AD, ME] },
      { title: 'Calendar', url: '/calendar', icon: 'CalendarDays', roles: [SA, AD, ME] },
      { title: 'Files', url: '/files', icon: 'Folder', roles: [SA, AD] },
    ],
  },
  {
    group: 'Team',
    roles: [SA, AD],
    items: [
      { title: 'Members', url: '/team/members', icon: 'Users', roles: [SA, AD] },
      { title: 'Roles & Permissions', url: '/team/roles', icon: 'Shield', roles: [SA] },
      { title: 'Invitations', url: '/team/invitations', icon: 'UserPlus', roles: [SA, AD] },
    ],
  },
  {
    group: 'Reports',
    roles: [SA, AD],
    items: [
      {
        title: 'Analytics',
        url: '/reports/analytics',
        icon: 'BarChart3',
        roles: [SA, AD],
        items: [
          { title: 'Overview', url: '/reports/analytics/overview' },
          { title: 'Usage', url: '/reports/analytics/usage' },
          { title: 'Performance', url: '/reports/analytics/performance' },
        ],
      },
      { title: 'Logs', url: '/reports/logs', icon: 'FileText', roles: [SA] },
    ],
  },
  {
    group: 'Settings',
    roles: [SA, AD, ME],
    items: [
      { title: 'Profile', url: '/settings/profile', icon: 'User', roles: [SA, AD, ME] },
      { title: 'Billing', url: '/settings/billing', icon: 'CreditCard', roles: [SA, AD] },
      { title: 'Integrations', url: '/settings/integrations', icon: 'Plug', roles: [SA] },
      { title: 'API Keys', url: '/settings/api-keys', icon: 'Key', roles: [SA] },
    ],
  },
];
