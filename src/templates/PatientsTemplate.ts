export const PatientsTemplate = `
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min w-full z-50">
  <div class="flex items-center gap-4">
    <span class="material-symbols-outlined text-primary">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Pacientes</h1>
  </div>
  <div class="flex items-center">
    <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors duration-200" data-route="home">account_circle</button>
  </div>
</header>

<main class="px-container-padding pt-stack-md space-y-stack-lg">
  <!-- Barra de búsqueda -->
  <section class="w-full">
    <div class="relative flex items-center">
      <span class="material-symbols-outlined absolute left-4 text-outline">search</span>
      <input class="w-full h-touch-target-min pl-12 pr-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl font-body-md text-on-surface focus:border-primary focus:ring-0 transition-all" type="text" id="search-input" placeholder="Buscar pacientes, raza o propietario...">
      <button class="absolute right-2 p-2 text-primary" id="filter-btn">
        <span class="material-symbols-outlined">tune</span>
      </button>
    </div>
  </section>

  <!-- Estadísticas -->
  <section class="grid grid-cols-2 gap-4">
    <div class="bg-surface-container-low p-4 rounded-xl border-b-2 border-primary/20">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Casos activos</p>
      <p class="font-headline-xl text-headline-xl text-primary" id="active-cases">0</p>
    </div>
    <div class="bg-surface-container-low p-4 rounded-xl border-b-2 border-secondary/20">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">En cirugía</p>
      <div class="flex items-center gap-2">
        <p class="font-headline-xl text-headline-xl text-secondary" id="in-surgery">0</p>
        <span class="flex h-2 w-2 rounded-full bg-error animate-pulse"></span>
      </div>
    </div>
  </section>

  <!-- Lista de pacientes -->
  <section class="space-y-stack-md">
    <div class="flex justify-between items-center px-1">
      <h2 class="font-headline-md text-headline-md">Pacientes recientes</h2>
      <button class="font-label-md text-label-md text-primary uppercase tracking-wider" id="see-all-btn">Ver todos</button>
    </div>
    <div class="space-y-4" id="patients-list">
      <!-- Los pacientes se cargarán dinámicamente desde el controlador -->
    </div>
  </section>
</main>

<!-- Botón flotante para añadir paciente -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-transform duration-150 z-40" id="add-patient-btn">
  <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">add</span>
</button>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-all duration-150" data-route="patients">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;