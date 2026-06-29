var hn=Object.defineProperty;var mn=(a,e,t)=>e in a?hn(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var m=(a,e,t)=>mn(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class fn{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(n){console.error(`[Router] Error in ${e}:`,n),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const N=new fn,gn=`
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
`;class bn{constructor(){m(this,"progressBar",null);m(this,"messageElement",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=gn),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const ba=2800,va=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],ya=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class vn{constructor(){m(this,"view");m(this,"progress",0);m(this,"messageIndex",0);m(this,"intervalId",null);this.view=new bn}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const n=Date.now()-t;this.progress=Math.min(100,n/ba*100),this.view.updateProgress(this.progress),Math.floor(n/700)>this.messageIndex&&this.messageIndex<va.length-1&&(this.messageIndex++,this.view.updateMessage(va[this.messageIndex])),n>=ba&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await N.navigate("home")}}const yn=`
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

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON ANIMACIONES MEJORADAS ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface/90 backdrop-blur-sm dark:bg-surface h-[68px] z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
  
  <!-- Inicio (activo) -->
  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="home">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">home</span>
    <span class="font-label-sm text-label-sm mt-0.5">Inicio</span>
    <!-- Punto indicador decorativo -->
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <!-- Pacientes -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="patients">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">pets</span>
    <span class="font-label-sm text-label-sm mt-0.5">Pacientes</span>
  </a>

  <!-- Convertidor -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">sync_alt</span>
    <span class="font-label-sm text-label-sm mt-0.5">Convertidor</span>
  </a>

  <!-- Biblioteca -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <!-- Historial -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>

</nav>
`;class xn{constructor(){Object.defineProperty(this,"recentHistoryContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"tipElement",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsSection",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=yn),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section")}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const wn=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],En=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],kn={activeCases:24,inSurgery:3,todayCalculations:7};class _n{getRecentPatients(e=4){return wn.slice(0,e)}getRecentHistory(e=5){return En.slice(0,e)}getDashboardStats(){return{...kn}}}const mt=new _n;class Ln{constructor(){m(this,"isPremium",!1);m(this,"listeners",[]);const e=localStorage.getItem("vetcalc-premium");this.isPremium=e==="true"}getStatus(){return this.isPremium}setStatus(e){this.isPremium=e,localStorage.setItem("vetcalc-premium",String(e)),this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{const t=this.listeners.indexOf(e);t!==-1&&this.listeners.splice(t,1)}}notifyListeners(){this.listeners.forEach(e=>e(this.isPremium))}}const Ce=new Ln;function xa(a){document.querySelectorAll(".premium-badge").forEach(t=>{a?(t.classList.remove("bg-surface-container-high","text-on-surface-variant","border-outline-variant"),t.classList.add("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary")):(t.classList.remove("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary"),t.classList.add("bg-surface-container-high","text-on-surface-variant","border-outline-variant"))})}class re{constructor(){m(this,"premiumUnsubscribe",null)}setupGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{if(e._navListener)return;const t=async n=>{n.preventDefault();const s=e.getAttribute("data-route");s&&await N.navigate(s)};e.addEventListener("click",t),e._navListener=t})}initPremiumBadge(){const e=Ce.getStatus();xa(e),this.premiumUnsubscribe=Ce.subscribe(t=>{xa(t)})}destroyPremiumBadge(){this.premiumUnsubscribe&&(this.premiumUnsubscribe(),this.premiumUnsubscribe=null)}destroyGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e._navListener&&(e.removeEventListener("click",e._navListener),delete e._navListener)})}}class Cn extends re{constructor(){super();m(this,"view");m(this,"onlineStatus",!0);m(this,"onlineHandler",()=>{this.updateOnlineStatus(!0)});m(this,"offlineHandler",()=>{this.updateOnlineStatus(!1)});this.view=new xn}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(t=>{const n=t;n.addEventListener("click",s=>{const r=document.createElement("span");r.classList.add("ripple"),n.appendChild(r);const i=n.getBoundingClientRect(),l=s.clientX-i.left,o=s.clientY-i.top;r.style.left=`${l}px`,r.style.top=`${o}px`,setTimeout(()=>r.remove(),600)})}),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupSpecificListeners(),this.setupElements(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),this.destroyPremiumBadge(),console.log("[HomeController] Destroyed")}setupSpecificListeners(){const t=this.view.getSearchButton();t&&t.addEventListener("click",()=>console.log("[Home] Search clicked"));const n=this.view.getProfileButton();n&&n.addEventListener("click",()=>console.log("[Home] Profile clicked"));const s=this.view.getViewAllHistoryButton();s&&s.addEventListener("click",async()=>this.navigateToModule("history"));const r=this.view.getViewAllPatientsButton();r&&r.addEventListener("click",async()=>this.navigateToModule("patients"))}setupElements(){this.view.showRecentPatientsSection()}async navigateToModule(t){console.log(`[Home] Navigating to: ${t}`),await N.navigate(t)}renderRecentPatients(){const t=mt.getRecentPatients(4),n=this.view.getRecentPatientsContainer();n&&(n.innerHTML="",t.forEach(s=>{n.appendChild(this.createPatientCard(s))}))}createPatientCard(t){const n=document.createElement("div");n.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const s=(t.species==="canine","pets");return n.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(t.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${t.species} • ${t.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${t.status}</span>
    `,n.style.cursor="pointer",n.addEventListener("click",()=>console.log(`[Home] View patient: ${t.name}`)),n}renderRecentHistory(){const t=mt.getRecentHistory(2),n=this.view.getRecentHistoryContainer();n&&(n.innerHTML="",t.forEach(s=>{n.appendChild(this.createHistoryItem(s))}))}createHistoryItem(t){const n=document.createElement("div");n.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let s="history",r="bg-secondary-fixed";switch(t.type){case"dosage":s="medication",r="bg-secondary-fixed";break;case"fluidotherapy":s="water_drop",r="bg-secondary-fixed";break;case"anesthesia":s="air",r="bg-tertiary-fixed";break;case"converter":s="sync_alt",r="bg-surface-container-highest";break}const i=this.getRelativeTime(t.createdAt),l=t.summary.substring(0,40)+(t.summary.length>40?"...":""),o=t.patientName||"Unknown",d=t.patientSpecies||"N/A",c=t.patientWeightKg||"?";return n.innerHTML=`
      <div class="w-10 h-10 rounded-full ${r} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(l)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(o)} (${d}, ${c}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${i}</span>
    `,n.style.cursor="pointer",n.addEventListener("click",()=>console.log(`[Home] View calculation: ${t.type}`)),n}getRelativeTime(t){const n=Date.now()-t.getTime(),s=Math.floor(n/6e4),r=Math.floor(n/36e5),i=Math.floor(n/864e5);return s<1?"Just now":s<60?`${s}m ago`:r<24?`${r}h ago`:`${i}d ago`}renderTipOfTheDay(){const t=ya[Math.floor(Math.random()*ya.length)],n=this.view.getTipElement();n&&(n.textContent=t.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(t){this.onlineStatus=t;let n=document.getElementById("online-status");if(n||document.querySelector("header")&&(n=document.createElement("div"),n.id="online-status",n.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(n,document.body.firstChild)),n)if(t)n.textContent="● Online",n.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{n&&this.onlineStatus&&(n.style.opacity="0",setTimeout(()=>{if(n&&this.onlineStatus){n.style.display="none";const s=document.querySelector("header");s&&(s.style.marginTop="0px")}},300))},3e3);else{n.textContent="⚠ You are offline - Some features may be limited",n.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",n.style.display="block";const s=document.querySelector("header");s&&(s.style.marginTop="24px")}}escapeHtml(t){const n=document.createElement("div");return n.textContent=t,n.innerHTML}}const In=`
<!-- ===== FONDO CON ESTILO SPLASH (bg-neutral + vet-pattern) ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER (igual que Home) ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Convertidor</span>
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

<main class="relative z-10 max-w-md mx-auto px-container-padding pt-6 space-y-stack-lg pb-24">
  <!-- Segmented Tab Selector -->
  <div class="bg-white/80 backdrop-blur-sm rounded-xl border border-outline-variant shadow-sm p-1 flex justify-between items-center animate-fade-in-up">
    <button class="flex-1 py-3 text-center rounded-lg transition-all duration-200 font-label-md text-label-md bg-white text-primary shadow-sm hover:bg-primary/5" data-mode="weight">
      Peso
    </button>
    <button class="flex-1 py-3 text-center rounded-lg transition-all duration-200 font-label-md text-label-md text-on-surface-variant hover:bg-primary/5" data-mode="temp">
      Temperatura
    </button>
    <button class="flex-1 py-3 text-center rounded-lg transition-all duration-200 font-label-md text-label-md text-on-surface-variant hover:bg-primary/5" data-mode="volume">
      Volumen
    </button>
  </div>

  <!-- Conversion Canvas -->
  <div class="space-y-stack-md animate-fade-in-up" style="animation-delay: 50ms;">
    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-container-padding shadow-md border border-outline-variant">
      <div class="flex flex-col space-y-stack-lg">
        <!-- Input Section 1 -->
        <div class="space-y-stack-sm">
          <label class="font-label-sm text-label-sm text-on-surface-variant ml-1" id="label-left">Libras (lb)</label>
          <div class="relative flex items-center">
            <input class="w-full h-touch-target-min bg-white/50 border-2 border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg px-4 font-headline-xl text-headline-xl text-primary transition-all duration-200 placeholder:text-on-surface-variant/50" id="input-left" type="number" placeholder="0.0" step="any">
            <span class="absolute right-4 font-label-md text-label-md text-on-surface-variant pointer-events-none" id="unit-left">lb</span>
          </div>
        </div>
        <!-- Swap Icon -->
        <div class="flex justify-center -my-3 z-10">
          <button class="bg-primary text-white p-2 rounded-full shadow-lg hover:shadow-xl active:rotate-180 transition-all duration-300 hover:scale-105" id="swap-btn">
            <span class="material-symbols-outlined">sync_alt</span>
          </button>
        </div>
        <!-- Input Section 2 -->
        <div class="space-y-stack-sm">
          <label class="font-label-sm text-label-sm text-on-surface-variant ml-1" id="label-right">Kilogramos (kg)</label>
          <div class="relative flex items-center">
            <input class="w-full h-touch-target-min bg-white/50 border-2 border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg px-4 font-headline-xl text-headline-xl text-primary transition-all duration-200 placeholder:text-on-surface-variant/50" id="input-right" type="number" placeholder="0.0" step="any">
            <span class="absolute right-4 font-label-md text-label-md text-on-surface-variant pointer-events-none" id="unit-right">kg</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick References -->
    <div class="grid grid-cols-1 gap-gutter">
      <div class="bg-white/80 backdrop-blur-sm p-container-padding rounded-xl border-l-4 border-primary shadow-sm">
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
  <div class="grid grid-cols-2 gap-gutter animate-fade-in-up" style="animation-delay: 100ms;">
    <div class="col-span-2 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-secondary/20 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p class="font-label-sm text-label-sm text-secondary">Modo Avanzado</p>
        <p class="font-headline-md text-headline-md text-on-surface">Fluidoterapia</p>
      </div>
      <button class="bg-secondary text-white px-4 py-2 rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 hover:-translate-y-0.5" data-route="fluidotherapy">
        Calcular
      </button>
    </div>
    <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-outline-variant flex flex-col justify-between h-32 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200" data-route="dosage">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">medical_services</span>
      <p class="font-label-md text-label-md font-bold">Dosis</p>
    </div>
    <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-outline-variant flex flex-col justify-between h-32 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200" data-route="history">
      <span class="material-symbols-outlined text-tertiary">star</span>
      <p class="font-label-md text-label-md font-bold">Guardados</p>
    </div>
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

  <a class="relative flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">sync_alt</span>
    <span class="font-label-sm text-label-sm mt-0.5">Convertidor</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>
</nav>

</nav>
`;class An{constructor(){m(this,"container",null);m(this,"inputLeft",null);m(this,"inputRight",null);m(this,"labelLeft",null);m(this,"labelRight",null);m(this,"unitLeft",null);m(this,"unitRight",null);m(this,"referenceText",null);m(this,"tabs",null);m(this,"swapBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=In),this.cacheElements()}cacheElements(){this.inputLeft=document.getElementById("input-left"),this.inputRight=document.getElementById("input-right"),this.labelLeft=document.getElementById("label-left"),this.labelRight=document.getElementById("label-right"),this.unitLeft=document.getElementById("unit-left"),this.unitRight=document.getElementById("unit-right"),this.referenceText=document.getElementById("reference-text"),this.tabs=document.querySelectorAll("[data-mode]"),this.swapBtn=document.getElementById("swap-btn")}getInputLeft(){return this.inputLeft}getInputRight(){return this.inputRight}getLabelLeft(){return this.labelLeft}getLabelRight(){return this.labelRight}getUnitLeft(){return this.unitLeft}getUnitRight(){return this.unitRight}getReferenceText(){return this.referenceText}getTabs(){return this.tabs}getSwapBtn(){return this.swapBtn}updateLeftLabel(e){this.labelLeft&&(this.labelLeft.textContent=e)}updateRightLabel(e){this.labelRight&&(this.labelRight.textContent=e)}updateLeftUnit(e){this.unitLeft&&(this.unitLeft.textContent=e)}updateRightUnit(e){this.unitRight&&(this.unitRight.textContent=e)}updateReference(e){this.referenceText&&(this.referenceText.textContent=e)}clearInputs(){this.inputLeft&&(this.inputLeft.value=""),this.inputRight&&(this.inputRight.value="")}setInputLeftValue(e){this.inputLeft&&e!==void 0&&(this.inputLeft.value=e)}setInputRightValue(e){this.inputRight&&e!==void 0&&(this.inputRight.value=e)}getInputLeftValue(){const e=this.inputLeft;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const n=parseFloat(t);return isNaN(n)?null:n}getInputRightValue(){const e=this.inputRight;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const n=parseFloat(t);return isNaN(n)?null:n}}class Bn extends re{constructor(){super();m(this,"view");m(this,"currentMode","weight");m(this,"modes",{weight:{leftLabel:"Libras (lb)",leftUnit:"lb",rightLabel:"Kilogramos (kg)",rightUnit:"kg",reference:"Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.",convert:(t,n)=>n==="leftToRight"?t/2.20462:t*2.20462},temp:{leftLabel:"Fahrenheit (°F)",leftUnit:"°F",rightLabel:"Celsius (°C)",rightUnit:"°C",reference:"Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).",convert:(t,n)=>n==="leftToRight"?(t-32)*5/9:t*9/5+32},volume:{leftLabel:"Onzas líquidas (fl oz)",leftUnit:"fl oz",rightLabel:"Mililitros (mL)",rightUnit:"mL",reference:"Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).",convert:(t,n)=>n==="leftToRight"?t*29.5735:t/29.5735}});this.view=new An}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.applyMode("weight")}setupEventListeners(){const t=this.view.getTabs();t==null||t.forEach(i=>{i.addEventListener("click",()=>{const l=i.getAttribute("data-mode");l&&this.modes[l]&&this.applyMode(l)})});const n=this.view.getInputLeft(),s=this.view.getInputRight();n==null||n.addEventListener("input",()=>this.convertFromLeft()),s==null||s.addEventListener("input",()=>this.convertFromRight());const r=this.view.getSwapBtn();r==null||r.addEventListener("click",()=>this.swap())}applyMode(t){this.currentMode=t;const n=this.modes[t];this.view.updateLeftLabel(n.leftLabel),this.view.updateRightLabel(n.rightLabel),this.view.updateLeftUnit(n.leftUnit),this.view.updateRightUnit(n.rightUnit),this.view.updateReference(n.reference),this.view.clearInputs();const s=this.view.getTabs();s==null||s.forEach(r=>{r.getAttribute("data-mode")===t?(r.classList.add("bg-surface","text-primary","shadow-sm"),r.classList.remove("text-on-surface-variant","hover:bg-surface-container-high")):(r.classList.remove("bg-surface","text-primary","shadow-sm"),r.classList.add("text-on-surface-variant","hover:bg-surface-container-high"))})}convertFromLeft(){const t=this.view.getInputLeftValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"leftToRight");this.view.setInputRightValue(s.toFixed(2))}else this.view.setInputRightValue("")}convertFromRight(){const t=this.view.getInputRightValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"rightToLeft");this.view.setInputLeftValue(s.toFixed(2))}else this.view.setInputLeftValue("")}swap(){const t=this.view.getInputLeftValue(),n=this.view.getInputRightValue();t!==null?this.view.setInputRightValue(t.toFixed(2)):this.view.setInputRightValue(""),n!==null?this.view.setInputLeftValue(n.toFixed(2)):this.view.setInputLeftValue(""),this.convertFromLeft()}destroy(){this.destroyPremiumBadge(),console.log("[ConverterController] Destroyed")}}const Pn=`
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Protocolo de Anestesia</span>
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

<main class="relative z-10 max-w-xl mx-auto px-container-padding py-6 space-y-6 pb-24">

  <!-- ===== DETALLES DEL PACIENTE ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-outline-variant animate-fade-in-up">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface">Detalles del Paciente</h2>
        <p class="text-on-surface-variant font-body-md" id="patient-details">Canino • Golden Retriever • 28.5 kg</p>
      </div>
      <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">pets</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
        <p class="text-label-sm font-label-sm text-outline">ESTADO ASA</p>
        <p class="text-headline-md font-headline-md text-primary" id="asa-status">Clase II</p>
      </div>
      <div class="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
        <p class="text-label-sm font-label-sm text-outline">PESO</p>
        <p class="text-headline-md font-headline-md text-primary" id="weight-display">28.5 kg</p>
      </div>
    </div>
  </section>

  <!-- ===== PREMEDICACIÓN ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 50ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Premedicación</h3>
    </div>
    <div class="grid gap-3" id="premed-list">
      <!-- Los fármacos se generarán dinámicamente desde el controlador -->
    </div>
  </div>

  <!-- ===== INDUCCIÓN ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 100ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Inducción</h3>
    </div>
    <div class="grid gap-3" id="induction-list"></div>
  </div>

  <!-- ===== MANTENIMIENTO ===== -->
  <div class="space-y-3 animate-fade-in-up" style="animation-delay: 150ms;">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</span>
      <h3 class="font-headline-md text-headline-md text-on-surface">Mantenimiento</h3>
    </div>
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-outline-variant shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-label-md text-label-md text-on-surface font-bold">Isoflurano</p>
          <p class="text-body-md text-on-surface-variant">Anestésico inhalatorio</p>
        </div>
        <div class="px-4 py-2 bg-secondary-container/30 rounded-lg border border-secondary/20">
          <p class="font-headline-md text-headline-md text-on-secondary-container">1.5 - 2.5%</p>
        </div>
      </div>
      <div class="pt-4 border-t border-outline-variant/30">
        <div class="flex justify-between items-center mb-3">
          <p class="font-label-md text-label-md text-on-surface">Flujo de Oxígeno</p>
          <span class="text-label-sm text-outline">Sistema con rebreathing</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-surface rounded-lg border border-outline-variant/30">
            <p class="text-label-sm text-outline">INDUCCIÓN</p>
            <p class="font-body-lg text-primary font-bold">2.8 L/min</p>
          </div>
          <div class="p-3 bg-surface rounded-lg border border-outline-variant/30">
            <p class="text-label-sm text-outline">MANTENIMIENTO</p>
            <p class="font-body-lg text-primary font-bold">0.8 L/min</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== RESUMEN DEL PROTOCOLO CON PANEL EXPANDIBLE ===== -->
  <section class="space-y-4 pt-4 animate-fade-in-up" style="animation-delay: 200ms;">
    <div class="flex justify-between items-end">
      <h3 class="font-headline-xl text-headline-xl text-on-surface">Resumen del Protocolo</h3>
      <button class="flex items-center gap-1 text-primary font-label-md hover:scale-105 transition-all" id="print-pdf-btn">
        <span class="material-symbols-outlined text-[18px]">print</span>
        IMPRIMIR PDF
      </button>
    </div>
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-primary text-white">
          <tr>
            <th class="p-4 font-label-md text-label-md">FÁRMACO</th>
            <th class="p-4 font-label-md text-label-md">DOSIS</th>
            <th class="p-4 font-label-md text-label-md text-right">VOLUMEN</th>
          </tr>
        </thead>
        <tbody id="summary-table-body" class="divide-y divide-outline-variant/30">
          <!-- Se llenará dinámicamente -->
        </tbody>
      </table>
      <div class="bg-primary-container/30 p-4 flex justify-between items-center text-on-primary-container border-t border-outline-variant/30">
        <span class="font-label-md text-label-md">FLUIDOS ESTIMADOS (1 hora)</span>
        <span class="font-headline-md text-headline-md text-primary font-bold" id="total-fluids">142.5 mL</span>
      </div>
    </div>

    <!-- Botón para expandir detalles del cálculo (cascada) -->
    <button class="w-full flex items-center justify-center gap-2 text-sm font-label-md bg-white/80 backdrop-blur-sm border border-outline-variant rounded-xl py-3 transition-all hover:bg-surface-container/50" id="expand-details-btn">
      <span class="material-symbols-outlined text-[18px]">expand_more</span>
      Ver detalles del protocolo
    </button>

    <!-- Panel expandible con detalles adicionales -->
    <div id="details-panel" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant p-5 hidden transition-all duration-300 space-y-3">
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p class="text-on-surface-variant opacity-70">Peso del paciente</p>
          <p class="font-bold text-on-surface" id="detail-weight">28.5 kg</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Estado ASA</p>
          <p class="font-bold text-on-surface" id="detail-asa">Clase II</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Fármacos seleccionados</p>
          <p class="font-bold text-on-surface" id="detail-drugs">3</p>
        </div>
        <div>
          <p class="text-on-surface-variant opacity-70">Fluidos totales (24h)</p>
          <p class="font-bold text-primary" id="detail-fluids">142.5 mL</p>
        </div>
      </div>
      <div class="pt-3 border-t border-outline-variant/30">
        <p class="text-on-surface-variant text-xs">* Cálculos basados en el peso del paciente y las dosis seleccionadas. Revisar clínicamente antes de administrar.</p>
      </div>
    </div>
  </section>

  <!-- ===== ÁREA DE ACCIÓN ===== -->
  <div class="pt-4 animate-fade-in-up" style="animation-delay: 250ms;">
    <button class="w-full bg-primary text-white h-touch-target-min rounded-xl font-headline-md shadow-lg hover:shadow-xl active:scale-95 transition-all" id="finalize-btn">
      Finalizar y Guardar Protocolo
    </button>
    <p class="text-center text-label-sm text-outline mt-3">Cálculos basados en 28.5 kg. Revisar clínicamente antes de administrar.</p>
  </div>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON 5 PESTAÑAS ===== -->
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

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="anesthesia">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">air</span>
    <span class="font-label-sm text-label-sm mt-0.5">Anestesia</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<!-- ===== SCRIPT PARA EL PANEL DE DETALLES ===== -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expand-details-btn');
    const detailsPanel = document.getElementById('details-panel');
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', function() {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles del protocolo';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del protocolo';
        }
      });
    }

    // Observar cambios en la tabla para actualizar detalles
    const observer = new MutationObserver(() => {
      const weight = document.getElementById('weight-display')?.textContent || '28.5 kg';
      const asa = document.getElementById('asa-status')?.textContent || 'Clase II';
      const fluids = document.getElementById('total-fluids')?.textContent || '142.5 mL';
      const drugRows = document.querySelectorAll('#summary-table-body tr').length || 0;

      const detailWeight = document.getElementById('detail-weight');
      const detailAsa = document.getElementById('detail-asa');
      const detailDrugs = document.getElementById('detail-drugs');
      const detailFluids = document.getElementById('detail-fluids');

      if (detailWeight) detailWeight.textContent = weight;
      if (detailAsa) detailAsa.textContent = asa;
      if (detailDrugs) detailDrugs.textContent = drugRows.toString();
      if (detailFluids) detailFluids.textContent = fluids;
    });

    // Observar la tabla resumen
    const tableBody = document.getElementById('summary-table-body');
    if (tableBody) {
      observer.observe(tableBody, { childList: true, subtree: true });
    }

    // Actualizar también cuando cambien los checkboxes
    document.addEventListener('change', function(e) {
      if (e.target && e.target.matches('input[type="checkbox"]')) {
        setTimeout(() => {
          const drugRows = document.querySelectorAll('#summary-table-body tr').length || 0;
          const detailDrugs = document.getElementById('detail-drugs');
          if (detailDrugs) detailDrugs.textContent = drugRows.toString();
        }, 100);
      }
    });
  });
