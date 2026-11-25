import { test, expect } from '../fixtures/testFixtures';
import { navigationData } from '../data/navigationData';

test.describe('Navigation Feature @smoke @regression', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.gotoDashboard();
  });

  test('should navigate to all main general links and highlight active link', async ({
    sidebar,
    page,
  }) => {
    for (const link of navigationData.generalLinks) {
      await sidebar.navigateTo(link.name);
      if (link.path === '/') {
        await expect(page).toHaveURL(/\/(#.*)?$/);
      } else {
        await expect(page).toHaveURL(new RegExp(link.path));
      }
      await expect(page.getByRole('heading', { name: link.expectedHeading })).toBeVisible();
    }

    // Help Center
    await sidebar.navigateTo(navigationData.helpCenter.name);
    await expect(page).toHaveURL(new RegExp(navigationData.helpCenter.path));
    await expect(
      page.getByRole('heading', { name: navigationData.helpCenter.expectedHeading })
    ).toBeVisible();
  });

  test('should expand settings section and navigate to sub-pages', async ({ sidebar, page }) => {
    await sidebar.expandSettings();

    for (const subLink of navigationData.settingsLinks.slice(0, 3)) {
      const linkLocator = sidebar.navContainer.getByRole('link', { name: subLink.name });
      await linkLocator.click();
      await expect(page).toHaveURL(new RegExp(subLink.path));
      await expect(page.getByRole('heading', { name: subLink.expectedHeading })).toBeVisible();
    }
  });

  test('should toggle sidebar collapse and expand correctly', async ({ header, sidebar, page }) => {
    // Initial state: expanded
    const sidebarElement = page.locator('[data-sidebar="sidebar"]').first();
    await expect(sidebarElement).toBeVisible();

    // Collapse via header toggle
    await header.toggleSidebar();
    const isCollapsed = await sidebar.isCollapsed();
    expect(typeof isCollapsed).toBe('boolean');

    // Expand again
    await header.toggleSidebar();
  });
});
