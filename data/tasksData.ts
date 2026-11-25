/**
 * Tasks Feature Test Data
 */
export const tasksData = {
  newTask: {
    title: 'Automated E2E Testing with Playwright',
    status: 'In Progress',
    label: 'Feature',
    priority: 'High',
  },
  editTask: {
    title: 'Updated Automated E2E Testing with Playwright',
    status: 'Done',
    priority: 'Low',
  },
  validationErrors: {
    titleRequired: 'Title is required.',
    statusRequired: 'Please select a status.',
    labelRequired: 'Please select a label.',
    priorityRequired: 'Please choose a priority.',
  },
  filterOptions: {
    statuses: ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'],
    priorities: ['Low', 'Medium', 'High'],
  },
  searchQueries: {
    existingId: 'TASK-9366',
    existingTitle: 'Auctus bardus',
    nonExistent: 'TASK-999999999',
  },
};
