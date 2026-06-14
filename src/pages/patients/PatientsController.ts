// src/pages/patients/PatientsController.ts
import { PatientsView } from './PatientsView';
import { router, type Destroyable } from '@/services/RouterService';
import { mockDataService } from '@/services/MockDataService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute, Patient } from '@/types';

export class PatientsController extends BaseController implements Destroyable {
  private view: PatientsView;
  private patients: Patient[] = [];

  constructor() {
    super();
    this.view = new PatientsView();
  }

  async init(): Promise<void> {
    this.view.render();

    // Navegación global para todos los elementos con data-route
    this.setupGlobalNavigation();

    // Badge premium
    this.initPremiumBadge();

    this.loadPatients();
    this.setupEventListeners();
  }

  private loadPatients(): void {
    this.patients = mockDataService.getRecentPatients(10);
    const activeCases = this.patients.filter(p => p.status !== 'discharged').length;
    const inSurgery = this.patients.filter(p => p.status === 'in-surgery').length;
    this.view.updateStats(activeCases, inSurgery);
    this.view.renderPatients(this.patients, (patientId) => this.onPatientClick(patientId));
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

    // Ver todos
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
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[PatientsController] Destroyed');
  }
}