export const HomeTemplate = `
<!-- ===== DECORACIÓN DE FONDO CON IMÁGENES REALES ===== -->
<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">

  <!-- Imagen mediana - esquina superior izquierda -->
  <img 
    src="/icons/Animales/a15.png" 
    alt="" 
    class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none"
  />

  <!-- Imagen mediana - esquina inferior derecha -->
  <img 
    src="/icons/Animales/a2.png" 
    alt="" 
    class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none"
  />

  <!-- Imagen grande - centrada (detrás del contenido) -->
  <img 
    src="/icons/Animales/a3.png" 
    alt="" 
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none"
  />

</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary animate-pulse-soft">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">VetCalc</h1>
  </div>
  <div class="flex items-center gap-4">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant">search</span>
    </button>
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-primary">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant hover:bg-primary/10 hover:border-primary" data-route="premium">
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm">PREMIUM</span>
    </button>
  </div>
</header>

<main class="relative z-10 px-container-padding pt-6 space-y-stack-lg pb-24">

  <!-- ===== BANNER CON IMAGEN DE FONDO ===== -->
  <section class="relative w-full rounded-2xl overflow-hidden shadow-elevated animate-fade-in-up group min-h-[160px] md:min-h-[200px]"
           style="background-image: url('/icons/Animales/a3.png'); background-size: cover; background-position: center;">
    <!-- Superposición con gradiente -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70 mix-blend-multiply"></div>
    <!-- Contenido -->
    <div class="absolute inset-0 flex flex-col justify-center px-6 text-white">
      <h2 class="font-headline-lg text-headline-lg md:text-headline-xl drop-shadow-md">Bienvenido, Dr. Smith</h2>
      <p class="font-body-md text-body-md opacity-90">Panel clínico • Hoy tienes 4 pacientes agendados</p>
    </div>
  </section>

  <!-- ===== SALUDO Y ESTADÍSTICAS ===== -->
  <section class="flex justify-between items-center animate-fade-in-up" style="animation-delay: 100ms;">
    <div>
      <p class="font-label-md text-label-md text-on-surface-variant">Panel Clínico</p>
      <div class="w-12 h-1 bg-secondary rounded-full mt-1"></div>
    </div>
    <div class="flex gap-6 text-on-surface-variant">
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-primary">12</p>
        <p class="font-label-sm text-label-sm">Pacientes</p>
      </div>
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-secondary">8</p>
        <p class="font-label-sm text-label-sm">Cálculos</p>
      </div>
    </div>
  </section>

  <!-- ===== CUADRÍCULA DE MÓDULOS (animación escalonada) ===== -->
  <div class="bento-grid">
    <!-- Fluidoterapia -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left border-l-4 border-l-primary group animate-fade-in-up" data-route="fluidotherapy" style="animation-delay: 50ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">water_drop</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Tasas IV y déficits</p>
      </div>
    </button>

    <!-- Calculadora de Dosis -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left group animate-fade-in-up" data-route="dosage" style="animation-delay: 100ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">medication</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Dosificación precisa mg/kg</p>
      </div>
    </button>

    <!-- Anestesia (Premium) -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left relative border-2 border-tertiary/20 bg-gradient-to-br from-surface to-tertiary-container/10 group animate-fade-in-up" data-route="anesthesia" style="animation-delay: 150ms;">
      <div class="absolute top-4 right-4">
        <span class="material-symbols-outlined text-tertiary animate-pulse-soft" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed group-hover:bg-tertiary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">air</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Protocolos y CRI</p>
      </div>
    </button>

    <!-- Convertidor -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left group animate-fade-in-up" data-route="converter" style="animation-delay: 200ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">sync_alt</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Peso, Temp, Vol</p>
      </div>
    </button>

    <!-- Biblioteca -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left group animate-fade-in-up" data-route="library" style="animation-delay: 250ms;">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">menu_book</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Guías de referencia</p>
      </div>
    </button>

    <!-- Pacientes -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 text-left group animate-fade-in-up" data-route="patients" style="animation-delay: 300ms;">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">pets</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Casos activos</p>
      </div>
    </button>
  </div>

  <!-- ===== HISTORIAL RECIENTE ===== -->
  <section class="space-y-stack-md animate-fade-in-up" style="animation-delay: 350ms;">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Historial Reciente</h3>
      <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105" id="view-all-history">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-history-container"></div>
  </section>

  <!-- ===== PACIENTES RECIENTES ===== -->
  <section id="recent-patients-section" class="space-y-stack-md animate-fade-in-up" style="animation-delay: 400ms; display: none;">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Pacientes Recientes</h3>
      <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105" id="view-all-patients">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-patients-container"></div>
  </section>

  <!-- ===== CONSEJO DEL DÍA CON IMAGEN DE FONDO ===== -->
  <section class="w-full rounded-2xl overflow-hidden relative group shadow-elevated animate-fade-in-up min-h-[180px]" style="animation-delay: 450ms; background-image: url('/icons/Animales/a14.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    <div class="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl backdrop-blur-sm">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">lightbulb</span>
        <p class="font-label-md text-label-md text-primary font-bold">Consejo del día</p>
      </div>
      <p class="font-body-md text-body-md text-on-surface mt-1" id="tip-of-the-day">Verifique el estado de hidratación antes de calcular los déficits de fluidos.</p>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR ===== -->
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