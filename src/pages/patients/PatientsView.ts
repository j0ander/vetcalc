import { PatientsTemplate } from '@/templates/PatientsTemplate';
import type { Patient } from '@/types';

export class PatientsView {
  private searchInput: HTMLInputElement | null = null;
  private patientsList: HTMLElement | null = null;
  private activeCasesSpan: HTMLElement | null = null;
  private inSurgerySpan: HTMLElement | null = null;
  private seeAllBtn: HTMLElement | null = null;
  private addPatientBtn: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = PatientsTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.patientsList = document.getElementById('patients-list');
    this.activeCasesSpan = document.getElementById('active-cases');
    this.inSurgerySpan = document.getElementById('in-surgery');
    this.seeAllBtn = document.getElementById('see-all-btn');
    this.addPatientBtn = document.getElementById('add-patient-btn');
  }

  getSearchInput(): HTMLInputElement | null { return this.searchInput; }
  getSeeAllBtn(): HTMLElement | null { return this.seeAllBtn; }
  getAddPatientBtn(): HTMLElement | null { return this.addPatientBtn; }

  updateStats(activeCases: number, inSurgery: number): void {
    if (this.activeCasesSpan) this.activeCasesSpan.textContent = activeCases.toString();
    if (this.inSurgerySpan) this.inSurgerySpan.textContent = inSurgery.toString();
  }

  renderPatients(patients: Patient[], onPatientClick: (patientId: string) => void): void {
    if (!this.patientsList) return;
    this.patientsList.innerHTML = '';
    for (const patient of patients) {
      const card = document.createElement('div');
      card.className = 'bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden';
      card.setAttribute('data-id', patient.id);
      
      // Imagen placeholder (usamos ícono en lugar de imagen real para evitar URLs externas)
      const speciesIcon = patient.species === 'canine' ? 'pets' : (patient.species === 'feline' ? 'pets' : 'pets');
      const statusClass = patient.status === 'stable' ? 'bg-secondary-container text-on-secondary-container' :
                          patient.status === 'in-surgery' ? 'bg-error-container text-on-error-container' :
                          'bg-surface-container-highest text-on-surface-variant';
      const statusText = patient.status === 'stable' ? 'Estable' :
                         patient.status === 'in-surgery' ? 'En cirugía' :
                         patient.status === 'critical' ? 'Crítico' :
                         patient.status === 'discharged' ? 'Dado de alta' : 'Observación';
      
      card.innerHTML = `
        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-on-primary-container">${speciesIcon}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-headline-md text-headline-md leading-tight text-on-surface">${this.escapeHtml(patient.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${this.escapeHtml(patient.breed)}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="px-3 py-1 ${statusClass} font-label-sm text-label-sm rounded-full">${statusText}</span>
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      `;
      
      card.addEventListener('click', () => onPatientClick(patient.id));
      this.patientsList?.appendChild(card);
    }
  }

  filterPatients(query: string, patients: Patient[], onFiltered: (filtered: Patient[]) => void): void {
    const filtered = patients.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.breed.toLowerCase().includes(query) ||
      p.ownerName.toLowerCase().includes(query)
    );
    onFiltered(filtered);
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}