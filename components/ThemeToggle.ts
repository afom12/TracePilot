import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export type ThemeMode = 'light' | 'dark' | 'system';

export class ThemeToggle extends BaseComponent {
  readonly toggleButton: Locator;
  readonly lightOption: Locator;
  readonly darkOption: Locator;
  readonly systemOption: Locator;

  constructor(page: Page) {
    super(page);
    this.toggleButton = page.getByRole('button', { name: 'Toggle theme' });
    this.lightOption = page.getByRole('menuitem', { name: 'Light' });
    this.darkOption = page.getByRole('menuitem', { name: 'Dark' });
    this.systemOption = page.getByRole('menuitem', { name: 'System' });
  }

  async openDropdown(): Promise<void> {
    await this.toggleButton.click();
  }

  async selectTheme(mode: ThemeMode): Promise<void> {
    await this.openDropdown();
    switch (mode) {
      case 'light':
        await this.lightOption.click();
        break;
      case 'dark':
        await this.darkOption.click();
        break;
      case 'system':
        await this.systemOption.click();
        break;
    }
  }

  async getActiveThemeClass(): Promise<string | null> {
    return this.page.evaluate(() => {
      const classList = document.documentElement.classList;
      if (classList.contains('dark')) return 'dark';
      if (classList.contains('light')) return 'light';
      return null;
    });
  }

  async getThemeCookie(): Promise<string | undefined> {
    return this.page.evaluate(() => {
      const match = document.cookie.match(/vite-ui-theme=([^;]+)/);
      return match ? match[1] : undefined;
    });
  }
}
