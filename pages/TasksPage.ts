import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface TaskFormData {
  title: string;
  status: string;
  label: string;
  priority: string;
}

export class TasksPage extends BasePage {
  readonly heading: Locator;
  readonly createButton: Locator;
  readonly importButton: Locator;
  readonly filterInput: Locator;
  readonly statusFilterButton: Locator;
  readonly priorityFilterButton: Locator;
  readonly table: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly paginationInfo: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;

  // Drawer (Sheet) elements
  readonly drawer: Locator;
  readonly drawerTitle: Locator;
  readonly titleInput: Locator;
  readonly statusSelectTrigger: Locator;
  readonly labelRadios: Locator;
  readonly priorityRadios: Locator;
  readonly saveChangesButton: Locator;
  readonly closeDrawerButton: Locator;

  // Delete Dialog
  readonly deleteDialog: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Tasks' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.importButton = page.getByRole('button', { name: 'Import' });
    this.filterInput = page.getByPlaceholder('Filter by title or ID...');
    this.statusFilterButton = page.getByRole('button', { name: 'Status' });
    this.priorityFilterButton = page.getByRole('button', { name: 'Priority' });
    this.table = page.getByRole('table');
    this.tableHeaders = this.table.getByRole('columnheader');
    this.tableRows = this.table.getByRole('rowgroup').nth(1).getByRole('row');
    this.paginationInfo = page.getByText(/Page \d+ of \d+/).first();
    this.nextPageButton = page.getByRole('button', { name: 'Go to next page' });
    this.prevPageButton = page.getByRole('button', { name: 'Go to previous page' });

    // Mutate Drawer (Sheet)
    this.drawer = page.getByRole('dialog');
    this.drawerTitle = this.drawer.getByRole('heading');
    this.titleInput = page.getByPlaceholder('Enter a title');
    this.statusSelectTrigger = this.drawer.getByRole('combobox');
    this.labelRadios = this.drawer.getByRole('radiogroup').first();
    this.priorityRadios = this.drawer.getByRole('radiogroup').nth(1);
    this.saveChangesButton = this.drawer.getByRole('button', { name: 'Save changes' });
    this.closeDrawerButton = this.drawer.getByRole('button', { name: 'Close' });

    // Delete dialog
    this.deleteDialog = page.getByRole('alertdialog');
    this.confirmDeleteButton = this.deleteDialog.getByRole('button', { name: 'Delete' });
  }

  async gotoTasks(): Promise<void> {
    await this.goto('/tasks');
  }

  async filterTasks(query: string): Promise<void> {
    await this.filterInput.fill(query);
  }

  async clearFilter(): Promise<void> {
    await this.filterInput.clear();
  }

  async sortByColumn(columnName: string, direction: 'Asc' | 'Desc' = 'Asc'): Promise<void> {
    const headerButton = this.tableHeaders.getByRole('button', { name: columnName });
    await headerButton.click();
    await this.page.getByRole('menuitem', { name: direction }).click();
  }

  async openCreateDrawer(): Promise<void> {
    await this.createButton.click();
    await this.drawer.waitFor({ state: 'visible' });
  }

  async fillTaskForm(data: Partial<TaskFormData>): Promise<void> {
    if (data.title !== undefined) {
      await this.titleInput.fill(data.title);
    }
    if (data.status !== undefined) {
      await this.statusSelectTrigger.click();
      await this.page.getByRole('option', { name: data.status, exact: true }).click();
    }
    if (data.label !== undefined) {
      const labelRadio = this.drawer.getByRole('radio', { name: data.label, exact: true });
      await labelRadio.click();
    }
    if (data.priority !== undefined) {
      const priorityRadio = this.drawer.getByRole('radio', {
        name: data.priority,
        exact: true,
      });
      await priorityRadio.click();
    }
  }

  async submitTaskForm(): Promise<void> {
    await this.saveChangesButton.click();
  }

  async openRowMenu(rowIndex: number = 0): Promise<void> {
    const row = this.tableRows.nth(rowIndex);
    const menuButton = row.getByRole('button', { name: 'Open menu' });
    await menuButton.click();
  }

  async clickEditInRow(rowIndex: number = 0): Promise<void> {
    await this.openRowMenu(rowIndex);
    await this.page.getByRole('menuitem', { name: 'Edit' }).click();
    await this.drawer.waitFor({ state: 'visible' });
  }

  async clickDeleteInRow(rowIndex: number = 0): Promise<void> {
    await this.openRowMenu(rowIndex);
    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
    await this.deleteDialog.waitFor({ state: 'visible' });
  }

  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  async getRowCount(): Promise<number> {
    return this.tableRows.count();
  }
}
