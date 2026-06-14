import { AnesthesiaTemplate } from '@/templates/AnesthesiaTemplate';

export interface Drug {
  name: string;
  dosePerKg: number;   // mg/kg
  concentration: number; // mg/mL (para calcular volumen)
  category: 'premed' | 'induction';
  selected: boolean;
}

export class AnesthesiaView {
  private container: HTMLElement | null = null;
  private patientDetailsEl: HTMLElement | null = null;
  private weightDisplayEl: HTMLElement | null = null;
  private asaStatusEl: HTMLElement | null = null;
  private premedListEl: HTMLElement | null = null;
  private inductionListEl: HTMLElement | null = null;
  private summaryBodyEl: HTMLElement | null = null;
  private totalFluidsEl: HTMLElement | null = null;
  private finalizeBtn: HTMLElement | null = null;
  private printBtn: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = AnesthesiaTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.patientDetailsEl = document.getElementById('patient-details');
    this.weightDisplayEl = document.getElementById('weight-display');
    this.asaStatusEl = document.getElementById('asa-status');
    this.premedListEl = document.getElementById('premed-list');
    this.inductionListEl = document.getElementById('induction-list');
    this.summaryBodyEl = document.getElementById('summary-table-body');
    this.totalFluidsEl = document.getElementById('total-fluids');
    this.finalizeBtn = document.getElementById('finalize-btn');
    this.printBtn = document.getElementById('print-pdf-btn');
  }

  // Getters para elementos dinámicos
  getPremedList(): HTMLElement | null { return this.premedListEl; }
  getInductionList(): HTMLElement | null { return this.inductionListEl; }
  getSummaryBody(): HTMLElement | null { return this.summaryBodyEl; }
  getTotalFluidsEl(): HTMLElement | null { return this.totalFluidsEl; }
  getFinalizeBtn(): HTMLElement | null { return this.finalizeBtn; }
  getPrintBtn(): HTMLElement | null { return this.printBtn; }

  // Actualizar datos del paciente (mock o real)
  updatePatientInfo(species: string, breed: string, weightKg: number, asa: string): void {
    if (this.patientDetailsEl) {
      this.patientDetailsEl.textContent = `${species} • ${breed} • ${weightKg} kg`;
    }
    if (this.weightDisplayEl) {
      this.weightDisplayEl.textContent = `${weightKg} kg`;
    }
    if (this.asaStatusEl) {
      this.asaStatusEl.textContent = asa;
    }
  }

  // Renderizar lista de fármacos en una sección
  renderDrugList(
    container: HTMLElement,
    drugs: Drug[],
    onToggle: (drugName: string, selected: boolean) => void
  ): void {
    container.innerHTML = '';
    for (const drug of drugs) {
      const card = document.createElement('label');
      card.className = `flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border shadow-sm hover:border-primary cursor-pointer transition-all ${drug.selected ? 'border-primary' : 'border-outline-variant'}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = drug.selected;
      checkbox.className = 'w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox';
      checkbox.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        onToggle(drug.name, isChecked);
        if (isChecked) {
          card.classList.add('border-primary');
          card.classList.remove('opacity-60');
        } else {
          card.classList.remove('border-primary');
          card.classList.add('opacity-60');
        }
      });
      // Info del fármaco
      const infoDiv = document.createElement('div');
      infoDiv.className = 'flex-grow';
      infoDiv.innerHTML = `
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface">${drug.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${drug.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${drug.category === 'premed' ? 'Sedante / Analgésico' : 'Agente de inducción'}</p>
      `;
      // Valores calculados (se actualizan dinámicamente con el peso)
      const valuesDiv = document.createElement('div');
      valuesDiv.className = 'text-right';
      valuesDiv.id = `drug-values-${drug.name.replace(/\s/g, '')}`;
      this.updateDrugValuesUI(valuesDiv, drug, 28.5); // peso por defecto, se actualizará después
      card.appendChild(checkbox);
      card.appendChild(infoDiv);
      card.appendChild(valuesDiv);
      container.appendChild(card);
    }
  }

  updateDrugValuesUI(container: HTMLElement, drug: Drug, weightKg: number): void {
    const totalMg = drug.dosePerKg * weightKg;
    const volumeMl = totalMg / drug.concentration;
    container.innerHTML = `
      <p class="font-headline-md text-headline-md text-primary">${totalMg.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${volumeMl.toFixed(2)} mL</p>
    `;
  }

  // Renderizar tabla resumen
  renderSummary(drugs: Drug[], weightKg: number, totalFluids: number): void {
    if (!this.summaryBodyEl) return;
    this.summaryBodyEl.innerHTML = '';
    for (const drug of drugs) {
      if (!drug.selected) continue;
      const totalMg = drug.dosePerKg * weightKg;
      const volumeMl = totalMg / drug.concentration;
      const row = document.createElement('tr');
      row.className = 'divide-y divide-outline-variant';
      row.innerHTML = `
        <td class="p-4">
          <p class="font-label-md text-label-md">${drug.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${drug.category === 'premed' ? 'Premedicación' : 'Inducción'}</p>
        </td>
        <td class="p-4 font-body-md">${totalMg.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${volumeMl.toFixed(2)} mL</td>
      `;
      this.summaryBodyEl.appendChild(row);
    }
    if (this.totalFluidsEl) {
      this.totalFluidsEl.textContent = `${totalFluids.toFixed(1)} mL`;
    }
  }

  // Método para limpiar listeners si es necesario (destroy)
}