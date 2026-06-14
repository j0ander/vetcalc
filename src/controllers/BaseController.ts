import { premiumService } from '@/services/PremiumService';
import { updatePremiumBadge } from '@/utils/premiumBadge';

export abstract class BaseController {
  private premiumUnsubscribe: (() => void) | null = null;

  protected initPremiumBadge(): void {
    // Aplicar el estado actual
    const isPremium = premiumService.getStatus();
    updatePremiumBadge(isPremium);
    // Suscribirse a cambios futuros
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
}