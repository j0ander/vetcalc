import { HistoryView, HistoryRecord } from './HistoryView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import { db, type CalculationRecord } from '@/database/VetCalcDB';
import type { AppRoute } from '@/types';

export class HistoryController extends BaseController implements Destroyable {
  private view: HistoryView;
  private allRecords: CalculationRecord[] = [];
  private currentFilter: string = 'all';

  constructor() {
    super();
    this.view = new HistoryView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupGlobalNavigation();
    this.initPremiumBadge();

    try {
      await this.loadHistory();
    } catch (error) {
      console.error('[HistoryController] Error cargando historial:', error);
    }

    this.setupEventListeners();
    this.setupModalEvents();

    // Callback para clic en un ítem
    this.view.onItemClick((id) => {
      this.showDetail(id);
    });

    this.applyFilter();
  }

  private async loadHistory(): Promise<void> {
    this.allRecords = await db.calculationHistory.orderBy('createdAt').reverse().toArray();
  }

  private getTitleForType(type: string): string {
    const titles: Record<string, string> = {
      dosage: 'Cálculo de Dosis',
      fluidotherapy: 'Fluidoterapia',
      anesthesia: 'Protocolo de Anestesia',
      converter: 'Conversión'
    };
    return titles[type] || 'Cálculo';
  }

  private setupEventListeners(): void {
    // Filtros
    const filterBtns = this.view.getFilterButtons();
    filterBtns?.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        this.currentFilter = filter;
        this.view.setActiveFilter(filter);
        this.applyFilter();
      });
    });

    const loadMore = this.view.getLoadMoreButton();
    loadMore?.addEventListener('click', () => {
      console.log('Cargar más registros - por implementar');
    });

    const searchFab = this.view.getSearchFab();
    searchFab?.addEventListener('click', () => {
      console.log('Búsqueda - por implementar');
    });
  }

  // ===== CONFIGURAR MODAL =====
  private setupModalEvents(): void {
    // Cerrar con la X
    this.view.onCloseDetail(() => {
      this.view.hideDetail();
    });

    // Cerrar al hacer clic fuera del modal
    const modal = document.getElementById('history-detail-modal');
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.view.hideDetail();
      }
    });

    // Eliminar registro
    this.view.onDeleteDetail(async (id: number) => {
      if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        await db.calculationHistory.delete(id);
        await this.loadHistory();
        this.applyFilter();
        this.view.hideDetail();
      }
    });
  }

  // ===== MOSTRAR DETALLE EN MODAL =====
  private showDetail(id: string): void {
    const record = this.allRecords.find(r => r.id?.toString() === id);
    if (!record) {
      alert('Registro no encontrado');
      return;
    }
    // Llamar al método de la vista que muestra el modal
    this.view.showDetail(record);
  }

  private applyFilter(): void {
    let filtered = [...this.allRecords];
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(r => r.type === this.currentFilter);
    }

    const historyRecords: HistoryRecord[] = filtered.map(record => ({
      id: record.id!.toString(),
      type: record.type,
      title: this.getTitleForType(record.type),
      patientName: record.patientName || 'Desconocido',
      species: record.patientSpecies || 'N/A',
      weightKg: record.patientWeightKg || 0,
      timestamp: record.createdAt,
      summary: record.summary || 'Sin resumen',
      detail: JSON.stringify(record.result, null, 2),
      isPremium: record.type === 'anesthesia'
    }));

    this.view.renderHistoryList(historyRecords, this.currentFilter);
  }

  destroy(): void {
    this.destroyPremiumBadge();
    console.log('[HistoryController] Destroyed');
  }
}