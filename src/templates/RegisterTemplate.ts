export const RegisterTemplate = `
<div class="min-h-screen flex items-center justify-center bg-surface px-container-padding">
  <div class="w-full max-w-md space-y-8">
    <div class="text-center">
      <span class="material-symbols-outlined text-6xl text-primary">pets</span>
      <h2 class="mt-6 font-headline-xl text-headline-xl text-on-surface">Crear cuenta</h2>
    </div>
    <div class="bg-surface-container-lowest rounded-xl p-6 shadow-md">
      <div class="space-y-4">
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Nombre</label>
          <input type="text" id="reg-name" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="Dr. Juan Pérez">
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Email</label>
          <input type="email" id="reg-email" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="veterinario@ejemplo.com">
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Contraseña</label>
          <input type="password" id="reg-password" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="••••••">
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Confirmar contraseña</label>
          <input type="password" id="reg-confirm" class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-surface focus:border-primary" placeholder="••••••">
        </div>
        <button id="register-btn" class="w-full bg-primary text-on-primary h-touch-target-min rounded-lg font-label-md">Registrarse</button>
      </div>
      <div class="mt-4 text-center">
        <button id="go-to-login" class="text-primary font-label-sm">¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    </div>
  </div>
</div>
`;