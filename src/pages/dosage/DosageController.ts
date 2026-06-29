import { DosageView } from './DosageView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';
import { saveToHistory } from '@/services/HistoryService';

export class DosageController extends BaseController implements Destroyable {
  private view: DosageView;

  constructor() {
    super();
    this.view = new DosageView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();
    this.setupEventListeners();

    // Valores por defecto
    this.view.setWeight(28.5);
    this.view.setDosage(5);
    this.view.setConcentration(50);
    this.view.hideResult();
  }

  private setupEventListeners(): void {
    const calcBtn = this.view.getCalculateButton();
    calcBtn?.addEventListener('click', () => {
      this.calculate();
      calcBtn.classList.add('scale-95');
      setTimeout(() => calcBtn.classList.remove('scale-95'), 150);
    });

    const logBtn = this.view.getLogButton();
    logBtn?.addEventListener('click', () => {
      this.saveToHistory();
    });

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

  private async saveToHistory(): Promise<void> {
    const weight = this.view.getWeight();
    const dosePerKg = this.view.getDosageMgPerKg();
    const concentration = this.view.getConcentrationMgPerMl();
    const drugName = this.view.getDrugName() || 'Medicamento';

    if (weight <= 0 || dosePerKg <= 0 || concentration <= 0) {
      alert('Primero realice un cálculo válido antes de guardar.');
      return;
    }

    const totalMg = weight * dosePerKg;
    const volumeMl = totalMg / concentration;

    await saveToHistory({
      type: 'dosage',
      patientName: 'Paciente (sin nombre)',
      patientWeightKg: weight,
      inputs: { weight, dosePerKg, concentration, drug: drugName },
      result: { totalMg, volumeMl },
      summary: `${drugName} — ${totalMg.toFixed(2)} mg · ${volumeMl.toFixed(2)} mL`
    });

    alert('Cálculo guardado en el historial.');
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[DosageController] Destroyed');
  }
}