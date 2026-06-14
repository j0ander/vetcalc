import { PatientsView } from './PatientsView';
import { router, type Destroyable } from '@/services/RouterService';
import { mockDataService } from '@/services/MockDataService';
import type { AppRoute, Patient } from '@/types';

export class PatientsController implements Destroyable {
  private view: PatientsView;
  private patients: Patient[] = [];

  constructor() {
    this.view = new PatientsView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.loadPatients();
    this.setupNavigation();
    this.setupEventListeners();
  }

  private loadPatients(): void {
    // Obtener pacientes desde MockDataService (devuelve 4 por defecto)
    this.patients = mockDataService.getRecentPatients(10);
    const activeCases = this.patients.filter(p => p.status !== 'discharged').length;
    const inSurgery = this.patients.filter(p => p.status === 'in-surgery').length;
    this.view.updateStats(activeCases, inSurgery);
    this.view.renderPatients(this.patients, (patientId) => this.onPatientClick(patientId));
  }

  private setupNavigation(): void {
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });
  }

  private setupEventListeners(): void {
    // Búsqueda
    const searchInput = this.view.getSearchInput();
    searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      this.view.filterPatients(query, this.patients, (filtered) => {
        this.view.renderPatients(filtered, (patientId) => this.onPatientClick(patientId));
      });
    });

    // Ver todos (simulación)
    const seeAllBtn = this.view.getSeeAllBtn();
    seeAllBtn?.addEventListener('click', () => {
      alert('Funcionalidad "Ver todos" en desarrollo');
    });

    // Añadir paciente
    const addBtn = this.view.getAddPatientBtn();
    addBtn?.addEventListener('click', () => {
      alert('Funcionalidad "Añadir paciente" en desarrollo');
    });
  }

  private onPatientClick(patientId: string): void {
    console.log(`[Patients] Ver detalle de paciente: ${patientId}`);
    alert(`Detalle del paciente (simulación) - ID: ${patientId}`);
    // En el futuro, navegar a una vista de detalle
  }

  destroy(): void {
    console.log('[PatientsController] Destroyed');
  }
}