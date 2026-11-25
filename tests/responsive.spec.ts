import { test, expect } from '../fixtures/testFixtures';

test.describe('Responsive Layout Feature @regression', () => {
  test('should adapt and operate on mobile screen width (390px)', async ({
    page,
    dashboardPage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await dashboardPage.gotoDashboard();

    // Verify dashboard heading is visible
    await expect(dashboardPage.heading).toBeVisible();

    // In mobile, sidebar is hidden initially, and header toggle opens mobile sheet
    const sidebarToggle = page.getByRole('button', { name: 'Toggle Sidebar' }).first();
    await expect(sidebarToggle).toBeVisible();
    await sidebarToggle.click();

    // Mobile sidebar sheet should open with navigation links
    const mobileTasksLink = page.getByRole('link', { name: 'Tasks' });
    await expect(mobileTasksLink).toBeVisible();

    // Navigate to Tasks via mobile menu
    await mobileTasksLink.click();
    await expect(page).toHaveURL(/\/tasks/);
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  });

  test('should adapt layout cleanly on tablet screen width (768px)', async ({
    page,
    dashboardPage,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await dashboardPage.gotoDashboard();

    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.totalRevenueCard).toBeVisible();

    // Header search should still function
    const searchButton = page.getByRole('button', { name: /search/i });
    await expect(searchButton).toBeVisible();
  });
});