<\/script>
`;class Sn{constructor(){m(this,"container",null);m(this,"patientDetailsEl",null);m(this,"weightDisplayEl",null);m(this,"asaStatusEl",null);m(this,"premedListEl",null);m(this,"inductionListEl",null);m(this,"summaryBodyEl",null);m(this,"totalFluidsEl",null);m(this,"finalizeBtn",null);m(this,"printBtn",null);m(this,"expandBtn",null);m(this,"detailsPanel",null);m(this,"detailWeight",null);m(this,"detailAsa",null);m(this,"detailDrugs",null);m(this,"detailFluids",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Pn),this.cacheElements()}cacheElements(){this.patientDetailsEl=document.getElementById("patient-details"),this.weightDisplayEl=document.getElementById("weight-display"),this.asaStatusEl=document.getElementById("asa-status"),this.premedListEl=document.getElementById("premed-list"),this.inductionListEl=document.getElementById("induction-list"),this.summaryBodyEl=document.getElementById("summary-table-body"),this.totalFluidsEl=document.getElementById("total-fluids"),this.finalizeBtn=document.getElementById("finalize-btn"),this.printBtn=document.getElementById("print-pdf-btn"),this.expandBtn=document.getElementById("expand-details-btn"),this.detailsPanel=document.getElementById("details-panel"),this.detailWeight=document.getElementById("detail-weight"),this.detailAsa=document.getElementById("detail-asa"),this.detailDrugs=document.getElementById("detail-drugs"),this.detailFluids=document.getElementById("detail-fluids")}getPremedList(){return this.premedListEl}getInductionList(){return this.inductionListEl}getSummaryBody(){return this.summaryBodyEl}getTotalFluidsEl(){return this.totalFluidsEl}getFinalizeBtn(){return this.finalizeBtn}getPrintBtn(){return this.printBtn}getExpandBtn(){return this.expandBtn}getDetailsPanel(){return this.detailsPanel}updatePatientInfo(e,t,n,s){this.patientDetailsEl&&(this.patientDetailsEl.textContent=`${e} • ${t} • ${n} kg`),this.weightDisplayEl&&(this.weightDisplayEl.textContent=`${n} kg`),this.asaStatusEl&&(this.asaStatusEl.textContent=s)}updateDetailPanel(e,t,n,s){this.detailWeight&&(this.detailWeight.textContent=`${e} kg`),this.detailAsa&&(this.detailAsa.textContent=t),this.detailDrugs&&(this.detailDrugs.textContent=n.toString()),this.detailFluids&&(this.detailFluids.textContent=`${s.toFixed(1)} mL`)}renderDrugList(e,t,n,s){e.innerHTML="";for(const r of t){const i=document.createElement("label");i.className=`flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border shadow-sm hover:shadow-md cursor-pointer transition-all ${r.selected?"border-primary":"border-outline-variant"}`;const l=document.createElement("input");l.type="checkbox",l.checked=r.selected,l.className="w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox",l.addEventListener("change",c=>{const p=c.target.checked;n(r.name,p),p?(i.classList.add("border-primary"),i.classList.remove("opacity-80")):(i.classList.remove("border-primary"),i.classList.add("opacity-80"))});const o=document.createElement("div");o.className="flex-grow",o.innerHTML=`
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface font-semibold">${r.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${r.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${r.category==="premed"?"Sedante / Analgésico":"Agente de inducción"}</p>
      `;const d=document.createElement("div");d.className="text-right",d.id=`drug-values-${r.name.replace(/\s/g,"")}`,this.updateDrugValuesUI(d,r,s),i.appendChild(l),i.appendChild(o),i.appendChild(d),e.appendChild(i)}}updateDrugValuesUI(e,t,n){const s=t.dosePerKg*n,r=s/t.concentration;e.innerHTML=`
      <p class="font-headline-md text-headline-md text-primary">${s.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${r.toFixed(2)} mL</p>
    `}renderSummary(e,t,n){if(this.summaryBodyEl){this.summaryBodyEl.innerHTML="";for(const s of e){if(!s.selected)continue;const r=s.dosePerKg*t,i=r/s.concentration,l=document.createElement("tr");l.className="border-b border-outline-variant/30 hover:bg-surface-container/20 transition-colors",l.innerHTML=`
        <td class="p-4">
          <p class="font-label-md text-label-md text-on-surface font-semibold">${s.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${s.category==="premed"?"Premedicación":"Inducción"}</p>
        </td>
        <td class="p-4 font-body-md">${r.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${i.toFixed(2)} mL</td>
      `,this.summaryBodyEl.appendChild(l)}this.totalFluidsEl&&(this.totalFluidsEl.textContent=`${n.toFixed(1)} mL`)}}}class Rn extends re{constructor(){super();m(this,"view");m(this,"weightKg",28.5);m(this,"asaStatus","Clase II");m(this,"drugs",[{name:"Acepromazina",dosePerKg:.02,concentration:10,category:"premed",selected:!0},{name:"Butorfanol",dosePerKg:.2,concentration:10,category:"premed",selected:!0},{name:"Propofol",dosePerKg:4,concentration:10,category:"induction",selected:!0}]);this.view=new Sn}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.renderDrugLists(),this.updateSummaryAndFluids(),this.setupExpandPanel()}setupEventListeners(){const t=this.view.getFinalizeBtn();t==null||t.addEventListener("click",()=>{alert("Protocolo guardado (simulación)"),console.log("Protocolo finalizado:",this.drugs.filter(s=>s.selected))});const n=this.view.getPrintBtn();n==null||n.addEventListener("click",()=>{console.log("Generar PDF")})}setupExpandPanel(){const t=this.view.getExpandBtn(),n=this.view.getDetailsPanel();t&&n&&t.addEventListener("click",()=>{n.classList.contains("hidden")?(n.classList.remove("hidden"),t.innerHTML='<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles del protocolo'):(n.classList.add("hidden"),t.innerHTML='<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del protocolo')})}renderDrugLists(){const t=this.view.getPremedList(),n=this.view.getInductionList();if(!t||!n)return;const s=this.drugs.filter(i=>i.category==="premed"),r=this.drugs.filter(i=>i.category==="induction");this.view.renderDrugList(t,s,(i,l)=>{const o=this.drugs.find(d=>d.name===i);o&&(o.selected=l),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()},this.weightKg),this.view.renderDrugList(n,r,(i,l)=>{const o=this.drugs.find(d=>d.name===i);o&&(o.selected=l),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()},this.weightKg)}refreshDrugValuesUI(){for(const t of this.drugs){const n=document.getElementById(`drug-values-${t.name.replace(/\s/g,"")}`);n&&this.view.updateDrugValuesUI(n,t,this.weightKg)}}updateSummaryAndFluids(){const t=this.drugs.filter(s=>s.selected),n=this.weightKg*5;this.view.renderSummary(t,this.weightKg,n),this.view.updateDetailPanel(this.weightKg,this.asaStatus,t.length,n)}destroy(){this.destroyPremiumBadge(),console.log("[AnesthesiaController] Destroyed")}}const Dn=`
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Calculadora de Dosis</h1>
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

<main class="relative z-10 px-container-padding pt-6 max-w-md mx-auto pb-24">

  <!-- ===== INSTRUCCIONES ===== -->
  <div class="mb-4 animate-fade-in-up">
    <p class="font-body-md text-body-md text-on-surface-variant bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-outline-variant shadow-sm">Ingrese los datos del paciente para calcular volúmenes precisos de medicamentos. Todos los resultados deben ser verificados por un clínico autorizado.</p>
  </div>

  <!-- ===== FORMULARIO ===== -->
  <div class="space-y-4 animate-fade-in-up" style="animation-delay: 50ms;">
    <!-- Nombre del fármaco -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="drug-name">Nombre del fármaco</label>
      <div class="relative">
        <input class="w-full h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="drug-name" type="text" placeholder="Buscar fármaco...">
        <span class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
      </div>
    </div>

    <!-- Peso -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="weight">Peso del paciente</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="weight" type="number" placeholder="0.0" step="any" value="28.5">
        <span class="h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">kg</span>
      </div>
    </div>

    <!-- Dosis -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="dosage">Dosis</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="dosage" type="number" placeholder="0.0" step="any" value="5">
        <span class="h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">mg/kg</span>
      </div>
    </div>

    <!-- Concentración -->
    <div class="space-y-1">
      <label class="font-label-md text-label-md text-on-surface-variant" for="concentration">Concentración</label>
      <div class="flex items-center">
        <input class="w-full h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-outline-variant rounded-l-lg font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" id="concentration" type="number" placeholder="0.0" step="any" value="50">
        <span class="h-touch-target-min px-4 bg-white/80 backdrop-blur-sm border border-l-0 border-outline-variant rounded-r-lg flex items-center justify-center font-label-md text-label-md text-on-surface-variant">mg/mL</span>
      </div>
    </div>
  </div>

  <!-- ===== BOTÓN CALCULAR ===== -->
  <div class="mt-4 animate-fade-in-up" style="animation-delay: 100ms;">
    <button class="w-full h-touch-target-min bg-primary text-white rounded-xl font-headline-md text-headline-md font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg hover:shadow-xl" id="calculate-btn">
      <span class="material-symbols-outlined">calculate</span>
      Calcular
    </button>
  </div>

  <!-- ===== RESULTADOS CON EXPANSIÓN EN CASCADA ===== -->
  <div class="mt-6 calculation-card animate-fade-in-up" style="animation-delay: 150ms;">
    <div id="result-container" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-md p-5 hidden transition-all duration-300">
      <div class="flex justify-between items-center mb-3">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Resultado</span>
        <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      </div>
      <div class="space-y-1">
        <p class="font-label-md text-label-md text-on-surface-variant">Volumen requerido</p>
        <p class="font-headline-xl text-headline-xl text-primary font-bold" id="result-volume">0.0 mL</p>
      </div>
      <div class="mt-3 pt-3 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
        <span id="result-dosage">Dosis: 0 mg total</span>
        <button class="flex items-center gap-1 text-primary hover:scale-105 transition-all" id="log-btn">
          <span class="material-symbols-outlined text-[18px]">share</span>
          Guardar
        </button>
      </div>

      <!-- Botón para expandir detalles (cascada) -->
      <button class="mt-3 w-full flex items-center justify-center gap-2 text-sm font-label-md bg-surface-container-high/50 hover:bg-surface-container-high rounded-lg py-2 transition-all" id="expand-details-btn">
        <span class="material-symbols-outlined text-[18px]">expand_more</span>
        Ver detalles del cálculo
      </button>

      <!-- Panel expandible (cascada) -->
      <div id="details-panel" class="mt-3 pt-3 border-t border-outline-variant/30 hidden transition-all duration-300">
        <div class="grid grid-cols-2 gap-2 text-sm text-on-surface-variant">
          <div>
            <p class="opacity-70">Peso</p>
            <p class="font-bold text-on-surface" id="detail-weight">0.0 kg</p>
          </div>
          <div>
            <p class="opacity-70">Dosis por kg</p>
            <p class="font-bold text-on-surface" id="detail-dosage">0.0 mg/kg</p>
          </div>
          <div>
            <p class="opacity-70">Concentración</p>
            <p class="font-bold text-on-surface" id="detail-concentration">0.0 mg/mL</p>
          </div>
          <div>
            <p class="opacity-70">Volumen calculado</p>
            <p class="font-bold text-primary" id="detail-volume">0.0 mL</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== BANNER INFORMATIVO ===== -->
  <div class="mt-4 p-4 bg-tertiary-fixed/30 backdrop-blur-sm rounded-2xl flex gap-3 items-start border border-tertiary/20 animate-fade-in-up" style="animation-delay: 200ms;">
    <span class="material-symbols-outlined text-tertiary">info</span>
    <div>
      <p class="font-label-md text-label-md text-on-tertiary-fixed font-bold">Precisión Clínica</p>
      <p class="font-label-sm text-label-sm text-on-tertiary-fixed-variant">Esta calculadora redondea a 2 decimales. Siempre compare con el formulario de fármacos para variaciones específicas de especie.</p>
    </div>
  </div>
</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON 5 PESTAÑAS ===== -->
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

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="dosage">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">medication</span>
    <span class="font-label-sm text-label-sm mt-0.5">Dosis</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<!-- ===== SCRIPT PARA EL PANEL DE DETALLES Y ACTUALIZACIÓN DINÁMICA ===== -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Lógica para expandir/contraer el panel de detalles (cascada)
    const expandBtn = document.getElementById('expand-details-btn');
    const detailsPanel = document.getElementById('details-panel');
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', function() {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del cálculo';
        }
      });
    }

    // Escuchar el resultado para actualizar los detalles
    const resultContainer = document.getElementById('result-container');
    const observer = new MutationObserver(() => {
      if (!resultContainer.classList.contains('hidden')) {
        const weight = document.getElementById('weight').value || '0.0';
        const dosage = document.getElementById('dosage').value || '0.0';
        const concentration = document.getElementById('concentration').value || '0.0';
        const volume = document.getElementById('result-volume').textContent || '0.0 mL';
        document.getElementById('detail-weight').textContent = parseFloat(weight).toFixed(1) + ' kg';
        document.getElementById('detail-dosage').textContent = parseFloat(dosage).toFixed(2) + ' mg/kg';
        document.getElementById('detail-concentration').textContent = parseFloat(concentration).toFixed(1) + ' mg/mL';
        document.getElementById('detail-volume').textContent = volume;
      }
    });
    observer.observe(resultContainer, { attributes: true, attributeFilter: ['class'] });
  });
<\/script>
`;class Fn{constructor(){m(this,"drugInput",null);m(this,"weightInput",null);m(this,"dosageInput",null);m(this,"concentrationInput",null);m(this,"calculateBtn",null);m(this,"resultContainer",null);m(this,"resultVolumeSpan",null);m(this,"resultDosageSpan",null);m(this,"logBtn",null);m(this,"detailWeight",null);m(this,"detailDosage",null);m(this,"detailConcentration",null);m(this,"detailVolume",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Dn),this.cacheElements()}cacheElements(){this.drugInput=document.getElementById("drug-name"),this.weightInput=document.getElementById("weight"),this.dosageInput=document.getElementById("dosage"),this.concentrationInput=document.getElementById("concentration"),this.calculateBtn=document.getElementById("calculate-btn"),this.resultContainer=document.getElementById("result-container"),this.resultVolumeSpan=document.getElementById("result-volume"),this.resultDosageSpan=document.getElementById("result-dosage"),this.logBtn=document.getElementById("log-btn"),this.detailWeight=document.getElementById("detail-weight"),this.detailDosage=document.getElementById("detail-dosage"),this.detailConcentration=document.getElementById("detail-concentration"),this.detailVolume=document.getElementById("detail-volume")}getDrugName(){var e;return((e=this.drugInput)==null?void 0:e.value)||""}getWeight(){var t;const e=(t=this.weightInput)==null?void 0:t.value;return e?parseFloat(e):0}getDosageMgPerKg(){var t;const e=(t=this.dosageInput)==null?void 0:t.value;return e?parseFloat(e):0}getConcentrationMgPerMl(){var t;const e=(t=this.concentrationInput)==null?void 0:t.value;return e?parseFloat(e):0}setDrugName(e){this.drugInput&&(this.drugInput.value=e)}setWeight(e){this.weightInput&&(this.weightInput.value=e.toString())}setDosage(e){this.dosageInput&&(this.dosageInput.value=e.toString())}setConcentration(e){this.concentrationInput&&(this.concentrationInput.value=e.toString())}showResult(e,t){this.resultContainer&&(this.resultContainer.classList.remove("hidden"),this.resultContainer.style.opacity="1",this.resultContainer.style.transform="translateY(0)"),this.resultVolumeSpan&&(this.resultVolumeSpan.textContent=`${t.toFixed(2)} mL`),this.resultDosageSpan&&(this.resultDosageSpan.textContent=`Dosis: ${e.toFixed(2)} mg total`);const n=this.getWeight(),s=this.getDosageMgPerKg(),r=this.getConcentrationMgPerMl();this.detailWeight&&(this.detailWeight.textContent=`${n.toFixed(1)} kg`),this.detailDosage&&(this.detailDosage.textContent=`${s.toFixed(2)} mg/kg`),this.detailConcentration&&(this.detailConcentration.textContent=`${r.toFixed(1)} mg/mL`),this.detailVolume&&(this.detailVolume.textContent=`${t.toFixed(2)} mL`)}hideResult(){this.resultContainer&&(this.resultContainer.classList.add("hidden"),this.resultContainer.style.opacity="0",this.resultContainer.style.transform="translateY(20px)")}getCalculateButton(){return this.calculateBtn}getLogButton(){return this.logBtn}highlightDrugInput(e){this.drugInput&&(e?this.drugInput.classList.add("border-primary","ring-2","ring-primary/30"):this.drugInput.classList.remove("border-primary","ring-2","ring-primary/30"))}}class Tn extends re{constructor(){super();m(this,"view");this.view=new Fn}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.view.setWeight(28.5),this.view.setDosage(5),this.view.setConcentration(50),this.view.hideResult()}setupEventListeners(){const t=this.view.getCalculateButton();t==null||t.addEventListener("click",()=>{this.calculate(),t.classList.add("scale-95"),setTimeout(()=>t.classList.remove("scale-95"),150)});const n=this.view.getLogButton();n==null||n.addEventListener("click",()=>{this.saveToHistory()});const s=document.getElementById("drug-name");s==null||s.addEventListener("input",r=>{const i=r.target;this.view.highlightDrugInput(i.value.length>0)})}calculate(){const t=this.view.getWeight(),n=this.view.getDosageMgPerKg(),s=this.view.getConcentrationMgPerMl();if(t<=0||n<=0||s<=0){alert("Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.");return}const r=t*n,i=r/s;this.view.showResult(r,i)}saveToHistory(){console.log("Guardar cálculo en historial:",{drug:this.view.getDrugName(),weight:this.view.getWeight(),dosagePerKg:this.view.getDosageMgPerKg(),concentration:this.view.getConcentrationMgPerMl(),timestamp:new Date().toISOString()}),alert("Cálculo guardado en el historial (simulado).")}destroy(){this.destroyPremiumBadge(),console.log("[DosageController] Destroyed")}}const On=`
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <span class="font-headline-md text-headline-md font-bold text-primary">Fluidoterapia</span>
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

