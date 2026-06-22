import { FluidotherapyView } from './FluidotherapyView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

export class FluidotherapyController extends BaseController implements Destroyable {
  private view: FluidotherapyView;
  private currentDripFactor: number = 15;

  constructor() {
    super();
    this.view = new FluidotherapyView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();
    this.setupEventListeners();
    this.calculate();
  }

  private setupEventListeners(): void {
    this.view.onWeightInput(() => this.calculate());
    this.view.onDehydrationInput(() => {
      const val = this.view.getDehydrationPercent();
      this.view.setDehydrationDisplay(val);
      this.calculate();
    });
    this.view.onMaintenanceInput(() => this.calculate());
    this.view.onLossesInput(() => this.calculate());

    this.view.onDripButtonClick((factor) => {
      this.currentDripFactor = factor;
      this.calculate();
    });

    this.view.onMaintenancePreset((value) => {
      const input = document.getElementById('maintenance') as HTMLInputElement;
      if (input) {
        input.value = value.toString();
        this.calculate();
      }
    });

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

    const deficit = weight * dehydration * 10;
    const maintenanceTotal = weight * maintenance;
    const total24h = deficit + maintenanceTotal + losses;
    const hourly = total24h / 24;
    const dropsPerMin = (hourly * this.currentDripFactor) / 60;

    // Actualizar resultados principales
    this.view.updateResults(total24h, hourly, dropsPerMin);

    // Actualizar panel de detalles expandible
    this.view.updateDetailPanel(deficit, maintenanceTotal, losses, this.currentDripFactor);
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[FluidotherapyController] Destroyed');
  }
}