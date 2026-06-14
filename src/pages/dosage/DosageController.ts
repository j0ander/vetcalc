import { DosageView } from './DosageView';
import { router, type Destroyable } from '@/services/RouterService';
import type { AppRoute } from '@/types';

export class DosageController implements Destroyable {
  private view: DosageView;

  constructor() {
    this.view = new DosageView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
    // Valores por defecto de ejemplo
    this.view.setWeight(28.5);
    this.view.setDosage(5);
    this.view.setConcentration(50);
    this.view.hideResult();
  }

  private setupEventListeners(): void {
    // Navegación general
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });

    // Botón calcular
    const calcBtn = this.view.getCalculateButton();
    calcBtn?.addEventListener('click', () => {
      this.calculate();
      // Efecto de escala
      calcBtn.classList.add('scale-95');
      setTimeout(() => calcBtn.classList.remove('scale-95'), 150);
    });

    // Botón guardar (log)
    const logBtn = this.view.getLogButton();
    logBtn?.addEventListener('click', () => {
      this.saveToHistory();
    });

    // Autocomplete simple: resaltar borde cuando se escribe
    const drugInput = document.getElementById('drug-name') as HTMLInputElement | null;
    drugInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.view.highlightDrugInput(target.value.length > 0);
    });
  }

  private calculate(): void {
    const weight = this.view.getWeight();
    const dosePerKg = this.view.getDosageMgPerKg();
    const concentration = this.view.getConcentrationMgPerMl();

    if (weight <= 0 || dosePerKg <= 0 || concentration <= 0) {
      alert('Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.');
      return;
    }

    const totalMg = weight * dosePerKg;
    const volumeMl = totalMg / concentration;

    this.view.showResult(totalMg, volumeMl);
  }

  private saveToHistory(): void {
    // Por ahora solo console.log, luego se integrará con IndexedDB
    console.log('Guardar cálculo en historial:', {
      drug: this.view.getDrugName(),
      weight: this.view.getWeight(),
      dosagePerKg: this.view.getDosageMgPerKg(),
      concentration: this.view.getConcentrationMgPerMl(),
      timestamp: new Date().toISOString()
    });
    alert('Cálculo guardado en el historial (simulado).');
  }

  destroy(): void {
    console.log('[DosageController] Destroyed');
  }
}