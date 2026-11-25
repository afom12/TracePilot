import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  password?: string;
  confirmPassword?: string;
}

export class UsersPage extends BasePage {
  readonly heading: Locator;
  readonly addUserButton: Locator;
  readonly inviteUserButton: Locator;
  readonly filterInput: Locator;
  readonly statusFilterButton: Locator;
  readonly roleFilterButton: Locator;
  readonly table: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly paginationInfo: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;

  // Action Dialog (Add / Edit)
  readonly actionDialog: Locator;
  readonly dialogTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly roleDropdownTrigger: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveChangesButton: Locator;

  // Delete Dialog
  readonly deleteDialog: Locator;
  readonly deleteConfirmInput: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'User List' });
    this.addUserButton = page.getByRole('button', { name: 'Add User' });
    this.inviteUserButton = page.getByRole('button', { name: 'Invite User' });
    this.filterInput = page.getByPlaceholder('Filter users...');
    this.statusFilterButton = page.getByRole('button', { name: 'Status' });
    this.roleFilterButton = page.getByRole('button', { name: 'Role' });
    this.table = page.getByRole('table');
    this.tableHeaders = this.table.getByRole('columnheader');
    this.tableRows = this.table.getByRole('rowgroup').nth(1).getByRole('row');
    this.paginationInfo = page.getByText(/Page \d+ of \d+/).first();
    this.nextPageButton = page.getByRole('button', { name: 'Go to next page' });
    this.prevPageButton = page.getByRole('button', { name: 'Go to previous page' });

    // Dialog elements
    this.actionDialog = page.getByRole('dialog');
    this.dialogTitle = this.actionDialog.getByRole('heading');
    this.firstNameInput = this.actionDialog.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = this.actionDialog.getByRole('textbox', { name: 'Last Name' });
    this.usernameInput = this.actionDialog.getByRole('textbox', { name: 'Username' });
    this.emailInput = this.actionDialog.getByRole('textbox', { name: 'Email' });
    this.phoneInput = this.actionDialog.getByRole('textbox', { name: 'Phone Number' });
    this.roleDropdownTrigger = this.actionDialog.getByRole('combobox');
    this.passwordInput = this.actionDialog
      .getByPlaceholder('e.g., S3cur3P@ssw0rd', { exact: true })
      .first();
    this.confirmPasswordInput = this.actionDialog
      .getByPlaceholder('e.g., S3cur3P@ssw0rd', { exact: true })
      .nth(1);
    this.saveChangesButton = this.actionDialog.getByRole('button', { name: 'Save changes' });

    // Delete dialog
    this.deleteDialog = page.getByRole('alertdialog');
    this.deleteConfirmInput = page.getByPlaceholder('Enter username to confirm deletion.');
    this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async gotoUsers(): Promise<void> {
    await this.goto('/users');
  }

  async filterUsers(query: string): Promise<void> {
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

  async openAddUserDialog(): Promise<void> {
    await this.addUserButton.click();
    await this.actionDialog.waitFor({ state: 'visible' });
  }

  async fillUserForm(data: Partial<UserFormData>): Promise<void> {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.username !== undefined) await this.usernameInput.fill(data.username);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phoneNumber !== undefined) await this.phoneInput.fill(data.phoneNumber);
    if (data.role !== undefined) {
      await this.roleDropdownTrigger.click();
      await this.page.getByRole('option', { name: data.role, exact: true }).click();
    }
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }
    if (data.confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(data.confirmPassword);
    }
  }

  async submitUserForm(): Promise<void> {
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
    await this.actionDialog.waitFor({ state: 'visible' });
  }

  async clickDeleteInRow(rowIndex: number = 0): Promise<void> {
    await this.openRowMenu(rowIndex);
    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
  }

  async confirmDeletion(username: string): Promise<void> {
    await this.deleteConfirmInput.fill(username);
    await this.confirmDeleteButton.click();
  }

  async getRowCount(): Promise<number> {
    return this.tableRows.count();
  }
}
