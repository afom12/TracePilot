/**
 * Navigation Test Data
 */
export const navigationData = {
  generalLinks: [
    { name: 'Dashboard', path: '/', expectedHeading: 'Dashboard' },
    { name: 'Tasks', path: '/tasks', expectedHeading: 'Tasks' },
    { name: 'Apps', path: '/apps', expectedHeading: 'App Integrations' },
    { name: 'Chats', path: '/chats', expectedHeading: 'Inbox' },
    { name: 'Users', path: '/users', expectedHeading: 'User List' },
  ],
  settingsLinks: [
    { name: 'Profile', path: '/settings', expectedHeading: 'Profile' },
    { name: 'Account', path: '/settings/account', expectedHeading: 'Account' },
    { name: 'Appearance', path: '/settings/appearance', expectedHeading: 'Appearance' },
    { name: 'Notifications', path: '/settings/notifications', expectedHeading: 'Notifications' },
    { name: 'Display', path: '/settings/display', expectedHeading: 'Display' },
  ],
  errorLinks: [
    { name: 'Unauthorized', path: '/errors/unauthorized', expectedCode: '401' },
    { name: 'Forbidden', path: '/errors/forbidden', expectedCode: '403' },
    { name: 'Not Found', path: '/errors/not-found', expectedCode: '404' },
    { name: 'Internal Server Error', path: '/errors/internal-server-error', expectedCode: '500' },
    { name: 'Maintenance Error', path: '/errors/maintenance-error', expectedCode: '503' },
  ],
  helpCenter: {
    name: 'Help Center',
    path: '/help-center',
    expectedHeading: 'Coming Soon!',
  },
};
