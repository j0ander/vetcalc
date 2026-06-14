// src/pages/converter/ConverterController.ts
import { ConverterView } from './ConverterView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

type ConverterMode = 'weight' | 'temp' | 'volume';

interface ModeConfig {
  leftLabel: string;
  leftUnit: string;
  rightLabel: string;
  rightUnit: string;
  reference: string;
  convert: (value: number, direction: 'leftToRight' | 'rightToLeft') => number;
}

export class ConverterController extends BaseController implements Destroyable {
  private view: ConverterView;
  private currentMode: ConverterMode = 'weight';
  private modes: Record<ConverterMode, ModeConfig> = {
    weight: {
      leftLabel: 'Libras (lb)',
      leftUnit: 'lb',
      rightLabel: 'Kilogramos (kg)',
      rightUnit: 'kg',
      reference: 'Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.',
      convert: (value, direction) => direction === 'leftToRight' ? value / 2.20462 : value * 2.20462,
    },
    temp: {
      leftLabel: 'Fahrenheit (°F)',
      leftUnit: '°F',
      rightLabel: 'Celsius (°C)',
      rightUnit: '°C',
      reference: 'Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).',
      convert: (value, direction) => direction === 'leftToRight' ? (value - 32) * 5/9 : (value * 9/5) + 32,
    },
    volume: {
      leftLabel: 'Onzas líquidas (fl oz)',
      leftUnit: 'fl oz',
      rightLabel: 'Mililitros (mL)',
      rightUnit: 'mL',
      reference: 'Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).',
      convert: (value, direction) => direction === 'leftToRight' ? value * 29.5735 : value / 29.5735,
    },
  };

  constructor() {
    super(); // Llama al constructor de BaseController
    this.view = new ConverterView();
  }

  async init(): Promise<void> {
    this.view.render();

    // Navegación global para todos los elementos con data-route
    this.setupGlobalNavigation();

    // Inicializar badge premium (color según suscripción)
    this.initPremiumBadge();

    // Configurar eventos específicos del convertidor
    this.setupEventListeners();
    this.applyMode('weight');
  }

  private setupEventListeners(): void {
    // Tabs
    const tabs = this.view.getTabs();
    tabs?.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode') as ConverterMode;
        if (mode && this.modes[mode]) {
          this.applyMode(mode);
        }
      });
    });

    // Inputs
    const leftInput = this.view.getInputLeft();
    const rightInput = this.view.getInputRight();
    leftInput?.addEventListener('input', () => this.convertFromLeft());
    rightInput?.addEventListener('input', () => this.convertFromRight());

    // Swap button
    const swapBtn = this.view.getSwapBtn();
    swapBtn?.addEventListener('click', () => this.swap());
  }

  private applyMode(mode: ConverterMode): void {
    this.currentMode = mode;
    const cfg = this.modes[mode];

    this.view.updateLeftLabel(cfg.leftLabel);
    this.view.updateRightLabel(cfg.rightLabel);
    this.view.updateLeftUnit(cfg.leftUnit);
    this.view.updateRightUnit(cfg.rightUnit);
    this.view.updateReference(cfg.reference);
    this.view.clearInputs();

    const tabs = this.view.getTabs();
    tabs?.forEach(tab => {
      const tabMode = tab.getAttribute('data-mode');
      if (tabMode === mode) {
        tab.classList.add('bg-surface', 'text-primary', 'shadow-sm');
        tab.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
      } else {
        tab.classList.remove('bg-surface', 'text-primary', 'shadow-sm');
        tab.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
      }
    });
  }

  private convertFromLeft(): void {
    const leftVal = this.view.getInputLeftValue();
    if (leftVal !== null) {
      const cfg = this.modes[this.currentMode];
      const result = cfg.convert(leftVal, 'leftToRight');
      this.view.setInputRightValue(result.toFixed(2));
    } else {
      this.view.setInputRightValue('');
    }
  }

  private convertFromRight(): void {
    const rightVal = this.view.getInputRightValue();
    if (rightVal !== null) {
      const cfg = this.modes[this.currentMode];
      const result = cfg.convert(rightVal, 'rightToLeft');
      this.view.setInputLeftValue(result.toFixed(2));
    } else {
      this.view.setInputLeftValue('');
    }
  }

  private swap(): void {
    const leftVal = this.view.getInputLeftValue();
    const rightVal = this.view.getInputRightValue();
    if (leftVal !== null) {
      this.view.setInputRightValue(leftVal.toFixed(2));
    } else {
      this.view.setInputRightValue('');
    }
    if (rightVal !== null) {
      this.view.setInputLeftValue(rightVal.toFixed(2));
    } else {
      this.view.setInputLeftValue('');
    }
    this.convertFromLeft();
  }

  destroy(): void {
    this.destroyPremiumBadge(); // Limpiar suscripción premium
    console.log('[ConverterController] Destroyed');
  }
}