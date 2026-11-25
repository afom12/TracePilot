import { test, expect } from '../fixtures/testFixtures';

test.describe('Error Pages Feature @regression', () => {
  test('should render 404 screen when navigating to an unknown route', async ({ page }) => {
    await page.goto('/unknown-nonexistent-path-12345');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
    await expect(page.getByText(/Oops! Page Not Found!/i)).toBeVisible();

    const backToHome = page.getByRole('button', { name: 'Back to Home' });
    await expect(backToHome).toBeVisible();
    await backToHome.click();
    await expect(page).toHaveURL(/\/(#.*)?$/);
  });

  test('should render 401 Unauthorized error page', async ({ errorPage, page }) => {
    await errorPage.gotoError('unauthorized');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('401');
    await expect(page.getByText(/Unauthorized Access/i)).toBeVisible();
  });

  test('should render 403 Forbidden error page', async ({ errorPage, page }) => {
    await errorPage.gotoError('forbidden');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('403');
    await expect(page.getByText(/Access Forbidden/i)).toBeVisible();
  });

  test('should render 404 Not Found error page from route', async ({ errorPage, page }) => {
    await errorPage.gotoError('not-found');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
    await expect(page.getByText(/Oops! Page Not Found!/i)).toBeVisible();
  });

  test('should render 500 Internal Server Error page', async ({ errorPage, page }) => {
    await errorPage.gotoError('internal-server-error');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('500');
    await expect(page.getByText(/Internal Server Error/i)).toBeVisible();
  });

  test('should render 503 Maintenance Error page', async ({ errorPage, page }) => {
    await errorPage.gotoError('maintenance-error');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('503');
    await expect(page.getByText(/Website is under maintenance/i)).toBeVisible();
  });
});
