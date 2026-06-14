export const ConverterTemplate = `
<!-- Top Navigation Header -->
<header class="w-full top-0 sticky bg-surface z-50 shadow-sm flex justify-between items-center px-container-padding h-touch-target-min">
  <div class="flex items-center gap-2">
    <button class="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Convertidor</span>
    
    </div>
  
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-on-surface-variant">history</span>
    <span class="material-symbols-outlined text-primary">account_circle</span>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
    </div>
</header>

<main class="max-w-md mx-auto px-container-padding pt-6 space-y-stack-lg">
  <!-- Segmented Tab Selector -->
  <div class="bg-surface-container rounded-xl p-1 flex justify-between items-center">
    <button class="flex-1 py-3 text-center rounded-lg transition-all font-label-md text-label-md bg-surface text-primary shadow-sm" data-mode="weight">
      Peso
    </button>
    <button class="flex-1 py-3 text-center rounded-lg transition-all font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high" data-mode="temp">
      Temperatura
    </button>
    <button class="flex-1 py-3 text-center rounded-lg transition-all font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high" data-mode="volume">
      Volumen
    </button>
  </div>

  <!-- Conversion Canvas -->
  <div class="space-y-stack-md">
    <div class="bg-surface-container-lowest rounded-xl p-container-padding custom-shadow border border-surface-variant/50">
      <div class="flex flex-col space-y-stack-lg">
        <!-- Input Section 1 -->
        <div class="space-y-stack-sm">
          <label class="font-label-sm text-label-sm text-on-surface-variant ml-1" id="label-left">Libras (lb)</label>
          <div class="relative flex items-center">
            <input class="w-full h-touch-target-min bg-surface-container-low border-2 border-transparent focus:border-primary focus:ring-0 rounded-lg px-4 font-headline-xl text-headline-xl text-primary transition-all" id="input-left" type="number" placeholder="0.0" step="any">
            <span class="absolute right-4 font-label-md text-label-md text-on-surface-variant pointer-events-none" id="unit-left">lb</span>
          </div>
        </div>
        <!-- Swap Icon -->
        <div class="flex justify-center -my-3 z-10">
          <button class="bg-primary text-on-primary p-2 rounded-full shadow-lg active:rotate-180 transition-transform duration-300" id="swap-btn">
            <span class="material-symbols-outlined">sync_alt</span>
          </button>
        </div>
        <!-- Input Section 2 -->
        <div class="space-y-stack-sm">
          <label class="font-label-sm text-label-sm text-on-surface-variant ml-1" id="label-right">Kilogramos (kg)</label>
          <div class="relative flex items-center">
            <input class="w-full h-touch-target-min bg-surface-container-low border-2 border-transparent focus:border-primary focus:ring-0 rounded-lg px-4 font-headline-xl text-headline-xl text-primary transition-all" id="input-right" type="number" placeholder="0.0" step="any">
            <span class="absolute right-4 font-label-md text-label-md text-on-surface-variant pointer-events-none" id="unit-right">kg</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick References -->
    <div class="grid grid-cols-1 gap-gutter">
      <div class="bg-surface-container-high/30 p-container-padding rounded-xl border-l-4 border-primary">
        <p class="font-label-md text-label-md text-primary mb-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">info</span>
          Referencia Clínica
        </p>
        <p class="font-body-md text-body-md text-on-surface-variant" id="reference-text">
          Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.
        </p>
      </div>
    </div>
  </div>

  <!-- Action Grid (Bento Style) -->
  <div class="grid grid-cols-2 gap-gutter">
    <div class="col-span-2 bg-secondary-container/20 p-4 rounded-xl border border-secondary/20 flex items-center justify-between">
      <div>
        <p class="font-label-sm text-label-sm text-secondary">Modo Avanzado</p>
        <p class="font-headline-md text-headline-md text-on-surface">Fluidoterapia</p>
      </div>
      <button class="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-label-md text-label-md active:scale-95 transition-transform" data-route="fluidotherapy">
        Calcular
      </button>
    </div>
    <div class="bg-surface p-4 rounded-xl custom-shadow border border-surface-variant/50 flex flex-col justify-between h-32 cursor-pointer" data-route="dosage">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">medical_services</span>
      <p class="font-label-md text-label-md font-bold">Dosis</p>
    </div>
    <div class="bg-surface p-4 rounded-xl custom-shadow border border-surface-variant/50 flex flex-col justify-between h-32 cursor-pointer" data-route="history">
      <span class="material-symbols-outlined text-tertiary">star</span>
      <p class="font-label-md text-label-md font-bold">Guardados</p>
    </div>
  </div>
</main>

<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] h-[64px] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 flex-1" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 flex-1" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 flex-1" data-route="converter">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">calculate</span>
    <span class="font-label-sm text-label-sm">Convertir</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 flex-1" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
</nav>
`;