var ha=Object.defineProperty;var ma=(n,e,t)=>e in n?ha(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var b=(n,e,t)=>ma(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class fa{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(a){console.error(`[Router] Error in ${e}:`,a),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const O=new fa,ga=`
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
`;class ba{constructor(){b(this,"progressBar",null);b(this,"messageElement",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=ga),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const vn=2800,yn=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],xn=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class va{constructor(){b(this,"view");b(this,"progress",0);b(this,"messageIndex",0);b(this,"intervalId",null);this.view=new ba}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const a=Date.now()-t;this.progress=Math.min(100,a/vn*100),this.view.updateProgress(this.progress),Math.floor(a/700)>this.messageIndex&&this.messageIndex<yn.length-1&&(this.messageIndex++,this.view.updateMessage(yn[this.messageIndex])),a>=vn&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await O.navigate("home")}}const ya=`
<!-- ===== FONDO CON ESTILO SPLASH (bg-neutral + vet-pattern) ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <!-- Fondo neutro (igual que splash) -->
  <div class="absolute inset-0 bg-neutral"></div>
  <!-- Patrón de huellas de fondo -->
  <div class="absolute inset-0 vet-pattern"></div>
  <!-- Capa oscura sutil (opcional) -->
  <div class="absolute inset-0 bg-black/5"></div>
  <!-- Imágenes decorativas (mantenidas) -->
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
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

<main class="relative z-10 px-container-padding pt-6 space-y-stack-lg pb-24">

  <!-- ===== BANNER ===== -->
  <section class="relative w-full rounded-2xl overflow-hidden shadow-elevated animate-fade-in-up group min-h-[160px] md:min-h-[425px]"
           style="background-image: url('/icons/Animales/a3.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70 mix-blend-multiply"></div>
    <div class="absolute inset-0 flex flex-col justify-center px-6 text-white">
      <h2 class="font-headline-lg text-headline-lg md:text-headline-xl drop-shadow-md">Bienvenido, Dr. Smith</h2>
      <p class="font-body-md text-body-md opacity-90">Panel clínico • Hoy tienes 4 pacientes agendados</p>
    </div>
  </section>

  <!-- ===== SALUDO Y ESTADÍSTICAS ===== -->
  <section class="flex justify-between items-center animate-fade-in-up" style="animation-delay: 100ms;">
    <div>
      <p class="font-label-md text-label-md text-on-surface-variant">Panel Clínico</p>
      <div class="w-12 h-1 bg-secondary rounded-full mt-1"></div>
    </div>
    <div class="flex gap-6 text-on-surface-variant">
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-primary">12</p>
        <p class="font-label-sm text-label-sm">Pacientes</p>
      </div>
      <div class="text-center">
        <p class="font-headline-md text-headline-md text-secondary">8</p>
        <p class="font-label-sm text-label-sm">Cálculos</p>
      </div>
    </div>
  </section>

  <!-- ===== CUADRÍCULA DE MÓDULOS CON RAYAS ANIMADAS ===== -->
  <div class="bento-grid">
    <!-- Fluidoterapia -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left border-l-4 border-l-primary group animate-fade-in-up hover:border-l-8" data-route="fluidotherapy" style="animation-delay: 50ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">water_drop</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Tasas IV y déficits</p>
      </div>
    </button>

    <!-- Calculadora de Dosis -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left border-l-4 border-l-primary group animate-fade-in-up hover:border-l-8" data-route="dosage" style="animation-delay: 100ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">medication</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Dosificación precisa mg/kg</p>
      </div>
    </button>

    <!-- Anestesia -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left relative border-2 border-tertiary/20 bg-gradient-to-br from-surface to-tertiary-container/10 group animate-fade-in-up border-l-4 border-l-tertiary hover:border-l-8" data-route="anesthesia" style="animation-delay: 150ms;">
      <div class="absolute top-4 right-4">
        <span class="material-symbols-outlined text-tertiary animate-pulse-soft" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed group-hover:bg-tertiary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">air</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Protocolos y CRI</p>
      </div>
    </button>

    <!-- Convertidor -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="converter" style="animation-delay: 200ms;">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">sync_alt</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Peso, Temp, Vol</p>
      </div>
    </button>

    <!-- Biblioteca -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="library" style="animation-delay: 250ms;">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">menu_book</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Guías de referencia</p>
      </div>
    </button>

    <!-- Pacientes -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] text-left border-l-4 border-l-secondary group animate-fade-in-up hover:border-l-8" data-route="patients" style="animation-delay: 300ms;">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined text-3xl">pets</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Casos activos</p>
      </div>
    </button>
  </div>

  <!-- ===== HISTORIAL RECIENTE ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-md p-4 space-y-4">
    <div>
      <div class="flex justify-between items-center">
        <h3 class="font-headline-md text-headline-md text-on-surface">Historial Reciente</h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105" id="view-all-history">Ver todos</button>
      </div>
      <hr class="mt-2 border-t-2 border-secondary" />
    </div>
    <div class="space-y-3" id="recent-history-container"></div>
  </section>

  <!-- ===== PACIENTES RECIENTES ===== -->
  <section id="recent-patients-section" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-md p-4 space-y-4" style="display: none;">
    <div>
      <div class="flex justify-between items-center">
        <h3 class="font-headline-md text-headline-md text-on-surface">Pacientes Recientes</h3>
        <button class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105" id="view-all-patients">Ver todos</button>
      </div>
      <hr class="mt-2 border-t-2 border-secondary" />
    </div>
    <div class="space-y-3" id="recent-patients-container"></div>
  </section>

  <!-- ===== CONSEJO DEL DÍA ===== -->
  <section class="w-full rounded-2xl overflow-hidden relative group shadow-elevated animate-fade-in-up min-h-[180px]" style="animation-delay: 450ms; background-image: url('/icons/Animales/a14.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    <div class="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl backdrop-blur-sm">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">lightbulb</span>
        <p class="font-label-md text-label-md text-primary font-bold">Consejo del día</p>
      </div>
      <p class="font-body-md text-body-md text-on-surface mt-1" id="tip-of-the-day">Verifique el estado de hidratación antes de calcular los déficits de fluidos.</p>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface dark:bg-surface h-[64px] z-50 shadow-[0px_-2px_8px_rgba(38,50,56,0.08)]">
  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-transform duration-150" href="#" data-route="home">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="converter">
    <span class="material-symbols-outlined">sync_alt</span>
    <span class="font-label-sm text-label-sm">Convertidor</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </a>
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="#" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </a>
</nav>
`;class xa{constructor(){Object.defineProperty(this,"recentHistoryContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"tipElement",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsSection",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=ya),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section")}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const wa=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],_a=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],Ea={activeCases:24,inSurgery:3,todayCalculations:7};class ka{getRecentPatients(e=4){return wa.slice(0,e)}getRecentHistory(e=5){return _a.slice(0,e)}getDashboardStats(){return{...Ea}}}const mt=new ka;class Ia{constructor(){b(this,"isPremium",!1);b(this,"listeners",[]);const e=localStorage.getItem("vetcalc-premium");this.isPremium=e==="true"}getStatus(){return this.isPremium}setStatus(e){this.isPremium=e,localStorage.setItem("vetcalc-premium",String(e)),this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{const t=this.listeners.indexOf(e);t!==-1&&this.listeners.splice(t,1)}}notifyListeners(){this.listeners.forEach(e=>e(this.isPremium))}}const Le=new Ia;function wn(n){document.querySelectorAll(".premium-badge").forEach(t=>{n?(t.classList.remove("bg-surface-container-high","text-on-surface-variant","border-outline-variant"),t.classList.add("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary")):(t.classList.remove("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary"),t.classList.add("bg-surface-container-high","text-on-surface-variant","border-outline-variant"))})}class de{constructor(){b(this,"premiumUnsubscribe",null)}setupGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{if(e._navListener)return;const t=async a=>{a.preventDefault();const s=e.getAttribute("data-route");s&&await O.navigate(s)};e.addEventListener("click",t),e._navListener=t})}initPremiumBadge(){const e=Le.getStatus();wn(e),this.premiumUnsubscribe=Le.subscribe(t=>{wn(t)})}destroyPremiumBadge(){this.premiumUnsubscribe&&(this.premiumUnsubscribe(),this.premiumUnsubscribe=null)}destroyGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e._navListener&&(e.removeEventListener("click",e._navListener),delete e._navListener)})}}class La extends de{constructor(){super();b(this,"view");b(this,"onlineStatus",!0);b(this,"onlineHandler",()=>{this.updateOnlineStatus(!0)});b(this,"offlineHandler",()=>{this.updateOnlineStatus(!1)});this.view=new xa}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(t=>{const a=t;a.addEventListener("click",s=>{const r=document.createElement("span");r.classList.add("ripple"),a.appendChild(r);const i=a.getBoundingClientRect(),o=s.clientX-i.left,l=s.clientY-i.top;r.style.left=`${o}px`,r.style.top=`${l}px`,setTimeout(()=>r.remove(),600)})}),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupSpecificListeners(),this.setupElements(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),this.destroyPremiumBadge(),console.log("[HomeController] Destroyed")}setupSpecificListeners(){const t=this.view.getSearchButton();t&&t.addEventListener("click",()=>console.log("[Home] Search clicked"));const a=this.view.getProfileButton();a&&a.addEventListener("click",()=>console.log("[Home] Profile clicked"));const s=this.view.getViewAllHistoryButton();s&&s.addEventListener("click",async()=>this.navigateToModule("history"));const r=this.view.getViewAllPatientsButton();r&&r.addEventListener("click",async()=>this.navigateToModule("patients"))}setupElements(){this.view.showRecentPatientsSection()}async navigateToModule(t){console.log(`[Home] Navigating to: ${t}`),await O.navigate(t)}renderRecentPatients(){const t=mt.getRecentPatients(4),a=this.view.getRecentPatientsContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createPatientCard(s))}))}createPatientCard(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const s=(t.species==="canine","pets");return a.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(t.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${t.species} • ${t.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${t.status}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View patient: ${t.name}`)),a}renderRecentHistory(){const t=mt.getRecentHistory(2),a=this.view.getRecentHistoryContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createHistoryItem(s))}))}createHistoryItem(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let s="history",r="bg-secondary-fixed";switch(t.type){case"dosage":s="medication",r="bg-secondary-fixed";break;case"fluidotherapy":s="water_drop",r="bg-secondary-fixed";break;case"anesthesia":s="air",r="bg-tertiary-fixed";break;case"converter":s="sync_alt",r="bg-surface-container-highest";break}const i=this.getRelativeTime(t.createdAt),o=t.summary.substring(0,40)+(t.summary.length>40?"...":""),l=t.patientName||"Unknown",u=t.patientSpecies||"N/A",c=t.patientWeightKg||"?";return a.innerHTML=`
      <div class="w-10 h-10 rounded-full ${r} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(o)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(l)} (${u}, ${c}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${i}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View calculation: ${t.type}`)),a}getRelativeTime(t){const a=Date.now()-t.getTime(),s=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return s<1?"Just now":s<60?`${s}m ago`:r<24?`${r}h ago`:`${i}d ago`}renderTipOfTheDay(){const t=xn[Math.floor(Math.random()*xn.length)],a=this.view.getTipElement();a&&(a.textContent=t.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(t){this.onlineStatus=t;let a=document.getElementById("online-status");if(a||document.querySelector("header")&&(a=document.createElement("div"),a.id="online-status",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(a,document.body.firstChild)),a)if(t)a.textContent="● Online",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{a&&this.onlineStatus&&(a.style.opacity="0",setTimeout(()=>{if(a&&this.onlineStatus){a.style.display="none";const s=document.querySelector("header");s&&(s.style.marginTop="0px")}},300))},3e3);else{a.textContent="⚠ You are offline - Some features may be limited",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",a.style.display="block";const s=document.querySelector("header");s&&(s.style.marginTop="24px")}}escapeHtml(t){const a=document.createElement("div");return a.textContent=t,a.innerHTML}}const Ba=`
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
`;class Pa{constructor(){b(this,"container",null);b(this,"inputLeft",null);b(this,"inputRight",null);b(this,"labelLeft",null);b(this,"labelRight",null);b(this,"unitLeft",null);b(this,"unitRight",null);b(this,"referenceText",null);b(this,"tabs",null);b(this,"swapBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ba),this.cacheElements()}cacheElements(){this.inputLeft=document.getElementById("input-left"),this.inputRight=document.getElementById("input-right"),this.labelLeft=document.getElementById("label-left"),this.labelRight=document.getElementById("label-right"),this.unitLeft=document.getElementById("unit-left"),this.unitRight=document.getElementById("unit-right"),this.referenceText=document.getElementById("reference-text"),this.tabs=document.querySelectorAll("[data-mode]"),this.swapBtn=document.getElementById("swap-btn")}getInputLeft(){return this.inputLeft}getInputRight(){return this.inputRight}getLabelLeft(){return this.labelLeft}getLabelRight(){return this.labelRight}getUnitLeft(){return this.unitLeft}getUnitRight(){return this.unitRight}getReferenceText(){return this.referenceText}getTabs(){return this.tabs}getSwapBtn(){return this.swapBtn}updateLeftLabel(e){this.labelLeft&&(this.labelLeft.textContent=e)}updateRightLabel(e){this.labelRight&&(this.labelRight.textContent=e)}updateLeftUnit(e){this.unitLeft&&(this.unitLeft.textContent=e)}updateRightUnit(e){this.unitRight&&(this.unitRight.textContent=e)}updateReference(e){this.referenceText&&(this.referenceText.textContent=e)}clearInputs(){this.inputLeft&&(this.inputLeft.value=""),this.inputRight&&(this.inputRight.value="")}setInputLeftValue(e){this.inputLeft&&e!==void 0&&(this.inputLeft.value=e)}setInputRightValue(e){this.inputRight&&e!==void 0&&(this.inputRight.value=e)}getInputLeftValue(){const e=this.inputLeft;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}getInputRightValue(){const e=this.inputRight;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}}class Ca extends de{constructor(){super();b(this,"view");b(this,"currentMode","weight");b(this,"modes",{weight:{leftLabel:"Libras (lb)",leftUnit:"lb",rightLabel:"Kilogramos (kg)",rightUnit:"kg",reference:"Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.",convert:(t,a)=>a==="leftToRight"?t/2.20462:t*2.20462},temp:{leftLabel:"Fahrenheit (°F)",leftUnit:"°F",rightLabel:"Celsius (°C)",rightUnit:"°C",reference:"Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).",convert:(t,a)=>a==="leftToRight"?(t-32)*5/9:t*9/5+32},volume:{leftLabel:"Onzas líquidas (fl oz)",leftUnit:"fl oz",rightLabel:"Mililitros (mL)",rightUnit:"mL",reference:"Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).",convert:(t,a)=>a==="leftToRight"?t*29.5735:t/29.5735}});this.view=new Pa}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.applyMode("weight")}setupEventListeners(){const t=this.view.getTabs();t==null||t.forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-mode");o&&this.modes[o]&&this.applyMode(o)})});const a=this.view.getInputLeft(),s=this.view.getInputRight();a==null||a.addEventListener("input",()=>this.convertFromLeft()),s==null||s.addEventListener("input",()=>this.convertFromRight());const r=this.view.getSwapBtn();r==null||r.addEventListener("click",()=>this.swap())}applyMode(t){this.currentMode=t;const a=this.modes[t];this.view.updateLeftLabel(a.leftLabel),this.view.updateRightLabel(a.rightLabel),this.view.updateLeftUnit(a.leftUnit),this.view.updateRightUnit(a.rightUnit),this.view.updateReference(a.reference),this.view.clearInputs();const s=this.view.getTabs();s==null||s.forEach(r=>{r.getAttribute("data-mode")===t?(r.classList.add("bg-surface","text-primary","shadow-sm"),r.classList.remove("text-on-surface-variant","hover:bg-surface-container-high")):(r.classList.remove("bg-surface","text-primary","shadow-sm"),r.classList.add("text-on-surface-variant","hover:bg-surface-container-high"))})}convertFromLeft(){const t=this.view.getInputLeftValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"leftToRight");this.view.setInputRightValue(s.toFixed(2))}else this.view.setInputRightValue("")}convertFromRight(){const t=this.view.getInputRightValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"rightToLeft");this.view.setInputLeftValue(s.toFixed(2))}else this.view.setInputLeftValue("")}swap(){const t=this.view.getInputLeftValue(),a=this.view.getInputRightValue();t!==null?this.view.setInputRightValue(t.toFixed(2)):this.view.setInputRightValue(""),a!==null?this.view.setInputLeftValue(a.toFixed(2)):this.view.setInputLeftValue(""),this.convertFromLeft()}destroy(){this.destroyPremiumBadge(),console.log("[ConverterController] Destroyed")}}const Sa=`
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50">
  <div class="flex items-center gap-3">
    <button class="flex items-center justify-center w-touch-target-min h-touch-target-min hover:bg-surface-container-high transition-colors duration-200 rounded-full" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Protocolo de Anestesia</span>
  </div>
  <div class="flex items-center gap-2">
    <div class="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full border border-tertiary shadow-sm">
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm">PREMIUM</span>
    </div>
    <button class="w-touch-target-min h-touch-target-min flex items-center justify-center hover:bg-surface-container-high transition-colors duration-200 rounded-full text-on-surface-variant" data-route="home">
      <span class="material-symbols-outlined">account_circle</span>
    </button>
  </div>
</header>

<main class="max-w-xl mx-auto px-container-padding py-stack-md space-y-stack-lg">
  <!-- Patient Profile Summary -->
  <section class="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] border border-outline-variant">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface">Detalles del Paciente</h2>
        <p class="text-on-surface-variant font-body-md" id="patient-details">Canino • Golden Retriever • 28.5 kg</p>
      </div>
      <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">pets</span>
    </div>
    <div class="grid grid-cols-2 gap-gutter">
      <div class="p-3 bg-surface-container rounded-lg">
        <p class="text-label-sm font-label-sm text-outline">ESTADO ASA</p>
        <p class="text-headline-md font-headline-md text-primary" id="asa-status">Clase II</p>
      </div>
      <div class="p-3 bg-surface-container rounded-lg">
        <p class="text-label-sm font-label-sm text-outline">PESO</p>
        <p class="text-headline-md font-headline-md text-primary" id="weight-display">28.5 kg</p>
      </div>
    </div>
  </section>

  <!-- Pre-medication -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</span>
      <h3 class="font-headline-md text-headline-md">Premedicación</h3>
    </div>
    <div class="grid gap-stack-sm" id="premed-list">
      <!-- Los fármacos se generarán dinámicamente desde el controlador -->
    </div>
  </div>

  <!-- Induction -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">2</span>
      <h3 class="font-headline-md text-headline-md">Inducción</h3>
    </div>
    <div class="grid gap-stack-sm" id="induction-list"></div>
  </div>

  <!-- Maintenance -->
  <div class="space-y-stack-md">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">3</span>
      <h3 class="font-headline-md text-headline-md">Mantenimiento</h3>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-label-md text-label-md text-on-surface">Isoflurano</p>
          <p class="text-body-md text-on-surface-variant">Anestésico inhalatorio</p>
        </div>
        <div class="px-4 py-2 bg-secondary-container rounded-lg">
          <p class="font-headline-md text-headline-md text-on-secondary-container">1.5 - 2.5%</p>
        </div>
      </div>
      <div class="pt-4 border-t border-outline-variant">
        <div class="flex justify-between items-center mb-2">
          <p class="font-label-md text-label-md text-on-surface">Flujo de Oxígeno</p>
          <span class="text-label-sm text-outline">Sistema con rebreathing</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-surface rounded-lg border border-outline-variant">
            <p class="text-label-sm text-outline">INDUCCIÓN</p>
            <p class="font-body-lg text-primary">2.8 L/min</p>
          </div>
          <div class="p-3 bg-surface rounded-lg border border-outline-variant">
            <p class="text-label-sm text-outline">MANTENIMIENTO</p>
            <p class="font-body-lg text-primary">0.8 L/min</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Summary Table -->
  <section class="space-y-stack-md pt-stack-lg">
    <div class="flex justify-between items-end">
      <h3 class="font-headline-xl text-headline-xl text-on-surface">Resumen del Protocolo</h3>
      <button class="flex items-center gap-1 text-primary font-label-md" id="print-pdf-btn">
        <span class="material-symbols-outlined text-[18px]">print</span>
        IMPRIMIR PDF
      </button>
    </div>
    <div class="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg">
      <table class="w-full text-left border-collapse">
        <thead class="bg-primary text-on-primary">
          <tr>
            <th class="p-4 font-label-md text-label-md">FÁRMACO</th>
            <th class="p-4 font-label-md text-label-md">DOSIS</th>
            <th class="p-4 font-label-md text-label-md text-right">VOLUMEN</th>
          </tr>
        </thead>
        <tbody id="summary-table-body">
          <!-- Se llenará dinámicamente -->
        </tbody>
      </table>
      <div class="bg-primary-container p-4 flex justify-between items-center text-on-primary-container">
        <span class="font-label-md text-label-md">FLUIDOS ESTIMADOS (1 hora)</span>
        <span class="font-headline-md text-headline-md" id="total-fluids">142.5 mL</span>
      </div>
    </div>
  </section>

  <!-- Bottom Action Area -->
  <div class="pt-stack-lg pb-stack-lg">
    <button class="w-full bg-primary text-on-primary h-touch-target-min rounded-xl font-headline-md shadow-md hover:brightness-110 active:scale-95 transition-all" id="finalize-btn">
      Finalizar y Guardar Protocolo
    </button>
    <p class="text-center text-label-sm text-outline mt-4">Cálculos basados en 28.5 kg. Revisar clínicamente antes de administrar.</p>
  </div>
</main>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 hover:bg-surface-container-low transition-colors duration-150 px-4" data-route="patients">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors duration-150 rounded-lg px-4" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;class Aa{constructor(){b(this,"container",null);b(this,"patientDetailsEl",null);b(this,"weightDisplayEl",null);b(this,"asaStatusEl",null);b(this,"premedListEl",null);b(this,"inductionListEl",null);b(this,"summaryBodyEl",null);b(this,"totalFluidsEl",null);b(this,"finalizeBtn",null);b(this,"printBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Sa),this.cacheElements()}cacheElements(){this.patientDetailsEl=document.getElementById("patient-details"),this.weightDisplayEl=document.getElementById("weight-display"),this.asaStatusEl=document.getElementById("asa-status"),this.premedListEl=document.getElementById("premed-list"),this.inductionListEl=document.getElementById("induction-list"),this.summaryBodyEl=document.getElementById("summary-table-body"),this.totalFluidsEl=document.getElementById("total-fluids"),this.finalizeBtn=document.getElementById("finalize-btn"),this.printBtn=document.getElementById("print-pdf-btn")}getPremedList(){return this.premedListEl}getInductionList(){return this.inductionListEl}getSummaryBody(){return this.summaryBodyEl}getTotalFluidsEl(){return this.totalFluidsEl}getFinalizeBtn(){return this.finalizeBtn}getPrintBtn(){return this.printBtn}updatePatientInfo(e,t,a,s){this.patientDetailsEl&&(this.patientDetailsEl.textContent=`${e} • ${t} • ${a} kg`),this.weightDisplayEl&&(this.weightDisplayEl.textContent=`${a} kg`),this.asaStatusEl&&(this.asaStatusEl.textContent=s)}renderDrugList(e,t,a){e.innerHTML="";for(const s of t){const r=document.createElement("label");r.className=`flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border shadow-sm hover:border-primary cursor-pointer transition-all ${s.selected?"border-primary":"border-outline-variant"}`;const i=document.createElement("input");i.type="checkbox",i.checked=s.selected,i.className="w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox",i.addEventListener("change",u=>{const c=u.target.checked;a(s.name,c),c?(r.classList.add("border-primary"),r.classList.remove("opacity-60")):(r.classList.remove("border-primary"),r.classList.add("opacity-60"))});const o=document.createElement("div");o.className="flex-grow",o.innerHTML=`
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface">${s.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${s.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${s.category==="premed"?"Sedante / Analgésico":"Agente de inducción"}</p>
      `;const l=document.createElement("div");l.className="text-right",l.id=`drug-values-${s.name.replace(/\s/g,"")}`,this.updateDrugValuesUI(l,s,28.5),r.appendChild(i),r.appendChild(o),r.appendChild(l),e.appendChild(r)}}updateDrugValuesUI(e,t,a){const s=t.dosePerKg*a,r=s/t.concentration;e.innerHTML=`
      <p class="font-headline-md text-headline-md text-primary">${s.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${r.toFixed(2)} mL</p>
    `}renderSummary(e,t,a){if(this.summaryBodyEl){this.summaryBodyEl.innerHTML="";for(const s of e){if(!s.selected)continue;const r=s.dosePerKg*t,i=r/s.concentration,o=document.createElement("tr");o.className="divide-y divide-outline-variant",o.innerHTML=`
        <td class="p-4">
          <p class="font-label-md text-label-md">${s.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${s.category==="premed"?"Premedicación":"Inducción"}</p>
        </td>
        <td class="p-4 font-body-md">${r.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${i.toFixed(2)} mL</td>
      `,this.summaryBodyEl.appendChild(o)}this.totalFluidsEl&&(this.totalFluidsEl.textContent=`${a.toFixed(1)} mL`)}}}class Ra{constructor(){b(this,"view");b(this,"weightKg",28.5);b(this,"drugs",[{name:"Acepromazina",dosePerKg:.02,concentration:10,category:"premed",selected:!0},{name:"Butorfanol",dosePerKg:.2,concentration:10,category:"premed",selected:!0},{name:"Propofol",dosePerKg:4,concentration:10,category:"induction",selected:!0}]);this.view=new Aa}async init(){this.view.render(),this.setupEventListeners(),this.renderDrugLists(),this.updateSummaryAndFluids()}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",async s=>{s.preventDefault();const r=a.getAttribute("data-route");r&&await O.navigate(r)})});const e=this.view.getFinalizeBtn();e==null||e.addEventListener("click",()=>{alert("Protocolo guardado (simulación)"),console.log("Protocolo finalizado:",this.drugs.filter(a=>a.selected))});const t=this.view.getPrintBtn();t==null||t.addEventListener("click",()=>{console.log("Generar PDF")})}renderDrugLists(){const e=this.view.getPremedList(),t=this.view.getInductionList();if(!e||!t)return;const a=this.drugs.filter(r=>r.category==="premed"),s=this.drugs.filter(r=>r.category==="induction");this.view.renderDrugList(e,a,(r,i)=>{const o=this.drugs.find(l=>l.name===r);o&&(o.selected=i),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()}),this.view.renderDrugList(t,s,(r,i)=>{const o=this.drugs.find(l=>l.name===r);o&&(o.selected=i),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()})}refreshDrugValuesUI(){const e=this.drugs;for(const t of e){const a=document.getElementById(`drug-values-${t.name.replace(/\s/g,"")}`);a&&this.view.updateDrugValuesUI(a,t,this.weightKg)}}updateSummaryAndFluids(){const e=this.drugs.filter(a=>a.selected),t=this.weightKg*5;this.view.renderSummary(e,this.weightKg,t)}destroy(){console.log("[AnesthesiaController] Destroyed")}}const Da=`
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
`;class Ta{constructor(){b(this,"drugInput",null);b(this,"weightInput",null);b(this,"dosageInput",null);b(this,"concentrationInput",null);b(this,"calculateBtn",null);b(this,"resultContainer",null);b(this,"resultVolumeSpan",null);b(this,"resultDosageSpan",null);b(this,"logBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Da),this.cacheElements()}cacheElements(){this.drugInput=document.getElementById("drug-name"),this.weightInput=document.getElementById("weight"),this.dosageInput=document.getElementById("dosage"),this.concentrationInput=document.getElementById("concentration"),this.calculateBtn=document.getElementById("calculate-btn"),this.resultContainer=document.getElementById("result-container"),this.resultVolumeSpan=document.getElementById("result-volume"),this.resultDosageSpan=document.getElementById("result-dosage"),this.logBtn=document.getElementById("log-btn")}getDrugName(){var e;return((e=this.drugInput)==null?void 0:e.value)||""}getWeight(){var t;const e=(t=this.weightInput)==null?void 0:t.value;return e?parseFloat(e):0}getDosageMgPerKg(){var t;const e=(t=this.dosageInput)==null?void 0:t.value;return e?parseFloat(e):0}getConcentrationMgPerMl(){var t;const e=(t=this.concentrationInput)==null?void 0:t.value;return e?parseFloat(e):0}setDrugName(e){this.drugInput&&(this.drugInput.value=e)}setWeight(e){this.weightInput&&(this.weightInput.value=e.toString())}setDosage(e){this.dosageInput&&(this.dosageInput.value=e.toString())}setConcentration(e){this.concentrationInput&&(this.concentrationInput.value=e.toString())}showResult(e,t){this.resultContainer&&(this.resultContainer.classList.remove("opacity-0","translate-y-4"),this.resultContainer.classList.add("opacity-100","translate-y-0")),this.resultVolumeSpan&&(this.resultVolumeSpan.textContent=`${t.toFixed(2)} mL`),this.resultDosageSpan&&(this.resultDosageSpan.textContent=`Dosis: ${e.toFixed(2)} mg total`)}hideResult(){this.resultContainer&&(this.resultContainer.classList.add("opacity-0","translate-y-4"),this.resultContainer.classList.remove("opacity-100","translate-y-0"))}getCalculateButton(){return this.calculateBtn}getLogButton(){return this.logBtn}highlightDrugInput(e){this.drugInput&&(e?this.drugInput.classList.add("border-primary"):this.drugInput.classList.remove("border-primary"))}}class ja extends de{constructor(){super();b(this,"view");this.view=new Ta}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.view.setWeight(28.5),this.view.setDosage(5),this.view.setConcentration(50),this.view.hideResult()}setupEventListeners(){const t=this.view.getCalculateButton();t==null||t.addEventListener("click",()=>{this.calculate(),t.classList.add("scale-95"),setTimeout(()=>t.classList.remove("scale-95"),150)});const a=this.view.getLogButton();a==null||a.addEventListener("click",()=>{this.saveToHistory()});const s=document.getElementById("drug-name");s==null||s.addEventListener("input",r=>{const i=r.target;this.view.highlightDrugInput(i.value.length>0)})}calculate(){const t=this.view.getWeight(),a=this.view.getDosageMgPerKg(),s=this.view.getConcentrationMgPerMl();if(t<=0||a<=0||s<=0){alert("Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.");return}const r=t*a,i=r/s;this.view.showResult(r,i)}saveToHistory(){console.log("Guardar cálculo en historial:",{drug:this.view.getDrugName(),weight:this.view.getWeight(),dosagePerKg:this.view.getDosageMgPerKg(),concentration:this.view.getConcentrationMgPerMl(),timestamp:new Date().toISOString()}),alert("Cálculo guardado en el historial (simulado).")}destroy(){this.destroyPremiumBadge(),console.log("[DosageController] Destroyed")}}const Ma=`
<!-- Top App Bar -->
<header class="bg-surface w-full top-0 sticky shadow-sm z-50 flex justify-between items-center px-container-padding h-touch-target-min">
  <div class="flex items-center gap-4">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Fluidoterapia</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
  </div>
</header>

<main class="max-w-md mx-auto px-container-padding pt-stack-md flex flex-col gap-stack-lg">
  <!-- Hero Card -->
  <section class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)] border-l-4 border-primary">
    <h2 class="font-label-md text-label-md text-primary mb-1">PROTOCOLO DE CÁLCULO</h2>
    <p class="text-on-surface-variant text-sm">Calcula los requerimientos totales de fluidos para un período de 24 horas basado en déficit por deshidratación, mantenimiento y pérdidas.</p>
  </section>

  <!-- Formulario -->
  <div class="flex flex-col gap-stack-md">
    <!-- Peso -->
    <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)]">
      <div class="flex justify-between items-end mb-2">
        <label class="font-label-md text-label-md text-on-surface-variant">Peso del paciente</label>
        <span class="font-label-sm text-label-sm text-primary uppercase">Requerido</span>
      </div>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-surface border-none rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all" id="weight" type="number" step="0.1" value="10" placeholder="0.0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">kg</span>
      </div>
    </div>

    <!-- Deshidratación -->
    <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)]">
      <div class="flex justify-between items-center mb-4">
        <label class="font-label-md text-label-md text-on-surface-variant">Deshidratación %</label>
        <span class="font-headline-md text-headline-md text-primary" id="dehydration-value">5%</span>
      </div>
      <input class="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer" id="dehydration" type="range" min="0" max="15" value="5">
      <div class="flex justify-between mt-2 text-[10px] text-outline uppercase font-bold tracking-wider">
        <span>0% (Normal)</span>
        <span>5% (Leve)</span>
        <span>10% (Mod)</span>
        <span>15% (Severo)</span>
      </div>
    </div>

    <!-- Tasa de mantenimiento -->
    <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)]">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Tasa de mantenimiento</label>
      <div class="relative flex-1">
        <input class="w-full h-touch-target-min bg-surface border-none rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary outline-none" id="maintenance" type="number" value="50">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/kg/día</span>
      </div>
      <div class="flex gap-2 mt-3">
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-colors" data-maintenance="40">40 (Gato)</button>
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-colors" data-maintenance="60">60 (Perro)</button>
      </div>
    </div>

    <!-- Pérdidas continuas -->
    <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)]">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Pérdidas continuas (est.)</label>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-surface border-none rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary outline-none" id="losses" type="number" value="0" placeholder="0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/día</span>
      </div>
    </div>

    <!-- Factor de goteo -->
    <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_2px_8px_rgba(38,50,56,0.08)]">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Factor de goteo del equipo</label>
      <div class="grid grid-cols-3 gap-2">
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="10">10 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-primary bg-primary-container/20 text-primary font-label-md hover:bg-surface-container-highest transition-all" data-drip="15">15 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="60">60 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
      </div>
    </div>
  </div>

  <!-- Resultados -->
  <section class="mt-4 pb-12">
    <div class="bg-primary text-on-primary rounded-xl p-6 shadow-lg relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div class="relative z-10">
        <h3 class="font-label-md text-label-md text-on-primary-container bg-primary-container inline-block px-3 py-1 rounded-full mb-4">REQUERIMIENTO TOTAL</h3>
        <div class="mb-6">
          <span class="font-headline-xl text-headline-xl block" id="total-volume">1,250.0</span>
          <span class="text-sm opacity-90">ml Volumen total (24h)</span>
        </div>
        <div class="grid grid-cols-2 gap-4 border-t border-on-primary/20 pt-6">
          <div>
            <span class="font-headline-lg text-headline-lg block" id="hourly-rate">52.1</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">ml/hora</span>
          </div>
          <div>
            <span class="font-headline-lg text-headline-lg block" id="drip-rate">13</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">gotas/min</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex gap-3 mt-6">
      <button class="flex-1 h-touch-target-min bg-surface-container-highest text-primary font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm" id="save-btn">
        <span class="material-symbols-outlined">save</span> Guardar
      </button>
      <button class="flex-1 h-touch-target-min bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm" id="report-btn">
        <span class="material-symbols-outlined">print</span> Reporte
      </button>
    </div>
  </section>
