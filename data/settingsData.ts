/**
 * Settings Feature Test Data
 */
export const settingsData = {
  profile: {
    valid: {
      username: 'tracepilot_user',
      bio: 'Professional test automation engineer with TracePilot and Playwright.',
      url: 'https://github.com/satnaing/shadcn-admin',
    },
    invalid: {
      username: 'a', // Too short (< 2 chars)
    },
    validationErrors: {
      usernameShort: 'Username must be at least 2 characters.',
      invalidUrl: 'Please enter a valid URL.',
    },
  },
  account: {
    valid: {
      name: 'TracePilot Lead Engineer',
      language: 'English',
    },
    validationErrors: {
      nameRequired: 'Name is required.',
    },
  },
  appearance: {
    fonts: ['inter', 'manrope', 'system'],
    themes: ['Light', 'Dark'],
  },
};
