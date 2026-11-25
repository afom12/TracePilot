import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { authData } from '../data/authData';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate and save storage state', async ({ page }) => {
  // Ensure the directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Go to sign-in page
  await page.goto('/sign-in');
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

  // Fill credentials
  await page.getByRole('textbox', { name: 'Email' }).fill(authData.validUser.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(authData.validUser.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for redirect to dashboard and welcome toast
  await expect(page).toHaveURL(/\/(#.*)?$/, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

  // Save authenticated state
  await page.context().storageState({ path: authFile });
});
