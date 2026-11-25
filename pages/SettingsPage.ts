import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  readonly heading: Locator;

  // Subnav links
  readonly profileNav: Locator;
  readonly accountNav: Locator;
  readonly appearanceNav: Locator;
  readonly notificationsNav: Locator;
  readonly displayNav: Locator;

  // Profile Form Elements
  readonly usernameInput: Locator;
  readonly bioInput: Locator;
  readonly addUrlButton: Locator;
  readonly updateProfileButton: Locator;

  // Account Form Elements
  readonly nameInput: Locator;
  readonly languageTrigger: Locator;
  readonly updateAccountButton: Locator;

  // Appearance Form Elements
  readonly fontSelect: Locator;
  readonly lightThemeRadio: Locator;
  readonly darkThemeRadio: Locator;
  readonly updatePreferencesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Settings' });

    // Subnavigation
    this.profileNav = page.getByRole('navigation').getByRole('link', { name: 'Profile' });
    this.accountNav = page.getByRole('navigation').getByRole('link', { name: 'Account' });
    this.appearanceNav = page.getByRole('navigation').getByRole('link', { name: 'Appearance' });
    this.notificationsNav = page
      .getByRole('navigation')
      .getByRole('link', { name: 'Notifications' });
    this.displayNav = page.getByRole('navigation').getByRole('link', { name: 'Display' });

    // Profile Form
    this.usernameInput = page.getByPlaceholder('shadcn');
    this.bioInput = page.getByPlaceholder(/tell us a little bit/i);
    this.addUrlButton = page.getByRole('button', { name: 'Add URL' });
    this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });

    // Account Form
    this.nameInput = page.getByPlaceholder('Your name');
    this.dobButton = page.getByRole('button', {
      name: /Pick a date|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i,
    });
    this.languageTrigger = page.getByRole('combobox').filter({ hasText: /language/i });
    this.updateAccountButton = page.getByRole('button', { name: 'Update account' });

    // Appearance Form
    this.fontSelect = page.getByRole('combobox', { name: 'Font' });
    this.lightThemeRadio = page.getByRole('radio', { name: 'Light' });
    this.darkThemeRadio = page.getByRole('radio', { name: 'Dark' });
    this.updatePreferencesButton = page.getByRole('button', { name: 'Update preferences' });
  }

  async gotoProfile(): Promise<void> {
    await this.goto('/settings');
  }

  async gotoAccount(): Promise<void> {
    await this.goto('/settings/account');
  }

  async gotoAppearance(): Promise<void> {
    await this.goto('/settings/appearance');
  }

  async selectProfileEmail(email: string = 'm@example.com'): Promise<void> {
    const trigger = this.page.getByRole('combobox').first();
    await trigger.click();
    await this.page.getByRole('option', { name: email }).click();
  }

  async updateProfile(username: string, bio?: string): Promise<void> {
    await this.usernameInput.fill(username);
    if (bio) await this.bioInput.fill(bio);
    await this.selectProfileEmail();
    await this.updateProfileButton.click();
  }

  async selectAccountLanguage(language: string = 'English'): Promise<void> {
    await this.languageTrigger.click();
    await this.page.getByRole('dialog').getByText(language, { exact: true }).click();
    await this.page.keyboard.press('Escape');
  }

  async selectAccountDateOfBirth(): Promise<void> {
    await this.dobButton.click({ force: true });
    await this.page.getByRole('button', { name: /Today/i }).click();
  }

  async updateAccount(name: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.updateAccountButton.click();
  }

  async selectAppearanceTheme(theme: 'Light' | 'Dark'): Promise<void> {
    const radio = this.page.getByRole('radio', { name: theme });
    await radio.click({ force: true });
    await this.updatePreferencesButton.click();
  }
}
