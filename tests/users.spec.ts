import { test, expect } from '../fixtures/testFixtures';
import { usersData } from '../data/usersData';

test.describe('Users Data Table Feature @smoke @regression', () => {
  test.beforeEach(async ({ usersPage }) => {
    await usersPage.gotoUsers();
  });

  test('should display users list table and controls', async ({ usersPage }) => {
    await expect(usersPage.heading).toBeVisible();
    await expect(usersPage.addUserButton).toBeVisible();
    await expect(usersPage.inviteUserButton).toBeVisible();
    await expect(usersPage.filterInput).toBeVisible();
    await expect(usersPage.table).toBeVisible();

    const rowCount = await usersPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should filter users by search input', async ({ usersPage }) => {
    await usersPage.filterUsers(usersData.searchQueries.existingUsername);
    await expect(usersPage.table.getByText(usersData.searchQueries.existingUsername)).toBeVisible();

    await usersPage.filterUsers(usersData.searchQueries.nonExistent);
    await expect(usersPage.table.getByText(/No results/i)).toBeVisible();

    await usersPage.clearFilter();
    await expect(usersPage.tableRows).toHaveRowCount(10);
  });

  test('should sort users table by column header', async ({ usersPage }) => {
    const firstUserBefore = await usersPage.tableRows.first().textContent();
    await usersPage.sortByColumn('Username', 'Desc');
    const firstUserAfter = await usersPage.tableRows.first().textContent();
    expect(firstUserBefore).toBeDefined();
    expect(firstUserAfter).toBeDefined();
    expect(firstUserBefore).not.toEqual(firstUserAfter);
  });

  test('should navigate table pages via pagination controls', async ({ usersPage }) => {
    await expect(usersPage.paginationInfo).toHaveText(/Page 1 of/i);
    await usersPage.nextPageButton.click();
    await expect(usersPage.paginationInfo).toHaveText(/Page 2 of/i);
    await usersPage.prevPageButton.click();
    await expect(usersPage.paginationInfo).toHaveText(/Page 1 of/i);
  });

  test('should display validation errors when adding user with empty fields', async ({
    usersPage,
    page,
  }) => {
    await usersPage.openAddUserDialog();
    await usersPage.submitUserForm();

    await expect(page.getByText(usersData.validationErrors.firstNameRequired)).toBeVisible();
    await expect(page.getByText(usersData.validationErrors.lastNameRequired)).toBeVisible();
    await expect(page.getByText(usersData.validationErrors.usernameRequired)).toBeVisible();
  });

  test('should successfully fill and submit Add User dialog', async ({ usersPage, page }) => {
    await usersPage.openAddUserDialog();
    await usersPage.fillUserForm(usersData.newUser);
    await usersPage.submitUserForm();

    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should open edit dialog with pre-filled row data and save changes', async ({
    usersPage,
    page,
  }) => {
    await usersPage.clickEditInRow(0);
    await expect(usersPage.dialogTitle).toHaveText('Edit User');
    await expect(usersPage.firstNameInput).not.toHaveValue('');

    await usersPage.firstNameInput.fill(usersData.editUser.firstName);
    await usersPage.submitUserForm();

    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should require username confirmation to delete a user', async ({ usersPage, page }) => {
    const firstRow = usersPage.tableRows.first();
    const usernameCell = firstRow.getByRole('cell').nth(1);
    const username = (await usernameCell.textContent())?.trim() || 'citlalli.spinka45';

    await usersPage.clickDeleteInRow(0);
    await expect(page.getByRole('alertdialog')).toBeVisible();

    await expect(usersPage.confirmDeleteButton).toBeDisabled();

    await usersPage.confirmDeletion(username);
    await expect(page).toHaveToastMessage(/The following user has been deleted/i);
  });
});
