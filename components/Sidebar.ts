import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class Sidebar extends BaseComponent {
  readonly navContainer: Locator;
  readonly toggleSidebarButton: Locator;

  // General navigation links
  readonly dashboardLink: Locator;
  readonly tasksLink: Locator;
  readonly appsLink: Locator;
  readonly chatsLink: Locator;
  readonly usersLink: Locator;
  readonly helpCenterLink: Locator;

  // Collapsible section triggers
  readonly settingsButton: Locator;
  readonly pagesButton: Locator;
  readonly authButton: Locator;
  readonly errorsButton: Locator;
  readonly clerkButton: Locator;

  // Settings sublinks
  readonly profileLink: Locator;
  readonly accountLink: Locator;
  readonly appearanceLink: Locator;
  readonly notificationsLink: Locator;
  readonly displayLink: Locator;

  // Error sublinks
  readonly unauthorizedLink: Locator;
  readonly forbiddenLink: Locator;
  readonly notFoundLink: Locator;
  readonly serverErrorLink: Locator;
  readonly maintenanceErrorLink: Locator;

  // Auth sublinks
  readonly signInLink: Locator;
  readonly signIn2Link: Locator;
  readonly signUpLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly otpLink: Locator;

  // User info in sidebar footer
  readonly userButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navContainer = page.locator('aside, [data-sidebar="sidebar"]').first();
    this.toggleSidebarButton = page.getByRole('button', { name: 'Toggle Sidebar' }).first();

    // Direct links inside sidebar
    this.dashboardLink = this.navContainer.getByRole('link', { name: 'Dashboard' });
    this.tasksLink = this.navContainer.getByRole('link', { name: 'Tasks' });
    this.appsLink = this.navContainer.getByRole('link', { name: 'Apps' });
    this.chatsLink = this.navContainer.getByRole('link', { name: /chats/i });
    this.usersLink = this.navContainer.getByRole('link', { name: 'Users' });
    this.helpCenterLink = this.navContainer.getByRole('link', { name: 'Help Center' });

    // Collapsible section triggers inside sidebar
    this.settingsButton = this.navContainer.getByRole('button', { name: 'Settings' });
    this.authButton = this.navContainer.getByRole('button', { name: 'Auth' });
    this.errorsButton = this.navContainer.getByRole('button', { name: 'Errors' });
    this.clerkButton = this.navContainer.getByRole('button', { name: /Secured by Clerk/i });
    this.pagesButton = this.navContainer.getByRole('button', { name: 'Pages' });

    // Settings sublinks inside sidebar
    this.profileLink = this.navContainer.getByRole('link', { name: 'Profile' });
    this.accountLink = this.navContainer.getByRole('link', { name: 'Account' });
    this.appearanceLink = this.navContainer.getByRole('link', { name: 'Appearance' });
    this.notificationsLink = this.navContainer.getByRole('link', { name: 'Notifications' });
    this.displayLink = this.navContainer.getByRole('link', { name: 'Display' });

    // Error sublinks inside sidebar
    this.unauthorizedLink = this.navContainer.getByRole('link', { name: 'Unauthorized' });
    this.forbiddenLink = this.navContainer.getByRole('link', { name: 'Forbidden' });
    this.notFoundLink = this.navContainer.getByRole('link', { name: 'Not Found' });
    this.serverErrorLink = this.navContainer.getByRole('link', { name: 'Internal Server Error' });
    this.maintenanceErrorLink = this.navContainer.getByRole('link', { name: 'Maintenance Error' });

    // Auth sublinks inside sidebar
    this.signInLink = this.navContainer.getByRole('link', { name: 'Sign In' });
    this.signIn2Link = this.navContainer.getByRole('link', { name: 'Sign In (2 Col)' });
    this.signUpLink = this.navContainer.getByRole('link', { name: 'Sign Up' });
    this.forgotPasswordLink = this.navContainer.getByRole('link', { name: 'Forgot Password' });
    this.otpLink = this.navContainer.getByRole('link', { name: 'OTP' });

    // User footer
    this.userButton = this.navContainer.getByRole('button', { name: /satnaing/i });
  }

  async navigateTo(linkName: string): Promise<void> {
    switch (linkName) {
      case 'Dashboard':
        await this.dashboardLink.click();
        break;
      case 'Tasks':
        await this.tasksLink.click();
        break;
      case 'Apps':
        await this.appsLink.click();
        break;
      case 'Chats':
        await this.chatsLink.click();
        break;
      case 'Users':
        await this.usersLink.click();
        break;
      case 'Help Center':
        await this.helpCenterLink.click();
        break;
      default:
        await this.page.getByRole('link', { name: linkName }).click();
    }
  }

  async expandSettings(): Promise<void> {
    const isExpanded = (await this.settingsButton.getAttribute('aria-expanded')) === 'true';
    if (!isExpanded) {
      await this.settingsButton.click();
    }
  }

  async expandErrors(): Promise<void> {
    const isExpanded = (await this.errorsButton.getAttribute('aria-expanded')) === 'true';
    if (!isExpanded) {
      await this.errorsButton.click();
    }
  }

  async expandAuth(): Promise<void> {
    const isExpanded = (await this.authButton.getAttribute('aria-expanded')) === 'true';
    if (!isExpanded) {
      await this.authButton.click();
    }
  }

  async toggle(): Promise<void> {
    await this.toggleSidebarButton.click();
  }

  async isCollapsed(): Promise<boolean> {
    const sidebarState = await this.page.evaluate(() => {
      const match = document.cookie.match(/sidebar_state=([^;]+)/);
      return match ? match[1] : null;
    });
    return sidebarState === 'false';
  }
}
