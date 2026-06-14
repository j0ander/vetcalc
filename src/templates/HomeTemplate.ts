export const HomeTemplate = `
<!-- Barra superior -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">VetCalc</h1>
  </div>
  <div class="flex items-center gap-4">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant">search</span>
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

<main class="px-container-padding pt-6 space-y-stack-lg">
  <!-- Sección de bienvenida -->
  <section class="space-y-1">
    <p class="font-label-md text-label-md text-on-surface-variant">Panel Clínico</p>
    <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Hola, Dr. Smith</h2>
    <div class="w-12 h-1 bg-secondary rounded-full mt-2"></div>
  </section>

  <!-- Cuadrícula de módulos -->
  <div class="bento-grid">
    <!-- Fluidoterapia -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left border-l-4 border-l-primary group" data-route="fluidotherapy">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">water_drop</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Tasas IV y déficits</p>
      </div>
    </button>

    <!-- Calculadora de Dosis -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="dosage">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">medication</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Dosificación precisa mg/kg</p>
      </div>
    </button>

    <!-- Anestesia (Premium) -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left relative border-2 border-tertiary/20 bg-gradient-to-br from-surface to-tertiary-container/10 group" data-route="anesthesia">
      <div class="absolute top-4 right-4">
        <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed">
        <span class="material-symbols-outlined text-3xl">air</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Protocolos y CRI</p>
      </div>
    </button>

    <!-- Convertidor -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="converter">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">sync_alt</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Peso, Temp, Vol</p>
      </div>
    </button>

    <!-- Biblioteca -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="library">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant">
        <span class="material-symbols-outlined text-3xl">menu_book</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Guías de referencia</p>
      </div>
    </button>

    <!-- Pacientes -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="patients">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant">
        <span class="material-symbols-outlined text-3xl">pets</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Casos activos</p>
      </div>
    </button>
  </div>

  <!-- Historial reciente -->
  <section class="space-y-stack-md pb-8">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Historial Reciente</h3>
      <button class="text-primary font-label-md text-label-md hover:underline" id="view-all-history">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-history-container"></div>
  </section>

  <!-- Sección de pacientes recientes (insertada dinámicamente) -->
  <section id="recent-patients-section" class="space-y-stack-md pb-8" style="display: none;">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Pacientes Recientes</h3>
      <button class="text-primary font-label-md text-label-md hover:underline" id="view-all-patients">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-patients-container"></div>
  </section>

  <!-- Imagen y consejo del día -->
  <section class="w-full h-48 rounded-2xl overflow-hidden relative group">
    <img alt="Veterinary Professional" class="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA69r3HcXl5I7vAA1BAILE3wxSpjR_JmOCfU9yaCMrKgcq0G4wmieTfJ4oMFkYXLoscW3PLjv7N7GpdylIqY1Kpdj19BPZjlS-xNjZHWge6GXBq8NFzKgOnsxboKYYE-BOTaK0Ygm4aTttgpoo8fBWxfWILd50Z58gyfcQzHNlMtHFn3DED_3kz6atbUO06Ts_evj-ohgqiJIyQRTkRtlesNIBVgGhfS9tBKt-XS8KNa6mdtb6Tf-TJAV2T9r4HD7rp9OAlGxJEwM1n"/>
    <div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
    <div class="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl">
      <p class="font-label-md text-label-md text-primary font-bold">Consejo del día</p>
      <p class="font-body-md text-body-md text-on-surface" id="tip-of-the-day">Verifique el estado de hidratación antes de calcular los déficits de fluidos.</p>
    </div>
  </section>
</main>

<!-- Barra de navegación inferior (5 pestañas) -->
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