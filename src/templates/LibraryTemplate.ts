export const LibraryTemplate = `
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER (idéntico al Home) ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary animate-pulse-soft">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">VetCalc</h1>
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

<main class="relative z-10 max-w-4xl mx-auto px-container-padding pb-32 pt-6 space-y-6">

  <!-- ===== HERO ===== -->
  <section class="mb-4 animate-fade-in-up">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-6 text-on-surface shadow-sm border border-outline-variant backdrop-blur-sm">
      <div class="relative z-10">
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile mb-2 text-primary">Agenda de Citas</h2>
        <p class="font-body-md text-body-md opacity-90 max-w-md text-on-surface-variant">Registra y administra las citas de tus pacientes. Recibirás recordatorios automáticos.</p>
      </div>
      <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 pointer-events-none text-primary">calendar_month</span>
    </div>
  </section>

  <!-- ===== FORMULARIO PARA AGREGAR CITA ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-sm p-5 animate-fade-in-up" style="animation-delay: 50ms;">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
      <span class="material-symbols-outlined text-secondary">add_circle</span>
      Nueva Cita
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Mascota</label>
        <input type="text" id="appointment-pet" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Nombre de la mascota">
      </div>
      <div>
        <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Fecha</label>
        <input type="date" id="appointment-date" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all">
      </div>
      <div>
        <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Hora</label>
        <input type="time" id="appointment-time" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all">
      </div>
      <div>
        <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Descripción (opcional)</label>
        <input type="text" id="appointment-desc" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Ej: Vacunación, consulta...">
      </div>
    </div>
    <button id="add-appointment-btn" class="mt-4 w-full md:w-auto bg-primary text-white px-6 py-3 rounded-xl font-label-md shadow-sm hover:shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2">
      <span class="material-symbols-outlined">event</span>
      Agendar Cita
    </button>
  </section>

  <!-- ===== FILTROS ===== -->
  <div class="flex flex-wrap gap-2 animate-fade-in-up" style="animation-delay: 100ms;">
    <button class="filter-btn px-4 py-2 rounded-full bg-secondary text-white font-label-md text-label-md whitespace-nowrap shadow-sm hover:shadow-md transition-all" data-filter="all">Todas</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="today">Hoy</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="upcoming">Próximas</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="past">Pasadas</button>
  </div>

  <!-- ===== LISTA DE CITAS ===== -->
  <section class="space-y-3 animate-fade-in-up" style="animation-delay: 150ms;">
    <div class="flex justify-between items-center px-1">
      <h3 class="font-headline-md text-headline-md text-on-surface">Citas Agendadas</h3>
      <span class="text-on-surface-variant font-label-sm text-label-sm" id="appointment-count">0 citas</span>
    </div>
    <div id="appointments-list" class="space-y-3">
      <!-- Las citas se renderizan dinámicamente -->
    </div>
    <div id="empty-state" class="text-center py-12 text-on-surface-variant">
      <span class="material-symbols-outlined text-5xl text-outline block mb-2">calendar_today</span>
      <p>No hay citas agendadas</p>
      <p class="text-sm opacity-70">Agrega una cita usando el formulario de arriba</p>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR ===== -->
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

  <a class="relative flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>
</nav>
`;