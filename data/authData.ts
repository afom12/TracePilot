/**
 * Authentication Test Data
 */
export const authData = {
  validUser: {
    email: 'admin@example.com',
    password: 'password123',
    accountNo: 'ACC001',
  },
  invalidCredentials: {
    email: 'wrong@example.com',
    password: 'wrongpassword123',
  },
  invalidFormats: {
    invalidEmail: 'invalid-email-format',
    shortPassword: '123',
  },
  validationErrors: {
    emptyEmail: 'Please enter your email.',
    invalidEmail: 'Invalid email address',
    emptyPassword: 'Please enter your password.',
    shortPassword: 'Password must be at least 7 characters long.',
  },
  redirects: {
    defaultPath: '/',
    tasksPath: '/tasks',
    usersPath: '/users',
    settingsPath: '/settings',
    signInPath: '/sign-in',
  },
  cookies: {
    authCookieName: 'thisisjustarandomstring',
    authCookieValue: '"mock-access-token"',
  },
};
