import { RegisterTemplate } from '@/templates/RegisterTemplate';

export class RegisterView {
  private nameInput: HTMLInputElement | null = null;
  private emailInput: HTMLInputElement | null = null;
  private passwordInput: HTMLInputElement | null = null;
  private confirmInput: HTMLInputElement | null = null;
  private registerBtn: HTMLElement | null = null;
  private loginLink: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) app.innerHTML = RegisterTemplate;
    this.cacheElements();
  }

  private cacheElements(): void {
    this.nameInput = document.getElementById('reg-name') as HTMLInputElement;
    this.emailInput = document.getElementById('reg-email') as HTMLInputElement;
    this.passwordInput = document.getElementById('reg-password') as HTMLInputElement;
    this.confirmInput = document.getElementById('reg-confirm') as HTMLInputElement;
    this.registerBtn = document.getElementById('register-btn');
    this.loginLink = document.getElementById('go-to-login');
  }

  getName(): string { return this.nameInput?.value || ''; }
  getEmail(): string { return this.emailInput?.value || ''; }
  getPassword(): string { return this.passwordInput?.value || ''; }
  getConfirm(): string { return this.confirmInput?.value || ''; }
  onRegisterClick(callback: () => void): void {
    this.registerBtn?.addEventListener('click', callback);
  }
  onLoginLinkClick(callback: () => void): void {
    this.loginLink?.addEventListener('click', callback);
  }
  showError(message: string): void {
    alert(message);
  }
}