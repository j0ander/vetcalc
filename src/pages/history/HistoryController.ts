import { HistoryView, HistoryRecord } from './HistoryView';
import { router, type Destroyable } from '@/services/RouterService';
import { mockDataService } from '@/services/MockDataService';
import type { AppRoute } from '@/types';

export class HistoryController implements Destroyable {
  private view: HistoryView;
  private allRecords: HistoryRecord[] = [];
  private currentFilter: string = 'all';

  constructor() {
    this.view = new HistoryView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.loadMockData();
    this.setupEventListeners();
    this.applyFilter();
  }

  private loadMockData(): void {
    // Convertir los datos del MockDataService a HistoryRecord
    const mockHistory = mockDataService.getRecentHistory(10);
    this.allRecords = mockHistory.map(record => ({
      id: record.id,
      type: record.type,
      title: this.getTitleForType(record.type),
      patientName: record.patientName || 'Desconocido',
      species: record.patientSpecies || 'N/A',
      weightKg: record.patientWeightKg || 0,
      timestamp: record.createdAt,
      summary: record.summary,
      detail: JSON.stringify(record.result),
      isPremium: record.type === 'anesthesia'
    }));
  }

  private getTitleForType(type: string): string {
    switch (type) {
      case 'dosage': return 'Cálculo de Dosis';
      case 'fluidotherapy': return 'Fluidoterapia';
      case 'anesthesia': return 'Protocolo de Anestesia';
      default: return 'Cálculo';
    }
  }

  private setupEventListeners(): void {
    // Navegación general
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route') as AppRoute;
        if (route) {
          await router.navigate(route);
        }
      });
    });

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

    // Botón cargar más (simulación)
    const loadMore = this.view.getLoadMoreButton();
    loadMore?.addEventListener('click', () => {
      console.log('Cargar más registros - por implementar');
      // En el futuro se podría paginar
    });

    // Búsqueda (FAB)
    const searchFab = this.view.getSearchFab();
    searchFab?.addEventListener('click', () => {
      console.log('Búsqueda - por implementar');
    });
  }

  private applyFilter(): void {
    let filtered = [...this.allRecords];
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(r => r.type === this.currentFilter);
    }
    this.view.renderHistoryList(filtered, this.currentFilter);
  }

  destroy(): void {
    console.log('[HistoryController] Destroyed');
  }
}