// src/pages/library/LibraryController.ts
import { LibraryView } from './LibraryView';
import { router, type Destroyable } from '@/services/RouterService';
import { BaseController } from '@/controllers/BaseController';
import type { AppRoute } from '@/types';

export class LibraryController extends BaseController implements Destroyable {
  private view: LibraryView;

  constructor() {
    super(); // Llama al constructor de BaseController
    this.view = new LibraryView();
  }

  async init(): Promise<void> {
    this.view.render();

    // Navegación global para todos los elementos con data-route
    this.setupGlobalNavigation();

    // Badge premium (color según suscripción)
    this.initPremiumBadge();

    // Configurar eventos específicos de la biblioteca
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Clic en recursos
    this.view.onResourceClick((id) => {
      console.log(`[Library] Abrir recurso: ${id}`);
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
      alert(`Filtro aplicado: ${filter}`);
    });

    // Botón upgrade (aunque ya tiene data-route, mantenemos el listener por si acaso)
    const upgradeBtn = this.view.getUpgradeBtn();
    upgradeBtn?.addEventListener('click', () => {
      router.navigate('premium');
    });
  }

  destroy(): void {
    this.destroyPremiumBadge(); // Limpiar suscripción premium
    console.log('[LibraryController] Destroyed');
  }
}