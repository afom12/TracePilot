import { test, expect } from '../fixtures/testFixtures';

test.describe('Visual Regression Feature @regression', () => {
  test.beforeEach(async ({ dashboardPage, page }) => {
    await dashboardPage.gotoDashboard();
    await expect(dashboardPage.heading).toBeVisible();
    // Wait for animations and charts to stabilize
    await page.waitForLoadState('networkidle');
  });

  test('should match dashboard visual baseline in light mode', async ({ themeToggle, page }) => {
    await themeToggle.selectTheme('light');
    await expect(page.locator('html')).toHaveClass(/light/);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('dashboard-light.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      fullPage: false,
    });
  });

  test('should match dashboard visual baseline in dark mode', async ({ themeToggle, page }) => {
    await themeToggle.selectTheme('dark');
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('dashboard-dark.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      fullPage: false,
    });
  });
});
