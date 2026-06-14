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
      this.resultContainer.classList.remove('opacity-0', 'translate-y-4');
      this.resultContainer.classList.add('opacity-100', 'translate-y-0');
    }
    if (this.resultVolumeSpan) {
      this.resultVolumeSpan.textContent = `${volumeMl.toFixed(2)} mL`;
    }
    if (this.resultDosageSpan) {
      this.resultDosageSpan.textContent = `Dosis: ${totalMg.toFixed(2)} mg total`;
    }
  }

  hideResult(): void {
    if (this.resultContainer) {
      this.resultContainer.classList.add('opacity-0', 'translate-y-4');
      this.resultContainer.classList.remove('opacity-100', 'translate-y-0');
    }
  }

  getCalculateButton(): HTMLElement | null { return this.calculateBtn; }
  getLogButton(): HTMLElement | null { return this.logBtn; }

  // Para la animación de borde al escribir en el campo de fármaco (opcional)
  highlightDrugInput(highlight: boolean): void {
    if (this.drugInput) {
      if (highlight) {
        this.drugInput.classList.add('border-primary');
      } else {
        this.drugInput.classList.remove('border-primary');
      }
    }
  }
}