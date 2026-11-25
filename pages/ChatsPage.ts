import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatsPage extends BasePage {
  readonly heading: Locator;
  readonly newChatButton: Locator;
  readonly chatInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Chats' });
    this.newChatButton = page.getByRole('button', { name: /new chat/i });
    this.chatInput = page.getByPlaceholder(/type a message/i);
  }

  async gotoChats(): Promise<void> {
    await this.goto('/chats');
  }
}