</main>

<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] h-[64px] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors w-full h-full" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors w-full h-full" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 hover:bg-surface-container-low transition-colors w-full h-full" data-route="fluidotherapy">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">water_drop</span>
    <span class="font-label-sm text-label-sm">Fluidoterapia</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low transition-colors w-full h-full" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
</nav>
`;class Fa{constructor(){b(this,"weightInput",null);b(this,"dehydrationInput",null);b(this,"dehydrationValueSpan",null);b(this,"maintenanceInput",null);b(this,"lossesInput",null);b(this,"totalVolumeSpan",null);b(this,"hourlyRateSpan",null);b(this,"dripRateSpan",null);b(this,"dripButtons",null);b(this,"maintenancePresetBtns",null);b(this,"saveBtn",null);b(this,"reportBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ma),this.cacheElements()}cacheElements(){this.weightInput=document.getElementById("weight"),this.dehydrationInput=document.getElementById("dehydration"),this.dehydrationValueSpan=document.getElementById("dehydration-value"),this.maintenanceInput=document.getElementById("maintenance"),this.lossesInput=document.getElementById("losses"),this.totalVolumeSpan=document.getElementById("total-volume"),this.hourlyRateSpan=document.getElementById("hourly-rate"),this.dripRateSpan=document.getElementById("drip-rate"),this.dripButtons=document.querySelectorAll(".drip-btn"),this.maintenancePresetBtns=document.querySelectorAll("[data-maintenance]"),this.saveBtn=document.getElementById("save-btn"),this.reportBtn=document.getElementById("report-btn")}getWeight(){var e;return parseFloat(((e=this.weightInput)==null?void 0:e.value)||"0")}getDehydrationPercent(){var e;return parseFloat(((e=this.dehydrationInput)==null?void 0:e.value)||"0")}getMaintenance(){var e;return parseFloat(((e=this.maintenanceInput)==null?void 0:e.value)||"0")}getLosses(){var e;return parseFloat(((e=this.lossesInput)==null?void 0:e.value)||"0")}setDehydrationDisplay(e){this.dehydrationValueSpan&&(this.dehydrationValueSpan.textContent=`${e}%`)}updateResults(e,t,a){this.totalVolumeSpan&&(this.totalVolumeSpan.textContent=e.toFixed(1)),this.hourlyRateSpan&&(this.hourlyRateSpan.textContent=t.toFixed(1)),this.dripRateSpan&&(this.dripRateSpan.textContent=Math.round(a).toString())}onWeightInput(e){var t;(t=this.weightInput)==null||t.addEventListener("input",e)}onDehydrationInput(e){var t;(t=this.dehydrationInput)==null||t.addEventListener("input",e)}onMaintenanceInput(e){var t;(t=this.maintenanceInput)==null||t.addEventListener("input",e)}onLossesInput(e){var t;(t=this.lossesInput)==null||t.addEventListener("input",e)}onDripButtonClick(e){var t;(t=this.dripButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var r;const s=parseInt(a.getAttribute("data-drip")||"15");e(s),(r=this.dripButtons)==null||r.forEach(i=>{i.classList.remove("border-primary","bg-primary-container/20","text-primary"),i.classList.add("border-transparent","bg-surface-container-high","text-on-surface-variant")}),a.classList.add("border-primary","bg-primary-container/20","text-primary"),a.classList.remove("border-transparent","bg-surface-container-high","text-on-surface-variant")})})}onMaintenancePreset(e){var t;(t=this.maintenancePresetBtns)==null||t.forEach(a=>{a.addEventListener("click",()=>{const s=parseInt(a.getAttribute("data-maintenance")||"0");e(s)})})}onSave(e){var t;(t=this.saveBtn)==null||t.addEventListener("click",e)}onReport(e){var t;(t=this.reportBtn)==null||t.addEventListener("click",e)}}class Oa extends de{constructor(){super();b(this,"view");b(this,"currentDripFactor",15);this.view=new Fa}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.calculate()}setupEventListeners(){this.view.onWeightInput(()=>this.calculate()),this.view.onDehydrationInput(()=>{const t=this.view.getDehydrationPercent();this.view.setDehydrationDisplay(t),this.calculate()}),this.view.onMaintenanceInput(()=>this.calculate()),this.view.onLossesInput(()=>this.calculate()),this.view.onDripButtonClick(t=>{this.currentDripFactor=t,this.calculate()}),this.view.onMaintenancePreset(t=>{this.view.maintenanceInput&&(this.view.maintenanceInput.value=t.toString(),this.calculate())}),this.view.onSave(()=>{alert("Protocolo guardado (simulación)"),console.log("Fluidoterapia guardada")}),this.view.onReport(()=>{console.log("Generar reporte PDF"),alert("Función de reporte en desarrollo")})}calculate(){const t=this.view.getWeight(),a=this.view.getDehydrationPercent(),s=this.view.getMaintenance(),r=this.view.getLosses(),i=t*a*10,o=t*s,l=i+o+r,u=l/24,c=u*this.currentDripFactor/60;this.view.updateResults(l,u,c)}destroy(){this.destroyPremiumBadge(),console.log("[FluidotherapyController] Destroyed")}}const Ka=`
<header class="bg-surface dark:bg-surface w-full top-0 sticky z-50 shadow-sm flex justify-between items-center px-container-padding h-touch-target-min">
  <div class="flex items-center gap-3">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Historial</h1>
  </div>
  <div class="flex items-center">
    <button class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200">
      <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
    </button>
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
  </div>
