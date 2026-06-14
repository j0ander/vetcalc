import { LoginView } from './LoginView';
import { router, type Destroyable } from '@/services/RouterService';
import { authService } from '@/services/AuthService';
import { BaseController } from '@/controllers/BaseController';

export class LoginController extends BaseController implements Destroyable {
  private view: LoginView;

  constructor() {
    super();
    this.view = new LoginView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.view.onLoginClick(async () => {
      const email = this.view.getEmail();
      const password = this.view.getPassword();
      const result = await authService.login(email, password);
      if (result.success) {
        await router.navigate('home');
      } else {
        this.view.showError(result.message);
      }
    });
    this.view.onRegisterLinkClick(async () => {
      await router.navigate('register');
    });
  }

  destroy(): void {
    console.log('[LoginController] Destroyed');
  }
}