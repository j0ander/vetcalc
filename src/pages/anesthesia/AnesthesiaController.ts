import { AnesthesiaView, Drug } from './AnesthesiaView';
import { router, type Destroyable } from '@/services/RouterService';
import type { AppRoute } from '@/types';

export class AnesthesiaController implements Destroyable {
  private view: AnesthesiaView;
  private weightKg: number = 28.5; // mock, luego se puede obtener de un paciente seleccionado
  private drugs: Drug[] = [
    { name: 'Acepromazina', dosePerKg: 0.02, concentration: 10, category: 'premed', selected: true },
    { name: 'Butorfanol', dosePerKg: 0.2, concentration: 10, category: 'premed', selected: true },
    { name: 'Propofol', dosePerKg: 4.0, concentration: 10, category: 'induction', selected: true },
  ];

  constructor() {
    this.view = new AnesthesiaView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
    this.renderDrugLists();
    this.updateSummaryAndFluids();
  }

  private setupEventListeners(): void {
    // Navegación general (botones con data-route)
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });

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
      // Aquí se podría implementar la generación de PDF
    });
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
      // Actualizar UI de valores en los cards (ya que el peso no cambia, pero si cambia la selección, se refleja en la tabla)
      this.refreshDrugValuesUI();
    });

    this.view.renderDrugList(inductionContainer, inductions, (name, selected) => {
      const drug = this.drugs.find(d => d.name === name);
      if (drug) drug.selected = selected;
      this.updateSummaryAndFluids();
      this.refreshDrugValuesUI();
    });
  }

  private refreshDrugValuesUI(): void {
    // Actualizar los valores numéricos en cada tarjeta según el peso actual
    const allDrugs = this.drugs;
    // Para cada fármaco, buscar su contenedor de valores y actualizar
    for (const drug of allDrugs) {
      const valueContainer = document.getElementById(`drug-values-${drug.name.replace(/\s/g, '')}`);
      if (valueContainer) {
        this.view.updateDrugValuesUI(valueContainer, drug, this.weightKg);
      }
    }
  }

  private updateSummaryAndFluids(): void {
    const selectedDrugs = this.drugs.filter(d => d.selected);
    // Calcular fluidos totales estimados (ejemplo: 5 mL/kg/h)
    const totalFluids = this.weightKg * 5;
    this.view.renderSummary(selectedDrugs, this.weightKg, totalFluids);
  }

  destroy(): void {
    console.log('[AnesthesiaController] Destroyed');
  }
}