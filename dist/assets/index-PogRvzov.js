(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class b{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(a){console.error(`[Router] Error in ${e}:`,a),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const u=new b,y=`
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
`;class v{constructor(){Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"messageElement",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=y),document.body.classList.add("splash-body"),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const p=2800,f=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],h=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class x{constructor(){Object.defineProperty(this,"view",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"progress",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"messageIndex",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"intervalId",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.view=new v}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const a=Date.now()-t;this.progress=Math.min(100,a/p*100),this.view.updateProgress(this.progress),Math.floor(a/700)>this.messageIndex&&this.messageIndex<f.length-1&&(this.messageIndex++,this.view.updateMessage(f[this.messageIndex])),a>=p&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await u.navigate("home")}}const w=`
<!-- Barra superior -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">VetCalc</h1>
  </div>
  <div class="flex items-center gap-4">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-on-surface-variant">search</span>
    </button>
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors">
      <span class="material-symbols-outlined text-primary">account_circle</span>
    </button>
  </div>
</header>

<main class="px-container-padding pt-6 space-y-stack-lg">
  <!-- Sección de bienvenida -->
  <section class="space-y-1">
    <p class="font-label-md text-label-md text-on-surface-variant">Panel Clínico</p>
    <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Hola, Dr. Smith</h2>
    <div class="w-12 h-1 bg-secondary rounded-full mt-2"></div>
  </section>

  <!-- Cuadrícula de módulos -->
  <div class="bento-grid">
    <!-- Fluidoterapia -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left border-l-4 border-l-primary group" data-route="fluidotherapy">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">water_drop</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Tasas IV y déficits</p>
      </div>
    </button>

    <!-- Calculadora de Dosis -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="dosage">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">medication</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Dosificación precisa mg/kg</p>
      </div>
    </button>

    <!-- Anestesia (Premium) -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left relative border-2 border-tertiary/20 bg-gradient-to-br from-surface to-tertiary-container/10 group" data-route="anesthesia">
      <div class="absolute top-4 right-4">
        <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed">
        <span class="material-symbols-outlined text-3xl">air</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Protocolos y CRI</p>
      </div>
    </button>

    <!-- Convertidor -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="converter">
      <div class="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
        <span class="material-symbols-outlined text-3xl">sync_alt</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Peso, Temp, Vol</p>
      </div>
    </button>

    <!-- Biblioteca -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="library">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant">
        <span class="material-symbols-outlined text-3xl">menu_book</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Guías de referencia</p>
      </div>
    </button>

    <!-- Pacientes -->
    <button class="glass-card p-5 rounded-xl shadow-sm flex flex-col items-start gap-4 active:scale-95 transition-all duration-150 text-left group" data-route="patients">
      <div class="p-3 bg-surface-container-highest rounded-lg text-on-surface-variant">
        <span class="material-symbols-outlined text-3xl">pets</span>
      </div>
      <div>
        <h3 class="font-label-md text-label-md text-on-surface font-bold">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Casos activos</p>
      </div>
    </button>
  </div>

  <!-- Historial reciente -->
  <section class="space-y-stack-md pb-8">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Historial Reciente</h3>
      <button class="text-primary font-label-md text-label-md hover:underline" id="view-all-history">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-history-container"></div>
  </section>

  <!-- Sección de pacientes recientes (insertada dinámicamente) -->
  <section id="recent-patients-section" class="space-y-stack-md pb-8" style="display: none;">
    <div class="flex justify-between items-center">
      <h3 class="font-headline-md text-headline-md text-on-surface">Pacientes Recientes</h3>
      <button class="text-primary font-label-md text-label-md hover:underline" id="view-all-patients">Ver todos</button>
    </div>
    <div class="space-y-3" id="recent-patients-container"></div>
  </section>

  <!-- Imagen y consejo del día -->
  <section class="w-full h-48 rounded-2xl overflow-hidden relative group">
    <img alt="Veterinary Professional" class="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA69r3HcXl5I7vAA1BAILE3wxSpjR_JmOCfU9yaCMrKgcq0G4wmieTfJ4oMFkYXLoscW3PLjv7N7GpdylIqY1Kpdj19BPZjlS-xNjZHWge6GXBq8NFzKgOnsxboKYYE-BOTaK0Ygm4aTttgpoo8fBWxfWILd50Z58gyfcQzHNlMtHFn3DED_3kz6atbUO06Ts_evj-ohgqiJIyQRTkRtlesNIBVgGhfS9tBKt-XS8KNa6mdtb6Tf-TJAV2T9r4HD7rp9OAlGxJEwM1n"/>
    <div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
    <div class="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl">
      <p class="font-label-md text-label-md text-primary font-bold">Consejo del día</p>
      <p class="font-body-md text-body-md text-on-surface" id="tip-of-the-day">Verifique el estado de hidratación antes de calcular los déficits de fluidos.</p>
    </div>
  </section>
</main>

<!-- Barra de navegación inferior (5 pestañas) -->
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
`;class P{constructor(){Object.defineProperty(this,"recentHistoryContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"tipElement",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsSection",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=w),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section")}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const S=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],E=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],M={activeCases:24,inSurgery:3,todayCalculations:7};class C{getRecentPatients(e=4){return S.slice(0,e)}getRecentHistory(e=5){return E.slice(0,e)}getDashboardStats(){return{...M}}}const g=new C;class H{constructor(){Object.defineProperty(this,"view",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onlineStatus",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"onlineHandler",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this.updateOnlineStatus(!0)}}),Object.defineProperty(this,"offlineHandler",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this.updateOnlineStatus(!1)}}),this.view=new P}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(e=>{const t=e;t.addEventListener("click",a=>{const n=document.createElement("span");n.classList.add("ripple"),t.appendChild(n);const s=t.getBoundingClientRect(),i=a.clientX-s.left,o=a.clientY-s.top;n.style.left=`${i}px`,n.style.top=`${o}px`,setTimeout(()=>n.remove(),600)})}),this.setupElements(),this.setupNavigation(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),console.log("[HomeController] Destroyed")}setupElements(){this.view.showRecentPatientsSection()}setupNavigation(){this.view.getModuleCards().forEach(o=>{const c=o.getAttribute("data-route");o.addEventListener("click",async d=>{d.preventDefault(),d.stopPropagation(),c&&await this.navigateToModule(c)})}),this.view.getBottomNavLinks().forEach(o=>{const c=o.getAttribute("data-route");o.addEventListener("click",async d=>{d.preventDefault(),d.stopPropagation(),c&&c!=="home"&&await this.navigateToModule(c)})});const a=this.view.getSearchButton();a&&a.addEventListener("click",()=>{console.log("[Home] Search clicked")});const n=this.view.getProfileButton();n&&n.addEventListener("click",()=>{console.log("[Home] Profile clicked")});const s=this.view.getViewAllHistoryButton();s&&s.addEventListener("click",async()=>{await this.navigateToModule("history")});const i=this.view.getViewAllPatientsButton();i&&i.addEventListener("click",async()=>{await this.navigateToModule("patients")})}async navigateToModule(e){console.log(`[Home] Navigating to: ${e}`),await u.navigate(e)}renderRecentPatients(){const e=g.getRecentPatients(4),t=this.view.getRecentPatientsContainer();t&&(t.innerHTML="",e.forEach(a=>{t.appendChild(this.createPatientCard(a))}))}createPatientCard(e){const t=document.createElement("div");t.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const a=(e.species==="canine","pets");return t.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${a}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(e.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${e.species} • ${e.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${e.status}</span>
    `,t.style.cursor="pointer",t.addEventListener("click",()=>console.log(`[Home] View patient: ${e.name}`)),t}renderRecentHistory(){const e=g.getRecentHistory(2),t=this.view.getRecentHistoryContainer();t&&(t.innerHTML="",e.forEach(a=>{t.appendChild(this.createHistoryItem(a))}))}createHistoryItem(e){const t=document.createElement("div");t.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let a="history",n="bg-secondary-fixed";switch(e.type){case"dosage":a="medication",n="bg-secondary-fixed";break;case"fluidotherapy":a="water_drop",n="bg-secondary-fixed";break;case"anesthesia":a="air",n="bg-tertiary-fixed";break;case"converter":a="sync_alt",n="bg-surface-container-highest";break}const s=this.getRelativeTime(e.createdAt),i=e.summary.substring(0,40)+(e.summary.length>40?"...":""),o=e.patientName||"Unknown",c=e.patientSpecies||"N/A",d=e.patientWeightKg||"?";return t.innerHTML=`
      <div class="w-10 h-10 rounded-full ${n} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${a}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(i)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(o)} (${c}, ${d}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${s}</span>
    `,t.style.cursor="pointer",t.addEventListener("click",()=>console.log(`[Home] View calculation: ${e.type}`)),t}getRelativeTime(e){const t=Date.now()-e.getTime(),a=Math.floor(t/6e4),n=Math.floor(t/36e5),s=Math.floor(t/864e5);return a<1?"Just now":a<60?`${a}m ago`:n<24?`${n}h ago`:`${s}d ago`}renderTipOfTheDay(){const e=h[Math.floor(Math.random()*h.length)],t=this.view.getTipElement();t&&(t.textContent=e.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(e){this.onlineStatus=e;let t=document.getElementById("online-status");if(t||document.querySelector("header")&&(t=document.createElement("div"),t.id="online-status",t.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(t,document.body.firstChild)),t)if(e)t.textContent="● Online",t.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{t&&this.onlineStatus&&(t.style.opacity="0",setTimeout(()=>{if(t&&this.onlineStatus){t.style.display="none";const a=document.querySelector("header");a&&(a.style.marginTop="0px")}},300))},3e3);else{t.textContent="⚠ You are offline - Some features may be limited",t.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",t.style.display="block";const a=document.querySelector("header");a&&(a.style.marginTop="24px")}}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}let m=null;function R(){m&&(m.destroy(),m=null)}function l(r,e){u.register(r,async()=>{R();const t=e();m=t,await t.init()})}class L{async init(){u.register("splash",async()=>{await new x().init()}),l("home",()=>new H);const e=()=>(console.log("[Router] Página no implementada en Fase 2"),{init:async()=>{const a=document.getElementById("app");a&&(a.innerHTML=`
              <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">construction</span>
                <h2 class="font-headline-md text-headline-md mb-2">Próximamente</h2>
                <p class="text-on-surface-variant">Esta pantalla estará disponible en la Fase 2 del desarrollo.</p>
                <button onclick="window.location.hash='home'" class="mt-6 px-6 py-2 bg-primary text-on-primary rounded-lg">
                  Volver al inicio
                </button>
              </div>
            `)},destroy:()=>{}});if(l("patients",e),l("library",e),l("history",e),l("fluidotherapy",e),l("dosage",e),l("converter",e),l("anesthesia",e),l("premium",e),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(a=>console.log("[SW] OK",a)).catch(a=>console.log("[SW] ERROR",a))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await u.navigate("splash");else{const a=u.resolveInitialRoute();await u.navigate(a)}}}new L().init();
