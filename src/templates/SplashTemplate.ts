export const SplashTemplate = `
<div class="flex flex-col items-center justify-center min-h-screen bg-neutral selection:bg-primary selection:text-white">
  
  <!-- Patrón de huellas de fondo -->
  <div class="fixed inset-0 vet-pattern pointer-events-none"></div>

  <main class="relative z-10 flex flex-col items-center justify-between h-full py-12 px-container-padding w-full max-w-lg animate-fade-in-up">

    <!-- Logo -->
    <div class="flex-1 flex flex-col items-center justify-center gap-stack-md">
      <div class="w-28 h-28 bg-secondary rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-soft mb-4 transition-transform hover:scale-105">
        <span class="material-symbols-outlined text-[64px] text-neutral" style="font-variation-settings: 'FILL' 1;">pets</span>
      </div>
      <div class="text-center">
        <h1 class="font-headline-xl text-headline-xl text-primary tracking-tight drop-shadow-sm">VetCalc</h1>
        <p class="font-label-md text-label-md text-secondary/90 mt-1 uppercase tracking-[0.2em] font-semibold">Medicina de Precisión</p>
      </div>
    </div>

    <!-- Spinner, mensajes y barra de progreso -->
    <div class="flex flex-col items-center gap-stack-lg w-full mt-auto">
      <div class="spinner-ring"></div>
      
      <div class="text-center space-y-stack-sm">
        <p class="font-label-sm text-label-sm text-on-surface/80 transition-opacity duration-300" id="splash-message">Cargando herramientas clínicas...</p>
        <p class="font-label-sm text-label-sm text-on-surface/60 font-normal">v2.4.0 • Diseñado para profesionales</p>
      </div>

      <div class="w-full max-w-xs h-1.5 bg-neutral-dark rounded-full overflow-hidden shadow-inner">
        <div class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full" id="progress-bar" style="width: 0%;"></div>
      </div>
    </div>

  </main>
</div>
`;