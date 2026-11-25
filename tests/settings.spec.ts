import { test, expect } from '../fixtures/testFixtures';
import { settingsData } from '../data/settingsData';

test.describe('Settings Feature @smoke @regression', () => {
  test('should validate and save profile settings form', async ({ settingsPage, page }) => {
    await settingsPage.gotoProfile();
    await expect(settingsPage.heading).toBeVisible();

    // Trigger validation error with short username
    await settingsPage.usernameInput.clear();
    await settingsPage.usernameInput.fill(settingsData.profile.invalid.username);
    await settingsPage.updateProfileButton.click();
    await expect(page.getByText(settingsData.profile.validationErrors.usernameShort)).toBeVisible();

    // Fill valid username and select email, then submit
    await settingsPage.usernameInput.fill(settingsData.profile.valid.username);
    await settingsPage.bioInput.fill(settingsData.profile.valid.bio);
    await settingsPage.selectProfileEmail('m@example.com');
    await settingsPage.updateProfileButton.click();

    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should validate and save account settings form', async ({ settingsPage, page }) => {
    await settingsPage.gotoAccount();
    await expect(page.getByRole('heading', { name: 'Account' })).toBeVisible();

    // Clear name to trigger validation
    await settingsPage.nameInput.clear();
    await settingsPage.updateAccountButton.click();
    await expect(page.getByText(/Please enter your name|Name must be at least/i)).toBeVisible();

    // Fill valid name, select date of birth and language, then submit
    await settingsPage.nameInput.fill(settingsData.account.valid.name);
    await settingsPage.selectAccountDateOfBirth();
    await settingsPage.selectAccountLanguage('English');
    await settingsPage.updateAccountButton.click();
    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should select and save appearance preferences', async ({ settingsPage, page }) => {
    await settingsPage.gotoAppearance();
    await expect(page.getByRole('heading', { name: 'Appearance' })).toBeVisible();

    // Select Dark theme radio
    await settingsPage.selectAppearanceTheme('Dark');
    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });
});
