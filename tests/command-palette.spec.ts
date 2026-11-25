import { test, expect } from '../fixtures/testFixtures';

test.describe('Command Palette Feature @smoke @regression', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.gotoDashboard();
  });

  test('should open command palette using keyboard shortcut', async ({ commandPalette }) => {
    await commandPalette.openWithKeyboardShortcut();
    await expect(commandPalette.dialog).toBeVisible();
    await expect(commandPalette.searchInput).toBeVisible();
    await commandPalette.close();
  });

  test('should open command palette by clicking header search button', async ({
    header,
    commandPalette,
  }) => {
    await header.openCommandPalette();
    await expect(commandPalette.dialog).toBeVisible();
    await expect(commandPalette.searchInput).toBeVisible();
    await commandPalette.close();
  });

  test('should filter command results when typing query', async ({ commandPalette }) => {
    await commandPalette.openWithKeyboardShortcut();
    await commandPalette.search('Tasks');
    await expect(commandPalette.dialog.getByText('Tasks').first()).toBeVisible();

    await commandPalette.search('nonexistentsearchqueryxyz123');
    await expect(commandPalette.emptyResults).toBeVisible();
    await commandPalette.close();
  });

  test('should navigate to page when clicking a command item', async ({ commandPalette, page }) => {
    await commandPalette.openWithKeyboardShortcut();
    await commandPalette.search('Users');
    await commandPalette.selectItem('Users');
    await expect(page).toHaveURL(/\/users/);
    await expect(page.getByRole('heading', { name: 'User List' })).toBeVisible();
  });

  test('should close command palette on Escape key', async ({ commandPalette }) => {
    await commandPalette.openWithKeyboardShortcut();
    await expect(commandPalette.dialog).toBeVisible();
    await commandPalette.close();
    await expect(commandPalette.dialog).toBeHidden();
  });
});
