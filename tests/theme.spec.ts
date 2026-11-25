import { test, expect } from '../fixtures/testFixtures';

test.describe('Theme Feature @smoke @regression', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.gotoDashboard();
  });

  test('should switch to dark theme and persist after page reload', async ({
    themeToggle,
    page,
  }) => {
    await themeToggle.selectTheme('dark');
    await expect(page).toBeInDarkMode();

    const cookie = await themeToggle.getThemeCookie();
    expect(cookie).toBe('dark');

    // Reload page to verify persistence
    await page.reload();
    await expect(page).toBeInDarkMode();
  });

  test('should switch to light theme and persist after page reload', async ({
    themeToggle,
    page,
  }) => {
    await themeToggle.selectTheme('light');
    await expect(page).toBeInLightMode();

    const cookie = await themeToggle.getThemeCookie();
    expect(cookie).toBe('light');

    // Reload page to verify persistence
    await page.reload();
    await expect(page).toBeInLightMode();
  });

  test('should switch to system theme and save theme preference in cookie', async ({
    themeToggle,
  }) => {
    await themeToggle.selectTheme('system');
    const cookie = await themeToggle.getThemeCookie();
    expect(cookie).toBe('system');
  });
});
