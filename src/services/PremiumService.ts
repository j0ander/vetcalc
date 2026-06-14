type PremiumListener = (isPremium: boolean) => void;

class PremiumService {
  private isPremium: boolean = true;
  private listeners: PremiumListener[] = [];

  constructor() {
    // Cargar estado guardado (simulación)
    const saved = localStorage.getItem('vetcalc-premium');
    this.isPremium = saved === 'true';
  }

  getStatus(): boolean {
    return this.isPremium;
  }

  setStatus(value: boolean): void {
    this.isPremium = value;
    localStorage.setItem('vetcalc-premium', String(value));
    this.notifyListeners();
  }

  subscribe(listener: PremiumListener): () => void {
    this.listeners.push(listener);
    // Retorna función para cancelar suscripción
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) this.listeners.splice(index, 1);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.isPremium));
  }
}

export const premiumService = new PremiumService();