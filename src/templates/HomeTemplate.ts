export const HomeTemplate = `
<!-- ===== FONDO CON ESTILO SPLASH (bg-neutral + vet-pattern) ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/gato5.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/gato2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/gato8.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-3 md:px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2 md:gap-3">
    <span class="material-symbols-outlined text-primary animate-pulse-soft text-2xl md:text-3xl">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary text-lg md:text-xl">VetCalc</h1>
    <!-- Redes sociales -->
    <a href="https://www.instagram.com/vetcalcapp/" target="_blank" rel="noopener noreferrer" 
       class="p-1.5 rounded-full hover:bg-surface-container-high transition-all hover:scale-110 hover:rotate-6 duration-200 ml-1">
      <svg class="w-4 h-4 md:w-5 md:h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
      </svg>
    </a>
    <a href="https://www.facebook.com/people/VetCalc-App/pfbid0LmJ1sqYCcNVU9TdFeK5U1eztC47b4V9LhwqEmvo9v5mRf69inDfqqsxbgUGufkX1l/?rdid=JpWaH8m1VvU3q37c&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DAN4LzRnB%2F" target="_blank" rel="noopener noreferrer" 
       class="p-1.5 rounded-full hover:bg-surface-container-high transition-all hover:scale-110 hover:-rotate-6 duration-200">
      <svg class="w-4 h-4 md:w-5 md:h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-2 md:gap-3">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant text-xl md:text-2xl">search</span>
    </button>
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-primary text-xl md:text-2xl">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant hover:bg-primary/10 hover:border-primary" data-route="premium">
      <span class="material-symbols-outlined text-[16px] md:text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm text-xs md:text-sm">PREMIUM</span>
    </button>
  </div>
</header>

<main class="relative z-10 px-3 md:px-container-padding pt-4 md:pt-6 space-y-4 md:space-y-stack-lg pb-20 md:pb-24">

  <!-- ===== BANNER ===== -->
  <section class="relative w-full rounded-2xl overflow-hidden shadow-elevated animate-fade-in-up group min-h-[160px] md:min-h-[200px] lg:min-h-[425px]"
         style="background-image: url('/icons/Animales/gato1.png'); background-size: cover; background-position: center-top;">
    <div class="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70 mix-blend-multiply"></div>
    <div class="absolute inset-0 flex flex-col justify-center px-4 md:px-6 text-white">
      <h2 id="greeting" class="font-headline-lg text-headline-lg md:text-headline-xl drop-shadow-md text-lg md:text-2xl">Bienvenido, Dr. Smith</h2>
      <p class="font-body-md text-body-md opacity-90 text-sm md:text-base">Panel clínico • Hoy tienes 4 pacientes agendados</p>
    </div>
  </section>

  <!-- ===== SALUDO Y ESTADÍSTICAS ===== -->
  <section class="flex justify-between items-center animate-fade-in-up" style="animation-delay: 100ms;">
    <div>
      <p class="font-label-md text-label-md text-on-surface-variant text-xs md:text-sm">Panel Clínico</p>
      <div class="w-10 md:w-12 h-1 bg-secondary rounded-full mt-1"></div>
    </div>
    <div class="flex gap-4 md:gap-6 text-on-surface-variant">
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-primary text-lg md:text-2xl">12</p>
        <p class="font-label-sm text-label-sm text-xs md:text-sm">Pacientes</p>
      </div>
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-secondary text-lg md:text-2xl">8</p>
        <p class="font-label-sm text-label-sm text-xs md:text-sm">Cálculos</p>
      </div>
    </div>
  </section>

  <!-- ===== CUADRÍCULA DE MÓDULOS CON RAYAS ANIMADAS ===== -->
  <div class="bento-grid">
    <!-- Fluidoterapia -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left border-l-4 border-l-primary group animate-fade-in-up hover:border-l-8" data-route="fluidotherapy" style="animation-delay: 50ms;">
      <div class="p-2 md:p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">water_drop</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Tasas IV y déficits</p>
      </div>
    </button>

    <!-- Calculadora de Dosis -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left border-l-4 border-l-primary group animate-fade-in-up hover:border-l-8" data-route="dosage" style="animation-delay: 100ms;">
      <div class="p-2 md:p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">medication</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Dosificación precisa mg/kg</p>
      </div>
    </button>

    <!-- Anestesia -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left relative border-2 border-tertiary/20 bg-gradient-to-br from-surface to-tertiary-container/10 group animate-fade-in-up border-l-4 border-l-tertiary hover:border-l-8" data-route="anesthesia" style="animation-delay: 150ms;">
      <div class="absolute top-2 right-2 md:top-4 md:right-4">
        <span class="material-symbols-outlined text-tertiary animate-pulse-soft text-sm md:text-base" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="p-2 md:p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed group-hover:bg-tertiary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">air</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Protocolos y CRI</p>
      </div>
    </button>

    <!-- Convertidor -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="converter" style="animation-delay: 200ms;">
      <div class="p-2 md:p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">sync_alt</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Peso, Temp, Vol</p>
      </div>
    </button>

    <!-- Biblioteca -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="library" style="animation-delay: 250ms;">
      <div class="p-2 md:p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">menu_book</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Guías de referencia</p>
      </div>
    </button>

    <!-- Pacientes -->
    <button class="glass-card p-3 md:p-5 rounded-xl shadow-sm flex flex-col items-start gap-2 md:gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="patients" style="animation-delay: 300ms;">
      <div class="p-2 md:p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-2xl md:text-3xl">pets</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold text-sm md:text-base">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 md:mt-1 text-xs md:text-sm">Casos activos</p>
      </div>
    </button>
  </div>

  <!-- ===== HISTORIAL RECIENTE ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-md p-3 md:p-4 space-y-3 md:space-y-4">
    <div>
      <div class="flex justify-between items-center">
        <h3 class="font-headline-md text-headline-md text-on-surface text-base md:text-xl">Historial Reciente</h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105 text-sm md:text-base" id="view-all-history">Ver todos</button>
      </div>
      <hr class="mt-2 border-t-2 border-secondary" />
    </div>
    <div class="space-y-2 md:space-y-3" id="recent-history-container"></div>
  </section>

  <!-- ===== PACIENTES RECIENTES ===== -->
  <section id="recent-patients-section" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-md p-3 md:p-4 space-y-3 md:space-y-4" style="display: none;">
    <div>
      <div class="flex justify-between items-center">
        <h3 class="font-headline-md text-headline-md text-on-surface text-base md:text-xl">Pacientes Recientes</h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105 text-sm md:text-base" id="view-all-patients">Ver todos</button>
      </div>
      <hr class="mt-2 border-t-2 border-secondary" />
    </div>
    <div class="space-y-2 md:space-y-3" id="recent-patients-container"></div>
  </section>

  <!-- ===== CONSEJO DEL DÍA ===== -->
  <section class="w-full rounded-2xl overflow-hidden relative group shadow-elevated animate-fade-in-up min-h-[150px] md:min-h-[180px]" style="animation-delay: 450ms; background-image: url('/icons/Animales/gato1.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    <div class="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 p-3 md:p-4 glass-card rounded-xl backdrop-blur-sm">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-sm md:text-base">lightbulb</span>
        <p class="font-label-md text-label-md text-primary font-bold text-xs md:text-sm">Consejo del día</p>
      </div>
      <p class="font-body-md text-body-md text-on-surface mt-1 text-xs md:text-sm" id="tip-of-the-day">Verifique el estado de hidratación antes de calcular los déficits de fluidos.</p>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON ANIMACIONES MEJORADAS ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface/90 backdrop-blur-sm dark:bg-surface h-[56px] md:h-[68px] z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
  
  <!-- Inicio (activo) -->
  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-1 md:pt-2 -translate-y-0.5 md:-translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md active:scale-95 group" href="#" data-route="home">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110 text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">home</span>
    <span class="font-label-sm text-label-sm mt-0.5 text-[10px] md:text-xs">Inicio</span>
    <!-- Punto indicador decorativo -->
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <!-- Pacientes -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-1 md:pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-0.5 hover:bg-primary/5 rounded-lg px-2 md:px-3 active:scale-95 group" href="#" data-route="patients">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110 text-[20px] md:text-[24px]">pets</span>
    <span class="font-label-sm text-label-sm mt-0.5 text-[10px] md:text-xs">Pacientes</span>
  </a>

  <!-- Convertidor -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-1 md:pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-0.5 hover:bg-primary/5 rounded-lg px-2 md:px-3 active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110 text-[20px] md:text-[24px]">sync_alt</span>
    <span class="font-label-sm text-label-sm mt-0.5 text-[10px] md:text-xs">Convertidor</span>
  </a>

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-1 md:pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-0.5 hover:bg-primary/5 rounded-lg px-2 md:px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110 text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5 text-[10px] md:text-xs">Citas</span>
  </a>

  <!-- Historial -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-1 md:pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-0.5 hover:bg-primary/5 rounded-lg px-2 md:px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110 text-[20px] md:text-[24px]">history</span>
    <span class="font-label-sm text-label-sm mt-0.5 text-[10px] md:text-xs">Historial</span>
  </a>

</nav>
`;