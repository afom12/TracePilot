import type { Page, TestInfo } from '@playwright/test';

export interface NetworkLogEntry {
  url: string;
  method: string;
  status: number;
  durationMs?: number;
}

export class DiagnosticsCollector {
  private consoleLogs: string[] = [];
  private failedRequests: NetworkLogEntry[] = [];
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.attachListeners();
  }

  private attachListeners(): void {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        this.consoleLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
      }
    });

    this.page.on('response', (response) => {
      if (response.status() >= 400) {
        this.failedRequests.push({
          url: response.url(),
          method: response.request().method(),
          status: response.status(),
        });
      }
    });

    this.page.on('pageerror', (err) => {
      this.consoleLogs.push(`[UNCAUGHT_EXCEPTION] ${err.message}\n${err.stack}`);
    });
  }

  async attachToTestOnFailure(testInfo: TestInfo): Promise<void> {
    if (testInfo.status !== testInfo.expectedStatus) {
      const report = {
        testTitle: testInfo.title,
        duration: testInfo.duration,
        urlAtFailure: this.page.url(),
        consoleLogs: this.consoleLogs,
        failedNetworkRequests: this.failedRequests,
        timestamp: new Date().toISOString(),
      };

      await testInfo.attach('diagnostic-dump.json', {
        body: JSON.stringify(report, null, 2),
        contentType: 'application/json',
      });
    }
  }

  getConsoleLogs(): string[] {
    return [...this.consoleLogs];
  }

  getFailedRequests(): NetworkLogEntry[] {
    return [...this.failedRequests];
  }
}
