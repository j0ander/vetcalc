export const HistoryTemplate = `
<header class="bg-surface dark:bg-surface w-full top-0 sticky z-50 shadow-sm flex justify-between items-center px-container-padding h-touch-target-min">
  <div class="flex items-center gap-3">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Historial</h1>
  </div>
  <div class="flex items-center">
    <button class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200">
      <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
  </div>
</header>

<main class="pb-24 pt-4 px-container-padding max-w-2xl mx-auto">
  <!-- Filtros -->
  <section class="mb-stack-lg flex gap-2 overflow-x-auto pb-2 scrollbar-hide" id="filter-buttons">
    <button class="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-sm" data-filter="all">Todos</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="dosage">Dosis</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="fluidotherapy">Fluidos</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="anesthesia">Anestesia</button>
  </section>

  <!-- Lista de historial -->
  <div class="space-y-stack-md" id="history-list"></div>

  <!-- Botón cargar más -->
  <div class="mt-10 text-center">
    <button class="text-primary font-label-md text-label-md border-b-2 border-primary-fixed-dim pb-1 hover:border-primary transition-colors" id="load-more-btn">
      Cargar registros antiguos
    </button>
  </div>
</main>

<!-- Barra inferior -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] z-50 shadow-[0px_-2px_8px_rgba(38,50,56,0.08)]">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-transform duration-150" data-route="history">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>

<!-- Botón flotante de búsqueda -->
<button class="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-primary-container text-on-primary-container shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40" id="search-fab">
  <span class="material-symbols-outlined">search</span>
</button>
`;