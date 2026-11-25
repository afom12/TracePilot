/**
 * Users Feature Test Data
 */
export const usersData = {
  newUser: {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe99',
    email: 'jane.doe99@example.com',
    phoneNumber: '+15551234567',
    role: 'Admin',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  },
  editUser: {
    firstName: 'CitlalliUpdated',
    lastName: 'SpinkaUpdated',
    role: 'Superadmin',
  },
  validationErrors: {
    firstNameRequired: 'First Name is required.',
    lastNameRequired: 'Last Name is required.',
    usernameRequired: 'Username is required.',
    emailRequired: 'Email is required.',
    phoneRequired: 'Phone number is required.',
    roleRequired: 'Role is required.',
    passwordRequired: 'Password is required.',
    passwordLength: 'Password must be at least 8 characters long.',
    passwordMismatch: "Passwords don't match.",
  },
  filterOptions: {
    roles: ['admin', 'manager', 'cashier', 'superadmin'],
    statuses: ['active', 'inactive', 'invited', 'suspended'],
  },
  searchQueries: {
    existingUsername: 'clair.spinka45',
    existingEmail: 'clair_marks79@hotmail.com',
    nonExistent: 'nonexistentuser9999999',
  },
};
