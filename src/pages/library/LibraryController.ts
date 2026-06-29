import { LibraryView, Appointment } from './LibraryView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

export class LibraryController extends BaseController implements Destroyable {
  private view: LibraryView;
  private appointments: Appointment[] = [];
  private currentFilter: string = 'all';

  constructor() {
    super();
    this.view = new LibraryView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();

    // Cargar citas de ejemplo
    this.loadMockAppointments();

    // Configurar fecha por defecto en el formulario
    this.view.setDefaultDate();

    // Configurar eventos
    this.setupEventListeners();

    // Renderizar lista inicial
    this.applyFilter();
  }

  private loadMockAppointments(): void {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    this.appointments = [
      {
        id: '1',
        petName: 'Firulais',
        date: today,
        time: '10:30',
        description: 'Vacunación antirrábica',
        createdAt: new Date()
      },
      {
        id: '2',
        petName: 'Michi',
        date: tomorrow,
        time: '15:00',
        description: 'Consulta general',
        createdAt: new Date()
      },
      {
        id: '3',
        petName: 'Rex',
        date: yesterday,
        time: '09:00',
        description: 'Desparasitación',
        createdAt: new Date()
      }
    ];
  }

  private setupEventListeners(): void {
    // Agregar cita
    this.view.onAddAppointment(() => {
      const data = this.view.getAppointmentData();
      if (!data.petName || !data.date || !data.time) {
        alert('Por favor completa los campos obligatorios (mascota, fecha y hora).');
        return;
      }

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        petName: data.petName,
        date: data.date,
        time: data.time,
        description: data.description || 'Sin descripción',
        createdAt: new Date()
      };

      this.appointments.push(newAppointment);
      this.view.clearForm();
      this.applyFilter();
    });

    // Eliminar cita (callback desde la vista)
    this.view.onDeleteAppointment((id: string) => {
      this.appointments = this.appointments.filter(app => app.id !== id);
      this.applyFilter();
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

    this.view.renderAppointments(filtered, this.currentFilter);
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[LibraryController] Destroyed');
  }
}