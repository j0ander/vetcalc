import { LibraryTemplate } from '@/templates/LibraryTemplate';

export interface Appointment {
  id: string;
  petName: string;
  date: string;      // formato YYYY-MM-DD
  time: string;      // formato HH:MM
  description: string;
  createdAt: Date;
}

export class LibraryView {
  private petInput: HTMLInputElement | null = null;
  private dateInput: HTMLInputElement | null = null;
  private timeInput: HTMLInputElement | null = null;
  private descInput: HTMLInputElement | null = null;
  private addBtn: HTMLElement | null = null;
  private appointmentsList: HTMLElement | null = null;
  private emptyState: HTMLElement | null = null;
  private countSpan: HTMLElement | null = null;
  private filterButtons: NodeListOf<Element> | null = null;
  private deleteCallback: ((id: string) => void) | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = LibraryTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.petInput = document.getElementById('appointment-pet') as HTMLInputElement;
    this.dateInput = document.getElementById('appointment-date') as HTMLInputElement;
    this.timeInput = document.getElementById('appointment-time') as HTMLInputElement;
    this.descInput = document.getElementById('appointment-desc') as HTMLInputElement;
    this.addBtn = document.getElementById('add-appointment-btn');
    this.appointmentsList = document.getElementById('appointments-list');
    this.emptyState = document.getElementById('empty-state');
    this.countSpan = document.getElementById('appointment-count');
    this.filterButtons = document.querySelectorAll('.filter-btn');
  }

  // Obtener valores del formulario
  getAppointmentData(): { petName: string; date: string; time: string; description: string } {
    return {
      petName: this.petInput?.value || '',
      date: this.dateInput?.value || '',
      time: this.timeInput?.value || '',
      description: this.descInput?.value || ''
    };
  }

  // Limpiar formulario
  clearForm(): void {
    if (this.petInput) this.petInput.value = '';
    if (this.dateInput) this.dateInput.value = '';
    if (this.timeInput) this.timeInput.value = '';
    if (this.descInput) this.descInput.value = '';
  }

  // Renderizar lista de citas
  renderAppointments(appointments: Appointment[], currentFilter: string): void {
    if (!this.appointmentsList || !this.emptyState || !this.countSpan) return;

    if (appointments.length === 0) {
      this.appointmentsList.innerHTML = '';
      this.emptyState.style.display = 'block';
      this.countSpan.textContent = '0 citas';
      return;
    }

    this.emptyState.style.display = 'none';
    this.countSpan.textContent = `${appointments.length} cita${appointments.length > 1 ? 's' : ''}`;

    this.appointmentsList.innerHTML = appointments.map(app => `
      <div class="appointment-item bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4" data-id="${app.id}">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-headline-md text-headline-md text-on-surface">${this.escapeHtml(app.petName)}</span>
            <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">${app.date}</span>
            <span class="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold">${app.time}</span>
          </div>
          ${app.description ? `<p class="text-on-surface-variant text-sm mt-1">${this.escapeHtml(app.description)}</p>` : ''}
        </div>
        <button class="delete-btn p-2 rounded-full hover:bg-error/10 text-error transition-all" data-id="${app.id}">
          <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    `).join('');

    // Asignar eventos de eliminación usando el callback almacenado
    if (this.deleteCallback) {
      this.appointmentsList.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          if (id && this.deleteCallback) {
            this.deleteCallback(id);
          }
        });
      });
    }
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Eventos para el controlador
  onAddAppointment(callback: () => void): void {
    this.addBtn?.addEventListener('click', callback);
  }

  onDeleteAppointment(callback: (id: string) => void): void {
    this.deleteCallback = callback;
  }

  onFilterChange(callback: (filter: string) => void): void {
    this.filterButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        // Actualizar estilo visual
        this.filterButtons?.forEach(b => {
          b.classList.remove('bg-secondary', 'text-white');
          b.classList.add('bg-white/80', 'text-on-surface-variant', 'border', 'border-outline-variant');
        });
        btn.classList.remove('bg-white/80', 'text-on-surface-variant', 'border', 'border-outline-variant');
        btn.classList.add('bg-secondary', 'text-white');
        callback(filter);
      });
    });
  }

  // Inicializar fecha por defecto (hoy)
  setDefaultDate(): void {
    if (this.dateInput) {
      const today = new Date().toISOString().split('T')[0];
      this.dateInput.value = today;
    }
  }
}