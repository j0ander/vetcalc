var ma=Object.defineProperty;var ha=(n,e,t)=>e in n?ma(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var m=(n,e,t)=>ha(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class fa{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(a){console.error(`[Router] Error in ${e}:`,a),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const K=new fa,ga=`
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
`;class ba{constructor(){m(this,"progressBar",null);m(this,"messageElement",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=ga),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const bn=2800,vn=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],yn=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class va{constructor(){m(this,"view");m(this,"progress",0);m(this,"messageIndex",0);m(this,"intervalId",null);this.view=new ba}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const a=Date.now()-t;this.progress=Math.min(100,a/bn*100),this.view.updateProgress(this.progress),Math.floor(a/700)>this.messageIndex&&this.messageIndex<vn.length-1&&(this.messageIndex++,this.view.updateMessage(vn[this.messageIndex])),a>=bn&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await K.navigate("home")}}const ya=`
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
  <img src="/icons/Animales/gato3.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-96 opacity-15 select-none" />
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
         style="background-image: url('/icons/Animales/gato5.png'); background-size: cover; background-position: top;">
    <div class="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70 mix-blend-multiply"></div>
    <div class="absolute inset-0 flex flex-col justify-center px-6 text-white">
      <h2 id="greeting" class="font-headline-lg text-headline-lg md:text-headline-xl drop-shadow-md">Bienvenido, Dr. Smith</h2>
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
  <section class="w-full rounded-2xl overflow-hidden relative group shadow-elevated animate-fade-in-up min-h-[180px]" style="animation-delay: 450ms; background-image: url('/icons/Animales/gato3.png'); background-size: cover; background-position: center;">
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
  </a>

  <!-- Historial -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>

</nav>
`;class xa{constructor(){m(this,"recentHistoryContainer",null);m(this,"recentPatientsContainer",null);m(this,"tipElement",null);m(this,"recentPatientsSection",null);m(this,"greetingElement",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=ya),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section"),this.greetingElement=document.getElementById("greeting")}getGreetingElement(){return this.greetingElement}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const wa=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],Ea=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],Ia={activeCases:24,inSurgery:3,todayCalculations:7};class ka{getRecentPatients(e=4){return wa.slice(0,e)}getRecentHistory(e=5){return Ea.slice(0,e)}getDashboardStats(){return{...Ia}}}const xn=new ka;class La{constructor(){m(this,"isPremium",!1);m(this,"listeners",[]);const e=localStorage.getItem("vetcalc-premium");this.isPremium=e==="true"}getStatus(){return this.isPremium}setStatus(e){this.isPremium=e,localStorage.setItem("vetcalc-premium",String(e)),this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{const t=this.listeners.indexOf(e);t!==-1&&this.listeners.splice(t,1)}}notifyListeners(){this.listeners.forEach(e=>e(this.isPremium))}}const _e=new La;function wn(n){document.querySelectorAll(".premium-badge").forEach(t=>{n?(t.classList.remove("bg-surface-container-high","text-on-surface-variant","border-outline-variant"),t.classList.add("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary")):(t.classList.remove("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary"),t.classList.add("bg-surface-container-high","text-on-surface-variant","border-outline-variant"))})}class X{constructor(){m(this,"premiumUnsubscribe",null)}setupGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{if(e._navListener)return;const t=async a=>{a.preventDefault();const s=e.getAttribute("data-route");s&&await K.navigate(s)};e.addEventListener("click",t),e._navListener=t})}initPremiumBadge(){const e=_e.getStatus();wn(e),this.premiumUnsubscribe=_e.subscribe(t=>{wn(t)})}destroyPremiumBadge(){this.premiumUnsubscribe&&(this.premiumUnsubscribe(),this.premiumUnsubscribe=null)}destroyGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e._navListener&&(e.removeEventListener("click",e._navListener),delete e._navListener)})}}const D=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,T=Object.keys,H=Array.isArray;function q(n,e){return typeof e!="object"||T(e).forEach(function(t){n[t]=e[t]}),n}typeof Promise>"u"||D.Promise||(D.Promise=Promise);const qe=Object.getPrototypeOf,Ca={}.hasOwnProperty;function G(n,e){return Ca.call(n,e)}function Se(n,e){typeof e=="function"&&(e=e(qe(n))),(typeof Reflect>"u"?T:Reflect.ownKeys)(e).forEach(t=>{se(n,t,e[t])})}const Mn=Object.defineProperty;function se(n,e,t,a){Mn(n,e,q(t&&G(t,"get")&&typeof t.get=="function"?{get:t.get,set:t.set,configurable:!0}:{value:t,configurable:!0,writable:!0},a))}function Ae(n){return{from:function(e){return n.prototype=Object.create(e.prototype),se(n.prototype,"constructor",n),{extend:Se.bind(null,n.prototype)}}}}const _a=Object.getOwnPropertyDescriptor;function sn(n,e){let t;return _a(n,e)||(t=qe(n))&&sn(t,e)}const Aa=[].slice;function ft(n,e,t){return Aa.call(n,e,t)}function Tn(n,e){return e(n)}function Te(n){if(!n)throw new Error("Assertion Failed")}function On(n){D.setImmediate?setImmediate(n):setTimeout(n,0)}function Nn(n,e){return n.reduce((t,a,s)=>{var r=e(a,s);return r&&(t[r[0]]=r[1]),t},{})}function re(n,e){if(typeof e=="string"&&G(n,e))return n[e];if(!e)return n;if(typeof e!="string"){for(var t=[],a=0,s=e.length;a<s;++a){var r=re(n,e[a]);t.push(r)}return t}var i=e.indexOf(".");if(i!==-1){var o=n[e.substr(0,i)];return o==null?void 0:re(o,e.substr(i+1))}}function J(n,e,t){if(n&&e!==void 0&&(!("isFrozen"in Object)||!Object.isFrozen(n)))if(typeof e!="string"&&"length"in e){Te(typeof t!="string"&&"length"in t);for(var a=0,s=e.length;a<s;++a)J(n,e[a],t[a])}else{var r=e.indexOf(".");if(r!==-1){var i=e.substr(0,r),o=e.substr(r+1);if(o==="")t===void 0?H(n)&&!isNaN(parseInt(i))?n.splice(i,1):delete n[i]:n[i]=t;else{var l=n[i];l&&G(n,i)||(l=n[i]={}),J(l,o,t)}}else t===void 0?H(n)&&!isNaN(parseInt(e))?n.splice(e,1):delete n[e]:n[e]=t}}function jn(n){var e={};for(var t in n)G(n,t)&&(e[t]=n[t]);return e}const Ba=[].concat;function Kn(n){return Ba.apply([],n)}const Hn="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(Kn([8,16,32,64].map(n=>["Int","Uint","Float"].map(e=>e+n+"Array")))).filter(n=>D[n]),Pa=Hn.map(n=>D[n]);Nn(Hn,n=>[n,!0]);let le=null;function Xe(n){le=typeof WeakMap<"u"&&new WeakMap;const e=Rt(n);return le=null,e}function Rt(n){if(!n||typeof n!="object")return n;let e=le&&le.get(n);if(e)return e;if(H(n)){e=[],le&&le.set(n,e);for(var t=0,a=n.length;t<a;++t)e.push(Rt(n[t]))}else if(Pa.indexOf(n.constructor)>=0)e=n;else{const r=qe(n);for(var s in e=r===Object.prototype?{}:Object.create(r),le&&le.set(n,e),n)G(n,s)&&(e[s]=Rt(n[s]))}return e}const{toString:Sa}={};function Ft(n){return Sa.call(n).slice(8,-1)}const Mt=typeof Symbol<"u"?Symbol.iterator:"@@iterator",Da=typeof Mt=="symbol"?function(n){var e;return n!=null&&(e=n[Mt])&&e.apply(n)}:function(){return null},Ce={};function ne(n){var e,t,a,s;if(arguments.length===1){if(H(n))return n.slice();if(this===Ce&&typeof n=="string")return[n];if(s=Da(n)){for(t=[];!(a=s.next()).done;)t.push(a.value);return t}if(n==null)return[n];if(typeof(e=n.length)=="number"){for(t=new Array(e);e--;)t[e]=n[e];return t}return[n]}for(e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return t}const rn=typeof Symbol<"u"?n=>n[Symbol.toStringTag]==="AsyncFunction":()=>!1;var Q=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Vn(n,e){Q=n,zn=e}var zn=()=>!0;const Ra=!new Error("").stack;function we(){if(Ra)try{throw we.arguments,new Error}catch(n){return n}return new Error}function Tt(n,e){var t=n.stack;return t?(e=e||0,t.indexOf(n.name)===0&&(e+=(n.name+n.message).split(`
`).length),t.split(`
`).slice(e).filter(zn).map(a=>`
`+a).join("")):""}var qn=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],on=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(qn),Fa={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Be(n,e){this._e=we(),this.name=n,this.message=e}function Un(n,e){return n+". Errors: "+Object.keys(e).map(t=>e[t].toString()).filter((t,a,s)=>s.indexOf(t)===a).join(`
`)}function gt(n,e,t,a){this._e=we(),this.failures=e,this.failedKeys=a,this.successCount=t,this.message=Un(n,e)}function Ne(n,e){this._e=we(),this.name="BulkError",this.failures=Object.keys(e).map(t=>e[t]),this.failuresByPos=e,this.message=Un(n,e)}Ae(Be).from(Error).extend({stack:{get:function(){return this._stack||(this._stack=this.name+": "+this.message+Tt(this._e,2))}},toString:function(){return this.name+": "+this.message}}),Ae(gt).from(Be),Ae(Ne).from(Be);var ln=on.reduce((n,e)=>(n[e]=e+"Error",n),{});const Ma=Be;var A=on.reduce((n,e)=>{var t=e+"Error";function a(s,r){this._e=we(),this.name=t,s?typeof s=="string"?(this.message=`${s}${r?`
 `+r:""}`,this.inner=r||null):typeof s=="object"&&(this.message=`${s.name} ${s.message}`,this.inner=s):(this.message=Fa[e]||t,this.inner=null)}return Ae(a).from(Ma),n[e]=a,n},{});A.Syntax=SyntaxError,A.Type=TypeError,A.Range=RangeError;var En=qn.reduce((n,e)=>(n[e+"Error"]=A[e],n),{}),lt=on.reduce((n,e)=>(["Syntax","Type","Range"].indexOf(e)===-1&&(n[e+"Error"]=A[e]),n),{});function S(){}function Ue(n){return n}function Ta(n,e){return n==null||n===Ue?e:function(t){return e(n(t))}}function ye(n,e){return function(){n.apply(this,arguments),e.apply(this,arguments)}}function Oa(n,e){return n===S?e:function(){var t=n.apply(this,arguments);t!==void 0&&(arguments[0]=t);var a=this.onsuccess,s=this.onerror;this.onsuccess=null,this.onerror=null;var r=e.apply(this,arguments);return a&&(this.onsuccess=this.onsuccess?ye(a,this.onsuccess):a),s&&(this.onerror=this.onerror?ye(s,this.onerror):s),r!==void 0?r:t}}function Na(n,e){return n===S?e:function(){n.apply(this,arguments);var t=this.onsuccess,a=this.onerror;this.onsuccess=this.onerror=null,e.apply(this,arguments),t&&(this.onsuccess=this.onsuccess?ye(t,this.onsuccess):t),a&&(this.onerror=this.onerror?ye(a,this.onerror):a)}}function ja(n,e){return n===S?e:function(t){var a=n.apply(this,arguments);q(t,a);var s=this.onsuccess,r=this.onerror;this.onsuccess=null,this.onerror=null;var i=e.apply(this,arguments);return s&&(this.onsuccess=this.onsuccess?ye(s,this.onsuccess):s),r&&(this.onerror=this.onerror?ye(r,this.onerror):r),a===void 0?i===void 0?void 0:i:q(a,i)}}function Ka(n,e){return n===S?e:function(){return e.apply(this,arguments)!==!1&&n.apply(this,arguments)}}function cn(n,e){return n===S?e:function(){var t=n.apply(this,arguments);if(t&&typeof t.then=="function"){for(var a=this,s=arguments.length,r=new Array(s);s--;)r[s]=arguments[s];return t.then(function(){return e.apply(a,r)})}return e.apply(this,arguments)}}lt.ModifyError=gt,lt.DexieError=Be,lt.BulkError=Ne;var $e={};const $n=100,[Ot,bt,Nt]=typeof Promise>"u"?[]:(()=>{let n=Promise.resolve();if(typeof crypto>"u"||!crypto.subtle)return[n,qe(n),n];const e=crypto.subtle.digest("SHA-512",new Uint8Array([0]));return[e,qe(e),n]})(),Gn=bt&&bt.then,ct=Ot&&Ot.constructor,dn=!!Nt;var jt=!1,Ha=Nt?()=>{Nt.then(tt)}:D.setImmediate?setImmediate.bind(null,tt):D.MutationObserver?()=>{var n=document.createElement("div");new MutationObserver(()=>{tt(),n=null}).observe(n,{attributes:!0}),n.setAttribute("i","1")}:()=>{setTimeout(tt,0)},je=function(n,e){Oe.push([n,e]),vt&&(Ha(),vt=!1)},Kt=!0,vt=!0,ge=[],dt=[],Ht=null,Vt=Ue,Pe={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:Ln,pgp:!1,env:{},finalize:function(){this.unhandleds.forEach(n=>{try{Ln(n[0],n[1])}catch{}})}},_=Pe,Oe=[],be=0,ut=[];function L(n){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this.onuncatched=S,this._lib=!1;var e=this._PSD=_;if(Q&&(this._stackHolder=we(),this._prev=null,this._numPrev=0),typeof n!="function"){if(n!==$e)throw new TypeError("Not a function");return this._state=arguments[1],this._value=arguments[2],void(this._state===!1&&qt(this,this._value))}this._state=null,this._value=null,++e.ref,Jn(this,n)}const zt={get:function(){var n=_,e=yt;function t(a,s){var r=!n.global&&(n!==_||e!==yt);const i=r&&!ie();var o=new L((l,d)=>{un(this,new Wn(xt(a,n,r,i),xt(s,n,r,i),l,d,n))});return Q&&Qn(o,this),o}return t.prototype=$e,t},set:function(n){se(this,"then",n&&n.prototype===$e?zt:{get:function(){return n},set:zt.set})}};function Wn(n,e,t,a,s){this.onFulfilled=typeof n=="function"?n:null,this.onRejected=typeof e=="function"?e:null,this.resolve=t,this.reject=a,this.psd=s}function Jn(n,e){try{e(t=>{if(n._state===null){if(t===n)throw new TypeError("A promise cannot be resolved with itself.");var a=n._lib&&Qe();t&&typeof t.then=="function"?Jn(n,(s,r)=>{t instanceof L?t._then(s,r):t.then(s,r)}):(n._state=!0,n._value=t,Yn(n)),a&&Ze()}},qt.bind(null,n))}catch(t){qt(n,t)}}function qt(n,e){if(dt.push(e),n._state===null){var t=n._lib&&Qe();e=Vt(e),n._state=!1,n._value=e,Q&&e!==null&&typeof e=="object"&&!e._promise&&function(a,s,r){try{a.apply(null,r)}catch{}}(()=>{var a=sn(e,"stack");e._promise=n,se(e,"stack",{get:()=>jt?a&&(a.get?a.get.apply(e):a.value):n.stack})}),function(a){ge.some(s=>s._value===a._value)||ge.push(a)}(n),Yn(n),t&&Ze()}}function Yn(n){var e=n._listeners;n._listeners=[];for(var t=0,a=e.length;t<a;++t)un(n,e[t]);var s=n._PSD;--s.ref||s.finalize(),be===0&&(++be,je(()=>{--be==0&&pn()},[]))}function un(n,e){if(n._state!==null){var t=n._state?e.onFulfilled:e.onRejected;if(t===null)return(n._state?e.resolve:e.reject)(n._value);++e.psd.ref,++be,je(Va,[t,n,e])}else n._listeners.push(e)}function Va(n,e,t){try{Ht=e;var a,s=e._value;e._state?a=n(s):(dt.length&&(dt=[]),a=n(s),dt.indexOf(s)===-1&&function(r){for(var i=ge.length;i;)if(ge[--i]._value===r._value)return void ge.splice(i,1)}(e)),t.resolve(a)}catch(r){t.reject(r)}finally{Ht=null,--be==0&&pn(),--t.psd.ref||t.psd.finalize()}}function Xn(n,e,t){if(e.length===t)return e;var a="";if(n._state===!1){var s,r,i=n._value;i!=null?(s=i.name||"Error",r=i.message||i,a=Tt(i,0)):(s=i,r=""),e.push(s+(r?": "+r:"")+a)}return Q&&((a=Tt(n._stackHolder,2))&&e.indexOf(a)===-1&&e.push(a),n._prev&&Xn(n._prev,e,t)),e}function Qn(n,e){var t=e?e._numPrev+1:0;t<100&&(n._prev=e,n._numPrev=t)}function tt(){Qe()&&Ze()}function Qe(){var n=Kt;return Kt=!1,vt=!1,n}function Ze(){var n,e,t;do for(;Oe.length>0;)for(n=Oe,Oe=[],t=n.length,e=0;e<t;++e){var a=n[e];a[0].apply(null,a[1])}while(Oe.length>0);Kt=!0,vt=!0}function pn(){var n=ge;ge=[],n.forEach(a=>{a._PSD.onunhandled.call(null,a._value,a)});for(var e=ut.slice(0),t=e.length;t;)e[--t]()}function nt(n){return new L($e,!1,n)}function R(n,e){var t=_;return function(){var a=Qe(),s=_;try{return ue(t,!0),n.apply(this,arguments)}catch(r){e&&e(r)}finally{ue(s,!1),a&&Ze()}}}Se(L.prototype,{then:zt,_then:function(n,e){un(this,new Wn(null,null,n,e,_))},catch:function(n){if(arguments.length===1)return this.then(null,n);var e=arguments[0],t=arguments[1];return typeof e=="function"?this.then(null,a=>a instanceof e?t(a):nt(a)):this.then(null,a=>a&&a.name===e?t(a):nt(a))},finally:function(n){return this.then(e=>(n(),e),e=>(n(),nt(e)))},stack:{get:function(){if(this._stack)return this._stack;try{jt=!0;var n=Xn(this,[],20).join(`
From previous: `);return this._state!==null&&(this._stack=n),n}finally{jt=!1}}},timeout:function(n,e){return n<1/0?new L((t,a)=>{var s=setTimeout(()=>a(new A.Timeout(e)),n);this.then(t,a).finally(clearTimeout.bind(null,s))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&se(L.prototype,Symbol.toStringTag,"Dexie.Promise"),Pe.env=Zn(),Se(L,{all:function(){var n=ne.apply(null,arguments).map(at);return new L(function(e,t){n.length===0&&e([]);var a=n.length;n.forEach((s,r)=>L.resolve(s).then(i=>{n[r]=i,--a||e(n)},t))})},resolve:n=>{if(n instanceof L)return n;if(n&&typeof n.then=="function")return new L((t,a)=>{n.then(t,a)});var e=new L($e,!0,n);return Qn(e,Ht),e},reject:nt,race:function(){var n=ne.apply(null,arguments).map(at);return new L((e,t)=>{n.map(a=>L.resolve(a).then(e,t))})},PSD:{get:()=>_,set:n=>_=n},totalEchoes:{get:()=>yt},newPSD:de,usePSD:Re,scheduler:{get:()=>je,set:n=>{je=n}},rejectionMapper:{get:()=>Vt,set:n=>{Vt=n}},follow:(n,e)=>new L((t,a)=>de((s,r)=>{var i=_;i.unhandleds=[],i.onunhandled=r,i.finalize=ye(function(){(function(o){function l(){o(),ut.splice(ut.indexOf(l),1)}ut.push(l),++be,je(()=>{--be==0&&pn()},[])})(()=>{this.unhandleds.length===0?s():r(this.unhandleds[0])})},i.finalize),n()},e,t,a))}),ct&&(ct.allSettled&&se(L,"allSettled",function(){const n=ne.apply(null,arguments).map(at);return new L(e=>{n.length===0&&e([]);let t=n.length;const a=new Array(t);n.forEach((s,r)=>L.resolve(s).then(i=>a[r]={status:"fulfilled",value:i},i=>a[r]={status:"rejected",reason:i}).then(()=>--t||e(a)))})}),ct.any&&typeof AggregateError<"u"&&se(L,"any",function(){const n=ne.apply(null,arguments).map(at);return new L((e,t)=>{n.length===0&&t(new AggregateError([]));let a=n.length;const s=new Array(a);n.forEach((r,i)=>L.resolve(r).then(o=>e(o),o=>{s[i]=o,--a||t(new AggregateError(s))}))})}));const j={awaits:0,echoes:0,id:0};var za=0,pt=[],Ct=0,yt=0,qa=0;function de(n,e,t,a){var s=_,r=Object.create(s);r.parent=s,r.ref=0,r.global=!1,r.id=++qa;var i=Pe.env;r.env=dn?{Promise:L,PromiseProp:{value:L,configurable:!0,writable:!0},all:L.all,race:L.race,allSettled:L.allSettled,any:L.any,resolve:L.resolve,reject:L.reject,nthen:In(i.nthen,r),gthen:In(i.gthen,r)}:{},e&&q(r,e),++s.ref,r.finalize=function(){--this.parent.ref||this.parent.finalize()};var o=Re(r,n,t,a);return r.ref===0&&r.finalize(),o}function De(){return j.id||(j.id=++za),++j.awaits,j.echoes+=$n,j.id}function ie(){return!!j.awaits&&(--j.awaits==0&&(j.id=0),j.echoes=j.awaits*$n,!0)}function at(n){return j.echoes&&n&&n.constructor===ct?(De(),n.then(e=>(ie(),e),e=>(ie(),O(e)))):n}function Ua(n){++yt,j.echoes&&--j.echoes!=0||(j.echoes=j.id=0),pt.push(_),ue(n,!0)}function $a(){var n=pt[pt.length-1];pt.pop(),ue(n,!1)}function ue(n,e){var t=_;if((e?!j.echoes||Ct++&&n===_:!Ct||--Ct&&n===_)||ea(e?Ua.bind(null,n):$a),n!==_&&(_=n,t===Pe&&(Pe.env=Zn()),dn)){var a=Pe.env.Promise,s=n.env;bt.then=s.nthen,a.prototype.then=s.gthen,(t.global||n.global)&&(Object.defineProperty(D,"Promise",s.PromiseProp),a.all=s.all,a.race=s.race,a.resolve=s.resolve,a.reject=s.reject,s.allSettled&&(a.allSettled=s.allSettled),s.any&&(a.any=s.any))}}function Zn(){var n=D.Promise;return dn?{Promise:n,PromiseProp:Object.getOwnPropertyDescriptor(D,"Promise"),all:n.all,race:n.race,allSettled:n.allSettled,any:n.any,resolve:n.resolve,reject:n.reject,nthen:bt.then,gthen:n.prototype.then}:{}}function Re(n,e,t,a,s){var r=_;try{return ue(n,!0),e(t,a,s)}finally{ue(r,!1)}}function ea(n){Gn.call(Ot,n)}function xt(n,e,t,a){return typeof n!="function"?n:function(){var s=_;t&&De(),ue(e,!0);try{return n.apply(this,arguments)}finally{ue(s,!1),a&&ea(ie)}}}function In(n,e){return function(t,a){return n.call(this,xt(t,e),xt(a,e))}}(""+Gn).indexOf("[native code]")===-1&&(De=ie=S);const kn="unhandledrejection";function Ln(n,e){var t;try{t=e.onuncatched(n)}catch{}if(t!==!1)try{var a,s={promise:e,reason:n};if(D.document&&document.createEvent?((a=document.createEvent("Event")).initEvent(kn,!0,!0),q(a,s)):D.CustomEvent&&q(a=new CustomEvent(kn,{detail:s}),s),a&&D.dispatchEvent&&(dispatchEvent(a),!D.PromiseRejectionEvent&&D.onunhandledrejection))try{D.onunhandledrejection(a)}catch{}Q&&a&&!a.defaultPrevented&&console.warn(`Unhandled rejection: ${n.stack||n}`)}catch{}}var O=L.reject;function Ut(n,e,t,a){if(n.idbdb&&(n._state.openComplete||_.letThrough||n._vip)){var s=n._createTransaction(e,t,n._dbSchema);try{s.create(),n._state.PR1398_maxLoop=3}catch(r){return r.name===ln.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>Ut(n,e,t,a))):O(r)}return s._promise(e,(r,i)=>de(()=>(_.trans=s,a(r,i,s)))).then(r=>s._completion.then(()=>r))}if(n._state.openComplete)return O(new A.DatabaseClosed(n._state.dbOpenError));if(!n._state.isBeingOpened){if(!n._options.autoOpen)return O(new A.DatabaseClosed);n.open().catch(S)}return n._state.dbReadyPromise.then(()=>Ut(n,e,t,a))}const Cn="3.2.7",fe="￿",$t=-1/0,Z="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",ta="String expected.",Ke=[],It=typeof navigator<"u"&&/(MSIE|Trident|Edge)/.test(navigator.userAgent),Ga=It,Wa=It,na=n=>!/(dexie\.js|dexie\.min\.js)/.test(n),kt="__dbnames",_t="readonly",At="readwrite";function xe(n,e){return n?e?function(){return n.apply(this,arguments)&&e.apply(this,arguments)}:n:e}const aa={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function st(n){return typeof n!="string"||/\./.test(n)?e=>e:e=>(e[n]===void 0&&n in e&&delete(e=Xe(e))[n],e)}class Ja{_trans(e,t,a){const s=this._tx||_.trans,r=this.name;function i(l,d,c){if(!c.schema[r])throw new A.NotFound("Table "+r+" not part of transaction");return t(c.idbtrans,c)}const o=Qe();try{return s&&s.db===this.db?s===_.trans?s._promise(e,i,a):de(()=>s._promise(e,i,a),{trans:s,transless:_.transless||_}):Ut(this.db,e,[this.name],i)}finally{o&&Ze()}}get(e,t){return e&&e.constructor===Object?this.where(e).first(t):this._trans("readonly",a=>this.core.get({trans:a,key:e}).then(s=>this.hook.reading.fire(s))).then(t)}where(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(H(e))return new this.db.WhereClause(this,`[${e.join("+")}]`);const t=T(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);const a=this.schema.indexes.concat(this.schema.primKey).filter(d=>{if(d.compound&&t.every(c=>d.keyPath.indexOf(c)>=0)){for(let c=0;c<t.length;++c)if(t.indexOf(d.keyPath[c])===-1)return!1;return!0}return!1}).sort((d,c)=>d.keyPath.length-c.keyPath.length)[0];if(a&&this.db._maxKey!==fe){const d=a.keyPath.slice(0,t.length);return this.where(d).equals(d.map(c=>e[c]))}!a&&Q&&console.warn(`The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${t.join("+")}]`);const{idxByName:s}=this.schema,r=this.db._deps.indexedDB;function i(d,c){try{return r.cmp(d,c)===0}catch{return!1}}const[o,l]=t.reduce(([d,c],p)=>{const u=s[p],h=e[p];return[d||u,d||!u?xe(c,u&&u.multi?v=>{const g=re(v,p);return H(g)&&g.some(y=>i(h,y))}:v=>i(h,re(v,p))):c]},[null,null]);return o?this.where(o.name).equals(e[o.keyPath]).filter(l):a?this.filter(l):this.where(t).equals("")}filter(e){return this.toCollection().and(e)}count(e){return this.toCollection().count(e)}offset(e){return this.toCollection().offset(e)}limit(e){return this.toCollection().limit(e)}each(e){return this.toCollection().each(e)}toArray(e){return this.toCollection().toArray(e)}toCollection(){return new this.db.Collection(new this.db.WhereClause(this))}orderBy(e){return new this.db.Collection(new this.db.WhereClause(this,H(e)?`[${e.join("+")}]`:e))}reverse(){return this.toCollection().reverse()}mapToClass(e){this.schema.mappedClass=e;const t=a=>{if(!a)return a;const s=Object.create(e.prototype);for(var r in a)if(G(a,r))try{s[r]=a[r]}catch{}return s};return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=t,this.hook("reading",t),e}defineClass(){return this.mapToClass(function(e){q(this,e)})}add(e,t){const{auto:a,keyPath:s}=this.schema.primKey;let r=e;return s&&a&&(r=st(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"add",keys:t!=null?[t]:null,values:[r]})).then(i=>i.numFailures?L.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{J(e,s,i)}catch{}return i})}update(e,t){if(typeof e!="object"||H(e))return this.where(":id").equals(e).modify(t);{const a=re(e,this.schema.primKey.keyPath);if(a===void 0)return O(new A.InvalidArgument("Given object does not contain its primary key"));try{typeof t!="function"?T(t).forEach(s=>{J(e,s,t[s])}):t(e,{value:e,primKey:a})}catch{}return this.where(":id").equals(a).modify(t)}}put(e,t){const{auto:a,keyPath:s}=this.schema.primKey;let r=e;return s&&a&&(r=st(s)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"put",values:[r],keys:t!=null?[t]:null})).then(i=>i.numFailures?L.reject(i.failures[0]):i.lastResult).then(i=>{if(s)try{J(e,s,i)}catch{}return i})}delete(e){return this._trans("readwrite",t=>this.core.mutate({trans:t,type:"delete",keys:[e]})).then(t=>t.numFailures?L.reject(t.failures[0]):void 0)}clear(){return this._trans("readwrite",e=>this.core.mutate({trans:e,type:"deleteRange",range:aa})).then(e=>e.numFailures?L.reject(e.failures[0]):void 0)}bulkGet(e){return this._trans("readonly",t=>this.core.getMany({keys:e,trans:t}).then(a=>a.map(s=>this.hook.reading.fire(s))))}bulkAdd(e,t,a){const s=Array.isArray(t)?t:void 0,r=(a=a||(s?void 0:t))?a.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&s)throw new A.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new A.InvalidArgument("Arguments objects and keys must have the same length");const d=e.length;let c=l&&o?e.map(st(l)):e;return this.core.mutate({trans:i,type:"add",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:u,lastResult:h,failures:v})=>{if(p===0)return r?u:h;throw new Ne(`${this.name}.bulkAdd(): ${p} of ${d} operations failed`,v)})})}bulkPut(e,t,a){const s=Array.isArray(t)?t:void 0,r=(a=a||(s?void 0:t))?a.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&s)throw new A.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(s&&s.length!==e.length)throw new A.InvalidArgument("Arguments objects and keys must have the same length");const d=e.length;let c=l&&o?e.map(st(l)):e;return this.core.mutate({trans:i,type:"put",keys:s,values:c,wantResults:r}).then(({numFailures:p,results:u,lastResult:h,failures:v})=>{if(p===0)return r?u:h;throw new Ne(`${this.name}.bulkPut(): ${p} of ${d} operations failed`,v)})})}bulkDelete(e){const t=e.length;return this._trans("readwrite",a=>this.core.mutate({trans:a,type:"delete",keys:e})).then(({numFailures:a,lastResult:s,failures:r})=>{if(a===0)return s;throw new Ne(`${this.name}.bulkDelete(): ${a} of ${t} operations failed`,r)})}}function He(n){var e={},t=function(i,o){if(o){for(var l=arguments.length,d=new Array(l-1);--l;)d[l-1]=arguments[l];return e[i].subscribe.apply(null,d),n}if(typeof i=="string")return e[i]};t.addEventType=r;for(var a=1,s=arguments.length;a<s;++a)r(arguments[a]);return t;function r(i,o,l){if(typeof i!="object"){var d;o||(o=Ka),l||(l=S);var c={subscribers:[],fire:l,subscribe:function(p){c.subscribers.indexOf(p)===-1&&(c.subscribers.push(p),c.fire=o(c.fire,p))},unsubscribe:function(p){c.subscribers=c.subscribers.filter(function(u){return u!==p}),c.fire=c.subscribers.reduce(o,l)}};return e[i]=t[i]=c,c}T(d=i).forEach(function(p){var u=d[p];if(H(u))r(p,d[p][0],d[p][1]);else{if(u!=="asap")throw new A.InvalidArgument("Invalid event config");var h=r(p,Ue,function(){for(var v=arguments.length,g=new Array(v);v--;)g[v]=arguments[v];h.subscribers.forEach(function(y){On(function(){y.apply(null,g)})})})}})}}function Me(n,e){return Ae(e).from({prototype:n}),e}function ke(n,e){return!(n.filter||n.algorithm||n.or)&&(e?n.justLimit:!n.replayFilter)}function Bt(n,e){n.filter=xe(n.filter,e)}function Pt(n,e,t){var a=n.replayFilter;n.replayFilter=a?()=>xe(a(),e()):e,n.justLimit=t&&!a}function mt(n,e){if(n.isPrimKey)return e.primaryKey;const t=e.getIndexByKeyPath(n.index);if(!t)throw new A.Schema("KeyPath "+n.index+" on object store "+e.name+" is not indexed");return t}function _n(n,e,t){const a=mt(n,e.schema);return e.openCursor({trans:t,values:!n.keysOnly,reverse:n.dir==="prev",unique:!!n.unique,query:{index:a,range:n.range}})}function rt(n,e,t,a){const s=n.replayFilter?xe(n.filter,n.replayFilter()):n.filter;if(n.or){const r={},i=(o,l,d)=>{if(!s||s(l,d,u=>l.stop(u),u=>l.fail(u))){var c=l.primaryKey,p=""+c;p==="[object ArrayBuffer]"&&(p=""+new Uint8Array(c)),G(r,p)||(r[p]=!0,e(o,l,d))}};return Promise.all([n.or._iterate(i,t),An(_n(n,a,t),n.algorithm,i,!n.keysOnly&&n.valueMapper)])}return An(_n(n,a,t),xe(n.algorithm,s),e,!n.keysOnly&&n.valueMapper)}function An(n,e,t,a){var s=R(a?(r,i,o)=>t(a(r),i,o):t);return n.then(r=>{if(r)return r.start(()=>{var i=()=>r.continue();e&&!e(r,o=>i=o,o=>{r.stop(o),i=S},o=>{r.fail(o),i=S})||s(r.value,r,o=>i=o),i()})})}function z(n,e){try{const t=Bn(n),a=Bn(e);if(t!==a)return t==="Array"?1:a==="Array"?-1:t==="binary"?1:a==="binary"?-1:t==="string"?1:a==="string"?-1:t==="Date"?1:a!=="Date"?NaN:-1;switch(t){case"number":case"Date":case"string":return n>e?1:n<e?-1:0;case"binary":return function(s,r){const i=s.length,o=r.length,l=i<o?i:o;for(let d=0;d<l;++d)if(s[d]!==r[d])return s[d]<r[d]?-1:1;return i===o?0:i<o?-1:1}(Pn(n),Pn(e));case"Array":return function(s,r){const i=s.length,o=r.length,l=i<o?i:o;for(let d=0;d<l;++d){const c=z(s[d],r[d]);if(c!==0)return c}return i===o?0:i<o?-1:1}(n,e)}}catch{}return NaN}function Bn(n){const e=typeof n;if(e!=="object")return e;if(ArrayBuffer.isView(n))return"binary";const t=Ft(n);return t==="ArrayBuffer"?"binary":t}function Pn(n){return n instanceof Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(n)}class Ya{_read(e,t){var a=this._ctx;return a.error?a.table._trans(null,O.bind(null,a.error)):a.table._trans("readonly",e).then(t)}_write(e){var t=this._ctx;return t.error?t.table._trans(null,O.bind(null,t.error)):t.table._trans("readwrite",e,"locked")}_addAlgorithm(e){var t=this._ctx;t.algorithm=xe(t.algorithm,e)}_iterate(e,t){return rt(this._ctx,e,t,this._ctx.table.core)}clone(e){var t=Object.create(this.constructor.prototype),a=Object.create(this._ctx);return e&&q(a,e),t._ctx=a,t}raw(){return this._ctx.valueMapper=null,this}each(e){var t=this._ctx;return this._read(a=>rt(t,e,a,t.table.core))}count(e){return this._read(t=>{const a=this._ctx,s=a.table.core;if(ke(a,!0))return s.count({trans:t,query:{index:mt(a,s.schema),range:a.range}}).then(i=>Math.min(i,a.limit));var r=0;return rt(a,()=>(++r,!1),t,s).then(()=>r)}).then(e)}sortBy(e,t){const a=e.split(".").reverse(),s=a[0],r=a.length-1;function i(d,c){return c?i(d[a[c]],c-1):d[s]}var o=this._ctx.dir==="next"?1:-1;function l(d,c){var p=i(d,r),u=i(c,r);return p<u?-o:p>u?o:0}return this.toArray(function(d){return d.sort(l)}).then(t)}toArray(e){return this._read(t=>{var a=this._ctx;if(a.dir==="next"&&ke(a,!0)&&a.limit>0){const{valueMapper:s}=a,r=mt(a,a.table.core.schema);return a.table.core.query({trans:t,limit:a.limit,values:!0,query:{index:r,range:a.range}}).then(({result:i})=>s?i.map(s):i)}{const s=[];return rt(a,r=>s.push(r),t,a.table.core).then(()=>s)}},e)}offset(e){var t=this._ctx;return e<=0||(t.offset+=e,ke(t)?Pt(t,()=>{var a=e;return(s,r)=>a===0||(a===1?(--a,!1):(r(()=>{s.advance(a),a=0}),!1))}):Pt(t,()=>{var a=e;return()=>--a<0})),this}limit(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Pt(this._ctx,()=>{var t=e;return function(a,s,r){return--t<=0&&s(r),t>=0}},!0),this}until(e,t){return Bt(this._ctx,function(a,s,r){return!e(a.value)||(s(r),t)}),this}first(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)}last(e){return this.reverse().first(e)}filter(e){var t,a;return Bt(this._ctx,function(s){return e(s.value)}),t=this._ctx,a=e,t.isMatch=xe(t.isMatch,a),this}and(e){return this.filter(e)}or(e){return new this.db.WhereClause(this._ctx.table,e,this)}reverse(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this}desc(){return this.reverse()}eachKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(a,s){e(s.key,s)})}eachUniqueKey(e){return this._ctx.unique="unique",this.eachKey(e)}eachPrimaryKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(a,s){e(s.primaryKey,s)})}keys(e){var t=this._ctx;t.keysOnly=!t.isMatch;var a=[];return this.each(function(s,r){a.push(r.key)}).then(function(){return a}).then(e)}primaryKeys(e){var t=this._ctx;if(t.dir==="next"&&ke(t,!0)&&t.limit>0)return this._read(s=>{var r=mt(t,t.table.core.schema);return t.table.core.query({trans:s,values:!1,limit:t.limit,query:{index:r,range:t.range}})}).then(({result:s})=>s).then(e);t.keysOnly=!t.isMatch;var a=[];return this.each(function(s,r){a.push(r.primaryKey)}).then(function(){return a}).then(e)}uniqueKeys(e){return this._ctx.unique="unique",this.keys(e)}firstKey(e){return this.limit(1).keys(function(t){return t[0]}).then(e)}lastKey(e){return this.reverse().firstKey(e)}distinct(){var e=this._ctx,t=e.index&&e.table.schema.idxByName[e.index];if(!t||!t.multi)return this;var a={};return Bt(this._ctx,function(s){var r=s.primaryKey.toString(),i=G(a,r);return a[r]=!0,!i}),this}modify(e){var t=this._ctx;return this._write(a=>{var s;if(typeof e=="function")s=e;else{var r=T(e),i=r.length;s=function(g){for(var y=!1,b=0;b<i;++b){var f=r[b],w=e[f];re(g,f)!==w&&(J(g,f,w),y=!0)}return y}}const o=t.table.core,{outbound:l,extractKey:d}=o.schema.primaryKey,c=this.db._options.modifyChunkSize||200,p=[];let u=0;const h=[],v=(g,y)=>{const{failures:b,numFailures:f}=y;u+=g-f;for(let w of T(b))p.push(b[w])};return this.clone().primaryKeys().then(g=>{const y=b=>{const f=Math.min(c,g.length-b);return o.getMany({trans:a,keys:g.slice(b,b+f),cache:"immutable"}).then(w=>{const k=[],C=[],I=l?[]:null,x=[];for(let E=0;E<f;++E){const F=w[E],P={value:Xe(F),primKey:g[b+E]};s.call(P,P.value,P)!==!1&&(P.value==null?x.push(g[b+E]):l||z(d(F),d(P.value))===0?(C.push(P.value),l&&I.push(g[b+E])):(x.push(g[b+E]),k.push(P.value)))}const B=ke(t)&&t.limit===1/0&&(typeof e!="function"||e===St)&&{index:t.index,range:t.range};return Promise.resolve(k.length>0&&o.mutate({trans:a,type:"add",values:k}).then(E=>{for(let F in E.failures)x.splice(parseInt(F),1);v(k.length,E)})).then(()=>(C.length>0||B&&typeof e=="object")&&o.mutate({trans:a,type:"put",keys:I,values:C,criteria:B,changeSpec:typeof e!="function"&&e}).then(E=>v(C.length,E))).then(()=>(x.length>0||B&&e===St)&&o.mutate({trans:a,type:"delete",keys:x,criteria:B}).then(E=>v(x.length,E))).then(()=>g.length>b+f&&y(b+c))})};return y(0).then(()=>{if(p.length>0)throw new gt("Error modifying one or more objects",p,u,h);return g.length})})})}delete(){var e=this._ctx,t=e.range;return ke(e)&&(e.isPrimKey&&!Wa||t.type===3)?this._write(a=>{const{primaryKey:s}=e.table.core.schema,r=t;return e.table.core.count({trans:a,query:{index:s,range:r}}).then(i=>e.table.core.mutate({trans:a,type:"deleteRange",range:r}).then(({failures:o,lastResult:l,results:d,numFailures:c})=>{if(c)throw new gt("Could not delete some values",Object.keys(o).map(p=>o[p]),i-c);return i-c}))}):this.modify(St)}}const St=(n,e)=>e.value=null;function Xa(n,e){return n<e?-1:n===e?0:1}function Qa(n,e){return n>e?-1:n===e?0:1}function $(n,e,t){var a=n instanceof ra?new n.Collection(n):n;return a._ctx.error=t?new t(e):new TypeError(e),a}function Le(n){return new n.Collection(n,()=>sa("")).limit(0)}function Za(n,e,t,a,s,r){for(var i=Math.min(n.length,a.length),o=-1,l=0;l<i;++l){var d=e[l];if(d!==a[l])return s(n[l],t[l])<0?n.substr(0,l)+t[l]+t.substr(l+1):s(n[l],a[l])<0?n.substr(0,l)+a[l]+t.substr(l+1):o>=0?n.substr(0,o)+e[o]+t.substr(o+1):null;s(n[l],d)<0&&(o=l)}return i<a.length&&r==="next"?n+t.substr(n.length):i<n.length&&r==="prev"?n.substr(0,t.length):o<0?null:n.substr(0,o)+a[o]+t.substr(o+1)}function it(n,e,t,a){var s,r,i,o,l,d,c,p=t.length;if(!t.every(g=>typeof g=="string"))return $(n,ta);function u(g){s=function(b){return b==="next"?f=>f.toUpperCase():f=>f.toLowerCase()}(g),r=function(b){return b==="next"?f=>f.toLowerCase():f=>f.toUpperCase()}(g),i=g==="next"?Xa:Qa;var y=t.map(function(b){return{lower:r(b),upper:s(b)}}).sort(function(b,f){return i(b.lower,f.lower)});o=y.map(function(b){return b.upper}),l=y.map(function(b){return b.lower}),d=g,c=g==="next"?"":a}u("next");var h=new n.Collection(n,()=>oe(o[0],l[p-1]+a));h._ondirectionchange=function(g){u(g)};var v=0;return h._addAlgorithm(function(g,y,b){var f=g.key;if(typeof f!="string")return!1;var w=r(f);if(e(w,l,v))return!0;for(var k=null,C=v;C<p;++C){var I=Za(f,w,o[C],l[C],i,d);I===null&&k===null?v=C+1:(k===null||i(k,I)>0)&&(k=I)}return y(k!==null?function(){g.continue(k+c)}:b),!1}),h}function oe(n,e,t,a){return{type:2,lower:n,upper:e,lowerOpen:t,upperOpen:a}}function sa(n){return{type:1,lower:n,upper:n}}class ra{get Collection(){return this._ctx.table.db.Collection}between(e,t,a,s){a=a!==!1,s=s===!0;try{return this._cmp(e,t)>0||this._cmp(e,t)===0&&(a||s)&&(!a||!s)?Le(this):new this.Collection(this,()=>oe(e,t,!a,!s))}catch{return $(this,Z)}}equals(e){return e==null?$(this,Z):new this.Collection(this,()=>sa(e))}above(e){return e==null?$(this,Z):new this.Collection(this,()=>oe(e,void 0,!0))}aboveOrEqual(e){return e==null?$(this,Z):new this.Collection(this,()=>oe(e,void 0,!1))}below(e){return e==null?$(this,Z):new this.Collection(this,()=>oe(void 0,e,!1,!0))}belowOrEqual(e){return e==null?$(this,Z):new this.Collection(this,()=>oe(void 0,e))}startsWith(e){return typeof e!="string"?$(this,ta):this.between(e,e+fe,!0,!0)}startsWithIgnoreCase(e){return e===""?this.startsWith(e):it(this,(t,a)=>t.indexOf(a[0])===0,[e],fe)}equalsIgnoreCase(e){return it(this,(t,a)=>t===a[0],[e],"")}anyOfIgnoreCase(){var e=ne.apply(Ce,arguments);return e.length===0?Le(this):it(this,(t,a)=>a.indexOf(t)!==-1,e,"")}startsWithAnyOfIgnoreCase(){var e=ne.apply(Ce,arguments);return e.length===0?Le(this):it(this,(t,a)=>a.some(s=>t.indexOf(s)===0),e,fe)}anyOf(){const e=ne.apply(Ce,arguments);let t=this._cmp;try{e.sort(t)}catch{return $(this,Z)}if(e.length===0)return Le(this);const a=new this.Collection(this,()=>oe(e[0],e[e.length-1]));a._ondirectionchange=r=>{t=r==="next"?this._ascending:this._descending,e.sort(t)};let s=0;return a._addAlgorithm((r,i,o)=>{const l=r.key;for(;t(l,e[s])>0;)if(++s,s===e.length)return i(o),!1;return t(l,e[s])===0||(i(()=>{r.continue(e[s])}),!1)}),a}notEqual(e){return this.inAnyRange([[$t,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})}noneOf(){const e=ne.apply(Ce,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return $(this,Z)}const t=e.reduce((a,s)=>a?a.concat([[a[a.length-1][1],s]]):[[$t,s]],null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})}inAnyRange(e,t){const a=this._cmp,s=this._ascending,r=this._descending,i=this._min,o=this._max;if(e.length===0)return Le(this);if(!e.every(f=>f[0]!==void 0&&f[1]!==void 0&&s(f[0],f[1])<=0))return $(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",A.InvalidArgument);const l=!t||t.includeLowers!==!1,d=t&&t.includeUppers===!0;let c,p=s;function u(f,w){return p(f[0],w[0])}try{c=e.reduce(function(f,w){let k=0,C=f.length;for(;k<C;++k){const I=f[k];if(a(w[0],I[1])<0&&a(w[1],I[0])>0){I[0]=i(I[0],w[0]),I[1]=o(I[1],w[1]);break}}return k===C&&f.push(w),f},[]),c.sort(u)}catch{return $(this,Z)}let h=0;const v=d?f=>s(f,c[h][1])>0:f=>s(f,c[h][1])>=0,g=l?f=>r(f,c[h][0])>0:f=>r(f,c[h][0])>=0;let y=v;const b=new this.Collection(this,()=>oe(c[0][0],c[c.length-1][1],!l,!d));return b._ondirectionchange=f=>{f==="next"?(y=v,p=s):(y=g,p=r),c.sort(u)},b._addAlgorithm((f,w,k)=>{for(var C=f.key;y(C);)if(++h,h===c.length)return w(k),!1;return!!function(I){return!v(I)&&!g(I)}(C)||(this._cmp(C,c[h][1])===0||this._cmp(C,c[h][0])===0||w(()=>{p===s?f.continue(c[h][0]):f.continue(c[h][1])}),!1)}),b}startsWithAnyOf(){const e=ne.apply(Ce,arguments);return e.every(t=>typeof t=="string")?e.length===0?Le(this):this.inAnyRange(e.map(t=>[t,t+fe])):$(this,"startsWithAnyOf() only works with strings")}}function Y(n){return R(function(e){return Ge(e),n(e.target.error),!1})}function Ge(n){n.stopPropagation&&n.stopPropagation(),n.preventDefault&&n.preventDefault()}const We="storagemutated",ce="x-storagemutated-1",pe=He(null,We);class es{_lock(){return Te(!_.global),++this._reculock,this._reculock!==1||_.global||(_.lockOwnerFor=this),this}_unlock(){if(Te(!_.global),--this._reculock==0)for(_.global||(_.lockOwnerFor=null);this._blockedFuncs.length>0&&!this._locked();){var e=this._blockedFuncs.shift();try{Re(e[1],e[0])}catch{}}return this}_locked(){return this._reculock&&_.lockOwnerFor!==this}create(e){if(!this.mode)return this;const t=this.db.idbdb,a=this.db._state.dbOpenError;if(Te(!this.idbtrans),!e&&!t)switch(a&&a.name){case"DatabaseClosedError":throw new A.DatabaseClosed(a);case"MissingAPIError":throw new A.MissingAPI(a.message,a);default:throw new A.OpenFailed(a)}if(!this.active)throw new A.TransactionInactive;return Te(this._completion._state===null),(e=this.idbtrans=e||(this.db.core?this.db.core.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}):t.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}))).onerror=R(s=>{Ge(s),this._reject(e.error)}),e.onabort=R(s=>{Ge(s),this.active&&this._reject(new A.Abort(e.error)),this.active=!1,this.on("abort").fire(s)}),e.oncomplete=R(()=>{this.active=!1,this._resolve(),"mutatedParts"in e&&pe.storagemutated.fire(e.mutatedParts)}),this}_promise(e,t,a){if(e==="readwrite"&&this.mode!=="readwrite")return O(new A.ReadOnly("Transaction is readonly"));if(!this.active)return O(new A.TransactionInactive);if(this._locked())return new L((r,i)=>{this._blockedFuncs.push([()=>{this._promise(e,t,a).then(r,i)},_])});if(a)return de(()=>{var r=new L((i,o)=>{this._lock();const l=t(i,o,this);l&&l.then&&l.then(i,o)});return r.finally(()=>this._unlock()),r._lib=!0,r});var s=new L((r,i)=>{var o=t(r,i,this);o&&o.then&&o.then(r,i)});return s._lib=!0,s}_root(){return this.parent?this.parent._root():this}waitFor(e){var t=this._root();const a=L.resolve(e);if(t._waitingFor)t._waitingFor=t._waitingFor.then(()=>a);else{t._waitingFor=a,t._waitingQueue=[];var s=t.idbtrans.objectStore(t.storeNames[0]);(function i(){for(++t._spinCount;t._waitingQueue.length;)t._waitingQueue.shift()();t._waitingFor&&(s.get(-1/0).onsuccess=i)})()}var r=t._waitingFor;return new L((i,o)=>{a.then(l=>t._waitingQueue.push(R(i.bind(null,l))),l=>t._waitingQueue.push(R(o.bind(null,l)))).finally(()=>{t._waitingFor===r&&(t._waitingFor=null)})})}abort(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new A.Abort))}table(e){const t=this._memoizedTables||(this._memoizedTables={});if(G(t,e))return t[e];const a=this.schema[e];if(!a)throw new A.NotFound("Table "+e+" not part of transaction");const s=new this.db.Table(e,a,this);return s.core=this.db.core.table(e),t[e]=s,s}}function Gt(n,e,t,a,s,r,i){return{name:n,keyPath:e,unique:t,multi:a,auto:s,compound:r,src:(t&&!i?"&":"")+(a?"*":"")+(s?"++":"")+ia(e)}}function ia(n){return typeof n=="string"?n:n?"["+[].join.call(n,"+")+"]":""}function oa(n,e,t){return{name:n,primKey:e,indexes:t,mappedClass:null,idxByName:Nn(t,a=>[a.name,a])}}let Je=n=>{try{return n.only([[]]),Je=()=>[[]],[[]]}catch{return Je=()=>fe,fe}};function Wt(n){return n==null?()=>{}:typeof n=="string"?function(e){return e.split(".").length===1?a=>a[e]:a=>re(a,e)}(n):e=>re(e,n)}function Sn(n){return[].slice.call(n)}let ts=0;function Ve(n){return n==null?":id":typeof n=="string"?n:`[${n.join("+")}]`}function ns(n,e,t){function a(l){if(l.type===3)return null;if(l.type===4)throw new Error("Cannot convert never type to IDBKeyRange");const{lower:d,upper:c,lowerOpen:p,upperOpen:u}=l;return d===void 0?c===void 0?null:e.upperBound(c,!!u):c===void 0?e.lowerBound(d,!!p):e.bound(d,c,!!p,!!u)}const{schema:s,hasGetAll:r}=function(l,d){const c=Sn(l.objectStoreNames);return{schema:{name:l.name,tables:c.map(p=>d.objectStore(p)).map(p=>{const{keyPath:u,autoIncrement:h}=p,v=H(u),g=u==null,y={},b={name:p.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:g,compound:v,keyPath:u,autoIncrement:h,unique:!0,extractKey:Wt(u)},indexes:Sn(p.indexNames).map(f=>p.index(f)).map(f=>{const{name:w,unique:k,multiEntry:C,keyPath:I}=f,x={name:w,compound:H(I),keyPath:I,unique:k,multiEntry:C,extractKey:Wt(I)};return y[Ve(I)]=x,x}),getIndexByKeyPath:f=>y[Ve(f)]};return y[":id"]=b.primaryKey,u!=null&&(y[Ve(u)]=b.primaryKey),b})},hasGetAll:c.length>0&&"getAll"in d.objectStore(c[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)}}(n,t),i=s.tables.map(l=>function(d){const c=d.name;return{name:c,schema:d,mutate:function({trans:p,type:u,keys:h,values:v,range:g}){return new Promise((y,b)=>{y=R(y);const f=p.objectStore(c),w=f.keyPath==null,k=u==="put"||u==="add";if(!k&&u!=="delete"&&u!=="deleteRange")throw new Error("Invalid operation type: "+u);const{length:C}=h||v||{length:1};if(h&&v&&h.length!==v.length)throw new Error("Given keys array must have same length as given values array.");if(C===0)return y({numFailures:0,failures:{},results:[],lastResult:void 0});let I;const x=[],B=[];let E=0;const F=V=>{++E,Ge(V)};if(u==="deleteRange"){if(g.type===4)return y({numFailures:E,failures:B,results:[],lastResult:void 0});g.type===3?x.push(I=f.clear()):x.push(I=f.delete(a(g)))}else{const[V,N]=k?w?[v,h]:[v,null]:[h,null];if(k)for(let M=0;M<C;++M)x.push(I=N&&N[M]!==void 0?f[u](V[M],N[M]):f[u](V[M])),I.onerror=F;else for(let M=0;M<C;++M)x.push(I=f[u](V[M])),I.onerror=F}const P=V=>{const N=V.target.result;x.forEach((M,Ee)=>M.error!=null&&(B[Ee]=M.error)),y({numFailures:E,failures:B,results:u==="delete"?h:x.map(M=>M.result),lastResult:N})};I.onerror=V=>{F(V),P(V)},I.onsuccess=P})},getMany:({trans:p,keys:u})=>new Promise((h,v)=>{h=R(h);const g=p.objectStore(c),y=u.length,b=new Array(y);let f,w=0,k=0;const C=x=>{const B=x.target;b[B._pos]=B.result,++k===w&&h(b)},I=Y(v);for(let x=0;x<y;++x)u[x]!=null&&(f=g.get(u[x]),f._pos=x,f.onsuccess=C,f.onerror=I,++w);w===0&&h(b)}),get:({trans:p,key:u})=>new Promise((h,v)=>{h=R(h);const g=p.objectStore(c).get(u);g.onsuccess=y=>h(y.target.result),g.onerror=Y(v)}),query:function(p){return u=>new Promise((h,v)=>{h=R(h);const{trans:g,values:y,limit:b,query:f}=u,w=b===1/0?void 0:b,{index:k,range:C}=f,I=g.objectStore(c),x=k.isPrimaryKey?I:I.index(k.name),B=a(C);if(b===0)return h({result:[]});if(p){const E=y?x.getAll(B,w):x.getAllKeys(B,w);E.onsuccess=F=>h({result:F.target.result}),E.onerror=Y(v)}else{let E=0;const F=y||!("openKeyCursor"in x)?x.openCursor(B):x.openKeyCursor(B),P=[];F.onsuccess=V=>{const N=F.result;return N?(P.push(y?N.value:N.primaryKey),++E===b?h({result:P}):void N.continue()):h({result:P})},F.onerror=Y(v)}})}(r),openCursor:function({trans:p,values:u,query:h,reverse:v,unique:g}){return new Promise((y,b)=>{y=R(y);const{index:f,range:w}=h,k=p.objectStore(c),C=f.isPrimaryKey?k:k.index(f.name),I=v?g?"prevunique":"prev":g?"nextunique":"next",x=u||!("openKeyCursor"in C)?C.openCursor(a(w),I):C.openKeyCursor(a(w),I);x.onerror=Y(b),x.onsuccess=R(B=>{const E=x.result;if(!E)return void y(null);E.___id=++ts,E.done=!1;const F=E.continue.bind(E);let P=E.continuePrimaryKey;P&&(P=P.bind(E));const V=E.advance.bind(E),N=()=>{throw new Error("Cursor not stopped")};E.trans=p,E.stop=E.continue=E.continuePrimaryKey=E.advance=()=>{throw new Error("Cursor not started")},E.fail=R(b),E.next=function(){let M=1;return this.start(()=>M--?this.continue():this.stop()).then(()=>this)},E.start=M=>{const Ee=new Promise((U,me)=>{U=R(U),x.onerror=Y(me),E.fail=me,E.stop=Fe=>{E.stop=E.continue=E.continuePrimaryKey=E.advance=N,U(Fe)}}),Ie=()=>{if(x.result)try{M()}catch(U){E.fail(U)}else E.done=!0,E.start=()=>{throw new Error("Cursor behind last entry")},E.stop()};return x.onsuccess=R(U=>{x.onsuccess=Ie,Ie()}),E.continue=F,E.continuePrimaryKey=P,E.advance=V,Ie(),Ee},y(E)},b)})},count({query:p,trans:u}){const{index:h,range:v}=p;return new Promise((g,y)=>{const b=u.objectStore(c),f=h.isPrimaryKey?b:b.index(h.name),w=a(v),k=w?f.count(w):f.count();k.onsuccess=R(C=>g(C.target.result)),k.onerror=Y(y)})}}}(l)),o={};return i.forEach(l=>o[l.name]=l),{stack:"dbcore",transaction:n.transaction.bind(n),table(l){if(!o[l])throw new Error(`Table '${l}' not found`);return o[l]},MIN_KEY:-1/0,MAX_KEY:Je(e),schema:s}}function Jt({_novip:n},e){const t=e.db,a=function(s,r,{IDBKeyRange:i,indexedDB:o},l){return{dbcore:function(c,p){return p.reduce((u,{create:h})=>({...u,...h(u)}),c)}(ns(r,i,l),s.dbcore)}}(n._middlewares,t,n._deps,e);n.core=a.dbcore,n.tables.forEach(s=>{const r=s.name;n.core.schema.tables.some(i=>i.name===r)&&(s.core=n.core.table(r),n[r]instanceof n.Table&&(n[r].core=s.core))})}function wt({_novip:n},e,t,a){t.forEach(s=>{const r=a[s];e.forEach(i=>{const o=sn(i,s);(!o||"value"in o&&o.value===void 0)&&(i===n.Transaction.prototype||i instanceof n.Transaction?se(i,s,{get(){return this.table(s)},set(l){Mn(this,s,{value:l,writable:!0,configurable:!0,enumerable:!0})}}):i[s]=new n.Table(s,r))})})}function Yt({_novip:n},e){e.forEach(t=>{for(let a in t)t[a]instanceof n.Table&&delete t[a]})}function as(n,e){return n._cfg.version-e._cfg.version}function ss(n,e,t,a){const s=n._dbSchema,r=n._createTransaction("readwrite",n._storeNames,s);r.create(t),r._completion.catch(a);const i=r._reject.bind(r),o=_.transless||_;de(()=>{_.trans=r,_.transless=o,e===0?(T(s).forEach(l=>{Dt(t,l,s[l].primKey,s[l].indexes)}),Jt(n,t),L.follow(()=>n.on.populate.fire(r)).catch(i)):function({_novip:l},d,c,p){const u=[],h=l._versions;let v=l._dbSchema=Qt(l,l.idbdb,p),g=!1;const y=h.filter(f=>f._cfg.version>=d);function b(){return u.length?L.resolve(u.shift()(c.idbtrans)).then(b):L.resolve()}return y.forEach(f=>{u.push(()=>{const w=v,k=f._cfg.dbschema;Zt(l,w,p),Zt(l,k,p),v=l._dbSchema=k;const C=la(w,k);C.add.forEach(x=>{Dt(p,x[0],x[1].primKey,x[1].indexes)}),C.change.forEach(x=>{if(x.recreate)throw new A.Upgrade("Not yet support for changing primary key");{const B=p.objectStore(x.name);x.add.forEach(E=>Xt(B,E)),x.change.forEach(E=>{B.deleteIndex(E.name),Xt(B,E)}),x.del.forEach(E=>B.deleteIndex(E))}});const I=f._cfg.contentUpgrade;if(I&&f._cfg.version>d){Jt(l,p),c._memoizedTables={},g=!0;let x=jn(k);C.del.forEach(P=>{x[P]=w[P]}),Yt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],T(x),x),c.schema=x;const B=rn(I);let E;B&&De();const F=L.follow(()=>{if(E=I(c),E&&B){var P=ie.bind(null,null);E.then(P,P)}});return E&&typeof E.then=="function"?L.resolve(E):F.then(()=>E)}}),u.push(w=>{(!g||!Ga)&&function(k,C){[].slice.call(C.db.objectStoreNames).forEach(I=>k[I]==null&&C.db.deleteObjectStore(I))}(f._cfg.dbschema,w),Yt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],l._storeNames,l._dbSchema),c.schema=l._dbSchema})}),b().then(()=>{var f,w;w=p,T(f=v).forEach(k=>{w.db.objectStoreNames.contains(k)||Dt(w,k,f[k].primKey,f[k].indexes)})})}(n,e,r,t).catch(i)})}function la(n,e){const t={del:[],add:[],change:[]};let a;for(a in n)e[a]||t.del.push(a);for(a in e){const s=n[a],r=e[a];if(s){const i={name:a,def:r,recreate:!1,del:[],add:[],change:[]};if(""+(s.primKey.keyPath||"")!=""+(r.primKey.keyPath||"")||s.primKey.auto!==r.primKey.auto&&!It)i.recreate=!0,t.change.push(i);else{const o=s.idxByName,l=r.idxByName;let d;for(d in o)l[d]||i.del.push(d);for(d in l){const c=o[d],p=l[d];c?c.src!==p.src&&i.change.push(p):i.add.push(p)}(i.del.length>0||i.add.length>0||i.change.length>0)&&t.change.push(i)}}else t.add.push([a,r])}return t}function Dt(n,e,t,a){const s=n.db.createObjectStore(e,t.keyPath?{keyPath:t.keyPath,autoIncrement:t.auto}:{autoIncrement:t.auto});return a.forEach(r=>Xt(s,r)),s}function Xt(n,e){n.createIndex(e.name,e.keyPath,{unique:e.unique,multiEntry:e.multi})}function Qt(n,e,t){const a={};return ft(e.objectStoreNames,0).forEach(s=>{const r=t.objectStore(s);let i=r.keyPath;const o=Gt(ia(i),i||"",!1,!1,!!r.autoIncrement,i&&typeof i!="string",!0),l=[];for(let c=0;c<r.indexNames.length;++c){const p=r.index(r.indexNames[c]);i=p.keyPath;var d=Gt(p.name,i,!!p.unique,!!p.multiEntry,!1,i&&typeof i!="string",!1);l.push(d)}a[s]=oa(s,o,l)}),a}function Zt({_novip:n},e,t){const a=t.db.objectStoreNames;for(let s=0;s<a.length;++s){const r=a[s],i=t.objectStore(r);n._hasGetAll="getAll"in i;for(let o=0;o<i.indexNames.length;++o){const l=i.indexNames[o],d=i.index(l).keyPath,c=typeof d=="string"?d:"["+ft(d).join("+")+"]";if(e[r]){const p=e[r].idxByName[c];p&&(p.name=l,delete e[r].idxByName[c],e[r].idxByName[l]=p)}}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&D.WorkerGlobalScope&&D instanceof D.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(n._hasGetAll=!1)}class rs{_parseStoresSpec(e,t){T(e).forEach(a=>{if(e[a]!==null){var s=e[a].split(",").map((i,o)=>{const l=(i=i.trim()).replace(/([&*]|\+\+)/g,""),d=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Gt(l,d||null,/\&/.test(i),/\*/.test(i),/\+\+/.test(i),H(d),o===0)}),r=s.shift();if(r.multi)throw new A.Schema("Primary key cannot be multi-valued");s.forEach(i=>{if(i.auto)throw new A.Schema("Only primary key can be marked as autoIncrement (++)");if(!i.keyPath)throw new A.Schema("Index must have a name and cannot be an empty string")}),t[a]=oa(a,r,s)}})}stores(e){const t=this.db;this._cfg.storesSource=this._cfg.storesSource?q(this._cfg.storesSource,e):e;const a=t._versions,s={};let r={};return a.forEach(i=>{q(s,i._cfg.storesSource),r=i._cfg.dbschema={},i._parseStoresSpec(s,r)}),t._dbSchema=r,Yt(t,[t._allTables,t,t.Transaction.prototype]),wt(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],T(r),r),t._storeNames=T(r),this}upgrade(e){return this._cfg.contentUpgrade=cn(this._cfg.contentUpgrade||S,e),this}}function mn(n,e){let t=n._dbNamesDB;return t||(t=n._dbNamesDB=new ve(kt,{addons:[],indexedDB:n,IDBKeyRange:e}),t.version(1).stores({dbnames:"name"})),t.table("dbnames")}function hn(n){return n&&typeof n.databases=="function"}function en(n){return de(function(){return _.letThrough=!0,n()})}function is(){var n;return!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(e){var t=function(){return indexedDB.databases().finally(e)};n=setInterval(t,100),t()}).finally(function(){return clearInterval(n)}):Promise.resolve()}function os(n){const e=n._state,{indexedDB:t}=n._deps;if(e.isBeingOpened||n.idbdb)return e.dbReadyPromise.then(()=>e.dbOpenError?O(e.dbOpenError):n);Q&&(e.openCanceller._stackHolder=we()),e.isBeingOpened=!0,e.dbOpenError=null,e.openComplete=!1;const a=e.openCanceller;function s(){if(e.openCanceller!==a)throw new A.DatabaseClosed("db.open() was cancelled")}let r=e.dbReadyResolve,i=null,o=!1;const l=()=>new L((d,c)=>{if(s(),!t)throw new A.MissingAPI;const p=n.name,u=e.autoSchema?t.open(p):t.open(p,Math.round(10*n.verno));if(!u)throw new A.MissingAPI;u.onerror=Y(c),u.onblocked=R(n._fireOnBlocked),u.onupgradeneeded=R(h=>{if(i=u.transaction,e.autoSchema&&!n._options.allowEmptyDB){u.onerror=Ge,i.abort(),u.result.close();const g=t.deleteDatabase(p);g.onsuccess=g.onerror=R(()=>{c(new A.NoSuchDatabase(`Database ${p} doesnt exist`))})}else{i.onerror=Y(c);var v=h.oldVersion>Math.pow(2,62)?0:h.oldVersion;o=v<1,n._novip.idbdb=u.result,ss(n,v/10,i,c)}},c),u.onsuccess=R(()=>{i=null;const h=n._novip.idbdb=u.result,v=ft(h.objectStoreNames);if(v.length>0)try{const y=h.transaction((g=v).length===1?g[0]:g,"readonly");e.autoSchema?function({_novip:b},f,w){b.verno=f.version/10;const k=b._dbSchema=Qt(0,f,w);b._storeNames=ft(f.objectStoreNames,0),wt(b,[b._allTables],T(k),k)}(n,h,y):(Zt(n,n._dbSchema,y),function(b,f){const w=la(Qt(0,b.idbdb,f),b._dbSchema);return!(w.add.length||w.change.some(k=>k.add.length||k.change.length))}(n,y)||console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")),Jt(n,y)}catch{}var g;Ke.push(n),h.onversionchange=R(y=>{e.vcFired=!0,n.on("versionchange").fire(y)}),h.onclose=R(y=>{n.on("close").fire(y)}),o&&function({indexedDB:y,IDBKeyRange:b},f){!hn(y)&&f!==kt&&mn(y,b).put({name:f}).catch(S)}(n._deps,p),d()},c)}).catch(d=>d&&d.name==="UnknownError"&&e.PR1398_maxLoop>0?(e.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),l()):L.reject(d));return L.race([a,(typeof navigator>"u"?L.resolve():is()).then(l)]).then(()=>(s(),e.onReadyBeingFired=[],L.resolve(en(()=>n.on.ready.fire(n.vip))).then(function d(){if(e.onReadyBeingFired.length>0){let c=e.onReadyBeingFired.reduce(cn,S);return e.onReadyBeingFired=[],L.resolve(en(()=>c(n.vip))).then(d)}}))).finally(()=>{e.onReadyBeingFired=null,e.isBeingOpened=!1}).then(()=>n).catch(d=>{e.dbOpenError=d;try{i&&i.abort()}catch{}return a===e.openCanceller&&n._close(),O(d)}).finally(()=>{e.openComplete=!0,r()})}function tn(n){var e=r=>n.next(r),t=s(e),a=s(r=>n.throw(r));function s(r){return i=>{var o=r(i),l=o.value;return o.done?l:l&&typeof l.then=="function"?l.then(t,a):H(l)?Promise.all(l).then(t,a):t(l)}}return s(e)()}function ls(n,e,t){var a=arguments.length;if(a<2)throw new A.InvalidArgument("Too few arguments");for(var s=new Array(a-1);--a;)s[a-1]=arguments[a];return t=s.pop(),[n,Kn(s),t]}function ca(n,e,t,a,s){return L.resolve().then(()=>{const r=_.transless||_,i=n._createTransaction(e,t,n._dbSchema,a),o={trans:i,transless:r};if(a)i.idbtrans=a.idbtrans;else try{i.create(),n._state.PR1398_maxLoop=3}catch(p){return p.name===ln.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>ca(n,e,t,null,s))):O(p)}const l=rn(s);let d;l&&De();const c=L.follow(()=>{if(d=s.call(i,i),d)if(l){var p=ie.bind(null,null);d.then(p,p)}else typeof d.next=="function"&&typeof d.throw=="function"&&(d=tn(d))},o);return(d&&typeof d.then=="function"?L.resolve(d).then(p=>i.active?p:O(new A.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))):c.then(()=>d)).then(p=>(a&&i._resolve(),i._completion.then(()=>p))).catch(p=>(i._reject(p),O(p)))})}function ot(n,e,t){const a=H(n)?n.slice():[n];for(let s=0;s<t;++s)a.push(e);return a}const cs={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(n){return{...n,table(e){const t=n.table(e),{schema:a}=t,s={},r=[];function i(c,p,u){const h=Ve(c),v=s[h]=s[h]||[],g=c==null?0:typeof c=="string"?1:c.length,y=p>0,b={...u,isVirtual:y,keyTail:p,keyLength:g,extractKey:Wt(c),unique:!y&&u.unique};return v.push(b),b.isPrimaryKey||r.push(b),g>1&&i(g===2?c[0]:c.slice(0,g-1),p+1,u),v.sort((f,w)=>f.keyTail-w.keyTail),b}const o=i(a.primaryKey.keyPath,0,a.primaryKey);s[":id"]=[o];for(const c of a.indexes)i(c.keyPath,0,c);function l(c){const p=c.query.index;return p.isVirtual?{...c,query:{index:p,range:(u=c.query.range,h=p.keyTail,{type:u.type===1?2:u.type,lower:ot(u.lower,u.lowerOpen?n.MAX_KEY:n.MIN_KEY,h),lowerOpen:!0,upper:ot(u.upper,u.upperOpen?n.MIN_KEY:n.MAX_KEY,h),upperOpen:!0})}}:c;var u,h}return{...t,schema:{...a,primaryKey:o,indexes:r,getIndexByKeyPath:function(c){const p=s[Ve(c)];return p&&p[0]}},count:c=>t.count(l(c)),query:c=>t.query(l(c)),openCursor(c){const{keyTail:p,isVirtual:u,keyLength:h}=c.query.index;return u?t.openCursor(l(c)).then(v=>v&&function(g){return Object.create(g,{continue:{value:function(b){b!=null?g.continue(ot(b,c.reverse?n.MAX_KEY:n.MIN_KEY,p)):c.unique?g.continue(g.key.slice(0,h).concat(c.reverse?n.MIN_KEY:n.MAX_KEY,p)):g.continue()}},continuePrimaryKey:{value(b,f){g.continuePrimaryKey(ot(b,n.MAX_KEY,p),f)}},primaryKey:{get:()=>g.primaryKey},key:{get(){const b=g.key;return h===1?b[0]:b.slice(0,h)}},value:{get:()=>g.value}})}(v)):t.openCursor(c)}}}}}};function fn(n,e,t,a){return t=t||{},a=a||"",T(n).forEach(s=>{if(G(e,s)){var r=n[s],i=e[s];if(typeof r=="object"&&typeof i=="object"&&r&&i){const o=Ft(r);o!==Ft(i)?t[a+s]=e[s]:o==="Object"?fn(r,i,t,a+s+"."):r!==i&&(t[a+s]=e[s])}else r!==i&&(t[a+s]=e[s])}else t[a+s]=void 0}),T(e).forEach(s=>{G(n,s)||(t[a+s]=e[s])}),t}const ds={stack:"dbcore",name:"HooksMiddleware",level:2,create:n=>({...n,table(e){const t=n.table(e),{primaryKey:a}=t.schema;return{...t,mutate(r){const i=_.trans,{deleting:o,creating:l,updating:d}=i.table(e).hook;switch(r.type){case"add":if(l.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"put":if(l.fire===S&&d.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"delete":if(o.fire===S)break;return i._promise("readwrite",()=>c(r),!0);case"deleteRange":if(o.fire===S)break;return i._promise("readwrite",()=>function(u){return p(u.trans,u.range,1e4)}(r),!0)}return t.mutate(r);function c(u){const h=_.trans,v=u.keys||function(g,y){return y.type==="delete"?y.keys:y.keys||y.values.map(g.extractKey)}(a,u);if(!v)throw new Error("Keys missing");return(u=u.type==="add"||u.type==="put"?{...u,keys:v}:{...u}).type!=="delete"&&(u.values=[...u.values]),u.keys&&(u.keys=[...u.keys]),function(g,y,b){return y.type==="add"?Promise.resolve([]):g.getMany({trans:y.trans,keys:b,cache:"immutable"})}(t,u,v).then(g=>{const y=v.map((b,f)=>{const w=g[f],k={onerror:null,onsuccess:null};if(u.type==="delete")o.fire.call(k,b,w,h);else if(u.type==="add"||w===void 0){const C=l.fire.call(k,b,u.values[f],h);b==null&&C!=null&&(b=C,u.keys[f]=b,a.outbound||J(u.values[f],a.keyPath,b))}else{const C=fn(w,u.values[f]),I=d.fire.call(k,C,b,w,h);if(I){const x=u.values[f];Object.keys(I).forEach(B=>{G(x,B)?x[B]=I[B]:J(x,B,I[B])})}}return k});return t.mutate(u).then(({failures:b,results:f,numFailures:w,lastResult:k})=>{for(let C=0;C<v.length;++C){const I=f?f[C]:v[C],x=y[C];I==null?x.onerror&&x.onerror(b[C]):x.onsuccess&&x.onsuccess(u.type==="put"&&g[C]?u.values[C]:I)}return{failures:b,results:f,numFailures:w,lastResult:k}}).catch(b=>(y.forEach(f=>f.onerror&&f.onerror(b)),Promise.reject(b)))})}function p(u,h,v){return t.query({trans:u,values:!1,query:{index:a,range:h},limit:v}).then(({result:g})=>c({type:"delete",keys:g,trans:u}).then(y=>y.numFailures>0?Promise.reject(y.failures[0]):g.length<v?{failures:[],numFailures:0,lastResult:void 0}:p(u,{...h,lower:g[g.length-1],lowerOpen:!0},v)))}}}}})};function da(n,e,t){try{if(!e||e.keys.length<n.length)return null;const a=[];for(let s=0,r=0;s<e.keys.length&&r<n.length;++s)z(e.keys[s],n[r])===0&&(a.push(t?Xe(e.values[s]):e.values[s]),++r);return a.length===n.length?a:null}catch{return null}}const us={stack:"dbcore",level:-1,create:n=>({table:e=>{const t=n.table(e);return{...t,getMany:a=>{if(!a.cache)return t.getMany(a);const s=da(a.keys,a.trans._cache,a.cache==="clone");return s?L.resolve(s):t.getMany(a).then(r=>(a.trans._cache={keys:a.keys,values:a.cache==="clone"?Xe(r):r},r))},mutate:a=>(a.type!=="add"&&(a.trans._cache=null),t.mutate(a))}}})};function gn(n){return!("from"in n)}const te=function(n,e){if(!this){const t=new te;return n&&"d"in n&&q(t,n),t}q(this,arguments.length?{d:1,from:n,to:arguments.length>1?e:n}:{d:0})};function Ye(n,e,t){const a=z(e,t);if(isNaN(a))return;if(a>0)throw RangeError();if(gn(n))return q(n,{from:e,to:t,d:1});const s=n.l,r=n.r;if(z(t,n.from)<0)return s?Ye(s,e,t):n.l={from:e,to:t,d:1,l:null,r:null},Dn(n);if(z(e,n.to)>0)return r?Ye(r,e,t):n.r={from:e,to:t,d:1,l:null,r:null},Dn(n);z(e,n.from)<0&&(n.from=e,n.l=null,n.d=r?r.d+1:1),z(t,n.to)>0&&(n.to=t,n.r=null,n.d=n.l?n.l.d+1:1);const i=!n.r;s&&!n.l&&Et(n,s),r&&i&&Et(n,r)}function Et(n,e){gn(e)||function t(a,{from:s,to:r,l:i,r:o}){Ye(a,s,r),i&&t(a,i),o&&t(a,o)}(n,e)}function ps(n,e){const t=nn(e);let a=t.next();if(a.done)return!1;let s=a.value;const r=nn(n);let i=r.next(s.from),o=i.value;for(;!a.done&&!i.done;){if(z(o.from,s.to)<=0&&z(o.to,s.from)>=0)return!0;z(s.from,o.from)<0?s=(a=t.next(o.from)).value:o=(i=r.next(s.from)).value}return!1}function nn(n){let e=gn(n)?null:{s:0,n};return{next(t){const a=arguments.length>0;for(;e;)switch(e.s){case 0:if(e.s=1,a)for(;e.n.l&&z(t,e.n.from)<0;)e={up:e,n:e.n.l,s:1};else for(;e.n.l;)e={up:e,n:e.n.l,s:1};case 1:if(e.s=2,!a||z(t,e.n.to)<=0)return{value:e.n,done:!1};case 2:if(e.n.r){e.s=3,e={up:e,n:e.n.r,s:0};continue}case 3:e=e.up}return{done:!0}}}}function Dn(n){var e,t;const a=(((e=n.r)===null||e===void 0?void 0:e.d)||0)-(((t=n.l)===null||t===void 0?void 0:t.d)||0),s=a>1?"r":a<-1?"l":"";if(s){const r=s==="r"?"l":"r",i={...n},o=n[s];n.from=o.from,n.to=o.to,n[s]=o[s],i[s]=o[r],n[r]=i,i.d=Rn(i)}n.d=Rn(n)}function Rn({r:n,l:e}){return(n?e?Math.max(n.d,e.d):n.d:e?e.d:0)+1}Se(te.prototype,{add(n){return Et(this,n),this},addKey(n){return Ye(this,n,n),this},addKeys(n){return n.forEach(e=>Ye(this,e,e)),this},[Mt](){return nn(this)}});const ms={stack:"dbcore",level:0,create:n=>{const e=n.schema.name,t=new te(n.MIN_KEY,n.MAX_KEY);return{...n,table:a=>{const s=n.table(a),{schema:r}=s,{primaryKey:i}=r,{extractKey:o,outbound:l}=i,d={...s,mutate:u=>{const h=u.trans,v=h.mutatedParts||(h.mutatedParts={}),g=I=>{const x=`idb://${e}/${a}/${I}`;return v[x]||(v[x]=new te)},y=g(""),b=g(":dels"),{type:f}=u;let[w,k]=u.type==="deleteRange"?[u.range]:u.type==="delete"?[u.keys]:u.values.length<50?[[],u.values]:[];const C=u.trans._cache;return s.mutate(u).then(I=>{if(H(w)){f!=="delete"&&(w=I.results),y.addKeys(w);const x=da(w,C);x||f==="add"||b.addKeys(w),(x||k)&&function(B,E,F,P){function V(N){const M=B(N.name||"");function Ee(U){return U!=null?N.extractKey(U):null}const Ie=U=>N.multiEntry&&H(U)?U.forEach(me=>M.addKey(me)):M.addKey(U);(F||P).forEach((U,me)=>{const Fe=F&&Ee(F[me]),Lt=P&&Ee(P[me]);z(Fe,Lt)!==0&&(Fe!=null&&Ie(Fe),Lt!=null&&Ie(Lt))})}E.indexes.forEach(V)}(g,r,x,k)}else if(w){const x={from:w.lower,to:w.upper};b.add(x),y.add(x)}else y.add(t),b.add(t),r.indexes.forEach(x=>g(x.name).add(t));return I})}},c=({query:{index:u,range:h}})=>{var v,g;return[u,new te((v=h.lower)!==null&&v!==void 0?v:n.MIN_KEY,(g=h.upper)!==null&&g!==void 0?g:n.MAX_KEY)]},p={get:u=>[i,new te(u.key)],getMany:u=>[i,new te().addKeys(u.keys)],count:c,query:c,openCursor:c};return T(p).forEach(u=>{d[u]=function(h){const{subscr:v}=_;if(v){const g=k=>{const C=`idb://${e}/${a}/${k}`;return v[C]||(v[C]=new te)},y=g(""),b=g(":dels"),[f,w]=p[u](h);if(g(f.name||"").add(w),!f.isPrimaryKey){if(u!=="count"){const k=u==="query"&&l&&h.values&&s.query({...h,values:!1});return s[u].apply(this,arguments).then(C=>{if(u==="query"){if(l&&h.values)return k.then(({result:x})=>(y.addKeys(x),C));const I=h.values?C.result.map(o):C.result;h.values?y.addKeys(I):b.addKeys(I)}else if(u==="openCursor"){const I=C,x=h.values;return I&&Object.create(I,{key:{get:()=>(b.addKey(I.primaryKey),I.key)},primaryKey:{get(){const B=I.primaryKey;return b.addKey(B),B}},value:{get:()=>(x&&y.addKey(I.primaryKey),I.value)}})}return C})}b.add(t)}}return s[u].apply(this,arguments)}}),d}}}};class ve{constructor(e,t){this._middlewares={},this.verno=0;const a=ve.dependencies;this._options=t={addons:ve.addons,autoOpen:!0,indexedDB:a.indexedDB,IDBKeyRange:a.IDBKeyRange,...t},this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange};const{addons:s}=t;this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this;const r={dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:S,dbReadyPromise:null,cancelOpen:S,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3};var i;r.dbReadyPromise=new L(o=>{r.dbReadyResolve=o}),r.openCanceller=new L((o,l)=>{r.cancelOpen=l}),this._state=r,this.name=e,this.on=He(this,"populate","blocked","versionchange","close",{ready:[cn,S]}),this.on.ready.subscribe=Tn(this.on.ready.subscribe,o=>(l,d)=>{ve.vip(()=>{const c=this._state;if(c.openComplete)c.dbOpenError||L.resolve().then(l),d&&o(l);else if(c.onReadyBeingFired)c.onReadyBeingFired.push(l),d&&o(l);else{o(l);const p=this;d||o(function u(){p.on.ready.unsubscribe(l),p.on.ready.unsubscribe(u)})}})}),this.Collection=(i=this,Me(Ya.prototype,function(o,l){this.db=i;let d=aa,c=null;if(l)try{d=l()}catch(v){c=v}const p=o._ctx,u=p.table,h=u.hook.reading.fire;this._ctx={table:u,index:p.index,isPrimKey:!p.index||u.schema.primKey.keyPath&&p.index===u.schema.primKey.name,range:d,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:c,or:p.or,valueMapper:h!==Ue?h:null}})),this.Table=function(o){return Me(Ja.prototype,function(l,d,c){this.db=o,this._tx=c,this.name=l,this.schema=d,this.hook=o._allTables[l]?o._allTables[l].hook:He(null,{creating:[Oa,S],reading:[Ta,Ue],updating:[ja,S],deleting:[Na,S]})})}(this),this.Transaction=function(o){return Me(es.prototype,function(l,d,c,p,u){this.db=o,this.mode=l,this.storeNames=d,this.schema=c,this.chromeTransactionDurability=p,this.idbtrans=null,this.on=He(this,"complete","error","abort"),this.parent=u||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new L((h,v)=>{this._resolve=h,this._reject=v}),this._completion.then(()=>{this.active=!1,this.on.complete.fire()},h=>{var v=this.active;return this.active=!1,this.on.error.fire(h),this.parent?this.parent._reject(h):v&&this.idbtrans&&this.idbtrans.abort(),O(h)})})}(this),this.Version=function(o){return Me(rs.prototype,function(l){this.db=o,this._cfg={version:l,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})}(this),this.WhereClause=function(o){return Me(ra.prototype,function(l,d,c){this.db=o,this._ctx={table:l,index:d===":id"?null:d,or:c};const p=o._deps.indexedDB;if(!p)throw new A.MissingAPI;this._cmp=this._ascending=p.cmp.bind(p),this._descending=(u,h)=>p.cmp(h,u),this._max=(u,h)=>p.cmp(u,h)>0?u:h,this._min=(u,h)=>p.cmp(u,h)<0?u:h,this._IDBKeyRange=o._deps.IDBKeyRange})}(this),this.on("versionchange",o=>{o.newVersion>0?console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`):console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`),this.close()}),this.on("blocked",o=>{!o.newVersion||o.newVersion<o.oldVersion?console.warn(`Dexie.delete('${this.name}') was blocked`):console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${o.oldVersion/10}`)}),this._maxKey=Je(t.IDBKeyRange),this._createTransaction=(o,l,d,c)=>new this.Transaction(o,l,d,this._options.chromeTransactionDurability,c),this._fireOnBlocked=o=>{this.on("blocked").fire(o),Ke.filter(l=>l.name===this.name&&l!==this&&!l._state.vcFired).map(l=>l.on("versionchange").fire(o))},this.use(cs),this.use(ds),this.use(ms),this.use(us),this.vip=Object.create(this,{_vip:{value:!0}}),s.forEach(o=>o(this))}version(e){if(isNaN(e)||e<.1)throw new A.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new A.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);const t=this._versions;var a=t.filter(s=>s._cfg.version===e)[0];return a||(a=new this.Version(e),t.push(a),t.sort(as),a.stores({}),this._state.autoSchema=!1,a)}_whenReady(e){return this.idbdb&&(this._state.openComplete||_.letThrough||this._vip)?e():new L((t,a)=>{if(this._state.openComplete)return a(new A.DatabaseClosed(this._state.dbOpenError));if(!this._state.isBeingOpened){if(!this._options.autoOpen)return void a(new A.DatabaseClosed);this.open().catch(S)}this._state.dbReadyPromise.then(t,a)}).then(e)}use({stack:e,create:t,level:a,name:s}){s&&this.unuse({stack:e,name:s});const r=this._middlewares[e]||(this._middlewares[e]=[]);return r.push({stack:e,create:t,level:a??10,name:s}),r.sort((i,o)=>i.level-o.level),this}unuse({stack:e,name:t,create:a}){return e&&this._middlewares[e]&&(this._middlewares[e]=this._middlewares[e].filter(s=>a?s.create!==a:!!t&&s.name!==t)),this}open(){return os(this)}_close(){const e=this._state,t=Ke.indexOf(this);if(t>=0&&Ke.splice(t,1),this.idbdb){try{this.idbdb.close()}catch{}this._novip.idbdb=null}e.dbReadyPromise=new L(a=>{e.dbReadyResolve=a}),e.openCanceller=new L((a,s)=>{e.cancelOpen=s})}close(){this._close();const e=this._state;this._options.autoOpen=!1,e.dbOpenError=new A.DatabaseClosed,e.isBeingOpened&&e.cancelOpen(e.dbOpenError)}delete(){const e=arguments.length>0,t=this._state;return new L((a,s)=>{const r=()=>{this.close();var i=this._deps.indexedDB.deleteDatabase(this.name);i.onsuccess=R(()=>{(function({indexedDB:o,IDBKeyRange:l},d){!hn(o)&&d!==kt&&mn(o,l).delete(d).catch(S)})(this._deps,this.name),a()}),i.onerror=Y(s),i.onblocked=this._fireOnBlocked};if(e)throw new A.InvalidArgument("Arguments not allowed in db.delete()");t.isBeingOpened?t.dbReadyPromise.then(r):r()})}backendDB(){return this.idbdb}isOpen(){return this.idbdb!==null}hasBeenClosed(){const e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"}hasFailed(){return this._state.dbOpenError!==null}dynamicallyOpened(){return this._state.autoSchema}get tables(){return T(this._allTables).map(e=>this._allTables[e])}transaction(){const e=ls.apply(this,arguments);return this._transaction.apply(this,e)}_transaction(e,t,a){let s=_.trans;s&&s.db===this&&e.indexOf("!")===-1||(s=null);const r=e.indexOf("?")!==-1;let i,o;e=e.replace("!","").replace("?","");try{if(o=t.map(d=>{var c=d instanceof this.Table?d.name:d;if(typeof c!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return c}),e=="r"||e===_t)i=_t;else{if(e!="rw"&&e!=At)throw new A.InvalidArgument("Invalid transaction mode: "+e);i=At}if(s){if(s.mode===_t&&i===At){if(!r)throw new A.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");s=null}s&&o.forEach(d=>{if(s&&s.storeNames.indexOf(d)===-1){if(!r)throw new A.SubTransaction("Table "+d+" not included in parent transaction.");s=null}}),r&&s&&!s.active&&(s=null)}}catch(d){return s?s._promise(null,(c,p)=>{p(d)}):O(d)}const l=ca.bind(null,this,i,o,s,a);return s?s._promise(i,l,"lock"):_.trans?Re(_.transless,()=>this._whenReady(l)):this._whenReady(l)}table(e){if(!G(this._allTables,e))throw new A.InvalidTable(`Table ${e} does not exist`);return this._allTables[e]}}const hs=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable";class fs{constructor(e){this._subscribe=e}subscribe(e,t,a){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:a})}[hs](){return this}}function ua(n,e){return T(e).forEach(t=>{Et(n[t]||(n[t]=new te),e[t])}),n}function gs(n){let e,t=!1;const a=new fs(s=>{const r=rn(n);let i=!1,o={},l={};const d={get closed(){return i},unsubscribe:()=>{i=!0,pe.storagemutated.unsubscribe(h)}};s.start&&s.start(d);let c=!1,p=!1;function u(){return T(l).some(g=>o[g]&&ps(o[g],l[g]))}const h=g=>{ua(o,g),u()&&v()},v=()=>{if(c||i)return;o={};const g={},y=function(b){r&&De();const f=()=>de(n,{subscr:b,trans:null}),w=_.trans?Re(_.transless,f):f();return r&&w.then(ie,ie),w}(g);p||(pe(We,h),p=!0),c=!0,Promise.resolve(y).then(b=>{t=!0,e=b,c=!1,i||(u()?v():(o={},l=g,s.next&&s.next(b)))},b=>{c=!1,t=!1,s.error&&s.error(b),d.unsubscribe()})};return v(),d});return a.hasValue=()=>t,a.getValue=()=>e,a}let an;try{an={indexedDB:D.indexedDB||D.mozIndexedDB||D.webkitIndexedDB||D.msIndexedDB,IDBKeyRange:D.IDBKeyRange||D.webkitIDBKeyRange}}catch{an={indexedDB:null,IDBKeyRange:null}}const he=ve;function ht(n){let e=ae;try{ae=!0,pe.storagemutated.fire(n)}finally{ae=e}}Se(he,{...lt,delete:n=>new he(n,{addons:[]}).delete(),exists:n=>new he(n,{addons:[]}).open().then(e=>(e.close(),!0)).catch("NoSuchDatabaseError",()=>!1),getDatabaseNames(n){try{return function({indexedDB:e,IDBKeyRange:t}){return hn(e)?Promise.resolve(e.databases()).then(a=>a.map(s=>s.name).filter(s=>s!==kt)):mn(e,t).toCollection().primaryKeys()}(he.dependencies).then(n)}catch{return O(new A.MissingAPI)}},defineClass:()=>function(n){q(this,n)},ignoreTransaction:n=>_.trans?Re(_.transless,n):n(),vip:en,async:function(n){return function(){try{var e=tn(n.apply(this,arguments));return e&&typeof e.then=="function"?e:L.resolve(e)}catch(t){return O(t)}}},spawn:function(n,e,t){try{var a=tn(n.apply(t,e||[]));return a&&typeof a.then=="function"?a:L.resolve(a)}catch(s){return O(s)}},currentTransaction:{get:()=>_.trans||null},waitFor:function(n,e){const t=L.resolve(typeof n=="function"?he.ignoreTransaction(n):n).timeout(e||6e4);return _.trans?_.trans.waitFor(t):t},Promise:L,debug:{get:()=>Q,set:n=>{Vn(n,n==="dexie"?()=>!0:na)}},derive:Ae,extend:q,props:Se,override:Tn,Events:He,on:pe,liveQuery:gs,extendObservabilitySet:ua,getByKeyPath:re,setByKeyPath:J,delByKeyPath:function(n,e){typeof e=="string"?J(n,e,void 0):"length"in e&&[].map.call(e,function(t){J(n,t,void 0)})},shallowClone:jn,deepClone:Xe,getObjectDiff:fn,cmp:z,asap:On,minKey:$t,addons:[],connections:Ke,errnames:ln,dependencies:an,semVer:Cn,version:Cn.split(".").map(n=>parseInt(n)).reduce((n,e,t)=>n+e/Math.pow(10,2*t))}),he.maxKey=Je(he.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(pe(We,n=>{if(!ae){let e;It?(e=document.createEvent("CustomEvent"),e.initCustomEvent(ce,!0,!0,n)):e=new CustomEvent(ce,{detail:n}),ae=!0,dispatchEvent(e),ae=!1}}),addEventListener(ce,({detail:n})=>{ae||ht(n)}));let ae=!1;if(typeof BroadcastChannel<"u"){const n=new BroadcastChannel(ce);typeof n.unref=="function"&&n.unref(),pe(We,e=>{ae||n.postMessage(e)}),n.onmessage=e=>{e.data&&ht(e.data)}}else if(typeof self<"u"&&typeof navigator<"u"){pe(We,e=>{try{ae||(typeof localStorage<"u"&&localStorage.setItem(ce,JSON.stringify({trig:Math.random(),changedParts:e})),typeof self.clients=="object"&&[...self.clients.matchAll({includeUncontrolled:!0})].forEach(t=>t.postMessage({type:ce,changedParts:e})))}catch{}}),typeof addEventListener<"u"&&addEventListener("storage",e=>{if(e.key===ce){const t=JSON.parse(e.newValue);t&&ht(t.changedParts)}});const n=self.document&&navigator.serviceWorker;n&&n.addEventListener("message",function({data:e}){e&&e.type===ce&&ht(e.changedParts)})}L.rejectionMapper=function(n,e){if(!n||n instanceof Be||n instanceof TypeError||n instanceof SyntaxError||!n.name||!En[n.name])return n;var t=new En[n.name](e||n.message,n);return"stack"in n&&se(t,"stack",{get:function(){return this.inner.stack}}),t},Vn(Q,na);class bs extends ve{constructor(){super("VetCalcDB");m(this,"users");m(this,"patients");m(this,"calculationHistory");m(this,"appointments");this.version(3).stores({users:"++id, email, isPremium",patients:"++id, name, species, ownerName",calculationHistory:"++id, type, patientId, createdAt",appointments:"++id, petName, date, time, createdAt"})}}const W=new bs;class vs{constructor(){m(this,"currentUser",null);const e=localStorage.getItem("vetcalc_current_user");if(e)try{const t=JSON.parse(e);this.currentUser=t,_e.setStatus(t.isPremium)}catch{}}async register(e,t,a){if(await W.users.where("email").equals(e).first())return{success:!1,message:"El email ya está registrado"};const r={email:e,password:t,isPremium:!1,name:a,createdAt:new Date};return await W.users.add(r),{success:!0,message:"Registro exitoso"}}async login(e,t){const a=await W.users.where("email").equals(e).first();return!a||a.password!==t?{success:!1,message:"Credenciales incorrectas"}:(this.currentUser=a,localStorage.setItem("vetcalc_current_user",JSON.stringify(a)),_e.setStatus(a.isPremium),{success:!0,message:"Login exitoso"})}logout(){this.currentUser=null,localStorage.removeItem("vetcalc_current_user"),_e.setStatus(!1)}isLoggedIn(){return this.currentUser!==null}getCurrentUser(){return this.currentUser}async upgradeToPremium(){!this.currentUser||!this.currentUser.id||(this.currentUser.isPremium=!0,await W.users.update(this.currentUser.id,{isPremium:!0}),localStorage.setItem("vetcalc_current_user",JSON.stringify(this.currentUser)),_e.setStatus(!0))}}const et=new vs;class ys extends X{constructor(){super();m(this,"view");m(this,"onlineStatus",!0);m(this,"onlineHandler",()=>{this.updateOnlineStatus(!0)});m(this,"offlineHandler",()=>{this.updateOnlineStatus(!1)});this.view=new xa}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(t=>{const a=t;a.addEventListener("click",s=>{const r=document.createElement("span");r.classList.add("ripple"),a.appendChild(r);const i=a.getBoundingClientRect(),o=s.clientX-i.left,l=s.clientY-i.top;r.style.left=`${o}px`,r.style.top=`${l}px`,setTimeout(()=>r.remove(),600)})}),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupElements(),this.updateGreeting(),this.setupSpecificListeners(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),this.destroyPremiumBadge(),console.log("[HomeController] Destroyed")}updateGreeting(){const t=et.getCurrentUser(),a=this.view.getGreetingElement();a&&(t!=null&&t.name?a.textContent=`Bienvenido, ${t.name}`:a.textContent="Bienvenido, Dr. Smith")}setupSpecificListeners(){const t=this.view.getSearchButton();t&&t.addEventListener("click",()=>console.log("[Home] Search clicked"));const a=this.view.getProfileButton();a&&a.addEventListener("click",()=>console.log("[Home] Profile clicked"));const s=this.view.getViewAllHistoryButton();s&&s.addEventListener("click",async()=>this.navigateToModule("history"));const r=this.view.getViewAllPatientsButton();r&&r.addEventListener("click",async()=>this.navigateToModule("patients"))}setupElements(){this.view.showRecentPatientsSection()}async navigateToModule(t){console.log(`[Home] Navigating to: ${t}`),await K.navigate(t)}renderRecentPatients(){const t=xn.getRecentPatients(4),a=this.view.getRecentPatientsContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createPatientCard(s))}))}createPatientCard(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const s=(t.species==="canine","pets");return a.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(t.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${t.species} • ${t.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${t.status}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View patient: ${t.name}`)),a}renderRecentHistory(){const t=xn.getRecentHistory(2),a=this.view.getRecentHistoryContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createHistoryItem(s))}))}createHistoryItem(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let s="history",r="bg-secondary-fixed";switch(t.type){case"dosage":s="medication",r="bg-secondary-fixed";break;case"fluidotherapy":s="water_drop",r="bg-secondary-fixed";break;case"anesthesia":s="air",r="bg-tertiary-fixed";break;case"converter":s="sync_alt",r="bg-surface-container-highest";break}const i=this.getRelativeTime(t.createdAt),o=t.summary.substring(0,40)+(t.summary.length>40?"...":""),l=t.patientName||"Unknown",d=t.patientSpecies||"N/A",c=t.patientWeightKg||"?";return a.innerHTML=`
      <div class="w-10 h-10 rounded-full ${r} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(o)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(l)} (${d}, ${c}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${i}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View calculation: ${t.type}`)),a}getRelativeTime(t){const a=Date.now()-t.getTime(),s=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return s<1?"Just now":s<60?`${s}m ago`:r<24?`${r}h ago`:`${i}d ago`}renderTipOfTheDay(){const t=yn[Math.floor(Math.random()*yn.length)],a=this.view.getTipElement();a&&(a.textContent=t.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(t){this.onlineStatus=t;let a=document.getElementById("online-status");if(a||document.querySelector("header")&&(a=document.createElement("div"),a.id="online-status",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(a,document.body.firstChild)),a)if(t)a.textContent="● Online",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{a&&this.onlineStatus&&(a.style.opacity="0",setTimeout(()=>{if(a&&this.onlineStatus){a.style.display="none";const s=document.querySelector("header");s&&(s.style.marginTop="0px")}},300))},3e3);else{a.textContent="⚠ You are offline - Some features may be limited",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",a.style.display="block";const s=document.querySelector("header");s&&(s.style.marginTop="24px")}}escapeHtml(t){const a=document.createElement("div");return a.textContent=t,a.innerHTML}}const xs=`
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
  </a>

  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
  </a>
</nav>

</nav>
`;class ws{constructor(){m(this,"container",null);m(this,"inputLeft",null);m(this,"inputRight",null);m(this,"labelLeft",null);m(this,"labelRight",null);m(this,"unitLeft",null);m(this,"unitRight",null);m(this,"referenceText",null);m(this,"tabs",null);m(this,"swapBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=xs),this.cacheElements()}cacheElements(){this.inputLeft=document.getElementById("input-left"),this.inputRight=document.getElementById("input-right"),this.labelLeft=document.getElementById("label-left"),this.labelRight=document.getElementById("label-right"),this.unitLeft=document.getElementById("unit-left"),this.unitRight=document.getElementById("unit-right"),this.referenceText=document.getElementById("reference-text"),this.tabs=document.querySelectorAll("[data-mode]"),this.swapBtn=document.getElementById("swap-btn")}getInputLeft(){return this.inputLeft}getInputRight(){return this.inputRight}getLabelLeft(){return this.labelLeft}getLabelRight(){return this.labelRight}getUnitLeft(){return this.unitLeft}getUnitRight(){return this.unitRight}getReferenceText(){return this.referenceText}getTabs(){return this.tabs}getSwapBtn(){return this.swapBtn}updateLeftLabel(e){this.labelLeft&&(this.labelLeft.textContent=e)}updateRightLabel(e){this.labelRight&&(this.labelRight.textContent=e)}updateLeftUnit(e){this.unitLeft&&(this.unitLeft.textContent=e)}updateRightUnit(e){this.unitRight&&(this.unitRight.textContent=e)}updateReference(e){this.referenceText&&(this.referenceText.textContent=e)}clearInputs(){this.inputLeft&&(this.inputLeft.value=""),this.inputRight&&(this.inputRight.value="")}setInputLeftValue(e){this.inputLeft&&e!==void 0&&(this.inputLeft.value=e)}setInputRightValue(e){this.inputRight&&e!==void 0&&(this.inputRight.value=e)}getInputLeftValue(){const e=this.inputLeft;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}getInputRightValue(){const e=this.inputRight;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}}class Es extends X{constructor(){super();m(this,"view");m(this,"currentMode","weight");m(this,"modes",{weight:{leftLabel:"Libras (lb)",leftUnit:"lb",rightLabel:"Kilogramos (kg)",rightUnit:"kg",reference:"Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.",convert:(t,a)=>a==="leftToRight"?t/2.20462:t*2.20462},temp:{leftLabel:"Fahrenheit (°F)",leftUnit:"°F",rightLabel:"Celsius (°C)",rightUnit:"°C",reference:"Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).",convert:(t,a)=>a==="leftToRight"?(t-32)*5/9:t*9/5+32},volume:{leftLabel:"Onzas líquidas (fl oz)",leftUnit:"fl oz",rightLabel:"Mililitros (mL)",rightUnit:"mL",reference:"Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).",convert:(t,a)=>a==="leftToRight"?t*29.5735:t/29.5735}});this.view=new ws}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.applyMode("weight")}setupEventListeners(){const t=this.view.getTabs();t==null||t.forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-mode");o&&this.modes[o]&&this.applyMode(o)})});const a=this.view.getInputLeft(),s=this.view.getInputRight();a==null||a.addEventListener("input",()=>this.convertFromLeft()),s==null||s.addEventListener("input",()=>this.convertFromRight());const r=this.view.getSwapBtn();r==null||r.addEventListener("click",()=>this.swap())}applyMode(t){this.currentMode=t;const a=this.modes[t];this.view.updateLeftLabel(a.leftLabel),this.view.updateRightLabel(a.rightLabel),this.view.updateLeftUnit(a.leftUnit),this.view.updateRightUnit(a.rightUnit),this.view.updateReference(a.reference),this.view.clearInputs();const s=this.view.getTabs();s==null||s.forEach(r=>{r.getAttribute("data-mode")===t?(r.classList.add("bg-surface","text-primary","shadow-sm"),r.classList.remove("text-on-surface-variant","hover:bg-surface-container-high")):(r.classList.remove("bg-surface","text-primary","shadow-sm"),r.classList.add("text-on-surface-variant","hover:bg-surface-container-high"))})}convertFromLeft(){const t=this.view.getInputLeftValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"leftToRight");this.view.setInputRightValue(s.toFixed(2))}else this.view.setInputRightValue("")}convertFromRight(){const t=this.view.getInputRightValue();if(t!==null){const s=this.modes[this.currentMode].convert(t,"rightToLeft");this.view.setInputLeftValue(s.toFixed(2))}else this.view.setInputLeftValue("")}swap(){const t=this.view.getInputLeftValue(),a=this.view.getInputRightValue();t!==null?this.view.setInputRightValue(t.toFixed(2)):this.view.setInputRightValue(""),a!==null?this.view.setInputLeftValue(a.toFixed(2)):this.view.setInputLeftValue(""),this.convertFromLeft()}destroy(){this.destroyPremiumBadge(),console.log("[ConverterController] Destroyed")}}const Is=`
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
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
`;class ks{constructor(){m(this,"container",null);m(this,"patientDetailsEl",null);m(this,"weightDisplayEl",null);m(this,"asaStatusEl",null);m(this,"premedListEl",null);m(this,"inductionListEl",null);m(this,"summaryBodyEl",null);m(this,"totalFluidsEl",null);m(this,"finalizeBtn",null);m(this,"printBtn",null);m(this,"expandBtn",null);m(this,"detailsPanel",null);m(this,"detailWeight",null);m(this,"detailAsa",null);m(this,"detailDrugs",null);m(this,"detailFluids",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Is),this.cacheElements()}cacheElements(){this.patientDetailsEl=document.getElementById("patient-details"),this.weightDisplayEl=document.getElementById("weight-display"),this.asaStatusEl=document.getElementById("asa-status"),this.premedListEl=document.getElementById("premed-list"),this.inductionListEl=document.getElementById("induction-list"),this.summaryBodyEl=document.getElementById("summary-table-body"),this.totalFluidsEl=document.getElementById("total-fluids"),this.finalizeBtn=document.getElementById("finalize-btn"),this.printBtn=document.getElementById("print-pdf-btn"),this.expandBtn=document.getElementById("expand-details-btn"),this.detailsPanel=document.getElementById("details-panel"),this.detailWeight=document.getElementById("detail-weight"),this.detailAsa=document.getElementById("detail-asa"),this.detailDrugs=document.getElementById("detail-drugs"),this.detailFluids=document.getElementById("detail-fluids")}getPremedList(){return this.premedListEl}getInductionList(){return this.inductionListEl}getSummaryBody(){return this.summaryBodyEl}getTotalFluidsEl(){return this.totalFluidsEl}getFinalizeBtn(){return this.finalizeBtn}getPrintBtn(){return this.printBtn}getExpandBtn(){return this.expandBtn}getDetailsPanel(){return this.detailsPanel}updatePatientInfo(e,t,a,s){this.patientDetailsEl&&(this.patientDetailsEl.textContent=`${e} • ${t} • ${a} kg`),this.weightDisplayEl&&(this.weightDisplayEl.textContent=`${a} kg`),this.asaStatusEl&&(this.asaStatusEl.textContent=s)}updateDetailPanel(e,t,a,s){this.detailWeight&&(this.detailWeight.textContent=`${e} kg`),this.detailAsa&&(this.detailAsa.textContent=t),this.detailDrugs&&(this.detailDrugs.textContent=a.toString()),this.detailFluids&&(this.detailFluids.textContent=`${s.toFixed(1)} mL`)}renderDrugList(e,t,a,s){e.innerHTML="";for(const r of t){const i=document.createElement("label");i.className=`flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border shadow-sm hover:shadow-md cursor-pointer transition-all ${r.selected?"border-primary":"border-outline-variant"}`;const o=document.createElement("input");o.type="checkbox",o.checked=r.selected,o.className="w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox",o.addEventListener("change",c=>{const p=c.target.checked;a(r.name,p),p?(i.classList.add("border-primary"),i.classList.remove("opacity-80")):(i.classList.remove("border-primary"),i.classList.add("opacity-80"))});const l=document.createElement("div");l.className="flex-grow",l.innerHTML=`
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface font-semibold">${r.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${r.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${r.category==="premed"?"Sedante / Analgésico":"Agente de inducción"}</p>
      `;const d=document.createElement("div");d.className="text-right",d.id=`drug-values-${r.name.replace(/\s/g,"")}`,this.updateDrugValuesUI(d,r,s),i.appendChild(o),i.appendChild(l),i.appendChild(d),e.appendChild(i)}}updateDrugValuesUI(e,t,a){const s=t.dosePerKg*a,r=s/t.concentration;e.innerHTML=`
      <p class="font-headline-md text-headline-md text-primary">${s.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${r.toFixed(2)} mL</p>
    `}renderSummary(e,t,a){if(this.summaryBodyEl){this.summaryBodyEl.innerHTML="";for(const s of e){if(!s.selected)continue;const r=s.dosePerKg*t,i=r/s.concentration,o=document.createElement("tr");o.className="border-b border-outline-variant/30 hover:bg-surface-container/20 transition-colors",o.innerHTML=`
        <td class="p-4">
          <p class="font-label-md text-label-md text-on-surface font-semibold">${s.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${s.category==="premed"?"Premedicación":"Inducción"}</p>
        </td>
        <td class="p-4 font-body-md">${r.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${i.toFixed(2)} mL</td>
      `,this.summaryBodyEl.appendChild(o)}this.totalFluidsEl&&(this.totalFluidsEl.textContent=`${a.toFixed(1)} mL`)}}}class Ls extends X{constructor(){super();m(this,"view");m(this,"weightKg",28.5);m(this,"asaStatus","Clase II");m(this,"drugs",[{name:"Acepromazina",dosePerKg:.02,concentration:10,category:"premed",selected:!0},{name:"Butorfanol",dosePerKg:.2,concentration:10,category:"premed",selected:!0},{name:"Propofol",dosePerKg:4,concentration:10,category:"induction",selected:!0}]);this.view=new ks}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.renderDrugLists(),this.updateSummaryAndFluids(),this.setupExpandPanel()}setupEventListeners(){const t=this.view.getFinalizeBtn();t==null||t.addEventListener("click",()=>{alert("Protocolo guardado (simulación)"),console.log("Protocolo finalizado:",this.drugs.filter(s=>s.selected))});const a=this.view.getPrintBtn();a==null||a.addEventListener("click",()=>{console.log("Generar PDF")})}setupExpandPanel(){const t=this.view.getExpandBtn(),a=this.view.getDetailsPanel();t&&a&&t.addEventListener("click",()=>{a.classList.contains("hidden")?(a.classList.remove("hidden"),t.innerHTML='<span class="material-symbols-outlined text-[18px]">expand_less</span> Ocultar detalles del protocolo'):(a.classList.add("hidden"),t.innerHTML='<span class="material-symbols-outlined text-[18px]">expand_more</span> Ver detalles del protocolo')})}renderDrugLists(){const t=this.view.getPremedList(),a=this.view.getInductionList();if(!t||!a)return;const s=this.drugs.filter(i=>i.category==="premed"),r=this.drugs.filter(i=>i.category==="induction");this.view.renderDrugList(t,s,(i,o)=>{const l=this.drugs.find(d=>d.name===i);l&&(l.selected=o),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()},this.weightKg),this.view.renderDrugList(a,r,(i,o)=>{const l=this.drugs.find(d=>d.name===i);l&&(l.selected=o),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()},this.weightKg)}refreshDrugValuesUI(){for(const t of this.drugs){const a=document.getElementById(`drug-values-${t.name.replace(/\s/g,"")}`);a&&this.view.updateDrugValuesUI(a,t,this.weightKg)}}updateSummaryAndFluids(){const t=this.drugs.filter(s=>s.selected),a=this.weightKg*5;this.view.renderSummary(t,this.weightKg,a),this.view.updateDetailPanel(this.weightKg,this.asaStatus,t.length,a)}destroy(){this.destroyPremiumBadge(),console.log("[AnesthesiaController] Destroyed")}}const Cs=`
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
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
`;class _s{constructor(){m(this,"drugInput",null);m(this,"weightInput",null);m(this,"dosageInput",null);m(this,"concentrationInput",null);m(this,"calculateBtn",null);m(this,"resultContainer",null);m(this,"resultVolumeSpan",null);m(this,"resultDosageSpan",null);m(this,"logBtn",null);m(this,"detailWeight",null);m(this,"detailDosage",null);m(this,"detailConcentration",null);m(this,"detailVolume",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Cs),this.cacheElements()}cacheElements(){this.drugInput=document.getElementById("drug-name"),this.weightInput=document.getElementById("weight"),this.dosageInput=document.getElementById("dosage"),this.concentrationInput=document.getElementById("concentration"),this.calculateBtn=document.getElementById("calculate-btn"),this.resultContainer=document.getElementById("result-container"),this.resultVolumeSpan=document.getElementById("result-volume"),this.resultDosageSpan=document.getElementById("result-dosage"),this.logBtn=document.getElementById("log-btn"),this.detailWeight=document.getElementById("detail-weight"),this.detailDosage=document.getElementById("detail-dosage"),this.detailConcentration=document.getElementById("detail-concentration"),this.detailVolume=document.getElementById("detail-volume")}getDrugName(){var e;return((e=this.drugInput)==null?void 0:e.value)||""}getWeight(){var t;const e=(t=this.weightInput)==null?void 0:t.value;return e?parseFloat(e):0}getDosageMgPerKg(){var t;const e=(t=this.dosageInput)==null?void 0:t.value;return e?parseFloat(e):0}getConcentrationMgPerMl(){var t;const e=(t=this.concentrationInput)==null?void 0:t.value;return e?parseFloat(e):0}setDrugName(e){this.drugInput&&(this.drugInput.value=e)}setWeight(e){this.weightInput&&(this.weightInput.value=e.toString())}setDosage(e){this.dosageInput&&(this.dosageInput.value=e.toString())}setConcentration(e){this.concentrationInput&&(this.concentrationInput.value=e.toString())}showResult(e,t){this.resultContainer&&(this.resultContainer.classList.remove("hidden"),this.resultContainer.style.opacity="1",this.resultContainer.style.transform="translateY(0)"),this.resultVolumeSpan&&(this.resultVolumeSpan.textContent=`${t.toFixed(2)} mL`),this.resultDosageSpan&&(this.resultDosageSpan.textContent=`Dosis: ${e.toFixed(2)} mg total`);const a=this.getWeight(),s=this.getDosageMgPerKg(),r=this.getConcentrationMgPerMl();this.detailWeight&&(this.detailWeight.textContent=`${a.toFixed(1)} kg`),this.detailDosage&&(this.detailDosage.textContent=`${s.toFixed(2)} mg/kg`),this.detailConcentration&&(this.detailConcentration.textContent=`${r.toFixed(1)} mg/mL`),this.detailVolume&&(this.detailVolume.textContent=`${t.toFixed(2)} mL`)}hideResult(){this.resultContainer&&(this.resultContainer.classList.add("hidden"),this.resultContainer.style.opacity="0",this.resultContainer.style.transform="translateY(20px)")}getCalculateButton(){return this.calculateBtn}getLogButton(){return this.logBtn}highlightDrugInput(e){this.drugInput&&(e?this.drugInput.classList.add("border-primary","ring-2","ring-primary/30"):this.drugInput.classList.remove("border-primary","ring-2","ring-primary/30"))}}async function As(n){const e={...n,createdAt:new Date};await W.calculationHistory.add(e)}class Bs extends X{constructor(){super();m(this,"view");this.view=new _s}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.view.setWeight(28.5),this.view.setDosage(5),this.view.setConcentration(50),this.view.hideResult()}setupEventListeners(){const t=this.view.getCalculateButton();t==null||t.addEventListener("click",()=>{this.calculate(),t.classList.add("scale-95"),setTimeout(()=>t.classList.remove("scale-95"),150)});const a=this.view.getLogButton();a==null||a.addEventListener("click",()=>{this.saveToHistory()});const s=document.getElementById("drug-name");s==null||s.addEventListener("input",r=>{const i=r.target;this.view.highlightDrugInput(i.value.length>0)})}calculate(){const t=this.view.getWeight(),a=this.view.getDosageMgPerKg(),s=this.view.getConcentrationMgPerMl();if(t<=0||a<=0||s<=0){alert("Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.");return}const r=t*a,i=r/s;this.view.showResult(r,i)}async saveToHistory(){const t=this.view.getWeight(),a=this.view.getDosageMgPerKg(),s=this.view.getConcentrationMgPerMl(),r=this.view.getDrugName()||"Medicamento";if(t<=0||a<=0||s<=0){alert("Primero realice un cálculo válido antes de guardar.");return}const i=t*a,o=i/s;await As({type:"dosage",patientName:"Paciente (sin nombre)",patientWeightKg:t,inputs:{weight:t,dosePerKg:a,concentration:s,drug:r},result:{totalMg:i,volumeMl:o},summary:`${r} — ${i.toFixed(2)} mg · ${o.toFixed(2)} mL`}),alert("Cálculo guardado en el historial.")}destroy(){this.destroyPremiumBadge(),console.log("[DosageController] Destroyed")}}const Ps=`
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
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
`;class Ss{constructor(){m(this,"weightInput",null);m(this,"dehydrationInput",null);m(this,"dehydrationValueSpan",null);m(this,"maintenanceInput",null);m(this,"lossesInput",null);m(this,"totalVolumeSpan",null);m(this,"hourlyRateSpan",null);m(this,"dripRateSpan",null);m(this,"dripButtons",null);m(this,"maintenancePresetBtns",null);m(this,"saveBtn",null);m(this,"reportBtn",null);m(this,"deficitDetail",null);m(this,"maintenanceDetail",null);m(this,"lossesDetail",null);m(this,"dripFactorDetail",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ps),this.cacheElements()}cacheElements(){this.weightInput=document.getElementById("weight"),this.dehydrationInput=document.getElementById("dehydration"),this.dehydrationValueSpan=document.getElementById("dehydration-value"),this.maintenanceInput=document.getElementById("maintenance"),this.lossesInput=document.getElementById("losses"),this.totalVolumeSpan=document.getElementById("total-volume"),this.hourlyRateSpan=document.getElementById("hourly-rate"),this.dripRateSpan=document.getElementById("drip-rate"),this.dripButtons=document.querySelectorAll(".drip-btn"),this.maintenancePresetBtns=document.querySelectorAll("[data-maintenance]"),this.saveBtn=document.getElementById("save-btn"),this.reportBtn=document.getElementById("report-btn"),this.deficitDetail=document.getElementById("deficit-detail"),this.maintenanceDetail=document.getElementById("maintenance-detail"),this.lossesDetail=document.getElementById("losses-detail"),this.dripFactorDetail=document.getElementById("drip-factor-detail")}getWeight(){var e;return parseFloat(((e=this.weightInput)==null?void 0:e.value)||"0")}getDehydrationPercent(){var e;return parseFloat(((e=this.dehydrationInput)==null?void 0:e.value)||"0")}getMaintenance(){var e;return parseFloat(((e=this.maintenanceInput)==null?void 0:e.value)||"0")}getLosses(){var e;return parseFloat(((e=this.lossesInput)==null?void 0:e.value)||"0")}setDehydrationDisplay(e){this.dehydrationValueSpan&&(this.dehydrationValueSpan.textContent=`${e}%`)}updateResults(e,t,a){this.totalVolumeSpan&&(this.totalVolumeSpan.textContent=e.toFixed(1)),this.hourlyRateSpan&&(this.hourlyRateSpan.textContent=t.toFixed(1)),this.dripRateSpan&&(this.dripRateSpan.textContent=Math.round(a).toString())}updateDetailPanel(e,t,a,s){this.deficitDetail&&(this.deficitDetail.textContent=`${e.toFixed(1)} ml`),this.maintenanceDetail&&(this.maintenanceDetail.textContent=`${t.toFixed(1)} ml`),this.lossesDetail&&(this.lossesDetail.textContent=`${a.toFixed(1)} ml`),this.dripFactorDetail&&(this.dripFactorDetail.textContent=`${s} gotas/ml`)}onWeightInput(e){var t;(t=this.weightInput)==null||t.addEventListener("input",e)}onDehydrationInput(e){var t;(t=this.dehydrationInput)==null||t.addEventListener("input",e)}onMaintenanceInput(e){var t;(t=this.maintenanceInput)==null||t.addEventListener("input",e)}onLossesInput(e){var t;(t=this.lossesInput)==null||t.addEventListener("input",e)}onDripButtonClick(e){var t;(t=this.dripButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var r;const s=parseInt(a.getAttribute("data-drip")||"15");e(s),(r=this.dripButtons)==null||r.forEach(i=>{i.classList.remove("border-primary","bg-primary-container/20","text-primary"),i.classList.add("border-transparent","bg-surface-container-high","text-on-surface-variant")}),a.classList.add("border-primary","bg-primary-container/20","text-primary"),a.classList.remove("border-transparent","bg-surface-container-high","text-on-surface-variant")})})}onMaintenancePreset(e){var t;(t=this.maintenancePresetBtns)==null||t.forEach(a=>{a.addEventListener("click",()=>{const s=parseInt(a.getAttribute("data-maintenance")||"0");e(s)})})}onSave(e){var t;(t=this.saveBtn)==null||t.addEventListener("click",e)}onReport(e){var t;(t=this.reportBtn)==null||t.addEventListener("click",e)}}class Ds extends X{constructor(){super();m(this,"view");m(this,"currentDripFactor",15);this.view=new Ss}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.calculate()}setupEventListeners(){this.view.onWeightInput(()=>this.calculate()),this.view.onDehydrationInput(()=>{const t=this.view.getDehydrationPercent();this.view.setDehydrationDisplay(t),this.calculate()}),this.view.onMaintenanceInput(()=>this.calculate()),this.view.onLossesInput(()=>this.calculate()),this.view.onDripButtonClick(t=>{this.currentDripFactor=t,this.calculate()}),this.view.onMaintenancePreset(t=>{const a=document.getElementById("maintenance");a&&(a.value=t.toString(),this.calculate())}),this.view.onSave(()=>{alert("Protocolo guardado (simulación)"),console.log("Fluidoterapia guardada")}),this.view.onReport(()=>{console.log("Generar reporte PDF"),alert("Función de reporte en desarrollo")})}calculate(){const t=this.view.getWeight(),a=this.view.getDehydrationPercent(),s=this.view.getMaintenance(),r=this.view.getLosses(),i=t*a*10,o=t*s,l=i+o+r,d=l/24,c=d*this.currentDripFactor/60;this.view.updateResults(l,d,c),this.view.updateDetailPanel(i,o,r,this.currentDripFactor)}destroy(){this.destroyPremiumBadge(),console.log("[FluidotherapyController] Destroyed")}}const Rs=`
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
  </a>

  <a class="flex flex-col items-center justify-center text-primary font-bold border-t-2 border-primary pt-2 -translate-y-1 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md active:scale-95 group" href="#" data-route="history">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">history</span>
    <span class="font-label-sm text-label-sm mt-0.5">Historial</span>
    <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></span>
  </a>

</nav>
`;class Fs{constructor(){m(this,"historyContainer",null);m(this,"filterButtons",null);m(this,"loadMoreBtn",null);m(this,"searchFab",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Rs),this.cacheElements()}cacheElements(){this.historyContainer=document.getElementById("history-list"),this.filterButtons=document.querySelectorAll("#filter-buttons button"),this.loadMoreBtn=document.getElementById("load-more-btn"),this.searchFab=document.getElementById("search-fab")}getHistoryContainer(){return this.historyContainer}getFilterButtons(){return this.filterButtons}getLoadMoreButton(){return this.loadMoreBtn}getSearchFab(){return this.searchFab}renderHistoryList(e,t){if(!this.historyContainer)return;if(e.length===0){this.historyContainer.innerHTML=`
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;return}const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()-1);const r=e.filter(d=>new Date(d.timestamp)>=a),i=e.filter(d=>{const c=new Date(d.timestamp);return c<a&&c>=s}),o=e.filter(d=>new Date(d.timestamp)<s);let l="";r.length&&(l+='<div class="flex items-center gap-2 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(r)),i.length&&(l+='<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(i)),o.length&&(l+='<div class="flex items-center gap-2 mt-6 mb-3"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(o)),this.historyContainer.innerHTML=l,document.querySelectorAll(".history-card").forEach(d=>{d.addEventListener("click",c=>{const p=d.getAttribute("data-id");console.log(`[History] Ver detalle de registro: ${p}`)})})}renderRecordGroup(e){return e.map(t=>{const a=this.getIconForType(t.type),s=this.getBorderColorForType(t.type),r=this.getBgClassForType(t.type),i=this.getTextColorClassForType(t.type),o=this.getRelativeTime(t.timestamp),l=t.isPremium?`<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>`:"";return`
        <div class="history-card bg-white border border-outline-variant/30 border-l-4 ${s} rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-id="${t.id}">
          <div class="h-12 w-12 rounded-lg ${r} flex items-center justify-center ${i} flex-shrink-0">
            <span class="material-symbols-outlined">${a}</span>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex justify-between items-start gap-2 flex-wrap">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface truncate">${this.escapeHtml(t.title)}</h3>
                ${l}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap">${o}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px] truncate">Paciente: ${this.escapeHtml(t.patientName)} (${t.species}, ${t.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface max-w-full overflow-hidden whitespace-nowrap text-ellipsis">${this.escapeHtml(t.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant flex-shrink-0">chevron_right</span>
        </div>
      `}).join("")}getBorderColorForType(e){switch(e){case"dosage":return"border-l-primary";case"fluidotherapy":return"border-l-secondary";case"anesthesia":return"border-l-tertiary";default:return"border-l-outline"}}getIconForType(e){switch(e){case"dosage":return"medication";case"fluidotherapy":return"water_drop";case"anesthesia":return"vital_signs";default:return"history"}}getBgClassForType(e){switch(e){case"dosage":return"bg-secondary-container";case"fluidotherapy":return"bg-surface-container";case"anesthesia":return"bg-tertiary-container";default:return"bg-surface-container"}}getTextColorClassForType(e){switch(e){case"dosage":return"text-on-secondary-container";case"fluidotherapy":return"text-primary";case"anesthesia":return"text-on-tertiary-container";default:return"text-on-surface-variant"}}getRelativeTime(e){const a=new Date().getTime()-e.getTime(),s=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return s<1?"Justo ahora":s<60?`Hace ${s} min`:r<24?`Hace ${r} h`:i===1?"Ayer":`Hace ${i} días`}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}setActiveFilter(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.getAttribute("data-filter")===e?(a.classList.remove("bg-white/80","text-on-surface-variant","border","border-outline-variant"),a.classList.add("bg-secondary","text-white","shadow-sm")):(a.classList.remove("bg-secondary","text-white","shadow-sm"),a.classList.add("bg-white/80","text-on-surface-variant","border","border-outline-variant"))})}}class Ms extends X{constructor(){super();m(this,"view");m(this,"allRecords",[]);m(this,"currentFilter","all");this.view=new Fs}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),await this.loadHistory(),this.setupEventListeners(),this.applyFilter()}async loadHistory(){this.allRecords=await W.calculationHistory.orderBy("createdAt").reverse().toArray()}getTitleForType(t){switch(t){case"dosage":return"Cálculo de Dosis";case"fluidotherapy":return"Fluidoterapia";case"anesthesia":return"Protocolo de Anestesia";case"converter":return"Conversión";default:return"Cálculo"}}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(r=>{r.addEventListener("click",async i=>{i.preventDefault();const o=r.getAttribute("data-route");o&&await K.navigate(o)})});const t=this.view.getFilterButtons();t==null||t.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-filter")||"all";this.currentFilter=i,this.view.setActiveFilter(i),this.applyFilter()})});const a=this.view.getLoadMoreButton();a==null||a.addEventListener("click",()=>{console.log("Cargar más registros - por implementar")});const s=this.view.getSearchFab();s==null||s.addEventListener("click",()=>{console.log("Búsqueda - por implementar")})}applyFilter(){let t=[...this.allRecords];this.currentFilter!=="all"&&(t=t.filter(s=>s.type===this.currentFilter));const a=t.map(s=>({id:s.id.toString(),type:s.type,title:this.getTitleForType(s.type),patientName:s.patientName||"Desconocido",species:s.patientSpecies||"N/A",weightKg:s.patientWeightKg||0,timestamp:s.createdAt,summary:s.summary,detail:JSON.stringify(s.result),isPremium:s.type==="anesthesia"}));this.view.renderHistoryList(a,this.currentFilter)}destroy(){this.destroyPremiumBadge(),console.log("[HistoryController] Destroyed")}}const Ts=`
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
`;class Os{constructor(){m(this,"petInput",null);m(this,"dateInput",null);m(this,"timeInput",null);m(this,"descInput",null);m(this,"addBtn",null);m(this,"appointmentsList",null);m(this,"emptyState",null);m(this,"countSpan",null);m(this,"filterButtons",null);m(this,"deleteCallback",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ts),this.cacheElements()}cacheElements(){this.petInput=document.getElementById("appointment-pet"),this.dateInput=document.getElementById("appointment-date"),this.timeInput=document.getElementById("appointment-time"),this.descInput=document.getElementById("appointment-desc"),this.addBtn=document.getElementById("add-appointment-btn"),this.appointmentsList=document.getElementById("appointments-list"),this.emptyState=document.getElementById("empty-state"),this.countSpan=document.getElementById("appointment-count"),this.filterButtons=document.querySelectorAll(".filter-btn")}getAppointmentData(){var e,t,a,s;return{petName:((e=this.petInput)==null?void 0:e.value)||"",date:((t=this.dateInput)==null?void 0:t.value)||"",time:((a=this.timeInput)==null?void 0:a.value)||"",description:((s=this.descInput)==null?void 0:s.value)||""}}clearForm(){this.petInput&&(this.petInput.value=""),this.dateInput&&(this.dateInput.value=""),this.timeInput&&(this.timeInput.value=""),this.descInput&&(this.descInput.value="")}renderAppointments(e,t){if(!(!this.appointmentsList||!this.emptyState||!this.countSpan)){if(e.length===0){this.appointmentsList.innerHTML="",this.emptyState.style.display="block",this.countSpan.textContent="0 citas";return}this.emptyState.style.display="none",this.countSpan.textContent=`${e.length} cita${e.length>1?"s":""}`,this.appointmentsList.innerHTML=e.map(a=>`
      <div class="appointment-item bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4" data-id="${a.id}">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-headline-md text-headline-md text-on-surface">${this.escapeHtml(a.petName)}</span>
            <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">${a.date}</span>
            <span class="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold">${a.time}</span>
          </div>
          ${a.description?`<p class="text-on-surface-variant text-sm mt-1">${this.escapeHtml(a.description)}</p>`:""}
        </div>
        <button class="delete-btn p-2 rounded-full hover:bg-error/10 text-error transition-all" data-id="${a.id}">
          <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    `).join(""),this.deleteCallback&&this.appointmentsList.querySelectorAll(".delete-btn").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();const r=a.getAttribute("data-id");r&&this.deleteCallback&&this.deleteCallback(r)})})}}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}onAddAppointment(e){var t;(t=this.addBtn)==null||t.addEventListener("click",e)}onDeleteAppointment(e){this.deleteCallback=e}onFilterChange(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var r;const s=a.getAttribute("data-filter")||"all";(r=this.filterButtons)==null||r.forEach(i=>{i.classList.remove("bg-secondary","text-white"),i.classList.add("bg-white/80","text-on-surface-variant","border","border-outline-variant")}),a.classList.remove("bg-white/80","text-on-surface-variant","border","border-outline-variant"),a.classList.add("bg-secondary","text-white"),e(s)})})}setDefaultDate(){if(this.dateInput){const e=new Date().toISOString().split("T")[0];this.dateInput.value=e}}}class Ns extends X{constructor(){super();m(this,"view");m(this,"appointments",[]);m(this,"currentFilter","all");this.view=new Os}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),await this.loadAppointments(),this.view.setDefaultDate(),this.setupEventListeners(),this.applyFilter()}async loadAppointments(){this.appointments=await W.appointments.toArray()}async addAppointment(t){const a={petName:t.petName,date:t.date,time:t.time,description:t.description||"Sin descripción",createdAt:new Date};await W.appointments.add(a),await this.loadAppointments()}async deleteAppointment(t){await W.appointments.delete(t),await this.loadAppointments()}setupEventListeners(){this.view.onAddAppointment(async()=>{const t=this.view.getAppointmentData();if(!t.petName||!t.date||!t.time){alert("Por favor completa los campos obligatorios (mascota, fecha y hora).");return}await this.addAppointment(t),this.view.clearForm(),this.applyFilter()}),this.view.onDeleteAppointment(async t=>{const a=parseInt(t,10);isNaN(a)||(await this.deleteAppointment(a),this.applyFilter())}),this.view.onFilterChange(t=>{this.currentFilter=t,this.applyFilter()})}applyFilter(){const t=new Date().toISOString().split("T")[0];let a=[...this.appointments];switch(this.currentFilter){case"today":a=a.filter(r=>r.date===t);break;case"upcoming":a=a.filter(r=>r.date>t);break;case"past":a=a.filter(r=>r.date<t);break}a.sort((r,i)=>r.date.localeCompare(i.date)||r.time.localeCompare(i.time));const s=a.map(r=>({id:r.id.toString(),petName:r.petName,date:r.date,time:r.time,description:r.description,createdAt:r.createdAt}));this.view.renderAppointments(s,this.currentFilter)}destroy(){this.destroyPremiumBadge(),console.log("[LibraryController] Destroyed")}}const js=`
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
  <!-- ===== MODAL PARA AÑADIR PACIENTE ===== -->
  <div id="add-patient-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden animate-fade-in-up">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-outline-variant">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-headline-md text-headline-md text-on-surface">Nuevo Paciente</h3>
        <button id="close-modal-btn" class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <form id="add-patient-form" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Nombre</label>
          <input type="text" id="patient-name" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Nombre de la mascota">
        </div>

        <!-- Especie -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Especie</label>
          <select id="patient-species" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all">
            <option value="canine">Perro</option>
            <option value="feline">Gato</option>
            <option value="equine">Caballo</option>
            <option value="bovine">Vaca</option>
            <option value="avian">Ave</option>
            <option value="exotic">Exótico</option>
          </select>
        </div>

        <!-- Raza -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Raza</label>
          <input type="text" id="patient-breed" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Ej: Golden Retriever">
        </div>

        <!-- Edad (NUEVO) -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Edad (meses)</label>
          <input type="number" id="patient-age" step="1" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="0">
        </div>

        <!-- Peso -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Peso (kg)</label>
          <input type="number" id="patient-weight" step="0.1" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="0.0">
        </div>

        <!-- Propietario -->
        <div>
          <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1">Propietario</label>
          <input type="text" id="patient-owner" class="w-full h-touch-target-min px-4 bg-white/50 border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Nombre del propietario">
        </div>

        <button type="submit" class="w-full bg-primary text-white h-touch-target-min rounded-xl font-headline-md shadow-sm hover:shadow-md transition-all">Guardar Paciente</button>
      </form>
    </div>
  </div>
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

  <!-- Citas -->
  <a class="flex flex-col items-center justify-center text-on-surface-variant pt-2 transition-all duration-300 ease-out hover:text-primary hover:-translate-y-1 hover:bg-primary/5 rounded-lg px-3 active:scale-95 group" href="#" data-route="library">
    <span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
    <span class="font-label-sm text-label-sm mt-0.5">Citas</span>
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
`;class Ks{constructor(){m(this,"searchInput",null);m(this,"patientsList",null);m(this,"activeCasesSpan",null);m(this,"inSurgerySpan",null);m(this,"seeAllBtn",null);m(this,"addPatientBtn",null);m(this,"modal",null);m(this,"closeModalBtn",null);m(this,"form",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=js),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.patientsList=document.getElementById("patients-list"),this.activeCasesSpan=document.getElementById("active-cases"),this.inSurgerySpan=document.getElementById("in-surgery"),this.seeAllBtn=document.getElementById("see-all-btn"),this.addPatientBtn=document.getElementById("add-patient-btn"),this.modal=document.getElementById("add-patient-modal"),this.closeModalBtn=document.getElementById("close-modal-btn"),this.form=document.getElementById("add-patient-form")}getSearchInput(){return this.searchInput}getSeeAllBtn(){return this.seeAllBtn}getAddPatientBtn(){return this.addPatientBtn}updateStats(e,t){this.activeCasesSpan&&(this.activeCasesSpan.textContent=e.toString()),this.inSurgerySpan&&(this.inSurgerySpan.textContent=t.toString())}renderPatients(e,t){var a;if(this.patientsList){this.patientsList.innerHTML="";for(const s of e){const r=document.createElement("div");r.className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden",r.setAttribute("data-id",s.id);const i=(s.species==="canine"||s.species==="feline","pets"),o=s.status==="stable"?"bg-secondary-container text-on-secondary-container":s.status==="in-surgery"?"bg-error-container text-on-error-container":"bg-surface-container-highest text-on-surface-variant",l=s.status==="stable"?"Estable":s.status==="in-surgery"?"En cirugía":s.status==="critical"?"Crítico":s.status==="discharged"?"Dado de alta":"Observación";r.innerHTML=`
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
      `,r.addEventListener("click",()=>t(s.id)),(a=this.patientsList)==null||a.appendChild(r)}}}filterPatients(e,t,a){const s=t.filter(r=>r.name.toLowerCase().includes(e)||r.breed.toLowerCase().includes(e)||r.ownerName.toLowerCase().includes(e));a(s)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}showModal(){this.modal&&this.modal.classList.remove("hidden")}hideModal(){this.modal&&this.modal.classList.add("hidden")}onAddPatientSubmit(e){var t;(t=this.form)==null||t.addEventListener("submit",a=>{var c,p,u,h,v,g;a.preventDefault();const s=((c=document.getElementById("patient-name"))==null?void 0:c.value)||"",r=((p=document.getElementById("patient-species"))==null?void 0:p.value)||"canine",i=((u=document.getElementById("patient-breed"))==null?void 0:u.value)||"",o=parseFloat(((h=document.getElementById("patient-age"))==null?void 0:h.value)||"0"),l=parseFloat(((v=document.getElementById("patient-weight"))==null?void 0:v.value)||"0"),d=((g=document.getElementById("patient-owner"))==null?void 0:g.value)||"";e({name:s,species:r,breed:i,ageMonths:o,weight:l,owner:d}),this.hideModal(),this.clearForm()})}clearForm(){document.getElementById("patient-name").value="",document.getElementById("patient-breed").value="",document.getElementById("patient-weight").value="",document.getElementById("patient-owner").value=""}onAddButtonClick(e){const t=document.getElementById("add-patient-btn");t==null||t.addEventListener("click",e)}}class Hs extends X{constructor(){super();m(this,"view");m(this,"patients",[]);this.view=new Ks}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),await this.loadPatients(),this.setupEventListeners(),this.setupModalEvents()}async loadPatients(){this.patients=await W.patients.toArray(),this.updateStatsAndRender()}updateStatsAndRender(){const t=this.patients.filter(r=>r.status!=="discharged").length,a=this.patients.filter(r=>r.status==="in-surgery").length;this.view.updateStats(t,a);const s=this.patients.map(r=>({...r,id:r.id.toString(),species:r.species}));this.view.renderPatients(s,r=>this.onPatientClick(r))}setupEventListeners(){const t=this.view.getSearchInput();t==null||t.addEventListener("input",r=>{const i=r.target.value.toLowerCase(),l=this.patients.filter(d=>d.name.toLowerCase().includes(i)||d.breed.toLowerCase().includes(i)||d.ownerName.toLowerCase().includes(i)).map(d=>({...d,id:d.id.toString(),species:d.species}));this.view.renderPatients(l,d=>this.onPatientClick(d))});const a=this.view.getSeeAllBtn();a==null||a.addEventListener("click",()=>{alert('Funcionalidad "Ver todos" en desarrollo')});const s=this.view.getAddPatientBtn();s==null||s.addEventListener("click",()=>{this.view.showModal()})}setupModalEvents(){const t=document.getElementById("close-modal-btn");t==null||t.addEventListener("click",()=>{this.view.hideModal()});const a=document.getElementById("add-patient-modal");a==null||a.addEventListener("click",s=>{s.target===a&&this.view.hideModal()}),this.view.onAddPatientSubmit(async s=>{const r={name:s.name,species:s.species,breed:s.breed,weightKg:s.weight,ageMonths:s.ageMonths||0,ownerName:s.owner,status:"stable",observations:"",createdAt:new Date,updatedAt:new Date};await W.patients.add(r),await this.loadPatients()})}onPatientClick(t){console.log(`[Patients] Ver detalle de paciente: ${t}`),alert(`Detalle del paciente (simulación) - ID: ${t}`)}destroy(){this.destroyPremiumBadge(),console.log("[PatientsController] Destroyed")}}const Vs=`
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
`;class zs{constructor(){m(this,"monthlyBtn",null);m(this,"annualBtn",null);m(this,"pricingLabel",null);m(this,"pricingPeriod",null);m(this,"upgradeBtn",null);m(this,"restoreBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Vs),this.cacheElements()}cacheElements(){this.monthlyBtn=document.getElementById("monthly-toggle"),this.annualBtn=document.getElementById("annual-toggle"),this.pricingLabel=document.getElementById("pricing-label"),this.pricingPeriod=document.getElementById("pricing-period"),this.upgradeBtn=document.getElementById("upgrade-btn"),this.restoreBtn=document.getElementById("restore-btn")}getMonthlyBtn(){return this.monthlyBtn}getAnnualBtn(){return this.annualBtn}getPricingLabel(){return this.pricingLabel}getPricingPeriod(){return this.pricingPeriod}getUpgradeBtn(){return this.upgradeBtn}getRestoreBtn(){return this.restoreBtn}setMonthlyActive(){var e,t,a,s;(e=this.monthlyBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.monthlyBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.annualBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.annualBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$9.99"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ mes")}setAnnualActive(){var e,t,a,s;(e=this.annualBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.annualBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.monthlyBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.monthlyBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$95.88"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ año")}}class qs{constructor(){m(this,"view");this.view=new zs}async init(){this.view.render(),this.setupNavigation(),this.setupEventListeners()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await K.navigate(a)})})}setupEventListeners(){const e=this.view.getMonthlyBtn(),t=this.view.getAnnualBtn();e==null||e.addEventListener("click",()=>this.view.setMonthlyActive()),t==null||t.addEventListener("click",()=>this.view.setAnnualActive());const a=this.view.getUpgradeBtn();a==null||a.addEventListener("click",()=>{alert("Funcionalidad de pago en desarrollo. Esta es una simulación."),console.log("Iniciar proceso de suscripción Pro")});const s=this.view.getRestoreBtn();s==null||s.addEventListener("click",()=>{alert("Restauración de compra simulada"),console.log("Restaurar compra")})}destroy(){console.log("[PremiumController] Destroyed")}}const Us=`
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
`;class $s{constructor(){m(this,"emailInput",null);m(this,"passwordInput",null);m(this,"loginBtn",null);m(this,"registerLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Us),this.cacheElements()}cacheElements(){this.emailInput=document.getElementById("login-email"),this.passwordInput=document.getElementById("login-password"),this.loginBtn=document.getElementById("login-btn"),this.registerLink=document.getElementById("go-to-register")}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}onLoginClick(e){var t;(t=this.loginBtn)==null||t.addEventListener("click",e)}onRegisterLinkClick(e){var t;(t=this.registerLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}class Gs extends X{constructor(){super();m(this,"view");this.view=new $s}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onLoginClick(async()=>{const t=this.view.getEmail(),a=this.view.getPassword(),s=await et.login(t,a);s.success?await K.navigate("home"):this.view.showError(s.message)}),this.view.onRegisterLinkClick(async()=>{await K.navigate("register")})}destroy(){console.log("[LoginController] Destroyed")}}const Ws=`
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
`;class Js{constructor(){m(this,"nameInput",null);m(this,"emailInput",null);m(this,"passwordInput",null);m(this,"confirmInput",null);m(this,"registerBtn",null);m(this,"loginLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ws),this.cacheElements()}cacheElements(){this.nameInput=document.getElementById("reg-name"),this.emailInput=document.getElementById("reg-email"),this.passwordInput=document.getElementById("reg-password"),this.confirmInput=document.getElementById("reg-confirm"),this.registerBtn=document.getElementById("register-btn"),this.loginLink=document.getElementById("go-to-login")}getName(){var e;return((e=this.nameInput)==null?void 0:e.value)||""}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}getConfirm(){var e;return((e=this.confirmInput)==null?void 0:e.value)||""}onRegisterClick(e){var t;(t=this.registerBtn)==null||t.addEventListener("click",e)}onLoginLinkClick(e){var t;(t=this.loginLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}class Ys extends X{constructor(){super();m(this,"view");this.view=new Js}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onRegisterClick(async()=>{const t=this.view.getName(),a=this.view.getEmail(),s=this.view.getPassword(),r=this.view.getConfirm();if(!t||!a||!s){this.view.showError("Todos los campos son obligatorios");return}if(s!==r){this.view.showError("Las contraseñas no coinciden");return}const i=await et.register(a,s,t);i.success?(alert("Registro exitoso. Ahora inicia sesión."),await K.navigate("login")):this.view.showError(i.message)}),this.view.onLoginLinkClick(async()=>{await K.navigate("login")})}destroy(){console.log("[RegisterController] Destroyed")}}let ze=null;function pa(){ze&&(ze.destroy(),ze=null)}function Fn(n,e){K.register(n,async()=>{pa();const t=e();ze=t,await t.init()})}function ee(n,e){K.register(n,async()=>{if(!et.isLoggedIn()){await K.navigate("login");return}pa();const t=e();ze=t,await t.init()})}class Xs{async init(){if(K.register("splash",async()=>{await new va().init()}),Fn("login",()=>new Gs),Fn("register",()=>new Ys),ee("home",()=>new ys),ee("patients",()=>new Hs),ee("library",()=>new Ns),ee("history",()=>new Ms),ee("fluidotherapy",()=>new Ds),ee("dosage",()=>new Bs),ee("converter",()=>new Es),ee("anesthesia",()=>new Ls),ee("premium",()=>new qs),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("[SW] OK",t)).catch(t=>console.log("[SW] ERROR",t))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await K.navigate("splash");else{let t=K.resolveInitialRoute();!et.isLoggedIn()&&t!=="splash"&&t!=="login"&&t!=="register"&&(t="login"),await K.navigate(t)}}}new Xs().init();
