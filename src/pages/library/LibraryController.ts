import { LibraryView, Appointment as ViewAppointment } from './LibraryView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import { db, type Appointment as DBAppointment } from '@/database/VetCalcDB';
import type { AppRoute } from '@/types';

export class LibraryController extends BaseController implements Destroyable {
  private view: LibraryView;
  private appointments: DBAppointment[] = [];
  private currentFilter: string = 'all';

  constructor() {
    super();
    this.view = new LibraryView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();

    // Cargar citas desde IndexedDB
    await this.loadAppointments();

    // Configurar fecha por defecto en el formulario
    this.view.setDefaultDate();

    // Configurar eventos
    this.setupEventListeners();

    // Renderizar lista inicial
    this.applyFilter();
  }

  private async loadAppointments(): Promise<void> {
    this.appointments = await db.appointments.toArray();
  }

  private async addAppointment(data: { petName: string; date: string; time: string; description: string }): Promise<void> {
    const newAppointment: Omit<DBAppointment, 'id'> = {
      petName: data.petName,
      date: data.date,
      time: data.time,
      description: data.description || 'Sin descripción',
      createdAt: new Date()
    };
    await db.appointments.add(newAppointment);
    await this.loadAppointments(); // recargar lista
  }

  private async deleteAppointment(id: number): Promise<void> {
    await db.appointments.delete(id);
    await this.loadAppointments();
  }

  private setupEventListeners(): void {
    // Agregar cita
    this.view.onAddAppointment(async () => {
      const data = this.view.getAppointmentData();
      if (!data.petName || !data.date || !data.time) {
        alert('Por favor completa los campos obligatorios (mascota, fecha y hora).');
        return;
      }
      await this.addAppointment(data);
      this.view.clearForm();
      this.applyFilter();
    });

    // Eliminar cita (callback desde la vista)
    this.view.onDeleteAppointment(async (id: string) => {
      const numId = parseInt(id, 10);
      if (!isNaN(numId)) {
        await this.deleteAppointment(numId);
        this.applyFilter();
      }
    });

    // Filtros
    this.view.onFilterChange((filter) => {
      this.currentFilter = filter;
      this.applyFilter();
    });
  }

  private applyFilter(): void {
    const today = new Date().toISOString().split('T')[0];
    let filtered = [...this.appointments];

    switch (this.currentFilter) {
      case 'today':
        filtered = filtered.filter(app => app.date === today);
        break;
      case 'upcoming':
        filtered = filtered.filter(app => app.date > today);
        break;
      case 'past':
        filtered = filtered.filter(app => app.date < today);
        break;
      default: // 'all'
        break;
    }

    // Ordenar por fecha (más reciente primero)
    filtered.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

    // Convertir a tipo que espera la vista (con id como string)
    const viewAppointments: ViewAppointment[] = filtered.map(app => ({
      id: app.id!.toString(),
      petName: app.petName,
      date: app.date,
      time: app.time,
      description: app.description,
      createdAt: app.createdAt
    }));

    this.view.renderAppointments(viewAppointments, this.currentFilter);
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[LibraryController] Destroyed');
  }
}