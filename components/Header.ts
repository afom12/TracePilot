import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { ThemeToggle } from './ThemeToggle';
import { CommandPalette } from './CommandPalette';

export class Header extends BaseComponent {
  readonly headerBanner: Locator;
  readonly sidebarToggleButton: Locator;
  readonly searchButton: Locator;
  readonly themeToggle: ThemeToggle;
  readonly commandPalette: CommandPalette;
  readonly themeSettingsButton: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerBanner = page.getByRole('banner');
    this.sidebarToggleButton = this.headerBanner.getByRole('button', { name: 'Toggle Sidebar' });
    this.searchButton = this.headerBanner.getByRole('button', { name: /search/i });
    this.themeToggle = new ThemeToggle(page);
    this.commandPalette = new CommandPalette(page);
    this.themeSettingsButton = this.headerBanner.getByRole('button', {
      name: 'Open theme settings',
    });
    this.profileButton = this.headerBanner.getByRole('button', { name: 'SN' });
  }

  async toggleSidebar(): Promise<void> {
    await this.sidebarToggleButton.click();
  }

  async openCommandPalette(): Promise<void> {
    await this.searchButton.click();
  }

  async openThemeSettings(): Promise<void> {
    await this.themeSettingsButton.click();
  }

  async openProfileMenu(): Promise<void> {
    await this.profileButton.click();
  }
}
