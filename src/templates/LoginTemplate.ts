export const LoginTemplate = `
<div class="min-h-screen flex items-center justify-center bg-surface px-container-padding">
  <div class="w-full max-w-md space-y-8">
    <div class="text-center">
      <span class="material-symbols-outlined text-6xl text-primary">pets</span>
      <h2 class="mt-6 font-headline-xl text-headline-xl text-on-surface">VetCalc</h2>
      <p class="text-on-surface-variant">Inicia sesión para continuar</p>
    </div>
    <div class="bg-surface-container-lowest rounded-xl p-6 shadow-md">
      <div class="space-y-4">
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Email</label>
          <input type="email" id="login-email" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="veterinario@ejemplo.com">
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Contraseña</label>
          <input type="password" id="login-password" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="••••••">
        </div>
        <button id="login-btn" class="w-full bg-primary text-on-primary h-touch-target-min rounded-lg font-label-md">Ingresar</button>
      </div>
      <div class="mt-4 text-center">
        <button id="go-to-register" class="text-primary font-label-sm">¿No tienes cuenta? Regístrate</button>
      </div>
    </div>
  </div>
</div>
`;