</header>

<main class="pb-24 pt-4 px-container-padding max-w-2xl mx-auto">
  <!-- Filtros -->
  <section class="mb-stack-lg flex gap-2 overflow-x-auto pb-2 scrollbar-hide" id="filter-buttons">
    <button class="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-sm" data-filter="all">Todos</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="dosage">Dosis</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="fluidotherapy">Fluidos</button>
    <button class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap" data-filter="anesthesia">Anestesia</button>
  </section>

  <!-- Lista de historial -->
  <div class="space-y-stack-md" id="history-list"></div>

  <!-- Botón cargar más -->
  <div class="mt-10 text-center">
    <button class="text-primary font-label-md text-label-md border-b-2 border-primary-fixed-dim pb-1 hover:border-primary transition-colors" id="load-more-btn">
      Cargar registros antiguos
    </button>
  </div>
</main>

<!-- Barra inferior -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] z-50 shadow-[0px_-2px_8px_rgba(38,50,56,0.08)]">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="patients">
    <span class="material-symbols-outlined">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 active:scale-95 transition-transform duration-150" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-transform duration-150" data-route="history">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>

<!-- Botón flotante de búsqueda -->
<button class="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-primary-container text-on-primary-container shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40" id="search-fab">
  <span class="material-symbols-outlined">search</span>
