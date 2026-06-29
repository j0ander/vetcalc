import { HistoryTemplate } from '@/templates/HistoryTemplate';

export interface HistoryRecord {
  id: string;
  type: string;
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
  private detailModal: HTMLElement | null = null;
  private closeDetailBtn: HTMLElement | null = null;
  private deleteBtn: HTMLElement | null = null;

  // Callback para clic en un ítem
  private onItemClickCallback: ((id: string) => void) | null = null;

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
    this.detailModal = document.getElementById('history-detail-modal');
    this.closeDetailBtn = document.getElementById('close-history-detail-btn');
    this.deleteBtn = document.getElementById('delete-history-btn');
  }

  // ===== GETTERS =====
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

  // ===== REGISTRAR CALLBACK PARA CLIC EN ÍTEM =====
  onItemClick(callback: (id: string) => void): void {
    this.onItemClickCallback = callback;
  }

  // ===== MOSTRAR DETALLE EN MODAL (versión mejorada, sin JSON) =====
  showDetail(record: any): void {
    if (!this.detailModal) return;

    const typeLabel = this.getTypeLabel(record.type);
    const dateStr = new Date(record.createdAt).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Construir el contenido HTML según el tipo
    let detailsHtml = `
      <div class="border-b border-outline-variant/30 pb-2">
        <p class="font-label-sm text-label-sm text-on-surface-variant">Tipo</p>
        <p class="font-headline-md text-headline-md text-primary">${typeLabel}</p>
      </div>
      <div class="border-b border-outline-variant/30 pb-2">
        <p class="font-label-sm text-label-sm text-on-surface-variant">Paciente</p>
        <p class="font-body-md text-body-md text-on-surface">${record.patientName || 'N/A'}</p>
      </div>
      <div class="border-b border-outline-variant/30 pb-2">
        <p class="font-label-sm text-label-sm text-on-surface-variant">Peso</p>
        <p class="font-body-md text-body-md text-on-surface">${record.patientWeightKg ? `${record.patientWeightKg} kg` : 'N/A'}</p>
      </div>
      <div class="border-b border-outline-variant/30 pb-2">
        <p class="font-label-sm text-label-sm text-on-surface-variant">Fecha</p>
        <p class="font-body-md text-body-md text-on-surface">${dateStr}</p>
      </div>
      <div class="border-b border-outline-variant/30 pb-2">
        <p class="font-label-sm text-label-sm text-on-surface-variant">Resumen</p>
        <p class="font-body-md text-body-md text-on-surface">${record.summary || 'N/A'}</p>
      </div>
    `;

    const inputs = record.inputs || {};
    const result = record.result || {};

    // Detalles específicos por tipo
    switch (record.type) {
      case 'dosage':
        detailsHtml += `
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Dosis (mg/kg)</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.dosePerKg || 'N/A'}</p>
          </div>
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Concentración (mg/mL)</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.concentration || 'N/A'}</p>
          </div>
          <div>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Volumen calculado</p>
            <p class="font-headline-md text-headline-md text-primary">${result.volumeMl ? `${result.volumeMl.toFixed(2)} mL` : 'N/A'}</p>
          </div>
        `;
        break;

      case 'fluidotherapy':
        detailsHtml += `
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Deshidratación (%)</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.dehydrationPercent || 'N/A'}</p>
          </div>
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Mantenimiento (ml/kg/día)</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.maintenanceMlKgDay || 'N/A'}</p>
          </div>
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Factor de goteo</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.dripFactor || 'N/A'} gotas/ml</p>
          </div>
          <div>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Volumen total (24h)</p>
            <p class="font-headline-md text-headline-md text-primary">${result.totalMl ? `${result.totalMl.toFixed(1)} mL` : 'N/A'}</p>
          </div>
        `;
        break;

      case 'anesthesia':
        const drugs = inputs.drugs || [];
        const drugList = drugs.map((d: any) =>
          `${d.name} (${d.dosePerKg} mg/kg → ${(d.dosePerKg * (record.patientWeightKg || 0)).toFixed(2)} mg, ${((d.dosePerKg * (record.patientWeightKg || 0)) / d.concentration).toFixed(2)} mL)`
        ).join('<br>');

        detailsHtml += `
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">ASA Status</p>
            <p class="font-body-md text-body-md text-on-surface">${inputs.asaStatus || 'N/A'}</p>
          </div>
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Fármacos seleccionados</p>
            <p class="font-body-md text-body-md text-on-surface">${drugList || 'Ninguno'}</p>
          </div>
          <div>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Fluidos estimados</p>
            <p class="font-headline-md text-headline-md text-primary">${result.totalFluids ? `${result.totalFluids.toFixed(1)} mL` : 'N/A'}</p>
          </div>
        `;
        break;

      default:
        // Para otros tipos (conversión, etc.) mostrar datos genéricos
        detailsHtml += `
          <div class="border-b border-outline-variant/30 pb-2">
            <p class="font-label-sm text-label-sm text-on-surface-variant">Datos de entrada</p>
            <p class="font-body-md text-body-md text-on-surface">${JSON.stringify(inputs, null, 2)}</p>
          </div>
          <div>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Resultado</p>
            <p class="font-body-md text-body-md text-on-surface">${JSON.stringify(result, null, 2)}</p>
          </div>
        `;
        break;
    }

    // Insertar en el contenedor del modal
    const content = document.getElementById('detail-content');
    if (content) {
      content.innerHTML = detailsHtml;
    }

    // Guardar ID para eliminación
    this.detailModal.setAttribute('data-id', record.id.toString());
    this.detailModal.classList.remove('hidden');
  }

  hideDetail(): void {
    if (this.detailModal) {
      this.detailModal.classList.add('hidden');
    }
  }

  // ===== EVENTOS DEL MODAL =====
  onCloseDetail(callback: () => void): void {
    this.closeDetailBtn?.addEventListener('click', callback);
  }

  onDeleteDetail(callback: (id: number) => void): void {
    this.deleteBtn?.addEventListener('click', () => {
      const id = this.detailModal?.getAttribute('data-id');
      if (id) {
        callback(parseInt(id, 10));
      }
    });
  }

  // ===== RENDERIZAR LISTA DE HISTORIAL =====
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
      html += `<div class="flex items-center gap-2 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(todayRecords);
    }
    if (yesterdayRecords.length) {
      html += `<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(yesterdayRecords);
    }
    if (olderRecords.length) {
      html += `<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>`;
      html += this.renderRecordGroup(olderRecords);
    }

    this.historyContainer.innerHTML = html;

    // Asignar eventos de clic a cada tarjeta
    this.historyContainer.querySelectorAll('.history-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id && this.onItemClickCallback) {
          this.onItemClickCallback(id);
        }
      });
    });
  }

  private renderRecordGroup(records: HistoryRecord[]): string {
    return records.map(record => {
      const icon = this.getIconForType(record.type);
      const borderColor = this.getBorderColorForType(record.type);
      const bgClass = this.getBgClassForType(record.type);
      const textColorClass = this.getTextColorClassForType(record.type);
      const relativeTime = this.getRelativeTime(record.timestamp);
      const premiumBadge = record.isPremium ? `<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>` : '';

      return `
        <div class="history-card bg-white border border-outline-variant/30 border-l-4 ${borderColor} rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-id="${record.id}">
          <div class="h-12 w-12 rounded-lg ${bgClass} flex items-center justify-center ${textColorClass} flex-shrink-0">
            <span class="material-symbols-outlined">${icon}</span>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex justify-between items-start gap-2 flex-wrap">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface truncate">${this.escapeHtml(record.title)}</h3>
                ${premiumBadge}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap">${relativeTime}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px] truncate">Paciente: ${this.escapeHtml(record.patientName)} (${record.species}, ${record.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface max-w-full overflow-hidden whitespace-nowrap text-ellipsis">${this.escapeHtml(record.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant flex-shrink-0">chevron_right</span>
        </div>
      `;
    }).join('');
  }

  // ===== UTILIDADES =====
  private getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      dosage: 'Cálculo de Dosis',
      fluidotherapy: 'Fluidoterapia',
      anesthesia: 'Protocolo de Anestesia',
      converter: 'Conversión'
    };
    return labels[type] || type;
  }

  private getBorderColorForType(type: string): string {
    switch (type) {
      case 'dosage': return 'border-l-primary';
      case 'fluidotherapy': return 'border-l-secondary';
      case 'anesthesia': return 'border-l-tertiary';
      default: return 'border-l-outline';
    }
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

  setActiveFilter(filter: string): void {
    this.filterButtons?.forEach(btn => {
      const btnFilter = btn.getAttribute('data-filter');
      if (btnFilter === filter) {
        btn.classList.remove('bg-white/80', 'text-on-surface-variant', 'border', 'border-outline-variant');
        btn.classList.add('bg-secondary', 'text-white', 'shadow-sm');
      } else {
        btn.classList.remove('bg-secondary', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white/80', 'text-on-surface-variant', 'border', 'border-outline-variant');
      }
    });
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}