<main class="relative z-10 max-w-md mx-auto px-container-padding pt-6 flex flex-col gap-6 pb-24">

  <!-- ===== HERO CARD ===== -->
  <section class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant border-l-4 border-l-primary animate-fade-in-up">
    <h2 class="font-label-md text-label-md text-primary mb-1">PROTOCOLO DE CÁLCULO</h2>
    <p class="text-on-surface-variant text-sm">Calcula los requerimientos totales de fluidos para un período de 24 horas basado en déficit por deshidratación, mantenimiento y pérdidas.</p>
  </section>

  <!-- ===== FORMULARIO ===== -->
  <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 50ms;">

    <!-- Peso -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <div class="flex justify-between items-end mb-2">
        <label class="font-label-md text-label-md text-on-surface-variant">Peso del paciente</label>
        <span class="font-label-sm text-label-sm text-primary uppercase">Requerido</span>
      </div>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="weight" type="number" step="0.1" value="10" placeholder="0.0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">kg</span>
      </div>
    </div>

    <!-- Deshidratación -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <div class="flex justify-between items-center mb-4">
        <label class="font-label-md text-label-md text-on-surface-variant">Deshidratación %</label>
        <span class="font-headline-md text-headline-md text-primary" id="dehydration-value">5%</span>
      </div>
      <input class="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" id="dehydration" type="range" min="0" max="15" value="5">
      <div class="flex justify-between mt-2 text-[10px] text-outline uppercase font-bold tracking-wider">
        <span>0% (Normal)</span>
        <span>5% (Leve)</span>
        <span>10% (Mod)</span>
        <span>15% (Severo)</span>
      </div>
    </div>

    <!-- Tasa de mantenimiento -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Tasa de mantenimiento</label>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="maintenance" type="number" value="50">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/kg/día</span>
      </div>
      <div class="flex gap-2 mt-3">
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-all" data-maintenance="40">40 (Gato)</button>
        <button class="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-surface-container-highest transition-all" data-maintenance="60">60 (Perro)</button>
      </div>
    </div>

    <!-- Pérdidas continuas -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Pérdidas continuas (est.)</label>
      <div class="relative">
        <input class="w-full h-touch-target-min bg-white/50 border border-outline-variant rounded-lg px-4 font-headline-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" id="losses" type="number" value="0" placeholder="0">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">ml/día</span>
      </div>
    </div>

    <!-- Factor de goteo -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-outline-variant">
      <label class="font-label-md text-label-md text-on-surface-variant block mb-2">Factor de goteo del equipo</label>
      <div class="grid grid-cols-3 gap-2">
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="10">10 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-primary bg-primary-container/20 text-primary font-label-md hover:bg-surface-container-highest transition-all" data-drip="15">15 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
        <button class="drip-btn py-3 rounded-lg border-2 border-transparent bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-container-highest transition-all" data-drip="60">60 <span class="text-[10px] block opacity-70">gotas/ml</span></button>
      </div>
    </div>
  </div>

  <!-- ===== RESULTADOS CON EXPANSIÓN EN CASCADA ===== -->
  <section class="mt-4 animate-fade-in-up" style="animation-delay: 150ms;">
    <div class="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div class="relative z-10">
        <h3 class="font-label-md text-label-md bg-white/20 inline-block px-3 py-1 rounded-full mb-4 backdrop-blur-sm">REQUERIMIENTO TOTAL</h3>
        <div class="mb-4">
          <span class="font-headline-xl text-headline-xl block" id="total-volume">1,250.0</span>
          <span class="text-sm opacity-90">ml Volumen total (24h)</span>
        </div>
        <div class="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
          <div>
            <span class="font-headline-lg text-headline-lg block" id="hourly-rate">52.1</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">ml/hora</span>
          </div>
          <div>
            <span class="font-headline-lg text-headline-lg block" id="drip-rate">13</span>
            <span class="text-xs opacity-80 uppercase tracking-tight font-bold">gotas/min</span>
          </div>
        </div>

        <!-- Botón para expandir detalles (cascada) -->
        <button class="mt-4 w-full flex items-center justify-center gap-2 text-sm font-label-md bg-white/10 hover:bg-white/20 rounded-lg py-2 transition-all backdrop-blur-sm" id="expand-details-btn">
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
          Ver detalles del cálculo
        </button>

        <!-- Panel expandible (cascada) -->
        <div id="details-panel" class="mt-3 pt-3 border-t border-white/20 hidden transition-all duration-300">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p class="opacity-70">Déficit</p>
              <p class="font-bold" id="deficit-detail">250.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Mantenimiento</p>
              <p class="font-bold" id="maintenance-detail">500.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Pérdidas</p>
              <p class="font-bold" id="losses-detail">0.0 ml</p>
            </div>
            <div>
              <p class="opacity-70">Factor de goteo</p>
              <p class="font-bold" id="drip-factor-detail">15 gotas/ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex gap-3 mt-4">
      <button class="flex-1 h-touch-target-min bg-white/80 backdrop-blur-sm text-primary font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm border border-outline-variant hover:shadow-md" id="save-btn">
        <span class="material-symbols-outlined">save</span> Guardar
      </button>
      <button class="flex-1 h-touch-target-min bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:shadow-md" id="report-btn">
        <span class="material-symbols-outlined">print</span> Reporte
      </button>
    </div>
  </section>

</main>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON 5 PESTAÑAS ===== -->
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

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="fluidotherapy">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">water_drop</span>
    <span class="font-label-sm text-label-sm mt-0.5">Fluidoterapia</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>

<script>
  // Lógica para expandir/contraer el panel de detalles (cascada)
  document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expand-details-btn');
    const detailsPanel = document.getElementById('details-panel');
    if (expandBtn && detailsPanel) {
      expandBtn.addEventListener('click', function() {
        const isHidden = detailsPanel.classList.contains('hidden');
        if (isHidden) {
          detailsPanel.classList.remove('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles';
        } else {
          detailsPanel.classList.add('hidden');
          expandBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del cálculo';
        }
      });
    }
  });
<\/script>
`;class Mn{constructor(){m(this,"weightInput",null);m(this,"dehydrationInput",null);m(this,"dehydrationValueSpan",null);m(this,"maintenanceInput",null);m(this,"lossesInput",null);m(this,"totalVolumeSpan",null);m(this,"hourlyRateSpan",null);m(this,"dripRateSpan",null);m(this,"dripButtons",null);m(this,"maintenancePresetBtns",null);m(this,"saveBtn",null);m(this,"reportBtn",null);m(this,"deficitDetail",null);m(this,"maintenanceDetail",null);m(this,"lossesDetail",null);m(this,"dripFactorDetail",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=On),this.cacheElements()}cacheElements(){this.weightInput=document.getElementById("weight"),this.dehydrationInput=document.getElementById("dehydration"),this.dehydrationValueSpan=document.getElementById("dehydration-value"),this.maintenanceInput=document.getElementById("maintenance"),this.lossesInput=document.getElementById("losses"),this.totalVolumeSpan=document.getElementById("total-volume"),this.hourlyRateSpan=document.getElementById("hourly-rate"),this.dripRateSpan=document.getElementById("drip-rate"),this.dripButtons=document.querySelectorAll(".drip-btn"),this.maintenancePresetBtns=document.querySelectorAll("[data-maintenance]"),this.saveBtn=document.getElementById("save-btn"),this.reportBtn=document.getElementById("report-btn"),this.deficitDetail=document.getElementById("deficit-detail"),this.maintenanceDetail=document.getElementById("maintenance-detail"),this.lossesDetail=document.getElementById("losses-detail"),this.dripFactorDetail=document.getElementById("drip-factor-detail")}getWeight(){var e;return parseFloat(((e=this.weightInput)==null?void 0:e.value)||"0")}getDehydrationPercent(){var e;return parseFloat(((e=this.dehydrationInput)==null?void 0:e.value)||"0")}getMaintenance(){var e;return parseFloat(((e=this.maintenanceInput)==null?void 0:e.value)||"0")}getLosses(){var e;return parseFloat(((e=this.lossesInput)==null?void 0:e.value)||"0")}setDehydrationDisplay(e){this.dehydrationValueSpan&&(this.dehydrationValueSpan.textContent=`${e}%`)}updateResults(e,t,n){this.totalVolumeSpan&&(this.totalVolumeSpan.textContent=e.toFixed(1)),this.hourlyRateSpan&&(this.hourlyRateSpan.textContent=t.toFixed(1)),this.dripRateSpan&&(this.dripRateSpan.textContent=Math.round(n).toString())}updateDetailPanel(e,t,n,s){this.deficitDetail&&(this.deficitDetail.textContent=`${e.toFixed(1)} ml`),this.maintenanceDetail&&(this.maintenanceDetail.textContent=`${t.toFixed(1)} ml`),this.lossesDetail&&(this.lossesDetail.textContent=`${n.toFixed(1)} ml`),this.dripFactorDetail&&(this.dripFactorDetail.textContent=`${s} gotas/ml`)}onWeightInput(e){var t;(t=this.weightInput)==null||t.addEventListener("input",e)}onDehydrationInput(e){var t;(t=this.dehydrationInput)==null||t.addEventListener("input",e)}onMaintenanceInput(e){var t;(t=this.maintenanceInput)==null||t.addEventListener("input",e)}onLossesInput(e){var t;(t=this.lossesInput)==null||t.addEventListener("input",e)}onDripButtonClick(e){var t;(t=this.dripButtons)==null||t.forEach(n=>{n.addEventListener("click",()=>{var r;const s=parseInt(n.getAttribute("data-drip")||"15");e(s),(r=this.dripButtons)==null||r.forEach(i=>{i.classList.remove("border-primary","bg-primary-container/20","text-primary"),i.classList.add("border-transparent","bg-surface-container-high","text-on-surface-variant")}),n.classList.add("border-primary","bg-primary-container/20","text-primary"),n.classList.remove("border-transparent","bg-surface-container-high","text-on-surface-variant")})})}onMaintenancePreset(e){var t;(t=this.maintenancePresetBtns)==null||t.forEach(n=>{n.addEventListener("click",()=>{const s=parseInt(n.getAttribute("data-maintenance")||"0");e(s)})})}onSave(e){var t;(t=this.saveBtn)==null||t.addEventListener("click",e)}onReport(e){var t;(t=this.reportBtn)==null||t.addEventListener("click",e)}}class Nn extends re{constructor(){super();m(this,"view");m(this,"currentDripFactor",15);this.view=new Mn}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.calculate()}setupEventListeners(){this.view.onWeightInput(()=>this.calculate()),this.view.onDehydrationInput(()=>{const t=this.view.getDehydrationPercent();this.view.setDehydrationDisplay(t),this.calculate()}),this.view.onMaintenanceInput(()=>this.calculate()),this.view.onLossesInput(()=>this.calculate()),this.view.onDripButtonClick(t=>{this.currentDripFactor=t,this.calculate()}),this.view.onMaintenancePreset(t=>{const n=document.getElementById("maintenance");n&&(n.value=t.toString(),this.calculate())}),this.view.onSave(()=>{alert("Protocolo guardado (simulación)"),console.log("Fluidoterapia guardada")}),this.view.onReport(()=>{console.log("Generar reporte PDF"),alert("Función de reporte en desarrollo")})}calculate(){const t=this.view.getWeight(),n=this.view.getDehydrationPercent(),s=this.view.getMaintenance(),r=this.view.getLosses(),i=t*n*10,l=t*s,o=i+l+r,d=o/24,c=d*this.currentDripFactor/60;this.view.updateResults(o,d,c),this.view.updateDetailPanel(i,l,r,this.currentDripFactor)}destroy(){this.destroyPremiumBadge(),console.log("[FluidotherapyController] Destroyed")}}const jn=`
<!-- ===== FONDO CON ESTILO SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <div class="absolute inset-0 bg-neutral"></div>
  <div class="absolute inset-0 vet-pattern"></div>
  <div class="absolute inset-0 bg-black/5"></div>
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== HEADER ===== -->
<header class="w-full top-0 sticky bg-surface/90 backdrop-blur-sm shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors" data-route="home">
      <span class="material-symbols-outlined text-primary">arrow_back</span>
    </button>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Historial</h1>
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

<main class="relative z-10 pb-24 pt-4 px-container-padding max-w-2xl mx-auto">

  <!-- ===== FILTROS ===== -->
  <section class="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up" id="filter-buttons">
    <button class="filter-btn px-4 py-2 rounded-full bg-secondary text-white font-label-md text-label-md whitespace-nowrap shadow-sm hover:shadow-md transition-all" data-filter="all">Todos</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="dosage">Dosis</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="fluidotherapy">Fluidos</button>
    <button class="filter-btn px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all border border-outline-variant" data-filter="anesthesia">Anestesia</button>
  </section>

  <!-- ===== CONTENEDOR DE HISTORIAL CON FONDO MATE ===== -->
  <div class="bg-white rounded-2xl border border-outline-variant shadow-md p-4 animate-fade-in-up">
    <div class="space-y-3" id="history-list">
      <!-- Los elementos se generan dinámicamente -->
    </div>
  </div>

  <!-- ===== BOTÓN CARGAR MÁS ===== -->
  <div class="mt-6 text-center">
    <button class="text-primary font-label-md text-label-md border-b-2 border-primary-fixed-dim pb-1 hover:border-primary transition-all hover:scale-105" id="load-more-btn">
      Cargar registros antiguos
    </button>
  </div>

</main>

<!-- ===== BOTÓN FLOTANTE DE BÚSQUEDA ===== -->
<button class="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl active:scale-90 transition-all duration-300 z-40 flex items-center justify-center hover:-translate-y-1" id="search-fab">
  <span class="material-symbols-outlined text-[28px]">search</span>