</button>
`;class Na{constructor(){b(this,"historyContainer",null);b(this,"filterButtons",null);b(this,"loadMoreBtn",null);b(this,"searchFab",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ka),this.cacheElements()}cacheElements(){this.historyContainer=document.getElementById("history-list"),this.filterButtons=document.querySelectorAll("#filter-buttons button"),this.loadMoreBtn=document.getElementById("load-more-btn"),this.searchFab=document.getElementById("search-fab")}getHistoryContainer(){return this.historyContainer}getFilterButtons(){return this.filterButtons}getLoadMoreButton(){return this.loadMoreBtn}getSearchFab(){return this.searchFab}renderHistoryList(e,t){if(!this.historyContainer)return;if(e.length===0){this.historyContainer.innerHTML=`
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;return}const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()-1);const r=e.filter(u=>new Date(u.timestamp)>=a),i=e.filter(u=>{const c=new Date(u.timestamp);return c<a&&c>=s}),o=e.filter(u=>new Date(u.timestamp)<s);let l="";r.length&&(l+='<div class="flex items-center gap-2 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(r)),i.length&&(l+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(i)),o.length&&(l+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(o)),this.historyContainer.innerHTML=l,document.querySelectorAll(".history-card-hover").forEach(u=>{u.addEventListener("click",c=>{const p=u.getAttribute("data-id");console.log(`Ver detalle de registro: ${p}`)})})}renderRecordGroup(e){return e.map(t=>{const a=this.getIconForType(t.type),s=this.getBgClassForType(t.type),r=this.getTextColorClassForType(t.type),i=this.getRelativeTime(t.timestamp),o=t.isPremium?`<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>`:"";return`
        <div class="history-card-hover bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 cursor-pointer" data-id="${t.id}">
          <div class="h-12 w-12 rounded-lg ${s} flex items-center justify-center ${r}">
            <span class="material-symbols-outlined">${a}</span>
          </div>
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface">${this.escapeHtml(t.title)}</h3>
                ${o}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm">${i}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px]">Paciente: ${this.escapeHtml(t.patientName)} (${t.species}, ${t.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface">${this.escapeHtml(t.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant">chevron_right</span>
        </div>
      `}).join("")}getIconForType(e){switch(e){case"dosage":return"medication";case"fluidotherapy":return"water_drop";case"anesthesia":return"vital_signs";default:return"history"}}getBgClassForType(e){switch(e){case"dosage":return"bg-secondary-container";case"fluidotherapy":return"bg-surface-container";case"anesthesia":return"bg-tertiary-container";default:return"bg-surface-container"}}getTextColorClassForType(e){switch(e){case"dosage":return"text-on-secondary-container";case"fluidotherapy":return"text-primary";case"anesthesia":return"text-on-tertiary-container";default:return"text-on-surface-variant"}}getRelativeTime(e){const a=new Date().getTime()-e.getTime(),s=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return s<1?"Justo ahora":s<60?`Hace ${s} min`:r<24?`Hace ${r} h`:i===1?"Ayer":`Hace ${i} días`}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}setActiveFilter(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.getAttribute("data-filter")===e?(a.classList.remove("bg-surface-container-high","text-on-surface-variant"),a.classList.add("bg-primary","text-on-primary","shadow-sm")):(a.classList.remove("bg-primary","text-on-primary","shadow-sm"),a.classList.add("bg-surface-container-high","text-on-surface-variant"))})}}class Ha{constructor(){b(this,"view");b(this,"allRecords",[]);b(this,"currentFilter","all");this.view=new Na}async init(){this.view.render(),this.loadMockData(),this.setupEventListeners(),this.applyFilter()}loadMockData(){const e=mt.getRecentHistory(10);this.allRecords=e.map(t=>({id:t.id,type:t.type,title:this.getTitleForType(t.type),patientName:t.patientName||"Desconocido",species:t.patientSpecies||"N/A",weightKg:t.patientWeightKg||0,timestamp:t.createdAt,summary:t.summary,detail:JSON.stringify(t.result),isPremium:t.type==="anesthesia"}))}getTitleForType(e){switch(e){case"dosage":return"Cálculo de Dosis";case"fluidotherapy":return"Fluidoterapia";case"anesthesia":return"Protocolo de Anestesia";default:return"Cálculo"}}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",async r=>{r.preventDefault();const i=s.getAttribute("data-route");i&&await O.navigate(i)})});const e=this.view.getFilterButtons();e==null||e.forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-filter")||"all";this.currentFilter=r,this.view.setActiveFilter(r),this.applyFilter()})});const t=this.view.getLoadMoreButton();t==null||t.addEventListener("click",()=>{console.log("Cargar más registros - por implementar")});const a=this.view.getSearchFab();a==null||a.addEventListener("click",()=>{console.log("Búsqueda - por implementar")})}applyFilter(){let e=[...this.allRecords];this.currentFilter!=="all"&&(e=e.filter(t=>t.type===this.currentFilter)),this.view.renderHistoryList(e,this.currentFilter)}destroy(){console.log("[HistoryController] Destroyed")}}const Va=`
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
`;class qa{constructor(){b(this,"searchInput",null);b(this,"filterButtons",null);b(this,"resourceCards",null);b(this,"resourceItems",null);b(this,"guidelineCards",null);b(this,"viewAllButtons",null);b(this,"upgradeBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Va),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.filterButtons=document.querySelectorAll(".filter-btn"),this.resourceCards=document.querySelectorAll(".resource-card"),this.resourceItems=document.querySelectorAll(".resource-item"),this.guidelineCards=document.querySelectorAll(".guideline-card"),this.viewAllButtons=document.querySelectorAll(".view-all"),this.upgradeBtn=document.getElementById("upgrade-btn")}getSearchInput(){return this.searchInput}getFilterButtons(){return this.filterButtons}getUpgradeBtn(){return this.upgradeBtn}onResourceClick(e){var t,a,s;(t=this.resourceCards)==null||t.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(a=this.resourceItems)==null||a.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(s=this.guidelineCards)==null||s.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})})}onViewAll(e){var t;(t=this.viewAllButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-section");s&&e(s)})})}onSearch(e){var t;(t=this.searchInput)==null||t.addEventListener("input",a=>{const s=a.target.value.toLowerCase();e(s)})}onFilterChange(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var r;const s=a.getAttribute("data-filter")||"all";(r=this.filterButtons)==null||r.forEach(i=>{i.classList.remove("bg-secondary","text-on-secondary"),i.classList.add("bg-surface-container-high","text-on-surface-variant")}),a.classList.remove("bg-surface-container-high","text-on-surface-variant"),a.classList.add("bg-secondary","text-on-secondary"),e(s)})})}filterResources(e){[...this.resourceCards||[],...this.resourceItems||[]].forEach(a=>{var r;const s=((r=a.textContent)==null?void 0:r.toLowerCase())||"";e===""||s.includes(e)?a.style.display="":a.style.display="none"})}animateClick(e){e.classList.add("bg-surface-container-low"),setTimeout(()=>e.classList.remove("bg-surface-container-low"),300)}}class Ua extends de{constructor(){super();b(this,"view");this.view=new qa}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners()}setupEventListeners(){this.view.onResourceClick(a=>{console.log(`[Library] Abrir recurso: ${a}`),alert(`Funcionalidad en desarrollo: ${a}`)}),this.view.onViewAll(a=>{console.log(`[Library] Ver todos: ${a}`),alert(`Mostrar todos los recursos de ${a} (simulación)`)}),this.view.onSearch(a=>{this.view.filterResources(a)}),this.view.onFilterChange(a=>{console.log(`[Library] Filtro: ${a}`),alert(`Filtro aplicado: ${a}`)});const t=this.view.getUpgradeBtn();t==null||t.addEventListener("click",()=>{O.navigate("premium")})}destroy(){this.destroyPremiumBadge(),console.log("[LibraryController] Destroyed")}}const $a=`
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min w-full z-50">
  <div class="flex items-center gap-4">
    <span class="material-symbols-outlined text-primary">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Pacientes</h1>
  </div>
  <div class="flex items-center">
    <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors duration-200" data-route="home">account_circle</button>
  </div>
  <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
</button>
</header>

<main class="px-container-padding pt-stack-md space-y-stack-lg">
  <!-- Barra de búsqueda -->
  <section class="w-full">
    <div class="relative flex items-center">
      <span class="material-symbols-outlined absolute left-4 text-outline">search</span>
      <input class="w-full h-touch-target-min pl-12 pr-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl font-body-md text-on-surface focus:border-primary focus:ring-0 transition-all" type="text" id="search-input" placeholder="Buscar pacientes, raza o propietario...">
      <button class="absolute right-2 p-2 text-primary" id="filter-btn">
        <span class="material-symbols-outlined">tune</span>
      </button>
    </div>
  </section>

  <!-- Estadísticas -->
  <section class="grid grid-cols-2 gap-4">
    <div class="bg-surface-container-low p-4 rounded-xl border-b-2 border-primary/20">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Casos activos</p>
      <p class="font-headline-xl text-headline-xl text-primary" id="active-cases">0</p>
    </div>
    <div class="bg-surface-container-low p-4 rounded-xl border-b-2 border-secondary/20">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">En cirugía</p>
      <div class="flex items-center gap-2">
        <p class="font-headline-xl text-headline-xl text-secondary" id="in-surgery">0</p>
        <span class="flex h-2 w-2 rounded-full bg-error animate-pulse"></span>
      </div>
    </div>
  </section>

  <!-- Lista de pacientes -->
  <section class="space-y-stack-md">
    <div class="flex justify-between items-center px-1">
      <h2 class="font-headline-md text-headline-md">Pacientes recientes</h2>
      <button class="font-label-md text-label-md text-primary uppercase tracking-wider" id="see-all-btn">Ver todos</button>
    </div>
    <div class="space-y-4" id="patients-list">
      <!-- Los pacientes se cargarán dinámicamente desde el controlador -->
    </div>
  </section>
</main>

<!-- Botón flotante para añadir paciente -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-transform duration-150 z-40" id="add-patient-btn">
  <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">add</span>
</button>

<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe bg-surface dark:bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50">
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="home">
    <span class="material-symbols-outlined">home</span>
    <span class="font-label-sm text-label-sm">Inicio</span>
  </button>
  <button class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 active:scale-95 transition-all duration-150" data-route="patients">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm">Pacientes</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="library">
    <span class="material-symbols-outlined">menu_book</span>
    <span class="font-label-sm text-label-sm">Biblioteca</span>
  </button>
  <button class="flex flex-col items-center justify-center text-on-surface-variant pt-2 hover:bg-surface-container-low active:scale-95 transition-all duration-150" data-route="history">
    <span class="material-symbols-outlined">history</span>
    <span class="font-label-sm text-label-sm">Historial</span>
  </button>
</nav>
`;class za{constructor(){b(this,"searchInput",null);b(this,"patientsList",null);b(this,"activeCasesSpan",null);b(this,"inSurgerySpan",null);b(this,"seeAllBtn",null);b(this,"addPatientBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=$a),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.patientsList=document.getElementById("patients-list"),this.activeCasesSpan=document.getElementById("active-cases"),this.inSurgerySpan=document.getElementById("in-surgery"),this.seeAllBtn=document.getElementById("see-all-btn"),this.addPatientBtn=document.getElementById("add-patient-btn")}getSearchInput(){return this.searchInput}getSeeAllBtn(){return this.seeAllBtn}getAddPatientBtn(){return this.addPatientBtn}updateStats(e,t){this.activeCasesSpan&&(this.activeCasesSpan.textContent=e.toString()),this.inSurgerySpan&&(this.inSurgerySpan.textContent=t.toString())}renderPatients(e,t){var a;if(this.patientsList){this.patientsList.innerHTML="";for(const s of e){const r=document.createElement("div");r.className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden",r.setAttribute("data-id",s.id);const i=(s.species==="canine"||s.species==="feline","pets"),o=s.status==="stable"?"bg-secondary-container text-on-secondary-container":s.status==="in-surgery"?"bg-error-container text-on-error-container":"bg-surface-container-highest text-on-surface-variant",l=s.status==="stable"?"Estable":s.status==="in-surgery"?"En cirugía":s.status==="critical"?"Crítico":s.status==="discharged"?"Dado de alta":"Observación";r.innerHTML=`
        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-on-primary-container">${i}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-headline-md text-headline-md leading-tight text-on-surface">${this.escapeHtml(s.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${this.escapeHtml(s.breed)}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="px-3 py-1 ${o} font-label-sm text-label-sm rounded-full">${l}</span>
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      `,r.addEventListener("click",()=>t(s.id)),(a=this.patientsList)==null||a.appendChild(r)}}}filterPatients(e,t,a){const s=t.filter(r=>r.name.toLowerCase().includes(e)||r.breed.toLowerCase().includes(e)||r.ownerName.toLowerCase().includes(e));a(s)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class Ga extends de{constructor(){super();b(this,"view");b(this,"patients",[]);this.view=new za}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.loadPatients(),this.setupEventListeners()}loadPatients(){this.patients=mt.getRecentPatients(10);const t=this.patients.filter(s=>s.status!=="discharged").length,a=this.patients.filter(s=>s.status==="in-surgery").length;this.view.updateStats(t,a),this.view.renderPatients(this.patients,s=>this.onPatientClick(s))}setupEventListeners(){const t=this.view.getSearchInput();t==null||t.addEventListener("input",r=>{const i=r.target.value.toLowerCase();this.view.filterPatients(i,this.patients,o=>{this.view.renderPatients(o,l=>this.onPatientClick(l))})});const a=this.view.getSeeAllBtn();a==null||a.addEventListener("click",()=>{alert('Funcionalidad "Ver todos" en desarrollo')});const s=this.view.getAddPatientBtn();s==null||s.addEventListener("click",()=>{alert('Funcionalidad "Añadir paciente" en desarrollo')})}onPatientClick(t){console.log(`[Patients] Ver detalle de paciente: ${t}`),alert(`Detalle del paciente (simulación) - ID: ${t}`)}destroy(){this.destroyPremiumBadge(),console.log("[PatientsController] Destroyed")}}const Wa=`
<!-- Top App Bar -->
<header class="w-full top-0 sticky bg-surface z-50 shadow-sm flex justify-between items-center px-container-padding h-touch-target-min">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary font-headline-md text-headline-md" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-headline-md text-headline-md font-bold text-primary">VetCalc</span>
  </div>
  <button class="h-touch-target-min w-touch-target-min flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors" data-route="home">
    <span class="material-symbols-outlined text-on-surface-variant">close</span>
  </button>
</header>

<main class="w-full max-w-md mx-auto px-container-padding flex flex-col py-stack-lg pb-32">
  <!-- Hero Section -->
  <section class="relative rounded-xl overflow-hidden mb-stack-lg p-6 flex flex-col items-center text-center">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-tertiary/10"></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed opacity-20 blur-3xl rounded-full"></div>
    </div>
    <div class="relative z-10 flex flex-col items-center">
      <div class="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center mb-4 glow-gold border-2 border-white">
        <span class="material-symbols-outlined text-tertiary text-4xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      </div>
      <h1 class="font-headline-xl text-headline-xl mb-2 text-on-surface">Actualiza a VetCalc Pro</h1>
      <p class="font-body-md text-body-md text-on-surface-variant">Potencia tu práctica clínica con herramientas exclusivas y sincronización en la nube.</p>
    </div>
  </section>

  <!-- Selector de precio (Mensual / Anual) -->
  <div class="flex bg-surface-container-highest p-1 rounded-full mb-stack-lg w-fit mx-auto">
    <button class="px-6 py-2 rounded-full font-label-md text-label-md transition-all bg-white shadow-sm text-primary" data-pricing="monthly" id="monthly-toggle">Mensual</button>
    <button class="px-6 py-2 rounded-full font-label-md text-label-md transition-all text-on-surface-variant" data-pricing="annual" id="annual-toggle">Anual <span class="text-secondary font-bold text-[10px] bg-secondary-container px-1 rounded ml-1">AHORRA 20%</span></button>
  </div>

  <!-- Lista de beneficios -->
  <div class="grid grid-cols-1 gap-gutter mb-stack-lg">
    <div class="glass-card p-stack-md rounded-xl flex items-start gap-4">
      <div class="p-2 bg-primary-container/20 rounded-lg">
        <span class="material-symbols-outlined text-primary">medical_services</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface">Protocolos avanzados de anestesia</h3>
        <p class="font-body-md text-[14px] text-on-surface-variant leading-tight">Motores de cálculo multidroga para casos críticos.</p>
      </div>
    </div>
    <div class="glass-card p-stack-md rounded-xl flex items-start gap-4">
      <div class="p-2 bg-primary-container/20 rounded-lg">
        <span class="material-symbols-outlined text-primary">groups</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface">Perfiles de pacientes ilimitados</h3>
        <p class="font-body-md text-[14px] text-on-surface-variant leading-tight">Almacena historiales completos de cada animal en tu clínica.</p>
      </div>
    </div>
    <div class="glass-card p-stack-md rounded-xl flex items-start gap-4">
      <div class="p-2 bg-primary-container/20 rounded-lg">
        <span class="material-symbols-outlined text-primary">library_books</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface">Biblioteca offline</h3>
        <p class="font-body-md text-[14px] text-on-surface-variant leading-tight">Accede a datos clínicos vitales incluso sin conexión a internet.</p>
      </div>
    </div>
    <div class="glass-card p-stack-md rounded-xl flex items-start gap-4">
      <div class="p-2 bg-primary-container/20 rounded-lg">
        <span class="material-symbols-outlined text-primary">cloud_sync</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface">Sincronización en la nube</h3>
        <p class="font-body-md text-[14px] text-on-surface-variant leading-tight">Consistencia de datos al instante entre teléfono, tablet y ordenador.</p>
      </div>
    </div>
  </div>

  <!-- Imagen contextual -->
  <div class="w-full h-48 rounded-2xl overflow-hidden mb-stack-lg shadow-sm border border-outline-variant relative">
    <img alt="Veterinaria usando tablet" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkbkAguNth1lJ6_j-_dJMR0BI_pEc_oSbGiFFp3Ey0hdidWodxUtx6l-d2oZwumRwV-XBxIM3eJ3bs5c1SPZ3AjXgIgcvYZjFBZaF2AGh346McVY8beJeJp6E5LaxbYWmmPE40ksJ2jLHCBEe6homzBz4Po6i6DkVLk5YEWPPFCrN6ILIWcW6XbakQ7rjVgArB3IGfqQcGOdyuQJ-a652ki1RvXKddwOJL2AD9VvMBE0abw-KrFMekidrWgLGj6AZVCR2BaPqQB5hm" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
      <span class="text-white font-label-md text-label-md italic">Usado por más de 5,000 clínicas veterinarias en todo el mundo</span>
    </div>
  </div>
</main>

<!-- Barra inferior de compra -->
<div class="fixed bottom-0 left-0 right-0 p-container-padding bg-surface shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-outline-variant z-[100] max-w-md mx-auto w-full">
  <div class="flex items-center justify-between mb-4">
    <div>
      <span class="font-headline-md text-headline-md font-bold text-on-surface" id="pricing-label">$9.99</span>
      <span class="font-body-md text-on-surface-variant" id="pricing-period">/ mes</span>
    </div>
    <div class="text-right">
      <p class="font-label-sm text-label-sm text-secondary">Cancela en cualquier momento</p>
    </div>
  </div>
  <button class="w-full h-touch-target-min bg-primary text-on-primary rounded-xl font-headline-md text-headline-md font-bold shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2" id="upgrade-btn">
    Mejorar a Pro
    <span class="material-symbols-outlined">arrow_forward</span>
  </button>
  <p class="text-center mt-3 font-label-sm text-label-sm text-on-surface-variant" id="restore-btn" style="cursor: pointer;">Restaurar compra</p>
</div>
`;class Ya{constructor(){b(this,"monthlyBtn",null);b(this,"annualBtn",null);b(this,"pricingLabel",null);b(this,"pricingPeriod",null);b(this,"upgradeBtn",null);b(this,"restoreBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Wa),this.cacheElements()}cacheElements(){this.monthlyBtn=document.getElementById("monthly-toggle"),this.annualBtn=document.getElementById("annual-toggle"),this.pricingLabel=document.getElementById("pricing-label"),this.pricingPeriod=document.getElementById("pricing-period"),this.upgradeBtn=document.getElementById("upgrade-btn"),this.restoreBtn=document.getElementById("restore-btn")}getMonthlyBtn(){return this.monthlyBtn}getAnnualBtn(){return this.annualBtn}getPricingLabel(){return this.pricingLabel}getPricingPeriod(){return this.pricingPeriod}getUpgradeBtn(){return this.upgradeBtn}getRestoreBtn(){return this.restoreBtn}setMonthlyActive(){var e,t,a,s;(e=this.monthlyBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.monthlyBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.annualBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.annualBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$9.99"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ mes")}setAnnualActive(){var e,t,a,s;(e=this.annualBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.annualBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.monthlyBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.monthlyBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$95.88"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ año")}}class Ja{constructor(){b(this,"view");this.view=new Ya}async init(){this.view.render(),this.setupNavigation(),this.setupEventListeners()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await O.navigate(a)})})}setupEventListeners(){const e=this.view.getMonthlyBtn(),t=this.view.getAnnualBtn();e==null||e.addEventListener("click",()=>this.view.setMonthlyActive()),t==null||t.addEventListener("click",()=>this.view.setAnnualActive());const a=this.view.getUpgradeBtn();a==null||a.addEventListener("click",()=>{alert("Funcionalidad de pago en desarrollo. Esta es una simulación."),console.log("Iniciar proceso de suscripción Pro")});const s=this.view.getRestoreBtn();s==null||s.addEventListener("click",()=>{alert("Restauración de compra simulada"),console.log("Restaurar compra")})}destroy(){console.log("[PremiumController] Destroyed")}}const Qa=`
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
`;class Xa{constructor(){b(this,"emailInput",null);b(this,"passwordInput",null);b(this,"loginBtn",null);b(this,"registerLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Qa),this.cacheElements()}cacheElements(){this.emailInput=document.getElementById("login-email"),this.passwordInput=document.getElementById("login-password"),this.loginBtn=document.getElementById("login-btn"),this.registerLink=document.getElementById("go-to-register")}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}onLoginClick(e){var t;(t=this.loginBtn)==null||t.addEventListener("click",e)}onRegisterLinkClick(e){var t;(t=this.registerLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}const R=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,M=Object.keys,H=Array.isArray;function U(n,e){return typeof e!="object"||M(e).forEach(function(t){n[t]=e[t]}),n}typeof Promise>"u"||R.Promise||(R.Promise=Promise);const qe=Object.getPrototypeOf,Za={}.hasOwnProperty;function G(n,e){return Za.call(n,e)}function Se(n,e){typeof e=="function"&&(e=e(qe(n))),(typeof Reflect>"u"?M:Reflect.ownKeys)(e).forEach(t=>{ne(n,t,e[t])})}const jn=Object.defineProperty;function ne(n,e,t,a){jn(n,e,U(t&&G(t,"get")&&typeof t.get=="function"?{get:t.get,set:t.set,configurable:!0}:{value:t,configurable:!0,writable:!0},a))}function Be(n){return{from:function(e){return n.prototype=Object.create(e.prototype),ne(n.prototype,"constructor",n),{extend:Se.bind(null,n.prototype)}}}}const es=Object.getOwnPropertyDescriptor;function rn(n,e){let t;return es(n,e)||(t=qe(n))&&rn(t,e)}const ts=[].slice;function ft(n,e,t){return ts.call(n,e,t)}function Mn(n,e){return e(n)}function je(n){if(!n)throw new Error("Assertion Failed")}function Fn(n){R.setImmediate?setImmediate(n):setTimeout(n,0)}function On(n,e){return n.reduce((t,a,s)=>{var r=e(a,s);return r&&(t[r[0]]=r[1]),t},{})}function ae(n,e){if(typeof e=="string"&&G(n,e))return n[e];if(!e)return n;if(typeof e!="string"){for(var t=[],a=0,s=e.length;a<s;++a){var r=ae(n,e[a]);t.push(r)}return t}var i=e.indexOf(".");if(i!==-1){var o=n[e.substr(0,i)];return o==null?void 0:ae(o,e.substr(i+1))}}function W(n,e,t){if(n&&e!==void 0&&(!("isFrozen"in Object)||!Object.isFrozen(n)))if(typeof e!="string"&&"length"in e){je(typeof t!="string"&&"length"in t);for(var a=0,s=e.length;a<s;++a)W(n,e[a],t[a])}else{var r=e.indexOf(".");if(r!==-1){var i=e.substr(0,r),o=e.substr(r+1);if(o==="")t===void 0?H(n)&&!isNaN(parseInt(i))?n.splice(i,1):delete n[i]:n[i]=t;else{var l=n[i];l&&G(n,i)||(l=n[i]={}),W(l,o,t)}}else t===void 0?H(n)&&!isNaN(parseInt(e))?n.splice(e,1):delete n[e]:n[e]=t}}function Kn(n){var e={};for(var t in n)G(n,t)&&(e[t]=n[t]);return e}const ns=[].concat;function Nn(n){return ns.apply([],n)}const Hn="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(Nn([8,16,32,64].map(n=>["Int","Uint","Float"].map(e=>e+n+"Array")))).filter(n=>R[n]),as=Hn.map(n=>R[n]);On(Hn,n=>[n,!0]);let ie=null;function Je(n){ie=typeof WeakMap<"u"&&new WeakMap;const e=Tt(n);return ie=null,e}function Tt(n){if(!n||typeof n!="object")return n;let e=ie&&ie.get(n);if(e)return e;if(H(n)){e=[],ie&&ie.set(n,e);for(var t=0,a=n.length;t<a;++t)e.push(Tt(n[t]))}else if(as.indexOf(n.constructor)>=0)e=n;else{const r=qe(n);for(var s in e=r===Object.prototype?{}:Object.create(r),ie&&ie.set(n,e),n)G(n,s)&&(e[s]=Tt(n[s]))}return e}const{toString:ss}={};function jt(n){return ss.call(n).slice(8,-1)}const Mt=typeof Symbol<"u"?Symbol.iterator:"@@iterator",rs=typeof Mt=="symbol"?function(n){var e;return n!=null&&(e=n[Mt])&&e.apply(n)}:function(){return null},Ie={};function ee(n){var e,t,a,s;if(arguments.length===1){if(H(n))return n.slice();if(this===Ie&&typeof n=="string")return[n];if(s=rs(n)){for(t=[];!(a=s.next()).done;)t.push(a.value);return t}if(n==null)return[n];if(typeof(e=n.length)=="number"){for(t=new Array(e);e--;)t[e]=n[e];return t}return[n]}for(e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return t}const on=typeof Symbol<"u"?n=>n[Symbol.toStringTag]==="AsyncFunction":()=>!1;var J=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Vn(n,e){J=n,qn=e}var qn=()=>!0;const is=!new Error("").stack;function xe(){if(is)try{throw xe.arguments,new Error}catch(n){return n}return new Error}function Ft(n,e){var t=n.stack;return t?(e=e||0,t.indexOf(n.name)===0&&(e+=(n.name+n.message).split(`
`).length),t.split(`
`).slice(e).filter(qn).map(a=>`
`+a).join("")):""}var Un=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],ln=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(Un),os={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Pe(n,e){this._e=xe(),this.name=n,this.message=e}function $n(n,e){return n+". Errors: "+Object.keys(e).map(t=>e[t].toString()).filter((t,a,s)=>s.indexOf(t)===a).join(`
`)}function gt(n,e,t,a){this._e=xe(),this.failures=e,this.failedKeys=a,this.successCount=t,this.message=$n(n,e)}function Fe(n,e){this._e=xe(),this.name="BulkError",this.failures=Object.keys(e).map(t=>e[t]),this.failuresByPos=e,this.message=$n(n,e)}Be(Pe).from(Error).extend({stack:{get:function(){return this._stack||(this._stack=this.name+": "+this.message+Ft(this._e,2))}},toString:function(){return this.name+": "+this.message}}),Be(gt).from(Pe),Be(Fe).from(Pe);var cn=ln.reduce((n,e)=>(n[e]=e+"Error",n),{});const ls=Pe;var P=ln.reduce((n,e)=>{var t=e+"Error";function a(s,r){this._e=xe(),this.name=t,s?typeof s=="string"?(this.message=`${s}${r?`
 `+r:""}`,this.inner=r||null):typeof s=="object"&&(this.message=`${s.name} ${s.message}`,this.inner=s):(this.message=os[e]||t,this.inner=null)}return Be(a).from(ls),n[e]=a,n},{});P.Syntax=SyntaxError,P.Type=TypeError,P.Range=RangeError;var _n=Un.reduce((n,e)=>(n[e+"Error"]=P[e],n),{}),ot=ln.reduce((n,e)=>(["Syntax","Type","Range"].indexOf(e)===-1&&(n[e+"Error"]=P[e]),n),{});function A(){}function Ue(n){return n}function cs(n,e){return n==null||n===Ue?e:function(t){return e(n(t))}}function ve(n,e){return function(){n.apply(this,arguments),e.apply(this,arguments)}}function us(n,e){return n===A?e:function(){var t=n.apply(this,arguments);t!==void 0&&(arguments[0]=t);var a=this.onsuccess,s=this.onerror;this.onsuccess=null,this.onerror=null;var r=e.apply(this,arguments);return a&&(this.onsuccess=this.onsuccess?ve(a,this.onsuccess):a),s&&(this.onerror=this.onerror?ve(s,this.onerror):s),r!==void 0?r:t}}function ds(n,e){return n===A?e:function(){n.apply(this,arguments);var t=this.onsuccess,a=this.onerror;this.onsuccess=this.onerror=null,e.apply(this,arguments),t&&(this.onsuccess=this.onsuccess?ve(t,this.onsuccess):t),a&&(this.onerror=this.onerror?ve(a,this.onerror):a)}}function ps(n,e){return n===A?e:function(t){var a=n.apply(this,arguments);U(t,a);var s=this.onsuccess,r=this.onerror;this.onsuccess=null,this.onerror=null;var i=e.apply(this,arguments);return s&&(this.onsuccess=this.onsuccess?ve(s,this.onsuccess):s),r&&(this.onerror=this.onerror?ve(r,this.onerror):r),a===void 0?i===void 0?void 0:i:U(a,i)}}function hs(n,e){return n===A?e:function(){return e.apply(this,arguments)!==!1&&n.apply(this,arguments)}}function un(n,e){return n===A?e:function(){var t=n.apply(this,arguments);if(t&&typeof t.then=="function"){for(var a=this,s=arguments.length,r=new Array(s);s--;)r[s]=arguments[s];return t.then(function(){return e.apply(a,r)})}return e.apply(this,arguments)}}ot.ModifyError=gt,ot.DexieError=Pe,ot.BulkError=Fe;var $e={};const zn=100,[Ot,bt,Kt]=typeof Promise>"u"?[]:(()=>{let n=Promise.resolve();if(typeof crypto>"u"||!crypto.subtle)return[n,qe(n),n];const e=crypto.subtle.digest("SHA-512",new Uint8Array([0]));return[e,qe(e),n]})(),Gn=bt&&bt.then,lt=Ot&&Ot.constructor,dn=!!Kt;var Nt=!1,ms=Kt?()=>{Kt.then(Ze)}:R.setImmediate?setImmediate.bind(null,Ze):R.MutationObserver?()=>{var n=document.createElement("div");new MutationObserver(()=>{Ze(),n=null}).observe(n,{attributes:!0}),n.setAttribute("i","1")}:()=>{setTimeout(Ze,0)},Oe=function(n,e){Me.push([n,e]),vt&&(ms(),vt=!1)},Ht=!0,vt=!0,fe=[],ct=[],Vt=null,qt=Ue,Ce={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:In,pgp:!1,env:{},finalize:function(){this.unhandleds.forEach(n=>{try{In(n[0],n[1])}catch{}})}},B=Ce,Me=[],ge=0,ut=[];function I(n){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this.onuncatched=A,this._lib=!1;var e=this._PSD=B;if(J&&(this._stackHolder=xe(),this._prev=null,this._numPrev=0),typeof n!="function"){if(n!==$e)throw new TypeError("Not a function");return this._state=arguments[1],this._value=arguments[2],void(this._state===!1&&$t(this,this._value))}this._state=null,this._value=null,++e.ref,Yn(this,n)}const Ut={get:function(){var n=B,e=yt;function t(a,s){var r=!n.global&&(n!==B||e!==yt);const i=r&&!se();var o=new I((l,u)=>{pn(this,new Wn(xt(a,n,r,i),xt(s,n,r,i),l,u,n))});return J&&Xn(o,this),o}return t.prototype=$e,t},set:function(n){ne(this,"then",n&&n.prototype===$e?Ut:{get:function(){return n},set:Ut.set})}};function Wn(n,e,t,a,s){this.onFulfilled=typeof n=="function"?n:null,this.onRejected=typeof e=="function"?e:null,this.resolve=t,this.reject=a,this.psd=s}function Yn(n,e){try{e(t=>{if(n._state===null){if(t===n)throw new TypeError("A promise cannot be resolved with itself.");var a=n._lib&&Qe();t&&typeof t.then=="function"?Yn(n,(s,r)=>{t instanceof I?t._then(s,r):t.then(s,r)}):(n._state=!0,n._value=t,Jn(n)),a&&Xe()}},$t.bind(null,n))}catch(t){$t(n,t)}}function $t(n,e){if(ct.push(e),n._state===null){var t=n._lib&&Qe();e=qt(e),n._state=!1,n._value=e,J&&e!==null&&typeof e=="object"&&!e._promise&&function(a,s,r){try{a.apply(null,r)}catch{}}(()=>{var a=rn(e,"stack");e._promise=n,ne(e,"stack",{get:()=>Nt?a&&(a.get?a.get.apply(e):a.value):n.stack})}),function(a){fe.some(s=>s._value===a._value)||fe.push(a)}(n),Jn(n),t&&Xe()}}function Jn(n){var e=n._listeners;n._listeners=[];for(var t=0,a=e.length;t<a;++t)pn(n,e[t]);var s=n._PSD;--s.ref||s.finalize(),ge===0&&(++ge,Oe(()=>{--ge==0&&hn()},[]))}function pn(n,e){if(n._state!==null){var t=n._state?e.onFulfilled:e.onRejected;if(t===null)return(n._state?e.resolve:e.reject)(n._value);++e.psd.ref,++ge,Oe(fs,[t,n,e])}else n._listeners.push(e)}function fs(n,e,t){try{Vt=e;var a,s=e._value;e._state?a=n(s):(ct.length&&(ct=[]),a=n(s),ct.indexOf(s)===-1&&function(r){for(var i=fe.length;i;)if(fe[--i]._value===r._value)return void fe.splice(i,1)}(e)),t.resolve(a)}catch(r){t.reject(r)}finally{Vt=null,--ge==0&&hn(),--t.psd.ref||t.psd.finalize()}}function Qn(n,e,t){if(e.length===t)return e;var a="";if(n._state===!1){var s,r,i=n._value;i!=null?(s=i.name||"Error",r=i.message||i,a=Ft(i,0)):(s=i,r=""),e.push(s+(r?": "+r:"")+a)}return J&&((a=Ft(n._stackHolder,2))&&e.indexOf(a)===-1&&e.push(a),n._prev&&Qn(n._prev,e,t)),e}function Xn(n,e){var t=e?e._numPrev+1:0;t<100&&(n._prev=e,n._numPrev=t)}function Ze(){Qe()&&Xe()}function Qe(){var n=Ht;return Ht=!1,vt=!1,n}function Xe(){var n,e,t;do for(;Me.length>0;)for(n=Me,Me=[],t=n.length,e=0;e<t;++e){var a=n[e];a[0].apply(null,a[1])}while(Me.length>0);Ht=!0,vt=!0}function hn(){var n=fe;fe=[],n.forEach(a=>{a._PSD.onunhandled.call(null,a._value,a)});for(var e=ut.slice(0),t=e.length;t;)e[--t]()}function et(n){return new I($e,!1,n)}function D(n,e){var t=B;return function(){var a=Qe(),s=B;try{return ce(t,!0),n.apply(this,arguments)}catch(r){e&&e(r)}finally{ce(s,!1),a&&Xe()}}}Se(I.prototype,{then:Ut,_then:function(n,e){pn(this,new Wn(null,null,n,e,B))},catch:function(n){if(arguments.length===1)return this.then(null,n);var e=arguments[0],t=arguments[1];return typeof e=="function"?this.then(null,a=>a instanceof e?t(a):et(a)):this.then(null,a=>a&&a.name===e?t(a):et(a))},finally:function(n){return this.then(e=>(n(),e),e=>(n(),et(e)))},stack:{get:function(){if(this._stack)return this._stack;try{Nt=!0;var n=Qn(this,[],20).join(`
From previous: `);return this._state!==null&&(this._stack=n),n}finally{Nt=!1}}},timeout:function(n,e){return n<1/0?new I((t,a)=>{var s=setTimeout(()=>a(new P.Timeout(e)),n);this.then(t,a).finally(clearTimeout.bind(null,s))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&ne(I.prototype,Symbol.toStringTag,"Dexie.Promise"),Ce.env=Zn(),Se(I,{all:function(){var n=ee.apply(null,arguments).map(tt);return new I(function(e,t){n.length===0&&e([]);var a=n.length;n.forEach((s,r)=>I.resolve(s).then(i=>{n[r]=i,--a||e(n)},t))})},resolve:n=>{if(n instanceof I)return n;if(n&&typeof n.then=="function")return new I((t,a)=>{n.then(t,a)});var e=new I($e,!0,n);return Xn(e,Vt),e},reject:et,race:function(){var n=ee.apply(null,arguments).map(tt);return new I((e,t)=>{n.map(a=>I.resolve(a).then(e,t))})},PSD:{get:()=>B,set:n=>B=n},totalEchoes:{get:()=>yt},newPSD:le,usePSD:Re,scheduler:{get:()=>Oe,set:n=>{Oe=n}},rejectionMapper:{get:()=>qt,set:n=>{qt=n}},follow:(n,e)=>new I((t,a)=>le((s,r)=>{var i=B;i.unhandleds=[],i.onunhandled=r,i.finalize=ve(function(){(function(o){function l(){o(),ut.splice(ut.indexOf(l),1)}ut.push(l),++ge,Oe(()=>{--ge==0&&hn()},[])})(()=>{this.unhandleds.length===0?s():r(this.unhandleds[0])})},i.finalize),n()},e,t,a))}),lt&&(lt.allSettled&&ne(I,"allSettled",function(){const n=ee.apply(null,arguments).map(tt);return new I(e=>{n.length===0&&e([]);let t=n.length;const a=new Array(t);n.forEach((s,r)=>I.resolve(s).then(i=>a[r]={status:"fulfilled",value:i},i=>a[r]={status:"rejected",reason:i}).then(()=>--t||e(a)))})}),lt.any&&typeof AggregateError<"u"&&ne(I,"any",function(){const n=ee.apply(null,arguments).map(tt);return new I((e,t)=>{n.length===0&&t(new AggregateError([]));let a=n.length;const s=new Array(a);n.forEach((r,i)=>I.resolve(r).then(o=>e(o),o=>{s[i]=o,--a||t(new AggregateError(s))}))})}));const N={awaits:0,echoes:0,id:0};var gs=0,dt=[],Bt=0,yt=0,bs=0;function le(n,e,t,a){var s=B,r=Object.create(s);r.parent=s,r.ref=0,r.global=!1,r.id=++bs;var i=Ce.env;r.env=dn?{Promise:I,PromiseProp:{value:I,configurable:!0,writable:!0},all:I.all,race:I.race,allSettled:I.allSettled,any:I.any,resolve:I.resolve,reject:I.reject,nthen:En(i.nthen,r),gthen:En(i.gthen,r)}:{},e&&U(r,e),++s.ref,r.finalize=function(){--this.parent.ref||this.parent.finalize()};var o=Re(r,n,t,a);return r.ref===0&&r.finalize(),o}function Ae(){return N.id||(N.id=++gs),++N.awaits,N.echoes+=zn,N.id}function se(){return!!N.awaits&&(--N.awaits==0&&(N.id=0),N.echoes=N.awaits*zn,!0)}function tt(n){return N.echoes&&n&&n.constructor===lt?(Ae(),n.then(e=>(se(),e),e=>(se(),F(e)))):n}function vs(n){++yt,N.echoes&&--N.echoes!=0||(N.echoes=N.id=0),dt.push(B),ce(n,!0)}function ys(){var n=dt[dt.length-1];dt.pop(),ce(n,!1)}function ce(n,e){var t=B;if((e?!N.echoes||Bt++&&n===B:!Bt||--Bt&&n===B)||ea(e?vs.bind(null,n):ys),n!==B&&(B=n,t===Ce&&(Ce.env=Zn()),dn)){var a=Ce.env.Promise,s=n.env;bt.then=s.nthen,a.prototype.then=s.gthen,(t.global||n.global)&&(Object.defineProperty(R,"Promise",s.PromiseProp),a.all=s.all,a.race=s.race,a.resolve=s.resolve,a.reject=s.reject,s.allSettled&&(a.allSettled=s.allSettled),s.any&&(a.any=s.any))}}function Zn(){var n=R.Promise;return dn?{Promise:n,PromiseProp:Object.getOwnPropertyDescriptor(R,"Promise"),all:n.all,race:n.race,allSettled:n.allSettled,any:n.any,resolve:n.resolve,reject:n.reject,nthen:bt.then,gthen:n.prototype.then}:{}}function Re(n,e,t,a,s){var r=B;try{return ce(n,!0),e(t,a,s)}finally{ce(r,!1)}}function ea(n){Gn.call(Ot,n)}function xt(n,e,t,a){return typeof n!="function"?n:function(){var s=B;t&&Ae(),ce(e,!0);try{return n.apply(this,arguments)}finally{ce(s,!1),a&&ea(se)}}}function En(n,e){return function(t,a){return n.call(this,xt(t,e),xt(a,e))}}(""+Gn).indexOf("[native code]")===-1&&(Ae=se=A);const kn="unhandledrejection";function In(n,e){var t;try{t=e.onuncatched(n)}catch{}if(t!==!1)try{var a,s={promise:e,reason:n};if(R.document&&document.createEvent?((a=document.createEvent("Event")).initEvent(kn,!0,!0),U(a,s)):R.CustomEvent&&U(a=new CustomEvent(kn,{detail:s}),s),a&&R.dispatchEvent&&(dispatchEvent(a),!R.PromiseRejectionEvent&&R.onunhandledrejection))try{R.onunhandledrejection(a)}catch{}J&&a&&!a.defaultPrevented&&console.warn(`Unhandled rejection: ${n.stack||n}`)}catch{}}var F=I.reject;function zt(n,e,t,a){if(n.idbdb&&(n._state.openComplete||B.letThrough||n._vip)){var s=n._createTransaction(e,t,n._dbSchema);try{s.create(),n._state.PR1398_maxLoop=3}catch(r){return r.name===cn.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>zt(n,e,t,a))):F(r)}return s._promise(e,(r,i)=>le(()=>(B.trans=s,a(r,i,s)))).then(r=>s._completion.then(()=>r))}if(n._state.openComplete)return F(new P.DatabaseClosed(n._state.dbOpenError));if(!n._state.isBeingOpened){if(!n._options.autoOpen)return F(new P.DatabaseClosed);n.open().catch(A)}return n._state.dbReadyPromise.then(()=>zt(n,e,t,a))}const Ln="3.2.7",me="￿",Gt=-1/0,Q="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",ta="String expected.",Ke=[],Et=typeof navigator<"u"&&/(MSIE|Trident|Edge)/.test(navigator.userAgent),xs=Et,ws=Et,na=n=>!/(dexie\.js|dexie\.min\.js)/.test(n),kt="__dbnames",Pt="readonly",Ct="readwrite";function ye(n,e){return n?e?function(){return n.apply(this,arguments)&&e.apply(this,arguments)}:n:e}const aa={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function nt(n){return typeof n!="string"||/\./.test(n)?e=>e:e=>(e[n]===void 0&&n in e&&delete(e=Je(e))[n],e)}class _s{_trans(e,t,a){const s=this._tx||B.trans,r=this.name;function i(l,u,c){if(!c.schema[r])throw new P.NotFound("Table "+r+" not part of transaction");return t(c.idbtrans,c)}const o=Qe();try{return s&&s.db===this.db?s===B.trans?s._promise(e,i,a):le(()=>s._promise(e,i,a),{trans:s,transless:B.transless||B}):zt(this.db,e,[this.name],i)}finally{o&&Xe()}}get(e,t){return e&&e.constructor===Object?this.where(e).first(t):this._trans("readonly",a=>this.core.get({trans:a,key:e}).then(s=>this.hook.reading.fire(s))).then(t)}where(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(H(e))return new this.db.WhereClause(this,`[${e.join("+")}]`);const t=M(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);const a=this.schema.indexes.concat(this.schema.primKey).filter(u=>{if(u.compound&&t.every(c=>u.keyPath.indexOf(c)>=0)){for(let c=0;c<t.length;++c)if(t.indexOf(u.keyPath[c])===-1)return!1;return!0}return!1}).sort((u,c)=>u.keyPath.length-c.keyPath.length)[0];if(a&&this.db._maxKey!==me){const u=a.keyPath.slice(0,t.length);return this.where(u).equals(u.map(c=>e[c]))}!a&&J&&console.warn(`The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${t.join("+")}]`);const{idxByName:s}=this.schema,r=this.db._deps.indexedDB;function i(u,c){try{return r.cmp(u,c)===0}catch{return!1}}const[o,l]=t.reduce(([u,c],p)=>{const d=s[p],m=e[p];return[u||d,u||!d?ye(c,d&&d.multi?v=>{const g=ae(v,p);return H(g)&&g.some(y=>i(m,y))}:v=>i(m,ae(v,p))):c]},[null,null]);return o?this.where(o.name).equals(e[o.keyPath]).filter(l):a?this.filter(l):this.where(t).equals("")}filter(e){return this.toCollection().and(e)}count(e){return this.toCollection().count(e)}offset(e){return this.toCollection().offset(e)}limit(e){return this.toCollection().limit(e)}each(e){return this.toCollection().each(e)}toArray(e){return this.toCollection().toArray(e)}toCollection(){return new this.db.Collection(new this.db.WhereClause(this))}orderBy(e){return new this.db.Collection(new this.db.WhereClause(this,H(e)?`[${e.join("+")}]`:e))}reverse(){return this.toCollection().reverse()}mapToClass(e){this.schema.mappedClass=e;const t=a=>{if(!a)return a;const s=Object.create(e.prototype);for(var r in a)if(G(a,r))try{s[r]=a[r]}catch{}return s};return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=t,this.hook("reading",t),e}defineClass(){return this.mapToClass(function(e){U(this,e)})}add(e,t){const{auto:a,keyPath:s}=this.schema.primKey;let r=e;return s&&a&&(r=nt(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"add",keys:t!=null?[t]:null,values:[r]})).then(i=>i.numFailures?I.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{W(e,s,i)}catch{}return i})}update(e,t){if(typeof e!="object"||H(e))return this.where(":id").equals(e).modify(t);{const a=ae(e,this.schema.primKey.keyPath);if(a===void 0)return F(new P.InvalidArgument("Given object does not contain its primary key"));try{typeof t!="function"?M(t).forEach(s=>{W(e,s,t[s])}):t(e,{value:e,primKey:a})}catch{}return this.where(":id").equals(a).modify(t)}}put(e,t){const{auto:a,keyPath:s}=this.schema.primKey;let r=e;return s&&a&&(r=nt(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"put",values:[r],keys:t!=null?[t]:null})).then(i=>i.numFailures?I.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{W(e,s,i)}catch{}return i})}delete(e){return this._trans("readwrite",t=>this.core.mutate({trans:t,type:"delete",keys:[e]})).then(t=>t.numFailures?I.reject(t.failures[0]):void 0)}clear(){return this._trans("readwrite",e=>this.core.mutate({trans:e,type:"deleteRange",range:aa})).then(e=>e.numFailures?I.reject(e.failures[0]):void 0)}bulkGet(e){return this._trans("readonly",t=>this.core.getMany({keys:e,trans:t}).then(a=>a.map(s=>this.hook.reading.fire(s))))}bulkAdd(e,t,a){const s=Array.isArray(t)?t:void 0,r=(a=a||(s?void 0:t))?a.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&s)throw new P.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new P.InvalidArgument("Arguments objects and keys must have the same length");const u=e.length;let c=l&&o?e.map(nt(l)):e;return this.core.mutate({trans:i,type:"add",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:d,lastResult:m,failures:v})=>{if(p===0)return r?d:m;throw new Fe(`${this.name}.bulkAdd(): ${p} of ${u} operations failed`,v)})})}bulkPut(e,t,a){const s=Array.isArray(t)?t:void 0,r=(a=a||(s?void 0:t))?a.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&s)throw new P.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new P.InvalidArgument("Arguments objects and keys must have the same length");const u=e.length;let c=l&&o?e.map(nt(l)):e;return this.core.mutate({trans:i,type:"put",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:d,lastResult:m,failures:v})=>{if(p===0)return r?d:m;throw new Fe(`${this.name}.bulkPut(): ${p} of ${u} operations failed`,v)})})}bulkDelete(e){const t=e.length;return this._trans("readwrite",a=>this.core.mutate({trans:a,type:"delete",keys:e})).then(({numFailures:a,lastResult:s,failures:r})=>{if(a===0)return s;throw new Fe(`${this.name}.bulkDelete(): ${a} of ${t} operations failed`,r)})}}function Ne(n){var e={},t=function(i,o){if(o){for(var l=arguments.length,u=new Array(l-1);--l;)u[l-1]=arguments[l];return e[i].subscribe.apply(null,u),n}if(typeof i=="string")return e[i]};t.addEventType=r;for(var a=1,s=arguments.length;a<s;++a)r(arguments[a]);return t;function r(i,o,l){if(typeof i!="object"){var u;o||(o=hs),l||(l=A);var c={subscribers:[],fire:l,subscribe:function(p){c.subscribers.indexOf(p)===-1&&(c.subscribers.push(p),c.fire=o(c.fire,p))},unsubscribe:function(p){c.subscribers=c.subscribers.filter(function(d){return d!==p}),c.fire=c.subscribers.reduce(o,l)}};return e[i]=t[i]=c,c}M(u=i).forEach(function(p){var d=u[p];if(H(d))r(p,u[p][0],u[p][1]);else{if(d!=="asap")throw new P.InvalidArgument("Invalid event config");var m=r(p,Ue,function(){for(var v=arguments.length,g=new Array(v);v--;)g[v]=arguments[v];m.subscribers.forEach(function(y){Fn(function(){y.apply(null,g)})})})}})}}function Te(n,e){return Be(e).from({prototype:n}),e}function Ee(n,e){return!(n.filter||n.algorithm||n.or)&&(e?n.justLimit:!n.replayFilter)}function St(n,e){n.filter=ye(n.filter,e)}function At(n,e,t){var a=n.replayFilter;n.replayFilter=a?()=>ye(a(),e()):e,n.justLimit=t&&!a}function pt(n,e){if(n.isPrimKey)return e.primaryKey;const t=e.getIndexByKeyPath(n.index);if(!t)throw new P.Schema("KeyPath "+n.index+" on object store "+e.name+" is not indexed");return t}function Bn(n,e,t){const a=pt(n,e.schema);return e.openCursor({trans:t,values:!n.keysOnly,reverse:n.dir==="prev",unique:!!n.unique,query:{index:a,range:n.range}})}function at(n,e,t,a){const s=n.replayFilter?ye(n.filter,n.replayFilter()):n.filter;if(n.or){const r={},i=(o,l,u)=>{if(!s||s(l,u,d=>l.stop(d),d=>l.fail(d))){var c=l.primaryKey,p=""+c;p==="[object ArrayBuffer]"&&(p=""+new Uint8Array(c)),G(r,p)||(r[p]=!0,e(o,l,u))}};return Promise.all([n.or._iterate(i,t),Pn(Bn(n,a,t),n.algorithm,i,!n.keysOnly&&n.valueMapper)])}return Pn(Bn(n,a,t),ye(n.algorithm,s),e,!n.keysOnly&&n.valueMapper)}function Pn(n,e,t,a){var s=D(a?(r,i,o)=>t(a(r),i,o):t);return n.then(r=>{if(r)return r.start(()=>{var i=()=>r.continue();e&&!e(r,o=>i=o,o=>{r.stop(o),i=A},o=>{r.fail(o),i=A})||s(r.value,r,o=>i=o),i()})})}function q(n,e){try{const t=Cn(n),a=Cn(e);if(t!==a)return t==="Array"?1:a==="Array"?-1:t==="binary"?1:a==="binary"?-1:t==="string"?1:a==="string"?-1:t==="Date"?1:a!=="Date"?NaN:-1;switch(t){case"number":case"Date":case"string":return n>e?1:n<e?-1:0;case"binary":return function(s,r){const i=s.length,o=r.length,l=i<o?i:o;for(let u=0;u<l;++u)if(s[u]!==r[u])return s[u]<r[u]?-1:1;return i===o?0:i<o?-1:1}(Sn(n),Sn(e));case"Array":return function(s,r){const i=s.length,o=r.length,l=i<o?i:o;for(let u=0;u<l;++u){const c=q(s[u],r[u]);if(c!==0)return c}return i===o?0:i<o?-1:1}(n,e)}}catch{}return NaN}function Cn(n){const e=typeof n;if(e!=="object")return e;if(ArrayBuffer.isView(n))return"binary";const t=jt(n);return t==="ArrayBuffer"?"binary":t}function Sn(n){return n instanceof Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(n)}class Es{_read(e,t){var a=this._ctx;return a.error?a.table._trans(null,F.bind(null,a.error)):a.table._trans("readonly",e).then(t)}_write(e){var t=this._ctx;return t.error?t.table._trans(null,F.bind(null,t.error)):t.table._trans("readwrite",e,"locked")}_addAlgorithm(e){var t=this._ctx;t.algorithm=ye(t.algorithm,e)}_iterate(e,t){return at(this._ctx,e,t,this._ctx.table.core)}clone(e){var t=Object.create(this.constructor.prototype),a=Object.create(this._ctx);return e&&U(a,e),t._ctx=a,t}raw(){return this._ctx.valueMapper=null,this}each(e){var t=this._ctx;return this._read(a=>at(t,e,a,t.table.core))}count(e){return this._read(t=>{const a=this._ctx,s=a.table.core;if(Ee(a,!0))return s.count({trans:t,query:{index:pt(a,s.schema),range:a.range}}).then(i=>Math.min(i,a.limit));var r=0;return at(a,()=>(++r,!1),t,s).then(()=>r)}).then(e)}sortBy(e,t){const a=e.split(".").reverse(),s=a[0],r=a.length-1;function i(u,c){return c?i(u[a[c]],c-1):u[s]}var o=this._ctx.dir==="next"?1:-1;function l(u,c){var p=i(u,r),d=i(c,r);return p<d?-o:p>d?o:0}return this.toArray(function(u){return u.sort(l)}).then(t)}toArray(e){return this._read(t=>{var a=this._ctx;if(a.dir==="next"&&Ee(a,!0)&&a.limit>0){const{valueMapper:s}=a,r=pt(a,a.table.core.schema);return a.table.core.query({trans:t,limit:a.limit,values:!0,query:{index:r,range:a.range}}).then(({result:i})=>s?i.map(s):i)}{const s=[];return at(a,r=>s.push(r),t,a.table.core).then(()=>s)}},e)}offset(e){var t=this._ctx;return e<=0||(t.offset+=e,Ee(t)?At(t,()=>{var a=e;return(s,r)=>a===0||(a===1?(--a,!1):(r(()=>{s.advance(a),a=0}),!1))}):At(t,()=>{var a=e;return()=>--a<0})),this}limit(e){return this._ctx.limit=Math.min(this._ctx.limit,e),At(this._ctx,()=>{var t=e;return function(a,s,r){return--t<=0&&s(r),t>=0}},!0),this}until(e,t){return St(this._ctx,function(a,s,r){return!e(a.value)||(s(r),t)}),this}first(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)}last(e){return this.reverse().first(e)}filter(e){var t,a;return St(this._ctx,function(s){return e(s.value)}),t=this._ctx,a=e,t.isMatch=ye(t.isMatch,a),this}and(e){return this.filter(e)}or(e){return new this.db.WhereClause(this._ctx.table,e,this)}reverse(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this}desc(){return this.reverse()}eachKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(a,s){e(s.key,s)})}eachUniqueKey(e){return this._ctx.unique="unique",this.eachKey(e)}eachPrimaryKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(a,s){e(s.primaryKey,s)})}keys(e){var t=this._ctx;t.keysOnly=!t.isMatch;var a=[];return this.each(function(s,r){a.push(r.key)}).then(function(){return a}).then(e)}primaryKeys(e){var t=this._ctx;if(t.dir==="next"&&Ee(t,!0)&&t.limit>0)return this._read(s=>{var r=pt(t,t.table.core.schema);return t.table.core.query({trans:s,values:!1,limit:t.limit,query:{index:r,range:t.range}})}).then(({result:s})=>s).then(e);t.keysOnly=!t.isMatch;var a=[];return this.each(function(s,r){a.push(r.primaryKey)}).then(function(){return a}).then(e)}uniqueKeys(e){return this._ctx.unique="unique",this.keys(e)}firstKey(e){return this.limit(1).keys(function(t){return t[0]}).then(e)}lastKey(e){return this.reverse().firstKey(e)}distinct(){var e=this._ctx,t=e.index&&e.table.schema.idxByName[e.index];if(!t||!t.multi)return this;var a={};return St(this._ctx,function(s){var r=s.primaryKey.toString(),i=G(a,r);return a[r]=!0,!i}),this}modify(e){var t=this._ctx;return this._write(a=>{var s;if(typeof e=="function")s=e;else{var r=M(e),i=r.length;s=function(g){for(var y=!1,f=0;f<i;++f){var h=r[f],w=e[h];ae(g,h)!==w&&(W(g,h,w),y=!0)}return y}}const o=t.table.core,{outbound:l,extractKey:u}=o.schema.primaryKey,c=this.db._options.modifyChunkSize||200,p=[];let d=0;const m=[],v=(g,y)=>{const{failures:f,numFailures:h}=y;d+=g-h;for(let w of M(f))p.push(f[w])};return this.clone().primaryKeys().then(g=>{const y=f=>{const h=Math.min(c,g.length-f);return o.getMany({trans:a,keys:g.slice(f,f+h),cache:"immutable"}).then(w=>{const k=[],L=[],E=l?[]:null,x=[];for(let _=0;_<h;++_){const T=w[_],S={value:Je(T),primKey:g[f+_]};s.call(S,S.value,S)!==!1&&(S.value==null?x.push(g[f+_]):l||q(u(T),u(S.value))===0?(L.push(S.value),l&&E.push(g[f+_])):(x.push(g[f+_]),k.push(S.value)))}const C=Ee(t)&&t.limit===1/0&&(typeof e!="function"||e===Rt)&&{index:t.index,range:t.range};return Promise.resolve(k.length>0&&o.mutate({trans:a,type:"add",values:k}).then(_=>{for(let T in _.failures)x.splice(parseInt(T),1);v(k.length,_)})).then(()=>(L.length>0||C&&typeof e=="object")&&o.mutate({trans:a,type:"put",keys:E,values:L,criteria:C,changeSpec:typeof e!="function"&&e}).then(_=>v(L.length,_))).then(()=>(x.length>0||C&&e===Rt)&&o.mutate({trans:a,type:"delete",keys:x,criteria:C}).then(_=>v(x.length,_))).then(()=>g.length>f+h&&y(f+c))})};return y(0).then(()=>{if(p.length>0)throw new gt("Error modifying one or more objects",p,d,m);return g.length})})})}delete(){var e=this._ctx,t=e.range;return Ee(e)&&(e.isPrimKey&&!ws||t.type===3)?this._write(a=>{const{primaryKey:s}=e.table.core.schema,r=t;return e.table.core.count({trans:a,query:{index:s,range:r}}).then(i=>e.table.core.mutate({trans:a,type:"deleteRange",range:r}).then(({failures:o,lastResult:l,results:u,numFailures:c})=>{if(c)throw new gt("Could not delete some values",Object.keys(o).map(p=>o[p]),i-c);return i-c}))}):this.modify(Rt)}}const Rt=(n,e)=>e.value=null;function ks(n,e){return n<e?-1:n===e?0:1}function Is(n,e){return n>e?-1:n===e?0:1}function z(n,e,t){var a=n instanceof ra?new n.Collection(n):n;return a._ctx.error=t?new t(e):new TypeError(e),a}function ke(n){return new n.Collection(n,()=>sa("")).limit(0)}function Ls(n,e,t,a,s,r){for(var i=Math.min(n.length,a.length),o=-1,l=0;l<i;++l){var u=e[l];if(u!==a[l])return s(n[l],t[l])<0?n.substr(0,l)+t[l]+t.substr(l+1):s(n[l],a[l])<0?n.substr(0,l)+a[l]+t.substr(l+1):o>=0?n.substr(0,o)+e[o]+t.substr(o+1):null;s(n[l],u)<0&&(o=l)}return i<a.length&&r==="next"?n+t.substr(n.length):i<n.length&&r==="prev"?n.substr(0,t.length):o<0?null:n.substr(0,o)+a[o]+t.substr(o+1)}function st(n,e,t,a){var s,r,i,o,l,u,c,p=t.length;if(!t.every(g=>typeof g=="string"))return z(n,ta);function d(g){s=function(f){return f==="next"?h=>h.toUpperCase():h=>h.toLowerCase()}(g),r=function(f){return f==="next"?h=>h.toLowerCase():h=>h.toUpperCase()}(g),i=g==="next"?ks:Is;var y=t.map(function(f){return{lower:r(f),upper:s(f)}}).sort(function(f,h){return i(f.lower,h.lower)});o=y.map(function(f){return f.upper}),l=y.map(function(f){return f.lower}),u=g,c=g==="next"?"":a}d("next");var m=new n.Collection(n,()=>re(o[0],l[p-1]+a));m._ondirectionchange=function(g){d(g)};var v=0;return m._addAlgorithm(function(g,y,f){var h=g.key;if(typeof h!="string")return!1;var w=r(h);if(e(w,l,v))return!0;for(var k=null,L=v;L<p;++L){var E=Ls(h,w,o[L],l[L],i,u);E===null&&k===null?v=L+1:(k===null||i(k,E)>0)&&(k=E)}return y(k!==null?function(){g.continue(k+c)}:f),!1}),m}function re(n,e,t,a){return{type:2,lower:n,upper:e,lowerOpen:t,upperOpen:a}}function sa(n){return{type:1,lower:n,upper:n}}class ra{get Collection(){return this._ctx.table.db.Collection}between(e,t,a,s){a=a!==!1,s=s===!0;try{return this._cmp(e,t)>0||this._cmp(e,t)===0&&(a||s)&&(!a||!s)?ke(this):new this.Collection(this,()=>re(e,t,!a,!s))}catch{return z(this,Q)}}equals(e){return e==null?z(this,Q):new this.Collection(this,()=>sa(e))}above(e){return e==null?z(this,Q):new this.Collection(this,()=>re(e,void 0,!0))}aboveOrEqual(e){return e==null?z(this,Q):new this.Collection(this,()=>re(e,void 0,!1))}below(e){return e==null?z(this,Q):new this.Collection(this,()=>re(void 0,e,!1,!0))}belowOrEqual(e){return e==null?z(this,Q):new this.Collection(this,()=>re(void 0,e))}startsWith(e){return typeof e!="string"?z(this,ta):this.between(e,e+me,!0,!0)}startsWithIgnoreCase(e){return e===""?this.startsWith(e):st(this,(t,a)=>t.indexOf(a[0])===0,[e],me)}equalsIgnoreCase(e){return st(this,(t,a)=>t===a[0],[e],"")}anyOfIgnoreCase(){var e=ee.apply(Ie,arguments);return e.length===0?ke(this):st(this,(t,a)=>a.indexOf(t)!==-1,e,"")}startsWithAnyOfIgnoreCase(){var e=ee.apply(Ie,arguments);return e.length===0?ke(this):st(this,(t,a)=>a.some(s=>t.indexOf(s)===0),e,me)}anyOf(){const e=ee.apply(Ie,arguments);let t=this._cmp;try{e.sort(t)}catch{return z(this,Q)}if(e.length===0)return ke(this);const a=new this.Collection(this,()=>re(e[0],e[e.length-1]));a._ondirectionchange=r=>{t=r==="next"?this._ascending:this._descending,e.sort(t)};let s=0;return a._addAlgorithm((r,i,o)=>{const l=r.key;for(;t(l,e[s])>0;)if(++s,s===e.length)return i(o),!1;return t(l,e[s])===0||(i(()=>{r.continue(e[s])}),!1)}),a}notEqual(e){return this.inAnyRange([[Gt,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})}noneOf(){const e=ee.apply(Ie,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return z(this,Q)}const t=e.reduce((a,s)=>a?a.concat([[a[a.length-1][1],s]]):[[Gt,s]],null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})}inAnyRange(e,t){const a=this._cmp,s=this._ascending,r=this._descending,i=this._min,o=this._max;if(e.length===0)return ke(this);if(!e.every(h=>h[0]!==void 0&&h[1]!==void 0&&s(h[0],h[1])<=0))return z(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",P.InvalidArgument);const l=!t||t.includeLowers!==!1,u=t&&t.includeUppers===!0;let c,p=s;function d(h,w){return p(h[0],w[0])}try{c=e.reduce(function(h,w){let k=0,L=h.length;for(;k<L;++k){const E=h[k];if(a(w[0],E[1])<0&&a(w[1],E[0])>0){E[0]=i(E[0],w[0]),E[1]=o(E[1],w[1]);break}}return k===L&&h.push(w),h},[]),c.sort(d)}catch{return z(this,Q)}let m=0;const v=u?h=>s(h,c[m][1])>0:h=>s(h,c[m][1])>=0,g=l?h=>r(h,c[m][0])>0:h=>r(h,c[m][0])>=0;let y=v;const f=new this.Collection(this,()=>re(c[0][0],c[c.length-1][1],!l,!u));return f._ondirectionchange=h=>{h==="next"?(y=v,p=s):(y=g,p=r),c.sort(d)},f._addAlgorithm((h,w,k)=>{for(var L=h.key;y(L);)if(++m,m===c.length)return w(k),!1;return!!function(E){return!v(E)&&!g(E)}(L)||(this._cmp(L,c[m][1])===0||this._cmp(L,c[m][0])===0||w(()=>{p===s?h.continue(c[m][0]):h.continue(c[m][1])}),!1)}),f}startsWithAnyOf(){const e=ee.apply(Ie,arguments);return e.every(t=>typeof t=="string")?e.length===0?ke(this):this.inAnyRange(e.map(t=>[t,t+me])):z(this,"startsWithAnyOf() only works with strings")}}function Y(n){return D(function(e){return ze(e),n(e.target.error),!1})}function ze(n){n.stopPropagation&&n.stopPropagation(),n.preventDefault&&n.preventDefault()}const Ge="storagemutated",oe="x-storagemutated-1",ue=Ne(null,Ge);class Bs{_lock(){return je(!B.global),++this._reculock,this._reculock!==1||B.global||(B.lockOwnerFor=this),this}_unlock(){if(je(!B.global),--this._reculock==0)for(B.global||(B.lockOwnerFor=null);this._blockedFuncs.length>0&&!this._locked();){var e=this._blockedFuncs.shift();try{Re(e[1],e[0])}catch{}}return this}_locked(){return this._reculock&&B.lockOwnerFor!==this}create(e){if(!this.mode)return this;const t=this.db.idbdb,a=this.db._state.dbOpenError;if(je(!this.idbtrans),!e&&!t)switch(a&&a.name){case"DatabaseClosedError":throw new P.DatabaseClosed(a);case"MissingAPIError":throw new P.MissingAPI(a.message,a);default:throw new P.OpenFailed(a)}if(!this.active)throw new P.TransactionInactive;return je(this._completion._state===null),(e=this.idbtrans=e||(this.db.core?this.db.core.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}):t.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}))).onerror=D(s=>{ze(s),this._reject(e.error)}),e.onabort=D(s=>{ze(s),this.active&&this._reject(new P.Abort(e.error)),this.active=!1,this.on("abort").fire(s)}),e.oncomplete=D(()=>{this.active=!1,this._resolve(),"mutatedParts"in e&&ue.storagemutated.fire(e.mutatedParts)}),this}_promise(e,t,a){if(e==="readwrite"&&this.mode!=="readwrite")return F(new P.ReadOnly("Transaction is readonly"));if(!this.active)return F(new P.TransactionInactive);if(this._locked())return new I((r,i)=>{this._blockedFuncs.push([()=>{this._promise(e,t,a).then(r,i)},B])});if(a)return le(()=>{var r=new I((i,o)=>{this._lock();const l=t(i,o,this);l&&l.then&&l.then(i,o)});return r.finally(()=>this._unlock()),r._lib=!0,r});var s=new I((r,i)=>{var o=t(r,i,this);o&&o.then&&o.then(r,i)});return s._lib=!0,s}_root(){return this.parent?this.parent._root():this}waitFor(e){var t=this._root();const a=I.resolve(e);if(t._waitingFor)t._waitingFor=t._waitingFor.then(()=>a);else{t._waitingFor=a,t._waitingQueue=[];var s=t.idbtrans.objectStore(t.storeNames[0]);(function i(){for(++t._spinCount;t._waitingQueue.length;)t._waitingQueue.shift()();t._waitingFor&&(s.get(-1/0).onsuccess=i)})()}var r=t._waitingFor;return new I((i,o)=>{a.then(l=>t._waitingQueue.push(D(i.bind(null,l))),l=>t._waitingQueue.push(D(o.bind(null,l)))).finally(()=>{t._waitingFor===r&&(t._waitingFor=null)})})}abort(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new P.Abort))}table(e){const t=this._memoizedTables||(this._memoizedTables={});if(G(t,e))return t[e];const a=this.schema[e];if(!a)throw new P.NotFound("Table "+e+" not part of transaction");const s=new this.db.Table(e,a,this);return s.core=this.db.core.table(e),t[e]=s,s}}function Wt(n,e,t,a,s,r,i){return{name:n,keyPath:e,unique:t,multi:a,auto:s,compound:r,src:(t&&!i?"&":"")+(a?"*":"")+(s?"++":"")+ia(e)}}function ia(n){return typeof n=="string"?n:n?"["+[].join.call(n,"+")+"]":""}function oa(n,e,t){return{name:n,primKey:e,indexes:t,mappedClass:null,idxByName:On(t,a=>[a.name,a])}}let We=n=>{try{return n.only([[]]),We=()=>[[]],[[]]}catch{return We=()=>me,me}};function Yt(n){return n==null?()=>{}:typeof n=="string"?function(e){return e.split(".").length===1?a=>a[e]:a=>ae(a,e)}(n):e=>ae(e,n)}function An(n){return[].slice.call(n)}let Ps=0;function He(n){return n==null?":id":typeof n=="string"?n:`[${n.join("+")}]`}function Cs(n,e,t){function a(l){if(l.type===3)return null;if(l.type===4)throw new Error("Cannot convert never type to IDBKeyRange");const{lower:u,upper:c,lowerOpen:p,upperOpen:d}=l;return u===void 0?c===void 0?null:e.upperBound(c,!!d):c===void 0?e.lowerBound(u,!!p):e.bound(u,c,!!p,!!d)}const{schema:s,hasGetAll:r}=function(l,u){const c=An(l.objectStoreNames);return{schema:{name:l.name,tables:c.map(p=>u.objectStore(p)).map(p=>{const{keyPath:d,autoIncrement:m}=p,v=H(d),g=d==null,y={},f={name:p.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:g,compound:v,keyPath:d,autoIncrement:m,unique:!0,extractKey:Yt(d)},indexes:An(p.indexNames).map(h=>p.index(h)).map(h=>{const{name:w,unique:k,multiEntry:L,keyPath:E}=h,x={name:w,compound:H(E),keyPath:E,unique:k,multiEntry:L,extractKey:Yt(E)};return y[He(E)]=x,x}),getIndexByKeyPath:h=>y[He(h)]};return y[":id"]=f.primaryKey,d!=null&&(y[He(d)]=f.primaryKey),f})},hasGetAll:c.length>0&&"getAll"in u.objectStore(c[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)}}(n,t),i=s.tables.map(l=>function(u){const c=u.name;return{name:c,schema:u,mutate:function({trans:p,type:d,keys:m,values:v,range:g}){return new Promise((y,f)=>{y=D(y);const h=p.objectStore(c),w=h.keyPath==null,k=d==="put"||d==="add";if(!k&&d!=="delete"&&d!=="deleteRange")throw new Error("Invalid operation type: "+d);const{length:L}=m||v||{length:1};if(m&&v&&m.length!==v.length)throw new Error("Given keys array must have same length as given values array.");if(L===0)return y({numFailures:0,failures:{},results:[],lastResult:void 0});let E;const x=[],C=[];let _=0;const T=V=>{++_,ze(V)};if(d==="deleteRange"){if(g.type===4)return y({numFailures:_,failures:C,results:[],lastResult:void 0});g.type===3?x.push(E=h.clear()):x.push(E=h.delete(a(g)))}else{const[V,K]=k?w?[v,m]:[v,null]:[m,null];if(k)for(let j=0;j<L;++j)x.push(E=K&&K[j]!==void 0?h[d](V[j],K[j]):h[d](V[j])),E.onerror=T;else for(let j=0;j<L;++j)x.push(E=h[d](V[j])),E.onerror=T}const S=V=>{const K=V.target.result;x.forEach((j,we)=>j.error!=null&&(C[we]=j.error)),y({numFailures:_,failures:C,results:d==="delete"?m:x.map(j=>j.result),lastResult:K})};E.onerror=V=>{T(V),S(V)},E.onsuccess=S})},getMany:({trans:p,keys:d})=>new Promise((m,v)=>{m=D(m);const g=p.objectStore(c),y=d.length,f=new Array(y);let h,w=0,k=0;const L=x=>{const C=x.target;f[C._pos]=C.result,++k===w&&m(f)},E=Y(v);for(let x=0;x<y;++x)d[x]!=null&&(h=g.get(d[x]),h._pos=x,h.onsuccess=L,h.onerror=E,++w);w===0&&m(f)}),get:({trans:p,key:d})=>new Promise((m,v)=>{m=D(m);const g=p.objectStore(c).get(d);g.onsuccess=y=>m(y.target.result),g.onerror=Y(v)}),query:function(p){return d=>new Promise((m,v)=>{m=D(m);const{trans:g,values:y,limit:f,query:h}=d,w=f===1/0?void 0:f,{index:k,range:L}=h,E=g.objectStore(c),x=k.isPrimaryKey?E:E.index(k.name),C=a(L);if(f===0)return m({result:[]});if(p){const _=y?x.getAll(C,w):x.getAllKeys(C,w);_.onsuccess=T=>m({result:T.target.result}),_.onerror=Y(v)}else{let _=0;const T=y||!("openKeyCursor"in x)?x.openCursor(C):x.openKeyCursor(C),S=[];T.onsuccess=V=>{const K=T.result;return K?(S.push(y?K.value:K.primaryKey),++_===f?m({result:S}):void K.continue()):m({result:S})},T.onerror=Y(v)}})}(r),openCursor:function({trans:p,values:d,query:m,reverse:v,unique:g}){return new Promise((y,f)=>{y=D(y);const{index:h,range:w}=m,k=p.objectStore(c),L=h.isPrimaryKey?k:k.index(h.name),E=v?g?"prevunique":"prev":g?"nextunique":"next",x=d||!("openKeyCursor"in L)?L.openCursor(a(w),E):L.openKeyCursor(a(w),E);x.onerror=Y(f),x.onsuccess=D(C=>{const _=x.result;if(!_)return void y(null);_.___id=++Ps,_.done=!1;const T=_.continue.bind(_);let S=_.continuePrimaryKey;S&&(S=S.bind(_));const V=_.advance.bind(_),K=()=>{throw new Error("Cursor not stopped")};_.trans=p,_.stop=_.continue=_.continuePrimaryKey=_.advance=()=>{throw new Error("Cursor not started")},_.fail=D(f),_.next=function(){let j=1;return this.start(()=>j--?this.continue():this.stop()).then(()=>this)},_.start=j=>{const we=new Promise(($,pe)=>{$=D($),x.onerror=Y(pe),_.fail=pe,_.stop=De=>{_.stop=_.continue=_.continuePrimaryKey=_.advance=K,$(De)}}),_e=()=>{if(x.result)try{j()}catch($){_.fail($)}else _.done=!0,_.start=()=>{throw new Error("Cursor behind last entry")},_.stop()};return x.onsuccess=D($=>{x.onsuccess=_e,_e()}),_.continue=T,_.continuePrimaryKey=S,_.advance=V,_e(),we},y(_)},f)})},count({query:p,trans:d}){const{index:m,range:v}=p;return new Promise((g,y)=>{const f=d.objectStore(c),h=m.isPrimaryKey?f:f.index(m.name),w=a(v),k=w?h.count(w):h.count();k.onsuccess=D(L=>g(L.target.result)),k.onerror=Y(y)})}}}(l)),o={};return i.forEach(l=>o[l.name]=l),{stack:"dbcore",transaction:n.transaction.bind(n),table(l){if(!o[l])throw new Error(`Table '${l}' not found`);return o[l]},MIN_KEY:-1/0,MAX_KEY:We(e),schema:s}}function Jt({_novip:n},e){const t=e.db,a=function(s,r,{IDBKeyRange:i,indexedDB:o},l){return{dbcore:function(c,p){return p.reduce((d,{create:m})=>({...d,...m(d)}),c)}(Cs(r,i,l),s.dbcore)}}(n._middlewares,t,n._deps,e);n.core=a.dbcore,n.tables.forEach(s=>{const r=s.name;n.core.schema.tables.some(i=>i.name===r)&&(s.core=n.core.table(r),n[r]instanceof n.Table&&(n[r].core=s.core))})}function wt({_novip:n},e,t,a){t.forEach(s=>{const r=a[s];e.forEach(i=>{const o=rn(i,s);(!o||"value"in o&&o.value===void 0)&&(i===n.Transaction.prototype||i instanceof n.Transaction?ne(i,s,{get(){return this.table(s)},set(l){jn(this,s,{value:l,writable:!0,configurable:!0,enumerable:!0})}}):i[s]=new n.Table(s,r))})})}function Qt({_novip:n},e){e.forEach(t=>{for(let a in t)t[a]instanceof n.Table&&delete t[a]})}function Ss(n,e){return n._cfg.version-e._cfg.version}function As(n,e,t,a){const s=n._dbSchema,r=n._createTransaction("readwrite",n._storeNames,s);r.create(t),r._completion.catch(a);const i=r._reject.bind(r),o=B.transless||B;le(()=>{B.trans=r,B.transless=o,e===0?(M(s).forEach(l=>{Dt(t,l,s[l].primKey,s[l].indexes)}),Jt(n,t),I.follow(()=>n.on.populate.fire(r)).catch(i)):function({_novip:l},u,c,p){const d=[],m=l._versions;let v=l._dbSchema=Zt(l,l.idbdb,p),g=!1;const y=m.filter(h=>h._cfg.version>=u);function f(){return d.length?I.resolve(d.shift()(c.idbtrans)).then(f):I.resolve()}return y.forEach(h=>{d.push(()=>{const w=v,k=h._cfg.dbschema;en(l,w,p),en(l,k,p),v=l._dbSchema=k;const L=la(w,k);L.add.forEach(x=>{Dt(p,x[0],x[1].primKey,x[1].indexes)}),L.change.forEach(x=>{if(x.recreate)throw new P.Upgrade("Not yet support for changing primary key");{const C=p.objectStore(x.name);x.add.forEach(_=>Xt(C,_)),x.change.forEach(_=>{C.deleteIndex(_.name),Xt(C,_)}),x.del.forEach(_=>C.deleteIndex(_))}});const E=h._cfg.contentUpgrade;if(E&&h._cfg.version>u){Jt(l,p),c._memoizedTables={},g=!0;let x=Kn(k);L.del.forEach(S=>{x[S]=w[S]}),Qt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],M(x),x),c.schema=x;const C=on(E);let _;C&&Ae();const T=I.follow(()=>{if(_=E(c),_&&C){var S=se.bind(null,null);_.then(S,S)}});return _&&typeof _.then=="function"?I.resolve(_):T.then(()=>_)}}),d.push(w=>{(!g||!xs)&&function(k,L){[].slice.call(L.db.objectStoreNames).forEach(E=>k[E]==null&&L.db.deleteObjectStore(E))}(h._cfg.dbschema,w),Qt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],l._storeNames,l._dbSchema),c.schema=l._dbSchema})}),f().then(()=>{var h,w;w=p,M(h=v).forEach(k=>{w.db.objectStoreNames.contains(k)||Dt(w,k,h[k].primKey,h[k].indexes)})})}(n,e,r,t).catch(i)})}function la(n,e){const t={del:[],add:[],change:[]};let a;for(a in n)e[a]||t.del.push(a);for(a in e){const s=n[a],r=e[a];if(s){const i={name:a,def:r,recreate:!1,del:[],add:[],change:[]};if(""+(s.primKey.keyPath||"")!=""+(r.primKey.keyPath||"")||s.primKey.auto!==r.primKey.auto&&!Et)i.recreate=!0,t.change.push(i);else{const o=s.idxByName,l=r.idxByName;let u;for(u in o)l[u]||i.del.push(u);for(u in l){const c=o[u],p=l[u];c?c.src!==p.src&&i.change.push(p):i.add.push(p)}(i.del.length>0||i.add.length>0||i.change.length>0)&&t.change.push(i)}}else t.add.push([a,r])}return t}function Dt(n,e,t,a){const s=n.db.createObjectStore(e,t.keyPath?{keyPath:t.keyPath,autoIncrement:t.auto}:{autoIncrement:t.auto});return a.forEach(r=>Xt(s,r)),s}function Xt(n,e){n.createIndex(e.name,e.keyPath,{unique:e.unique,multiEntry:e.multi})}function Zt(n,e,t){const a={};return ft(e.objectStoreNames,0).forEach(s=>{const r=t.objectStore(s);let i=r.keyPath;const o=Wt(ia(i),i||"",!1,!1,!!r.autoIncrement,i&&typeof i!="string",!0),l=[];for(let c=0;c<r.indexNames.length;++c){const p=r.index(r.indexNames[c]);i=p.keyPath;var u=Wt(p.name,i,!!p.unique,!!p.multiEntry,!1,i&&typeof i!="string",!1);l.push(u)}a[s]=oa(s,o,l)}),a}function en({_novip:n},e,t){const a=t.db.objectStoreNames;for(let s=0;s<a.length;++s){const r=a[s],i=t.objectStore(r);n._hasGetAll="getAll"in i;for(let o=0;o<i.indexNames.length;++o){const l=i.indexNames[o],u=i.index(l).keyPath,c=typeof u=="string"?u:"["+ft(u).join("+")+"]";if(e[r]){const p=e[r].idxByName[c];p&&(p.name=l,delete e[r].idxByName[c],e[r].idxByName[l]=p)}}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&R.WorkerGlobalScope&&R instanceof R.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(n._hasGetAll=!1)}class Rs{_parseStoresSpec(e,t){M(e).forEach(a=>{if(e[a]!==null){var s=e[a].split(",").map((i,o)=>{const l=(i=i.trim()).replace(/([&*]|\+\+)/g,""),u=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Wt(l,u||null,/\&/.test(i),/\*/.test(i),/\+\+/.test(i),H(u),o===0)}),r=s.shift();if(r.multi)throw new P.Schema("Primary key cannot be multi-valued");s.forEach(i=>{if(i.auto)throw new P.Schema("Only primary key can be marked as autoIncrement (++)");if(!i.keyPath)throw new P.Schema("Index must have a name and cannot be an empty string")}),t[a]=oa(a,r,s)}})}stores(e){const t=this.db;this._cfg.storesSource=this._cfg.storesSource?U(this._cfg.storesSource,e):e;const a=t._versions,s={};let r={};return a.forEach(i=>{U(s,i._cfg.storesSource),r=i._cfg.dbschema={},i._parseStoresSpec(s,r)}),t._dbSchema=r,Qt(t,[t._allTables,t,t.Transaction.prototype]),wt(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],M(r),r),t._storeNames=M(r),this}upgrade(e){return this._cfg.contentUpgrade=un(this._cfg.contentUpgrade||A,e),this}}function mn(n,e){let t=n._dbNamesDB;return t||(t=n._dbNamesDB=new be(kt,{addons:[],indexedDB:n,IDBKeyRange:e}),t.version(1).stores({dbnames:"name"})),t.table("dbnames")}function fn(n){return n&&typeof n.databases=="function"}function tn(n){return le(function(){return B.letThrough=!0,n()})}function Ds(){var n;return!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(e){var t=function(){return indexedDB.databases().finally(e)};n=setInterval(t,100),t()}).finally(function(){return clearInterval(n)}):Promise.resolve()}function Ts(n){const e=n._state,{indexedDB:t}=n._deps;if(e.isBeingOpened||n.idbdb)return e.dbReadyPromise.then(()=>e.dbOpenError?F(e.dbOpenError):n);J&&(e.openCanceller._stackHolder=xe()),e.isBeingOpened=!0,e.dbOpenError=null,e.openComplete=!1;const a=e.openCanceller;function s(){if(e.openCanceller!==a)throw new P.DatabaseClosed("db.open() was cancelled")}let r=e.dbReadyResolve,i=null,o=!1;const l=()=>new I((u,c)=>{if(s(),!t)throw new P.MissingAPI;const p=n.name,d=e.autoSchema?t.open(p):t.open(p,Math.round(10*n.verno));if(!d)throw new P.MissingAPI;d.onerror=Y(c),d.onblocked=D(n._fireOnBlocked),d.onupgradeneeded=D(m=>{if(i=d.transaction,e.autoSchema&&!n._options.allowEmptyDB){d.onerror=ze,i.abort(),d.result.close();const g=t.deleteDatabase(p);g.onsuccess=g.onerror=D(()=>{c(new P.NoSuchDatabase(`Database ${p} doesnt exist`))})}else{i.onerror=Y(c);var v=m.oldVersion>Math.pow(2,62)?0:m.oldVersion;o=v<1,n._novip.idbdb=d.result,As(n,v/10,i,c)}},c),d.onsuccess=D(()=>{i=null;const m=n._novip.idbdb=d.result,v=ft(m.objectStoreNames);if(v.length>0)try{const y=m.transaction((g=v).length===1?g[0]:g,"readonly");e.autoSchema?function({_novip:f},h,w){f.verno=h.version/10;const k=f._dbSchema=Zt(0,h,w);f._storeNames=ft(h.objectStoreNames,0),wt(f,[f._allTables],M(k),k)}(n,m,y):(en(n,n._dbSchema,y),function(f,h){const w=la(Zt(0,f.idbdb,h),f._dbSchema);return!(w.add.length||w.change.some(k=>k.add.length||k.change.length))}(n,y)||console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")),Jt(n,y)}catch{}var g;Ke.push(n),m.onversionchange=D(y=>{e.vcFired=!0,n.on("versionchange").fire(y)}),m.onclose=D(y=>{n.on("close").fire(y)}),o&&function({indexedDB:y,IDBKeyRange:f},h){!fn(y)&&h!==kt&&mn(y,f).put({name:h}).catch(A)}(n._deps,p),u()},c)}).catch(u=>u&&u.name==="UnknownError"&&e.PR1398_maxLoop>0?(e.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),l()):I.reject(u));return I.race([a,(typeof navigator>"u"?I.resolve():Ds()).then(l)]).then(()=>(s(),e.onReadyBeingFired=[],I.resolve(tn(()=>n.on.ready.fire(n.vip))).then(function u(){if(e.onReadyBeingFired.length>0){let c=e.onReadyBeingFired.reduce(un,A);return e.onReadyBeingFired=[],I.resolve(tn(()=>c(n.vip))).then(u)}}))).finally(()=>{e.onReadyBeingFired=null,e.isBeingOpened=!1}).then(()=>n).catch(u=>{e.dbOpenError=u;try{i&&i.abort()}catch{}return a===e.openCanceller&&n._close(),F(u)}).finally(()=>{e.openComplete=!0,r()})}function nn(n){var e=r=>n.next(r),t=s(e),a=s(r=>n.throw(r));function s(r){return i=>{var o=r(i),l=o.value;return o.done?l:l&&typeof l.then=="function"?l.then(t,a):H(l)?Promise.all(l).then(t,a):t(l)}}return s(e)()}function js(n,e,t){var a=arguments.length;if(a<2)throw new P.InvalidArgument("Too few arguments");for(var s=new Array(a-1);--a;)s[a-1]=arguments[a];return t=s.pop(),[n,Nn(s),t]}function ca(n,e,t,a,s){return I.resolve().then(()=>{const r=B.transless||B,i=n._createTransaction(e,t,n._dbSchema,a),o={trans:i,transless:r};if(a)i.idbtrans=a.idbtrans;else try{i.create(),n._state.PR1398_maxLoop=3}catch(p){return p.name===cn.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>ca(n,e,t,null,s))):F(p)}const l=on(s);let u;l&&Ae();const c=I.follow(()=>{if(u=s.call(i,i),u)if(l){var p=se.bind(null,null);u.then(p,p)}else typeof u.next=="function"&&typeof u.throw=="function"&&(u=nn(u))},o);return(u&&typeof u.then=="function"?I.resolve(u).then(p=>i.active?p:F(new P.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))):c.then(()=>u)).then(p=>(a&&i._resolve(),i._completion.then(()=>p))).catch(p=>(i._reject(p),F(p)))})}function rt(n,e,t){const a=H(n)?n.slice():[n];for(let s=0;s<t;++s)a.push(e);return a}const Ms={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(n){return{...n,table(e){const t=n.table(e),{schema:a}=t,s={},r=[];function i(c,p,d){const m=He(c),v=s[m]=s[m]||[],g=c==null?0:typeof c=="string"?1:c.length,y=p>0,f={...d,isVirtual:y,keyTail:p,keyLength:g,extractKey:Yt(c),unique:!y&&d.unique};return v.push(f),f.isPrimaryKey||r.push(f),g>1&&i(g===2?c[0]:c.slice(0,g-1),p+1,d),v.sort((h,w)=>h.keyTail-w.keyTail),f}const o=i(a.primaryKey.keyPath,0,a.primaryKey);s[":id"]=[o];for(const c of a.indexes)i(c.keyPath,0,c);function l(c){const p=c.query.index;return p.isVirtual?{...c,query:{index:p,range:(d=c.query.range,m=p.keyTail,{type:d.type===1?2:d.type,lower:rt(d.lower,d.lowerOpen?n.MAX_KEY:n.MIN_KEY,m),lowerOpen:!0,upper:rt(d.upper,d.upperOpen?n.MIN_KEY:n.MAX_KEY,m),upperOpen:!0})}}:c;var d,m}return{...t,schema:{...a,primaryKey:o,indexes:r,getIndexByKeyPath:function(c){const p=s[He(c)];return p&&p[0]}},count:c=>t.count(l(c)),query:c=>t.query(l(c)),openCursor(c){const{keyTail:p,isVirtual:d,keyLength:m}=c.query.index;return d?t.openCursor(l(c)).then(v=>v&&function(g){return Object.create(g,{continue:{value:function(f){f!=null?g.continue(rt(f,c.reverse?n.MAX_KEY:n.MIN_KEY,p)):c.unique?g.continue(g.key.slice(0,m).concat(c.reverse?n.MIN_KEY:n.MAX_KEY,p)):g.continue()}},continuePrimaryKey:{value(f,h){g.continuePrimaryKey(rt(f,n.MAX_KEY,p),h)}},primaryKey:{get:()=>g.primaryKey},key:{get(){const f=g.key;return m===1?f[0]:f.slice(0,m)}},value:{get:()=>g.value}})}(v)):t.openCursor(c)}}}}}};function gn(n,e,t,a){return t=t||{},a=a||"",M(n).forEach(s=>{if(G(e,s)){var r=n[s],i=e[s];if(typeof r=="object"&&typeof i=="object"&&r&&i){const o=jt(r);o!==jt(i)?t[a+s]=e[s]:o==="Object"?gn(r,i,t,a+s+"."):r!==i&&(t[a+s]=e[s])}else r!==i&&(t[a+s]=e[s])}else t[a+s]=void 0}),M(e).forEach(s=>{G(n,s)||(t[a+s]=e[s])}),t}const Fs={stack:"dbcore",name:"HooksMiddleware",level:2,create:n=>({...n,table(e){const t=n.table(e),{primaryKey:a}=t.schema;return{...t,mutate(r){const i=B.trans,{deleting:o,creating:l,updating:u}=i.table(e).hook;switch(r.type){case"add":if(l.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"put":if(l.fire===A&&u.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"delete":if(o.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"deleteRange":if(o.fire===A)break;return i._promise("readwrite",()=>function(d){return p(d.trans,d.range,1e4)}(r),!0)}return t.mutate(r);function c(d){const m=B.trans,v=d.keys||function(g,y){return y.type==="delete"?y.keys:y.keys||y.values.map(g.extractKey)}(a,d);if(!v)throw new Error("Keys missing");return(d=d.type==="add"||d.type==="put"?{...d,keys:v}:{...d}).type!=="delete"&&(d.values=[...d.values]),d.keys&&(d.keys=[...d.keys]),function(g,y,f){return y.type==="add"?Promise.resolve([]):g.getMany({trans:y.trans,keys:f,cache:"immutable"})}(t,d,v).then(g=>{const y=v.map((f,h)=>{const w=g[h],k={onerror:null,onsuccess:null};if(d.type==="delete")o.fire.call(k,f,w,m);else if(d.type==="add"||w===void 0){const L=l.fire.call(k,f,d.values[h],m);f==null&&L!=null&&(f=L,d.keys[h]=f,a.outbound||W(d.values[h],a.keyPath,f))}else{const L=gn(w,d.values[h]),E=u.fire.call(k,L,f,w,m);if(E){const x=d.values[h];Object.keys(E).forEach(C=>{G(x,C)?x[C]=E[C]:W(x,C,E[C])})}}return k});return t.mutate(d).then(({failures:f,results:h,numFailures:w,lastResult:k})=>{for(let L=0;L<v.length;++L){const E=h?h[L]:v[L],x=y[L];E==null?x.onerror&&x.onerror(f[L]):x.onsuccess&&x.onsuccess(d.type==="put"&&g[L]?d.values[L]:E)}return{failures:f,results:h,numFailures:w,lastResult:k}}).catch(f=>(y.forEach(h=>h.onerror&&h.onerror(f)),Promise.reject(f)))})}function p(d,m,v){return t.query({trans:d,values:!1,query:{index:a,range:m},limit:v}).then(({result:g})=>c({type:"delete",keys:g,trans:d}).then(y=>y.numFailures>0?Promise.reject(y.failures[0]):g.length<v?{failures:[],numFailures:0,lastResult:void 0}:p(d,{...m,lower:g[g.length-1],lowerOpen:!0},v)))}}}}})};function ua(n,e,t){try{if(!e||e.keys.length<n.length)return null;const a=[];for(let s=0,r=0;s<e.keys.length&&r<n.length;++s)q(e.keys[s],n[r])===0&&(a.push(t?Je(e.values[s]):e.values[s]),++r);return a.length===n.length?a:null}catch{return null}}const Os={stack:"dbcore",level:-1,create:n=>({table:e=>{const t=n.table(e);return{...t,getMany:a=>{if(!a.cache)return t.getMany(a);const s=ua(a.keys,a.trans._cache,a.cache==="clone");return s?I.resolve(s):t.getMany(a).then(r=>(a.trans._cache={keys:a.keys,values:a.cache==="clone"?Je(r):r},r))},mutate:a=>(a.type!=="add"&&(a.trans._cache=null),t.mutate(a))}}})};function bn(n){return!("from"in n)}const Z=function(n,e){if(!this){const t=new Z;return n&&"d"in n&&U(t,n),t}U(this,arguments.length?{d:1,from:n,to:arguments.length>1?e:n}:{d:0})};function Ye(n,e,t){const a=q(e,t);if(isNaN(a))return;if(a>0)throw RangeError();if(bn(n))return U(n,{from:e,to:t,d:1});const s=n.l,r=n.r;if(q(t,n.from)<0)return s?Ye(s,e,t):n.l={from:e,to:t,d:1,l:null,r:null},Rn(n);if(q(e,n.to)>0)return r?Ye(r,e,t):n.r={from:e,to:t,d:1,l:null,r:null},Rn(n);q(e,n.from)<0&&(n.from=e,n.l=null,n.d=r?r.d+1:1),q(t,n.to)>0&&(n.to=t,n.r=null,n.d=n.l?n.l.d+1:1);const i=!n.r;s&&!n.l&&_t(n,s),r&&i&&_t(n,r)}function _t(n,e){bn(e)||function t(a,{from:s,to:r,l:i,r:o}){Ye(a,s,r),i&&t(a,i),o&&t(a,o)}(n,e)}function Ks(n,e){const t=an(e);let a=t.next();if(a.done)return!1;let s=a.value;const r=an(n);let i=r.next(s.from),o=i.value;for(;!a.done&&!i.done;){if(q(o.from,s.to)<=0&&q(o.to,s.from)>=0)return!0;q(s.from,o.from)<0?s=(a=t.next(o.from)).value:o=(i=r.next(s.from)).value}return!1}function an(n){let e=bn(n)?null:{s:0,n};return{next(t){const a=arguments.length>0;for(;e;)switch(e.s){case 0:if(e.s=1,a)for(;e.n.l&&q(t,e.n.from)<0;)e={up:e,n:e.n.l,s:1};else for(;e.n.l;)e={up:e,n:e.n.l,s:1};case 1:if(e.s=2,!a||q(t,e.n.to)<=0)return{value:e.n,done:!1};case 2:if(e.n.r){e.s=3,e={up:e,n:e.n.r,s:0};continue}case 3:e=e.up}return{done:!0}}}}function Rn(n){var e,t;const a=(((e=n.r)===null||e===void 0?void 0:e.d)||0)-(((t=n.l)===null||t===void 0?void 0:t.d)||0),s=a>1?"r":a<-1?"l":"";if(s){const r=s==="r"?"l":"r",i={...n},o=n[s];n.from=o.from,n.to=o.to,n[s]=o[s],i[s]=o[r],n[r]=i,i.d=Dn(i)}n.d=Dn(n)}function Dn({r:n,l:e}){return(n?e?Math.max(n.d,e.d):n.d:e?e.d:0)+1}Se(Z.prototype,{add(n){return _t(this,n),this},addKey(n){return Ye(this,n,n),this},addKeys(n){return n.forEach(e=>Ye(this,e,e)),this},[Mt](){return an(this)}});const Ns={stack:"dbcore",level:0,create:n=>{const e=n.schema.name,t=new Z(n.MIN_KEY,n.MAX_KEY);return{...n,table:a=>{const s=n.table(a),{schema:r}=s,{primaryKey:i}=r,{extractKey:o,outbound:l}=i,u={...s,mutate:d=>{const m=d.trans,v=m.mutatedParts||(m.mutatedParts={}),g=E=>{const x=`idb://${e}/${a}/${E}`;return v[x]||(v[x]=new Z)},y=g(""),f=g(":dels"),{type:h}=d;let[w,k]=d.type==="deleteRange"?[d.range]:d.type==="delete"?[d.keys]:d.values.length<50?[[],d.values]:[];const L=d.trans._cache;return s.mutate(d).then(E=>{if(H(w)){h!=="delete"&&(w=E.results),y.addKeys(w);const x=ua(w,L);x||h==="add"||f.addKeys(w),(x||k)&&function(C,_,T,S){function V(K){const j=C(K.name||"");function we($){return $!=null?K.extractKey($):null}const _e=$=>K.multiEntry&&H($)?$.forEach(pe=>j.addKey(pe)):j.addKey($);(T||S).forEach(($,pe)=>{const De=T&&we(T[pe]),Lt=S&&we(S[pe]);q(De,Lt)!==0&&(De!=null&&_e(De),Lt!=null&&_e(Lt))})}_.indexes.forEach(V)}(g,r,x,k)}else if(w){const x={from:w.lower,to:w.upper};f.add(x),y.add(x)}else y.add(t),f.add(t),r.indexes.forEach(x=>g(x.name).add(t));return E})}},c=({query:{index:d,range:m}})=>{var v,g;return[d,new Z((v=m.lower)!==null&&v!==void 0?v:n.MIN_KEY,(g=m.upper)!==null&&g!==void 0?g:n.MAX_KEY)]},p={get:d=>[i,new Z(d.key)],getMany:d=>[i,new Z().addKeys(d.keys)],count:c,query:c,openCursor:c};return M(p).forEach(d=>{u[d]=function(m){const{subscr:v}=B;if(v){const g=k=>{const L=`idb://${e}/${a}/${k}`;return v[L]||(v[L]=new Z)},y=g(""),f=g(":dels"),[h,w]=p[d](m);if(g(h.name||"").add(w),!h.isPrimaryKey){if(d!=="count"){const k=d==="query"&&l&&m.values&&s.query({...m,values:!1});return s[d].apply(this,arguments).then(L=>{if(d==="query"){if(l&&m.values)return k.then(({result:x})=>(y.addKeys(x),L));const E=m.values?L.result.map(o):L.result;m.values?y.addKeys(E):f.addKeys(E)}else if(d==="openCursor"){const E=L,x=m.values;return E&&Object.create(E,{key:{get:()=>(f.addKey(E.primaryKey),E.key)},primaryKey:{get(){const C=E.primaryKey;return f.addKey(C),C}},value:{get:()=>(x&&y.addKey(E.primaryKey),E.value)}})}return L})}f.add(t)}}return s[d].apply(this,arguments)}}),u}}}};class be{constructor(e,t){this._middlewares={},this.verno=0;const a=be.dependencies;this._options=t={addons:be.addons,autoOpen:!0,indexedDB:a.indexedDB,IDBKeyRange:a.IDBKeyRange,...t},this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange};const{addons:s}=t;this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this;const r={dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:A,dbReadyPromise:null,cancelOpen:A,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3};var i;r.dbReadyPromise=new I(o=>{r.dbReadyResolve=o}),r.openCanceller=new I((o,l)=>{r.cancelOpen=l}),this._state=r,this.name=e,this.on=Ne(this,"populate","blocked","versionchange","close",{ready:[un,A]}),this.on.ready.subscribe=Mn(this.on.ready.subscribe,o=>(l,u)=>{be.vip(()=>{const c=this._state;if(c.openComplete)c.dbOpenError||I.resolve().then(l),u&&o(l);else if(c.onReadyBeingFired)c.onReadyBeingFired.push(l),u&&o(l);else{o(l);const p=this;u||o(function d(){p.on.ready.unsubscribe(l),p.on.ready.unsubscribe(d)})}})}),this.Collection=(i=this,Te(Es.prototype,function(o,l){this.db=i;let u=aa,c=null;if(l)try{u=l()}catch(v){c=v}const p=o._ctx,d=p.table,m=d.hook.reading.fire;this._ctx={table:d,index:p.index,isPrimKey:!p.index||d.schema.primKey.keyPath&&p.index===d.schema.primKey.name,range:u,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:c,or:p.or,valueMapper:m!==Ue?m:null}})),this.Table=function(o){return Te(_s.prototype,function(l,u,c){this.db=o,this._tx=c,this.name=l,this.schema=u,this.hook=o._allTables[l]?o._allTables[l].hook:Ne(null,{creating:[us,A],reading:[cs,Ue],updating:[ps,A],deleting:[ds,A]})})}(this),this.Transaction=function(o){return Te(Bs.prototype,function(l,u,c,p,d){this.db=o,this.mode=l,this.storeNames=u,this.schema=c,this.chromeTransactionDurability=p,this.idbtrans=null,this.on=Ne(this,"complete","error","abort"),this.parent=d||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new I((m,v)=>{this._resolve=m,this._reject=v}),this._completion.then(()=>{this.active=!1,this.on.complete.fire()},m=>{var v=this.active;return this.active=!1,this.on.error.fire(m),this.parent?this.parent._reject(m):v&&this.idbtrans&&this.idbtrans.abort(),F(m)})})}(this),this.Version=function(o){return Te(Rs.prototype,function(l){this.db=o,this._cfg={version:l,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})}(this),this.WhereClause=function(o){return Te(ra.prototype,function(l,u,c){this.db=o,this._ctx={table:l,index:u===":id"?null:u,or:c};const p=o._deps.indexedDB;if(!p)throw new P.MissingAPI;this._cmp=this._ascending=p.cmp.bind(p),this._descending=(d,m)=>p.cmp(m,d),this._max=(d,m)=>p.cmp(d,m)>0?d:m,this._min=(d,m)=>p.cmp(d,m)<0?d:m,this._IDBKeyRange=o._deps.IDBKeyRange})}(this),this.on("versionchange",o=>{o.newVersion>0?console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`):console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`),this.close()}),this.on("blocked",o=>{!o.newVersion||o.newVersion<o.oldVersion?console.warn(`Dexie.delete('${this.name}') was blocked`):console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${o.oldVersion/10}`)}),this._maxKey=We(t.IDBKeyRange),this._createTransaction=(o,l,u,c)=>new this.Transaction(o,l,u,this._options.chromeTransactionDurability,c),this._fireOnBlocked=o=>{this.on("blocked").fire(o),Ke.filter(l=>l.name===this.name&&l!==this&&!l._state.vcFired).map(l=>l.on("versionchange").fire(o))},this.use(Ms),this.use(Fs),this.use(Ns),this.use(Os),this.vip=Object.create(this,{_vip:{value:!0}}),s.forEach(o=>o(this))}version(e){if(isNaN(e)||e<.1)throw new P.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new P.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);const t=this._versions;var a=t.filter(s=>s._cfg.version===e)[0];return a||(a=new this.Version(e),t.push(a),t.sort(Ss),a.stores({}),this._state.autoSchema=!1,a)}_whenReady(e){return this.idbdb&&(this._state.openComplete||B.letThrough||this._vip)?e():new I((t,a)=>{if(this._state.openComplete)return a(new P.DatabaseClosed(this._state.dbOpenError));if(!this._state.isBeingOpened){if(!this._options.autoOpen)return void a(new P.DatabaseClosed);this.open().catch(A)}this._state.dbReadyPromise.then(t,a)}).then(e)}use({stack:e,create:t,level:a,name:s}){s&&this.unuse({stack:e,name:s});const r=this._middlewares[e]||(this._middlewares[e]=[]);return r.push({stack:e,create:t,level:a??10,name:s}),r.sort((i,o)=>i.level-o.level),this}unuse({stack:e,name:t,create:a}){return e&&this._middlewares[e]&&(this._middlewares[e]=this._middlewares[e].filter(s=>a?s.create!==a:!!t&&s.name!==t)),this}open(){return Ts(this)}_close(){const e=this._state,t=Ke.indexOf(this);if(t>=0&&Ke.splice(t,1),this.idbdb){try{this.idbdb.close()}catch{}this._novip.idbdb=null}e.dbReadyPromise=new I(a=>{e.dbReadyResolve=a}),e.openCanceller=new I((a,s)=>{e.cancelOpen=s})}close(){this._close();const e=this._state;this._options.autoOpen=!1,e.dbOpenError=new P.DatabaseClosed,e.isBeingOpened&&e.cancelOpen(e.dbOpenError)}delete(){const e=arguments.length>0,t=this._state;return new I((a,s)=>{const r=()=>{this.close();var i=this._deps.indexedDB.deleteDatabase(this.name);i.onsuccess=D(()=>{(function({indexedDB:o,IDBKeyRange:l},u){!fn(o)&&u!==kt&&mn(o,l).delete(u).catch(A)})(this._deps,this.name),a()}),i.onerror=Y(s),i.onblocked=this._fireOnBlocked};if(e)throw new P.InvalidArgument("Arguments not allowed in db.delete()");t.isBeingOpened?t.dbReadyPromise.then(r):r()})}backendDB(){return this.idbdb}isOpen(){return this.idbdb!==null}hasBeenClosed(){const e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"}hasFailed(){return this._state.dbOpenError!==null}dynamicallyOpened(){return this._state.autoSchema}get tables(){return M(this._allTables).map(e=>this._allTables[e])}transaction(){const e=js.apply(this,arguments);return this._transaction.apply(this,e)}_transaction(e,t,a){let s=B.trans;s&&s.db===this&&e.indexOf("!")===-1||(s=null);const r=e.indexOf("?")!==-1;let i,o;e=e.replace("!","").replace("?","");try{if(o=t.map(u=>{var c=u instanceof this.Table?u.name:u;if(typeof c!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return c}),e=="r"||e===Pt)i=Pt;else{if(e!="rw"&&e!=Ct)throw new P.InvalidArgument("Invalid transaction mode: "+e);i=Ct}if(s){if(s.mode===Pt&&i===Ct){if(!r)throw new P.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");s=null}s&&o.forEach(u=>{if(s&&s.storeNames.indexOf(u)===-1){if(!r)throw new P.SubTransaction("Table "+u+" not included in parent transaction.");s=null}}),r&&s&&!s.active&&(s=null)}}catch(u){return s?s._promise(null,(c,p)=>{p(u)}):F(u)}const l=ca.bind(null,this,i,o,s,a);return s?s._promise(i,l,"lock"):B.trans?Re(B.transless,()=>this._whenReady(l)):this._whenReady(l)}table(e){if(!G(this._allTables,e))throw new P.InvalidTable(`Table ${e} does not exist`);return this._allTables[e]}}const Hs=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable";class Vs{constructor(e){this._subscribe=e}subscribe(e,t,a){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:a})}[Hs](){return this}}function da(n,e){return M(e).forEach(t=>{_t(n[t]||(n[t]=new Z),e[t])}),n}function qs(n){let e,t=!1;const a=new Vs(s=>{const r=on(n);let i=!1,o={},l={};const u={get closed(){return i},unsubscribe:()=>{i=!0,ue.storagemutated.unsubscribe(m)}};s.start&&s.start(u);let c=!1,p=!1;function d(){return M(l).some(g=>o[g]&&Ks(o[g],l[g]))}const m=g=>{da(o,g),d()&&v()},v=()=>{if(c||i)return;o={};const g={},y=function(f){r&&Ae();const h=()=>le(n,{subscr:f,trans:null}),w=B.trans?Re(B.transless,h):h();return r&&w.then(se,se),w}(g);p||(ue(Ge,m),p=!0),c=!0,Promise.resolve(y).then(f=>{t=!0,e=f,c=!1,i||(d()?v():(o={},l=g,s.next&&s.next(f)))},f=>{c=!1,t=!1,s.error&&s.error(f),u.unsubscribe()})};return v(),u});return a.hasValue=()=>t,a.getValue=()=>e,a}let sn;try{sn={indexedDB:R.indexedDB||R.mozIndexedDB||R.webkitIndexedDB||R.msIndexedDB,IDBKeyRange:R.IDBKeyRange||R.webkitIDBKeyRange}}catch{sn={indexedDB:null,IDBKeyRange:null}}const he=be;function ht(n){let e=te;try{te=!0,ue.storagemutated.fire(n)}finally{te=e}}Se(he,{...ot,delete:n=>new he(n,{addons:[]}).delete(),exists:n=>new he(n,{addons:[]}).open().then(e=>(e.close(),!0)).catch("NoSuchDatabaseError",()=>!1),getDatabaseNames(n){try{return function({indexedDB:e,IDBKeyRange:t}){return fn(e)?Promise.resolve(e.databases()).then(a=>a.map(s=>s.name).filter(s=>s!==kt)):mn(e,t).toCollection().primaryKeys()}(he.dependencies).then(n)}catch{return F(new P.MissingAPI)}},defineClass:()=>function(n){U(this,n)},ignoreTransaction:n=>B.trans?Re(B.transless,n):n(),vip:tn,async:function(n){return function(){try{var e=nn(n.apply(this,arguments));return e&&typeof e.then=="function"?e:I.resolve(e)}catch(t){return F(t)}}},spawn:function(n,e,t){try{var a=nn(n.apply(t,e||[]));return a&&typeof a.then=="function"?a:I.resolve(a)}catch(s){return F(s)}},currentTransaction:{get:()=>B.trans||null},waitFor:function(n,e){const t=I.resolve(typeof n=="function"?he.ignoreTransaction(n):n).timeout(e||6e4);return B.trans?B.trans.waitFor(t):t},Promise:I,debug:{get:()=>J,set:n=>{Vn(n,n==="dexie"?()=>!0:na)}},derive:Be,extend:U,props:Se,override:Mn,Events:Ne,on:ue,liveQuery:qs,extendObservabilitySet:da,getByKeyPath:ae,setByKeyPath:W,delByKeyPath:function(n,e){typeof e=="string"?W(n,e,void 0):"length"in e&&[].map.call(e,function(t){W(n,t,void 0)})},shallowClone:Kn,deepClone:Je,getObjectDiff:gn,cmp:q,asap:Fn,minKey:Gt,addons:[],connections:Ke,errnames:cn,dependencies:sn,semVer:Ln,version:Ln.split(".").map(n=>parseInt(n)).reduce((n,e,t)=>n+e/Math.pow(10,2*t))}),he.maxKey=We(he.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(ue(Ge,n=>{if(!te){let e;Et?(e=document.createEvent("CustomEvent"),e.initCustomEvent(oe,!0,!0,n)):e=new CustomEvent(oe,{detail:n}),te=!0,dispatchEvent(e),te=!1}}),addEventListener(oe,({detail:n})=>{te||ht(n)}));let te=!1;if(typeof BroadcastChannel<"u"){const n=new BroadcastChannel(oe);typeof n.unref=="function"&&n.unref(),ue(Ge,e=>{te||n.postMessage(e)}),n.onmessage=e=>{e.data&&ht(e.data)}}else if(typeof self<"u"&&typeof navigator<"u"){ue(Ge,e=>{try{te||(typeof localStorage<"u"&&localStorage.setItem(oe,JSON.stringify({trig:Math.random(),changedParts:e})),typeof self.clients=="object"&&[...self.clients.matchAll({includeUncontrolled:!0})].forEach(t=>t.postMessage({type:oe,changedParts:e})))}catch{}}),typeof addEventListener<"u"&&addEventListener("storage",e=>{if(e.key===oe){const t=JSON.parse(e.newValue);t&&ht(t.changedParts)}});const n=self.document&&navigator.serviceWorker;n&&n.addEventListener("message",function({data:e}){e&&e.type===oe&&ht(e.changedParts)})}I.rejectionMapper=function(n,e){if(!n||n instanceof Pe||n instanceof TypeError||n instanceof SyntaxError||!n.name||!_n[n.name])return n;var t=new _n[n.name](e||n.message,n);return"stack"in n&&ne(t,"stack",{get:function(){return this.inner.stack}}),t},Vn(J,na);class Us extends be{constructor(){super("VetCalcDB");b(this,"users");this.version(2).stores({users:"++id, email, isPremium"})}}const it=new Us;class $s{constructor(){b(this,"currentUser",null);const e=localStorage.getItem("vetcalc_current_user");if(e)try{const t=JSON.parse(e);this.currentUser=t,Le.setStatus(t.isPremium)}catch{}}async register(e,t,a){if(await it.users.where("email").equals(e).first())return{success:!1,message:"El email ya está registrado"};const r={email:e,password:t,isPremium:!1,name:a,createdAt:new Date};return await it.users.add(r),{success:!0,message:"Registro exitoso"}}async login(e,t){const a=await it.users.where("email").equals(e).first();return!a||a.password!==t?{success:!1,message:"Credenciales incorrectas"}:(this.currentUser=a,localStorage.setItem("vetcalc_current_user",JSON.stringify(a)),Le.setStatus(a.isPremium),{success:!0,message:"Login exitoso"})}logout(){this.currentUser=null,localStorage.removeItem("vetcalc_current_user"),Le.setStatus(!1)}isLoggedIn(){return this.currentUser!==null}getCurrentUser(){return this.currentUser}async upgradeToPremium(){!this.currentUser||!this.currentUser.id||(this.currentUser.isPremium=!0,await it.users.update(this.currentUser.id,{isPremium:!0}),localStorage.setItem("vetcalc_current_user",JSON.stringify(this.currentUser)),Le.setStatus(!0))}}const It=new $s;class zs extends de{constructor(){super();b(this,"view");this.view=new Xa}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onLoginClick(async()=>{const t=this.view.getEmail(),a=this.view.getPassword(),s=await It.login(t,a);s.success?await O.navigate("home"):this.view.showError(s.message)}),this.view.onRegisterLinkClick(async()=>{await O.navigate("register")})}destroy(){console.log("[LoginController] Destroyed")}}const Gs=`
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
`;class Ws{constructor(){b(this,"nameInput",null);b(this,"emailInput",null);b(this,"passwordInput",null);b(this,"confirmInput",null);b(this,"registerBtn",null);b(this,"loginLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Gs),this.cacheElements()}cacheElements(){this.nameInput=document.getElementById("reg-name"),this.emailInput=document.getElementById("reg-email"),this.passwordInput=document.getElementById("reg-password"),this.confirmInput=document.getElementById("reg-confirm"),this.registerBtn=document.getElementById("register-btn"),this.loginLink=document.getElementById("go-to-login")}getName(){var e;return((e=this.nameInput)==null?void 0:e.value)||""}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}getConfirm(){var e;return((e=this.confirmInput)==null?void 0:e.value)||""}onRegisterClick(e){var t;(t=this.registerBtn)==null||t.addEventListener("click",e)}onLoginLinkClick(e){var t;(t=this.loginLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}class Ys extends de{constructor(){super();b(this,"view");this.view=new Ws}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onRegisterClick(async()=>{const t=this.view.getName(),a=this.view.getEmail(),s=this.view.getPassword(),r=this.view.getConfirm();if(!t||!a||!s){this.view.showError("Todos los campos son obligatorios");return}if(s!==r){this.view.showError("Las contraseñas no coinciden");return}const i=await It.register(a,s,t);i.success?(alert("Registro exitoso. Ahora inicia sesión."),await O.navigate("login")):this.view.showError(i.message)}),this.view.onLoginLinkClick(async()=>{await O.navigate("login")})}destroy(){console.log("[RegisterController] Destroyed")}}let Ve=null;function pa(){Ve&&(Ve.destroy(),Ve=null)}function Tn(n,e){O.register(n,async()=>{pa();const t=e();Ve=t,await t.init()})}function X(n,e){O.register(n,async()=>{if(!It.isLoggedIn()){await O.navigate("login");return}pa();const t=e();Ve=t,await t.init()})}class Js{async init(){if(O.register("splash",async()=>{await new va().init()}),Tn("login",()=>new zs),Tn("register",()=>new Ys),X("home",()=>new La),X("patients",()=>new Ga),X("library",()=>new Ua),X("history",()=>new Ha),X("fluidotherapy",()=>new Oa),X("dosage",()=>new ja),X("converter",()=>new Ca),X("anesthesia",()=>new Ra),X("premium",()=>new Ja),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("[SW] OK",t)).catch(t=>console.log("[SW] ERROR",t))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await O.navigate("splash");else{let t=O.resolveInitialRoute();!It.isLoggedIn()&&t!=="splash"&&t!=="login"&&t!=="register"&&(t="login"),await O.navigate(t)}}}new Js().init();
