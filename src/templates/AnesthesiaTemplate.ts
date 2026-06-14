export const AnesthesiaTemplate = `
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50">
  <div class="flex items-center gap-3">
    <button class="flex items-center justify-center w-touch-target-min h-touch-target-min hover:bg-surface-container-high transition-colors duration-200 rounded-full" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Protocolo de Anestesia</span>
  </div>
  <div class="flex items-center gap-2">
    <div class="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full border border-tertiary shadow-sm">
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm">PREMIUM</span>
    </div>
    <button class="w-touch-target-min h-touch-target-min flex items-center justify-center hover:bg-surface-container-high transition-colors duration-200 rounded-full text-on-surface-variant" data-route="home">
      <span class="material-symbols-outlined">account_circle</span>
    </button>
  </div>
</header>

<main class="max-w-xl mx-auto px-container-padding py-stack-md space-y-stack-lg">
  <!-- Patient Profile Summary -->
  <section class="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] border border-outline-variant">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface">Detalles del Paciente</h2>
        <p class="text-on-surface-variant font-body-md" id="patient-details">Canino • Golden Retriever • 28.5 kg</p>
      </div>
      <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">pets</span>
    </div>
    <div class="grid grid-cols-2 gap-gutter">
      <div class="p-3 bg-surface-container rounded-lg">
        <p class="text-label-sm font-label-sm text-outline">ESTADO ASA</p>
        <p class="text-headline-md font-headline-md text-primary" id="asa-status">Clase II</p>
      </div>
      <div class="p-3 bg-surface-container rounded-lg">
        <p class="text-label-sm font-label-sm text-outline">PESO</p>
        <p class="text-headline-md font-headline-md text-primary" id="weight-display">28.5 kg</p>
      </div>
    </div>
  </section>

  <!-- Pre-medication -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</span>
      <h3 class="font-headline-md text-headline-md">Premedicación</h3>
    </div>
    <div class="grid gap-stack-sm" id="premed-list">
      <!-- Los fármacos se generarán dinámicamente desde el controlador -->
    </div>
  </div>

  <!-- Induction -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">2</span>
      <h3 class="font-headline-md text-headline-md">Inducción</h3>
    </div>
    <div class="grid gap-stack-sm" id="induction-list"></div>
  </div>

  <!-- Maintenance -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">3</span>
      <h3 class="font-headline-md text-headline-md">Mantenimiento</h3>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-label-md text-label-md text-on-surface">Isoflurano</p>
          <p class="text-body-md text-on-surface-variant">Anestésico inhalatorio</p>
        </div>
        <div class="px-4 py-2 bg-secondary-container rounded-lg">
          <p class="font-headline-md text-headline-md text-on-secondary-container">1.5 - 2.5%</p>
        </div>
      </div>
      <div class="pt-4 border-t border-outline-variant">
        <div class="flex justify-between items-center mb-2">
          <p class="font-label-md text-label-md text-on-surface">Flujo de Oxígeno</p>
          <span class="text-label-sm text-outline">Sistema con rebreathing</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-surface rounded-lg border border-outline-variant">
            <p class="text-label-sm text-outline">INDUCCIÓN</p>
            <p class="font-body-lg text-primary">2.8 L/min</p>
          </div>
          <div class="p-3 bg-surface rounded-lg border border-outline-variant">
            <p class="text-label-sm text-outline">MANTENIMIENTO</p>
            <p class="font-body-lg text-primary">0.8 L/min</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Summary Table -->
  <section class="space-y-stack-md pt-stack-lg">
    <div class="flex justify-between items-end">
      <h3 class="font-headline-xl text-headline-xl text-on-surface">Resumen del Protocolo</h3>
      <button class="flex items-center gap-1 text-primary font-label-md" id="print-pdf-btn">
        <span class="material-symbols-outlined text-[18px]">print</span>
        IMPRIMIR PDF
      </button>
    </div>
    <div class="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg">
      <table class="w-full text-left border-collapse">
        <thead class="bg-primary text-on-primary">
          <tr>
            <th class="p-4 font-label-md text-label-md">FÁRMACO</th>
            <th class="p-4 font-label-md text-label-md">DOSIS</th>
            <th class="p-4 font-label-md text-label-md text-right">VOLUMEN</th>
          </tr>
        </thead>
        <tbody id="summary-table-body">
          <!-- Se llenará dinámicamente -->
        </tbody>
      </table>
      <div class="bg-primary-container p-4 flex justify-between items-center text-on-primary-container">
        <span class="font-label-md text-label-md">FLUIDOS ESTIMADOS (1 hora)</span>
        <span class="font-headline-md text-headline-md" id="total-fluids">142.5 mL</span>
      </div>
    </div>
  </section>

  <!-- Bottom Action Area -->
  <div class="pt-stack-lg pb-stack-lg">
    <button class="w-full bg-primary text-on-primary h-touch-target-min rounded-xl font-headline-md shadow-md hover:brightness-110 active:scale-95 transition-all" id="finalize-btn">
      Finalizar y Guardar Protocolo
    </button>
    <p class="text-center text-label-sm text-outline mt-4">Cálculos basados en 28.5 kg. Revisar clínicamente antes de administrar.</p>
  </div>
</main>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 hover:bg-surface-container-low transition-colors duration-150 px-4" data-route="patients">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;