</button>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON 5 PESTAÑAS ===== -->
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

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>
`;class Kn{constructor(){m(this,"historyContainer",null);m(this,"filterButtons",null);m(this,"loadMoreBtn",null);m(this,"searchFab",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=jn),this.cacheElements()}cacheElements(){this.historyContainer=document.getElementById("history-list"),this.filterButtons=document.querySelectorAll("#filter-buttons button"),this.loadMoreBtn=document.getElementById("load-more-btn"),this.searchFab=document.getElementById("search-fab")}getHistoryContainer(){return this.historyContainer}getFilterButtons(){return this.filterButtons}getLoadMoreButton(){return this.loadMoreBtn}getSearchFab(){return this.searchFab}renderHistoryList(e,t){if(!this.historyContainer)return;if(e.length===0){this.historyContainer.innerHTML=`
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;return}const n=new Date;n.setHours(0,0,0,0);const s=new Date(n);s.setDate(s.getDate()-1);const r=e.filter(d=>new Date(d.timestamp)>=n),i=e.filter(d=>{const c=new Date(d.timestamp);return c<n&&c>=s}),l=e.filter(d=>new Date(d.timestamp)<s);let o="";r.length&&(o+='<div class="flex items-center gap-2 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',o+=this.renderRecordGroup(r)),i.length&&(o+='<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',o+=this.renderRecordGroup(i)),l.length&&(o+='<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',o+=this.renderRecordGroup(l)),this.historyContainer.innerHTML=o,document.querySelectorAll(".history-card").forEach(d=>{d.addEventListener("click",c=>{const p=d.getAttribute("data-id");console.log(`[History] Ver detalle de registro: ${p}`)})})}renderRecordGroup(e){return e.map(t=>{const n=this.getIconForType(t.type),s=this.getBorderColorForType(t.type),r=this.getBgClassForType(t.type),i=this.getTextColorClassForType(t.type),l=this.getRelativeTime(t.timestamp),o=t.isPremium?`<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>`:"";return`
        <div class="history-card bg-white border border-outline-variant/30 border-l-4 ${s} rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-id="${t.id}">
          <div class="h-12 w-12 rounded-lg ${r} flex items-center justify-center ${i} flex-shrink-0">
            <span class="material-symbols-outlined">${n}</span>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex justify-between items-start gap-2 flex-wrap">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface truncate">${this.escapeHtml(t.title)}</h3>
                ${o}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap">${l}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px] truncate">Paciente: ${this.escapeHtml(t.patientName)} (${t.species}, ${t.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface max-w-full overflow-hidden whitespace-nowrap text-ellipsis">${this.escapeHtml(t.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant flex-shrink-0">chevron_right</span>
        </div>
      `}).join("")}getBorderColorForType(e){switch(e){case"dosage":return"border-l-primary";case"fluidotherapy":return"border-l-secondary";case"anesthesia":return"border-l-tertiary";default:return"border-l-outline"}}getIconForType(e){switch(e){case"dosage":return"medication";case"fluidotherapy":return"water_drop";case"anesthesia":return"vital_signs";default:return"history"}}getBgClassForType(e){switch(e){case"dosage":return"bg-secondary-container";case"fluidotherapy":return"bg-surface-container";case"anesthesia":return"bg-tertiary-container";default:return"bg-surface-container"}}getTextColorClassForType(e){switch(e){case"dosage":return"text-on-secondary-container";case"fluidotherapy":return"text-primary";case"anesthesia":return"text-on-tertiary-container";default:return"text-on-surface-variant"}}getRelativeTime(e){const n=new Date().getTime()-e.getTime(),s=Math.floor(n/6e4),r=Math.floor(n/36e5),i=Math.floor(n/864e5);return s<1?"Justo ahora":s<60?`Hace ${s} min`:r<24?`Hace ${r} h`:i===1?"Ayer":`Hace ${i} días`}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}setActiveFilter(e){var t;(t=this.filterButtons)==null||t.forEach(n=>{n.getAttribute("data-filter")===e?(n.classList.remove("bg-white/80","text-on-surface-variant","border","border-outline-variant"),n.classList.add("bg-secondary","text-white","shadow-sm")):(n.classList.remove("bg-secondary","text-white","shadow-sm"),n.classList.add("bg-white/80","text-on-surface-variant","border","border-outline-variant"))})}}class Hn{constructor(){m(this,"view");m(this,"allRecords",[]);m(this,"currentFilter","all");this.view=new Kn}async init(){this.view.render(),this.loadMockData(),this.setupEventListeners(),this.applyFilter()}loadMockData(){const e=mt.getRecentHistory(10);this.allRecords=e.map(t=>({id:t.id,type:t.type,title:this.getTitleForType(t.type),patientName:t.patientName||"Desconocido",species:t.patientSpecies||"N/A",weightKg:t.patientWeightKg||0,timestamp:t.createdAt,summary:t.summary,detail:JSON.stringify(t.result),isPremium:t.type==="anesthesia"}))}getTitleForType(e){switch(e){case"dosage":return"Cálculo de Dosis";case"fluidotherapy":return"Fluidoterapia";case"anesthesia":return"Protocolo de Anestesia";default:return"Cálculo"}}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",async r=>{r.preventDefault();const i=s.getAttribute("data-route");i&&await N.navigate(i)})});const e=this.view.getFilterButtons();e==null||e.forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-filter")||"all";this.currentFilter=r,this.view.setActiveFilter(r),this.applyFilter()})});const t=this.view.getLoadMoreButton();t==null||t.addEventListener("click",()=>{console.log("Cargar más registros - por implementar")});const n=this.view.getSearchFab();n==null||n.addEventListener("click",()=>{console.log("Búsqueda - por implementar")})}applyFilter(){let e=[...this.allRecords];this.currentFilter!=="all"&&(e=e.filter(t=>t.type===this.currentFilter)),this.view.renderHistoryList(e,this.currentFilter)}destroy(){console.log("[HistoryController] Destroyed")}}const Vn=`
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
`;class zn{constructor(){m(this,"searchInput",null);m(this,"filterButtons",null);m(this,"resourceCards",null);m(this,"resourceItems",null);m(this,"guidelineCards",null);m(this,"viewAllButtons",null);m(this,"upgradeBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Vn),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.filterButtons=document.querySelectorAll(".filter-btn"),this.resourceCards=document.querySelectorAll(".resource-card"),this.resourceItems=document.querySelectorAll(".resource-item"),this.guidelineCards=document.querySelectorAll(".guideline-card"),this.viewAllButtons=document.querySelectorAll(".view-all"),this.upgradeBtn=document.getElementById("upgrade-btn")}getSearchInput(){return this.searchInput}getFilterButtons(){return this.filterButtons}getUpgradeBtn(){return this.upgradeBtn}onResourceClick(e){var t,n,s;(t=this.resourceCards)==null||t.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(n=this.resourceItems)==null||n.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(s=this.guidelineCards)==null||s.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})})}onViewAll(e){var t;(t=this.viewAllButtons)==null||t.forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-section");s&&e(s)})})}onSearch(e){var t;(t=this.searchInput)==null||t.addEventListener("input",n=>{const s=n.target.value.toLowerCase();e(s)})}onFilterChange(e){var t;(t=this.filterButtons)==null||t.forEach(n=>{n.addEventListener("click",()=>{var r;const s=n.getAttribute("data-filter")||"all";(r=this.filterButtons)==null||r.forEach(i=>{i.classList.remove("bg-secondary","text-on-secondary"),i.classList.add("bg-surface-container-high","text-on-surface-variant")}),n.classList.remove("bg-surface-container-high","text-on-surface-variant"),n.classList.add("bg-secondary","text-on-secondary"),e(s)})})}filterResources(e){[...this.resourceCards||[],...this.resourceItems||[]].forEach(n=>{var r;const s=((r=n.textContent)==null?void 0:r.toLowerCase())||"";e===""||s.includes(e)?n.style.display="":n.style.display="none"})}animateClick(e){e.classList.add("bg-surface-container-low"),setTimeout(()=>e.classList.remove("bg-surface-container-low"),300)}}class qn extends re{constructor(){super();m(this,"view");this.view=new zn}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners()}setupEventListeners(){this.view.onResourceClick(n=>{console.log(`[Library] Abrir recurso: ${n}`),alert(`Funcionalidad en desarrollo: ${n}`)}),this.view.onViewAll(n=>{console.log(`[Library] Ver todos: ${n}`),alert(`Mostrar todos los recursos de ${n} (simulación)`)}),this.view.onSearch(n=>{this.view.filterResources(n)}),this.view.onFilterChange(n=>{console.log(`[Library] Filtro: ${n}`),alert(`Filtro aplicado: ${n}`)});const t=this.view.getUpgradeBtn();t==null||t.addEventListener("click",()=>{N.navigate("premium")})}destroy(){this.destroyPremiumBadge(),console.log("[LibraryController] Destroyed")}}const Un=`
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

<main class="relative z-10 px-container-padding pt-6 space-y-stack-lg pb-24">

  <!-- ===== BARRA DE BÚSQUEDA ===== -->
  <section class="w-full animate-fade-in-up">
    <div class="relative flex items-center bg-white/80 backdrop-blur-sm rounded-xl border border-outline-variant shadow-sm focus-within:shadow-md focus-within:border-primary transition-all duration-200">
      <span class="material-symbols-outlined absolute left-4 text-outline">search</span>
      <input 
        class="w-full h-touch-target-min pl-12 pr-12 bg-transparent rounded-xl font-body-md text-on-surface focus:outline-none" 
        type="text" 
        id="search-input" 
        placeholder="Buscar pacientes, raza o propietario..."
      />
      <button class="absolute right-2 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors" id="filter-btn">
        <span class="material-symbols-outlined">tune</span>
      </button>
    </div>
  </section>

  <!-- ===== ESTADÍSTICAS ===== -->
  <section class="grid grid-cols-2 gap-4 animate-fade-in-up" style="animation-delay: 50ms;">
    <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Casos activos</p>
      <p class="font-headline-xl text-headline-xl text-primary" id="active-cases">0</p>
    </div>
    <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
      <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">En cirugía</p>
      <div class="flex items-center gap-2">
        <p class="font-headline-xl text-headline-xl text-secondary" id="in-surgery">0</p>
        <span class="flex h-2 w-2 rounded-full bg-error animate-pulse"></span>
      </div>
    </div>
  </section>

  <!-- ===== LISTA DE PACIENTES (fondo mate y líneas horizontales) ===== -->
  <section class="space-y-stack-md animate-fade-in-up" style="animation-delay: 100ms;">
    <div class="flex justify-between items-center px-1">
      <h2 class="font-headline-md text-headline-md text-on-surface">Pacientes recientes</h2>
      <button class="font-label-md text-label-md text-primary uppercase tracking-wider hover:underline transition-all hover:scale-105" id="see-all-btn">Ver todos</button>
    </div>
    <!-- Contenedor con fondo blanco mate y sombra -->
    <div class="bg-white rounded-2xl border border-outline-variant shadow-md p-4">
      <div id="patients-list" class="space-y-3">
        <!-- Los pacientes se cargarán dinámicamente desde el controlador -->
      </div>
    </div>
  </section>

</main>

<!-- ===== BOTÓN FLOTANTE AÑADIR ===== -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-lg hover:shadow-xl active:scale-90 transition-all duration-300 z-40 flex items-center justify-center hover:-translate-y-1" id="add-patient-btn">
  <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">add</span>
</button>

<!-- ===== BARRA DE NAVEGACIÓN INFERIOR CON ANIMACIONES MEJORADAS ===== -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 pb-safe bg-surface/90 backdrop-blur-sm dark:bg-surface h-[68px] z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
  
  <!-- Inicio -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="home">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">home</span>
    <span class="font-label-sm text-label-sm mt-0.5">Inicio</span>
  </a>

  <!-- Pacientes (Activo) -->
  <a class="relative flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="patients">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">pets</span>
    <span class="font-label-sm text-label-sm mt-0.5">Pacientes</span>
    <!-- Punto indicador decorativo -->
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

  <!-- Convertidor -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="converter">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">sync_alt</span>
    <span class="font-label-sm text-label-sm mt-0.5">Convertidor</span>
  </a>

  <!-- Biblioteca -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">menu_book</span>
    <span class="font-label-sm text-label-sm mt-0.5">Biblioteca</span>
  </a>

  <!-- Historial -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>
</nav>

<style>
  /* Línea horizontal color secundario en cada paciente */
  #patients-list > div {
    border-bottom: 2px solid #00ACC1;
    padding-bottom: 0.75rem;
  }
  #patients-list > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
</style>
`;class $n{constructor(){m(this,"searchInput",null);m(this,"patientsList",null);m(this,"activeCasesSpan",null);m(this,"inSurgerySpan",null);m(this,"seeAllBtn",null);m(this,"addPatientBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Un),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.patientsList=document.getElementById("patients-list"),this.activeCasesSpan=document.getElementById("active-cases"),this.inSurgerySpan=document.getElementById("in-surgery"),this.seeAllBtn=document.getElementById("see-all-btn"),this.addPatientBtn=document.getElementById("add-patient-btn")}getSearchInput(){return this.searchInput}getSeeAllBtn(){return this.seeAllBtn}getAddPatientBtn(){return this.addPatientBtn}updateStats(e,t){this.activeCasesSpan&&(this.activeCasesSpan.textContent=e.toString()),this.inSurgerySpan&&(this.inSurgerySpan.textContent=t.toString())}renderPatients(e,t){var n;if(this.patientsList){this.patientsList.innerHTML="";for(const s of e){const r=document.createElement("div");r.className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden",r.setAttribute("data-id",s.id);const i=(s.species==="canine"||s.species==="feline","pets"),l=s.status==="stable"?"bg-secondary-container text-on-secondary-container":s.status==="in-surgery"?"bg-error-container text-on-error-container":"bg-surface-container-highest text-on-surface-variant",o=s.status==="stable"?"Estable":s.status==="in-surgery"?"En cirugía":s.status==="critical"?"Crítico":s.status==="discharged"?"Dado de alta":"Observación";r.innerHTML=`
        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-on-primary-container">${i}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-headline-md text-headline-md leading-tight text-on-surface">${this.escapeHtml(s.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${this.escapeHtml(s.breed)}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="px-3 py-1 ${l} font-label-sm text-label-sm rounded-full">${o}</span>
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      `,r.addEventListener("click",()=>t(s.id)),(n=this.patientsList)==null||n.appendChild(r)}}}filterPatients(e,t,n){const s=t.filter(r=>r.name.toLowerCase().includes(e)||r.breed.toLowerCase().includes(e)||r.ownerName.toLowerCase().includes(e));n(s)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class Gn extends re{constructor(){super();m(this,"view");m(this,"patients",[]);this.view=new $n}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.loadPatients(),this.setupEventListeners()}loadPatients(){this.patients=mt.getRecentPatients(10);const t=this.patients.filter(s=>s.status!=="discharged").length,n=this.patients.filter(s=>s.status==="in-surgery").length;this.view.updateStats(t,n),this.view.renderPatients(this.patients,s=>this.onPatientClick(s))}setupEventListeners(){const t=this.view.getSearchInput();t==null||t.addEventListener("input",r=>{const i=r.target.value.toLowerCase();this.view.filterPatients(i,this.patients,l=>{this.view.renderPatients(l,o=>this.onPatientClick(o))})});const n=this.view.getSeeAllBtn();n==null||n.addEventListener("click",()=>{alert('Funcionalidad "Ver todos" en desarrollo')});const s=this.view.getAddPatientBtn();s==null||s.addEventListener("click",()=>{alert('Funcionalidad "Añadir paciente" en desarrollo')})}onPatientClick(t){console.log(`[Patients] Ver detalle de paciente: ${t}`),alert(`Detalle del paciente (simulación) - ID: ${t}`)}destroy(){this.destroyPremiumBadge(),console.log("[PatientsController] Destroyed")}}const Wn=`
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
`;class Jn{constructor(){m(this,"monthlyBtn",null);m(this,"annualBtn",null);m(this,"pricingLabel",null);m(this,"pricingPeriod",null);m(this,"upgradeBtn",null);m(this,"restoreBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Wn),this.cacheElements()}cacheElements(){this.monthlyBtn=document.getElementById("monthly-toggle"),this.annualBtn=document.getElementById("annual-toggle"),this.pricingLabel=document.getElementById("pricing-label"),this.pricingPeriod=document.getElementById("pricing-period"),this.upgradeBtn=document.getElementById("upgrade-btn"),this.restoreBtn=document.getElementById("restore-btn")}getMonthlyBtn(){return this.monthlyBtn}getAnnualBtn(){return this.annualBtn}getPricingLabel(){return this.pricingLabel}getPricingPeriod(){return this.pricingPeriod}getUpgradeBtn(){return this.upgradeBtn}getRestoreBtn(){return this.restoreBtn}setMonthlyActive(){var e,t,n,s;(e=this.monthlyBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.monthlyBtn)==null||t.classList.remove("text-on-surface-variant"),(n=this.annualBtn)==null||n.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.annualBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$9.99"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ mes")}setAnnualActive(){var e,t,n,s;(e=this.annualBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.annualBtn)==null||t.classList.remove("text-on-surface-variant"),(n=this.monthlyBtn)==null||n.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.monthlyBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$95.88"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ año")}}class Yn{constructor(){m(this,"view");this.view=new Jn}async init(){this.view.render(),this.setupNavigation(),this.setupEventListeners()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const n=e.getAttribute("data-route");n&&await N.navigate(n)})})}setupEventListeners(){const e=this.view.getMonthlyBtn(),t=this.view.getAnnualBtn();e==null||e.addEventListener("click",()=>this.view.setMonthlyActive()),t==null||t.addEventListener("click",()=>this.view.setAnnualActive());const n=this.view.getUpgradeBtn();n==null||n.addEventListener("click",()=>{alert("Funcionalidad de pago en desarrollo. Esta es una simulación."),console.log("Iniciar proceso de suscripción Pro")});const s=this.view.getRestoreBtn();s==null||s.addEventListener("click",()=>{alert("Restauración de compra simulada"),console.log("Restaurar compra")})}destroy(){console.log("[PremiumController] Destroyed")}}const Qn=`
<!-- ===== FONTO IGUAL AL SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <!-- Fondo base neutral -->
  <div class="w-full h-full bg-neutral"></div>
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
`;class Xn{constructor(){m(this,"emailInput",null);m(this,"passwordInput",null);m(this,"loginBtn",null);m(this,"registerLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Qn),this.cacheElements()}cacheElements(){this.emailInput=document.getElementById("login-email"),this.passwordInput=document.getElementById("login-password"),this.loginBtn=document.getElementById("login-btn"),this.registerLink=document.getElementById("go-to-register")}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}onLoginClick(e){var t;(t=this.loginBtn)==null||t.addEventListener("click",e)}onRegisterLinkClick(e){var t;(t=this.registerLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}const R=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,O=Object.keys,H=Array.isArray;function q(a,e){return typeof e!="object"||O(e).forEach(function(t){a[t]=e[t]}),a}typeof Promise>"u"||R.Promise||(R.Promise=Promise);const ze=Object.getPrototypeOf,Zn={}.hasOwnProperty;function G(a,e){return Zn.call(a,e)}function Pe(a,e){typeof e=="function"&&(e=e(ze(a))),(typeof Reflect>"u"?O:Reflect.ownKeys)(e).forEach(t=>{ae(a,t,e[t])})}const Fa=Object.defineProperty;function ae(a,e,t,n){Fa(a,e,q(t&&G(t,"get")&&typeof t.get=="function"?{get:t.get,set:t.set,configurable:!0}:{value:t,configurable:!0,writable:!0},n))}function Ie(a){return{from:function(e){return a.prototype=Object.create(e.prototype),ae(a.prototype,"constructor",a),{extend:Pe.bind(null,a.prototype)}}}}const es=Object.getOwnPropertyDescriptor;function ra(a,e){let t;return es(a,e)||(t=ze(a))&&ra(t,e)}const ts=[].slice;function ft(a,e,t){return ts.call(a,e,t)}function Ta(a,e){return e(a)}function Te(a){if(!a)throw new Error("Assertion Failed")}function Oa(a){R.setImmediate?setImmediate(a):setTimeout(a,0)}function Ma(a,e){return a.reduce((t,n,s)=>{var r=e(n,s);return r&&(t[r[0]]=r[1]),t},{})}function ne(a,e){if(typeof e=="string"&&G(a,e))return a[e];if(!e)return a;if(typeof e!="string"){for(var t=[],n=0,s=e.length;n<s;++n){var r=ne(a,e[n]);t.push(r)}return t}var i=e.indexOf(".");if(i!==-1){var l=a[e.substr(0,i)];return l==null?void 0:ne(l,e.substr(i+1))}}function W(a,e,t){if(a&&e!==void 0&&(!("isFrozen"in Object)||!Object.isFrozen(a)))if(typeof e!="string"&&"length"in e){Te(typeof t!="string"&&"length"in t);for(var n=0,s=e.length;n<s;++n)W(a,e[n],t[n])}else{var r=e.indexOf(".");if(r!==-1){var i=e.substr(0,r),l=e.substr(r+1);if(l==="")t===void 0?H(a)&&!isNaN(parseInt(i))?a.splice(i,1):delete a[i]:a[i]=t;else{var o=a[i];o&&G(a,i)||(o=a[i]={}),W(o,l,t)}}else t===void 0?H(a)&&!isNaN(parseInt(e))?a.splice(e,1):delete a[e]:a[e]=t}}function Na(a){var e={};for(var t in a)G(a,t)&&(e[t]=a[t]);return e}const as=[].concat;function ja(a){return as.apply([],a)}const Ka="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(ja([8,16,32,64].map(a=>["Int","Uint","Float"].map(e=>e+a+"Array")))).filter(a=>R[a]),ns=Ka.map(a=>R[a]);Ma(Ka,a=>[a,!0]);let oe=null;function Ye(a){oe=typeof WeakMap<"u"&&new WeakMap;const e=Ft(a);return oe=null,e}function Ft(a){if(!a||typeof a!="object")return a;let e=oe&&oe.get(a);if(e)return e;if(H(a)){e=[],oe&&oe.set(a,e);for(var t=0,n=a.length;t<n;++t)e.push(Ft(a[t]))}else if(ns.indexOf(a.constructor)>=0)e=a;else{const r=ze(a);for(var s in e=r===Object.prototype?{}:Object.create(r),oe&&oe.set(a,e),a)G(a,s)&&(e[s]=Ft(a[s]))}return e}const{toString:ss}={};function Tt(a){return ss.call(a).slice(8,-1)}const Ot=typeof Symbol<"u"?Symbol.iterator:"@@iterator",rs=typeof Ot=="symbol"?function(a){var e;return a!=null&&(e=a[Ot])&&e.apply(a)}:function(){return null},Le={};function ee(a){var e,t,n,s;if(arguments.length===1){if(H(a))return a.slice();if(this===Le&&typeof a=="string")return[a];if(s=rs(a)){for(t=[];!(n=s.next()).done;)t.push(n.value);return t}if(a==null)return[a];if(typeof(e=a.length)=="number"){for(t=new Array(e);e--;)t[e]=a[e];return t}return[a]}for(e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return t}const ia=typeof Symbol<"u"?a=>a[Symbol.toStringTag]==="AsyncFunction":()=>!1;var Y=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Ha(a,e){Y=a,Va=e}var Va=()=>!0;const is=!new Error("").stack;function xe(){if(is)try{throw xe.arguments,new Error}catch(a){return a}return new Error}function Mt(a,e){var t=a.stack;return t?(e=e||0,t.indexOf(a.name)===0&&(e+=(a.name+a.message).split(`
`).length),t.split(`
`).slice(e).filter(Va).map(n=>`
`+n).join("")):""}var za=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],oa=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(za),os={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Ae(a,e){this._e=xe(),this.name=a,this.message=e}function qa(a,e){return a+". Errors: "+Object.keys(e).map(t=>e[t].toString()).filter((t,n,s)=>s.indexOf(t)===n).join(`
`)}function gt(a,e,t,n){this._e=xe(),this.failures=e,this.failedKeys=n,this.successCount=t,this.message=qa(a,e)}function Me(a,e){this._e=xe(),this.name="BulkError",this.failures=Object.keys(e).map(t=>e[t]),this.failuresByPos=e,this.message=qa(a,e)}Ie(Ae).from(Error).extend({stack:{get:function(){return this._stack||(this._stack=this.name+": "+this.message+Mt(this._e,2))}},toString:function(){return this.name+": "+this.message}}),Ie(gt).from(Ae),Ie(Me).from(Ae);var la=oa.reduce((a,e)=>(a[e]=e+"Error",a),{});const ls=Ae;var A=oa.reduce((a,e)=>{var t=e+"Error";function n(s,r){this._e=xe(),this.name=t,s?typeof s=="string"?(this.message=`${s}${r?`
 `+r:""}`,this.inner=r||null):typeof s=="object"&&(this.message=`${s.name} ${s.message}`,this.inner=s):(this.message=os[e]||t,this.inner=null)}return Ie(n).from(ls),a[e]=n,a},{});A.Syntax=SyntaxError,A.Type=TypeError,A.Range=RangeError;var wa=za.reduce((a,e)=>(a[e+"Error"]=A[e],a),{}),ot=oa.reduce((a,e)=>(["Syntax","Type","Range"].indexOf(e)===-1&&(a[e+"Error"]=A[e]),a),{});function S(){}function qe(a){return a}function cs(a,e){return a==null||a===qe?e:function(t){return e(a(t))}}function ve(a,e){return function(){a.apply(this,arguments),e.apply(this,arguments)}}function ds(a,e){return a===S?e:function(){var t=a.apply(this,arguments);t!==void 0&&(arguments[0]=t);var n=this.onsuccess,s=this.onerror;this.onsuccess=null,this.onerror=null;var r=e.apply(this,arguments);return n&&(this.onsuccess=this.onsuccess?ve(n,this.onsuccess):n),s&&(this.onerror=this.onerror?ve(s,this.onerror):s),r!==void 0?r:t}}function us(a,e){return a===S?e:function(){a.apply(this,arguments);var t=this.onsuccess,n=this.onerror;this.onsuccess=this.onerror=null,e.apply(this,arguments),t&&(this.onsuccess=this.onsuccess?ve(t,this.onsuccess):t),n&&(this.onerror=this.onerror?ve(n,this.onerror):n)}}function ps(a,e){return a===S?e:function(t){var n=a.apply(this,arguments);q(t,n);var s=this.onsuccess,r=this.onerror;this.onsuccess=null,this.onerror=null;var i=e.apply(this,arguments);return s&&(this.onsuccess=this.onsuccess?ve(s,this.onsuccess):s),r&&(this.onerror=this.onerror?ve(r,this.onerror):r),n===void 0?i===void 0?void 0:i:q(n,i)}}function hs(a,e){return a===S?e:function(){return e.apply(this,arguments)!==!1&&a.apply(this,arguments)}}function ca(a,e){return a===S?e:function(){var t=a.apply(this,arguments);if(t&&typeof t.then=="function"){for(var n=this,s=arguments.length,r=new Array(s);s--;)r[s]=arguments[s];return t.then(function(){return e.apply(n,r)})}return e.apply(this,arguments)}}ot.ModifyError=gt,ot.DexieError=Ae,ot.BulkError=Me;var Ue={};const Ua=100,[Nt,bt,jt]=typeof Promise>"u"?[]:(()=>{let a=Promise.resolve();if(typeof crypto>"u"||!crypto.subtle)return[a,ze(a),a];const e=crypto.subtle.digest("SHA-512",new Uint8Array([0]));return[e,ze(e),a]})(),$a=bt&&bt.then,lt=Nt&&Nt.constructor,da=!!jt;var Kt=!1,ms=jt?()=>{jt.then(Ze)}:R.setImmediate?setImmediate.bind(null,Ze):R.MutationObserver?()=>{var a=document.createElement("div");new MutationObserver(()=>{Ze(),a=null}).observe(a,{attributes:!0}),a.setAttribute("i","1")}:()=>{setTimeout(Ze,0)},Ne=function(a,e){Oe.push([a,e]),vt&&(ms(),vt=!1)},Ht=!0,vt=!0,fe=[],ct=[],Vt=null,zt=qe,Be={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:_a,pgp:!1,env:{},finalize:function(){this.unhandleds.forEach(a=>{try{_a(a[0],a[1])}catch{}})}},I=Be,Oe=[],ge=0,dt=[];function L(a){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this.onuncatched=S,this._lib=!1;var e=this._PSD=I;if(Y&&(this._stackHolder=xe(),this._prev=null,this._numPrev=0),typeof a!="function"){if(a!==Ue)throw new TypeError("Not a function");return this._state=arguments[1],this._value=arguments[2],void(this._state===!1&&Ut(this,this._value))}this._state=null,this._value=null,++e.ref,Wa(this,a)}const qt={get:function(){var a=I,e=yt;function t(n,s){var r=!a.global&&(a!==I||e!==yt);const i=r&&!se();var l=new L((o,d)=>{ua(this,new Ga(xt(n,a,r,i),xt(s,a,r,i),o,d,a))});return Y&&Qa(l,this),l}return t.prototype=Ue,t},set:function(a){ae(this,"then",a&&a.prototype===Ue?qt:{get:function(){return a},set:qt.set})}};function Ga(a,e,t,n,s){this.onFulfilled=typeof a=="function"?a:null,this.onRejected=typeof e=="function"?e:null,this.resolve=t,this.reject=n,this.psd=s}function Wa(a,e){try{e(t=>{if(a._state===null){if(t===a)throw new TypeError("A promise cannot be resolved with itself.");var n=a._lib&&Qe();t&&typeof t.then=="function"?Wa(a,(s,r)=>{t instanceof L?t._then(s,r):t.then(s,r)}):(a._state=!0,a._value=t,Ja(a)),n&&Xe()}},Ut.bind(null,a))}catch(t){Ut(a,t)}}function Ut(a,e){if(ct.push(e),a._state===null){var t=a._lib&&Qe();e=zt(e),a._state=!1,a._value=e,Y&&e!==null&&typeof e=="object"&&!e._promise&&function(n,s,r){try{n.apply(null,r)}catch{}}(()=>{var n=ra(e,"stack");e._promise=a,ae(e,"stack",{get:()=>Kt?n&&(n.get?n.get.apply(e):n.value):a.stack})}),function(n){fe.some(s=>s._value===n._value)||fe.push(n)}(a),Ja(a),t&&Xe()}}function Ja(a){var e=a._listeners;a._listeners=[];for(var t=0,n=e.length;t<n;++t)ua(a,e[t]);var s=a._PSD;--s.ref||s.finalize(),ge===0&&(++ge,Ne(()=>{--ge==0&&pa()},[]))}function ua(a,e){if(a._state!==null){var t=a._state?e.onFulfilled:e.onRejected;if(t===null)return(a._state?e.resolve:e.reject)(a._value);++e.psd.ref,++ge,Ne(fs,[t,a,e])}else a._listeners.push(e)}function fs(a,e,t){try{Vt=e;var n,s=e._value;e._state?n=a(s):(ct.length&&(ct=[]),n=a(s),ct.indexOf(s)===-1&&function(r){for(var i=fe.length;i;)if(fe[--i]._value===r._value)return void fe.splice(i,1)}(e)),t.resolve(n)}catch(r){t.reject(r)}finally{Vt=null,--ge==0&&pa(),--t.psd.ref||t.psd.finalize()}}function Ya(a,e,t){if(e.length===t)return e;var n="";if(a._state===!1){var s,r,i=a._value;i!=null?(s=i.name||"Error",r=i.message||i,n=Mt(i,0)):(s=i,r=""),e.push(s+(r?": "+r:"")+n)}return Y&&((n=Mt(a._stackHolder,2))&&e.indexOf(n)===-1&&e.push(n),a._prev&&Ya(a._prev,e,t)),e}function Qa(a,e){var t=e?e._numPrev+1:0;t<100&&(a._prev=e,a._numPrev=t)}function Ze(){Qe()&&Xe()}function Qe(){var a=Ht;return Ht=!1,vt=!1,a}function Xe(){var a,e,t;do for(;Oe.length>0;)for(a=Oe,Oe=[],t=a.length,e=0;e<t;++e){var n=a[e];n[0].apply(null,n[1])}while(Oe.length>0);Ht=!0,vt=!0}function pa(){var a=fe;fe=[],a.forEach(n=>{n._PSD.onunhandled.call(null,n._value,n)});for(var e=dt.slice(0),t=e.length;t;)e[--t]()}function et(a){return new L(Ue,!1,a)}function D(a,e){var t=I;return function(){var n=Qe(),s=I;try{return de(t,!0),a.apply(this,arguments)}catch(r){e&&e(r)}finally{de(s,!1),n&&Xe()}}}Pe(L.prototype,{then:qt,_then:function(a,e){ua(this,new Ga(null,null,a,e,I))},catch:function(a){if(arguments.length===1)return this.then(null,a);var e=arguments[0],t=arguments[1];return typeof e=="function"?this.then(null,n=>n instanceof e?t(n):et(n)):this.then(null,n=>n&&n.name===e?t(n):et(n))},finally:function(a){return this.then(e=>(a(),e),e=>(a(),et(e)))},stack:{get:function(){if(this._stack)return this._stack;try{Kt=!0;var a=Ya(this,[],20).join(`
From previous: `);return this._state!==null&&(this._stack=a),a}finally{Kt=!1}}},timeout:function(a,e){return a<1/0?new L((t,n)=>{var s=setTimeout(()=>n(new A.Timeout(e)),a);this.then(t,n).finally(clearTimeout.bind(null,s))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&ae(L.prototype,Symbol.toStringTag,"Dexie.Promise"),Be.env=Xa(),Pe(L,{all:function(){var a=ee.apply(null,arguments).map(tt);return new L(function(e,t){a.length===0&&e([]);var n=a.length;a.forEach((s,r)=>L.resolve(s).then(i=>{a[r]=i,--n||e(a)},t))})},resolve:a=>{if(a instanceof L)return a;if(a&&typeof a.then=="function")return new L((t,n)=>{a.then(t,n)});var e=new L(Ue,!0,a);return Qa(e,Vt),e},reject:et,race:function(){var a=ee.apply(null,arguments).map(tt);return new L((e,t)=>{a.map(n=>L.resolve(n).then(e,t))})},PSD:{get:()=>I,set:a=>I=a},totalEchoes:{get:()=>yt},newPSD:ce,usePSD:Re,scheduler:{get:()=>Ne,set:a=>{Ne=a}},rejectionMapper:{get:()=>zt,set:a=>{zt=a}},follow:(a,e)=>new L((t,n)=>ce((s,r)=>{var i=I;i.unhandleds=[],i.onunhandled=r,i.finalize=ve(function(){(function(l){function o(){l(),dt.splice(dt.indexOf(o),1)}dt.push(o),++ge,Ne(()=>{--ge==0&&pa()},[])})(()=>{this.unhandleds.length===0?s():r(this.unhandleds[0])})},i.finalize),a()},e,t,n))}),lt&&(lt.allSettled&&ae(L,"allSettled",function(){const a=ee.apply(null,arguments).map(tt);return new L(e=>{a.length===0&&e([]);let t=a.length;const n=new Array(t);a.forEach((s,r)=>L.resolve(s).then(i=>n[r]={status:"fulfilled",value:i},i=>n[r]={status:"rejected",reason:i}).then(()=>--t||e(n)))})}),lt.any&&typeof AggregateError<"u"&&ae(L,"any",function(){const a=ee.apply(null,arguments).map(tt);return new L((e,t)=>{a.length===0&&t(new AggregateError([]));let n=a.length;const s=new Array(n);a.forEach((r,i)=>L.resolve(r).then(l=>e(l),l=>{s[i]=l,--n||t(new AggregateError(s))}))})}));const K={awaits:0,echoes:0,id:0};var gs=0,ut=[],It=0,yt=0,bs=0;function ce(a,e,t,n){var s=I,r=Object.create(s);r.parent=s,r.ref=0,r.global=!1,r.id=++bs;var i=Be.env;r.env=da?{Promise:L,PromiseProp:{value:L,configurable:!0,writable:!0},all:L.all,race:L.race,allSettled:L.allSettled,any:L.any,resolve:L.resolve,reject:L.reject,nthen:Ea(i.nthen,r),gthen:Ea(i.gthen,r)}:{},e&&q(r,e),++s.ref,r.finalize=function(){--this.parent.ref||this.parent.finalize()};var l=Re(r,a,t,n);return r.ref===0&&r.finalize(),l}function Se(){return K.id||(K.id=++gs),++K.awaits,K.echoes+=Ua,K.id}function se(){return!!K.awaits&&(--K.awaits==0&&(K.id=0),K.echoes=K.awaits*Ua,!0)}function tt(a){return K.echoes&&a&&a.constructor===lt?(Se(),a.then(e=>(se(),e),e=>(se(),M(e)))):a}function vs(a){++yt,K.echoes&&--K.echoes!=0||(K.echoes=K.id=0),ut.push(I),de(a,!0)}function ys(){var a=ut[ut.length-1];ut.pop(),de(a,!1)}function de(a,e){var t=I;if((e?!K.echoes||It++&&a===I:!It||--It&&a===I)||Za(e?vs.bind(null,a):ys),a!==I&&(I=a,t===Be&&(Be.env=Xa()),da)){var n=Be.env.Promise,s=a.env;bt.then=s.nthen,n.prototype.then=s.gthen,(t.global||a.global)&&(Object.defineProperty(R,"Promise",s.PromiseProp),n.all=s.all,n.race=s.race,n.resolve=s.resolve,n.reject=s.reject,s.allSettled&&(n.allSettled=s.allSettled),s.any&&(n.any=s.any))}}function Xa(){var a=R.Promise;return da?{Promise:a,PromiseProp:Object.getOwnPropertyDescriptor(R,"Promise"),all:a.all,race:a.race,allSettled:a.allSettled,any:a.any,resolve:a.resolve,reject:a.reject,nthen:bt.then,gthen:a.prototype.then}:{}}function Re(a,e,t,n,s){var r=I;try{return de(a,!0),e(t,n,s)}finally{de(r,!1)}}function Za(a){$a.call(Nt,a)}function xt(a,e,t,n){return typeof a!="function"?a:function(){var s=I;t&&Se(),de(e,!0);try{return a.apply(this,arguments)}finally{de(s,!1),n&&Za(se)}}}function Ea(a,e){return function(t,n){return a.call(this,xt(t,e),xt(n,e))}}(""+$a).indexOf("[native code]")===-1&&(Se=se=S);const ka="unhandledrejection";function _a(a,e){var t;try{t=e.onuncatched(a)}catch{}if(t!==!1)try{var n,s={promise:e,reason:a};if(R.document&&document.createEvent?((n=document.createEvent("Event")).initEvent(ka,!0,!0),q(n,s)):R.CustomEvent&&q(n=new CustomEvent(ka,{detail:s}),s),n&&R.dispatchEvent&&(dispatchEvent(n),!R.PromiseRejectionEvent&&R.onunhandledrejection))try{R.onunhandledrejection(n)}catch{}Y&&n&&!n.defaultPrevented&&console.warn(`Unhandled rejection: ${a.stack||a}`)}catch{}}var M=L.reject;function $t(a,e,t,n){if(a.idbdb&&(a._state.openComplete||I.letThrough||a._vip)){var s=a._createTransaction(e,t,a._dbSchema);try{s.create(),a._state.PR1398_maxLoop=3}catch(r){return r.name===la.InvalidState&&a.isOpen()&&--a._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),a._close(),a.open().then(()=>$t(a,e,t,n))):M(r)}return s._promise(e,(r,i)=>ce(()=>(I.trans=s,n(r,i,s)))).then(r=>s._completion.then(()=>r))}if(a._state.openComplete)return M(new A.DatabaseClosed(a._state.dbOpenError));if(!a._state.isBeingOpened){if(!a._options.autoOpen)return M(new A.DatabaseClosed);a.open().catch(S)}return a._state.dbReadyPromise.then(()=>$t(a,e,t,n))}const La="3.2.7",me="￿",Gt=-1/0,Q="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",en="String expected.",je=[],kt=typeof navigator<"u"&&/(MSIE|Trident|Edge)/.test(navigator.userAgent),xs=kt,ws=kt,tn=a=>!/(dexie\.js|dexie\.min\.js)/.test(a),_t="__dbnames",At="readonly",Bt="readwrite";function ye(a,e){return a?e?function(){return a.apply(this,arguments)&&e.apply(this,arguments)}:a:e}const an={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function at(a){return typeof a!="string"||/\./.test(a)?e=>e:e=>(e[a]===void 0&&a in e&&delete(e=Ye(e))[a],e)}class Es{_trans(e,t,n){const s=this._tx||I.trans,r=this.name;function i(o,d,c){if(!c.schema[r])throw new A.NotFound("Table "+r+" not part of transaction");return t(c.idbtrans,c)}const l=Qe();try{return s&&s.db===this.db?s===I.trans?s._promise(e,i,n):ce(()=>s._promise(e,i,n),{trans:s,transless:I.transless||I}):$t(this.db,e,[this.name],i)}finally{l&&Xe()}}get(e,t){return e&&e.constructor===Object?this.where(e).first(t):this._trans("readonly",n=>this.core.get({trans:n,key:e}).then(s=>this.hook.reading.fire(s))).then(t)}where(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(H(e))return new this.db.WhereClause(this,`[${e.join("+")}]`);const t=O(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);const n=this.schema.indexes.concat(this.schema.primKey).filter(d=>{if(d.compound&&t.every(c=>d.keyPath.indexOf(c)>=0)){for(let c=0;c<t.length;++c)if(t.indexOf(d.keyPath[c])===-1)return!1;return!0}return!1}).sort((d,c)=>d.keyPath.length-c.keyPath.length)[0];if(n&&this.db._maxKey!==me){const d=n.keyPath.slice(0,t.length);return this.where(d).equals(d.map(c=>e[c]))}!n&&Y&&console.warn(`The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${t.join("+")}]`);const{idxByName:s}=this.schema,r=this.db._deps.indexedDB;function i(d,c){try{return r.cmp(d,c)===0}catch{return!1}}const[l,o]=t.reduce(([d,c],p)=>{const u=s[p],f=e[p];return[d||u,d||!u?ye(c,u&&u.multi?v=>{const b=ne(v,p);return H(b)&&b.some(y=>i(f,y))}:v=>i(f,ne(v,p))):c]},[null,null]);return l?this.where(l.name).equals(e[l.keyPath]).filter(o):n?this.filter(o):this.where(t).equals("")}filter(e){return this.toCollection().and(e)}count(e){return this.toCollection().count(e)}offset(e){return this.toCollection().offset(e)}limit(e){return this.toCollection().limit(e)}each(e){return this.toCollection().each(e)}toArray(e){return this.toCollection().toArray(e)}toCollection(){return new this.db.Collection(new this.db.WhereClause(this))}orderBy(e){return new this.db.Collection(new this.db.WhereClause(this,H(e)?`[${e.join("+")}]`:e))}reverse(){return this.toCollection().reverse()}mapToClass(e){this.schema.mappedClass=e;const t=n=>{if(!n)return n;const s=Object.create(e.prototype);for(var r in n)if(G(n,r))try{s[r]=n[r]}catch{}return s};return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=t,this.hook("reading",t),e}defineClass(){return this.mapToClass(function(e){q(this,e)})}add(e,t){const{auto:n,keyPath:s}=this.schema.primKey;let r=e;return s&&n&&(r=at(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"add",keys:t!=null?[t]:null,values:[r]})).then(i=>i.numFailures?L.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{W(e,s,i)}catch{}return i})}update(e,t){if(typeof e!="object"||H(e))return this.where(":id").equals(e).modify(t);{const n=ne(e,this.schema.primKey.keyPath);if(n===void 0)return M(new A.InvalidArgument("Given object does not contain its primary key"));try{typeof t!="function"?O(t).forEach(s=>{W(e,s,t[s])}):t(e,{value:e,primKey:n})}catch{}return this.where(":id").equals(n).modify(t)}}put(e,t){const{auto:n,keyPath:s}=this.schema.primKey;let r=e;return s&&n&&(r=at(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"put",values:[r],keys:t!=null?[t]:null})).then(i=>i.numFailures?L.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{W(e,s,i)}catch{}return i})}delete(e){return this._trans("readwrite",t=>this.core.mutate({trans:t,type:"delete",keys:[e]})).then(t=>t.numFailures?L.reject(t.failures[0]):void 0)}clear(){return this._trans("readwrite",e=>this.core.mutate({trans:e,type:"deleteRange",range:an})).then(e=>e.numFailures?L.reject(e.failures[0]):void 0)}bulkGet(e){return this._trans("readonly",t=>this.core.getMany({keys:e,trans:t}).then(n=>n.map(s=>this.hook.reading.fire(s))))}bulkAdd(e,t,n){const s=Array.isArray(t)?t:void 0,r=(n=n||(s?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:l,keyPath:o}=this.schema.primKey;if(o&&s)throw new A.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new A.InvalidArgument("Arguments objects and keys must have the same length");const d=e.length;let c=o&&l?e.map(at(o)):e;return this.core.mutate({trans:i,type:"add",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:u,lastResult:f,failures:v})=>{if(p===0)return r?u:f;throw new Me(`${this.name}.bulkAdd(): ${p} of ${d} operations failed`,v)})})}bulkPut(e,t,n){const s=Array.isArray(t)?t:void 0,r=(n=n||(s?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:l,keyPath:o}=this.schema.primKey;if(o&&s)throw new A.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new A.InvalidArgument("Arguments objects and keys must have the same length");const d=e.length;let c=o&&l?e.map(at(o)):e;return this.core.mutate({trans:i,type:"put",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:u,lastResult:f,failures:v})=>{if(p===0)return r?u:f;throw new Me(`${this.name}.bulkPut(): ${p} of ${d} operations failed`,v)})})}bulkDelete(e){const t=e.length;return this._trans("readwrite",n=>this.core.mutate({trans:n,type:"delete",keys:e})).then(({numFailures:n,lastResult:s,failures:r})=>{if(n===0)return s;throw new Me(`${this.name}.bulkDelete(): ${n} of ${t} operations failed`,r)})}}function Ke(a){var e={},t=function(i,l){if(l){for(var o=arguments.length,d=new Array(o-1);--o;)d[o-1]=arguments[o];return e[i].subscribe.apply(null,d),a}if(typeof i=="string")return e[i]};t.addEventType=r;for(var n=1,s=arguments.length;n<s;++n)r(arguments[n]);return t;function r(i,l,o){if(typeof i!="object"){var d;l||(l=hs),o||(o=S);var c={subscribers:[],fire:o,subscribe:function(p){c.subscribers.indexOf(p)===-1&&(c.subscribers.push(p),c.fire=l(c.fire,p))},unsubscribe:function(p){c.subscribers=c.subscribers.filter(function(u){return u!==p}),c.fire=c.subscribers.reduce(l,o)}};return e[i]=t[i]=c,c}O(d=i).forEach(function(p){var u=d[p];if(H(u))r(p,d[p][0],d[p][1]);else{if(u!=="asap")throw new A.InvalidArgument("Invalid event config");var f=r(p,qe,function(){for(var v=arguments.length,b=new Array(v);v--;)b[v]=arguments[v];f.subscribers.forEach(function(y){Oa(function(){y.apply(null,b)})})})}})}}function Fe(a,e){return Ie(e).from({prototype:a}),e}function ke(a,e){return!(a.filter||a.algorithm||a.or)&&(e?a.justLimit:!a.replayFilter)}function Pt(a,e){a.filter=ye(a.filter,e)}function St(a,e,t){var n=a.replayFilter;a.replayFilter=n?()=>ye(n(),e()):e,a.justLimit=t&&!n}function pt(a,e){if(a.isPrimKey)return e.primaryKey;const t=e.getIndexByKeyPath(a.index);if(!t)throw new A.Schema("KeyPath "+a.index+" on object store "+e.name+" is not indexed");return t}function Ca(a,e,t){const n=pt(a,e.schema);return e.openCursor({trans:t,values:!a.keysOnly,reverse:a.dir==="prev",unique:!!a.unique,query:{index:n,range:a.range}})}function nt(a,e,t,n){const s=a.replayFilter?ye(a.filter,a.replayFilter()):a.filter;if(a.or){const r={},i=(l,o,d)=>{if(!s||s(o,d,u=>o.stop(u),u=>o.fail(u))){var c=o.primaryKey,p=""+c;p==="[object ArrayBuffer]"&&(p=""+new Uint8Array(c)),G(r,p)||(r[p]=!0,e(l,o,d))}};return Promise.all([a.or._iterate(i,t),Ia(Ca(a,n,t),a.algorithm,i,!a.keysOnly&&a.valueMapper)])}return Ia(Ca(a,n,t),ye(a.algorithm,s),e,!a.keysOnly&&a.valueMapper)}function Ia(a,e,t,n){var s=D(n?(r,i,l)=>t(n(r),i,l):t);return a.then(r=>{if(r)return r.start(()=>{var i=()=>r.continue();e&&!e(r,l=>i=l,l=>{r.stop(l),i=S},l=>{r.fail(l),i=S})||s(r.value,r,l=>i=l),i()})})}function z(a,e){try{const t=Aa(a),n=Aa(e);if(t!==n)return t==="Array"?1:n==="Array"?-1:t==="binary"?1:n==="binary"?-1:t==="string"?1:n==="string"?-1:t==="Date"?1:n!=="Date"?NaN:-1;switch(t){case"number":case"Date":case"string":return a>e?1:a<e?-1:0;case"binary":return function(s,r){const i=s.length,l=r.length,o=i<l?i:l;for(let d=0;d<o;++d)if(s[d]!==r[d])return s[d]<r[d]?-1:1;return i===l?0:i<l?-1:1}(Ba(a),Ba(e));case"Array":return function(s,r){const i=s.length,l=r.length,o=i<l?i:l;for(let d=0;d<o;++d){const c=z(s[d],r[d]);if(c!==0)return c}return i===l?0:i<l?-1:1}(a,e)}}catch{}return NaN}function Aa(a){const e=typeof a;if(e!=="object")return e;if(ArrayBuffer.isView(a))return"binary";const t=Tt(a);return t==="ArrayBuffer"?"binary":t}function Ba(a){return a instanceof Uint8Array?a:ArrayBuffer.isView(a)?new Uint8Array(a.buffer,a.byteOffset,a.byteLength):new Uint8Array(a)}class ks{_read(e,t){var n=this._ctx;return n.error?n.table._trans(null,M.bind(null,n.error)):n.table._trans("readonly",e).then(t)}_write(e){var t=this._ctx;return t.error?t.table._trans(null,M.bind(null,t.error)):t.table._trans("readwrite",e,"locked")}_addAlgorithm(e){var t=this._ctx;t.algorithm=ye(t.algorithm,e)}_iterate(e,t){return nt(this._ctx,e,t,this._ctx.table.core)}clone(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&q(n,e),t._ctx=n,t}raw(){return this._ctx.valueMapper=null,this}each(e){var t=this._ctx;return this._read(n=>nt(t,e,n,t.table.core))}count(e){return this._read(t=>{const n=this._ctx,s=n.table.core;if(ke(n,!0))return s.count({trans:t,query:{index:pt(n,s.schema),range:n.range}}).then(i=>Math.min(i,n.limit));var r=0;return nt(n,()=>(++r,!1),t,s).then(()=>r)}).then(e)}sortBy(e,t){const n=e.split(".").reverse(),s=n[0],r=n.length-1;function i(d,c){return c?i(d[n[c]],c-1):d[s]}var l=this._ctx.dir==="next"?1:-1;function o(d,c){var p=i(d,r),u=i(c,r);return p<u?-l:p>u?l:0}return this.toArray(function(d){return d.sort(o)}).then(t)}toArray(e){return this._read(t=>{var n=this._ctx;if(n.dir==="next"&&ke(n,!0)&&n.limit>0){const{valueMapper:s}=n,r=pt(n,n.table.core.schema);return n.table.core.query({trans:t,limit:n.limit,values:!0,query:{index:r,range:n.range}}).then(({result:i})=>s?i.map(s):i)}{const s=[];return nt(n,r=>s.push(r),t,n.table.core).then(()=>s)}},e)}offset(e){var t=this._ctx;return e<=0||(t.offset+=e,ke(t)?St(t,()=>{var n=e;return(s,r)=>n===0||(n===1?(--n,!1):(r(()=>{s.advance(n),n=0}),!1))}):St(t,()=>{var n=e;return()=>--n<0})),this}limit(e){return this._ctx.limit=Math.min(this._ctx.limit,e),St(this._ctx,()=>{var t=e;return function(n,s,r){return--t<=0&&s(r),t>=0}},!0),this}until(e,t){return Pt(this._ctx,function(n,s,r){return!e(n.value)||(s(r),t)}),this}first(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)}last(e){return this.reverse().first(e)}filter(e){var t,n;return Pt(this._ctx,function(s){return e(s.value)}),t=this._ctx,n=e,t.isMatch=ye(t.isMatch,n),this}and(e){return this.filter(e)}or(e){return new this.db.WhereClause(this._ctx.table,e,this)}reverse(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this}desc(){return this.reverse()}eachKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,s){e(s.key,s)})}eachUniqueKey(e){return this._ctx.unique="unique",this.eachKey(e)}eachPrimaryKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,s){e(s.primaryKey,s)})}keys(e){var t=this._ctx;t.keysOnly=!t.isMatch;var n=[];return this.each(function(s,r){n.push(r.key)}).then(function(){return n}).then(e)}primaryKeys(e){var t=this._ctx;if(t.dir==="next"&&ke(t,!0)&&t.limit>0)return this._read(s=>{var r=pt(t,t.table.core.schema);return t.table.core.query({trans:s,values:!1,limit:t.limit,query:{index:r,range:t.range}})}).then(({result:s})=>s).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(s,r){n.push(r.primaryKey)}).then(function(){return n}).then(e)}uniqueKeys(e){return this._ctx.unique="unique",this.keys(e)}firstKey(e){return this.limit(1).keys(function(t){return t[0]}).then(e)}lastKey(e){return this.reverse().firstKey(e)}distinct(){var e=this._ctx,t=e.index&&e.table.schema.idxByName[e.index];if(!t||!t.multi)return this;var n={};return Pt(this._ctx,function(s){var r=s.primaryKey.toString(),i=G(n,r);return n[r]=!0,!i}),this}modify(e){var t=this._ctx;return this._write(n=>{var s;if(typeof e=="function")s=e;else{var r=O(e),i=r.length;s=function(b){for(var y=!1,g=0;g<i;++g){var h=r[g],w=e[h];ne(b,h)!==w&&(W(b,h,w),y=!0)}return y}}const l=t.table.core,{outbound:o,extractKey:d}=l.schema.primaryKey,c=this.db._options.modifyChunkSize||200,p=[];let u=0;const f=[],v=(b,y)=>{const{failures:g,numFailures:h}=y;u+=b-h;for(let w of O(g))p.push(g[w])};return this.clone().primaryKeys().then(b=>{const y=g=>{const h=Math.min(c,b.length-g);return l.getMany({trans:n,keys:b.slice(g,g+h),cache:"immutable"}).then(w=>{const _=[],C=[],k=o?[]:null,x=[];for(let E=0;E<h;++E){const F=w[E],P={value:Ye(F),primKey:b[g+E]};s.call(P,P.value,P)!==!1&&(P.value==null?x.push(b[g+E]):o||z(d(F),d(P.value))===0?(C.push(P.value),o&&k.push(b[g+E])):(x.push(b[g+E]),_.push(P.value)))}const B=ke(t)&&t.limit===1/0&&(typeof e!="function"||e===Rt)&&{index:t.index,range:t.range};return Promise.resolve(_.length>0&&l.mutate({trans:n,type:"add",values:_}).then(E=>{for(let F in E.failures)x.splice(parseInt(F),1);v(_.length,E)})).then(()=>(C.length>0||B&&typeof e=="object")&&l.mutate({trans:n,type:"put",keys:k,values:C,criteria:B,changeSpec:typeof e!="function"&&e}).then(E=>v(C.length,E))).then(()=>(x.length>0||B&&e===Rt)&&l.mutate({trans:n,type:"delete",keys:x,criteria:B}).then(E=>v(x.length,E))).then(()=>b.length>g+h&&y(g+c))})};return y(0).then(()=>{if(p.length>0)throw new gt("Error modifying one or more objects",p,u,f);return b.length})})})}delete(){var e=this._ctx,t=e.range;return ke(e)&&(e.isPrimKey&&!ws||t.type===3)?this._write(n=>{const{primaryKey:s}=e.table.core.schema,r=t;return e.table.core.count({trans:n,query:{index:s,range:r}}).then(i=>e.table.core.mutate({trans:n,type:"deleteRange",range:r}).then(({failures:l,lastResult:o,results:d,numFailures:c})=>{if(c)throw new gt("Could not delete some values",Object.keys(l).map(p=>l[p]),i-c);return i-c}))}):this.modify(Rt)}}const Rt=(a,e)=>e.value=null;function _s(a,e){return a<e?-1:a===e?0:1}function Ls(a,e){return a>e?-1:a===e?0:1}function $(a,e,t){var n=a instanceof sn?new a.Collection(a):a;return n._ctx.error=t?new t(e):new TypeError(e),n}function _e(a){return new a.Collection(a,()=>nn("")).limit(0)}function Cs(a,e,t,n,s,r){for(var i=Math.min(a.length,n.length),l=-1,o=0;o<i;++o){var d=e[o];if(d!==n[o])return s(a[o],t[o])<0?a.substr(0,o)+t[o]+t.substr(o+1):s(a[o],n[o])<0?a.substr(0,o)+n[o]+t.substr(o+1):l>=0?a.substr(0,l)+e[l]+t.substr(l+1):null;s(a[o],d)<0&&(l=o)}return i<n.length&&r==="next"?a+t.substr(a.length):i<a.length&&r==="prev"?a.substr(0,t.length):l<0?null:a.substr(0,l)+n[l]+t.substr(l+1)}function st(a,e,t,n){var s,r,i,l,o,d,c,p=t.length;if(!t.every(b=>typeof b=="string"))return $(a,en);function u(b){s=function(g){return g==="next"?h=>h.toUpperCase():h=>h.toLowerCase()}(b),r=function(g){return g==="next"?h=>h.toLowerCase():h=>h.toUpperCase()}(b),i=b==="next"?_s:Ls;var y=t.map(function(g){return{lower:r(g),upper:s(g)}}).sort(function(g,h){return i(g.lower,h.lower)});l=y.map(function(g){return g.upper}),o=y.map(function(g){return g.lower}),d=b,c=b==="next"?"":n}u("next");var f=new a.Collection(a,()=>ie(l[0],o[p-1]+n));f._ondirectionchange=function(b){u(b)};var v=0;return f._addAlgorithm(function(b,y,g){var h=b.key;if(typeof h!="string")return!1;var w=r(h);if(e(w,o,v))return!0;for(var _=null,C=v;C<p;++C){var k=Cs(h,w,l[C],o[C],i,d);k===null&&_===null?v=C+1:(_===null||i(_,k)>0)&&(_=k)}return y(_!==null?function(){b.continue(_+c)}:g),!1}),f}function ie(a,e,t,n){return{type:2,lower:a,upper:e,lowerOpen:t,upperOpen:n}}function nn(a){return{type:1,lower:a,upper:a}}class sn{get Collection(){return this._ctx.table.db.Collection}between(e,t,n,s){n=n!==!1,s=s===!0;try{return this._cmp(e,t)>0||this._cmp(e,t)===0&&(n||s)&&(!n||!s)?_e(this):new this.Collection(this,()=>ie(e,t,!n,!s))}catch{return $(this,Q)}}equals(e){return e==null?$(this,Q):new this.Collection(this,()=>nn(e))}above(e){return e==null?$(this,Q):new this.Collection(this,()=>ie(e,void 0,!0))}aboveOrEqual(e){return e==null?$(this,Q):new this.Collection(this,()=>ie(e,void 0,!1))}below(e){return e==null?$(this,Q):new this.Collection(this,()=>ie(void 0,e,!1,!0))}belowOrEqual(e){return e==null?$(this,Q):new this.Collection(this,()=>ie(void 0,e))}startsWith(e){return typeof e!="string"?$(this,en):this.between(e,e+me,!0,!0)}startsWithIgnoreCase(e){return e===""?this.startsWith(e):st(this,(t,n)=>t.indexOf(n[0])===0,[e],me)}equalsIgnoreCase(e){return st(this,(t,n)=>t===n[0],[e],"")}anyOfIgnoreCase(){var e=ee.apply(Le,arguments);return e.length===0?_e(this):st(this,(t,n)=>n.indexOf(t)!==-1,e,"")}startsWithAnyOfIgnoreCase(){var e=ee.apply(Le,arguments);return e.length===0?_e(this):st(this,(t,n)=>n.some(s=>t.indexOf(s)===0),e,me)}anyOf(){const e=ee.apply(Le,arguments);let t=this._cmp;try{e.sort(t)}catch{return $(this,Q)}if(e.length===0)return _e(this);const n=new this.Collection(this,()=>ie(e[0],e[e.length-1]));n._ondirectionchange=r=>{t=r==="next"?this._ascending:this._descending,e.sort(t)};let s=0;return n._addAlgorithm((r,i,l)=>{const o=r.key;for(;t(o,e[s])>0;)if(++s,s===e.length)return i(l),!1;return t(o,e[s])===0||(i(()=>{r.continue(e[s])}),!1)}),n}notEqual(e){return this.inAnyRange([[Gt,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})}noneOf(){const e=ee.apply(Le,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return $(this,Q)}const t=e.reduce((n,s)=>n?n.concat([[n[n.length-1][1],s]]):[[Gt,s]],null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})}inAnyRange(e,t){const n=this._cmp,s=this._ascending,r=this._descending,i=this._min,l=this._max;if(e.length===0)return _e(this);if(!e.every(h=>h[0]!==void 0&&h[1]!==void 0&&s(h[0],h[1])<=0))return $(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",A.InvalidArgument);const o=!t||t.includeLowers!==!1,d=t&&t.includeUppers===!0;let c,p=s;function u(h,w){return p(h[0],w[0])}try{c=e.reduce(function(h,w){let _=0,C=h.length;for(;_<C;++_){const k=h[_];if(n(w[0],k[1])<0&&n(w[1],k[0])>0){k[0]=i(k[0],w[0]),k[1]=l(k[1],w[1]);break}}return _===C&&h.push(w),h},[]),c.sort(u)}catch{return $(this,Q)}let f=0;const v=d?h=>s(h,c[f][1])>0:h=>s(h,c[f][1])>=0,b=o?h=>r(h,c[f][0])>0:h=>r(h,c[f][0])>=0;let y=v;const g=new this.Collection(this,()=>ie(c[0][0],c[c.length-1][1],!o,!d));return g._ondirectionchange=h=>{h==="next"?(y=v,p=s):(y=b,p=r),c.sort(u)},g._addAlgorithm((h,w,_)=>{for(var C=h.key;y(C);)if(++f,f===c.length)return w(_),!1;return!!function(k){return!v(k)&&!b(k)}(C)||(this._cmp(C,c[f][1])===0||this._cmp(C,c[f][0])===0||w(()=>{p===s?h.continue(c[f][0]):h.continue(c[f][1])}),!1)}),g}startsWithAnyOf(){const e=ee.apply(Le,arguments);return e.every(t=>typeof t=="string")?e.length===0?_e(this):this.inAnyRange(e.map(t=>[t,t+me])):$(this,"startsWithAnyOf() only works with strings")}}function J(a){return D(function(e){return $e(e),a(e.target.error),!1})}function $e(a){a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault()}const Ge="storagemutated",le="x-storagemutated-1",ue=Ke(null,Ge);class Is{_lock(){return Te(!I.global),++this._reculock,this._reculock!==1||I.global||(I.lockOwnerFor=this),this}_unlock(){if(Te(!I.global),--this._reculock==0)for(I.global||(I.lockOwnerFor=null);this._blockedFuncs.length>0&&!this._locked();){var e=this._blockedFuncs.shift();try{Re(e[1],e[0])}catch{}}return this}_locked(){return this._reculock&&I.lockOwnerFor!==this}create(e){if(!this.mode)return this;const t=this.db.idbdb,n=this.db._state.dbOpenError;if(Te(!this.idbtrans),!e&&!t)switch(n&&n.name){case"DatabaseClosedError":throw new A.DatabaseClosed(n);case"MissingAPIError":throw new A.MissingAPI(n.message,n);default:throw new A.OpenFailed(n)}if(!this.active)throw new A.TransactionInactive;return Te(this._completion._state===null),(e=this.idbtrans=e||(this.db.core?this.db.core.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}):t.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}))).onerror=D(s=>{$e(s),this._reject(e.error)}),e.onabort=D(s=>{$e(s),this.active&&this._reject(new A.Abort(e.error)),this.active=!1,this.on("abort").fire(s)}),e.oncomplete=D(()=>{this.active=!1,this._resolve(),"mutatedParts"in e&&ue.storagemutated.fire(e.mutatedParts)}),this}_promise(e,t,n){if(e==="readwrite"&&this.mode!=="readwrite")return M(new A.ReadOnly("Transaction is readonly"));if(!this.active)return M(new A.TransactionInactive);if(this._locked())return new L((r,i)=>{this._blockedFuncs.push([()=>{this._promise(e,t,n).then(r,i)},I])});if(n)return ce(()=>{var r=new L((i,l)=>{this._lock();const o=t(i,l,this);o&&o.then&&o.then(i,l)});return r.finally(()=>this._unlock()),r._lib=!0,r});var s=new L((r,i)=>{var l=t(r,i,this);l&&l.then&&l.then(r,i)});return s._lib=!0,s}_root(){return this.parent?this.parent._root():this}waitFor(e){var t=this._root();const n=L.resolve(e);if(t._waitingFor)t._waitingFor=t._waitingFor.then(()=>n);else{t._waitingFor=n,t._waitingQueue=[];var s=t.idbtrans.objectStore(t.storeNames[0]);(function i(){for(++t._spinCount;t._waitingQueue.length;)t._waitingQueue.shift()();t._waitingFor&&(s.get(-1/0).onsuccess=i)})()}var r=t._waitingFor;return new L((i,l)=>{n.then(o=>t._waitingQueue.push(D(i.bind(null,o))),o=>t._waitingQueue.push(D(l.bind(null,o)))).finally(()=>{t._waitingFor===r&&(t._waitingFor=null)})})}abort(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new A.Abort))}table(e){const t=this._memoizedTables||(this._memoizedTables={});if(G(t,e))return t[e];const n=this.schema[e];if(!n)throw new A.NotFound("Table "+e+" not part of transaction");const s=new this.db.Table(e,n,this);return s.core=this.db.core.table(e),t[e]=s,s}}function Wt(a,e,t,n,s,r,i){return{name:a,keyPath:e,unique:t,multi:n,auto:s,compound:r,src:(t&&!i?"&":"")+(n?"*":"")+(s?"++":"")+rn(e)}}function rn(a){return typeof a=="string"?a:a?"["+[].join.call(a,"+")+"]":""}function on(a,e,t){return{name:a,primKey:e,indexes:t,mappedClass:null,idxByName:Ma(t,n=>[n.name,n])}}let We=a=>{try{return a.only([[]]),We=()=>[[]],[[]]}catch{return We=()=>me,me}};function Jt(a){return a==null?()=>{}:typeof a=="string"?function(e){return e.split(".").length===1?n=>n[e]:n=>ne(n,e)}(a):e=>ne(e,a)}function Pa(a){return[].slice.call(a)}let As=0;function He(a){return a==null?":id":typeof a=="string"?a:`[${a.join("+")}]`}function Bs(a,e,t){function n(o){if(o.type===3)return null;if(o.type===4)throw new Error("Cannot convert never type to IDBKeyRange");const{lower:d,upper:c,lowerOpen:p,upperOpen:u}=o;return d===void 0?c===void 0?null:e.upperBound(c,!!u):c===void 0?e.lowerBound(d,!!p):e.bound(d,c,!!p,!!u)}const{schema:s,hasGetAll:r}=function(o,d){const c=Pa(o.objectStoreNames);return{schema:{name:o.name,tables:c.map(p=>d.objectStore(p)).map(p=>{const{keyPath:u,autoIncrement:f}=p,v=H(u),b=u==null,y={},g={name:p.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:b,compound:v,keyPath:u,autoIncrement:f,unique:!0,extractKey:Jt(u)},indexes:Pa(p.indexNames).map(h=>p.index(h)).map(h=>{const{name:w,unique:_,multiEntry:C,keyPath:k}=h,x={name:w,compound:H(k),keyPath:k,unique:_,multiEntry:C,extractKey:Jt(k)};return y[He(k)]=x,x}),getIndexByKeyPath:h=>y[He(h)]};return y[":id"]=g.primaryKey,u!=null&&(y[He(u)]=g.primaryKey),g})},hasGetAll:c.length>0&&"getAll"in d.objectStore(c[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)}}(a,t),i=s.tables.map(o=>function(d){const c=d.name;return{name:c,schema:d,mutate:function({trans:p,type:u,keys:f,values:v,range:b}){return new Promise((y,g)=>{y=D(y);const h=p.objectStore(c),w=h.keyPath==null,_=u==="put"||u==="add";if(!_&&u!=="delete"&&u!=="deleteRange")throw new Error("Invalid operation type: "+u);const{length:C}=f||v||{length:1};if(f&&v&&f.length!==v.length)throw new Error("Given keys array must have same length as given values array.");if(C===0)return y({numFailures:0,failures:{},results:[],lastResult:void 0});let k;const x=[],B=[];let E=0;const F=V=>{++E,$e(V)};if(u==="deleteRange"){if(b.type===4)return y({numFailures:E,failures:B,results:[],lastResult:void 0});b.type===3?x.push(k=h.clear()):x.push(k=h.delete(n(b)))}else{const[V,j]=_?w?[v,f]:[v,null]:[f,null];if(_)for(let T=0;T<C;++T)x.push(k=j&&j[T]!==void 0?h[u](V[T],j[T]):h[u](V[T])),k.onerror=F;else for(let T=0;T<C;++T)x.push(k=h[u](V[T])),k.onerror=F}const P=V=>{const j=V.target.result;x.forEach((T,we)=>T.error!=null&&(B[we]=T.error)),y({numFailures:E,failures:B,results:u==="delete"?f:x.map(T=>T.result),lastResult:j})};k.onerror=V=>{F(V),P(V)},k.onsuccess=P})},getMany:({trans:p,keys:u})=>new Promise((f,v)=>{f=D(f);const b=p.objectStore(c),y=u.length,g=new Array(y);let h,w=0,_=0;const C=x=>{const B=x.target;g[B._pos]=B.result,++_===w&&f(g)},k=J(v);for(let x=0;x<y;++x)u[x]!=null&&(h=b.get(u[x]),h._pos=x,h.onsuccess=C,h.onerror=k,++w);w===0&&f(g)}),get:({trans:p,key:u})=>new Promise((f,v)=>{f=D(f);const b=p.objectStore(c).get(u);b.onsuccess=y=>f(y.target.result),b.onerror=J(v)}),query:function(p){return u=>new Promise((f,v)=>{f=D(f);const{trans:b,values:y,limit:g,query:h}=u,w=g===1/0?void 0:g,{index:_,range:C}=h,k=b.objectStore(c),x=_.isPrimaryKey?k:k.index(_.name),B=n(C);if(g===0)return f({result:[]});if(p){const E=y?x.getAll(B,w):x.getAllKeys(B,w);E.onsuccess=F=>f({result:F.target.result}),E.onerror=J(v)}else{let E=0;const F=y||!("openKeyCursor"in x)?x.openCursor(B):x.openKeyCursor(B),P=[];F.onsuccess=V=>{const j=F.result;return j?(P.push(y?j.value:j.primaryKey),++E===g?f({result:P}):void j.continue()):f({result:P})},F.onerror=J(v)}})}(r),openCursor:function({trans:p,values:u,query:f,reverse:v,unique:b}){return new Promise((y,g)=>{y=D(y);const{index:h,range:w}=f,_=p.objectStore(c),C=h.isPrimaryKey?_:_.index(h.name),k=v?b?"prevunique":"prev":b?"nextunique":"next",x=u||!("openKeyCursor"in C)?C.openCursor(n(w),k):C.openKeyCursor(n(w),k);x.onerror=J(g),x.onsuccess=D(B=>{const E=x.result;if(!E)return void y(null);E.___id=++As,E.done=!1;const F=E.continue.bind(E);let P=E.continuePrimaryKey;P&&(P=P.bind(E));const V=E.advance.bind(E),j=()=>{throw new Error("Cursor not stopped")};E.trans=p,E.stop=E.continue=E.continuePrimaryKey=E.advance=()=>{throw new Error("Cursor not started")},E.fail=D(g),E.next=function(){let T=1;return this.start(()=>T--?this.continue():this.stop()).then(()=>this)},E.start=T=>{const we=new Promise((U,pe)=>{U=D(U),x.onerror=J(pe),E.fail=pe,E.stop=De=>{E.stop=E.continue=E.continuePrimaryKey=E.advance=j,U(De)}}),Ee=()=>{if(x.result)try{T()}catch(U){E.fail(U)}else E.done=!0,E.start=()=>{throw new Error("Cursor behind last entry")},E.stop()};return x.onsuccess=D(U=>{x.onsuccess=Ee,Ee()}),E.continue=F,E.continuePrimaryKey=P,E.advance=V,Ee(),we},y(E)},g)})},count({query:p,trans:u}){const{index:f,range:v}=p;return new Promise((b,y)=>{const g=u.objectStore(c),h=f.isPrimaryKey?g:g.index(f.name),w=n(v),_=w?h.count(w):h.count();_.onsuccess=D(C=>b(C.target.result)),_.onerror=J(y)})}}}(o)),l={};return i.forEach(o=>l[o.name]=o),{stack:"dbcore",transaction:a.transaction.bind(a),table(o){if(!l[o])throw new Error(`Table '${o}' not found`);return l[o]},MIN_KEY:-1/0,MAX_KEY:We(e),schema:s}}function Yt({_novip:a},e){const t=e.db,n=function(s,r,{IDBKeyRange:i,indexedDB:l},o){return{dbcore:function(c,p){return p.reduce((u,{create:f})=>({...u,...f(u)}),c)}(Bs(r,i,o),s.dbcore)}}(a._middlewares,t,a._deps,e);a.core=n.dbcore,a.tables.forEach(s=>{const r=s.name;a.core.schema.tables.some(i=>i.name===r)&&(s.core=a.core.table(r),a[r]instanceof a.Table&&(a[r].core=s.core))})}function wt({_novip:a},e,t,n){t.forEach(s=>{const r=n[s];e.forEach(i=>{const l=ra(i,s);(!l||"value"in l&&l.value===void 0)&&(i===a.Transaction.prototype||i instanceof a.Transaction?ae(i,s,{get(){return this.table(s)},set(o){Fa(this,s,{value:o,writable:!0,configurable:!0,enumerable:!0})}}):i[s]=new a.Table(s,r))})})}function Qt({_novip:a},e){e.forEach(t=>{for(let n in t)t[n]instanceof a.Table&&delete t[n]})}function Ps(a,e){return a._cfg.version-e._cfg.version}function Ss(a,e,t,n){const s=a._dbSchema,r=a._createTransaction("readwrite",a._storeNames,s);r.create(t),r._completion.catch(n);const i=r._reject.bind(r),l=I.transless||I;ce(()=>{I.trans=r,I.transless=l,e===0?(O(s).forEach(o=>{Dt(t,o,s[o].primKey,s[o].indexes)}),Yt(a,t),L.follow(()=>a.on.populate.fire(r)).catch(i)):function({_novip:o},d,c,p){const u=[],f=o._versions;let v=o._dbSchema=Zt(o,o.idbdb,p),b=!1;const y=f.filter(h=>h._cfg.version>=d);function g(){return u.length?L.resolve(u.shift()(c.idbtrans)).then(g):L.resolve()}return y.forEach(h=>{u.push(()=>{const w=v,_=h._cfg.dbschema;ea(o,w,p),ea(o,_,p),v=o._dbSchema=_;const C=ln(w,_);C.add.forEach(x=>{Dt(p,x[0],x[1].primKey,x[1].indexes)}),C.change.forEach(x=>{if(x.recreate)throw new A.Upgrade("Not yet support for changing primary key");{const B=p.objectStore(x.name);x.add.forEach(E=>Xt(B,E)),x.change.forEach(E=>{B.deleteIndex(E.name),Xt(B,E)}),x.del.forEach(E=>B.deleteIndex(E))}});const k=h._cfg.contentUpgrade;if(k&&h._cfg.version>d){Yt(o,p),c._memoizedTables={},b=!0;let x=Na(_);C.del.forEach(P=>{x[P]=w[P]}),Qt(o,[o.Transaction.prototype]),wt(o,[o.Transaction.prototype],O(x),x),c.schema=x;const B=ia(k);let E;B&&Se();const F=L.follow(()=>{if(E=k(c),E&&B){var P=se.bind(null,null);E.then(P,P)}});return E&&typeof E.then=="function"?L.resolve(E):F.then(()=>E)}}),u.push(w=>{(!b||!xs)&&function(_,C){[].slice.call(C.db.objectStoreNames).forEach(k=>_[k]==null&&C.db.deleteObjectStore(k))}(h._cfg.dbschema,w),Qt(o,[o.Transaction.prototype]),wt(o,[o.Transaction.prototype],o._storeNames,o._dbSchema),c.schema=o._dbSchema})}),g().then(()=>{var h,w;w=p,O(h=v).forEach(_=>{w.db.objectStoreNames.contains(_)||Dt(w,_,h[_].primKey,h[_].indexes)})})}(a,e,r,t).catch(i)})}function ln(a,e){const t={del:[],add:[],change:[]};let n;for(n in a)e[n]||t.del.push(n);for(n in e){const s=a[n],r=e[n];if(s){const i={name:n,def:r,recreate:!1,del:[],add:[],change:[]};if(""+(s.primKey.keyPath||"")!=""+(r.primKey.keyPath||"")||s.primKey.auto!==r.primKey.auto&&!kt)i.recreate=!0,t.change.push(i);else{const l=s.idxByName,o=r.idxByName;let d;for(d in l)o[d]||i.del.push(d);for(d in o){const c=l[d],p=o[d];c?c.src!==p.src&&i.change.push(p):i.add.push(p)}(i.del.length>0||i.add.length>0||i.change.length>0)&&t.change.push(i)}}else t.add.push([n,r])}return t}function Dt(a,e,t,n){const s=a.db.createObjectStore(e,t.keyPath?{keyPath:t.keyPath,autoIncrement:t.auto}:{autoIncrement:t.auto});return n.forEach(r=>Xt(s,r)),s}function Xt(a,e){a.createIndex(e.name,e.keyPath,{unique:e.unique,multiEntry:e.multi})}function Zt(a,e,t){const n={};return ft(e.objectStoreNames,0).forEach(s=>{const r=t.objectStore(s);let i=r.keyPath;const l=Wt(rn(i),i||"",!1,!1,!!r.autoIncrement,i&&typeof i!="string",!0),o=[];for(let c=0;c<r.indexNames.length;++c){const p=r.index(r.indexNames[c]);i=p.keyPath;var d=Wt(p.name,i,!!p.unique,!!p.multiEntry,!1,i&&typeof i!="string",!1);o.push(d)}n[s]=on(s,l,o)}),n}function ea({_novip:a},e,t){const n=t.db.objectStoreNames;for(let s=0;s<n.length;++s){const r=n[s],i=t.objectStore(r);a._hasGetAll="getAll"in i;for(let l=0;l<i.indexNames.length;++l){const o=i.indexNames[l],d=i.index(o).keyPath,c=typeof d=="string"?d:"["+ft(d).join("+")+"]";if(e[r]){const p=e[r].idxByName[c];p&&(p.name=o,delete e[r].idxByName[c],e[r].idxByName[o]=p)}}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&R.WorkerGlobalScope&&R instanceof R.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(a._hasGetAll=!1)}class Rs{_parseStoresSpec(e,t){O(e).forEach(n=>{if(e[n]!==null){var s=e[n].split(",").map((i,l)=>{const o=(i=i.trim()).replace(/([&*]|\+\+)/g,""),d=/^\[/.test(o)?o.match(/^\[(.*)\]$/)[1].split("+"):o;return Wt(o,d||null,/\&/.test(i),/\*/.test(i),/\+\+/.test(i),H(d),l===0)}),r=s.shift();if(r.multi)throw new A.Schema("Primary key cannot be multi-valued");s.forEach(i=>{if(i.auto)throw new A.Schema("Only primary key can be marked as autoIncrement (++)");if(!i.keyPath)throw new A.Schema("Index must have a name and cannot be an empty string")}),t[n]=on(n,r,s)}})}stores(e){const t=this.db;this._cfg.storesSource=this._cfg.storesSource?q(this._cfg.storesSource,e):e;const n=t._versions,s={};let r={};return n.forEach(i=>{q(s,i._cfg.storesSource),r=i._cfg.dbschema={},i._parseStoresSpec(s,r)}),t._dbSchema=r,Qt(t,[t._allTables,t,t.Transaction.prototype]),wt(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],O(r),r),t._storeNames=O(r),this}upgrade(e){return this._cfg.contentUpgrade=ca(this._cfg.contentUpgrade||S,e),this}}function ha(a,e){let t=a._dbNamesDB;return t||(t=a._dbNamesDB=new be(_t,{addons:[],indexedDB:a,IDBKeyRange:e}),t.version(1).stores({dbnames:"name"})),t.table("dbnames")}function ma(a){return a&&typeof a.databases=="function"}function ta(a){return ce(function(){return I.letThrough=!0,a()})}function Ds(){var a;return!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(e){var t=function(){return indexedDB.databases().finally(e)};a=setInterval(t,100),t()}).finally(function(){return clearInterval(a)}):Promise.resolve()}function Fs(a){const e=a._state,{indexedDB:t}=a._deps;if(e.isBeingOpened||a.idbdb)return e.dbReadyPromise.then(()=>e.dbOpenError?M(e.dbOpenError):a);Y&&(e.openCanceller._stackHolder=xe()),e.isBeingOpened=!0,e.dbOpenError=null,e.openComplete=!1;const n=e.openCanceller;function s(){if(e.openCanceller!==n)throw new A.DatabaseClosed("db.open() was cancelled")}let r=e.dbReadyResolve,i=null,l=!1;const o=()=>new L((d,c)=>{if(s(),!t)throw new A.MissingAPI;const p=a.name,u=e.autoSchema?t.open(p):t.open(p,Math.round(10*a.verno));if(!u)throw new A.MissingAPI;u.onerror=J(c),u.onblocked=D(a._fireOnBlocked),u.onupgradeneeded=D(f=>{if(i=u.transaction,e.autoSchema&&!a._options.allowEmptyDB){u.onerror=$e,i.abort(),u.result.close();const b=t.deleteDatabase(p);b.onsuccess=b.onerror=D(()=>{c(new A.NoSuchDatabase(`Database ${p} doesnt exist`))})}else{i.onerror=J(c);var v=f.oldVersion>Math.pow(2,62)?0:f.oldVersion;l=v<1,a._novip.idbdb=u.result,Ss(a,v/10,i,c)}},c),u.onsuccess=D(()=>{i=null;const f=a._novip.idbdb=u.result,v=ft(f.objectStoreNames);if(v.length>0)try{const y=f.transaction((b=v).length===1?b[0]:b,"readonly");e.autoSchema?function({_novip:g},h,w){g.verno=h.version/10;const _=g._dbSchema=Zt(0,h,w);g._storeNames=ft(h.objectStoreNames,0),wt(g,[g._allTables],O(_),_)}(a,f,y):(ea(a,a._dbSchema,y),function(g,h){const w=ln(Zt(0,g.idbdb,h),g._dbSchema);return!(w.add.length||w.change.some(_=>_.add.length||_.change.length))}(a,y)||console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")),Yt(a,y)}catch{}var b;je.push(a),f.onversionchange=D(y=>{e.vcFired=!0,a.on("versionchange").fire(y)}),f.onclose=D(y=>{a.on("close").fire(y)}),l&&function({indexedDB:y,IDBKeyRange:g},h){!ma(y)&&h!==_t&&ha(y,g).put({name:h}).catch(S)}(a._deps,p),d()},c)}).catch(d=>d&&d.name==="UnknownError"&&e.PR1398_maxLoop>0?(e.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),o()):L.reject(d));return L.race([n,(typeof navigator>"u"?L.resolve():Ds()).then(o)]).then(()=>(s(),e.onReadyBeingFired=[],L.resolve(ta(()=>a.on.ready.fire(a.vip))).then(function d(){if(e.onReadyBeingFired.length>0){let c=e.onReadyBeingFired.reduce(ca,S);return e.onReadyBeingFired=[],L.resolve(ta(()=>c(a.vip))).then(d)}}))).finally(()=>{e.onReadyBeingFired=null,e.isBeingOpened=!1}).then(()=>a).catch(d=>{e.dbOpenError=d;try{i&&i.abort()}catch{}return n===e.openCanceller&&a._close(),M(d)}).finally(()=>{e.openComplete=!0,r()})}function aa(a){var e=r=>a.next(r),t=s(e),n=s(r=>a.throw(r));function s(r){return i=>{var l=r(i),o=l.value;return l.done?o:o&&typeof o.then=="function"?o.then(t,n):H(o)?Promise.all(o).then(t,n):t(o)}}return s(e)()}function Ts(a,e,t){var n=arguments.length;if(n<2)throw new A.InvalidArgument("Too few arguments");for(var s=new Array(n-1);--n;)s[n-1]=arguments[n];return t=s.pop(),[a,ja(s),t]}function cn(a,e,t,n,s){return L.resolve().then(()=>{const r=I.transless||I,i=a._createTransaction(e,t,a._dbSchema,n),l={trans:i,transless:r};if(n)i.idbtrans=n.idbtrans;else try{i.create(),a._state.PR1398_maxLoop=3}catch(p){return p.name===la.InvalidState&&a.isOpen()&&--a._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),a._close(),a.open().then(()=>cn(a,e,t,null,s))):M(p)}const o=ia(s);let d;o&&Se();const c=L.follow(()=>{if(d=s.call(i,i),d)if(o){var p=se.bind(null,null);d.then(p,p)}else typeof d.next=="function"&&typeof d.throw=="function"&&(d=aa(d))},l);return(d&&typeof d.then=="function"?L.resolve(d).then(p=>i.active?p:M(new A.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))):c.then(()=>d)).then(p=>(n&&i._resolve(),i._completion.then(()=>p))).catch(p=>(i._reject(p),M(p)))})}function rt(a,e,t){const n=H(a)?a.slice():[a];for(let s=0;s<t;++s)n.push(e);return n}const Os={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(a){return{...a,table(e){const t=a.table(e),{schema:n}=t,s={},r=[];function i(c,p,u){const f=He(c),v=s[f]=s[f]||[],b=c==null?0:typeof c=="string"?1:c.length,y=p>0,g={...u,isVirtual:y,keyTail:p,keyLength:b,extractKey:Jt(c),unique:!y&&u.unique};return v.push(g),g.isPrimaryKey||r.push(g),b>1&&i(b===2?c[0]:c.slice(0,b-1),p+1,u),v.sort((h,w)=>h.keyTail-w.keyTail),g}const l=i(n.primaryKey.keyPath,0,n.primaryKey);s[":id"]=[l];for(const c of n.indexes)i(c.keyPath,0,c);function o(c){const p=c.query.index;return p.isVirtual?{...c,query:{index:p,range:(u=c.query.range,f=p.keyTail,{type:u.type===1?2:u.type,lower:rt(u.lower,u.lowerOpen?a.MAX_KEY:a.MIN_KEY,f),lowerOpen:!0,upper:rt(u.upper,u.upperOpen?a.MIN_KEY:a.MAX_KEY,f),upperOpen:!0})}}:c;var u,f}return{...t,schema:{...n,primaryKey:l,indexes:r,getIndexByKeyPath:function(c){const p=s[He(c)];return p&&p[0]}},count:c=>t.count(o(c)),query:c=>t.query(o(c)),openCursor(c){const{keyTail:p,isVirtual:u,keyLength:f}=c.query.index;return u?t.openCursor(o(c)).then(v=>v&&function(b){return Object.create(b,{continue:{value:function(g){g!=null?b.continue(rt(g,c.reverse?a.MAX_KEY:a.MIN_KEY,p)):c.unique?b.continue(b.key.slice(0,f).concat(c.reverse?a.MIN_KEY:a.MAX_KEY,p)):b.continue()}},continuePrimaryKey:{value(g,h){b.continuePrimaryKey(rt(g,a.MAX_KEY,p),h)}},primaryKey:{get:()=>b.primaryKey},key:{get(){const g=b.key;return f===1?g[0]:g.slice(0,f)}},value:{get:()=>b.value}})}(v)):t.openCursor(c)}}}}}};function fa(a,e,t,n){return t=t||{},n=n||"",O(a).forEach(s=>{if(G(e,s)){var r=a[s],i=e[s];if(typeof r=="object"&&typeof i=="object"&&r&&i){const l=Tt(r);l!==Tt(i)?t[n+s]=e[s]:l==="Object"?fa(r,i,t,n+s+"."):r!==i&&(t[n+s]=e[s])}else r!==i&&(t[n+s]=e[s])}else t[n+s]=void 0}),O(e).forEach(s=>{G(a,s)||(t[n+s]=e[s])}),t}const Ms={stack:"dbcore",name:"HooksMiddleware",level:2,create:a=>({...a,table(e){const t=a.table(e),{primaryKey:n}=t.schema;return{...t,mutate(r){const i=I.trans,{deleting:l,creating:o,updating:d}=i.table(e).hook;switch(r.type){case"add":if(o.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"put":if(o.fire===S&&d.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"delete":if(l.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"deleteRange":if(l.fire===S)break;return i._promise("readwrite",()=>function(u){return p(u.trans,u.range,1e4)}(r),!0)}return t.mutate(r);function c(u){const f=I.trans,v=u.keys||function(b,y){return y.type==="delete"?y.keys:y.keys||y.values.map(b.extractKey)}(n,u);if(!v)throw new Error("Keys missing");return(u=u.type==="add"||u.type==="put"?{...u,keys:v}:{...u}).type!=="delete"&&(u.values=[...u.values]),u.keys&&(u.keys=[...u.keys]),function(b,y,g){return y.type==="add"?Promise.resolve([]):b.getMany({trans:y.trans,keys:g,cache:"immutable"})}(t,u,v).then(b=>{const y=v.map((g,h)=>{const w=b[h],_={onerror:null,onsuccess:null};if(u.type==="delete")l.fire.call(_,g,w,f);else if(u.type==="add"||w===void 0){const C=o.fire.call(_,g,u.values[h],f);g==null&&C!=null&&(g=C,u.keys[h]=g,n.outbound||W(u.values[h],n.keyPath,g))}else{const C=fa(w,u.values[h]),k=d.fire.call(_,C,g,w,f);if(k){const x=u.values[h];Object.keys(k).forEach(B=>{G(x,B)?x[B]=k[B]:W(x,B,k[B])})}}return _});return t.mutate(u).then(({failures:g,results:h,numFailures:w,lastResult:_})=>{for(let C=0;C<v.length;++C){const k=h?h[C]:v[C],x=y[C];k==null?x.onerror&&x.onerror(g[C]):x.onsuccess&&x.onsuccess(u.type==="put"&&b[C]?u.values[C]:k)}return{failures:g,results:h,numFailures:w,lastResult:_}}).catch(g=>(y.forEach(h=>h.onerror&&h.onerror(g)),Promise.reject(g)))})}function p(u,f,v){return t.query({trans:u,values:!1,query:{index:n,range:f},limit:v}).then(({result:b})=>c({type:"delete",keys:b,trans:u}).then(y=>y.numFailures>0?Promise.reject(y.failures[0]):b.length<v?{failures:[],numFailures:0,lastResult:void 0}:p(u,{...f,lower:b[b.length-1],lowerOpen:!0},v)))}}}}})};function dn(a,e,t){try{if(!e||e.keys.length<a.length)return null;const n=[];for(let s=0,r=0;s<e.keys.length&&r<a.length;++s)z(e.keys[s],a[r])===0&&(n.push(t?Ye(e.values[s]):e.values[s]),++r);return n.length===a.length?n:null}catch{return null}}const Ns={stack:"dbcore",level:-1,create:a=>({table:e=>{const t=a.table(e);return{...t,getMany:n=>{if(!n.cache)return t.getMany(n);const s=dn(n.keys,n.trans._cache,n.cache==="clone");return s?L.resolve(s):t.getMany(n).then(r=>(n.trans._cache={keys:n.keys,values:n.cache==="clone"?Ye(r):r},r))},mutate:n=>(n.type!=="add"&&(n.trans._cache=null),t.mutate(n))}}})};function ga(a){return!("from"in a)}const Z=function(a,e){if(!this){const t=new Z;return a&&"d"in a&&q(t,a),t}q(this,arguments.length?{d:1,from:a,to:arguments.length>1?e:a}:{d:0})};function Je(a,e,t){const n=z(e,t);if(isNaN(n))return;if(n>0)throw RangeError();if(ga(a))return q(a,{from:e,to:t,d:1});const s=a.l,r=a.r;if(z(t,a.from)<0)return s?Je(s,e,t):a.l={from:e,to:t,d:1,l:null,r:null},Sa(a);if(z(e,a.to)>0)return r?Je(r,e,t):a.r={from:e,to:t,d:1,l:null,r:null},Sa(a);z(e,a.from)<0&&(a.from=e,a.l=null,a.d=r?r.d+1:1),z(t,a.to)>0&&(a.to=t,a.r=null,a.d=a.l?a.l.d+1:1);const i=!a.r;s&&!a.l&&Et(a,s),r&&i&&Et(a,r)}function Et(a,e){ga(e)||function t(n,{from:s,to:r,l:i,r:l}){Je(n,s,r),i&&t(n,i),l&&t(n,l)}(a,e)}function js(a,e){const t=na(e);let n=t.next();if(n.done)return!1;let s=n.value;const r=na(a);let i=r.next(s.from),l=i.value;for(;!n.done&&!i.done;){if(z(l.from,s.to)<=0&&z(l.to,s.from)>=0)return!0;z(s.from,l.from)<0?s=(n=t.next(l.from)).value:l=(i=r.next(s.from)).value}return!1}function na(a){let e=ga(a)?null:{s:0,n:a};return{next(t){const n=arguments.length>0;for(;e;)switch(e.s){case 0:if(e.s=1,n)for(;e.n.l&&z(t,e.n.from)<0;)e={up:e,n:e.n.l,s:1};else for(;e.n.l;)e={up:e,n:e.n.l,s:1};case 1:if(e.s=2,!n||z(t,e.n.to)<=0)return{value:e.n,done:!1};case 2:if(e.n.r){e.s=3,e={up:e,n:e.n.r,s:0};continue}case 3:e=e.up}return{done:!0}}}}function Sa(a){var e,t;const n=(((e=a.r)===null||e===void 0?void 0:e.d)||0)-(((t=a.l)===null||t===void 0?void 0:t.d)||0),s=n>1?"r":n<-1?"l":"";if(s){const r=s==="r"?"l":"r",i={...a},l=a[s];a.from=l.from,a.to=l.to,a[s]=l[s],i[s]=l[r],a[r]=i,i.d=Ra(i)}a.d=Ra(a)}function Ra({r:a,l:e}){return(a?e?Math.max(a.d,e.d):a.d:e?e.d:0)+1}Pe(Z.prototype,{add(a){return Et(this,a),this},addKey(a){return Je(this,a,a),this},addKeys(a){return a.forEach(e=>Je(this,e,e)),this},[Ot](){return na(this)}});const Ks={stack:"dbcore",level:0,create:a=>{const e=a.schema.name,t=new Z(a.MIN_KEY,a.MAX_KEY);return{...a,table:n=>{const s=a.table(n),{schema:r}=s,{primaryKey:i}=r,{extractKey:l,outbound:o}=i,d={...s,mutate:u=>{const f=u.trans,v=f.mutatedParts||(f.mutatedParts={}),b=k=>{const x=`idb://${e}/${n}/${k}`;return v[x]||(v[x]=new Z)},y=b(""),g=b(":dels"),{type:h}=u;let[w,_]=u.type==="deleteRange"?[u.range]:u.type==="delete"?[u.keys]:u.values.length<50?[[],u.values]:[];const C=u.trans._cache;return s.mutate(u).then(k=>{if(H(w)){h!=="delete"&&(w=k.results),y.addKeys(w);const x=dn(w,C);x||h==="add"||g.addKeys(w),(x||_)&&function(B,E,F,P){function V(j){const T=B(j.name||"");function we(U){return U!=null?j.extractKey(U):null}const Ee=U=>j.multiEntry&&H(U)?U.forEach(pe=>T.addKey(pe)):T.addKey(U);(F||P).forEach((U,pe)=>{const De=F&&we(F[pe]),Ct=P&&we(P[pe]);z(De,Ct)!==0&&(De!=null&&Ee(De),Ct!=null&&Ee(Ct))})}E.indexes.forEach(V)}(b,r,x,_)}else if(w){const x={from:w.lower,to:w.upper};g.add(x),y.add(x)}else y.add(t),g.add(t),r.indexes.forEach(x=>b(x.name).add(t));return k})}},c=({query:{index:u,range:f}})=>{var v,b;return[u,new Z((v=f.lower)!==null&&v!==void 0?v:a.MIN_KEY,(b=f.upper)!==null&&b!==void 0?b:a.MAX_KEY)]},p={get:u=>[i,new Z(u.key)],getMany:u=>[i,new Z().addKeys(u.keys)],count:c,query:c,openCursor:c};return O(p).forEach(u=>{d[u]=function(f){const{subscr:v}=I;if(v){const b=_=>{const C=`idb://${e}/${n}/${_}`;return v[C]||(v[C]=new Z)},y=b(""),g=b(":dels"),[h,w]=p[u](f);if(b(h.name||"").add(w),!h.isPrimaryKey){if(u!=="count"){const _=u==="query"&&o&&f.values&&s.query({...f,values:!1});return s[u].apply(this,arguments).then(C=>{if(u==="query"){if(o&&f.values)return _.then(({result:x})=>(y.addKeys(x),C));const k=f.values?C.result.map(l):C.result;f.values?y.addKeys(k):g.addKeys(k)}else if(u==="openCursor"){const k=C,x=f.values;return k&&Object.create(k,{key:{get:()=>(g.addKey(k.primaryKey),k.key)},primaryKey:{get(){const B=k.primaryKey;return g.addKey(B),B}},value:{get:()=>(x&&y.addKey(k.primaryKey),k.value)}})}return C})}g.add(t)}}return s[u].apply(this,arguments)}}),d}}}};class be{constructor(e,t){this._middlewares={},this.verno=0;const n=be.dependencies;this._options=t={addons:be.addons,autoOpen:!0,indexedDB:n.indexedDB,IDBKeyRange:n.IDBKeyRange,...t},this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange};const{addons:s}=t;this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this;const r={dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:S,dbReadyPromise:null,cancelOpen:S,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3};var i;r.dbReadyPromise=new L(l=>{r.dbReadyResolve=l}),r.openCanceller=new L((l,o)=>{r.cancelOpen=o}),this._state=r,this.name=e,this.on=Ke(this,"populate","blocked","versionchange","close",{ready:[ca,S]}),this.on.ready.subscribe=Ta(this.on.ready.subscribe,l=>(o,d)=>{be.vip(()=>{const c=this._state;if(c.openComplete)c.dbOpenError||L.resolve().then(o),d&&l(o);else if(c.onReadyBeingFired)c.onReadyBeingFired.push(o),d&&l(o);else{l(o);const p=this;d||l(function u(){p.on.ready.unsubscribe(o),p.on.ready.unsubscribe(u)})}})}),this.Collection=(i=this,Fe(ks.prototype,function(l,o){this.db=i;let d=an,c=null;if(o)try{d=o()}catch(v){c=v}const p=l._ctx,u=p.table,f=u.hook.reading.fire;this._ctx={table:u,index:p.index,isPrimKey:!p.index||u.schema.primKey.keyPath&&p.index===u.schema.primKey.name,range:d,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:c,or:p.or,valueMapper:f!==qe?f:null}})),this.Table=function(l){return Fe(Es.prototype,function(o,d,c){this.db=l,this._tx=c,this.name=o,this.schema=d,this.hook=l._allTables[o]?l._allTables[o].hook:Ke(null,{creating:[ds,S],reading:[cs,qe],updating:[ps,S],deleting:[us,S]})})}(this),this.Transaction=function(l){return Fe(Is.prototype,function(o,d,c,p,u){this.db=l,this.mode=o,this.storeNames=d,this.schema=c,this.chromeTransactionDurability=p,this.idbtrans=null,this.on=Ke(this,"complete","error","abort"),this.parent=u||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new L((f,v)=>{this._resolve=f,this._reject=v}),this._completion.then(()=>{this.active=!1,this.on.complete.fire()},f=>{var v=this.active;return this.active=!1,this.on.error.fire(f),this.parent?this.parent._reject(f):v&&this.idbtrans&&this.idbtrans.abort(),M(f)})})}(this),this.Version=function(l){return Fe(Rs.prototype,function(o){this.db=l,this._cfg={version:o,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})}(this),this.WhereClause=function(l){return Fe(sn.prototype,function(o,d,c){this.db=l,this._ctx={table:o,index:d===":id"?null:d,or:c};const p=l._deps.indexedDB;if(!p)throw new A.MissingAPI;this._cmp=this._ascending=p.cmp.bind(p),this._descending=(u,f)=>p.cmp(f,u),this._max=(u,f)=>p.cmp(u,f)>0?u:f,this._min=(u,f)=>p.cmp(u,f)<0?u:f,this._IDBKeyRange=l._deps.IDBKeyRange})}(this),this.on("versionchange",l=>{l.newVersion>0?console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`):console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`),this.close()}),this.on("blocked",l=>{!l.newVersion||l.newVersion<l.oldVersion?console.warn(`Dexie.delete('${this.name}') was blocked`):console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${l.oldVersion/10}`)}),this._maxKey=We(t.IDBKeyRange),this._createTransaction=(l,o,d,c)=>new this.Transaction(l,o,d,this._options.chromeTransactionDurability,c),this._fireOnBlocked=l=>{this.on("blocked").fire(l),je.filter(o=>o.name===this.name&&o!==this&&!o._state.vcFired).map(o=>o.on("versionchange").fire(l))},this.use(Os),this.use(Ms),this.use(Ks),this.use(Ns),this.vip=Object.create(this,{_vip:{value:!0}}),s.forEach(l=>l(this))}version(e){if(isNaN(e)||e<.1)throw new A.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new A.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);const t=this._versions;var n=t.filter(s=>s._cfg.version===e)[0];return n||(n=new this.Version(e),t.push(n),t.sort(Ps),n.stores({}),this._state.autoSchema=!1,n)}_whenReady(e){return this.idbdb&&(this._state.openComplete||I.letThrough||this._vip)?e():new L((t,n)=>{if(this._state.openComplete)return n(new A.DatabaseClosed(this._state.dbOpenError));if(!this._state.isBeingOpened){if(!this._options.autoOpen)return void n(new A.DatabaseClosed);this.open().catch(S)}this._state.dbReadyPromise.then(t,n)}).then(e)}use({stack:e,create:t,level:n,name:s}){s&&this.unuse({stack:e,name:s});const r=this._middlewares[e]||(this._middlewares[e]=[]);return r.push({stack:e,create:t,level:n??10,name:s}),r.sort((i,l)=>i.level-l.level),this}unuse({stack:e,name:t,create:n}){return e&&this._middlewares[e]&&(this._middlewares[e]=this._middlewares[e].filter(s=>n?s.create!==n:!!t&&s.name!==t)),this}open(){return Fs(this)}_close(){const e=this._state,t=je.indexOf(this);if(t>=0&&je.splice(t,1),this.idbdb){try{this.idbdb.close()}catch{}this._novip.idbdb=null}e.dbReadyPromise=new L(n=>{e.dbReadyResolve=n}),e.openCanceller=new L((n,s)=>{e.cancelOpen=s})}close(){this._close();const e=this._state;this._options.autoOpen=!1,e.dbOpenError=new A.DatabaseClosed,e.isBeingOpened&&e.cancelOpen(e.dbOpenError)}delete(){const e=arguments.length>0,t=this._state;return new L((n,s)=>{const r=()=>{this.close();var i=this._deps.indexedDB.deleteDatabase(this.name);i.onsuccess=D(()=>{(function({indexedDB:l,IDBKeyRange:o},d){!ma(l)&&d!==_t&&ha(l,o).delete(d).catch(S)})(this._deps,this.name),n()}),i.onerror=J(s),i.onblocked=this._fireOnBlocked};if(e)throw new A.InvalidArgument("Arguments not allowed in db.delete()");t.isBeingOpened?t.dbReadyPromise.then(r):r()})}backendDB(){return this.idbdb}isOpen(){return this.idbdb!==null}hasBeenClosed(){const e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"}hasFailed(){return this._state.dbOpenError!==null}dynamicallyOpened(){return this._state.autoSchema}get tables(){return O(this._allTables).map(e=>this._allTables[e])}transaction(){const e=Ts.apply(this,arguments);return this._transaction.apply(this,e)}_transaction(e,t,n){let s=I.trans;s&&s.db===this&&e.indexOf("!")===-1||(s=null);const r=e.indexOf("?")!==-1;let i,l;e=e.replace("!","").replace("?","");try{if(l=t.map(d=>{var c=d instanceof this.Table?d.name:d;if(typeof c!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return c}),e=="r"||e===At)i=At;else{if(e!="rw"&&e!=Bt)throw new A.InvalidArgument("Invalid transaction mode: "+e);i=Bt}if(s){if(s.mode===At&&i===Bt){if(!r)throw new A.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");s=null}s&&l.forEach(d=>{if(s&&s.storeNames.indexOf(d)===-1){if(!r)throw new A.SubTransaction("Table "+d+" not included in parent transaction.");s=null}}),r&&s&&!s.active&&(s=null)}}catch(d){return s?s._promise(null,(c,p)=>{p(d)}):M(d)}const o=cn.bind(null,this,i,l,s,n);return s?s._promise(i,o,"lock"):I.trans?Re(I.transless,()=>this._whenReady(o)):this._whenReady(o)}table(e){if(!G(this._allTables,e))throw new A.InvalidTable(`Table ${e} does not exist`);return this._allTables[e]}}const Hs=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable";class Vs{constructor(e){this._subscribe=e}subscribe(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})}[Hs](){return this}}function un(a,e){return O(e).forEach(t=>{Et(a[t]||(a[t]=new Z),e[t])}),a}function zs(a){let e,t=!1;const n=new Vs(s=>{const r=ia(a);let i=!1,l={},o={};const d={get closed(){return i},unsubscribe:()=>{i=!0,ue.storagemutated.unsubscribe(f)}};s.start&&s.start(d);let c=!1,p=!1;function u(){return O(o).some(b=>l[b]&&js(l[b],o[b]))}const f=b=>{un(l,b),u()&&v()},v=()=>{if(c||i)return;l={};const b={},y=function(g){r&&Se();const h=()=>ce(a,{subscr:g,trans:null}),w=I.trans?Re(I.transless,h):h();return r&&w.then(se,se),w}(b);p||(ue(Ge,f),p=!0),c=!0,Promise.resolve(y).then(g=>{t=!0,e=g,c=!1,i||(u()?v():(l={},o=b,s.next&&s.next(g)))},g=>{c=!1,t=!1,s.error&&s.error(g),d.unsubscribe()})};return v(),d});return n.hasValue=()=>t,n.getValue=()=>e,n}let sa;try{sa={indexedDB:R.indexedDB||R.mozIndexedDB||R.webkitIndexedDB||R.msIndexedDB,IDBKeyRange:R.IDBKeyRange||R.webkitIDBKeyRange}}catch{sa={indexedDB:null,IDBKeyRange:null}}const he=be;function ht(a){let e=te;try{te=!0,ue.storagemutated.fire(a)}finally{te=e}}Pe(he,{...ot,delete:a=>new he(a,{addons:[]}).delete(),exists:a=>new he(a,{addons:[]}).open().then(e=>(e.close(),!0)).catch("NoSuchDatabaseError",()=>!1),getDatabaseNames(a){try{return function({indexedDB:e,IDBKeyRange:t}){return ma(e)?Promise.resolve(e.databases()).then(n=>n.map(s=>s.name).filter(s=>s!==_t)):ha(e,t).toCollection().primaryKeys()}(he.dependencies).then(a)}catch{return M(new A.MissingAPI)}},defineClass:()=>function(a){q(this,a)},ignoreTransaction:a=>I.trans?Re(I.transless,a):a(),vip:ta,async:function(a){return function(){try{var e=aa(a.apply(this,arguments));return e&&typeof e.then=="function"?e:L.resolve(e)}catch(t){return M(t)}}},spawn:function(a,e,t){try{var n=aa(a.apply(t,e||[]));return n&&typeof n.then=="function"?n:L.resolve(n)}catch(s){return M(s)}},currentTransaction:{get:()=>I.trans||null},waitFor:function(a,e){const t=L.resolve(typeof a=="function"?he.ignoreTransaction(a):a).timeout(e||6e4);return I.trans?I.trans.waitFor(t):t},Promise:L,debug:{get:()=>Y,set:a=>{Ha(a,a==="dexie"?()=>!0:tn)}},derive:Ie,extend:q,props:Pe,override:Ta,Events:Ke,on:ue,liveQuery:zs,extendObservabilitySet:un,getByKeyPath:ne,setByKeyPath:W,delByKeyPath:function(a,e){typeof e=="string"?W(a,e,void 0):"length"in e&&[].map.call(e,function(t){W(a,t,void 0)})},shallowClone:Na,deepClone:Ye,getObjectDiff:fa,cmp:z,asap:Oa,minKey:Gt,addons:[],connections:je,errnames:la,dependencies:sa,semVer:La,version:La.split(".").map(a=>parseInt(a)).reduce((a,e,t)=>a+e/Math.pow(10,2*t))}),he.maxKey=We(he.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(ue(Ge,a=>{if(!te){let e;kt?(e=document.createEvent("CustomEvent"),e.initCustomEvent(le,!0,!0,a)):e=new CustomEvent(le,{detail:a}),te=!0,dispatchEvent(e),te=!1}}),addEventListener(le,({detail:a})=>{te||ht(a)}));let te=!1;if(typeof BroadcastChannel<"u"){const a=new BroadcastChannel(le);typeof a.unref=="function"&&a.unref(),ue(Ge,e=>{te||a.postMessage(e)}),a.onmessage=e=>{e.data&&ht(e.data)}}else if(typeof self<"u"&&typeof navigator<"u"){ue(Ge,e=>{try{te||(typeof localStorage<"u"&&localStorage.setItem(le,JSON.stringify({trig:Math.random(),changedParts:e})),typeof self.clients=="object"&&[...self.clients.matchAll({includeUncontrolled:!0})].forEach(t=>t.postMessage({type:le,changedParts:e})))}catch{}}),typeof addEventListener<"u"&&addEventListener("storage",e=>{if(e.key===le){const t=JSON.parse(e.newValue);t&&ht(t.changedParts)}});const a=self.document&&navigator.serviceWorker;a&&a.addEventListener("message",function({data:e}){e&&e.type===le&&ht(e.changedParts)})}L.rejectionMapper=function(a,e){if(!a||a instanceof Ae||a instanceof TypeError||a instanceof SyntaxError||!a.name||!wa[a.name])return a;var t=new wa[a.name](e||a.message,a);return"stack"in a&&ae(t,"stack",{get:function(){return this.inner.stack}}),t},Ha(Y,tn);class qs extends be{constructor(){super("VetCalcDB");m(this,"users");this.version(2).stores({users:"++id, email, isPremium"})}}const it=new qs;class Us{constructor(){m(this,"currentUser",null);const e=localStorage.getItem("vetcalc_current_user");if(e)try{const t=JSON.parse(e);this.currentUser=t,Ce.setStatus(t.isPremium)}catch{}}async register(e,t,n){if(await it.users.where("email").equals(e).first())return{success:!1,message:"El email ya está registrado"};const r={email:e,password:t,isPremium:!1,name:n,createdAt:new Date};return await it.users.add(r),{success:!0,message:"Registro exitoso"}}async login(e,t){const n=await it.users.where("email").equals(e).first();return!n||n.password!==t?{success:!1,message:"Credenciales incorrectas"}:(this.currentUser=n,localStorage.setItem("vetcalc_current_user",JSON.stringify(n)),Ce.setStatus(n.isPremium),{success:!0,message:"Login exitoso"})}logout(){this.currentUser=null,localStorage.removeItem("vetcalc_current_user"),Ce.setStatus(!1)}isLoggedIn(){return this.currentUser!==null}getCurrentUser(){return this.currentUser}async upgradeToPremium(){!this.currentUser||!this.currentUser.id||(this.currentUser.isPremium=!0,await it.users.update(this.currentUser.id,{isPremium:!0}),localStorage.setItem("vetcalc_current_user",JSON.stringify(this.currentUser)),Ce.setStatus(!0))}}const Lt=new Us;class $s extends re{constructor(){super();m(this,"view");this.view=new Xn}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onLoginClick(async()=>{const t=this.view.getEmail(),n=this.view.getPassword(),s=await Lt.login(t,n);s.success?await N.navigate("home"):this.view.showError(s.message)}),this.view.onRegisterLinkClick(async()=>{await N.navigate("register")})}destroy(){console.log("[LoginController] Destroyed")}}const Gs=`
<!-- ===== FONTO IGUAL AL SPLASH ===== -->
<div class="fixed inset-0 pointer-events-none z-0">
  <!-- Fondo base neutral -->
  <div class="w-full h-full bg-neutral"></div>
  <!-- Patrón de huellas (vet-pattern) -->
  <div class="absolute inset-0 vet-pattern opacity-30"></div>
  <!-- Imágenes decorativas -->
  <img src="/icons/Animales/a15.png" alt="" class="absolute -left-6 -top-10 w-28 md:w-52 opacity-20 select-none" />
  <img src="/icons/Animales/a2.png" alt="" class="absolute -right-6 -bottom-10 w-24 md:w-48 opacity-20 select-none" />
  <img src="/icons/Animales/a3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
</div>

<!-- ===== CONTENIDO DEL REGISTRO ===== -->
<div class="relative z-10 min-h-screen flex items-center justify-center px-container-padding animate-fade-in-up">
  <div class="w-full max-w-md space-y-8">

    <!-- Logo y título -->
    <div class="text-center">
      <div class="inline-block p-4 bg-secondary/20 rounded-full shadow-lg mb-4">
        <span class="material-symbols-outlined text-6xl text-primary" style="font-variation-settings: 'FILL' 1;">pets</span>
      </div>
      <h2 class="font-headline-xl text-headline-xl text-on-surface drop-shadow-sm">Crear cuenta</h2>
      <p class="text-on-surface-variant font-body-md">Regístrate para comenzar</p>
    </div>

    <!-- Tarjeta de registro (con transparencia mínima y efecto vidrio) -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant shadow-xl p-6 space-y-6">
      <div class="space-y-4">
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Nombre</label>
          <input 
            type="text" 
            id="reg-name" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="Dr. Juan Pérez"
          />
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Email</label>
          <input 
            type="email" 
            id="reg-email" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="veterinario@ejemplo.com"
          />
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Contraseña</label>
          <input 
            type="password" 
            id="reg-password" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="••••••"
          />
        </div>
        <div>
          <label class="font-label-md text-label-md text-on-surface-variant">Confirmar contraseña</label>
          <input 
            type="password" 
            id="reg-confirm" 
            class="w-full h-touch-target-min px-4 rounded-lg border border-outline-variant bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200" 
            placeholder="••••••"
          />
        </div>
        <button 
          id="register-btn" 
          class="w-full bg-primary text-white h-touch-target-min rounded-xl font-headline-md text-headline-md font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
        >
          Registrarse
        </button>
      </div>

      <!-- Enlace a login -->
      <div class="text-center">
        <button 
          id="go-to-login" 
          class="text-primary font-label-md text-label-md hover:underline transition-all hover:scale-105"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>

  </div>
</div>
`;class Ws{constructor(){m(this,"nameInput",null);m(this,"emailInput",null);m(this,"passwordInput",null);m(this,"confirmInput",null);m(this,"registerBtn",null);m(this,"loginLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Gs),this.cacheElements()}cacheElements(){this.nameInput=document.getElementById("reg-name"),this.emailInput=document.getElementById("reg-email"),this.passwordInput=document.getElementById("reg-password"),this.confirmInput=document.getElementById("reg-confirm"),this.registerBtn=document.getElementById("register-btn"),this.loginLink=document.getElementById("go-to-login")}getName(){var e;return((e=this.nameInput)==null?void 0:e.value)||""}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}getConfirm(){var e;return((e=this.confirmInput)==null?void 0:e.value)||""}onRegisterClick(e){var t;(t=this.registerBtn)==null||t.addEventListener("click",e)}onLoginLinkClick(e){var t;(t=this.loginLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}class Js extends re{constructor(){super();m(this,"view");this.view=new Ws}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onRegisterClick(async()=>{const t=this.view.getName(),n=this.view.getEmail(),s=this.view.getPassword(),r=this.view.getConfirm();if(!t||!n||!s){this.view.showError("Todos los campos son obligatorios");return}if(s!==r){this.view.showError("Las contraseñas no coinciden");return}const i=await Lt.register(n,s,t);i.success?(alert("Registro exitoso. Ahora inicia sesión."),await N.navigate("login")):this.view.showError(i.message)}),this.view.onLoginLinkClick(async()=>{await N.navigate("login")})}destroy(){console.log("[RegisterController] Destroyed")}}let Ve=null;function pn(){Ve&&(Ve.destroy(),Ve=null)}function Da(a,e){N.register(a,async()=>{pn();const t=e();Ve=t,await t.init()})}function X(a,e){N.register(a,async()=>{if(!Lt.isLoggedIn()){await N.navigate("login");return}pn();const t=e();Ve=t,await t.init()})}class Ys{async init(){if(N.register("splash",async()=>{await new vn().init()}),Da("login",()=>new $s),Da("register",()=>new Js),X("home",()=>new Cn),X("patients",()=>new Gn),X("library",()=>new qn),X("history",()=>new Hn),X("fluidotherapy",()=>new Nn),X("dosage",()=>new Tn),X("converter",()=>new Bn),X("anesthesia",()=>new Rn),X("premium",()=>new Yn),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("[SW] OK",t)).catch(t=>console.log("[SW] ERROR",t))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await N.navigate("splash");else{let t=N.resolveInitialRoute();!Lt.isLoggedIn()&&t!=="splash"&&t!=="login"&&t!=="register"&&(t="login"),await N.navigate(t)}}}new Ys().init();
