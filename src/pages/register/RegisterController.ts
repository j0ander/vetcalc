import { RegisterView } from './RegisterView';
import { router, type Destroyable } from '@/services/RouterService';
import { authService } from '@/services/AuthService';
import { BaseController } from '@/controllers/BaseController';

export class RegisterController extends BaseController implements Destroyable {
  private view: RegisterView;

  constructor() {
    super();
    this.view = new RegisterView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.view.onRegisterClick(async () => {
      const name = this.view.getName();
      const email = this.view.getEmail();
      const password = this.view.getPassword();
      const confirm = this.view.getConfirm();
      if (!name || !email || !password) {
        this.view.showError('Todos los campos son obligatorios');
        return;
      }
      if (password !== confirm) {
        this.view.showError('Las contraseñas no coinciden');
        return;
      }
      const result = await authService.register(email, password, name);
      if (result.success) {
        alert('Registro exitoso. Ahora inicia sesión.');
        await router.navigate('login');
      } else {
        this.view.showError(result.message);
      }
    });
    this.view.onLoginLinkClick(async () => {
      await router.navigate('login');
    });
  }

  destroy(): void {
    console.log('[RegisterController] Destroyed');
  }
}