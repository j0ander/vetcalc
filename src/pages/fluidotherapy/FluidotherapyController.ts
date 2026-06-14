// src/pages/fluidotherapy/FluidotherapyController.ts
import { FluidotherapyView } from './FluidotherapyView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

export class FluidotherapyController extends BaseController implements Destroyable {
  private view: FluidotherapyView;
  private currentDripFactor: number = 15;

  constructor() {
    super(); // Llama al constructor de BaseController
    this.view = new FluidotherapyView();
  }

  async init(): Promise<void> {
    this.view.render();

    // Navegación global para todos los elementos con data-route
    this.setupGlobalNavigation();

    // Badge premium (color según suscripción)
    this.initPremiumBadge();

    // Configurar eventos específicos del fluidoterapia
    this.setupEventListeners();
    this.calculate(); // cálculo inicial
  }

  private setupEventListeners(): void {
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

    const deficit = weight * dehydration * 10;
    const maintenanceTotal = weight * maintenance;
    const total24h = deficit + maintenanceTotal + losses;
    const hourly = total24h / 24;
    const dropsPerMin = (hourly * this.currentDripFactor) / 60;

    this.view.updateResults(total24h, hourly, dropsPerMin);
  }

  destroy(): void {
    this.destroyPremiumBadge(); // Limpiar suscripción premium
    console.log('[FluidotherapyController] Destroyed');
  }
}