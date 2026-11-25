import { test, expect } from '../fixtures/testFixtures';
import { runA11yCheck } from '../utils/axeHelper';

test.describe('Accessibility Audits (Axe-Core) @regression', () => {
  test('should pass serious a11y checks on Dashboard', async ({ dashboardPage, page }) => {
    await dashboardPage.gotoDashboard();
    await expect(dashboardPage.heading).toBeVisible();

    const { seriousViolations } = await runA11yCheck(page);
    expect(
      seriousViolations,
      `A11y serious violations on Dashboard: ${JSON.stringify(seriousViolations, null, 2)}`
    ).toEqual([]);
  });

  test('should pass serious a11y checks on Users Page', async ({ usersPage, page }) => {
    await usersPage.gotoUsers();
    await expect(usersPage.heading).toBeVisible();

    const { seriousViolations } = await runA11yCheck(page);
    expect(
      seriousViolations,
      `A11y serious violations on Users page: ${JSON.stringify(seriousViolations, null, 2)}`
    ).toEqual([]);
  });

  test('should pass serious a11y checks on Tasks Page', async ({ tasksPage, page }) => {
    await tasksPage.gotoTasks();
    await expect(tasksPage.heading).toBeVisible();

    const { seriousViolations } = await runA11yCheck(page);
    expect(
      seriousViolations,
      `A11y serious violations on Tasks page: ${JSON.stringify(seriousViolations, null, 2)}`
    ).toEqual([]);
  });

  test('should pass serious a11y checks on Settings Page', async ({ settingsPage, page }) => {
    await settingsPage.gotoProfile();
    await expect(settingsPage.heading).toBeVisible();

    const { seriousViolations } = await runA11yCheck(page);
    expect(
      seriousViolations,
      `A11y serious violations on Settings page: ${JSON.stringify(seriousViolations, null, 2)}`
    ).toEqual([]);
  });

  test('should pass serious a11y checks on Sign-In Page', async ({ page }) => {
    // Unauthenticated sign-in page
    await page.context().clearCookies();
    await page.goto('/sign-in');
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

    const { seriousViolations } = await runA11yCheck(page);
    expect(
      seriousViolations,
      `A11y serious violations on Sign-In page: ${JSON.stringify(seriousViolations, null, 2)}`
    ).toEqual([]);
  });
});
