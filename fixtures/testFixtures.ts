import { test as baseTest } from '@playwright/test';
import { expect } from '../utils/customMatchers';
import { SignInPage } from '../pages/SignInPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UsersPage } from '../pages/UsersPage';
import { TasksPage } from '../pages/TasksPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ErrorPage } from '../pages/ErrorPage';
import { AppsPage } from '../pages/AppsPage';
import { ChatsPage } from '../pages/ChatsPage';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { CommandPalette } from '../components/CommandPalette';
import { DiagnosticsCollector } from '../utils/diagnostics';
import { measurePagePerformance, type PerformanceMetrics } from '../utils/perfBenchmark';

type PagesFixtures = {
  signInPage: SignInPage;
  dashboardPage: DashboardPage;
  usersPage: UsersPage;
  tasksPage: TasksPage;
  settingsPage: SettingsPage;
  errorPage: ErrorPage;
  appsPage: AppsPage;
  chatsPage: ChatsPage;
  header: Header;
  sidebar: Sidebar;
  themeToggle: ThemeToggle;
  commandPalette: CommandPalette;
  diagnostics: DiagnosticsCollector;
  measurePerformance: () => Promise<PerformanceMetrics>;
};

export const test = baseTest.extend<PagesFixtures>({
  diagnostics: async ({ page }, use, testInfo) => {
    const collector = new DiagnosticsCollector(page);
    await use(collector);
    await collector.attachToTestOnFailure(testInfo);
  },

  measurePerformance: async ({ page }, use) => {
    await use(() => measurePagePerformance(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  errorPage: async ({ page }, use) => {
    await use(new ErrorPage(page));
  },
  appsPage: async ({ page }, use) => {
    await use(new AppsPage(page));
  },
  chatsPage: async ({ page }, use) => {
    await use(new ChatsPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new Sidebar(page));
  },
  themeToggle: async ({ page }, use) => {
    await use(new ThemeToggle(page));
  },
  commandPalette: async ({ page }, use) => {
    await use(new CommandPalette(page));
  },
});

export { expect };
