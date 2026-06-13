export const SplashTemplate = `
<div class="flex flex-col items-center justify-center min-h-screen selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
  <div class="fixed inset-0 vet-pattern pointer-events-none"></div>
  
  <main class="relative z-10 flex flex-col items-center justify-between h-full py-16 px-container-padding w-full max-w-lg">
    <div class="flex-1 flex flex-col items-center justify-center gap-stack-md">
      <div class="w-24 h-24 bg-on-primary rounded-xl flex items-center justify-center shadow-lg animate-brand-pulse mb-4">
        <span class="material-symbols-outlined text-[56px] text-primary" style="font-variation-settings: 'FILL' 1;">pets</span>
      </div>
      <div class="text-center">
        <h1 class="font-headline-xl text-headline-xl text-on-primary tracking-tight">VetCalc</h1>
        <p class="font-label-md text-label-md text-on-primary/80 mt-1 uppercase tracking-[0.15em]">Medicina de Precisión</p>
      </div>
    </div>
    
    <div class="flex flex-col items-center gap-stack-lg w-full mt-auto">
      <div class="spinner-ring"></div>
      <div class="text-center space-y-stack-sm opacity-60">
        <p class="font-label-sm text-label-sm text-on-primary" id="splash-message">Calibrando herramientas clínicas...</p>
        <p class="font-label-sm text-label-sm text-on-primary font-normal">v2.4.0 • Diseñado para profesionales</p>
      </div>
    </div>
  </main>
  
  <div class="fixed top-0 left-0 w-full h-1 bg-on-primary/10">
    <div class="h-full bg-on-primary transition-all duration-500 ease-out" id="progress-bar" style="width: 0%"></div>
  </div>
</div>
`;