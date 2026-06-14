import { ConverterTemplate } from '@/templates/ConverterTemplate'

export class ConverterView {
  private container: HTMLElement | null = null;
  private inputLeft: HTMLInputElement | null = null;
  private inputRight: HTMLInputElement | null = null;
  private labelLeft: HTMLElement | null = null;
  private labelRight: HTMLElement | null = null;
  private unitLeft: HTMLElement | null = null;
  private unitRight: HTMLElement | null = null;
  private referenceText: HTMLElement | null = null;
  private tabs: NodeListOf<Element> | null = null;
  private swapBtn: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = ConverterTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.inputLeft = document.getElementById('input-left') as HTMLInputElement;
    this.inputRight = document.getElementById('input-right') as HTMLInputElement;
    this.labelLeft = document.getElementById('label-left');
    this.labelRight = document.getElementById('label-right');
    this.unitLeft = document.getElementById('unit-left');
    this.unitRight = document.getElementById('unit-right');
    this.referenceText = document.getElementById('reference-text');
    this.tabs = document.querySelectorAll('[data-mode]');
    this.swapBtn = document.getElementById('swap-btn');
  }

  getInputLeft(): HTMLInputElement | null { return this.inputLeft; }
  getInputRight(): HTMLInputElement | null { return this.inputRight; }
  getLabelLeft(): HTMLElement | null { return this.labelLeft; }
  getLabelRight(): HTMLElement | null { return this.labelRight; }
  getUnitLeft(): HTMLElement | null { return this.unitLeft; }
  getUnitRight(): HTMLElement | null { return this.unitRight; }
  getReferenceText(): HTMLElement | null { return this.referenceText; }
  getTabs(): NodeListOf<Element> | null { return this.tabs; }
  getSwapBtn(): HTMLElement | null { return this.swapBtn; }

  // Métodos para actualizar la UI según el modo
  updateLeftLabel(text: string): void {
    if (this.labelLeft) this.labelLeft.textContent = text;
  }
  updateRightLabel(text: string): void {
    if (this.labelRight) this.labelRight.textContent = text;
  }
  updateLeftUnit(text: string): void {
    if (this.unitLeft) this.unitLeft.textContent = text;
  }
  updateRightUnit(text: string): void {
    if (this.unitRight) this.unitRight.textContent = text;
  }
  updateReference(text: string): void {
    if (this.referenceText) this.referenceText.textContent = text;
  }
  clearInputs(): void {
    if (this.inputLeft) this.inputLeft.value = '';
    if (this.inputRight) this.inputRight.value = '';
  }
  setInputLeftValue(value: string): void {
    if (this.inputLeft && value !== undefined) {
      this.inputLeft.value = value;
    }
  }

  setInputRightValue(value: string): void {
    if (this.inputRight && value !== undefined) {
      this.inputRight.value = value;
    }
  }
  getInputLeftValue(): number | null {
    const input = this.inputLeft;
    if (!input) return null;
    const val = input.value;
    if (val === '' || val === undefined) return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  }

  getInputRightValue(): number | null {
    const input = this.inputRight;
    if (!input) return null;
    const val = input.value;
    if (val === '' || val === undefined) return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  }
}