import { LoginTemplate } from '@/templates/LoginTemplate';

export class LoginView {
  private emailInput: HTMLInputElement | null = null;
  private passwordInput: HTMLInputElement | null = null;
  private loginBtn: HTMLElement | null = null;
  private registerLink: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) app.innerHTML = LoginTemplate;
    this.cacheElements();
  }

  private cacheElements(): void {
    this.emailInput = document.getElementById('login-email') as HTMLInputElement;
    this.passwordInput = document.getElementById('login-password') as HTMLInputElement;
    this.loginBtn = document.getElementById('login-btn');
    this.registerLink = document.getElementById('go-to-register');
  }

  getEmail(): string { return this.emailInput?.value || ''; }
  getPassword(): string { return this.passwordInput?.value || ''; }
  onLoginClick(callback: () => void): void {
    this.loginBtn?.addEventListener('click', callback);
  }
  onRegisterLinkClick(callback: () => void): void {
    this.registerLink?.addEventListener('click', callback);
  }
  showError(message: string): void {
    alert(message);
  }
}