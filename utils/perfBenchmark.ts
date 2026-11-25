import type { Page } from '@playwright/test';

export interface PerformanceMetrics {
  ttfbMs: number;
  domContentLoadedMs: number;
  loadTimeMs: number;
  firstContentfulPaintMs: number | null;
  domNodeCount: number;
}

/**
 * Extracts real performance benchmarks and Core Web Vitals from the browser runtime.
 */
export async function measurePagePerformance(page: Page): Promise<PerformanceMetrics> {
  return page.evaluate(() => {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const nav = navEntries.length > 0 ? navEntries[0] : null;

    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');

    return {
      ttfbMs: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
      domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
      loadTimeMs: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0,
      firstContentfulPaintMs: fcpEntry ? Math.round(fcpEntry.startTime) : null,
      domNodeCount: document.getElementsByTagName('*').length,
    };
  });
}
