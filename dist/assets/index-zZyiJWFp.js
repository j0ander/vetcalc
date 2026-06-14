var L=Object.defineProperty;var E=(l,e,t)=>e in l?L(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var i=(l,e,t)=>E(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class I{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(a){console.error(`[Router] Error in ${e}:`,a),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const u=new I,B=`
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
`;class k{constructor(){Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"messageElement",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=B),document.body.classList.add("splash-body"),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const g=2800,b=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],v=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class C{constructor(){Object.defineProperty(this,"view",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"progress",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"messageIndex",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"intervalId",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.view=new k}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const a=Date.now()-t;this.progress=Math.min(100,a/g*100),this.view.updateProgress(this.progress),Math.floor(a/700)>this.messageIndex&&this.messageIndex<b.length-1&&(this.messageIndex++,this.view.updateMessage(b[this.messageIndex])),a>=g&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await u.navigate("home")}}const P=`
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
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant" data-route="premium">
  <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  <span class="font-label-sm text-label-sm">PREMIUM</span>
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
`;class S{constructor(){Object.defineProperty(this,"recentHistoryContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"tipElement",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsSection",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=P),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section")}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const R=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],A=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],D={activeCases:24,inSurgery:3,todayCalculations:7};class M{getRecentPatients(e=4){return R.slice(0,e)}getRecentHistory(e=5){return A.slice(0,e)}getDashboardStats(){return{...D}}}const h=new M;class F{constructor(){i(this,"isPremium",!0);i(this,"listeners",[]);const e=localStorage.getItem("vetcalc-premium");this.isPremium=e==="true"}getStatus(){return this.isPremium}setStatus(e){this.isPremium=e,localStorage.setItem("vetcalc-premium",String(e)),this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{const t=this.listeners.indexOf(e);t!==-1&&this.listeners.splice(t,1)}}notifyListeners(){this.listeners.forEach(e=>e(this.isPremium))}}const x=new F;function y(l){document.querySelectorAll(".premium-badge").forEach(t=>{l?(t.classList.remove("bg-surface-container-high","text-on-surface-variant","border-outline-variant"),t.classList.add("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary")):(t.classList.remove("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary"),t.classList.add("bg-surface-container-high","text-on-surface-variant","border-outline-variant"))})}class T{constructor(){i(this,"premiumUnsubscribe",null)}initPremiumBadge(){const e=x.getStatus();y(e),this.premiumUnsubscribe=x.subscribe(t=>{y(t)})}destroyPremiumBadge(){this.premiumUnsubscribe&&(this.premiumUnsubscribe(),this.premiumUnsubscribe=null)}}class j extends T{constructor(){super();i(this,"view");i(this,"onlineStatus",!0);i(this,"onlineHandler",()=>{this.updateOnlineStatus(!0)});i(this,"offlineHandler",()=>{this.updateOnlineStatus(!1)});this.view=new S}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(t=>{const a=t;a.addEventListener("click",s=>{const n=document.createElement("span");n.classList.add("ripple"),a.appendChild(n);const r=a.getBoundingClientRect(),o=s.clientX-r.left,c=s.clientY-r.top;n.style.left=`${o}px`,n.style.top=`${c}px`,setTimeout(()=>n.remove(),600)})}),this.initPremiumBadge(),this.setupElements(),this.setupNavigation(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),this.destroyPremiumBadge(),console.log("[HomeController] Destroyed")}setupElements(){this.view.showRecentPatientsSection()}setupNavigation(){this.view.getModuleCards().forEach(c=>{const d=c.getAttribute("data-route");c.addEventListener("click",async p=>{p.preventDefault(),p.stopPropagation(),d&&await this.navigateToModule(d)})}),this.view.getBottomNavLinks().forEach(c=>{const d=c.getAttribute("data-route");c.addEventListener("click",async p=>{p.preventDefault(),p.stopPropagation(),d&&d!=="home"&&await this.navigateToModule(d)})});const s=this.view.getSearchButton();s&&s.addEventListener("click",()=>{console.log("[Home] Search clicked")});const n=this.view.getProfileButton();n&&n.addEventListener("click",()=>{console.log("[Home] Profile clicked")});const r=this.view.getViewAllHistoryButton();r&&r.addEventListener("click",async()=>{await this.navigateToModule("history")});const o=this.view.getViewAllPatientsButton();o&&o.addEventListener("click",async()=>{await this.navigateToModule("patients")})}async navigateToModule(t){console.log(`[Home] Navigating to: ${t}`),await u.navigate(t)}renderRecentPatients(){const t=h.getRecentPatients(4),a=this.view.getRecentPatientsContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createPatientCard(s))}))}createPatientCard(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const s=(t.species==="canine","pets");return a.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(t.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${t.species} • ${t.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${t.status}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View patient: ${t.name}`)),a}renderRecentHistory(){const t=h.getRecentHistory(2),a=this.view.getRecentHistoryContainer();a&&(a.innerHTML="",t.forEach(s=>{a.appendChild(this.createHistoryItem(s))}))}createHistoryItem(t){const a=document.createElement("div");a.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let s="history",n="bg-secondary-fixed";switch(t.type){case"dosage":s="medication",n="bg-secondary-fixed";break;case"fluidotherapy":s="water_drop",n="bg-secondary-fixed";break;case"anesthesia":s="air",n="bg-tertiary-fixed";break;case"converter":s="sync_alt",n="bg-surface-container-highest";break}const r=this.getRelativeTime(t.createdAt),o=t.summary.substring(0,40)+(t.summary.length>40?"...":""),c=t.patientName||"Unknown",d=t.patientSpecies||"N/A",p=t.patientWeightKg||"?";return a.innerHTML=`
      <div class="w-10 h-10 rounded-full ${n} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${s}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(o)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(c)} (${d}, ${p}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${r}</span>
    `,a.style.cursor="pointer",a.addEventListener("click",()=>console.log(`[Home] View calculation: ${t.type}`)),a}getRelativeTime(t){const a=Date.now()-t.getTime(),s=Math.floor(a/6e4),n=Math.floor(a/36e5),r=Math.floor(a/864e5);return s<1?"Just now":s<60?`${s}m ago`:n<24?`${n}h ago`:`${r}d ago`}renderTipOfTheDay(){const t=v[Math.floor(Math.random()*v.length)],a=this.view.getTipElement();a&&(a.textContent=t.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(t){this.onlineStatus=t;let a=document.getElementById("online-status");if(a||document.querySelector("header")&&(a=document.createElement("div"),a.id="online-status",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(a,document.body.firstChild)),a)if(t)a.textContent="● Online",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{a&&this.onlineStatus&&(a.style.opacity="0",setTimeout(()=>{if(a&&this.onlineStatus){a.style.display="none";const s=document.querySelector("header");s&&(s.style.marginTop="0px")}},300))},3e3);else{a.textContent="⚠ You are offline - Some features may be limited",a.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",a.style.display="block";const s=document.querySelector("header");s&&(s.style.marginTop="24px")}}escapeHtml(t){const a=document.createElement("div");return a.textContent=t,a.innerHTML}}const _=`
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
`;class H{constructor(){i(this,"container",null);i(this,"inputLeft",null);i(this,"inputRight",null);i(this,"labelLeft",null);i(this,"labelRight",null);i(this,"unitLeft",null);i(this,"unitRight",null);i(this,"referenceText",null);i(this,"tabs",null);i(this,"swapBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=_),this.cacheElements()}cacheElements(){this.inputLeft=document.getElementById("input-left"),this.inputRight=document.getElementById("input-right"),this.labelLeft=document.getElementById("label-left"),this.labelRight=document.getElementById("label-right"),this.unitLeft=document.getElementById("unit-left"),this.unitRight=document.getElementById("unit-right"),this.referenceText=document.getElementById("reference-text"),this.tabs=document.querySelectorAll("[data-mode]"),this.swapBtn=document.getElementById("swap-btn")}getInputLeft(){return this.inputLeft}getInputRight(){return this.inputRight}getLabelLeft(){return this.labelLeft}getLabelRight(){return this.labelRight}getUnitLeft(){return this.unitLeft}getUnitRight(){return this.unitRight}getReferenceText(){return this.referenceText}getTabs(){return this.tabs}getSwapBtn(){return this.swapBtn}updateLeftLabel(e){this.labelLeft&&(this.labelLeft.textContent=e)}updateRightLabel(e){this.labelRight&&(this.labelRight.textContent=e)}updateLeftUnit(e){this.unitLeft&&(this.unitLeft.textContent=e)}updateRightUnit(e){this.unitRight&&(this.unitRight.textContent=e)}updateReference(e){this.referenceText&&(this.referenceText.textContent=e)}clearInputs(){this.inputLeft&&(this.inputLeft.value=""),this.inputRight&&(this.inputRight.value="")}setInputLeftValue(e){this.inputLeft&&e!==void 0&&(this.inputLeft.value=e)}setInputRightValue(e){this.inputRight&&e!==void 0&&(this.inputRight.value=e)}getInputLeftValue(){const e=this.inputLeft;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}getInputRightValue(){const e=this.inputRight;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const a=parseFloat(t);return isNaN(a)?null:a}}class V{constructor(){i(this,"view");i(this,"currentMode","weight");i(this,"modes",{weight:{leftLabel:"Libras (lb)",leftUnit:"lb",rightLabel:"Kilogramos (kg)",rightUnit:"kg",reference:"Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.",convert:(e,t)=>t==="leftToRight"?e/2.20462:e*2.20462},temp:{leftLabel:"Fahrenheit (°F)",leftUnit:"°F",rightLabel:"Celsius (°C)",rightUnit:"°C",reference:"Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).",convert:(e,t)=>t==="leftToRight"?(e-32)*5/9:e*9/5+32},volume:{leftLabel:"Onzas líquidas (fl oz)",leftUnit:"fl oz",rightLabel:"Mililitros (mL)",rightUnit:"mL",reference:"Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).",convert:(e,t)=>t==="leftToRight"?e*29.5735:e/29.5735}});this.view=new H}async init(){this.view.render(),this.setupEventListeners(),this.applyMode("weight")}setupEventListeners(){const e=this.view.getTabs();e==null||e.forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-mode");r&&this.modes[r]&&this.applyMode(r)})});const t=this.view.getInputLeft(),a=this.view.getInputRight();t==null||t.addEventListener("input",()=>this.convertFromLeft()),a==null||a.addEventListener("input",()=>this.convertFromRight());const s=this.view.getSwapBtn();s==null||s.addEventListener("click",()=>this.swap()),document.querySelectorAll("[data-route]").forEach(n=>{n.addEventListener("click",async r=>{r.preventDefault();const o=n.getAttribute("data-route");o&&await u.navigate(o)})})}applyMode(e){this.currentMode=e;const t=this.modes[e];this.view.updateLeftLabel(t.leftLabel),this.view.updateRightLabel(t.rightLabel),this.view.updateLeftUnit(t.leftUnit),this.view.updateRightUnit(t.rightUnit),this.view.updateReference(t.reference),this.view.clearInputs();const a=this.view.getTabs();a==null||a.forEach(s=>{s.getAttribute("data-mode")===e?(s.classList.add("bg-surface","text-primary","shadow-sm"),s.classList.remove("text-on-surface-variant","hover:bg-surface-container-high")):(s.classList.remove("bg-surface","text-primary","shadow-sm"),s.classList.add("text-on-surface-variant","hover:bg-surface-container-high"))})}convertFromLeft(){const e=this.view.getInputLeftValue();if(e!==null){const a=this.modes[this.currentMode].convert(e,"leftToRight");this.view.setInputRightValue(a.toFixed(2))}else this.view.setInputRightValue("")}convertFromRight(){const e=this.view.getInputRightValue();if(e!==null){const a=this.modes[this.currentMode].convert(e,"rightToLeft");this.view.setInputLeftValue(a.toFixed(2))}else this.view.setInputLeftValue("")}swap(){const e=this.view.getInputLeftValue(),t=this.view.getInputRightValue();e!==null?this.view.setInputRightValue(e.toFixed(2)):this.view.setInputRightValue(""),t!==null?this.view.setInputLeftValue(t.toFixed(2)):this.view.setInputLeftValue(""),this.convertFromLeft()}destroy(){console.log("[ConverterController] Destroyed")}}const N=`
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
`;class O{constructor(){i(this,"container",null);i(this,"patientDetailsEl",null);i(this,"weightDisplayEl",null);i(this,"asaStatusEl",null);i(this,"premedListEl",null);i(this,"inductionListEl",null);i(this,"summaryBodyEl",null);i(this,"totalFluidsEl",null);i(this,"finalizeBtn",null);i(this,"printBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=N),this.cacheElements()}cacheElements(){this.patientDetailsEl=document.getElementById("patient-details"),this.weightDisplayEl=document.getElementById("weight-display"),this.asaStatusEl=document.getElementById("asa-status"),this.premedListEl=document.getElementById("premed-list"),this.inductionListEl=document.getElementById("induction-list"),this.summaryBodyEl=document.getElementById("summary-table-body"),this.totalFluidsEl=document.getElementById("total-fluids"),this.finalizeBtn=document.getElementById("finalize-btn"),this.printBtn=document.getElementById("print-pdf-btn")}getPremedList(){return this.premedListEl}getInductionList(){return this.inductionListEl}getSummaryBody(){return this.summaryBodyEl}getTotalFluidsEl(){return this.totalFluidsEl}getFinalizeBtn(){return this.finalizeBtn}getPrintBtn(){return this.printBtn}updatePatientInfo(e,t,a,s){this.patientDetailsEl&&(this.patientDetailsEl.textContent=`${e} • ${t} • ${a} kg`),this.weightDisplayEl&&(this.weightDisplayEl.textContent=`${a} kg`),this.asaStatusEl&&(this.asaStatusEl.textContent=s)}renderDrugList(e,t,a){e.innerHTML="";for(const s of t){const n=document.createElement("label");n.className=`flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border shadow-sm hover:border-primary cursor-pointer transition-all ${s.selected?"border-primary":"border-outline-variant"}`;const r=document.createElement("input");r.type="checkbox",r.checked=s.selected,r.className="w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox",r.addEventListener("change",d=>{const p=d.target.checked;a(s.name,p),p?(n.classList.add("border-primary"),n.classList.remove("opacity-60")):(n.classList.remove("border-primary"),n.classList.add("opacity-60"))});const o=document.createElement("div");o.className="flex-grow",o.innerHTML=`
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface">${s.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${s.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${s.category==="premed"?"Sedante / Analgésico":"Agente de inducción"}</p>
      `;const c=document.createElement("div");c.className="text-right",c.id=`drug-values-${s.name.replace(/\s/g,"")}`,this.updateDrugValuesUI(c,s,28.5),n.appendChild(r),n.appendChild(o),n.appendChild(c),e.appendChild(n)}}updateDrugValuesUI(e,t,a){const s=t.dosePerKg*a,n=s/t.concentration;e.innerHTML=`
      <p class="font-headline-md text-headline-md text-primary">${s.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${n.toFixed(2)} mL</p>
    `}renderSummary(e,t,a){if(this.summaryBodyEl){this.summaryBodyEl.innerHTML="";for(const s of e){if(!s.selected)continue;const n=s.dosePerKg*t,r=n/s.concentration,o=document.createElement("tr");o.className="divide-y divide-outline-variant",o.innerHTML=`
        <td class="p-4">
          <p class="font-label-md text-label-md">${s.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${s.category==="premed"?"Premedicación":"Inducción"}</p>
        </td>
        <td class="p-4 font-body-md">${n.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${r.toFixed(2)} mL</td>
      `,this.summaryBodyEl.appendChild(o)}this.totalFluidsEl&&(this.totalFluidsEl.textContent=`${a.toFixed(1)} mL`)}}}class ${constructor(){i(this,"view");i(this,"weightKg",28.5);i(this,"drugs",[{name:"Acepromazina",dosePerKg:.02,concentration:10,category:"premed",selected:!0},{name:"Butorfanol",dosePerKg:.2,concentration:10,category:"premed",selected:!0},{name:"Propofol",dosePerKg:4,concentration:10,category:"induction",selected:!0}]);this.view=new O}async init(){this.view.render(),this.setupEventListeners(),this.renderDrugLists(),this.updateSummaryAndFluids()}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",async s=>{s.preventDefault();const n=a.getAttribute("data-route");n&&await u.navigate(n)})});const e=this.view.getFinalizeBtn();e==null||e.addEventListener("click",()=>{alert("Protocolo guardado (simulación)"),console.log("Protocolo finalizado:",this.drugs.filter(a=>a.selected))});const t=this.view.getPrintBtn();t==null||t.addEventListener("click",()=>{console.log("Generar PDF")})}renderDrugLists(){const e=this.view.getPremedList(),t=this.view.getInductionList();if(!e||!t)return;const a=this.drugs.filter(n=>n.category==="premed"),s=this.drugs.filter(n=>n.category==="induction");this.view.renderDrugList(e,a,(n,r)=>{const o=this.drugs.find(c=>c.name===n);o&&(o.selected=r),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()}),this.view.renderDrugList(t,s,(n,r)=>{const o=this.drugs.find(c=>c.name===n);o&&(o.selected=r),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()})}refreshDrugValuesUI(){const e=this.drugs;for(const t of e){const a=document.getElementById(`drug-values-${t.name.replace(/\s/g,"")}`);a&&this.view.updateDrugValuesUI(a,t,this.weightKg)}}updateSummaryAndFluids(){const e=this.drugs.filter(a=>a.selected),t=this.weightKg*5;this.view.renderSummary(e,this.weightKg,t)}destroy(){console.log("[AnesthesiaController] Destroyed")}}const z=`
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
`;class K{constructor(){i(this,"drugInput",null);i(this,"weightInput",null);i(this,"dosageInput",null);i(this,"concentrationInput",null);i(this,"calculateBtn",null);i(this,"resultContainer",null);i(this,"resultVolumeSpan",null);i(this,"resultDosageSpan",null);i(this,"logBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=z),this.cacheElements()}cacheElements(){this.drugInput=document.getElementById("drug-name"),this.weightInput=document.getElementById("weight"),this.dosageInput=document.getElementById("dosage"),this.concentrationInput=document.getElementById("concentration"),this.calculateBtn=document.getElementById("calculate-btn"),this.resultContainer=document.getElementById("result-container"),this.resultVolumeSpan=document.getElementById("result-volume"),this.resultDosageSpan=document.getElementById("result-dosage"),this.logBtn=document.getElementById("log-btn")}getDrugName(){var e;return((e=this.drugInput)==null?void 0:e.value)||""}getWeight(){var t;const e=(t=this.weightInput)==null?void 0:t.value;return e?parseFloat(e):0}getDosageMgPerKg(){var t;const e=(t=this.dosageInput)==null?void 0:t.value;return e?parseFloat(e):0}getConcentrationMgPerMl(){var t;const e=(t=this.concentrationInput)==null?void 0:t.value;return e?parseFloat(e):0}setDrugName(e){this.drugInput&&(this.drugInput.value=e)}setWeight(e){this.weightInput&&(this.weightInput.value=e.toString())}setDosage(e){this.dosageInput&&(this.dosageInput.value=e.toString())}setConcentration(e){this.concentrationInput&&(this.concentrationInput.value=e.toString())}showResult(e,t){this.resultContainer&&(this.resultContainer.classList.remove("opacity-0","translate-y-4"),this.resultContainer.classList.add("opacity-100","translate-y-0")),this.resultVolumeSpan&&(this.resultVolumeSpan.textContent=`${t.toFixed(2)} mL`),this.resultDosageSpan&&(this.resultDosageSpan.textContent=`Dosis: ${e.toFixed(2)} mg total`)}hideResult(){this.resultContainer&&(this.resultContainer.classList.add("opacity-0","translate-y-4"),this.resultContainer.classList.remove("opacity-100","translate-y-0"))}getCalculateButton(){return this.calculateBtn}getLogButton(){return this.logBtn}highlightDrugInput(e){this.drugInput&&(e?this.drugInput.classList.add("border-primary"):this.drugInput.classList.remove("border-primary"))}}class q{constructor(){i(this,"view");this.view=new K}async init(){this.view.render(),this.setupEventListeners(),this.view.setWeight(28.5),this.view.setDosage(5),this.view.setConcentration(50),this.view.hideResult()}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",async n=>{n.preventDefault();const r=s.getAttribute("data-route");r&&await u.navigate(r)})});const e=this.view.getCalculateButton();e==null||e.addEventListener("click",()=>{this.calculate(),e.classList.add("scale-95"),setTimeout(()=>e.classList.remove("scale-95"),150)});const t=this.view.getLogButton();t==null||t.addEventListener("click",()=>{this.saveToHistory()});const a=document.getElementById("drug-name");a==null||a.addEventListener("input",s=>{const n=s.target;this.view.highlightDrugInput(n.value.length>0)})}calculate(){const e=this.view.getWeight(),t=this.view.getDosageMgPerKg(),a=this.view.getConcentrationMgPerMl();if(e<=0||t<=0||a<=0){alert("Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.");return}const s=e*t,n=s/a;this.view.showResult(s,n)}saveToHistory(){console.log("Guardar cálculo en historial:",{drug:this.view.getDrugName(),weight:this.view.getWeight(),dosagePerKg:this.view.getDosageMgPerKg(),concentration:this.view.getConcentrationMgPerMl(),timestamp:new Date().toISOString()}),alert("Cálculo guardado en el historial (simulado).")}destroy(){console.log("[DosageController] Destroyed")}}const U=`
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
`;class G{constructor(){i(this,"weightInput",null);i(this,"dehydrationInput",null);i(this,"dehydrationValueSpan",null);i(this,"maintenanceInput",null);i(this,"lossesInput",null);i(this,"totalVolumeSpan",null);i(this,"hourlyRateSpan",null);i(this,"dripRateSpan",null);i(this,"dripButtons",null);i(this,"maintenancePresetBtns",null);i(this,"saveBtn",null);i(this,"reportBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=U),this.cacheElements()}cacheElements(){this.weightInput=document.getElementById("weight"),this.dehydrationInput=document.getElementById("dehydration"),this.dehydrationValueSpan=document.getElementById("dehydration-value"),this.maintenanceInput=document.getElementById("maintenance"),this.lossesInput=document.getElementById("losses"),this.totalVolumeSpan=document.getElementById("total-volume"),this.hourlyRateSpan=document.getElementById("hourly-rate"),this.dripRateSpan=document.getElementById("drip-rate"),this.dripButtons=document.querySelectorAll(".drip-btn"),this.maintenancePresetBtns=document.querySelectorAll("[data-maintenance]"),this.saveBtn=document.getElementById("save-btn"),this.reportBtn=document.getElementById("report-btn")}getWeight(){var e;return parseFloat(((e=this.weightInput)==null?void 0:e.value)||"0")}getDehydrationPercent(){var e;return parseFloat(((e=this.dehydrationInput)==null?void 0:e.value)||"0")}getMaintenance(){var e;return parseFloat(((e=this.maintenanceInput)==null?void 0:e.value)||"0")}getLosses(){var e;return parseFloat(((e=this.lossesInput)==null?void 0:e.value)||"0")}setDehydrationDisplay(e){this.dehydrationValueSpan&&(this.dehydrationValueSpan.textContent=`${e}%`)}updateResults(e,t,a){this.totalVolumeSpan&&(this.totalVolumeSpan.textContent=e.toFixed(1)),this.hourlyRateSpan&&(this.hourlyRateSpan.textContent=t.toFixed(1)),this.dripRateSpan&&(this.dripRateSpan.textContent=Math.round(a).toString())}onWeightInput(e){var t;(t=this.weightInput)==null||t.addEventListener("input",e)}onDehydrationInput(e){var t;(t=this.dehydrationInput)==null||t.addEventListener("input",e)}onMaintenanceInput(e){var t;(t=this.maintenanceInput)==null||t.addEventListener("input",e)}onLossesInput(e){var t;(t=this.lossesInput)==null||t.addEventListener("input",e)}onDripButtonClick(e){var t;(t=this.dripButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var n;const s=parseInt(a.getAttribute("data-drip")||"15");e(s),(n=this.dripButtons)==null||n.forEach(r=>{r.classList.remove("border-primary","bg-primary-container/20","text-primary"),r.classList.add("border-transparent","bg-surface-container-high","text-on-surface-variant")}),a.classList.add("border-primary","bg-primary-container/20","text-primary"),a.classList.remove("border-transparent","bg-surface-container-high","text-on-surface-variant")})})}onMaintenancePreset(e){var t;(t=this.maintenancePresetBtns)==null||t.forEach(a=>{a.addEventListener("click",()=>{const s=parseInt(a.getAttribute("data-maintenance")||"0");e(s)})})}onSave(e){var t;(t=this.saveBtn)==null||t.addEventListener("click",e)}onReport(e){var t;(t=this.reportBtn)==null||t.addEventListener("click",e)}}class W{constructor(){i(this,"view");i(this,"currentDripFactor",15);this.view=new G}async init(){this.view.render(),this.setupEventListeners(),this.calculate()}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await u.navigate(a)})}),this.view.onWeightInput(()=>this.calculate()),this.view.onDehydrationInput(()=>{const e=this.view.getDehydrationPercent();this.view.setDehydrationDisplay(e),this.calculate()}),this.view.onMaintenanceInput(()=>this.calculate()),this.view.onLossesInput(()=>this.calculate()),this.view.onDripButtonClick(e=>{this.currentDripFactor=e,this.calculate()}),this.view.onMaintenancePreset(e=>{this.view.maintenanceInput&&(this.view.maintenanceInput.value=e.toString(),this.calculate())}),this.view.onSave(()=>{alert("Protocolo guardado (simulación)"),console.log("Fluidoterapia guardada")}),this.view.onReport(()=>{console.log("Generar reporte PDF"),alert("Función de reporte en desarrollo")})}calculate(){const e=this.view.getWeight(),t=this.view.getDehydrationPercent(),a=this.view.getMaintenance(),s=this.view.getLosses(),n=e*t*10,r=e*a,o=n+r+s,c=o/24,d=c*this.currentDripFactor/60;this.view.updateResults(o,c,d)}destroy(){console.log("[FluidotherapyController] Destroyed")}}const J=`
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
`;class Q{constructor(){i(this,"historyContainer",null);i(this,"filterButtons",null);i(this,"loadMoreBtn",null);i(this,"searchFab",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=J),this.cacheElements()}cacheElements(){this.historyContainer=document.getElementById("history-list"),this.filterButtons=document.querySelectorAll("#filter-buttons button"),this.loadMoreBtn=document.getElementById("load-more-btn"),this.searchFab=document.getElementById("search-fab")}getHistoryContainer(){return this.historyContainer}getFilterButtons(){return this.filterButtons}getLoadMoreButton(){return this.loadMoreBtn}getSearchFab(){return this.searchFab}renderHistoryList(e,t){if(!this.historyContainer)return;if(e.length===0){this.historyContainer.innerHTML=`
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;return}const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()-1);const n=e.filter(d=>new Date(d.timestamp)>=a),r=e.filter(d=>{const p=new Date(d.timestamp);return p<a&&p>=s}),o=e.filter(d=>new Date(d.timestamp)<s);let c="";n.length&&(c+='<div class="flex items-center gap-2 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',c+=this.renderRecordGroup(n)),r.length&&(c+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',c+=this.renderRecordGroup(r)),o.length&&(c+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',c+=this.renderRecordGroup(o)),this.historyContainer.innerHTML=c,document.querySelectorAll(".history-card-hover").forEach(d=>{d.addEventListener("click",p=>{const w=d.getAttribute("data-id");console.log(`Ver detalle de registro: ${w}`)})})}renderRecordGroup(e){return e.map(t=>{const a=this.getIconForType(t.type),s=this.getBgClassForType(t.type),n=this.getTextColorClassForType(t.type),r=this.getRelativeTime(t.timestamp),o=t.isPremium?`<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>`:"";return`
        <div class="history-card-hover bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 cursor-pointer" data-id="${t.id}">
          <div class="h-12 w-12 rounded-lg ${s} flex items-center justify-center ${n}">
            <span class="material-symbols-outlined">${a}</span>
          </div>
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-md text-[18px] text-on-surface">${this.escapeHtml(t.title)}</h3>
                ${o}
              </div>
              <span class="text-on-surface-variant font-label-sm text-label-sm">${r}</span>
            </div>
            <p class="font-body-md text-on-surface-variant text-[14px]">Paciente: ${this.escapeHtml(t.patientName)} (${t.species}, ${t.weightKg}kg)</p>
            <div class="mt-1">
              <span class="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-medium text-on-surface">${this.escapeHtml(t.summary)}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant">chevron_right</span>
        </div>
      `}).join("")}getIconForType(e){switch(e){case"dosage":return"medication";case"fluidotherapy":return"water_drop";case"anesthesia":return"vital_signs";default:return"history"}}getBgClassForType(e){switch(e){case"dosage":return"bg-secondary-container";case"fluidotherapy":return"bg-surface-container";case"anesthesia":return"bg-tertiary-container";default:return"bg-surface-container"}}getTextColorClassForType(e){switch(e){case"dosage":return"text-on-secondary-container";case"fluidotherapy":return"text-primary";case"anesthesia":return"text-on-tertiary-container";default:return"text-on-surface-variant"}}getRelativeTime(e){const a=new Date().getTime()-e.getTime(),s=Math.floor(a/6e4),n=Math.floor(a/36e5),r=Math.floor(a/864e5);return s<1?"Justo ahora":s<60?`Hace ${s} min`:n<24?`Hace ${n} h`:r===1?"Ayer":`Hace ${r} días`}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}setActiveFilter(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.getAttribute("data-filter")===e?(a.classList.remove("bg-surface-container-high","text-on-surface-variant"),a.classList.add("bg-primary","text-on-primary","shadow-sm")):(a.classList.remove("bg-primary","text-on-primary","shadow-sm"),a.classList.add("bg-surface-container-high","text-on-surface-variant"))})}}class X{constructor(){i(this,"view");i(this,"allRecords",[]);i(this,"currentFilter","all");this.view=new Q}async init(){this.view.render(),this.loadMockData(),this.setupEventListeners(),this.applyFilter()}loadMockData(){const e=h.getRecentHistory(10);this.allRecords=e.map(t=>({id:t.id,type:t.type,title:this.getTitleForType(t.type),patientName:t.patientName||"Desconocido",species:t.patientSpecies||"N/A",weightKg:t.patientWeightKg||0,timestamp:t.createdAt,summary:t.summary,detail:JSON.stringify(t.result),isPremium:t.type==="anesthesia"}))}getTitleForType(e){switch(e){case"dosage":return"Cálculo de Dosis";case"fluidotherapy":return"Fluidoterapia";case"anesthesia":return"Protocolo de Anestesia";default:return"Cálculo"}}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",async n=>{n.preventDefault();const r=s.getAttribute("data-route");r&&await u.navigate(r)})});const e=this.view.getFilterButtons();e==null||e.forEach(s=>{s.addEventListener("click",()=>{const n=s.getAttribute("data-filter")||"all";this.currentFilter=n,this.view.setActiveFilter(n),this.applyFilter()})});const t=this.view.getLoadMoreButton();t==null||t.addEventListener("click",()=>{console.log("Cargar más registros - por implementar")});const a=this.view.getSearchFab();a==null||a.addEventListener("click",()=>{console.log("Búsqueda - por implementar")})}applyFilter(){let e=[...this.allRecords];this.currentFilter!=="all"&&(e=e.filter(t=>t.type===this.currentFilter)),this.view.renderHistoryList(e,this.currentFilter)}destroy(){console.log("[HistoryController] Destroyed")}}const Y=`
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
`;class Z{constructor(){i(this,"searchInput",null);i(this,"filterButtons",null);i(this,"resourceCards",null);i(this,"resourceItems",null);i(this,"guidelineCards",null);i(this,"viewAllButtons",null);i(this,"upgradeBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Y),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.filterButtons=document.querySelectorAll(".filter-btn"),this.resourceCards=document.querySelectorAll(".resource-card"),this.resourceItems=document.querySelectorAll(".resource-item"),this.guidelineCards=document.querySelectorAll(".guideline-card"),this.viewAllButtons=document.querySelectorAll(".view-all"),this.upgradeBtn=document.getElementById("upgrade-btn")}getSearchInput(){return this.searchInput}getFilterButtons(){return this.filterButtons}getUpgradeBtn(){return this.upgradeBtn}onResourceClick(e){var t,a,s;(t=this.resourceCards)==null||t.forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-id");r&&e(r),this.animateClick(n)})}),(a=this.resourceItems)==null||a.forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-id");r&&e(r),this.animateClick(n)})}),(s=this.guidelineCards)==null||s.forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-id");r&&e(r),this.animateClick(n)})})}onViewAll(e){var t;(t=this.viewAllButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-section");s&&e(s)})})}onSearch(e){var t;(t=this.searchInput)==null||t.addEventListener("input",a=>{const s=a.target.value.toLowerCase();e(s)})}onFilterChange(e){var t;(t=this.filterButtons)==null||t.forEach(a=>{a.addEventListener("click",()=>{var n;const s=a.getAttribute("data-filter")||"all";(n=this.filterButtons)==null||n.forEach(r=>{r.classList.remove("bg-secondary","text-on-secondary"),r.classList.add("bg-surface-container-high","text-on-surface-variant")}),a.classList.remove("bg-surface-container-high","text-on-surface-variant"),a.classList.add("bg-secondary","text-on-secondary"),e(s)})})}filterResources(e){[...this.resourceCards||[],...this.resourceItems||[]].forEach(a=>{var n;const s=((n=a.textContent)==null?void 0:n.toLowerCase())||"";e===""||s.includes(e)?a.style.display="":a.style.display="none"})}animateClick(e){e.classList.add("bg-surface-container-low"),setTimeout(()=>e.classList.remove("bg-surface-container-low"),300)}}class ee{constructor(){i(this,"view");this.view=new Z}async init(){this.view.render(),this.setupEventListeners(),this.setupNavigation()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await u.navigate(a)})})}setupEventListeners(){this.view.onResourceClick(t=>{console.log(`[Library] Abrir recurso: ${t}`),alert(`Funcionalidad en desarrollo: ${t}`)}),this.view.onViewAll(t=>{console.log(`[Library] Ver todos: ${t}`),alert(`Mostrar todos los recursos de ${t} (simulación)`)}),this.view.onSearch(t=>{this.view.filterResources(t)}),this.view.onFilterChange(t=>{console.log(`[Library] Filtro: ${t}`),alert(`Filtro aplicado: ${t}`)});const e=this.view.getUpgradeBtn();e==null||e.addEventListener("click",()=>{u.navigate("premium")})}destroy(){console.log("[LibraryController] Destroyed")}}const te=`
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min w-full z-50">
  <div class="flex items-center gap-4">
    <span class="material-symbols-outlined text-primary">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Pacientes</h1>
  </div>
  <div class="flex items-center">
    <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors duration-200" data-route="home">account_circle</button>
  </div>
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
`;class ae{constructor(){i(this,"searchInput",null);i(this,"patientsList",null);i(this,"activeCasesSpan",null);i(this,"inSurgerySpan",null);i(this,"seeAllBtn",null);i(this,"addPatientBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=te),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.patientsList=document.getElementById("patients-list"),this.activeCasesSpan=document.getElementById("active-cases"),this.inSurgerySpan=document.getElementById("in-surgery"),this.seeAllBtn=document.getElementById("see-all-btn"),this.addPatientBtn=document.getElementById("add-patient-btn")}getSearchInput(){return this.searchInput}getSeeAllBtn(){return this.seeAllBtn}getAddPatientBtn(){return this.addPatientBtn}updateStats(e,t){this.activeCasesSpan&&(this.activeCasesSpan.textContent=e.toString()),this.inSurgerySpan&&(this.inSurgerySpan.textContent=t.toString())}renderPatients(e,t){var a;if(this.patientsList){this.patientsList.innerHTML="";for(const s of e){const n=document.createElement("div");n.className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden",n.setAttribute("data-id",s.id);const r=(s.species==="canine"||s.species==="feline","pets"),o=s.status==="stable"?"bg-secondary-container text-on-secondary-container":s.status==="in-surgery"?"bg-error-container text-on-error-container":"bg-surface-container-highest text-on-surface-variant",c=s.status==="stable"?"Estable":s.status==="in-surgery"?"En cirugía":s.status==="critical"?"Crítico":s.status==="discharged"?"Dado de alta":"Observación";n.innerHTML=`
        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-on-primary-container">${r}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-headline-md text-headline-md leading-tight text-on-surface">${this.escapeHtml(s.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${this.escapeHtml(s.breed)}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="px-3 py-1 ${o} font-label-sm text-label-sm rounded-full">${c}</span>
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      `,n.addEventListener("click",()=>t(s.id)),(a=this.patientsList)==null||a.appendChild(n)}}}filterPatients(e,t,a){const s=t.filter(n=>n.name.toLowerCase().includes(e)||n.breed.toLowerCase().includes(e)||n.ownerName.toLowerCase().includes(e));a(s)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class se{constructor(){i(this,"view");i(this,"patients",[]);this.view=new ae}async init(){this.view.render(),this.loadPatients(),this.setupNavigation(),this.setupEventListeners()}loadPatients(){this.patients=h.getRecentPatients(10);const e=this.patients.filter(a=>a.status!=="discharged").length,t=this.patients.filter(a=>a.status==="in-surgery").length;this.view.updateStats(e,t),this.view.renderPatients(this.patients,a=>this.onPatientClick(a))}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await u.navigate(a)})})}setupEventListeners(){const e=this.view.getSearchInput();e==null||e.addEventListener("input",s=>{const n=s.target.value.toLowerCase();this.view.filterPatients(n,this.patients,r=>{this.view.renderPatients(r,o=>this.onPatientClick(o))})});const t=this.view.getSeeAllBtn();t==null||t.addEventListener("click",()=>{alert('Funcionalidad "Ver todos" en desarrollo')});const a=this.view.getAddPatientBtn();a==null||a.addEventListener("click",()=>{alert('Funcionalidad "Añadir paciente" en desarrollo')})}onPatientClick(e){console.log(`[Patients] Ver detalle de paciente: ${e}`),alert(`Detalle del paciente (simulación) - ID: ${e}`)}destroy(){console.log("[PatientsController] Destroyed")}}const ne=`
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
`;class ie{constructor(){i(this,"monthlyBtn",null);i(this,"annualBtn",null);i(this,"pricingLabel",null);i(this,"pricingPeriod",null);i(this,"upgradeBtn",null);i(this,"restoreBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=ne),this.cacheElements()}cacheElements(){this.monthlyBtn=document.getElementById("monthly-toggle"),this.annualBtn=document.getElementById("annual-toggle"),this.pricingLabel=document.getElementById("pricing-label"),this.pricingPeriod=document.getElementById("pricing-period"),this.upgradeBtn=document.getElementById("upgrade-btn"),this.restoreBtn=document.getElementById("restore-btn")}getMonthlyBtn(){return this.monthlyBtn}getAnnualBtn(){return this.annualBtn}getPricingLabel(){return this.pricingLabel}getPricingPeriod(){return this.pricingPeriod}getUpgradeBtn(){return this.upgradeBtn}getRestoreBtn(){return this.restoreBtn}setMonthlyActive(){var e,t,a,s;(e=this.monthlyBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.monthlyBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.annualBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.annualBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$9.99"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ mes")}setAnnualActive(){var e,t,a,s;(e=this.annualBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.annualBtn)==null||t.classList.remove("text-on-surface-variant"),(a=this.monthlyBtn)==null||a.classList.remove("bg-white","shadow-sm","text-primary"),(s=this.monthlyBtn)==null||s.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$95.88"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ año")}}class re{constructor(){i(this,"view");this.view=new ie}async init(){this.view.render(),this.setupNavigation(),this.setupEventListeners()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const a=e.getAttribute("data-route");a&&await u.navigate(a)})})}setupEventListeners(){const e=this.view.getMonthlyBtn(),t=this.view.getAnnualBtn();e==null||e.addEventListener("click",()=>this.view.setMonthlyActive()),t==null||t.addEventListener("click",()=>this.view.setAnnualActive());const a=this.view.getUpgradeBtn();a==null||a.addEventListener("click",()=>{alert("Funcionalidad de pago en desarrollo. Esta es una simulación."),console.log("Iniciar proceso de suscripción Pro")});const s=this.view.getRestoreBtn();s==null||s.addEventListener("click",()=>{alert("Restauración de compra simulada"),console.log("Restaurar compra")})}destroy(){console.log("[PremiumController] Destroyed")}}let f=null;function le(){f&&(f.destroy(),f=null)}function m(l,e){u.register(l,async()=>{le();const t=e();f=t,await t.init()})}class oe{async init(){if(u.register("splash",async()=>{await new C().init()}),m("home",()=>new j),m("patients",()=>new se),m("library",()=>new ee),m("history",()=>new X),m("fluidotherapy",()=>new W),m("dosage",()=>new q),m("converter",()=>new V),m("anesthesia",()=>new $),m("premium",()=>new re),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("[SW] OK",t)).catch(t=>console.log("[SW] ERROR",t))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await u.navigate("splash");else{const t=u.resolveInitialRoute();await u.navigate(t)}}}new oe().init();
