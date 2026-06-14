export const DosageTemplate = `
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50">
  <div class="flex items-center gap-3">
    <button class="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Calculadora de Dosis</h1>
  </div>
  <div class="flex items-center">
    <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-route="home">account_circle</span>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
  </div>
</header>

<main class="px-container-padding pt-stack-md max-w-md mx-auto">
  <!-- Onboarding/Instruction -->
  <div class="mb-stack-lg">
    <p class="font-body-md text-body-md text-on-surface-variant">Ingrese los datos del paciente para calcular volúmenes precisos de medicamentos. Todos los resultados deben ser verificados por un clínico autorizado.</p>
  </div>

  <!-- Form Section -->
  <div class="space-y-stack-md">
    <!-- Drug Name (Autocomplete) -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="drug-name">Nombre del fármaco</label>
      <div class="relative">
        <input class="w-full h-touch-target-min px-container-padding bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary" id="drug-name" type="text" placeholder="Buscar fármaco...">
        <span class="absolute right-3 top-3 material-symbols-outlined text-outline">search</span>
      </div>
    </div>
    <!-- Weight -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="weight">Peso del paciente</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-container-padding bg-surface-container-lowest border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary" id="weight" type="number" placeholder="0.0" step="any" value="28.5">
        <span class="h-touch-target-min px-4 bg-surface-container border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">kg</span>
      </div>
    </div>
    <!-- Dosage -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="dosage">Dosis</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-container-padding bg-surface-container-lowest border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary" id="dosage" type="number" placeholder="0.0" step="any" value="5">
        <span class="h-touch-target-min px-4 bg-surface-container border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">mg/kg</span>
      </div>
    </div>
    <!-- Concentration -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="concentration">Concentración</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-container-padding bg-surface-container-lowest border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary" id="concentration" type="number" placeholder="0.0" step="any" value="50">
        <span class="h-touch-target-min px-4 bg-surface-container border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">mg/mL</span>
      </div>
    </div>
  </div>

  <!-- Action Button -->
  <div class="mt-stack-lg">
    <button class="w-full h-touch-target-min bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md" id="calculate-btn">
      <span class="material-symbols-outlined">calculate</span>
      Calcular
    </button>
  </div>

  <!-- Result Card (Initially hidden) -->
  <div class="mt-stack-lg calculation-card opacity-0 translate-y-4" id="result-container">
    <div class="bg-surface-container-highest rounded-xl p-stack-md shadow-[0px_2px_8px_rgba(38,50,56,0.08)] border border-primary/10">
      <div class="flex justify-between items-center mb-2">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Resultado</span>
        <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      </div>
      <div class="space-y-1">
        <p class="font-label-md text-label-md text-on-surface-variant">Volumen requerido</p>
        <p class="font-headline-xl text-headline-xl text-primary font-bold" id="result-volume">0.0 mL</p>
      </div>
      <div class="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
        <span id="result-dosage">Dosis: 0 mg total</span>
        <button class="flex items-center gap-1 text-primary" id="log-btn">
          <span class="material-symbols-outlined text-[18px]">share</span>
          Guardar
        </button>
      </div>
    </div>
  </div>

  <!-- Informational Banner -->
  <div class="mt-stack-lg p-stack-md bg-tertiary-fixed rounded-lg flex gap-3 items-start border border-tertiary/20">
    <span class="material-symbols-outlined text-tertiary">info</span>
    <div>
      <p class="font-label-md text-label-md text-on-tertiary-fixed font-bold">Precisión Clínica</p>
      <p class="font-label-sm text-label-sm text-on-tertiary-fixed-variant">Esta calculadora redondea a 2 decimales. Siempre compare con el formulario de fármacos para variaciones específicas de especie.</p>
    </div>
  </div>
</main>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant pt-2" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2" data-route="patients">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant pt-2" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant pt-2" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;