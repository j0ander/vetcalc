export const LoginTemplate = `
<!-- ===== FONDO CON TEXTURA E IMÁGENES DECORATIVAS (igual que Home) ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <!-- Patrón de puntos -->
  <div class="w-full h-full bg-neutral" style="
    background-image: radial-gradient(rgba(0,0,0,0.06) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
  "></div>
  <!-- Capa para dar profundidad -->
  <div class="absolute inset-0 bg-black/5"></div>
  <!-- Patrón de huellas (vet-pattern) -->
  <div class="absolute inset-0 vet-pattern opacity-30"></div>
  <!-- Imágenes decorativas -->
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== CONTENIDO DEL LOGIN ===== -->
<div class="relative z-10 min-h-screen flex items-center justify-center px-container-padding animate-fade-in-up">
  <div class="w-full max-w-md space-y-8">

    <!-- Logo y título -->
    <div class="text-center">
      <div class="inline-block p-4 bg-secondary/20 rounded-full shadow-lg mb-4">
        <span class="material-symbols-outlined text-6xl text-primary" style="font-variation-settings: 'FILL' 1;">pets</span>
      </div>
      <h2 class="font-headline-xl text-headline-xl text-on-surface drop-shadow-sm">VetCalc</h2>
      <p class="text-on-surface-variant font-body-md">Inicia sesión para continuar</p>
    </div>

    <!-- Tarjeta de login (con transparencia mínima y efecto vidrio) -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-xl p-6 space-y-6">
      <div class="space-y-4">
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Email</label>
          <input 
            type="email" 
            id="login-email" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="veterinario@ejemplo.com"
          />
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Contraseña</label>
          <input 
            type="password" 
            id="login-password" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="••••••"
          />
        </div>
        <button 
          id="login-btn" 
          class="w-full bg-primary text-white h-touch-target-min rounded-xl font-headline-md text-headline-md font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
        >
          Ingresar
        </button>
      </div>

      <!-- Enlace a registro -->
      <div class="text-center">
        <button 
          id="go-to-register" 
          class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105"
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </div>

  </div>
</div>
`;