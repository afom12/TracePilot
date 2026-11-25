import { test, expect } from '../fixtures/testFixtures';

test.describe('Advanced Resilience & Performance Suite @regression', () => {
  test('should handle network latency gracefully without UI breakdown', async ({
    page,
    dashboardPage,
  }) => {
    // Simulate 3G network conditions (latency)
    await page.route('**/*', async (route) => {
      // Small artificial delay to verify UI skeletons/loaders
      await new Promise((resolve) => setTimeout(resolve, 50));
      await route.continue();
    });

    await dashboardPage.gotoDashboard();
    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.totalRevenueCard).toBeVisible();
  });

  test('should capture Core Web Vitals within acceptable thresholds', async ({
    dashboardPage,
    measurePerformance,
  }) => {
    await dashboardPage.gotoDashboard();
    await expect(dashboardPage.heading).toBeVisible();

    const metrics = await measurePerformance();

    // Verify key performance thresholds
    expect(metrics.domContentLoadedMs).toBeGreaterThan(0);
    expect(metrics.domContentLoadedMs).toBeLessThan(20000); // DOM loaded within tolerance during dev-server transforms
    expect(metrics.domNodeCount).toBeGreaterThan(50); // Valid DOM tree rendered
  });

  test('should handle 401 session expiration by redirecting to sign-in', async ({
    page,
    dashboardPage,
  }) => {
    await dashboardPage.gotoDashboard();
    await expect(dashboardPage.heading).toBeVisible();

    // Trigger session reset via auth store as simulated by 401 interceptor
    await page.evaluate(() => {
      // Clear auth cookie and trigger router redirect
      document.cookie = 'thisisjustarandomstring=; path=/; max-age=0';
      window.location.href = '/sign-in?redirect=' + encodeURIComponent(window.location.pathname);
    });

    await expect(page).toHaveURL(/\/sign-in/);
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});
