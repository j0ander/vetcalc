export const FluidotherapyTemplate = `
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Fluidoterapia</span>
    <!-- Redes sociales -->
    <a href="https://www.instagram.com/vetcalcapp/" target="_blank" rel="noopener noreferrer" 
       class="p-1.5 rounded-full hover:bg-surface-container-high transition-all hover:scale-110 hover:rotate-6 duration-200 ml-2">
      <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
      </svg>
    </a>
    <a href="https://www.facebook.com/people/VetCalc-App/pfbid0LmJ1sqYCcNVU9TdFeK5U1eztC47b4V9LhwqEmvo9v5mRf69inDfqqsxbgUGufkX1l/?rdid=JpWaH8m1VvU3q37c&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DAN4LzRnB%2F" target="_blank" rel="noopener noreferrer" 
       class="p-1.5 rounded-full hover:bg-surface-container-high transition-all hover:scale-110 hover:-rotate-6 duration-200">
      <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
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

<main class="relative z-10 max-w-md mx-auto px-container-padding pt-6 flex flex-col gap-6 pb-24">

  <!-- ===== HERO CARD ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant border-l-4 border-l-primary animate-fade-in-up">
    <h2 class="font-label-md text-label-md text-primary mb-1">PROTOCOLO DE CÁLCULO</h2>
    <p class="text-on-surface-variant text-sm">Calcula los requerimientos totales de fluidos para un período de 24 horas basado en déficit por deshidratación, mantenimiento y pérdidas.</p>
  </section>

  <!-- ===== FORMULARIO ===== -->
  <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 50ms;">

    <!-- Peso -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <div class="flex justify-between items-end mb-2">
        <label class="font-label-md text-label-md text-on-surface-variant">Peso del paciente</label>
        <span class="font-label-sm text-label-sm text-primary uppercase">Requerido</span>
      </div>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="weight" type="number" step="0.1" value="10" placeholder="0.0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">kg</span>
      </div>
    </div>

    <!-- Deshidratación -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <div class="flex justify-between items-center mb-4">
        <label class="font-label-md text-label-md text-on-surface-variant">Deshidratación %</label>
        <span class="font-headline-md text-headline-md text-primary" id="dehydration-value">5%</span>
      </div>
      <input class="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" id="dehydration" type="range" min="0" max="15" value="5">
      <div class="flex justify-between mt-2 text-[10px] text-outline uppercase font-bold tracking-wider">
        <span>0% (Normal)</span>
        <span>5% (Leve)</span>
        <span>10% (Mod)</span>
        <span>15% (Severo)</span>
      </div>
    </div>

    <!-- Tasa de mantenimiento -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Tasa de mantenimiento</label>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="maintenance" type="number" value="50">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/kg/día</span>
      </div>
      <div class="flex gap-2 mt-3">
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-all" data-maintenance="40">40 (Gato)</button>
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-all" data-maintenance="60">60 (Perro)</button>
      </div>
    </div>

    <!-- Pérdidas continuas -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Pérdidas continuas (est.)</label>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="losses" type="number" value="0" placeholder="0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/día</span>
      </div>
    </div>

    <!-- Factor de goteo -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Factor de goteo del equipo</label>
      <div class="grid grid-cols-3 gap-2">
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="10">10 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-primary bg-primary-container/20 text-primary font-label-md hover:bg-surface-container-highest transition-all" data-drip="15">15 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="60">60 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
      </div>
    </div>
  </div>

  <!-- ===== RESULTADOS CON EXPANSIÓN EN CASCADA ===== -->
  <section class="mt-4 animate-fade-in-up" style="animation-delay: 150ms;">
    <div class="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div class="relative z-10">
        <h3 class="font-label-md text-label-md bg-white/20 inline-block px-3 py-1 rounded-full mb-4 backdrop-blur-sm">REQUERIMIENTO TOTAL</h3>
        <div class="mb-4">
          <span class="font-headline-xl text-headline-xl block" id="total-volume">1,250.0</span>
          <span class="text-sm opacity-90">ml Volumen total (24h)</span>
        </div>
        <div class="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
          <div>
            <span class="font-headline-lg text-headline-lg block" id="hourly-rate">52.1</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">ml/hora</span>
          </div>
          <div>
            <span class="font-headline-lg text-headline-lg block" id="drip-rate">13</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">gotas/min</span>
          </div>
        </div>

        <!-- Botón para expandir detalles (cascada) -->
        <button class="mt-4 w-full flex items-center justify-center gap-2 text-sm font-label-md bg-white/10 hover:bg-white/20 rounded-lg py-2 transition-all backdrop-blur-sm" id="expand-details-btn">
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
          Ver detalles del cálculo
        </button>

        <!-- Panel expandible (cascada) -->
        <div id="details-panel" class="mt-3 pt-3 border-t border-white/20 hidden transition-all duration-300">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p class="opacity-70">Déficit</p>
              <p class="font-bold" id="deficit-detail">250.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Mantenimiento</p>
              <p class="font-bold" id="maintenance-detail">500.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Pérdidas</p>
              <p class="font-bold" id="losses-detail">0.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Factor de goteo</p>
              <p class="font-bold" id="drip-factor-detail">15 gotas/ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex gap-3 mt-4">
      <button class="flex-1 h-touch-target-min bg-white/80 backdrop-blur-sm text-primary font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm border border-outline-variant hover:shadow-md" id="save-btn">
        <span class="material-symbols-outlined">save</span> Guardar
      </button>
      <button class="flex-1 h-touch-target-min bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:shadow-md" id="report-btn">
        <span class="material-symbols-outlined">print</span> Reporte
      </button>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON 5 PESTAÑAS ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface/90 backdrop-blur-sm dark:bg-surface h-[68px] z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="home">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">home</span>
    <span class="font-label-sm text-label-sm mt-0.5">Inicio</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="patients">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">pets</span>
    <span class="font-label-sm text-label-sm mt-0.5">Pacientes</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">sync_alt</span>
    <span class="font-label-sm text-label-sm mt-0.5">Convertidor</span>
  </a>

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="fluidotherapy">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">water_drop</span>
    <span class="font-label-sm text-label-sm mt-0.5">Fluidoterapia</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<script>
  // Lógica para expandir/contraer el panel de detalles (cascada)
  document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expand-details-btn');
    const detailsPanel = document.getElementById('details-panel');
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', function() {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del cálculo';
        }
      });
    }
  });
</script>
`;