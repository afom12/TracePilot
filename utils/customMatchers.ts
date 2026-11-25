import { expect as baseExpect, type Page, type Locator } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeInDarkMode(): Promise<R>;
      toBeInLightMode(): Promise<R>;
      toHaveActiveSidebarItem(title: string): Promise<R>;
      toHaveRowCount(expectedCount: number): Promise<R>;
      toHaveToastMessage(message: string | RegExp): Promise<R>;
    }
  }
}

baseExpect.extend({
  async toBeInDarkMode(page: Page) {
    const className = await page.evaluate(() => document.documentElement.className);
    const isDark = className.includes('dark');
    return {
      message: () =>
        `expected page to ${this.isNot ? 'not ' : ''}have 'dark' class on <html>, but found class="${className}"`,
      pass: isDark,
    };
  },

  async toBeInLightMode(page: Page) {
    const className = await page.evaluate(() => document.documentElement.className);
    const isLight = className.includes('light');
    return {
      message: () =>
        `expected page to ${this.isNot ? 'not ' : ''}have 'light' class on <html>, but found class="${className}"`,
      pass: isLight,
    };
  },

  async toHaveActiveSidebarItem(page: Page, title: string) {
    const link = page.getByRole('link', { name: new RegExp(title, 'i') }).first();
    const activeAttr = await link.getAttribute('data-active');
    const pass = activeAttr === 'true';
    return {
      message: () =>
        `expected sidebar navigation item "${title}" to ${this.isNot ? 'not ' : ''}have data-active="true", but found "${activeAttr}"`,
      pass,
    };
  },

  async toHaveRowCount(locator: Locator, expectedCount: number) {
    const count = await locator.count();
    const pass = count === expectedCount;
    return {
      message: () => `expected table locator to have ${expectedCount} rows, but received ${count}`,
      pass,
    };
  },

  async toHaveToastMessage(page: Page, message: string | RegExp) {
    const toast = page.locator('[data-sonner-toast]').filter({ hasText: message }).first();
    let pass = false;
    try {
      await toast.waitFor({ state: 'visible', timeout: 5000 });
      pass = true;
    } catch {
      pass = false;
    }
    return {
      message: () =>
        `expected toast message matching ${message} to ${this.isNot ? 'not ' : ''}be visible`,
      pass,
    };
  },
});

export const expect = baseExpect;
