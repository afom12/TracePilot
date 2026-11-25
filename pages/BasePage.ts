import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export abstract class BasePage {
  readonly page: Page;
  readonly header: Header;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.sidebar = new Sidebar(page);
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  getToast(): Locator {
    return this.page.locator('[data-sonner-toast]');
  }

  async waitForToast(text?: string | RegExp): Promise<Locator> {
    const toast = text ? this.page.getByText(text).first() : this.getToast().first();
    await toast.waitFor({ state: 'visible' });
    return toast;
  }
}
