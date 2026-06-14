export const LibraryTemplate = `
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50">
  <div class="flex items-center gap-3">
    <span class="material-symbols-outlined text-primary">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Biblioteca</h1>
  </div>
  <div class="flex items-center gap-2">
    <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200">
      <span class="material-symbols-outlined text-on-surface-variant">search</span>
    </button>
    <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200">
      <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
  </div>
</header>

<main class="max-w-4xl mx-auto px-container-padding pb-32 pt-stack-md">
  <!-- Hero -->
  <section class="mb-stack-lg">
    <div class="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container shadow-sm">
      <div class="relative z-10">
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile mb-2">Recursos Clínicos</h2>
        <p class="font-body-md text-body-md opacity-90 max-w-md">Accede a formularios de medicamentos veterinarios, protocolos de emergencia y guías clínicas basadas en evidencia.</p>
      </div>
      <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 pointer-events-none">menu_book</span>
    </div>
  </section>

  <!-- Buscador y filtros -->
  <div class="mb-stack-lg flex flex-col gap-4">
    <div class="relative flex items-center">
      <span class="material-symbols-outlined absolute left-4 text-outline">search</span>
      <input class="w-full h-touch-target-min pl-12 pr-4 rounded-lg border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all" type="text" placeholder="Buscar protocolo o fármaco..." id="search-input">
    </div>
    <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
      <button class="filter-btn px-4 py-2 rounded-full bg-secondary text-on-secondary font-label-md text-label-md whitespace-nowrap" data-filter="all">Todo</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors" data-filter="recent">Recientes</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors" data-filter="favorites">Favoritos</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors" data-filter="offline">Offline</button>
    </div>
  </div>

  <div class="space-y-stack-lg">
    <!-- Formulario de medicamentos -->
    <section>
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">medication</span>
          Formulario de medicamentos
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline view-all" data-section="drugs">Ver todos</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="resource-card bg-surface rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)] hover:shadow-md transition-shadow border border-transparent active:scale-[0.98] cursor-pointer" data-id="antibiotic-guide">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span class="material-symbols-outlined">pill</span>
            </div>
            <div class="flex-1">
              <h4 class="font-headline-md text-[16px] leading-tight mb-1">Guía de dosificación de antibióticos</h4>
              <p class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Referencia • 2.4 MB</p>
            </div>
            <span class="material-symbols-outlined text-outline">picture_as_pdf</span>
          </div>
        </div>
        <div class="resource-card bg-surface rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)] hover:shadow-md transition-shadow border border-transparent active:scale-[0.98] cursor-pointer" data-id="nsaid-chart">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span class="material-symbols-outlined">vaccines</span>
            </div>
            <div class="flex-1">
              <h4 class="font-headline-md text-[16px] leading-tight mb-1">Tabla de seguridad AINEs</h4>
              <p class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Artículo • Actualizado May</p>
            </div>
            <span class="material-symbols-outlined text-outline">open_in_new</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Protocolos de emergencia -->
    <section>
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2">
          <span class="material-symbols-outlined text-error">emergency</span>
          Protocolos de emergencia
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline view-all" data-section="emergency">Ver todos</button>
      </div>
      <div class="bg-surface rounded-xl overflow-hidden shadow-[0px_2px_8px_rgba(38,50,56,0.08)] border-l-4 border-error">
        <ul class="divide-y divide-outline-variant">
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="cpr-guide">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">heart_check</span>
              <div>
                <p class="font-headline-md text-[16px]">Referencia rápida RCP (RECOVER)</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Cuidados críticos • Guías 2024</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="gdv-steps">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">fluid_med</span>
              <div>
                <p class="font-headline-md text-[16px]">Pasos para estabilización de GDV</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Emergencia quirúrgica</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
          <li class="resource-item p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between" data-id="toxin-db">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-error">skull</span>
              <div>
                <p class="font-headline-md text-[16px]">Referencia de ingestión de toxinas</p>
                <p class="text-on-surface-variant text-label-sm font-label-sm">Toxicología • Base de datos</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Guías clínicas (cards con imágenes) -->
    <section>
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="font-headline-md text-headline-md flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">fact_check</span>
          Guías clínicas
        </h3>
        <button class="text-primary font-label-md text-label-md hover:underline view-all" data-section="guidelines">Ver todos</button>
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

    <!-- Banner Pro -->
    <section class="mt-8">
      <div class="bg-tertiary-container text-on-tertiary-container rounded-xl p-4 flex items-center justify-between border border-[#FFD700]">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-tertiary text-3xl" style="font-variation-settings: 'FILL' 1;">star</span>
          <div>
            <h4 class="font-label-md text-label-md font-bold">Biblioteca VetCalc PRO</h4>
            <p class="font-label-sm text-label-sm">Accede a más de 200 guías especializadas exclusivas</p>
          </div>
        </div>
        <button class="bg-tertiary text-on-tertiary px-4 py-2 rounded-lg font-label-md text-label-md shadow-sm" id="upgrade-btn">Mejorar</button>
      </div>
    </section>
  </div>
</main>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] h-[64px] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-transform duration-150 active:scale-95" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-transform duration-150 active:scale-95" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 hover:bg-surface-container-low transition-transform duration-150 active:scale-95" data-route="library">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-transform duration-150 active:scale-95" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;