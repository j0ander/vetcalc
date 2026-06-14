import { HistoryTemplate } from '@/templates/HistoryTemplate';

export interface HistoryRecord {
  id: string;
  type: string; // 'dosage', 'fluidotherapy', 'anesthesia', etc.
  title: string;
  patientName: string;
  species: string;
  weightKg: number;
  timestamp: Date;
  summary: string;
  detail: string;
  isPremium?: boolean;
}

export class HistoryView {
  private historyContainer: HTMLElement | null = null;
  private filterButtons: NodeListOf<Element> | null = null;
  private loadMoreBtn: HTMLElement | null = null;
  private searchFab: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = HistoryTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.historyContainer = document.getElementById('history-list');
    this.filterButtons = document.querySelectorAll('#filter-buttons button');
    this.loadMoreBtn = document.getElementById('load-more-btn');
    this.searchFab = document.getElementById('search-fab');
  }

  getHistoryContainer(): HTMLElement | null {
    return this.historyContainer;
  }

  getFilterButtons(): NodeListOf<Element> | null {
    return this.filterButtons;
  }

  getLoadMoreButton(): HTMLElement | null {
    return this.loadMoreBtn;
  }

  getSearchFab(): HTMLElement | null {
    return this.searchFab;
  }

  renderHistoryList(records: HistoryRecord[], currentFilter: string): void {
    if (!this.historyContainer) return;
    if (records.length === 0) {
      this.historyContainer.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;
      return;
    }

    // Agrupar por fecha (hoy, ayer, antes)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayRecords = records.filter(r => new Date(r.timestamp) >= today);
    const yesterdayRecords = records.filter(r => {
      const d = new Date(r.timestamp);
      return d < today && d >= yesterday;
    });
    const olderRecords = records.filter(r => new Date(r.timestamp) < yesterday);

    let html = '';

    if (todayRecords.length) {
      html += `<div class="flex items-center gap-2 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(todayRecords);
    }
    if (yesterdayRecords.length) {
      html += `<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(yesterdayRecords);
    }
    if (olderRecords.length) {
      html += `<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(olderRecords);
    }

    this.historyContainer.innerHTML = html;

    // Añadir event listeners a cada tarjeta
    document.querySelectorAll('.history-card-hover').forEach(card => {
      card.addEventListener('click', (e) => {
        const recordId = card.getAttribute('data-id');
        console.log(`Ver detalle de registro: ${recordId}`);
        // Aquí se podría navegar a una vista de detalle (futuro)
      });
    });
  }

  private renderRecordGroup(records: HistoryRecord[]): string {
    return records.map(record => {
      const icon = this.getIconForType(record.type);
      const bgClass = this.getBgClassForType(record.type);
      const textColorClass = this.getTextColorClassForType(record.type);
      const relativeTime = this.getRelativeTime(record.timestamp);
      const premiumBadge = record.isPremium ? `<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>` : '';

      return `
        <div class="history-card-hover bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 cursor-pointer" data-id="${record.id}">
          <div class="h-12 w-12 rounded-lg ${bgClass} flex items-center justify-center ${textColorClass}">
            <span class="material-symbols-outlined">${icon}</span>
          </div>
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface">${this.escapeHtml(record.title)}</h3>
                ${premiumBadge}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm">${relativeTime}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px]">Paciente: ${this.escapeHtml(record.patientName)} (${record.species}, ${record.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface">${this.escapeHtml(record.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant">chevron_right</span>
        </div>
      `;
    }).join('');
  }

  private getIconForType(type: string): string {
    switch (type) {
      case 'dosage': return 'medication';
      case 'fluidotherapy': return 'water_drop';
      case 'anesthesia': return 'vital_signs';
      default: return 'history';
    }
  }

  private getBgClassForType(type: string): string {
    switch (type) {
      case 'dosage': return 'bg-secondary-container';
      case 'fluidotherapy': return 'bg-surface-container';
      case 'anesthesia': return 'bg-tertiary-container';
      default: return 'bg-surface-container';
    }
  }

  private getTextColorClassForType(type: string): string {
    switch (type) {
      case 'dosage': return 'text-on-secondary-container';
      case 'fluidotherapy': return 'text-primary';
      case 'anesthesia': return 'text-on-tertiary-container';
      default: return 'text-on-surface-variant';
    }
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Justo ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Actualizar estilo de filtro activo
  setActiveFilter(filter: string): void {
    this.filterButtons?.forEach(btn => {
      const btnFilter = btn.getAttribute('data-filter');
      if (btnFilter === filter) {
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      } else {
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.add('bg-surface-container-high', 'text-on-surface-variant');
      }
    });
  }
}