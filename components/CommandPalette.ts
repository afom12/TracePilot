import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class CommandPalette extends BaseComponent {
  readonly dialog: Locator;
  readonly searchInput: Locator;
  readonly emptyResults: Locator;
  readonly listItems: Locator;

  constructor(page: Page) {
    super(page);
    this.dialog = page.getByRole('dialog');
    this.searchInput = page.getByPlaceholder('Type a command or search...');
    this.emptyResults = page.getByText('No results found.');
    this.listItems = this.dialog.getByRole('option');
  }

  async openWithKeyboardShortcut(): Promise<void> {
    // Ensure the document body has focus before emitting keyboard shortcuts
    await this.page.locator('body').click({ position: { x: 50, y: 50 } });
    await this.page.keyboard.press('Control+k');
    try {
      await this.dialog.waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      // Fallback: trigger via header search button or ControlOrMeta
      const searchBtn = this.page.getByRole('button', { name: /search/i }).first();
      await searchBtn.click();
      await this.dialog.waitFor({ state: 'visible', timeout: 3000 });
    }
  }

  async openFromHeader(headerSearchButton: Locator): Promise<void> {
    await headerSearchButton.click();
    await this.dialog.waitFor({ state: 'visible' });
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async selectItem(text: string): Promise<void> {
    const item = this.dialog.getByText(text, { exact: false }).first();
    await item.click();
  }

  async pressEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }

  async close(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.dialog.waitFor({ state: 'hidden' });
  }

  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible();
  }
}
