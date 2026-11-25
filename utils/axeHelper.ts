import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';

export interface A11yCheckOptions {
  include?: string[];
  exclude?: string[];
  disabledRules?: string[];
}

export interface A11yCheckResult {
  violations: Result[];
  seriousViolations: Result[];
}

/**
 * Runs Axe accessibility audit on the page and extracts serious and critical violations.
 */
export async function runA11yCheck(
  page: Page,
  options?: A11yCheckOptions
): Promise<A11yCheckResult> {
  let builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
    'best-practice',
  ]);

  if (options?.include) {
    builder = builder.include(options.include);
  }
  if (options?.exclude) {
    builder = builder.exclude(options.exclude);
  }
  if (options?.disabledRules) {
    builder = builder.disableRules(options.disabledRules);
  }

  const results = await builder.analyze();
  const seriousViolations = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );

  return {
    violations: results.violations,
    seriousViolations,
  };
}
