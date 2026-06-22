import { FluidotherapyTemplate } from '@/templates/FluidotherapyTemplate';

export class FluidotherapyView {
  private weightInput: HTMLInputElement | null = null;
  private dehydrationInput: HTMLInputElement | null = null;
  private dehydrationValueSpan: HTMLElement | null = null;
  private maintenanceInput: HTMLInputElement | null = null;
  private lossesInput: HTMLInputElement | null = null;
  private totalVolumeSpan: HTMLElement | null = null;
  private hourlyRateSpan: HTMLElement | null = null;
  private dripRateSpan: HTMLElement | null = null;
  private dripButtons: NodeListOf<Element> | null = null;
  private maintenancePresetBtns: NodeListOf<Element> | null = null;
  private saveBtn: HTMLElement | null = null;
  private reportBtn: HTMLElement | null = null;

  // Nuevos elementos para el panel de detalles expandible
  private deficitDetail: HTMLElement | null = null;
  private maintenanceDetail: HTMLElement | null = null;
  private lossesDetail: HTMLElement | null = null;
  private dripFactorDetail: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = FluidotherapyTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.weightInput = document.getElementById('weight') as HTMLInputElement;
    this.dehydrationInput = document.getElementById('dehydration') as HTMLInputElement;
    this.dehydrationValueSpan = document.getElementById('dehydration-value');
    this.maintenanceInput = document.getElementById('maintenance') as HTMLInputElement;
    this.lossesInput = document.getElementById('losses') as HTMLInputElement;
    this.totalVolumeSpan = document.getElementById('total-volume');
    this.hourlyRateSpan = document.getElementById('hourly-rate');
    this.dripRateSpan = document.getElementById('drip-rate');
    this.dripButtons = document.querySelectorAll('.drip-btn');
    this.maintenancePresetBtns = document.querySelectorAll('[data-maintenance]');
    this.saveBtn = document.getElementById('save-btn');
    this.reportBtn = document.getElementById('report-btn');

    // Elementos del panel de detalles
    this.deficitDetail = document.getElementById('deficit-detail');
    this.maintenanceDetail = document.getElementById('maintenance-detail');
    this.lossesDetail = document.getElementById('losses-detail');
    this.dripFactorDetail = document.getElementById('drip-factor-detail');
  }

  getWeight(): number { return parseFloat(this.weightInput?.value || '0'); }
  getDehydrationPercent(): number { return parseFloat(this.dehydrationInput?.value || '0'); }
  getMaintenance(): number { return parseFloat(this.maintenanceInput?.value || '0'); }
  getLosses(): number { return parseFloat(this.lossesInput?.value || '0'); }

  setDehydrationDisplay(value: number): void {
    if (this.dehydrationValueSpan) this.dehydrationValueSpan.textContent = `${value}%`;
  }

  updateResults(totalMl: number, hourlyMl: number, dropsPerMin: number): void {
    if (this.totalVolumeSpan) this.totalVolumeSpan.textContent = totalMl.toFixed(1);
    if (this.hourlyRateSpan) this.hourlyRateSpan.textContent = hourlyMl.toFixed(1);
    if (this.dripRateSpan) this.dripRateSpan.textContent = Math.round(dropsPerMin).toString();
  }

  // Nuevo método para actualizar el panel de detalles expandible
  updateDetailPanel(deficit: number, maintenance: number, losses: number, dripFactor: number): void {
    if (this.deficitDetail) this.deficitDetail.textContent = `${deficit.toFixed(1)} ml`;
    if (this.maintenanceDetail) this.maintenanceDetail.textContent = `${maintenance.toFixed(1)} ml`;
    if (this.lossesDetail) this.lossesDetail.textContent = `${losses.toFixed(1)} ml`;
    if (this.dripFactorDetail) this.dripFactorDetail.textContent = `${dripFactor} gotas/ml`;
  }

  // Eventos (sin cambios)
  onWeightInput(callback: () => void): void {
    this.weightInput?.addEventListener('input', callback);
  }
  onDehydrationInput(callback: () => void): void {
    this.dehydrationInput?.addEventListener('input', callback);
  }
  onMaintenanceInput(callback: () => void): void {
    this.maintenanceInput?.addEventListener('input', callback);
  }
  onLossesInput(callback: () => void): void {
    this.lossesInput?.addEventListener('input', callback);
  }
  onDripButtonClick(callback: (factor: number) => void): void {
    this.dripButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const factor = parseInt(btn.getAttribute('data-drip') || '15');
        callback(factor);
        this.dripButtons?.forEach(b => {
          b.classList.remove('border-primary', 'bg-primary-container/20', 'text-primary');
          b.classList.add('border-transparent', 'bg-surface-container-high', 'text-on-surface-variant');
        });
        btn.classList.add('border-primary', 'bg-primary-container/20', 'text-primary');
        btn.classList.remove('border-transparent', 'bg-surface-container-high', 'text-on-surface-variant');
      });
    });
  }
  onMaintenancePreset(callback: (value: number) => void): void {
    this.maintenancePresetBtns?.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-maintenance') || '0');
        callback(val);
      });
    });
  }
  onSave(callback: () => void): void {
    this.saveBtn?.addEventListener('click', callback);
  }
  onReport(callback: () => void): void {
    this.reportBtn?.addEventListener('click', callback);
  }
}