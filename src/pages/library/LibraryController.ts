import { LibraryView } from './LibraryView';
import { router, type Destroyable } from '@/services/RouterService';
import type { AppRoute } from '@/types';

export class LibraryController implements Destroyable {
  private view: LibraryView;

  constructor() {
    this.view = new LibraryView();
  }

  async init(): Promise<void> {
    this.view.render();
    this.setupEventListeners();
    this.setupNavigation();
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
    // Clic en recursos
    this.view.onResourceClick((id) => {
      console.log(`[Library] Abrir recurso: ${id}`);
      // Aquí se podría abrir un modal o navegar a detalle
      alert(`Funcionalidad en desarrollo: ${id}`);
    });

    // Ver todos por sección
    this.view.onViewAll((section) => {
      console.log(`[Library] Ver todos: ${section}`);
      alert(`Mostrar todos los recursos de ${section} (simulación)`);
    });

    // Búsqueda
    this.view.onSearch((query) => {
      this.view.filterResources(query);
    });

    // Filtros (simulación)
    this.view.onFilterChange((filter) => {
      console.log(`[Library] Filtro: ${filter}`);
      // Aquí se podría implementar lógica real
      alert(`Filtro aplicado: ${filter}`);
    });

    // Botón upgrade
    const upgradeBtn = this.view.getUpgradeBtn();
    upgradeBtn?.addEventListener('click', () => {
      router.navigate('premium');
    });
  }

  destroy(): void {
    console.log('[LibraryController] Destroyed');
  }
}