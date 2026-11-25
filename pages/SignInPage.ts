import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly showPasswordButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly gitHubButton: Locator;
  readonly facebookButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.showPasswordButton = page.getByRole('button', { name: /password/i });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
    this.termsLink = page.getByRole('link', { name: 'Terms of Service' });
    this.privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.gitHubButton = page.getByRole('button', { name: /github/i });
    this.facebookButton = page.getByRole('button', { name: /facebook/i });
  }

  async gotoSignIn(): Promise<void> {
    await this.goto('/sign-in');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.signInButton.click();
  }

  getEmailErrorMessage(): Locator {
    return this.page.getByText(/Please enter your email|Invalid email/i);
  }

  getPasswordErrorMessage(): Locator {
    return this.page.getByText(/Please enter your password|Password must be at least/i);
  }
}
