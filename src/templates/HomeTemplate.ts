export const HomeTemplate = `
<!-- TopAppBar (igual que antes) -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">VetCalc</h1>
  </div>
  <div class="flex items-center gap-4">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
    </button>
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-primary">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm">PREMIUM</span>
    </button>
  </div>
</header>

<main class="px-container-padding pt-4 pb-24 space-y-6">
  <!-- Bienvenida -->
  <section class="space-y-1">
    <div class="flex items-center justify-between">
      <div>
        <p class="font-label-md text-label-md text-on-surface-variant">Bienvenido de nuevo</p>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface" id="greeting">Hola, Dr. Smith</h2>
      </div>
      <span class="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-3 py-1 rounded-full font-bold">⭐ Mejor App del 2024</span>
    </div>
    <div class="w-12 h-1 bg-secondary rounded-full mt-2"></div>
  </section>

  <!-- Módulos -->
  <div class="grid grid-cols-2 gap-4">
    <!-- Fluidoterapia (amarillo) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-primary/20" data-route="fluidotherapy">
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/dog1/200/100" alt="Fluidoterapia" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-primary">Fluidoterapia</h3><p class="font-label-sm text-label-sm text-on-surface-variant">IV rates & deficits</p></div>
    </div>
    <!-- Dosis (azul) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-secondary/20" data-route="dosage">
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/cat1/200/100" alt="Dosis" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-secondary">Calculadora de Dosis</h3><p class="font-label-sm text-label-sm text-on-surface-variant">Mg/kg accurate dosing</p></div>
    </div>
    <!-- Anestesia (naranja) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative bg-tertiary/20 border-2 border-tertiary/20" data-route="anesthesia">
      <div class="absolute top-2 right-2 z-10"><span class="material-symbols-outlined text-tertiary text-sm" style="font-variation-settings: 'FILL' 1;">crown</span></div>
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/dog2/200/100" alt="Anestesia" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-tertiary">Anestesia</h3><p class="font-label-sm text-label-sm text-on-surface-variant">Protocols & CRI</p></div>
    </div>
    <!-- Convertidor (amarillo) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-primary/10" data-route="converter">
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/rabbit/200/100" alt="Convertidor" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-primary">Convertidor</h3><p class="font-label-sm text-label-sm text-on-surface-variant">Weight, Temp, Vol</p></div>
    </div>
    <!-- Biblioteca (gris) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-surface-container-highest/50" data-route="library">
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/bird/200/100" alt="Biblioteca" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-on-surface">Biblioteca</h3><p class="font-label-sm text-label-sm text-on-surface-variant">Reference guides</p></div>
    </div>
    <!-- Pacientes (gris) -->
    <div class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-surface-container-highest/40" data-route="patients">
      <div class="h-24 overflow-hidden"><img src="https://picsum.photos/seed/puppy/200/100" alt="Pacientes" class="w-full h-full object-cover"></div>
      <div class="p-3"><h3 class="font-label-md text-label-md font-bold text-on-surface">Pacientes</h3><p class="font-label-sm text-label-sm text-on-surface-variant">Active case files</p></div>
    </div>
  </div>

  <!-- Recordatorios -->
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-headline-md text-headline-md">Programación Recordatorios</h3>
      <div class="flex gap-2">
        <button class="text-primary font-label-sm text-label-sm border-b-2 border-primary pb-0.5" id="reminder-calendar-btn">Calendario</button>
        <button class="text-on-surface-variant font-label-sm text-label-sm" id="reminder-expired-btn">Vencidos</button>
      </div>
    </div>
    <div class="space-y-3" id="reminders-container"></div>
  </section>

  <!-- Seguimiento Peso -->
  <section class="space-y-3">
    <h3 class="font-headline-md text-headline-md">Seguimiento Peso</h3>
    <div class="space-y-3" id="weight-container"></div>
  </section>
</main>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface dark:bg-surface h-[64px] z-50 shadow-[0px_-2px_8px_rgba(38,50,56,0.08)]">
  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-transform duration-150" href="#" data-route="home">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="converter">
    <span class="material-symbols-outlined">sync_alt</span>
    <span class="font-label-sm text-label-sm">Convertidor</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </a>
</nav>
`;