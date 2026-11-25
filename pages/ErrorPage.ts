import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ErrorPage extends BasePage {
  readonly errorCode: Locator;
  readonly errorTitle: Locator;
  readonly errorDescription: Locator;
  readonly goBackButton: Locator;
  readonly backToHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.errorCode = page.getByRole('heading', { level: 1 });
    this.errorTitle = page
      .getByText(/Oops!|Unauthorized|Forbidden|Internal Server Error|Maintenance Error/i)
      .first();
    this.errorDescription = page.locator('p').first();
    this.goBackButton = page.getByRole('button', { name: 'Go Back' });
    this.backToHomeButton = page.getByRole('button', { name: 'Back to Home' });
  }

  async gotoError(
    type: 'unauthorized' | 'forbidden' | 'not-found' | 'internal-server-error' | 'maintenance-error'
  ): Promise<void> {
    await this.goto(`/errors/${type}`);
  }

  async clickBackToHome(): Promise<void> {
    await this.backToHomeButton.click();
  }

  async clickGoBack(): Promise<void> {
    await this.goBackButton.click();
  }
}
