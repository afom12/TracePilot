import { test, expect } from '../fixtures/testFixtures';
import { tasksData } from '../data/tasksData';

test.describe('Tasks Feature @smoke @regression', () => {
  test.beforeEach(async ({ tasksPage }) => {
    await tasksPage.gotoTasks();
  });

  test('should display tasks table and action buttons', async ({ tasksPage }) => {
    await expect(tasksPage.heading).toBeVisible();
    await expect(tasksPage.createButton).toBeVisible();
    await expect(tasksPage.importButton).toBeVisible();
    await expect(tasksPage.filterInput).toBeVisible();
    await expect(tasksPage.table).toBeVisible();

    const rowCount = await tasksPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should filter tasks by search query', async ({ tasksPage }) => {
    const firstRowText = await tasksPage.tableRows.first().textContent();
    const taskIdMatch = firstRowText?.match(/TASK-\d+/);
    const existingId = taskIdMatch ? taskIdMatch[0] : tasksData.searchQueries.existingId;

    await tasksPage.filterTasks(existingId);
    await expect(tasksPage.table.getByText(existingId)).toBeVisible();

    await tasksPage.filterTasks(tasksData.searchQueries.nonExistent);
    await expect(tasksPage.table.getByText(/No results/i)).toBeVisible();

    await tasksPage.clearFilter();
  });

  test('should sort tasks by Title column header', async ({ tasksPage }) => {
    const firstTaskBefore = await tasksPage.tableRows.first().textContent();
    await tasksPage.sortByColumn('Title', 'Desc');
    const firstTaskAfter = await tasksPage.tableRows.first().textContent();
    expect(firstTaskBefore).toBeDefined();
    expect(firstTaskAfter).toBeDefined();
    expect(firstTaskBefore).not.toEqual(firstTaskAfter);
  });

  test('should navigate table pages via pagination', async ({ tasksPage }) => {
    await expect(tasksPage.paginationInfo).toHaveText(/Page 1 of/i);
    await tasksPage.nextPageButton.click();
    await expect(tasksPage.paginationInfo).toHaveText(/Page 2 of/i);
    await tasksPage.prevPageButton.click();
    await expect(tasksPage.paginationInfo).toHaveText(/Page 1 of/i);
  });

  test('should display validation error when submitting empty create task drawer', async ({
    tasksPage,
    page,
  }) => {
    await tasksPage.openCreateDrawer();
    await tasksPage.submitTaskForm();

    await expect(page.getByText(tasksData.validationErrors.titleRequired)).toBeVisible();
  });

  test('should successfully create a new task via drawer form', async ({ tasksPage, page }) => {
    await tasksPage.openCreateDrawer();
    await tasksPage.fillTaskForm(tasksData.newTask);
    await tasksPage.submitTaskForm();

    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should open edit drawer with existing task details and save', async ({
    tasksPage,
    page,
  }) => {
    await tasksPage.clickEditInRow(0);
    await expect(tasksPage.drawerTitle).toHaveText('Update Task');
    await expect(tasksPage.titleInput).not.toHaveValue('');

    await tasksPage.titleInput.fill(tasksData.editTask.title);
    await tasksPage.submitTaskForm();

    await expect(page).toHaveToastMessage(/You submitted the following values/i);
  });

  test('should delete a task with confirmation dialog', async ({ tasksPage, page }) => {
    await tasksPage.clickDeleteInRow(0);
    await expect(tasksPage.deleteDialog).toBeVisible();

    await tasksPage.confirmDelete();
    await expect(page).toHaveToastMessage(/The following task has been deleted/i);
  });
});
