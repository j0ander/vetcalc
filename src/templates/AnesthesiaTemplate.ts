export const AnesthesiaTemplate = `
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
    <span class="font-headline-md text-headline-md font-bold text-primary">Protocolo de Anestesia</span>
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

<main class="relative z-10 max-w-xl mx-auto px-container-padding py-6 space-y-6 pb-24">

  <!-- ===== DETALLES DEL PACIENTE ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-outline-variant animate-fade-in-up">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface">Detalles del Paciente</h2>
        <p class="text-on-surface-variant font-body-md" id="patient-details">Canino • Golden Retriever • 28.5 kg</p>
      </div>
      <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">pets</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
        <p class="text-label-sm font-label-sm text-outline">ESTADO ASA</p>
        <p class="text-headline-md font-headline-md text-primary" id="asa-status">Clase II</p>
      </div>
      <div class="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
        <p class="text-label-sm font-label-sm text-outline">PESO</p>
        <p class="text-headline-md font-headline-md text-primary" id="weight-display">28.5 kg</p>
      </div>
    </div>
  </section>

  <!-- ===== PREMEDICACIÓN ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 50ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Premedicación</h3>
    </div>
    <div class="grid gap-3" id="premed-list">
      <!-- Los fármacos se generarán dinámicamente desde el controlador -->
    </div>
  </div>

  <!-- ===== INDUCCIÓN ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 100ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Inducción</h3>
    </div>
    <div class="grid gap-3" id="induction-list"></div>
  </div>

  <!-- ===== MANTENIMIENTO ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 150ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Mantenimiento</h3>
    </div>
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-outline-variant shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-label-md text-label-md text-on-surface font-bold">Isoflurano</p>
          <p class="text-body-md text-on-surface-variant">Anestésico inhalatorio</p>
        </div>
        <div class="px-4 py-2 bg-secondary-container/30 rounded-lg border border-secondary/20">
          <p class="font-headline-md text-headline-md text-on-secondary-container">1.5 - 2.5%</p>
        </div>
      </div>
      <div class="pt-4 border-t border-outline-variant/30">
        <div class="flex justify-between items-center mb-3">
          <p class="font-label-md text-label-md text-on-surface">Flujo de Oxígeno</p>
          <span class="text-label-sm text-outline">Sistema con rebreathing</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-surface rounded-lg border border-outline-variant/30">
            <p class="text-label-sm text-outline">INDUCCIÓN</p>
            <p class="font-body-lg text-primary font-bold">2.8 L/min</p>
          </div>
          <div class="p-3 bg-surface rounded-lg border border-outline-variant/30">
            <p class="text-label-sm text-outline">MANTENIMIENTO</p>
            <p class="font-body-lg text-primary font-bold">0.8 L/min</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== RESUMEN DEL PROTOCOLO CON PANEL EXPANDIBLE ===== -->
  <section class="space-y-4 pt-4 animate-fade-in-up" style="animation-delay: 200ms;">
    <div class="flex justify-between items-end">
      <h3 class="font-headline-xl text-headline-xl text-on-surface">Resumen del Protocolo</h3>
      <button class="flex items-center gap-1 text-primary font-label-md hover:scale-105 transition-all" id="print-pdf-btn">
        <span class="material-symbols-outlined text-[18px]">print</span>
        IMPRIMIR PDF
      </button>
    </div>
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-primary text-white">
          <tr>
            <th class="p-4 font-label-md text-label-md">FÁRMACO</th>
            <th class="p-4 font-label-md text-label-md">DOSIS</th>
            <th class="p-4 font-label-md text-label-md text-right">VOLUMEN</th>
          </tr>
        </thead>
        <tbody id="summary-table-body" class="divide-y divide-outline-variant/30">
          <!-- Se llenará dinámicamente -->
        </tbody>
      </table>
      <div class="bg-primary-container/30 p-4 flex justify-between items-center text-on-primary-container border-t border-outline-variant/30">
        <span class="font-label-md text-label-md">FLUIDOS ESTIMADOS (1 hora)</span>
        <span class="font-headline-md text-headline-md text-primary font-bold" id="total-fluids">142.5 mL</span>
      </div>
    </div>

    <!-- Botón para expandir detalles del cálculo (cascada) -->
    <button class="w-full flex items-center justify-center gap-2 text-sm font-label-md bg-white/80 backdrop-blur-sm border border-outline-variant rounded-xl py-3 transition-all hover:bg-surface-container/50" id="expand-details-btn">
      <span class="material-symbols-outlined text-[18px]">expand_more</span>
      Ver detalles del protocolo
    </button>

    <!-- Panel expandible con detalles adicionales -->
    <div id="details-panel" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant p-5 hidden transition-all duration-300 space-y-3">
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p class="text-on-surface-variant opacity-70">Peso del paciente</p>
          <p class="font-bold text-on-surface" id="detail-weight">28.5 kg</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Estado ASA</p>
          <p class="font-bold text-on-surface" id="detail-asa">Clase II</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Fármacos seleccionados</p>
          <p class="font-bold text-on-surface" id="detail-drugs">3</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Fluidos totales (24h)</p>
          <p class="font-bold text-primary" id="detail-fluids">142.5 mL</p>
        </div>
      </div>
      <div class="pt-3 border-t border-outline-variant/30">
        <p class="text-on-surface-variant text-xs">* Cálculos basados en el peso del paciente y las dosis seleccionadas. Revisar clínicamente antes de administrar.</p>
      </div>
    </div>
  </section>

  <!-- ===== ÁREA DE ACCIÓN ===== -->
  <div class="pt-4 animate-fade-in-up" style="animation-delay: 250ms;">
    <button class="w-full bg-primary text-white h-touch-target-min rounded-xl font-headline-md shadow-lg hover:shadow-xl active:scale-95 transition-all" id="finalize-btn">
      Finalizar y Guardar Protocolo
    </button>
    <p class="text-center text-label-sm text-outline mt-3">Cálculos basados en 28.5 kg. Revisar clínicamente antes de administrar.</p>
  </div>

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

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="anesthesia">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">air</span>
    <span class="font-label-sm text-label-sm mt-0.5">Anestesia</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<!-- ===== SCRIPT PARA EL PANEL DE DETALLES ===== -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expand-details-btn');
    const detailsPanel = document.getElementById('details-panel');
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', function() {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles del protocolo';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del protocolo';
        }
      });
    }

    // Observar cambios en la tabla para actualizar detalles
    const observer = new MutationObserver(() => {
      const weight = document.getElementById('weight-display')?.textContent || '28.5 kg';
      const asa = document.getElementById('asa-status')?.textContent || 'Clase II';
      const fluids = document.getElementById('total-fluids')?.textContent || '142.5 mL';
      const drugRows = document.querySelectorAll('#summary-table-body tr').length || 0;

      const detailWeight = document.getElementById('detail-weight');
      const detailAsa = document.getElementById('detail-asa');
      const detailDrugs = document.getElementById('detail-drugs');
      const detailFluids = document.getElementById('detail-fluids');

      if (detailWeight) detailWeight.textContent = weight;
      if (detailAsa) detailAsa.textContent = asa;
      if (detailDrugs) detailDrugs.textContent = drugRows.toString();
      if (detailFluids) detailFluids.textContent = fluids;
    });

    // Observar la tabla resumen
    const tableBody = document.getElementById('summary-table-body');
    if (tableBody) {
      observer.observe(tableBody, { childList: true, subtree: true });
    }

    // Actualizar también cuando cambien los checkboxes
    document.addEventListener('change', function(e) {
      if (e.target && e.target.matches('input[type="checkbox"]')) {
        setTimeout(() => {
          const drugRows = document.querySelectorAll('#summary-table-body tr').length || 0;
          const detailDrugs = document.getElementById('detail-drugs');
          if (detailDrugs) detailDrugs.textContent = drugRows.toString();
        }, 100);
      }
    });
  });
</script>
`;