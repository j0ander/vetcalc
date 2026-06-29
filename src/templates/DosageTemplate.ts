export const DosageTemplate = `
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
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-3 sm:px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
    <button class="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 flex-shrink-0" data-route="home">
      <span class="material-symbols-outlined text-primary text-xl sm:text-2xl">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-[17px] sm:text-headline-md font-bold text-primary truncate">Calculadora de Dosis</h1>
    <!-- Redes sociales (ocultas en móvil muy pequeño) -->
    <div class="hidden sm:flex items-center gap-1 ml-1">
      <a href="https://www.instagram.com/vetcalcapp/" target="_blank" rel="noopener noreferrer" 
         class="p-1.5 rounded-full hover:bg-surface-container-high transition-all hover:scale-110 hover:rotate-6 duration-200">
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
  </div>
  <div class="flex items-center gap-1.5 sm:gap-4">
    <button class="p-1.5 sm:p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant text-xl sm:text-2xl">search</span>
    </button>
    <button class="p-1.5 sm:p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-primary text-xl sm:text-2xl">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant hover:bg-primary/10 hover:border-primary text-[10px] sm:text-label-sm" data-route="premium">
      <span class="material-symbols-outlined text-[14px] sm:text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="hidden xs:inline font-label-sm">PREMIUM</span>
    </button>
  </div>
</header>

<main class="relative z-10 px-3 sm:px-container-padding pt-4 sm:pt-6 max-w-md mx-auto pb-24">

  <!-- ===== INSTRUCCIONES ===== -->
  <div class="mb-3 sm:mb-4 animate-fade-in-up">
    <p class="font-body-md text-[14px] sm:text-body-md text-on-surface-variant bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-outline-variant shadow-sm">Ingrese los datos del paciente para calcular volúmenes precisos de medicamentos. Todos los resultados deben ser verificados por un clínico autorizado.</p>
  </div>

  <!-- ===== FORMULARIO ===== -->
  <div class="space-y-3 sm:space-y-4 animate-fade-in-up" style="animation-delay: 50ms;">
    <!-- Nombre del fármaco -->
    <div class="space-y-0.5 sm:space-y-1">
      <label class="font-label-md text-[12px] sm:text-label-md text-on-surface-variant" for="drug-name">Nombre del fármaco</label>
      <div class="relative">
        <input class="w-full h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-lg font-body-md text-[15px] sm:text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="drug-name" type="text" placeholder="Buscar fármaco...">
        <span class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl sm:text-2xl">search</span>
      </div>
    </div>

    <!-- Peso -->
    <div class="space-y-0.5 sm:space-y-1">
      <label class="font-label-md text-[12px] sm:text-label-md text-on-surface-variant" for="weight">Peso del paciente</label>
      <div class="flex items-center">
        <input class="w-full h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-[15px] sm:text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="weight" type="number" placeholder="0.0" step="any" value="28.5">
        <span class="h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-[12px] sm:text-label-md text-on-surface-variant flex-shrink-0">kg</span>
      </div>
    </div>

    <!-- Dosis -->
    <div class="space-y-0.5 sm:space-y-1">
      <label class="font-label-md text-[12px] sm:text-label-md text-on-surface-variant" for="dosage">Dosis</label>
      <div class="flex items-center">
        <input class="w-full h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-[15px] sm:text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="dosage" type="number" placeholder="0.0" step="any" value="5">
        <span class="h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-[12px] sm:text-label-md text-on-surface-variant flex-shrink-0">mg/kg</span>
      </div>
    </div>

    <!-- Concentración -->
    <div class="space-y-0.5 sm:space-y-1">
      <label class="font-label-md text-[12px] sm:text-label-md text-on-surface-variant" for="concentration">Concentración</label>
      <div class="flex items-center">
        <input class="w-full h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-[15px] sm:text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="concentration" type="number" placeholder="0.0" step="any" value="50">
        <span class="h-11 sm:h-touch-target-min px-3 sm:px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-[12px] sm:text-label-md text-on-surface-variant flex-shrink-0">mg/mL</span>
      </div>
    </div>
  </div>

  <!-- ===== BOTÓN CALCULAR ===== -->
  <div class="mt-3 sm:mt-4 animate-fade-in-up" style="animation-delay: 100ms;">
    <button class="w-full h-12 sm:h-touch-target-min bg-primary text-white rounded-xl font-headline-md text-[16px] sm:text-headline-md font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg hover:shadow-xl px-4" id="calculate-btn">
      <span class="material-symbols-outlined text-xl sm:text-2xl">calculate</span>
      Calcular
    </button>
  </div>

  <!-- ===== RESULTADOS ===== -->
  <div class="mt-4 sm:mt-6 calculation-card animate-fade-in-up" style="animation-delay: 150ms;">
    <div id="result-container" class="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-outline-variant shadow-md p-4 sm:p-5 hidden transition-all duration-300">
      <div class="flex justify-between items-center mb-2 sm:mb-3">
        <span class="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider">Resultado</span>
        <span class="material-symbols-outlined text-xl sm:text-2xl text-secondary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      </div>
      <div class="space-y-0.5 sm:space-y-1">
        <p class="font-label-md text-[12px] sm:text-label-md text-on-surface-variant">Volumen requerido</p>
        <p class="font-headline-xl text-[24px] sm:text-headline-xl text-primary font-bold" id="result-volume">0.0 mL</p>
      </div>
      <div class="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm gap-1 sm:gap-0">
        <span id="result-dosage">Dosis: 0 mg total</span>
        <button class="flex items-center gap-1 text-primary hover:scale-105 transition-all" id="log-btn">
          <span class="material-symbols-outlined text-[16px] sm:text-[18px]">share</span>
          Guardar
        </button>
      </div>

      <!-- Botón expandir detalles -->
      <button class="mt-2 sm:mt-3 w-full flex items-center justify-center gap-1 sm:gap-2 text-sm font-label-md bg-surface-container-high/50 hover:bg-surface-container-high rounded-lg py-1.5 sm:py-2 transition-all" id="expand-details-btn">
        <span class="material-symbols-outlined text-[16px] sm:text-[18px]">expand_more</span>
        Ver detalles del cálculo
      </button>

      <!-- Panel expandible -->
      <div id="details-panel" class="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-outline-variant/30 hidden transition-all duration-300">
        <div class="grid grid-cols-2 gap-1.5 sm:gap-2 text-sm text-on-surface-variant">
          <div>
            <p class="opacity-70 text-[11px] sm:text-sm">Peso</p>
            <p class="font-bold text-on-surface text-[13px] sm:text-base" id="detail-weight">0.0 kg</p>
          </div>
          <div>
            <p class="opacity-70 text-[11px] sm:text-sm">Dosis por kg</p>
            <p class="font-bold text-on-surface text-[13px] sm:text-base" id="detail-dosage">0.0 mg/kg</p>
          </div>
          <div>
            <p class="opacity-70 text-[11px] sm:text-sm">Concentración</p>
            <p class="font-bold text-on-surface text-[13px] sm:text-base" id="detail-concentration">0.0 mg/mL</p>
          </div>
          <div>
            <p class="opacity-70 text-[11px] sm:text-sm">Volumen calculado</p>
            <p class="font-bold text-primary text-[13px] sm:text-base" id="detail-volume">0.0 mL</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== BANNER INFORMATIVO ===== -->
  <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-tertiary-fixed/30 backdrop-blur-sm rounded-xl sm:rounded-2xl flex gap-2 sm:gap-3 items-start border border-tertiary/20 animate-fade-in-up" style="animation-delay: 200ms;">
    <span class="material-symbols-outlined text-tertiary text-xl sm:text-2xl flex-shrink-0">info</span>
    <div>
      <p class="font-label-md text-[12px] sm:text-label-md text-on-tertiary-fixed font-bold">Precisión Clínica</p>
      <p class="font-label-sm text-[11px] sm:text-label-sm text-on-tertiary-fixed-variant">Esta calculadora redondea a 2 decimales. Siempre compare con el formulario de fármacos para variaciones específicas de especie.</p>
    </div>
  </div>
</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface/90 backdrop-blur-sm dark:bg-surface h-[60px] sm:h-[68px] z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-2 sm:px-3 active:scale-95 group" href="#" data-route="home">
    <span class="material-symbols-outlined text-[22px] sm:text-[24px] transition-transform duration-300 group-hover:scale-110">home</span>
    <span class="font-label-sm text-[10px] sm:text-label-sm mt-0.5">Inicio</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-2 sm:px-3 active:scale-95 group" href="#" data-route="patients">
    <span class="material-symbols-outlined text-[22px] sm:text-[24px] transition-transform duration-300 group-hover:scale-110">pets</span>
    <span class="font-label-sm text-[10px] sm:text-label-sm mt-0.5">Pacientes</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-2 sm:px-3 active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined text-[22px] sm:text-[24px] transition-transform duration-300 group-hover:scale-110">sync_alt</span>
    <span class="font-label-sm text-[10px] sm:text-label-sm mt-0.5">Convertidor</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-2 sm:px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined text-[22px] sm:text-[24px] transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-[10px] sm:text-label-sm mt-0.5">Citas</span>
  </a>

  <a class="relative flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="dosage">
    <span class="material-symbols-outlined text-[22px] sm:text-[24px] transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">medication</span>
    <span class="font-label-sm text-[10px] sm:text-label-sm mt-0.5">Dosis</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<!-- ===== SCRIPT PARA EL PANEL DE DETALLES (se mantiene igual) ===== -->
<script>
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

    const resultContainer = document.getElementById('result-container');
    const observer = new MutationObserver(() => {
      if (!resultContainer.classList.contains('hidden')) {
        const weight = document.getElementById('weight').value || '0.0';
        const dosage = document.getElementById('dosage').value || '0.0';
        const concentration = document.getElementById('concentration').value || '0.0';
        const volume = document.getElementById('result-volume').textContent || '0.0 mL';
        document.getElementById('detail-weight').textContent = parseFloat(weight).toFixed(1) + ' kg';
        document.getElementById('detail-dosage').textContent = parseFloat(dosage).toFixed(2) + ' mg/kg';
        document.getElementById('detail-concentration').textContent = parseFloat(concentration).toFixed(1) + ' mg/mL';
        document.getElementById('detail-volume').textContent = volume;
      }
    });
    observer.observe(resultContainer, { attributes: true, attributeFilter: ['class'] });
  });
</script>
`;