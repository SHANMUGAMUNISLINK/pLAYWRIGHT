import { Page, Locator } from '@playwright/test';

export class LoginAndPass {
  userandpass(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private page: Page;
  private usernameInput: any;
  private nextButton: any;
  private passwordInput: any;
  private signInButton: any;
  private yesButton: any;

  constructor(page: any) {
    this.page = page;
    this.usernameInput = page.locator('[placeholder="Email, phone, or Skype"]');
    this.nextButton = page.locator('button:has-text("Next")');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.signInButton = page.locator('button:has-text("Sign in")');
    this.yesButton = page.locator('button:has-text("Yes")');
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickYes() {
    await this.yesButton.click();
  }
}