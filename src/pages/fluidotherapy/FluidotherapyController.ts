// src/pages/fluidotherapy/FluidotherapyController.ts
import { FluidotherapyView } from './FluidotherapyView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import { saveToHistory } from '@/services/HistoryService';
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

    // Botón Guardar -> guardar en historial
    this.view.onSave(async () => {
      const weight = this.view.getWeight();
      const dehydration = this.view.getDehydrationPercent();
      const maintenance = this.view.getMaintenance();
      const losses = this.view.getLosses();

      const deficit = weight * dehydration * 10;
      const maintenanceTotal = weight * maintenance;
      const total24h = deficit + maintenanceTotal + losses;
      const hourly = total24h / 24;
      const dropsPerMin = (hourly * this.currentDripFactor) / 60;

      await saveToHistory({
        type: 'fluidotherapy',
        patientName: 'Paciente (sin nombre)',
        patientWeightKg: weight,
        patientSpecies: 'canino', // mock
        inputs: {
          weightKg: weight,
          dehydrationPercent: dehydration,
          maintenanceMlKgDay: maintenance,
          lossesMlDay: losses,
          dripFactor: this.currentDripFactor
        },
        result: {
          deficitMl: deficit,
          maintenanceMl: maintenanceTotal,
          totalMl: total24h,
          mlPerHour: hourly,
          dropsPerMin: dropsPerMin
        },
        summary: `Fluidoterapia: ${total24h.toFixed(1)} mL total (${hourly.toFixed(1)} mL/h, ${Math.round(dropsPerMin)} gotas/min)`
      });

      alert('Protocolo guardado en el historial.');
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
    this.view.updateDetailPanel(deficit, maintenanceTotal, losses, this.currentDripFactor);
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[FluidotherapyController] Destroyed');
  }
}