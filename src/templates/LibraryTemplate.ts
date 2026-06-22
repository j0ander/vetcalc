export const LibraryTemplate = `
<!-- ===== FONDO CON ESTILO SPLASH (bg-neutral + vet-pattern) ===== -->
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

<main class="relative z-10 max-w-4xl mx-auto px-container-padding pb-32 pt-stack-md space-y-6">

  <!-- ===== HERO ===== -->
  <section class="mb-4 animate-fade-in-up">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-6 text-on-surface shadow-sm border border-outline-variant backdrop-blur-sm">
      <div class="relative z-10">
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile mb-2 text-primary">Recursos Clínicos</h2>
        <p class="font-body-md text-body-md opacity-90 max-w-md text-on-surface-variant">Accede a formularios de medicamentos veterinarios, protocolos de emergencia y guías clínicas basadas en evidencia.</p>
      </div>
      <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 pointer-events-none text-primary">menu_book</span>
    </div>
  </section>

  <!-- ===== BUSCADOR Y FILTROS ===== -->
  <div class="mb-4 flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 50ms;">
    <div class="relative flex items-center bg-white/80 backdrop-blur-sm rounded-xl border border-outline-variant shadow-sm focus-within:shadow-md focus-within:border-primary transition-all duration-200">
      <span class="material-symbols-outlined absolute left-4 text-outline">search</span>
      <input class="w-full h-touch-target-min pl-12 pr-4 bg-transparent rounded-xl font-body-md text-on-surface focus:outline-none" type="text" placeholder="Buscar protocolo o fármaco..." id="search-input">
    </div>
    <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
      <button class="filter-btn px-4 py-2 rounded-full bg-secondary text-white font-label-md text-label-md whitespace-nowrap shadow-sm hover:shadow-md transition-all" data-filter="all">Todo</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="recent">Recientes</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="favorites">Favoritos</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="offline">Offline</button>
    </div>
  </div>

  <div class="space-y-6">
    <!-- ===== FORMULARIO DE MEDICAMENTOS ===== -->
    <section class="animate-fade-in-up" style="animation-delay: 100ms;">
      <div class="flex items-center justify-between mb-3 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
          <span class="material-symbols-outlined text-secondary">medication</span>
          Formulario de medicamentos
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105 view-all" data-section="drugs">Ver todos</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="resource-card bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-outline-variant active:scale-[0.98] cursor-pointer" data-id="antibiotic-guide">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span class="material-symbols-outlined">pill</span>
            </div>
            <div class="flex-1">
              <h4 class="font-headline-md text-[16px] leading-tight mb-1 text-on-surface">Guía de dosificación de antibióticos</h4>
              <p class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Referencia • 2.4 MB</p>
            </div>
            <span class="material-symbols-outlined text-outline">picture_as_pdf</span>
          </div>
        </div>
        <div class="resource-card bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-outline-variant active:scale-[0.98] cursor-pointer" data-id="nsaid-chart">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span class="material-symbols-outlined">vaccines</span>
            </div>
            <div class="flex-1">
              <h4 class="font-headline-md text-[16px] leading-tight mb-1 text-on-surface">Tabla de seguridad AINEs</h4>
              <p class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Artículo • Actualizado May</p>
            </div>
            <span class="material-symbols-outlined text-outline">open_in_new</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROTOCOLOS DE EMERGENCIA ===== -->
    <section class="animate-fade-in-up" style="animation-delay: 150ms;">
      <div class="flex items-center justify-between mb-3 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
          <span class="material-symbols-outlined text-error">emergency</span>
          Protocolos de emergencia
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105 view-all" data-section="emergency">Ver todos</button>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-outline-variant border-l-4 border-l-error">
        <ul class="divide-y divide-outline-variant">
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="cpr-guide">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">heart_check</span>
              <div>
                <p class="font-headline-md text-[16px] text-on-surface">Referencia rápida RCP (RECOVER)</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Cuidados críticos • Guías 2024</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="gdv-steps">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">fluid_med</span>
              <div>
                <p class="font-headline-md text-[16px] text-on-surface">Pasos para estabilización de GDV</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Emergencia quirúrgica</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="toxin-db">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">skull</span>
              <div>
                <p class="font-headline-md text-[16px] text-on-surface">Referencia de ingestión de toxinas</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Toxicología • Base de datos</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===== GUÍAS CLÍNICAS ===== -->
    <section class="animate-fade-in-up" style="animation-delay: 200ms;">
      <div class="flex items-center justify-between mb-3 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
          <span class="material-symbols-outlined text-secondary">fact_check</span>
          Guías clínicas
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105 view-all" data-section="guidelines">Ver todos</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="guideline-card relative aspect-square rounded-xl overflow-hidden bg-surface shadow-sm border border-outline-variant group cursor-pointer" data-id="cytology-guide">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img alt="Microscopio" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4QFtEeQAm3ZNZTf8LEY0ny0GxK7y8J67fY5SBD-8mjRBt4MrgQRu_WuAlHUki9uiqvhHNkgGRyd8Wm_TvuXd8oPecrOH06h7Z-bSO7QwT0q97A1XcLS_fruqAqwVnHTazJ1a3oJVCSqVdCToCw7hRlSPYxV3OUk2WfLGroRl2K8Xvtl9HLMts25DHGPoSJM1P5YZdF7jSzVbpot2y9xTTddGRmrGz5eCmNaUNfpbddHSBCLQZDXq0hBE1KTv1WZTdByU9tNFqGIsJ" />
          <div class="absolute bottom-3 left-3 right-3 z-20 text-white">
            <p class="font-label-sm text-label-sm uppercase tracking-tighter opacity-80">Citología</p>
            <p class="font-headline-md text-[14px] leading-tight">Guía de aspiración de masas</p>
          </div>
        </div>
        <div class="guideline-card relative aspect-square rounded-xl overflow-hidden bg-surface shadow-sm border border-outline-variant group cursor-pointer" data-id="radiology-guide">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img alt="Equipo de radiología" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt9N_z6iTZmtxCDFcDKOFwi4hZ6ZSFyYtDZLwKGSinqu76DXC5J078PKVHFIbJaR2lRv9ZvX_SrrBkj7KnTQrsjVFRY3D9BVcrGMKYBoAS5_EO9YnDb-PrcC57adCc0sgwnc8a_KOaglbpLIUisvUQMdocy0d4FSlDPPlKW-Q2RAqifLNCTdRSoLkROSgTJw-6Zi0X0R_Xj515PG7v4MNquUPun_2lQWQd9K171JUCIVua6HoikD97nNU3zsrO79cJxQcvPDIQ83ON" />
          <div class="absolute bottom-3 left-3 right-3 z-20 text-white">
            <p class="font-label-sm text-label-sm uppercase tracking-tighter opacity-80">Radiología</p>
            <p class="font-headline-md text-[14px] leading-tight">Estándares de posicionamiento</p>
          </div>
        </div>
        <div class="guideline-card relative aspect-square rounded-xl overflow-hidden bg-surface shadow-sm border border-outline-variant group cursor-pointer" data-id="ckd-guide">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img alt="Estetoscopio" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Ul9aKCVbbulGvYbwY4Pchv_MjnhUTba6ircSiblK3QrQMyLwXC6B9kNw_6IQ6ndibn7ryISOUzMCHPCWFRWVa74V_658OQdJXSq1wrqMD__kUA7Qmh2xsCDFJBJSjx_EXGfAGVVKFPl5oc0o6OD0iRVQ4T6tQ_yWKpNxeThP9vSxCUSDO67HAWZ9NuB7Q2vwgn_nIZdITwLfLcPVqU47P9NB8EhW0u2EaTW4Jd8fLNx6E6gYUtceUyVA7tzWZIrCEgAvqUJ7QnUw" />
          <div class="absolute bottom-3 left-3 right-3 z-20 text-white">
            <p class="font-label-sm text-label-sm uppercase tracking-tighter opacity-80">Medicina Interna</p>
            <p class="font-headline-md text-[14px] leading-tight">Manejo de ERC</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== BANNER PRO ===== -->
    <section class="mt-6 animate-fade-in-up" style="animation-delay: 250ms;">
      <div class="bg-tertiary-container/20 backdrop-blur-sm text-on-tertiary-container rounded-2xl p-4 flex items-center justify-between border border-tertiary/30 shadow-sm">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-tertiary text-3xl" style="font-variation-settings: 'FILL' 1;">star</span>
          <div>
            <h4 class="font-label-md text-label-md font-bold text-on-surface">Biblioteca VetCalc PRO</h4>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Accede a más de 200 guías especializadas exclusivas</p>
          </div>
        </div>
        <button class="bg-tertiary text-white px-4 py-2 rounded-lg font-label-md text-label-md shadow-sm hover:shadow-md transition-all hover:scale-105" id="upgrade-btn">Mejorar</button>
      </div>
    </section>
  </div>
</main>

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
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>
</nav>
`;