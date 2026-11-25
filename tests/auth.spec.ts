import { test, expect } from '../fixtures/testFixtures';
import { authData } from '../data/authData';

// Run auth tests in an unauthenticated browser context
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication Feature @smoke @regression', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.gotoSignIn();
  });

  test('should display sign-in form with all necessary elements', async ({ signInPage, page }) => {
    await expect(page.getByRole('heading', { name: 'Shadcn Admin' })).toBeVisible();
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();
    await expect(signInPage.signInButton).toBeVisible();
    await expect(signInPage.forgotPasswordLink).toBeVisible();
    await expect(signInPage.signUpLink).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ signInPage }) => {
    await signInPage.submitEmptyForm();
    await expect(signInPage.getEmailErrorMessage()).toBeVisible();
    await expect(signInPage.getPasswordErrorMessage()).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ signInPage }) => {
    await signInPage.emailInput.fill(authData.invalidFormats.invalidEmail);
    await signInPage.passwordInput.fill(authData.validUser.password);
    await signInPage.signInButton.click();
    await expect(signInPage.getEmailErrorMessage()).toBeVisible();
  });

  test('should show validation error for short password (< 7 characters)', async ({
    signInPage,
  }) => {
    await signInPage.emailInput.fill(authData.validUser.email);
    await signInPage.passwordInput.fill(authData.invalidFormats.shortPassword);
    await signInPage.signInButton.click();
    await expect(signInPage.getPasswordErrorMessage()).toBeVisible();
  });

  test('should successfully log in with valid credentials and redirect to dashboard', async ({
    signInPage,
    page,
  }) => {
    await signInPage.login(authData.validUser.email, authData.validUser.password);
    await expect(page).toHaveURL(/\/(#.*)?$/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });
  });

  test('should respect redirect query parameter after signing in', async ({ signInPage, page }) => {
    await page.goto('/sign-in?redirect=/tasks');
    await signInPage.login(authData.validUser.email, authData.validUser.password);
    await expect(page).toHaveURL(/\/tasks/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible({ timeout: 15000 });
  });
});
