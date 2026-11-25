import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AppsPage extends BasePage {
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly appCards: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'App Integrations' });
    this.searchInput = page.getByPlaceholder('Filter apps...');
    this.appCards = page.locator('ul > li');
  }

  async gotoApps(): Promise<void> {
    await this.goto('/apps');
  }

  async filterApps(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }
}
