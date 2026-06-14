import { PremiumView } from './PremiumView';
import { router, type Destroyable } from '@/services/RouterService';
import type { AppRoute } from '@/types';

export class PremiumController implements Destroyable {
  private view: PremiumView;

  constructor() {
    this.view = new PremiumView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupNavigation();
    this.setupEventListeners();
  }

  private setupNavigation(): void {
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });
  }

  private setupEventListeners(): void {
    // Alternancia mensual/anual
    const monthlyBtn = this.view.getMonthlyBtn();
    const annualBtn = this.view.getAnnualBtn();
    monthlyBtn?.addEventListener('click', () => this.view.setMonthlyActive());
    annualBtn?.addEventListener('click', () => this.view.setAnnualActive());

    // Botón de upgrade
    const upgradeBtn = this.view.getUpgradeBtn();
    upgradeBtn?.addEventListener('click', () => {
      // Aquí se integraría el flujo de pago real (Stripe, etc.)
      alert('Funcionalidad de pago en desarrollo. Esta es una simulación.');
      console.log('Iniciar proceso de suscripción Pro');
    });

    // Restaurar compra (si aplica)
    const restoreBtn = this.view.getRestoreBtn();
    restoreBtn?.addEventListener('click', () => {
      alert('Restauración de compra simulada');
      console.log('Restaurar compra');
    });
  }

  destroy(): void {
    console.log('[PremiumController] Destroyed');
  }
}