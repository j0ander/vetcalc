import { PatientsView } from './PatientsView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import { db } from '@/database/VetCalcDB';
import type { AppRoute, Patient } from '@/types';
import type { Patient as DBPatient } from '@/database/VetCalcDB';

export class PatientsController extends BaseController implements Destroyable {
  private view: PatientsView;
  private patients: DBPatient[] = [];

  constructor() {
    super();
    this.view = new PatientsView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();

    try {
      await this.loadPatients();
    } catch (error) {
      console.error('[PatientsController] Error cargando pacientes:', error);
    }

    this.setupEventListeners();
    this.setupModalEvents();
  }

  private async loadPatients(): Promise<void> {
    this.patients = await db.patients.toArray();
    this.updateStatsAndRender();
  }

  private updateStatsAndRender(): void {
    const activeCases = this.patients.filter(p => p.status !== 'discharged').length;
    const inSurgery = this.patients.filter(p => p.status === 'in-surgery').length;
    this.view.updateStats(activeCases, inSurgery);

    const patientsForView = this.patients.map(p => ({
      ...p,
      id: p.id!.toString(),
      species: p.species as any,
    })) as any as Patient[];
    this.view.renderPatients(patientsForView, (patientId) => this.onPatientClick(patientId));
  }

  private setupEventListeners(): void {
    const searchInput = this.view.getSearchInput();
    searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      const filtered = this.patients.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.breed.toLowerCase().includes(query) ||
        p.ownerName.toLowerCase().includes(query)
      );
      const filteredForView = filtered.map(p => ({
        ...p,
        id: p.id!.toString(),
        species: p.species as any,
      })) as any as Patient[];
      this.view.renderPatients(filteredForView, (patientId) => this.onPatientClick(patientId));
    });

    const seeAllBtn = this.view.getSeeAllBtn();
    seeAllBtn?.addEventListener('click', () => {
      alert('Funcionalidad "Ver todos" en desarrollo');
    });

    const addBtn = this.view.getAddPatientBtn();
    addBtn?.addEventListener('click', () => {
      this.view.showModal();
    });
  }

  private setupModalEvents(): void {
    // ===== MODAL DE CREACIÓN =====
    const closeBtn = document.getElementById('close-modal-btn');
    closeBtn?.addEventListener('click', () => {
      this.view.hideModal();
    });

    const modal = document.getElementById('add-patient-modal');
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.view.hideModal();
      }
    });

    this.view.onAddPatientSubmit(async (data) => {
      const newPatient: Omit<DBPatient, 'id'> = {
        name: data.name,
        species: data.species,
        breed: data.breed,
        weightKg: data.weight,
        ageMonths: data.ageMonths || 0,
        ownerName: data.owner,
        status: 'stable',
        observations: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.patients.add(newPatient);
      await this.loadPatients();
    });

    // ===== MODAL DE EDICIÓN =====
    const closeEditBtn = document.getElementById('close-edit-modal-btn');
    closeEditBtn?.addEventListener('click', () => {
      this.view.hideEditModal();
    });

    const editModal = document.getElementById('edit-patient-modal');
    editModal?.addEventListener('click', (e) => {
      if (e.target === editModal) {
        this.view.hideEditModal();
      }
    });

    this.view.onEditPatientSubmit(async (data) => {
      const id = parseInt(data.id, 10);
      if (isNaN(id)) {
        alert('ID inválido');
        return;
      }
      await db.patients.update(id, {
        name: data.name,
        species: data.species,
        breed: data.breed,
        ageMonths: data.ageMonths,
        weightKg: data.weight,
        ownerName: data.owner,
        status: data.status,
        updatedAt: new Date()
      });
      await this.loadPatients();
    });
  }

  private onPatientClick(patientId: string): void {
    console.log(`[Patients] Editar paciente: ${patientId}`);
    const patient = this.patients.find(p => p.id?.toString() === patientId);
    if (patient) {
      this.view.showEditModal(patient);
    } else {
      alert('Paciente no encontrado');
    }
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[PatientsController] Destroyed');
  }
}