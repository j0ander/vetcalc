import { FluidotherapyView } from './FluidotherapyView';
import { router, type Destroyable } from '@/services/RouterService';
import type { AppRoute } from '@/types';

export class FluidotherapyController implements Destroyable {
  private view: FluidotherapyView;
  private currentDripFactor: number = 15;

  constructor() {
    this.view = new FluidotherapyView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
    this.calculate(); // cálculo inicial
  }

  private setupEventListeners(): void {
    // Navegación general (botones con data-route)
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });

    // Inputs
    this.view.onWeightInput(() => this.calculate());
    this.view.onDehydrationInput(() => {
      const val = this.view.getDehydrationPercent();
      this.view.setDehydrationDisplay(val);
      this.calculate();
    });
    this.view.onMaintenanceInput(() => this.calculate());
    this.view.onLossesInput(() => this.calculate());

    // Drip factor
    this.view.onDripButtonClick((factor) => {
      this.currentDripFactor = factor;
      this.calculate();
    });

    // Presets de mantenimiento
    this.view.onMaintenancePreset((value) => {
      if (this.view['maintenanceInput']) {
        (this.view['maintenanceInput'] as HTMLInputElement).value = value.toString();
        this.calculate();
      }
    });

    // Botones de acción
    this.view.onSave(() => {
      alert('Protocolo guardado (simulación)');
      console.log('Fluidoterapia guardada');
    });
    this.view.onReport(() => {
      console.log('Generar reporte PDF');
      alert('Función de reporte en desarrollo');
    });
  }

  private calculate(): void {
    const weight = this.view.getWeight();
    const dehydration = this.view.getDehydrationPercent();
    const maintenance = this.view.getMaintenance();
    const losses = this.view.getLosses();

    // Fórmulas:
    // Déficit (ml) = peso (kg) * % deshidratación * 10
    const deficit = weight * dehydration * 10;
    const maintenanceTotal = weight * maintenance;
    const total24h = deficit + maintenanceTotal + losses;
    const hourly = total24h / 24;
    const dropsPerMin = (hourly * this.currentDripFactor) / 60;

    this.view.updateResults(total24h, hourly, dropsPerMin);
  }

  destroy(): void {
    console.log('[FluidotherapyController] Destroyed');
  }
}