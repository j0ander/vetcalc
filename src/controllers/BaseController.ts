import { router } from '@/services/RouterService';
import { premiumService } from '@/services/PremiumService';
import { updatePremiumBadge } from '@/utils/premiumBadge';
import type { AppRoute } from '@/types';

export abstract class BaseController {
  private premiumUnsubscribe: (() => void) | null = null;

  // Método protegido para inicializar la navegación global
  protected setupGlobalNavigation(): void {
    document.querySelectorAll('[data-route]').forEach(el => {
      // Evitar duplicar listeners si ya existen (no es necesario, pero por seguridad)
      if ((el as any)._navListener) return;
      const listener = async (e: Event) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      };
      el.addEventListener('click', listener);
      (el as any)._navListener = listener; // marca para no repetir
    });
  }

  protected initPremiumBadge(): void {
    const isPremium = premiumService.getStatus();
    updatePremiumBadge(isPremium);
    this.premiumUnsubscribe = premiumService.subscribe((newStatus) => {
      updatePremiumBadge(newStatus);
    });
  }

  protected destroyPremiumBadge(): void {
    if (this.premiumUnsubscribe) {
      this.premiumUnsubscribe();
      this.premiumUnsubscribe = null;
    }
  }

  // Método opcional para limpiar listeners globales (si los hubiera)
  protected destroyGlobalNavigation(): void {
    document.querySelectorAll('[data-route]').forEach(el => {
      if ((el as any)._navListener) {
        el.removeEventListener('click', (el as any)._navListener);
        delete (el as any)._navListener;
      }
    });
  }
}