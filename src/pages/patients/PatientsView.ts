import { PatientsTemplate } from '@/templates/PatientsTemplate';
import type { Patient } from '@/types';

export class PatientsView {
  private searchInput: HTMLInputElement | null = null;
  private patientsList: HTMLElement | null = null;
  private activeCasesSpan: HTMLElement | null = null;
  private inSurgerySpan: HTMLElement | null = null;
  private seeAllBtn: HTMLElement | null = null;
  private addPatientBtn: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private closeModalBtn: HTMLElement | null = null;
  private form: HTMLFormElement | null = null;
  private editModal: HTMLElement | null = null;
  private closeEditModalBtn: HTMLElement | null = null;
  private editForm: HTMLFormElement | null = null;
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
    this.modal = document.getElementById('add-patient-modal');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.form = document.getElementById('add-patient-form') as HTMLFormElement;
    this.editModal = document.getElementById('edit-patient-modal');
    this.closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    this.editForm = document.getElementById('edit-patient-form') as HTMLFormElement;
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
  showModal(): void {
    if (this.modal) {
      this.modal.classList.remove('hidden');
    }
  }

  hideModal(): void {
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
  }

  onAddPatientSubmit(callback: (data: any) => void): void {
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('patient-name') as HTMLInputElement)?.value || '';
      const species = (document.getElementById('patient-species') as HTMLSelectElement)?.value || 'canine';
      const breed = (document.getElementById('patient-breed') as HTMLInputElement)?.value || '';
      const ageMonths = parseFloat((document.getElementById('patient-age') as HTMLInputElement)?.value || '0');
      const weight = parseFloat((document.getElementById('patient-weight') as HTMLInputElement)?.value || '0');
      const owner = (document.getElementById('patient-owner') as HTMLInputElement)?.value || '';
      callback({ name, species, breed, ageMonths, weight, owner });
      this.hideModal();
      this.clearForm();
    });
  }

  clearForm(): void {
    (document.getElementById('patient-name') as HTMLInputElement).value = '';
    (document.getElementById('patient-breed') as HTMLInputElement).value = '';
    (document.getElementById('patient-weight') as HTMLInputElement).value = '';
    (document.getElementById('patient-owner') as HTMLInputElement).value = '';
  }
  onAddButtonClick(callback: () => void): void {
    const addBtn = document.getElementById('add-patient-btn');
    addBtn?.addEventListener('click', callback);
  }
  showEditModal(patient: any): void {
    if (!this.editModal) return;
    // Precargar datos
    (document.getElementById('edit-patient-id') as HTMLInputElement).value = patient.id;
    (document.getElementById('edit-patient-name') as HTMLInputElement).value = patient.name;
    (document.getElementById('edit-patient-species') as HTMLSelectElement).value = patient.species;
    (document.getElementById('edit-patient-breed') as HTMLInputElement).value = patient.breed;
    (document.getElementById('edit-patient-age') as HTMLInputElement).value = patient.ageMonths?.toString() || '0';
    (document.getElementById('edit-patient-weight') as HTMLInputElement).value = patient.weightKg?.toString() || '0';
    (document.getElementById('edit-patient-owner') as HTMLInputElement).value = patient.ownerName || '';
    (document.getElementById('edit-patient-status') as HTMLSelectElement).value = patient.status || 'stable';
    this.editModal.classList.remove('hidden');
  }

  hideEditModal(): void {
    if (this.editModal) this.editModal.classList.add('hidden');
  }

  onEditPatientSubmit(callback: (data: any) => void): void {
    this.editForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = (document.getElementById('edit-patient-id') as HTMLInputElement).value;
      const name = (document.getElementById('edit-patient-name') as HTMLInputElement).value;
      const species = (document.getElementById('edit-patient-species') as HTMLSelectElement).value;
      const breed = (document.getElementById('edit-patient-breed') as HTMLInputElement).value;
      const ageMonths = parseFloat((document.getElementById('edit-patient-age') as HTMLInputElement).value || '0');
      const weight = parseFloat((document.getElementById('edit-patient-weight') as HTMLInputElement).value || '0');
      const owner = (document.getElementById('edit-patient-owner') as HTMLInputElement).value;
      const status = (document.getElementById('edit-patient-status') as HTMLSelectElement).value;
      callback({ id, name, species, breed, ageMonths, weight, owner, status });
      this.hideEditModal();
    });
  }
}