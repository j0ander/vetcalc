import { DosageTemplate } from '@/templates/DosageTemplate';

export class DosageView {
  private drugInput: HTMLInputElement | null = null;
  private weightInput: HTMLInputElement | null = null;
  private dosageInput: HTMLInputElement | null = null;
  private concentrationInput: HTMLInputElement | null = null;
  private calculateBtn: HTMLElement | null = null;
  private resultContainer: HTMLElement | null = null;
  private resultVolumeSpan: HTMLElement | null = null;
  private resultDosageSpan: HTMLElement | null = null;
  private logBtn: HTMLElement | null = null;

  // Elementos del panel de detalles expandible
  private detailWeight: HTMLElement | null = null;
  private detailDosage: HTMLElement | null = null;
  private detailConcentration: HTMLElement | null = null;
  private detailVolume: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = DosageTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.drugInput = document.getElementById('drug-name') as HTMLInputElement;
    this.weightInput = document.getElementById('weight') as HTMLInputElement;
    this.dosageInput = document.getElementById('dosage') as HTMLInputElement;
    this.concentrationInput = document.getElementById('concentration') as HTMLInputElement;
    this.calculateBtn = document.getElementById('calculate-btn');
    this.resultContainer = document.getElementById('result-container');
    this.resultVolumeSpan = document.getElementById('result-volume');
    this.resultDosageSpan = document.getElementById('result-dosage');
    this.logBtn = document.getElementById('log-btn');

    // Detalles del panel
    this.detailWeight = document.getElementById('detail-weight');
    this.detailDosage = document.getElementById('detail-dosage');
    this.detailConcentration = document.getElementById('detail-concentration');
    this.detailVolume = document.getElementById('detail-volume');
  }

  getDrugName(): string {
    return this.drugInput?.value || '';
  }
  getWeight(): number {
    const val = this.weightInput?.value;
    return val ? parseFloat(val) : 0;
  }
  getDosageMgPerKg(): number {
    const val = this.dosageInput?.value;
    return val ? parseFloat(val) : 0;
  }
  getConcentrationMgPerMl(): number {
    const val = this.concentrationInput?.value;
    return val ? parseFloat(val) : 0;
  }

  setDrugName(value: string): void {
    if (this.drugInput) this.drugInput.value = value;
  }
  setWeight(value: number): void {
    if (this.weightInput) this.weightInput.value = value.toString();
  }
  setDosage(value: number): void {
    if (this.dosageInput) this.dosageInput.value = value.toString();
  }
  setConcentration(value: number): void {
    if (this.concentrationInput) this.concentrationInput.value = value.toString();
  }

  showResult(totalMg: number, volumeMl: number): void {
    if (this.resultContainer) {
      // Remover 'hidden' para mostrar el contenedor
      this.resultContainer.classList.remove('hidden');
      // Añadir clases de animación (ya tiene transition-all)
      this.resultContainer.style.opacity = '1';
      this.resultContainer.style.transform = 'translateY(0)';
    }
    if (this.resultVolumeSpan) {
      this.resultVolumeSpan.textContent = `${volumeMl.toFixed(2)} mL`;
    }
    if (this.resultDosageSpan) {
      this.resultDosageSpan.textContent = `Dosis: ${totalMg.toFixed(2)} mg total`;
    }

    // Actualizar panel de detalles
    const weight = this.getWeight();
    const dosePerKg = this.getDosageMgPerKg();
    const concentration = this.getConcentrationMgPerMl();

    if (this.detailWeight) {
      this.detailWeight.textContent = `${weight.toFixed(1)} kg`;
    }
    if (this.detailDosage) {
      this.detailDosage.textContent = `${dosePerKg.toFixed(2)} mg/kg`;
    }
    if (this.detailConcentration) {
      this.detailConcentration.textContent = `${concentration.toFixed(1)} mg/mL`;
    }
    if (this.detailVolume) {
      this.detailVolume.textContent = `${volumeMl.toFixed(2)} mL`;
    }
  }

  hideResult(): void {
    if (this.resultContainer) {
      // Añadir 'hidden' para ocultar el contenedor
      this.resultContainer.classList.add('hidden');
      this.resultContainer.style.opacity = '0';
      this.resultContainer.style.transform = 'translateY(20px)';
    }
  }

  getCalculateButton(): HTMLElement | null { return this.calculateBtn; }
  getLogButton(): HTMLElement | null { return this.logBtn; }

  highlightDrugInput(highlight: boolean): void {
    if (this.drugInput) {
      if (highlight) {
        this.drugInput.classList.add('border-primary', 'ring-2', 'ring-primary/30');
      } else {
        this.drugInput.classList.remove('border-primary', 'ring-2', 'ring-primary/30');
      }
    }
  }
}