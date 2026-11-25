import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly downloadButton: Locator;
  readonly overviewTab: Locator;
  readonly analyticsTab: Locator;
  readonly totalRevenueCard: Locator;
  readonly subscriptionsCard: Locator;
  readonly salesCard: Locator;
  readonly activeNowCard: Locator;
  readonly recentSalesSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.downloadButton = page.getByRole('button', { name: 'Download' });
    this.overviewTab = page.getByRole('tab', { name: 'Overview' });
    this.analyticsTab = page.getByRole('tab', { name: 'Analytics' });
    this.totalRevenueCard = page.getByText('Total Revenue');
    this.subscriptionsCard = page.getByText('Subscriptions');
    this.salesCard = page.getByText('Sales').first();
    this.activeNowCard = page.getByText('Active Now');
    this.recentSalesSection = page.getByText('Recent Sales');
  }

  async gotoDashboard(): Promise<void> {
    await this.goto('/');
  }

  async selectAnalyticsTab(): Promise<void> {
    await this.analyticsTab.click();
  }

  async selectOverviewTab(): Promise<void> {
    await this.overviewTab.click();
  }
}
