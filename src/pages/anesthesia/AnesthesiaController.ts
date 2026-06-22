import { AnesthesiaView, Drug } from './AnesthesiaView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

export class AnesthesiaController extends BaseController implements Destroyable {
  private view: AnesthesiaView;
  private weightKg: number = 28.5;
  private asaStatus: string = 'Clase II';
  private drugs: Drug[] = [
    { name: 'Acepromazina', dosePerKg: 0.02, concentration: 10, category: 'premed', selected: true },
    { name: 'Butorfanol', dosePerKg: 0.2, concentration: 10, category: 'premed', selected: true },
    { name: 'Propofol', dosePerKg: 4.0, concentration: 10, category: 'induction', selected: true },
  ];

  constructor() {
    super();
    this.view = new AnesthesiaView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation(); // Navegación global para data-route
    this.initPremiumBadge();
    this.setupEventListeners();
    this.renderDrugLists();
    this.updateSummaryAndFluids();
    this.setupExpandPanel(); // Control del panel expandible
  }

  private setupEventListeners(): void {
    // Botón finalizar
    const finalizeBtn = this.view.getFinalizeBtn();
    finalizeBtn?.addEventListener('click', () => {
      alert('Protocolo guardado (simulación)');
      console.log('Protocolo finalizado:', this.drugs.filter(d => d.selected));
    });

    // Botón imprimir PDF
    const printBtn = this.view.getPrintBtn();
    printBtn?.addEventListener('click', () => {
      console.log('Generar PDF');
    });
  }

  private setupExpandPanel(): void {
    const expandBtn = this.view.getExpandBtn();
    const detailsPanel = this.view.getDetailsPanel();
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', () => {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles del protocolo';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del protocolo';
        }
      });
    }
  }

  private renderDrugLists(): void {
    const premedContainer = this.view.getPremedList();
    const inductionContainer = this.view.getInductionList();
    if (!premedContainer || !inductionContainer) return;

    const premeds = this.drugs.filter(d => d.category === 'premed');
    const inductions = this.drugs.filter(d => d.category === 'induction');

    this.view.renderDrugList(premedContainer, premeds, (name, selected) => {
      const drug = this.drugs.find(d => d.name === name);
      if (drug) drug.selected = selected;
      this.updateSummaryAndFluids();
      this.refreshDrugValuesUI();
    }, this.weightKg);

    this.view.renderDrugList(inductionContainer, inductions, (name, selected) => {
      const drug = this.drugs.find(d => d.name === name);
      if (drug) drug.selected = selected;
      this.updateSummaryAndFluids();
      this.refreshDrugValuesUI();
    }, this.weightKg);
  }

  private refreshDrugValuesUI(): void {
    for (const drug of this.drugs) {
      const valueContainer = document.getElementById(`drug-values-${drug.name.replace(/\s/g, '')}`);
      if (valueContainer) {
        this.view.updateDrugValuesUI(valueContainer, drug, this.weightKg);
      }
    }
  }

  private updateSummaryAndFluids(): void {
    const selectedDrugs = this.drugs.filter(d => d.selected);
    const totalFluids = this.weightKg * 5; // 5 mL/kg/h (ejemplo)
    this.view.renderSummary(selectedDrugs, this.weightKg, totalFluids);

    // Actualizar panel de detalles
    this.view.updateDetailPanel(
      this.weightKg,
      this.asaStatus,
      selectedDrugs.length,
      totalFluids
    );
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[AnesthesiaController] Destroyed');
  }
}