var hs=Object.defineProperty;var ms=(n,e,t)=>e in n?hs(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var b=(n,e,t)=>ms(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();class fs{constructor(){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"currentRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"previousRoute",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.setupHashChangeListener()}setupHashChangeListener(){window.addEventListener("hashchange",async()=>{const e=this.getRouteFromHash();e&&e!==this.currentRoute&&await this.handleRoute(e)})}getRouteFromHash(){let e=window.location.hash.slice(1);return e.startsWith("/")&&(e=e.slice(1)),e?this.routes.has(e)?e:null:"home"}async handleRoute(e){const t=this.routes.get(e);if(!t){console.error(`[Router] No handler for route: ${e}`);return}try{this.previousRoute=this.currentRoute,this.currentRoute=e,console.log(`[Router] → ${e}`),await t()}catch(s){console.error(`[Router] Error in ${e}:`,s),e!=="home"&&await this.navigate("home")}}register(e,t){this.routes.has(e)&&console.warn(`[Router] Overwriting route: ${e}`),this.routes.set(e,t),console.log(`[Router] Registered: ${e}`)}async navigate(e){if(e===this.currentRoute)return;const t=e==="home"?"":e;if(window.location.hash.replace("#","")!==t){window.location.hash=t;return}await this.handleRoute(e)}resolveInitialRoute(){const e=this.getRouteFromHash();return e&&this.routes.has(e)?(console.log(`[Router] Initial route from hash: ${e}`),e):(console.log("[Router] No valid hash, default to home"),"home")}getCurrentRoute(){return this.currentRoute}getPreviousRoute(){return this.previousRoute}back(){window.history.back()}}const K=new fs,gs=`
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
`;class bs{constructor(){b(this,"progressBar",null);b(this,"messageElement",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=gs),this.setupElements()}setupElements(){this.progressBar=document.getElementById("progress-bar"),this.messageElement=document.getElementById("splash-message")}updateProgress(e){this.progressBar&&(this.progressBar.style.width=`${e}%`)}updateMessage(e){this.messageElement&&(this.messageElement.textContent=e)}}const vn=2800,yn=["Calibrating Clinical Toolkit...","Loading drug formularies...","Preparing calculation engines...","Almost ready..."],xn=[{id:"t1",text:"Check hydration status before finalizing deficit fluid calculations.",category:"fluid"},{id:"t2",text:"Always verify drug concentration on the vial label before calculating volume.",category:"dosage"},{id:"t3",text:"ASA classification should be confirmed before initiating any anesthetic protocol.",category:"anesthesia"},{id:"t4",text:"Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).",category:"general"},{id:"t5",text:"For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.",category:"fluid"},{id:"t6",text:"Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.",category:"anesthesia"},{id:"t7",text:"Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.",category:"dosage"},{id:"t8",text:"Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.",category:"anesthesia"}];class vs{constructor(){b(this,"view");b(this,"progress",0);b(this,"messageIndex",0);b(this,"intervalId",null);this.view=new bs}async init(){this.view.render(),await this.startLoading()}startLoading(){return new Promise(e=>{const t=Date.now();this.intervalId=window.setInterval(()=>{const s=Date.now()-t;this.progress=Math.min(100,s/vn*100),this.view.updateProgress(this.progress),Math.floor(s/700)>this.messageIndex&&this.messageIndex<yn.length-1&&(this.messageIndex++,this.view.updateMessage(yn[this.messageIndex])),s>=vn&&this.complete(e)},16)})}async complete(e){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.view.updateProgress(100),this.view.updateMessage("Ready!"),await new Promise(t=>setTimeout(t,300)),e(),await K.navigate("home")}}const ys=`
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface shadow-sm flex justify-between items-center px-container-padding h-touch-target-min z-50 transition-colors duration-200">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">pets</span>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">VetCalc</h1>
  </div>
  <div class="flex items-center gap-2">
    <!-- Redes Sociales -->
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
       class="p-2 rounded-full hover:bg-secondary/10 transition-all duration-200 hover:scale-110 text-secondary hover:text-secondary/80">
      <span class="material-symbols-outlined text-xl">instagram</span>
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
       class="p-2 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-110 text-primary hover:text-primary/80">
      <span class="material-symbols-outlined text-xl">facebook</span>
    </a>
    <!-- Notificaciones -->
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-all duration-200 hover:scale-105">
      <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
    </button>
    <!-- Perfil -->
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-all duration-200 hover:scale-105">
      <span class="material-symbols-outlined text-primary">account_circle</span>
    </button>
    <!-- Premium -->
    <button class="premium-badge flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-all duration-200 bg-surface-container-high text-on-surface-variant border-outline-variant hover:scale-105 hover:shadow-md" data-route="premium">
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
      <span class="font-label-sm text-label-sm">PREMIUM</span>
    </button>
  </div>
</header>

<main class="px-container-padding pt-4 pb-24 space-y-6">
  <!-- Bienvenida -->
  <section class="space-y-1">
    <div class="flex items-center justify-between">
      <div>
        <p class="font-label-md text-label-md text-on-surface-variant">Bienvenido de nuevo</p>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface" id="greeting">Hola, Dr. Smith</h2>
      </div>
      <span class="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-3 py-1 rounded-full font-bold animate-pulse">⭐ Mejor App del 2024</span>
    </div>
    <div class="w-12 h-1 bg-secondary rounded-full mt-2"></div>
  </section>

  <!-- Módulos -->
  <div class="grid grid-cols-2 gap-4">
    <!-- Fluidoterapia (amarillo) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/20 hover:bg-primary/30" data-route="fluidotherapy">
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/dog1/200/100" alt="Fluidoterapia" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-primary group-hover:text-primary/80">Fluidoterapia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">IV rates & deficits</p>
      </div>
    </div>

    <!-- Dosis (azul) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-secondary/20 hover:bg-secondary/30" data-route="dosage">
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/cat1/200/100" alt="Dosis" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-secondary group-hover:text-secondary/80">Calculadora de Dosis</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Mg/kg accurate dosing</p>
      </div>
    </div>

    <!-- Anestesia (naranja) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative bg-tertiary/20 hover:bg-tertiary/30 border-2 border-tertiary/20" data-route="anesthesia">
      <div class="absolute top-2 right-2 z-10">
        <span class="material-symbols-outlined text-tertiary text-sm" style="font-variation-settings: 'FILL' 1;">crown</span>
      </div>
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/dog2/200/100" alt="Anestesia" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-tertiary group-hover:text-tertiary/80">Anestesia</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Protocols & CRI</p>
      </div>
    </div>

    <!-- Convertidor (amarillo) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/10 hover:bg-primary/20" data-route="converter">
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/rabbit/200/100" alt="Convertidor" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-primary group-hover:text-primary/80">Convertidor</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Weight, Temp, Vol</p>
      </div>
    </div>

    <!-- Biblioteca (gris) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-surface-container-highest/50 hover:bg-surface-container-highest/70" data-route="library">
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/bird/200/100" alt="Biblioteca" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-on-surface group-hover:text-on-surface/80">Biblioteca</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Reference guides</p>
      </div>
    </div>

    <!-- Pacientes (gris) -->
    <div class="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-surface-container-highest/40 hover:bg-surface-container-highest/60" data-route="patients">
      <div class="h-24 overflow-hidden">
        <img src="https://picsum.photos/seed/puppy/200/100" alt="Pacientes" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-3 transition-colors duration-200">
        <h3 class="font-label-md text-label-md font-bold text-on-surface group-hover:text-on-surface/80">Pacientes</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Active case files</p>
      </div>
    </div>
  </div>

  <!-- Recordatorios -->
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-headline-md text-headline-md">Programación Recordatorios</h3>
      <div class="flex gap-2">
        <button class="text-primary font-label-sm text-label-sm border-b-2 border-primary pb-0.5 transition-all duration-200 hover:text-primary/80 hover:border-primary/80" id="reminder-calendar-btn">Calendario</button>
        <button class="text-on-surface-variant font-label-sm text-label-sm transition-all duration-200 hover:text-primary/80" id="reminder-expired-btn">Vencidos</button>
      </div>
    </div>
    <div class="space-y-3" id="reminders-container"></div>
  </section>

  <!-- Seguimiento Peso -->
  <section class="space-y-3">
    <h3 class="font-headline-md text-headline-md">Seguimiento Peso</h3>
    <div class="space-y-3" id="weight-container"></div>
  </section>
</main>

<!-- BottomNavBar -->
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
`;class xs{constructor(){Object.defineProperty(this,"recentHistoryContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsContainer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"tipElement",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"recentPatientsSection",{enumerable:!0,configurable:!0,writable:!0,value:null})}render(){const e=document.getElementById("app");e&&(e.innerHTML=ys),document.body.classList.remove("splash-body"),this.setupElements()}setupElements(){this.recentHistoryContainer=document.getElementById("recent-history-container"),this.recentPatientsContainer=document.getElementById("recent-patients-container"),this.tipElement=document.getElementById("tip-of-the-day"),this.recentPatientsSection=document.getElementById("recent-patients-section")}getRecentHistoryContainer(){return this.recentHistoryContainer}getRecentPatientsContainer(){return this.recentPatientsContainer}getTipElement(){return this.tipElement}showRecentPatientsSection(){this.recentPatientsSection&&(this.recentPatientsSection.style.display="block")}getViewAllHistoryButton(){return document.getElementById("view-all-history")}getViewAllPatientsButton(){return document.getElementById("view-all-patients")}getModuleCards(){return document.querySelectorAll(".glass-card[data-route]")}getBottomNavLinks(){return document.querySelectorAll("nav a[data-route]")}getSearchButton(){var e;return((e=document.querySelector('button span[data-icon="search"]'))==null?void 0:e.parentElement)||null}getProfileButton(){var e;return((e=document.querySelector('button span[data-icon="account_circle"]'))==null?void 0:e.parentElement)||null}}const ws=[{id:"p-001",name:"Buddy",species:"canine",breed:"Golden Retriever",weightKg:28.5,ageMonths:36,ownerName:"Sarah Connor",status:"stable",observations:"Post-op check; recovering well from orthopaedic surgery.",createdAt:new Date(Date.now()-1e3*60*60*3),updatedAt:new Date(Date.now()-1e3*60*30)},{id:"p-002",name:"Luna",species:"feline",breed:"Siamese Mix",weightKg:4.2,ageMonths:18,ownerName:"James Carter",status:"in-surgery",observations:"Ovariohysterectomy in progress.",createdAt:new Date(Date.now()-1e3*60*60*5),updatedAt:new Date(Date.now()-1e3*60*10)},{id:"p-003",name:"Max",species:"canine",breed:"Beagle",weightKg:11.3,ageMonths:60,ownerName:"Maria López",status:"discharged",observations:"Discharged post dental prophylaxis.",createdAt:new Date(Date.now()-1e3*60*60*26),updatedAt:new Date(Date.now()-1e3*60*60*2)},{id:"p-004",name:"Bella",species:"canine",breed:"Pomeranian",weightKg:3.1,ageMonths:14,ownerName:"Tom Baker",status:"stable",observations:"Follow-up vaccination and weight check.",createdAt:new Date(Date.now()-1e3*60*60*48),updatedAt:new Date(Date.now()-1e3*60*45)}],_s=[{id:"h-001",type:"dosage",patientId:"p-001",patientName:"Bella",patientSpecies:"canine",patientWeightKg:12.4,inputs:{drug:"Amoxicilina",dosePerKg:10,weightKg:12.4,concentrationMgMl:50},result:{totalMg:124,volumeMl:2.48},summary:"Amoxicilina — 124 mg · 2.48 mL",createdAt:new Date(Date.now()-1e3*60*120)},{id:"h-002",type:"fluidotherapy",patientId:"p-002",patientName:"Oliver",patientSpecies:"feline",patientWeightKg:4.5,inputs:{weightKg:4.5,dehydrationPct:5,maintenanceMlKgDay:40,lossesMlDay:0,dripFactor:15,hours:24},result:{deficitMl:225,maintenanceMl:180,totalMl:405,mlPerHour:16.9,dropsPerMin:4},summary:"Fluidoterapia LRS — 16.9 mL/h",createdAt:new Date(Date.now()-1e3*60*300)},{id:"h-003",type:"anesthesia",patientId:"p-003",patientName:"Max",patientSpecies:"equine",patientWeightKg:450,inputs:{drug:"Fentanyl",doseUgKgHr:3,weightKg:450},result:{totalUgHr:1350,mlHr:2.7},summary:"CRI Fentanyl — 3 μg/kg/hr",createdAt:new Date(Date.now()-1e3*60*60*22)},{id:"h-004",type:"dosage",patientId:"p-002",patientName:"Luna",patientSpecies:"canine",patientWeightKg:8.9,inputs:{drug:"Propofol",dosePerKg:4,weightKg:8.9,concentrationMgMl:10},result:{totalMg:35.6,volumeMl:3.56},summary:"Propofol Induction — 35.6 mg · 3.56 mL",createdAt:new Date(Date.now()-1e3*60*60*26)},{id:"h-005",type:"dosage",patientId:"p-004",patientName:"Bear",patientSpecies:"canine",patientWeightKg:25,inputs:{drug:"50% Dextrose",dosePerKg:.5,weightKg:25,concentrationMgMl:500},result:{totalMg:12500,volumeMl:12.5},summary:"Glucose Supplement — 50% Dextrose 12.5 mL",createdAt:new Date(Date.now()-1e3*60*60*27)}],Es={activeCases:24,inSurgery:3,todayCalculations:7};class ks{getRecentPatients(e=4){return ws.slice(0,e)}getRecentHistory(e=5){return _s.slice(0,e)}getDashboardStats(){return{...Es}}}const mt=new ks;class Is{constructor(){b(this,"isPremium",!1);b(this,"listeners",[]);const e=localStorage.getItem("vetcalc-premium");this.isPremium=e==="true"}getStatus(){return this.isPremium}setStatus(e){this.isPremium=e,localStorage.setItem("vetcalc-premium",String(e)),this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{const t=this.listeners.indexOf(e);t!==-1&&this.listeners.splice(t,1)}}notifyListeners(){this.listeners.forEach(e=>e(this.isPremium))}}const Le=new Is;function wn(n){document.querySelectorAll(".premium-badge").forEach(t=>{n?(t.classList.remove("bg-surface-container-high","text-on-surface-variant","border-outline-variant"),t.classList.add("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary")):(t.classList.remove("bg-tertiary-fixed","text-on-tertiary-fixed","border-tertiary"),t.classList.add("bg-surface-container-high","text-on-surface-variant","border-outline-variant"))})}class de{constructor(){b(this,"premiumUnsubscribe",null)}setupGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{if(e._navListener)return;const t=async s=>{s.preventDefault();const a=e.getAttribute("data-route");a&&await K.navigate(a)};e.addEventListener("click",t),e._navListener=t})}initPremiumBadge(){const e=Le.getStatus();wn(e),this.premiumUnsubscribe=Le.subscribe(t=>{wn(t)})}destroyPremiumBadge(){this.premiumUnsubscribe&&(this.premiumUnsubscribe(),this.premiumUnsubscribe=null)}destroyGlobalNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e._navListener&&(e.removeEventListener("click",e._navListener),delete e._navListener)})}}class Ls extends de{constructor(){super();b(this,"view");b(this,"onlineStatus",!0);b(this,"onlineHandler",()=>{this.updateOnlineStatus(!0)});b(this,"offlineHandler",()=>{this.updateOnlineStatus(!1)});this.view=new xs}async init(){this.view.render(),document.querySelectorAll(".glass-card").forEach(t=>{const s=t;s.addEventListener("click",a=>{const r=document.createElement("span");r.classList.add("ripple"),s.appendChild(r);const i=s.getBoundingClientRect(),o=a.clientX-i.left,l=a.clientY-i.top;r.style.left=`${o}px`,r.style.top=`${l}px`,setTimeout(()=>r.remove(),600)})}),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupSpecificListeners(),this.setupElements(),this.renderRecentPatients(),this.renderRecentHistory(),this.renderTipOfTheDay(),this.setupConnectivityMonitoring(),this.updateOnlineStatus(navigator.onLine)}destroy(){window.removeEventListener("online",this.onlineHandler),window.removeEventListener("offline",this.offlineHandler),this.destroyPremiumBadge(),console.log("[HomeController] Destroyed")}setupSpecificListeners(){const t=this.view.getSearchButton();t&&t.addEventListener("click",()=>console.log("[Home] Search clicked"));const s=this.view.getProfileButton();s&&s.addEventListener("click",()=>console.log("[Home] Profile clicked"));const a=this.view.getViewAllHistoryButton();a&&a.addEventListener("click",async()=>this.navigateToModule("history"));const r=this.view.getViewAllPatientsButton();r&&r.addEventListener("click",async()=>this.navigateToModule("patients"))}setupElements(){this.view.showRecentPatientsSection()}async navigateToModule(t){console.log(`[Home] Navigating to: ${t}`),await K.navigate(t)}renderRecentPatients(){const t=mt.getRecentPatients(4),s=this.view.getRecentPatientsContainer();s&&(s.innerHTML="",t.forEach(a=>{s.appendChild(this.createPatientCard(a))}))}createPatientCard(t){const s=document.createElement("div");s.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";const a=(t.species==="canine","pets");return s.innerHTML=`
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${a}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(t.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${t.species} • ${t.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${t.status}</span>
    `,s.style.cursor="pointer",s.addEventListener("click",()=>console.log(`[Home] View patient: ${t.name}`)),s}renderRecentHistory(){const t=mt.getRecentHistory(2),s=this.view.getRecentHistoryContainer();s&&(s.innerHTML="",t.forEach(a=>{s.appendChild(this.createHistoryItem(a))}))}createHistoryItem(t){const s=document.createElement("div");s.className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30";let a="history",r="bg-secondary-fixed";switch(t.type){case"dosage":a="medication",r="bg-secondary-fixed";break;case"fluidotherapy":a="water_drop",r="bg-secondary-fixed";break;case"anesthesia":a="air",r="bg-tertiary-fixed";break;case"converter":a="sync_alt",r="bg-surface-container-highest";break}const i=this.getRelativeTime(t.createdAt),o=t.summary.substring(0,40)+(t.summary.length>40?"...":""),l=t.patientName||"Unknown",u=t.patientSpecies||"N/A",c=t.patientWeightKg||"?";return s.innerHTML=`
      <div class="w-10 h-10 rounded-full ${r} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${a}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(o)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(l)} (${u}, ${c}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${i}</span>
    `,s.style.cursor="pointer",s.addEventListener("click",()=>console.log(`[Home] View calculation: ${t.type}`)),s}getRelativeTime(t){const s=Date.now()-t.getTime(),a=Math.floor(s/6e4),r=Math.floor(s/36e5),i=Math.floor(s/864e5);return a<1?"Just now":a<60?`${a}m ago`:r<24?`${r}h ago`:`${i}d ago`}renderTipOfTheDay(){const t=xn[Math.floor(Math.random()*xn.length)],s=this.view.getTipElement();s&&(s.textContent=t.text)}setupConnectivityMonitoring(){window.addEventListener("online",this.onlineHandler),window.addEventListener("offline",this.offlineHandler)}updateOnlineStatus(t){this.onlineStatus=t;let s=document.getElementById("online-status");if(s||document.querySelector("header")&&(s=document.createElement("div"),s.id="online-status",s.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300",document.body.insertBefore(s,document.body.firstChild)),s)if(t)s.textContent="● Online",s.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300",setTimeout(()=>{s&&this.onlineStatus&&(s.style.opacity="0",setTimeout(()=>{if(s&&this.onlineStatus){s.style.display="none";const a=document.querySelector("header");a&&(a.style.marginTop="0px")}},300))},3e3);else{s.textContent="⚠ You are offline - Some features may be limited",s.className="fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300",s.style.display="block";const a=document.querySelector("header");a&&(a.style.marginTop="24px")}}escapeHtml(t){const s=document.createElement("div");return s.textContent=t,s.innerHTML}}const Bs=`
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
`;class Ps{constructor(){b(this,"container",null);b(this,"inputLeft",null);b(this,"inputRight",null);b(this,"labelLeft",null);b(this,"labelRight",null);b(this,"unitLeft",null);b(this,"unitRight",null);b(this,"referenceText",null);b(this,"tabs",null);b(this,"swapBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Bs),this.cacheElements()}cacheElements(){this.inputLeft=document.getElementById("input-left"),this.inputRight=document.getElementById("input-right"),this.labelLeft=document.getElementById("label-left"),this.labelRight=document.getElementById("label-right"),this.unitLeft=document.getElementById("unit-left"),this.unitRight=document.getElementById("unit-right"),this.referenceText=document.getElementById("reference-text"),this.tabs=document.querySelectorAll("[data-mode]"),this.swapBtn=document.getElementById("swap-btn")}getInputLeft(){return this.inputLeft}getInputRight(){return this.inputRight}getLabelLeft(){return this.labelLeft}getLabelRight(){return this.labelRight}getUnitLeft(){return this.unitLeft}getUnitRight(){return this.unitRight}getReferenceText(){return this.referenceText}getTabs(){return this.tabs}getSwapBtn(){return this.swapBtn}updateLeftLabel(e){this.labelLeft&&(this.labelLeft.textContent=e)}updateRightLabel(e){this.labelRight&&(this.labelRight.textContent=e)}updateLeftUnit(e){this.unitLeft&&(this.unitLeft.textContent=e)}updateRightUnit(e){this.unitRight&&(this.unitRight.textContent=e)}updateReference(e){this.referenceText&&(this.referenceText.textContent=e)}clearInputs(){this.inputLeft&&(this.inputLeft.value=""),this.inputRight&&(this.inputRight.value="")}setInputLeftValue(e){this.inputLeft&&e!==void 0&&(this.inputLeft.value=e)}setInputRightValue(e){this.inputRight&&e!==void 0&&(this.inputRight.value=e)}getInputLeftValue(){const e=this.inputLeft;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const s=parseFloat(t);return isNaN(s)?null:s}getInputRightValue(){const e=this.inputRight;if(!e)return null;const t=e.value;if(t===""||t===void 0)return null;const s=parseFloat(t);return isNaN(s)?null:s}}class Cs extends de{constructor(){super();b(this,"view");b(this,"currentMode","weight");b(this,"modes",{weight:{leftLabel:"Libras (lb)",leftUnit:"lb",rightLabel:"Kilogramos (kg)",rightUnit:"kg",reference:"Para cálculos rápidos de dosis, recuerde que 1 kg son aproximadamente 2.2 lb.",convert:(t,s)=>s==="leftToRight"?t/2.20462:t*2.20462},temp:{leftLabel:"Fahrenheit (°F)",leftUnit:"°F",rightLabel:"Celsius (°C)",rightUnit:"°C",reference:"Rango normal en perros/gatos: 101.0°F - 102.5°F (38.3°C - 39.2°C).",convert:(t,s)=>s==="leftToRight"?(t-32)*5/9:t*9/5+32},volume:{leftLabel:"Onzas líquidas (fl oz)",leftUnit:"fl oz",rightLabel:"Mililitros (mL)",rightUnit:"mL",reference:"Medición estándar: 1 fl oz ≈ 29.57 mL (en clínica se redondea a 30 mL).",convert:(t,s)=>s==="leftToRight"?t*29.5735:t/29.5735}});this.view=new Ps}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.applyMode("weight")}setupEventListeners(){const t=this.view.getTabs();t==null||t.forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-mode");o&&this.modes[o]&&this.applyMode(o)})});const s=this.view.getInputLeft(),a=this.view.getInputRight();s==null||s.addEventListener("input",()=>this.convertFromLeft()),a==null||a.addEventListener("input",()=>this.convertFromRight());const r=this.view.getSwapBtn();r==null||r.addEventListener("click",()=>this.swap())}applyMode(t){this.currentMode=t;const s=this.modes[t];this.view.updateLeftLabel(s.leftLabel),this.view.updateRightLabel(s.rightLabel),this.view.updateLeftUnit(s.leftUnit),this.view.updateRightUnit(s.rightUnit),this.view.updateReference(s.reference),this.view.clearInputs();const a=this.view.getTabs();a==null||a.forEach(r=>{r.getAttribute("data-mode")===t?(r.classList.add("bg-surface","text-primary","shadow-sm"),r.classList.remove("text-on-surface-variant","hover:bg-surface-container-high")):(r.classList.remove("bg-surface","text-primary","shadow-sm"),r.classList.add("text-on-surface-variant","hover:bg-surface-container-high"))})}convertFromLeft(){const t=this.view.getInputLeftValue();if(t!==null){const a=this.modes[this.currentMode].convert(t,"leftToRight");this.view.setInputRightValue(a.toFixed(2))}else this.view.setInputRightValue("")}convertFromRight(){const t=this.view.getInputRightValue();if(t!==null){const a=this.modes[this.currentMode].convert(t,"rightToLeft");this.view.setInputLeftValue(a.toFixed(2))}else this.view.setInputLeftValue("")}swap(){const t=this.view.getInputLeftValue(),s=this.view.getInputRightValue();t!==null?this.view.setInputRightValue(t.toFixed(2)):this.view.setInputRightValue(""),s!==null?this.view.setInputLeftValue(s.toFixed(2)):this.view.setInputLeftValue(""),this.convertFromLeft()}destroy(){this.destroyPremiumBadge(),console.log("[ConverterController] Destroyed")}}const Ss=`
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
`;class As{constructor(){b(this,"container",null);b(this,"patientDetailsEl",null);b(this,"weightDisplayEl",null);b(this,"asaStatusEl",null);b(this,"premedListEl",null);b(this,"inductionListEl",null);b(this,"summaryBodyEl",null);b(this,"totalFluidsEl",null);b(this,"finalizeBtn",null);b(this,"printBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ss),this.cacheElements()}cacheElements(){this.patientDetailsEl=document.getElementById("patient-details"),this.weightDisplayEl=document.getElementById("weight-display"),this.asaStatusEl=document.getElementById("asa-status"),this.premedListEl=document.getElementById("premed-list"),this.inductionListEl=document.getElementById("induction-list"),this.summaryBodyEl=document.getElementById("summary-table-body"),this.totalFluidsEl=document.getElementById("total-fluids"),this.finalizeBtn=document.getElementById("finalize-btn"),this.printBtn=document.getElementById("print-pdf-btn")}getPremedList(){return this.premedListEl}getInductionList(){return this.inductionListEl}getSummaryBody(){return this.summaryBodyEl}getTotalFluidsEl(){return this.totalFluidsEl}getFinalizeBtn(){return this.finalizeBtn}getPrintBtn(){return this.printBtn}updatePatientInfo(e,t,s,a){this.patientDetailsEl&&(this.patientDetailsEl.textContent=`${e} • ${t} • ${s} kg`),this.weightDisplayEl&&(this.weightDisplayEl.textContent=`${s} kg`),this.asaStatusEl&&(this.asaStatusEl.textContent=a)}renderDrugList(e,t,s){e.innerHTML="";for(const a of t){const r=document.createElement("label");r.className=`flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border shadow-sm hover:border-primary cursor-pointer transition-all ${a.selected?"border-primary":"border-outline-variant"}`;const i=document.createElement("input");i.type="checkbox",i.checked=a.selected,i.className="w-6 h-6 rounded border-outline text-primary focus:ring-primary custom-checkbox",i.addEventListener("change",u=>{const c=u.target.checked;s(a.name,c),c?(r.classList.add("border-primary"),r.classList.remove("opacity-60")):(r.classList.remove("border-primary"),r.classList.add("opacity-60"))});const o=document.createElement("div");o.className="flex-grow",o.innerHTML=`
        <div class="flex justify-between">
          <span class="font-label-md text-label-md text-on-surface">${a.name}</span>
          <span class="font-label-sm text-label-sm text-outline">${a.dosePerKg} mg/kg</span>
        </div>
        <p class="font-body-md text-on-surface-variant">${a.category==="premed"?"Sedante / Analgésico":"Agente de inducción"}</p>
      `;const l=document.createElement("div");l.className="text-right",l.id=`drug-values-${a.name.replace(/\s/g,"")}`,this.updateDrugValuesUI(l,a,28.5),r.appendChild(i),r.appendChild(o),r.appendChild(l),e.appendChild(r)}}updateDrugValuesUI(e,t,s){const a=t.dosePerKg*s,r=a/t.concentration;e.innerHTML=`
      <p class="font-headline-md text-headline-md text-primary">${a.toFixed(2)} mg</p>
      <p class="font-label-sm text-label-sm text-outline">${r.toFixed(2)} mL</p>
    `}renderSummary(e,t,s){if(this.summaryBodyEl){this.summaryBodyEl.innerHTML="";for(const a of e){if(!a.selected)continue;const r=a.dosePerKg*t,i=r/a.concentration,o=document.createElement("tr");o.className="divide-y divide-outline-variant",o.innerHTML=`
        <td class="p-4">
          <p class="font-label-md text-label-md">${a.name}</p>
          <p class="text-[10px] text-outline uppercase tracking-wider">${a.category==="premed"?"Premedicación":"Inducción"}</p>
        </td>
        <td class="p-4 font-body-md">${r.toFixed(2)} mg</td>
        <td class="p-4 text-right font-headline-md text-primary">${i.toFixed(2)} mL</td>
      `,this.summaryBodyEl.appendChild(o)}this.totalFluidsEl&&(this.totalFluidsEl.textContent=`${s.toFixed(1)} mL`)}}}class Rs{constructor(){b(this,"view");b(this,"weightKg",28.5);b(this,"drugs",[{name:"Acepromazina",dosePerKg:.02,concentration:10,category:"premed",selected:!0},{name:"Butorfanol",dosePerKg:.2,concentration:10,category:"premed",selected:!0},{name:"Propofol",dosePerKg:4,concentration:10,category:"induction",selected:!0}]);this.view=new As}async init(){this.view.render(),this.setupEventListeners(),this.renderDrugLists(),this.updateSummaryAndFluids()}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",async a=>{a.preventDefault();const r=s.getAttribute("data-route");r&&await K.navigate(r)})});const e=this.view.getFinalizeBtn();e==null||e.addEventListener("click",()=>{alert("Protocolo guardado (simulación)"),console.log("Protocolo finalizado:",this.drugs.filter(s=>s.selected))});const t=this.view.getPrintBtn();t==null||t.addEventListener("click",()=>{console.log("Generar PDF")})}renderDrugLists(){const e=this.view.getPremedList(),t=this.view.getInductionList();if(!e||!t)return;const s=this.drugs.filter(r=>r.category==="premed"),a=this.drugs.filter(r=>r.category==="induction");this.view.renderDrugList(e,s,(r,i)=>{const o=this.drugs.find(l=>l.name===r);o&&(o.selected=i),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()}),this.view.renderDrugList(t,a,(r,i)=>{const o=this.drugs.find(l=>l.name===r);o&&(o.selected=i),this.updateSummaryAndFluids(),this.refreshDrugValuesUI()})}refreshDrugValuesUI(){const e=this.drugs;for(const t of e){const s=document.getElementById(`drug-values-${t.name.replace(/\s/g,"")}`);s&&this.view.updateDrugValuesUI(s,t,this.weightKg)}}updateSummaryAndFluids(){const e=this.drugs.filter(s=>s.selected),t=this.weightKg*5;this.view.renderSummary(e,this.weightKg,t)}destroy(){console.log("[AnesthesiaController] Destroyed")}}const Ds=`
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
`;class js{constructor(){b(this,"drugInput",null);b(this,"weightInput",null);b(this,"dosageInput",null);b(this,"concentrationInput",null);b(this,"calculateBtn",null);b(this,"resultContainer",null);b(this,"resultVolumeSpan",null);b(this,"resultDosageSpan",null);b(this,"logBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ds),this.cacheElements()}cacheElements(){this.drugInput=document.getElementById("drug-name"),this.weightInput=document.getElementById("weight"),this.dosageInput=document.getElementById("dosage"),this.concentrationInput=document.getElementById("concentration"),this.calculateBtn=document.getElementById("calculate-btn"),this.resultContainer=document.getElementById("result-container"),this.resultVolumeSpan=document.getElementById("result-volume"),this.resultDosageSpan=document.getElementById("result-dosage"),this.logBtn=document.getElementById("log-btn")}getDrugName(){var e;return((e=this.drugInput)==null?void 0:e.value)||""}getWeight(){var t;const e=(t=this.weightInput)==null?void 0:t.value;return e?parseFloat(e):0}getDosageMgPerKg(){var t;const e=(t=this.dosageInput)==null?void 0:t.value;return e?parseFloat(e):0}getConcentrationMgPerMl(){var t;const e=(t=this.concentrationInput)==null?void 0:t.value;return e?parseFloat(e):0}setDrugName(e){this.drugInput&&(this.drugInput.value=e)}setWeight(e){this.weightInput&&(this.weightInput.value=e.toString())}setDosage(e){this.dosageInput&&(this.dosageInput.value=e.toString())}setConcentration(e){this.concentrationInput&&(this.concentrationInput.value=e.toString())}showResult(e,t){this.resultContainer&&(this.resultContainer.classList.remove("opacity-0","translate-y-4"),this.resultContainer.classList.add("opacity-100","translate-y-0")),this.resultVolumeSpan&&(this.resultVolumeSpan.textContent=`${t.toFixed(2)} mL`),this.resultDosageSpan&&(this.resultDosageSpan.textContent=`Dosis: ${e.toFixed(2)} mg total`)}hideResult(){this.resultContainer&&(this.resultContainer.classList.add("opacity-0","translate-y-4"),this.resultContainer.classList.remove("opacity-100","translate-y-0"))}getCalculateButton(){return this.calculateBtn}getLogButton(){return this.logBtn}highlightDrugInput(e){this.drugInput&&(e?this.drugInput.classList.add("border-primary"):this.drugInput.classList.remove("border-primary"))}}class Ms extends de{constructor(){super();b(this,"view");this.view=new js}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.view.setWeight(28.5),this.view.setDosage(5),this.view.setConcentration(50),this.view.hideResult()}setupEventListeners(){const t=this.view.getCalculateButton();t==null||t.addEventListener("click",()=>{this.calculate(),t.classList.add("scale-95"),setTimeout(()=>t.classList.remove("scale-95"),150)});const s=this.view.getLogButton();s==null||s.addEventListener("click",()=>{this.saveToHistory()});const a=document.getElementById("drug-name");a==null||a.addEventListener("input",r=>{const i=r.target;this.view.highlightDrugInput(i.value.length>0)})}calculate(){const t=this.view.getWeight(),s=this.view.getDosageMgPerKg(),a=this.view.getConcentrationMgPerMl();if(t<=0||s<=0||a<=0){alert("Por favor ingrese valores válidos (positivos) para peso, dosis y concentración.");return}const r=t*s,i=r/a;this.view.showResult(r,i)}saveToHistory(){console.log("Guardar cálculo en historial:",{drug:this.view.getDrugName(),weight:this.view.getWeight(),dosagePerKg:this.view.getDosageMgPerKg(),concentration:this.view.getConcentrationMgPerMl(),timestamp:new Date().toISOString()}),alert("Cálculo guardado en el historial (simulado).")}destroy(){this.destroyPremiumBadge(),console.log("[DosageController] Destroyed")}}const Ts=`
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
`;class Fs{constructor(){b(this,"weightInput",null);b(this,"dehydrationInput",null);b(this,"dehydrationValueSpan",null);b(this,"maintenanceInput",null);b(this,"lossesInput",null);b(this,"totalVolumeSpan",null);b(this,"hourlyRateSpan",null);b(this,"dripRateSpan",null);b(this,"dripButtons",null);b(this,"maintenancePresetBtns",null);b(this,"saveBtn",null);b(this,"reportBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Ts),this.cacheElements()}cacheElements(){this.weightInput=document.getElementById("weight"),this.dehydrationInput=document.getElementById("dehydration"),this.dehydrationValueSpan=document.getElementById("dehydration-value"),this.maintenanceInput=document.getElementById("maintenance"),this.lossesInput=document.getElementById("losses"),this.totalVolumeSpan=document.getElementById("total-volume"),this.hourlyRateSpan=document.getElementById("hourly-rate"),this.dripRateSpan=document.getElementById("drip-rate"),this.dripButtons=document.querySelectorAll(".drip-btn"),this.maintenancePresetBtns=document.querySelectorAll("[data-maintenance]"),this.saveBtn=document.getElementById("save-btn"),this.reportBtn=document.getElementById("report-btn")}getWeight(){var e;return parseFloat(((e=this.weightInput)==null?void 0:e.value)||"0")}getDehydrationPercent(){var e;return parseFloat(((e=this.dehydrationInput)==null?void 0:e.value)||"0")}getMaintenance(){var e;return parseFloat(((e=this.maintenanceInput)==null?void 0:e.value)||"0")}getLosses(){var e;return parseFloat(((e=this.lossesInput)==null?void 0:e.value)||"0")}setDehydrationDisplay(e){this.dehydrationValueSpan&&(this.dehydrationValueSpan.textContent=`${e}%`)}updateResults(e,t,s){this.totalVolumeSpan&&(this.totalVolumeSpan.textContent=e.toFixed(1)),this.hourlyRateSpan&&(this.hourlyRateSpan.textContent=t.toFixed(1)),this.dripRateSpan&&(this.dripRateSpan.textContent=Math.round(s).toString())}onWeightInput(e){var t;(t=this.weightInput)==null||t.addEventListener("input",e)}onDehydrationInput(e){var t;(t=this.dehydrationInput)==null||t.addEventListener("input",e)}onMaintenanceInput(e){var t;(t=this.maintenanceInput)==null||t.addEventListener("input",e)}onLossesInput(e){var t;(t=this.lossesInput)==null||t.addEventListener("input",e)}onDripButtonClick(e){var t;(t=this.dripButtons)==null||t.forEach(s=>{s.addEventListener("click",()=>{var r;const a=parseInt(s.getAttribute("data-drip")||"15");e(a),(r=this.dripButtons)==null||r.forEach(i=>{i.classList.remove("border-primary","bg-primary-container/20","text-primary"),i.classList.add("border-transparent","bg-surface-container-high","text-on-surface-variant")}),s.classList.add("border-primary","bg-primary-container/20","text-primary"),s.classList.remove("border-transparent","bg-surface-container-high","text-on-surface-variant")})})}onMaintenancePreset(e){var t;(t=this.maintenancePresetBtns)==null||t.forEach(s=>{s.addEventListener("click",()=>{const a=parseInt(s.getAttribute("data-maintenance")||"0");e(a)})})}onSave(e){var t;(t=this.saveBtn)==null||t.addEventListener("click",e)}onReport(e){var t;(t=this.reportBtn)==null||t.addEventListener("click",e)}}class Ks extends de{constructor(){super();b(this,"view");b(this,"currentDripFactor",15);this.view=new Fs}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners(),this.calculate()}setupEventListeners(){this.view.onWeightInput(()=>this.calculate()),this.view.onDehydrationInput(()=>{const t=this.view.getDehydrationPercent();this.view.setDehydrationDisplay(t),this.calculate()}),this.view.onMaintenanceInput(()=>this.calculate()),this.view.onLossesInput(()=>this.calculate()),this.view.onDripButtonClick(t=>{this.currentDripFactor=t,this.calculate()}),this.view.onMaintenancePreset(t=>{this.view.maintenanceInput&&(this.view.maintenanceInput.value=t.toString(),this.calculate())}),this.view.onSave(()=>{alert("Protocolo guardado (simulación)"),console.log("Fluidoterapia guardada")}),this.view.onReport(()=>{console.log("Generar reporte PDF"),alert("Función de reporte en desarrollo")})}calculate(){const t=this.view.getWeight(),s=this.view.getDehydrationPercent(),a=this.view.getMaintenance(),r=this.view.getLosses(),i=t*s*10,o=t*a,l=i+o+r,u=l/24,c=u*this.currentDripFactor/60;this.view.updateResults(l,u,c)}destroy(){this.destroyPremiumBadge(),console.log("[FluidotherapyController] Destroyed")}}const Os=`
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
`;class Ns{constructor(){b(this,"historyContainer",null);b(this,"filterButtons",null);b(this,"loadMoreBtn",null);b(this,"searchFab",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Os),this.cacheElements()}cacheElements(){this.historyContainer=document.getElementById("history-list"),this.filterButtons=document.querySelectorAll("#filter-buttons button"),this.loadMoreBtn=document.getElementById("load-more-btn"),this.searchFab=document.getElementById("search-fab")}getHistoryContainer(){return this.historyContainer}getFilterButtons(){return this.filterButtons}getLoadMoreButton(){return this.loadMoreBtn}getSearchFab(){return this.searchFab}renderHistoryList(e,t){if(!this.historyContainer)return;if(e.length===0){this.historyContainer.innerHTML=`
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-5xl text-outline mb-2">history</span>
          <p class="text-on-surface-variant">No hay registros para mostrar</p>
        </div>
      `;return}const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()-1);const r=e.filter(u=>new Date(u.timestamp)>=s),i=e.filter(u=>{const c=new Date(u.timestamp);return c<s&&c>=a}),o=e.filter(u=>new Date(u.timestamp)<a);let l="";r.length&&(l+='<div class="flex items-center gap-2 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Hoy</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(r)),i.length&&(l+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Ayer</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(i)),o.length&&(l+='<div class="flex items-center gap-2 mt-8 mb-2"><span class="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Anterior</span><div class="h-[1px] flex-grow bg-outline-variant"></div></div>',l+=this.renderRecordGroup(o)),this.historyContainer.innerHTML=l,document.querySelectorAll(".history-card-hover").forEach(u=>{u.addEventListener("click",c=>{const p=u.getAttribute("data-id");console.log(`Ver detalle de registro: ${p}`)})})}renderRecordGroup(e){return e.map(t=>{const s=this.getIconForType(t.type),a=this.getBgClassForType(t.type),r=this.getTextColorClassForType(t.type),i=this.getRelativeTime(t.timestamp),o=t.isPremium?`<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>`:"";return`
        <div class="history-card-hover bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 cursor-pointer" data-id="${t.id}">
          <div class="h-12 w-12 rounded-lg ${a} flex items-center justify-center ${r}">
            <span class="material-symbols-outlined">${s}</span>
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
      `}).join("")}getIconForType(e){switch(e){case"dosage":return"medication";case"fluidotherapy":return"water_drop";case"anesthesia":return"vital_signs";default:return"history"}}getBgClassForType(e){switch(e){case"dosage":return"bg-secondary-container";case"fluidotherapy":return"bg-surface-container";case"anesthesia":return"bg-tertiary-container";default:return"bg-surface-container"}}getTextColorClassForType(e){switch(e){case"dosage":return"text-on-secondary-container";case"fluidotherapy":return"text-primary";case"anesthesia":return"text-on-tertiary-container";default:return"text-on-surface-variant"}}getRelativeTime(e){const s=new Date().getTime()-e.getTime(),a=Math.floor(s/6e4),r=Math.floor(s/36e5),i=Math.floor(s/864e5);return a<1?"Justo ahora":a<60?`Hace ${a} min`:r<24?`Hace ${r} h`:i===1?"Ayer":`Hace ${i} días`}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}setActiveFilter(e){var t;(t=this.filterButtons)==null||t.forEach(s=>{s.getAttribute("data-filter")===e?(s.classList.remove("bg-surface-container-high","text-on-surface-variant"),s.classList.add("bg-primary","text-on-primary","shadow-sm")):(s.classList.remove("bg-primary","text-on-primary","shadow-sm"),s.classList.add("bg-surface-container-high","text-on-surface-variant"))})}}class Hs{constructor(){b(this,"view");b(this,"allRecords",[]);b(this,"currentFilter","all");this.view=new Ns}async init(){this.view.render(),this.loadMockData(),this.setupEventListeners(),this.applyFilter()}loadMockData(){const e=mt.getRecentHistory(10);this.allRecords=e.map(t=>({id:t.id,type:t.type,title:this.getTitleForType(t.type),patientName:t.patientName||"Desconocido",species:t.patientSpecies||"N/A",weightKg:t.patientWeightKg||0,timestamp:t.createdAt,summary:t.summary,detail:JSON.stringify(t.result),isPremium:t.type==="anesthesia"}))}getTitleForType(e){switch(e){case"dosage":return"Cálculo de Dosis";case"fluidotherapy":return"Fluidoterapia";case"anesthesia":return"Protocolo de Anestesia";default:return"Cálculo"}}setupEventListeners(){document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",async r=>{r.preventDefault();const i=a.getAttribute("data-route");i&&await K.navigate(i)})});const e=this.view.getFilterButtons();e==null||e.forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-filter")||"all";this.currentFilter=r,this.view.setActiveFilter(r),this.applyFilter()})});const t=this.view.getLoadMoreButton();t==null||t.addEventListener("click",()=>{console.log("Cargar más registros - por implementar")});const s=this.view.getSearchFab();s==null||s.addEventListener("click",()=>{console.log("Búsqueda - por implementar")})}applyFilter(){let e=[...this.allRecords];this.currentFilter!=="all"&&(e=e.filter(t=>t.type===this.currentFilter)),this.view.renderHistoryList(e,this.currentFilter)}destroy(){console.log("[HistoryController] Destroyed")}}const Vs=`
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
`;class qs{constructor(){b(this,"searchInput",null);b(this,"filterButtons",null);b(this,"resourceCards",null);b(this,"resourceItems",null);b(this,"guidelineCards",null);b(this,"viewAllButtons",null);b(this,"upgradeBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Vs),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.filterButtons=document.querySelectorAll(".filter-btn"),this.resourceCards=document.querySelectorAll(".resource-card"),this.resourceItems=document.querySelectorAll(".resource-item"),this.guidelineCards=document.querySelectorAll(".guideline-card"),this.viewAllButtons=document.querySelectorAll(".view-all"),this.upgradeBtn=document.getElementById("upgrade-btn")}getSearchInput(){return this.searchInput}getFilterButtons(){return this.filterButtons}getUpgradeBtn(){return this.upgradeBtn}onResourceClick(e){var t,s,a;(t=this.resourceCards)==null||t.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(s=this.resourceItems)==null||s.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})}),(a=this.guidelineCards)==null||a.forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-id");i&&e(i),this.animateClick(r)})})}onViewAll(e){var t;(t=this.viewAllButtons)==null||t.forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-section");a&&e(a)})})}onSearch(e){var t;(t=this.searchInput)==null||t.addEventListener("input",s=>{const a=s.target.value.toLowerCase();e(a)})}onFilterChange(e){var t;(t=this.filterButtons)==null||t.forEach(s=>{s.addEventListener("click",()=>{var r;const a=s.getAttribute("data-filter")||"all";(r=this.filterButtons)==null||r.forEach(i=>{i.classList.remove("bg-secondary","text-on-secondary"),i.classList.add("bg-surface-container-high","text-on-surface-variant")}),s.classList.remove("bg-surface-container-high","text-on-surface-variant"),s.classList.add("bg-secondary","text-on-secondary"),e(a)})})}filterResources(e){[...this.resourceCards||[],...this.resourceItems||[]].forEach(s=>{var r;const a=((r=s.textContent)==null?void 0:r.toLowerCase())||"";e===""||a.includes(e)?s.style.display="":s.style.display="none"})}animateClick(e){e.classList.add("bg-surface-container-low"),setTimeout(()=>e.classList.remove("bg-surface-container-low"),300)}}class $s extends de{constructor(){super();b(this,"view");this.view=new qs}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.setupEventListeners()}setupEventListeners(){this.view.onResourceClick(s=>{console.log(`[Library] Abrir recurso: ${s}`),alert(`Funcionalidad en desarrollo: ${s}`)}),this.view.onViewAll(s=>{console.log(`[Library] Ver todos: ${s}`),alert(`Mostrar todos los recursos de ${s} (simulación)`)}),this.view.onSearch(s=>{this.view.filterResources(s)}),this.view.onFilterChange(s=>{console.log(`[Library] Filtro: ${s}`),alert(`Filtro aplicado: ${s}`)});const t=this.view.getUpgradeBtn();t==null||t.addEventListener("click",()=>{K.navigate("premium")})}destroy(){this.destroyPremiumBadge(),console.log("[LibraryController] Destroyed")}}const Us=`
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
`;class zs{constructor(){b(this,"searchInput",null);b(this,"patientsList",null);b(this,"activeCasesSpan",null);b(this,"inSurgerySpan",null);b(this,"seeAllBtn",null);b(this,"addPatientBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Us),this.cacheElements()}cacheElements(){this.searchInput=document.getElementById("search-input"),this.patientsList=document.getElementById("patients-list"),this.activeCasesSpan=document.getElementById("active-cases"),this.inSurgerySpan=document.getElementById("in-surgery"),this.seeAllBtn=document.getElementById("see-all-btn"),this.addPatientBtn=document.getElementById("add-patient-btn")}getSearchInput(){return this.searchInput}getSeeAllBtn(){return this.seeAllBtn}getAddPatientBtn(){return this.addPatientBtn}updateStats(e,t){this.activeCasesSpan&&(this.activeCasesSpan.textContent=e.toString()),this.inSurgerySpan&&(this.inSurgerySpan.textContent=t.toString())}renderPatients(e,t){var s;if(this.patientsList){this.patientsList.innerHTML="";for(const a of e){const r=document.createElement("div");r.className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden",r.setAttribute("data-id",a.id);const i=(a.species==="canine"||a.species==="feline","pets"),o=a.status==="stable"?"bg-secondary-container text-on-secondary-container":a.status==="in-surgery"?"bg-error-container text-on-error-container":"bg-surface-container-highest text-on-surface-variant",l=a.status==="stable"?"Estable":a.status==="in-surgery"?"En cirugía":a.status==="critical"?"Crítico":a.status==="discharged"?"Dado de alta":"Observación";r.innerHTML=`
        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-on-primary-container">${i}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-headline-md text-headline-md leading-tight text-on-surface">${this.escapeHtml(a.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${this.escapeHtml(a.breed)}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="px-3 py-1 ${o} font-label-sm text-label-sm rounded-full">${l}</span>
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      `,r.addEventListener("click",()=>t(a.id)),(s=this.patientsList)==null||s.appendChild(r)}}}filterPatients(e,t,s){const a=t.filter(r=>r.name.toLowerCase().includes(e)||r.breed.toLowerCase().includes(e)||r.ownerName.toLowerCase().includes(e));s(a)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class Ws extends de{constructor(){super();b(this,"view");b(this,"patients",[]);this.view=new zs}async init(){this.view.render(),this.setupGlobalNavigation(),this.initPremiumBadge(),this.loadPatients(),this.setupEventListeners()}loadPatients(){this.patients=mt.getRecentPatients(10);const t=this.patients.filter(a=>a.status!=="discharged").length,s=this.patients.filter(a=>a.status==="in-surgery").length;this.view.updateStats(t,s),this.view.renderPatients(this.patients,a=>this.onPatientClick(a))}setupEventListeners(){const t=this.view.getSearchInput();t==null||t.addEventListener("input",r=>{const i=r.target.value.toLowerCase();this.view.filterPatients(i,this.patients,o=>{this.view.renderPatients(o,l=>this.onPatientClick(l))})});const s=this.view.getSeeAllBtn();s==null||s.addEventListener("click",()=>{alert('Funcionalidad "Ver todos" en desarrollo')});const a=this.view.getAddPatientBtn();a==null||a.addEventListener("click",()=>{alert('Funcionalidad "Añadir paciente" en desarrollo')})}onPatientClick(t){console.log(`[Patients] Ver detalle de paciente: ${t}`),alert(`Detalle del paciente (simulación) - ID: ${t}`)}destroy(){this.destroyPremiumBadge(),console.log("[PatientsController] Destroyed")}}const Gs=`
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
`;class Qs{constructor(){b(this,"monthlyBtn",null);b(this,"annualBtn",null);b(this,"pricingLabel",null);b(this,"pricingPeriod",null);b(this,"upgradeBtn",null);b(this,"restoreBtn",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Gs),this.cacheElements()}cacheElements(){this.monthlyBtn=document.getElementById("monthly-toggle"),this.annualBtn=document.getElementById("annual-toggle"),this.pricingLabel=document.getElementById("pricing-label"),this.pricingPeriod=document.getElementById("pricing-period"),this.upgradeBtn=document.getElementById("upgrade-btn"),this.restoreBtn=document.getElementById("restore-btn")}getMonthlyBtn(){return this.monthlyBtn}getAnnualBtn(){return this.annualBtn}getPricingLabel(){return this.pricingLabel}getPricingPeriod(){return this.pricingPeriod}getUpgradeBtn(){return this.upgradeBtn}getRestoreBtn(){return this.restoreBtn}setMonthlyActive(){var e,t,s,a;(e=this.monthlyBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.monthlyBtn)==null||t.classList.remove("text-on-surface-variant"),(s=this.annualBtn)==null||s.classList.remove("bg-white","shadow-sm","text-primary"),(a=this.annualBtn)==null||a.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$9.99"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ mes")}setAnnualActive(){var e,t,s,a;(e=this.annualBtn)==null||e.classList.add("bg-white","shadow-sm","text-primary"),(t=this.annualBtn)==null||t.classList.remove("text-on-surface-variant"),(s=this.monthlyBtn)==null||s.classList.remove("bg-white","shadow-sm","text-primary"),(a=this.monthlyBtn)==null||a.classList.add("text-on-surface-variant"),this.pricingLabel&&(this.pricingLabel.innerText="$95.88"),this.pricingPeriod&&(this.pricingPeriod.innerText="/ año")}}class Ys{constructor(){b(this,"view");this.view=new Qs}async init(){this.view.render(),this.setupNavigation(),this.setupEventListeners()}setupNavigation(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const s=e.getAttribute("data-route");s&&await K.navigate(s)})})}setupEventListeners(){const e=this.view.getMonthlyBtn(),t=this.view.getAnnualBtn();e==null||e.addEventListener("click",()=>this.view.setMonthlyActive()),t==null||t.addEventListener("click",()=>this.view.setAnnualActive());const s=this.view.getUpgradeBtn();s==null||s.addEventListener("click",()=>{alert("Funcionalidad de pago en desarrollo. Esta es una simulación."),console.log("Iniciar proceso de suscripción Pro")});const a=this.view.getRestoreBtn();a==null||a.addEventListener("click",()=>{alert("Restauración de compra simulada"),console.log("Restaurar compra")})}destroy(){console.log("[PremiumController] Destroyed")}}const Js=`
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
`;class Xs{constructor(){b(this,"emailInput",null);b(this,"passwordInput",null);b(this,"loginBtn",null);b(this,"registerLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Js),this.cacheElements()}cacheElements(){this.emailInput=document.getElementById("login-email"),this.passwordInput=document.getElementById("login-password"),this.loginBtn=document.getElementById("login-btn"),this.registerLink=document.getElementById("go-to-register")}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}onLoginClick(e){var t;(t=this.loginBtn)==null||t.addEventListener("click",e)}onRegisterLinkClick(e){var t;(t=this.registerLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}const R=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,T=Object.keys,H=Array.isArray;function $(n,e){return typeof e!="object"||T(e).forEach(function(t){n[t]=e[t]}),n}typeof Promise>"u"||R.Promise||(R.Promise=Promise);const qe=Object.getPrototypeOf,Zs={}.hasOwnProperty;function W(n,e){return Zs.call(n,e)}function Se(n,e){typeof e=="function"&&(e=e(qe(n))),(typeof Reflect>"u"?T:Reflect.ownKeys)(e).forEach(t=>{ne(n,t,e[t])})}const Mn=Object.defineProperty;function ne(n,e,t,s){Mn(n,e,$(t&&W(t,"get")&&typeof t.get=="function"?{get:t.get,set:t.set,configurable:!0}:{value:t,configurable:!0,writable:!0},s))}function Be(n){return{from:function(e){return n.prototype=Object.create(e.prototype),ne(n.prototype,"constructor",n),{extend:Se.bind(null,n.prototype)}}}}const ea=Object.getOwnPropertyDescriptor;function rn(n,e){let t;return ea(n,e)||(t=qe(n))&&rn(t,e)}const ta=[].slice;function ft(n,e,t){return ta.call(n,e,t)}function Tn(n,e){return e(n)}function Me(n){if(!n)throw new Error("Assertion Failed")}function Fn(n){R.setImmediate?setImmediate(n):setTimeout(n,0)}function Kn(n,e){return n.reduce((t,s,a)=>{var r=e(s,a);return r&&(t[r[0]]=r[1]),t},{})}function se(n,e){if(typeof e=="string"&&W(n,e))return n[e];if(!e)return n;if(typeof e!="string"){for(var t=[],s=0,a=e.length;s<a;++s){var r=se(n,e[s]);t.push(r)}return t}var i=e.indexOf(".");if(i!==-1){var o=n[e.substr(0,i)];return o==null?void 0:se(o,e.substr(i+1))}}function G(n,e,t){if(n&&e!==void 0&&(!("isFrozen"in Object)||!Object.isFrozen(n)))if(typeof e!="string"&&"length"in e){Me(typeof t!="string"&&"length"in t);for(var s=0,a=e.length;s<a;++s)G(n,e[s],t[s])}else{var r=e.indexOf(".");if(r!==-1){var i=e.substr(0,r),o=e.substr(r+1);if(o==="")t===void 0?H(n)&&!isNaN(parseInt(i))?n.splice(i,1):delete n[i]:n[i]=t;else{var l=n[i];l&&W(n,i)||(l=n[i]={}),G(l,o,t)}}else t===void 0?H(n)&&!isNaN(parseInt(e))?n.splice(e,1):delete n[e]:n[e]=t}}function On(n){var e={};for(var t in n)W(n,t)&&(e[t]=n[t]);return e}const na=[].concat;function Nn(n){return na.apply([],n)}const Hn="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(Nn([8,16,32,64].map(n=>["Int","Uint","Float"].map(e=>e+n+"Array")))).filter(n=>R[n]),sa=Hn.map(n=>R[n]);Kn(Hn,n=>[n,!0]);let ie=null;function Ye(n){ie=typeof WeakMap<"u"&&new WeakMap;const e=jt(n);return ie=null,e}function jt(n){if(!n||typeof n!="object")return n;let e=ie&&ie.get(n);if(e)return e;if(H(n)){e=[],ie&&ie.set(n,e);for(var t=0,s=n.length;t<s;++t)e.push(jt(n[t]))}else if(sa.indexOf(n.constructor)>=0)e=n;else{const r=qe(n);for(var a in e=r===Object.prototype?{}:Object.create(r),ie&&ie.set(n,e),n)W(n,a)&&(e[a]=jt(n[a]))}return e}const{toString:aa}={};function Mt(n){return aa.call(n).slice(8,-1)}const Tt=typeof Symbol<"u"?Symbol.iterator:"@@iterator",ra=typeof Tt=="symbol"?function(n){var e;return n!=null&&(e=n[Tt])&&e.apply(n)}:function(){return null},Ie={};function ee(n){var e,t,s,a;if(arguments.length===1){if(H(n))return n.slice();if(this===Ie&&typeof n=="string")return[n];if(a=ra(n)){for(t=[];!(s=a.next()).done;)t.push(s.value);return t}if(n==null)return[n];if(typeof(e=n.length)=="number"){for(t=new Array(e);e--;)t[e]=n[e];return t}return[n]}for(e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return t}const on=typeof Symbol<"u"?n=>n[Symbol.toStringTag]==="AsyncFunction":()=>!1;var Y=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Vn(n,e){Y=n,qn=e}var qn=()=>!0;const ia=!new Error("").stack;function xe(){if(ia)try{throw xe.arguments,new Error}catch(n){return n}return new Error}function Ft(n,e){var t=n.stack;return t?(e=e||0,t.indexOf(n.name)===0&&(e+=(n.name+n.message).split(`
`).length),t.split(`
`).slice(e).filter(qn).map(s=>`
`+s).join("")):""}var $n=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],ln=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat($n),oa={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Pe(n,e){this._e=xe(),this.name=n,this.message=e}function Un(n,e){return n+". Errors: "+Object.keys(e).map(t=>e[t].toString()).filter((t,s,a)=>a.indexOf(t)===s).join(`
`)}function gt(n,e,t,s){this._e=xe(),this.failures=e,this.failedKeys=s,this.successCount=t,this.message=Un(n,e)}function Fe(n,e){this._e=xe(),this.name="BulkError",this.failures=Object.keys(e).map(t=>e[t]),this.failuresByPos=e,this.message=Un(n,e)}Be(Pe).from(Error).extend({stack:{get:function(){return this._stack||(this._stack=this.name+": "+this.message+Ft(this._e,2))}},toString:function(){return this.name+": "+this.message}}),Be(gt).from(Pe),Be(Fe).from(Pe);var cn=ln.reduce((n,e)=>(n[e]=e+"Error",n),{});const la=Pe;var P=ln.reduce((n,e)=>{var t=e+"Error";function s(a,r){this._e=xe(),this.name=t,a?typeof a=="string"?(this.message=`${a}${r?`
 `+r:""}`,this.inner=r||null):typeof a=="object"&&(this.message=`${a.name} ${a.message}`,this.inner=a):(this.message=oa[e]||t,this.inner=null)}return Be(s).from(la),n[e]=s,n},{});P.Syntax=SyntaxError,P.Type=TypeError,P.Range=RangeError;var _n=$n.reduce((n,e)=>(n[e+"Error"]=P[e],n),{}),ot=ln.reduce((n,e)=>(["Syntax","Type","Range"].indexOf(e)===-1&&(n[e+"Error"]=P[e]),n),{});function A(){}function $e(n){return n}function ca(n,e){return n==null||n===$e?e:function(t){return e(n(t))}}function ve(n,e){return function(){n.apply(this,arguments),e.apply(this,arguments)}}function ua(n,e){return n===A?e:function(){var t=n.apply(this,arguments);t!==void 0&&(arguments[0]=t);var s=this.onsuccess,a=this.onerror;this.onsuccess=null,this.onerror=null;var r=e.apply(this,arguments);return s&&(this.onsuccess=this.onsuccess?ve(s,this.onsuccess):s),a&&(this.onerror=this.onerror?ve(a,this.onerror):a),r!==void 0?r:t}}function da(n,e){return n===A?e:function(){n.apply(this,arguments);var t=this.onsuccess,s=this.onerror;this.onsuccess=this.onerror=null,e.apply(this,arguments),t&&(this.onsuccess=this.onsuccess?ve(t,this.onsuccess):t),s&&(this.onerror=this.onerror?ve(s,this.onerror):s)}}function pa(n,e){return n===A?e:function(t){var s=n.apply(this,arguments);$(t,s);var a=this.onsuccess,r=this.onerror;this.onsuccess=null,this.onerror=null;var i=e.apply(this,arguments);return a&&(this.onsuccess=this.onsuccess?ve(a,this.onsuccess):a),r&&(this.onerror=this.onerror?ve(r,this.onerror):r),s===void 0?i===void 0?void 0:i:$(s,i)}}function ha(n,e){return n===A?e:function(){return e.apply(this,arguments)!==!1&&n.apply(this,arguments)}}function un(n,e){return n===A?e:function(){var t=n.apply(this,arguments);if(t&&typeof t.then=="function"){for(var s=this,a=arguments.length,r=new Array(a);a--;)r[a]=arguments[a];return t.then(function(){return e.apply(s,r)})}return e.apply(this,arguments)}}ot.ModifyError=gt,ot.DexieError=Pe,ot.BulkError=Fe;var Ue={};const zn=100,[Kt,bt,Ot]=typeof Promise>"u"?[]:(()=>{let n=Promise.resolve();if(typeof crypto>"u"||!crypto.subtle)return[n,qe(n),n];const e=crypto.subtle.digest("SHA-512",new Uint8Array([0]));return[e,qe(e),n]})(),Wn=bt&&bt.then,lt=Kt&&Kt.constructor,dn=!!Ot;var Nt=!1,ma=Ot?()=>{Ot.then(Ze)}:R.setImmediate?setImmediate.bind(null,Ze):R.MutationObserver?()=>{var n=document.createElement("div");new MutationObserver(()=>{Ze(),n=null}).observe(n,{attributes:!0}),n.setAttribute("i","1")}:()=>{setTimeout(Ze,0)},Ke=function(n,e){Te.push([n,e]),vt&&(ma(),vt=!1)},Ht=!0,vt=!0,fe=[],ct=[],Vt=null,qt=$e,Ce={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:In,pgp:!1,env:{},finalize:function(){this.unhandleds.forEach(n=>{try{In(n[0],n[1])}catch{}})}},B=Ce,Te=[],ge=0,ut=[];function I(n){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this.onuncatched=A,this._lib=!1;var e=this._PSD=B;if(Y&&(this._stackHolder=xe(),this._prev=null,this._numPrev=0),typeof n!="function"){if(n!==Ue)throw new TypeError("Not a function");return this._state=arguments[1],this._value=arguments[2],void(this._state===!1&&Ut(this,this._value))}this._state=null,this._value=null,++e.ref,Qn(this,n)}const $t={get:function(){var n=B,e=yt;function t(s,a){var r=!n.global&&(n!==B||e!==yt);const i=r&&!ae();var o=new I((l,u)=>{pn(this,new Gn(xt(s,n,r,i),xt(a,n,r,i),l,u,n))});return Y&&Xn(o,this),o}return t.prototype=Ue,t},set:function(n){ne(this,"then",n&&n.prototype===Ue?$t:{get:function(){return n},set:$t.set})}};function Gn(n,e,t,s,a){this.onFulfilled=typeof n=="function"?n:null,this.onRejected=typeof e=="function"?e:null,this.resolve=t,this.reject=s,this.psd=a}function Qn(n,e){try{e(t=>{if(n._state===null){if(t===n)throw new TypeError("A promise cannot be resolved with itself.");var s=n._lib&&Je();t&&typeof t.then=="function"?Qn(n,(a,r)=>{t instanceof I?t._then(a,r):t.then(a,r)}):(n._state=!0,n._value=t,Yn(n)),s&&Xe()}},Ut.bind(null,n))}catch(t){Ut(n,t)}}function Ut(n,e){if(ct.push(e),n._state===null){var t=n._lib&&Je();e=qt(e),n._state=!1,n._value=e,Y&&e!==null&&typeof e=="object"&&!e._promise&&function(s,a,r){try{s.apply(null,r)}catch{}}(()=>{var s=rn(e,"stack");e._promise=n,ne(e,"stack",{get:()=>Nt?s&&(s.get?s.get.apply(e):s.value):n.stack})}),function(s){fe.some(a=>a._value===s._value)||fe.push(s)}(n),Yn(n),t&&Xe()}}function Yn(n){var e=n._listeners;n._listeners=[];for(var t=0,s=e.length;t<s;++t)pn(n,e[t]);var a=n._PSD;--a.ref||a.finalize(),ge===0&&(++ge,Ke(()=>{--ge==0&&hn()},[]))}function pn(n,e){if(n._state!==null){var t=n._state?e.onFulfilled:e.onRejected;if(t===null)return(n._state?e.resolve:e.reject)(n._value);++e.psd.ref,++ge,Ke(fa,[t,n,e])}else n._listeners.push(e)}function fa(n,e,t){try{Vt=e;var s,a=e._value;e._state?s=n(a):(ct.length&&(ct=[]),s=n(a),ct.indexOf(a)===-1&&function(r){for(var i=fe.length;i;)if(fe[--i]._value===r._value)return void fe.splice(i,1)}(e)),t.resolve(s)}catch(r){t.reject(r)}finally{Vt=null,--ge==0&&hn(),--t.psd.ref||t.psd.finalize()}}function Jn(n,e,t){if(e.length===t)return e;var s="";if(n._state===!1){var a,r,i=n._value;i!=null?(a=i.name||"Error",r=i.message||i,s=Ft(i,0)):(a=i,r=""),e.push(a+(r?": "+r:"")+s)}return Y&&((s=Ft(n._stackHolder,2))&&e.indexOf(s)===-1&&e.push(s),n._prev&&Jn(n._prev,e,t)),e}function Xn(n,e){var t=e?e._numPrev+1:0;t<100&&(n._prev=e,n._numPrev=t)}function Ze(){Je()&&Xe()}function Je(){var n=Ht;return Ht=!1,vt=!1,n}function Xe(){var n,e,t;do for(;Te.length>0;)for(n=Te,Te=[],t=n.length,e=0;e<t;++e){var s=n[e];s[0].apply(null,s[1])}while(Te.length>0);Ht=!0,vt=!0}function hn(){var n=fe;fe=[],n.forEach(s=>{s._PSD.onunhandled.call(null,s._value,s)});for(var e=ut.slice(0),t=e.length;t;)e[--t]()}function et(n){return new I(Ue,!1,n)}function D(n,e){var t=B;return function(){var s=Je(),a=B;try{return ce(t,!0),n.apply(this,arguments)}catch(r){e&&e(r)}finally{ce(a,!1),s&&Xe()}}}Se(I.prototype,{then:$t,_then:function(n,e){pn(this,new Gn(null,null,n,e,B))},catch:function(n){if(arguments.length===1)return this.then(null,n);var e=arguments[0],t=arguments[1];return typeof e=="function"?this.then(null,s=>s instanceof e?t(s):et(s)):this.then(null,s=>s&&s.name===e?t(s):et(s))},finally:function(n){return this.then(e=>(n(),e),e=>(n(),et(e)))},stack:{get:function(){if(this._stack)return this._stack;try{Nt=!0;var n=Jn(this,[],20).join(`
From previous: `);return this._state!==null&&(this._stack=n),n}finally{Nt=!1}}},timeout:function(n,e){return n<1/0?new I((t,s)=>{var a=setTimeout(()=>s(new P.Timeout(e)),n);this.then(t,s).finally(clearTimeout.bind(null,a))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&ne(I.prototype,Symbol.toStringTag,"Dexie.Promise"),Ce.env=Zn(),Se(I,{all:function(){var n=ee.apply(null,arguments).map(tt);return new I(function(e,t){n.length===0&&e([]);var s=n.length;n.forEach((a,r)=>I.resolve(a).then(i=>{n[r]=i,--s||e(n)},t))})},resolve:n=>{if(n instanceof I)return n;if(n&&typeof n.then=="function")return new I((t,s)=>{n.then(t,s)});var e=new I(Ue,!0,n);return Xn(e,Vt),e},reject:et,race:function(){var n=ee.apply(null,arguments).map(tt);return new I((e,t)=>{n.map(s=>I.resolve(s).then(e,t))})},PSD:{get:()=>B,set:n=>B=n},totalEchoes:{get:()=>yt},newPSD:le,usePSD:Re,scheduler:{get:()=>Ke,set:n=>{Ke=n}},rejectionMapper:{get:()=>qt,set:n=>{qt=n}},follow:(n,e)=>new I((t,s)=>le((a,r)=>{var i=B;i.unhandleds=[],i.onunhandled=r,i.finalize=ve(function(){(function(o){function l(){o(),ut.splice(ut.indexOf(l),1)}ut.push(l),++ge,Ke(()=>{--ge==0&&hn()},[])})(()=>{this.unhandleds.length===0?a():r(this.unhandleds[0])})},i.finalize),n()},e,t,s))}),lt&&(lt.allSettled&&ne(I,"allSettled",function(){const n=ee.apply(null,arguments).map(tt);return new I(e=>{n.length===0&&e([]);let t=n.length;const s=new Array(t);n.forEach((a,r)=>I.resolve(a).then(i=>s[r]={status:"fulfilled",value:i},i=>s[r]={status:"rejected",reason:i}).then(()=>--t||e(s)))})}),lt.any&&typeof AggregateError<"u"&&ne(I,"any",function(){const n=ee.apply(null,arguments).map(tt);return new I((e,t)=>{n.length===0&&t(new AggregateError([]));let s=n.length;const a=new Array(s);n.forEach((r,i)=>I.resolve(r).then(o=>e(o),o=>{a[i]=o,--s||t(new AggregateError(a))}))})}));const N={awaits:0,echoes:0,id:0};var ga=0,dt=[],Bt=0,yt=0,ba=0;function le(n,e,t,s){var a=B,r=Object.create(a);r.parent=a,r.ref=0,r.global=!1,r.id=++ba;var i=Ce.env;r.env=dn?{Promise:I,PromiseProp:{value:I,configurable:!0,writable:!0},all:I.all,race:I.race,allSettled:I.allSettled,any:I.any,resolve:I.resolve,reject:I.reject,nthen:En(i.nthen,r),gthen:En(i.gthen,r)}:{},e&&$(r,e),++a.ref,r.finalize=function(){--this.parent.ref||this.parent.finalize()};var o=Re(r,n,t,s);return r.ref===0&&r.finalize(),o}function Ae(){return N.id||(N.id=++ga),++N.awaits,N.echoes+=zn,N.id}function ae(){return!!N.awaits&&(--N.awaits==0&&(N.id=0),N.echoes=N.awaits*zn,!0)}function tt(n){return N.echoes&&n&&n.constructor===lt?(Ae(),n.then(e=>(ae(),e),e=>(ae(),F(e)))):n}function va(n){++yt,N.echoes&&--N.echoes!=0||(N.echoes=N.id=0),dt.push(B),ce(n,!0)}function ya(){var n=dt[dt.length-1];dt.pop(),ce(n,!1)}function ce(n,e){var t=B;if((e?!N.echoes||Bt++&&n===B:!Bt||--Bt&&n===B)||es(e?va.bind(null,n):ya),n!==B&&(B=n,t===Ce&&(Ce.env=Zn()),dn)){var s=Ce.env.Promise,a=n.env;bt.then=a.nthen,s.prototype.then=a.gthen,(t.global||n.global)&&(Object.defineProperty(R,"Promise",a.PromiseProp),s.all=a.all,s.race=a.race,s.resolve=a.resolve,s.reject=a.reject,a.allSettled&&(s.allSettled=a.allSettled),a.any&&(s.any=a.any))}}function Zn(){var n=R.Promise;return dn?{Promise:n,PromiseProp:Object.getOwnPropertyDescriptor(R,"Promise"),all:n.all,race:n.race,allSettled:n.allSettled,any:n.any,resolve:n.resolve,reject:n.reject,nthen:bt.then,gthen:n.prototype.then}:{}}function Re(n,e,t,s,a){var r=B;try{return ce(n,!0),e(t,s,a)}finally{ce(r,!1)}}function es(n){Wn.call(Kt,n)}function xt(n,e,t,s){return typeof n!="function"?n:function(){var a=B;t&&Ae(),ce(e,!0);try{return n.apply(this,arguments)}finally{ce(a,!1),s&&es(ae)}}}function En(n,e){return function(t,s){return n.call(this,xt(t,e),xt(s,e))}}(""+Wn).indexOf("[native code]")===-1&&(Ae=ae=A);const kn="unhandledrejection";function In(n,e){var t;try{t=e.onuncatched(n)}catch{}if(t!==!1)try{var s,a={promise:e,reason:n};if(R.document&&document.createEvent?((s=document.createEvent("Event")).initEvent(kn,!0,!0),$(s,a)):R.CustomEvent&&$(s=new CustomEvent(kn,{detail:a}),a),s&&R.dispatchEvent&&(dispatchEvent(s),!R.PromiseRejectionEvent&&R.onunhandledrejection))try{R.onunhandledrejection(s)}catch{}Y&&s&&!s.defaultPrevented&&console.warn(`Unhandled rejection: ${n.stack||n}`)}catch{}}var F=I.reject;function zt(n,e,t,s){if(n.idbdb&&(n._state.openComplete||B.letThrough||n._vip)){var a=n._createTransaction(e,t,n._dbSchema);try{a.create(),n._state.PR1398_maxLoop=3}catch(r){return r.name===cn.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>zt(n,e,t,s))):F(r)}return a._promise(e,(r,i)=>le(()=>(B.trans=a,s(r,i,a)))).then(r=>a._completion.then(()=>r))}if(n._state.openComplete)return F(new P.DatabaseClosed(n._state.dbOpenError));if(!n._state.isBeingOpened){if(!n._options.autoOpen)return F(new P.DatabaseClosed);n.open().catch(A)}return n._state.dbReadyPromise.then(()=>zt(n,e,t,s))}const Ln="3.2.7",me="￿",Wt=-1/0,J="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",ts="String expected.",Oe=[],Et=typeof navigator<"u"&&/(MSIE|Trident|Edge)/.test(navigator.userAgent),xa=Et,wa=Et,ns=n=>!/(dexie\.js|dexie\.min\.js)/.test(n),kt="__dbnames",Pt="readonly",Ct="readwrite";function ye(n,e){return n?e?function(){return n.apply(this,arguments)&&e.apply(this,arguments)}:n:e}const ss={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function nt(n){return typeof n!="string"||/\./.test(n)?e=>e:e=>(e[n]===void 0&&n in e&&delete(e=Ye(e))[n],e)}class _a{_trans(e,t,s){const a=this._tx||B.trans,r=this.name;function i(l,u,c){if(!c.schema[r])throw new P.NotFound("Table "+r+" not part of transaction");return t(c.idbtrans,c)}const o=Je();try{return a&&a.db===this.db?a===B.trans?a._promise(e,i,s):le(()=>a._promise(e,i,s),{trans:a,transless:B.transless||B}):zt(this.db,e,[this.name],i)}finally{o&&Xe()}}get(e,t){return e&&e.constructor===Object?this.where(e).first(t):this._trans("readonly",s=>this.core.get({trans:s,key:e}).then(a=>this.hook.reading.fire(a))).then(t)}where(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(H(e))return new this.db.WhereClause(this,`[${e.join("+")}]`);const t=T(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);const s=this.schema.indexes.concat(this.schema.primKey).filter(u=>{if(u.compound&&t.every(c=>u.keyPath.indexOf(c)>=0)){for(let c=0;c<t.length;++c)if(t.indexOf(u.keyPath[c])===-1)return!1;return!0}return!1}).sort((u,c)=>u.keyPath.length-c.keyPath.length)[0];if(s&&this.db._maxKey!==me){const u=s.keyPath.slice(0,t.length);return this.where(u).equals(u.map(c=>e[c]))}!s&&Y&&console.warn(`The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${t.join("+")}]`);const{idxByName:a}=this.schema,r=this.db._deps.indexedDB;function i(u,c){try{return r.cmp(u,c)===0}catch{return!1}}const[o,l]=t.reduce(([u,c],p)=>{const d=a[p],m=e[p];return[u||d,u||!d?ye(c,d&&d.multi?v=>{const g=se(v,p);return H(g)&&g.some(y=>i(m,y))}:v=>i(m,se(v,p))):c]},[null,null]);return o?this.where(o.name).equals(e[o.keyPath]).filter(l):s?this.filter(l):this.where(t).equals("")}filter(e){return this.toCollection().and(e)}count(e){return this.toCollection().count(e)}offset(e){return this.toCollection().offset(e)}limit(e){return this.toCollection().limit(e)}each(e){return this.toCollection().each(e)}toArray(e){return this.toCollection().toArray(e)}toCollection(){return new this.db.Collection(new this.db.WhereClause(this))}orderBy(e){return new this.db.Collection(new this.db.WhereClause(this,H(e)?`[${e.join("+")}]`:e))}reverse(){return this.toCollection().reverse()}mapToClass(e){this.schema.mappedClass=e;const t=s=>{if(!s)return s;const a=Object.create(e.prototype);for(var r in s)if(W(s,r))try{a[r]=s[r]}catch{}return a};return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=t,this.hook("reading",t),e}defineClass(){return this.mapToClass(function(e){$(this,e)})}add(e,t){const{auto:s,keyPath:a}=this.schema.primKey;let r=e;return a&&s&&(r=nt(a)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"add",keys:t!=null?[t]:null,values:[r]})).then(i=>i.numFailures?I.reject(i.failures[0]):i.lastResult).then(i=>{if(a)try{G(e,a,i)}catch{}return i})}update(e,t){if(typeof e!="object"||H(e))return this.where(":id").equals(e).modify(t);{const s=se(e,this.schema.primKey.keyPath);if(s===void 0)return F(new P.InvalidArgument("Given object does not contain its primary key"));try{typeof t!="function"?T(t).forEach(a=>{G(e,a,t[a])}):t(e,{value:e,primKey:s})}catch{}return this.where(":id").equals(s).modify(t)}}put(e,t){const{auto:s,keyPath:a}=this.schema.primKey;let r=e;return a&&s&&(r=nt(a)(e)),this._trans("readwrite",i=>this.core.mutate({trans:i,type:"put",values:[r],keys:t!=null?[t]:null})).then(i=>i.numFailures?I.reject(i.failures[0]):i.lastResult).then(i=>{if(a)try{G(e,a,i)}catch{}return i})}delete(e){return this._trans("readwrite",t=>this.core.mutate({trans:t,type:"delete",keys:[e]})).then(t=>t.numFailures?I.reject(t.failures[0]):void 0)}clear(){return this._trans("readwrite",e=>this.core.mutate({trans:e,type:"deleteRange",range:ss})).then(e=>e.numFailures?I.reject(e.failures[0]):void 0)}bulkGet(e){return this._trans("readonly",t=>this.core.getMany({keys:e,trans:t}).then(s=>s.map(a=>this.hook.reading.fire(a))))}bulkAdd(e,t,s){const a=Array.isArray(t)?t:void 0,r=(s=s||(a?void 0:t))?s.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&a)throw new P.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(a&&a.length!==e.length)throw new P.InvalidArgument("Arguments objects and keys must have the same length");const u=e.length;let c=l&&o?e.map(nt(l)):e;return this.core.mutate({trans:i,type:"add",keys:a,values:c,wantResults:r}).then(({numFailures:p,results:d,lastResult:m,failures:v})=>{if(p===0)return r?d:m;throw new Fe(`${this.name}.bulkAdd(): ${p} of ${u} operations failed`,v)})})}bulkPut(e,t,s){const a=Array.isArray(t)?t:void 0,r=(s=s||(a?void 0:t))?s.allKeys:void 0;return this._trans("readwrite",i=>{const{auto:o,keyPath:l}=this.schema.primKey;if(l&&a)throw new P.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(a&&a.length!==e.length)throw new P.InvalidArgument("Arguments objects and keys must have the same length");const u=e.length;let c=l&&o?e.map(nt(l)):e;return this.core.mutate({trans:i,type:"put",keys:a,values:c,wantResults:r}).then(({numFailures:p,results:d,lastResult:m,failures:v})=>{if(p===0)return r?d:m;throw new Fe(`${this.name}.bulkPut(): ${p} of ${u} operations failed`,v)})})}bulkDelete(e){const t=e.length;return this._trans("readwrite",s=>this.core.mutate({trans:s,type:"delete",keys:e})).then(({numFailures:s,lastResult:a,failures:r})=>{if(s===0)return a;throw new Fe(`${this.name}.bulkDelete(): ${s} of ${t} operations failed`,r)})}}function Ne(n){var e={},t=function(i,o){if(o){for(var l=arguments.length,u=new Array(l-1);--l;)u[l-1]=arguments[l];return e[i].subscribe.apply(null,u),n}if(typeof i=="string")return e[i]};t.addEventType=r;for(var s=1,a=arguments.length;s<a;++s)r(arguments[s]);return t;function r(i,o,l){if(typeof i!="object"){var u;o||(o=ha),l||(l=A);var c={subscribers:[],fire:l,subscribe:function(p){c.subscribers.indexOf(p)===-1&&(c.subscribers.push(p),c.fire=o(c.fire,p))},unsubscribe:function(p){c.subscribers=c.subscribers.filter(function(d){return d!==p}),c.fire=c.subscribers.reduce(o,l)}};return e[i]=t[i]=c,c}T(u=i).forEach(function(p){var d=u[p];if(H(d))r(p,u[p][0],u[p][1]);else{if(d!=="asap")throw new P.InvalidArgument("Invalid event config");var m=r(p,$e,function(){for(var v=arguments.length,g=new Array(v);v--;)g[v]=arguments[v];m.subscribers.forEach(function(y){Fn(function(){y.apply(null,g)})})})}})}}function je(n,e){return Be(e).from({prototype:n}),e}function Ee(n,e){return!(n.filter||n.algorithm||n.or)&&(e?n.justLimit:!n.replayFilter)}function St(n,e){n.filter=ye(n.filter,e)}function At(n,e,t){var s=n.replayFilter;n.replayFilter=s?()=>ye(s(),e()):e,n.justLimit=t&&!s}function pt(n,e){if(n.isPrimKey)return e.primaryKey;const t=e.getIndexByKeyPath(n.index);if(!t)throw new P.Schema("KeyPath "+n.index+" on object store "+e.name+" is not indexed");return t}function Bn(n,e,t){const s=pt(n,e.schema);return e.openCursor({trans:t,values:!n.keysOnly,reverse:n.dir==="prev",unique:!!n.unique,query:{index:s,range:n.range}})}function st(n,e,t,s){const a=n.replayFilter?ye(n.filter,n.replayFilter()):n.filter;if(n.or){const r={},i=(o,l,u)=>{if(!a||a(l,u,d=>l.stop(d),d=>l.fail(d))){var c=l.primaryKey,p=""+c;p==="[object ArrayBuffer]"&&(p=""+new Uint8Array(c)),W(r,p)||(r[p]=!0,e(o,l,u))}};return Promise.all([n.or._iterate(i,t),Pn(Bn(n,s,t),n.algorithm,i,!n.keysOnly&&n.valueMapper)])}return Pn(Bn(n,s,t),ye(n.algorithm,a),e,!n.keysOnly&&n.valueMapper)}function Pn(n,e,t,s){var a=D(s?(r,i,o)=>t(s(r),i,o):t);return n.then(r=>{if(r)return r.start(()=>{var i=()=>r.continue();e&&!e(r,o=>i=o,o=>{r.stop(o),i=A},o=>{r.fail(o),i=A})||a(r.value,r,o=>i=o),i()})})}function q(n,e){try{const t=Cn(n),s=Cn(e);if(t!==s)return t==="Array"?1:s==="Array"?-1:t==="binary"?1:s==="binary"?-1:t==="string"?1:s==="string"?-1:t==="Date"?1:s!=="Date"?NaN:-1;switch(t){case"number":case"Date":case"string":return n>e?1:n<e?-1:0;case"binary":return function(a,r){const i=a.length,o=r.length,l=i<o?i:o;for(let u=0;u<l;++u)if(a[u]!==r[u])return a[u]<r[u]?-1:1;return i===o?0:i<o?-1:1}(Sn(n),Sn(e));case"Array":return function(a,r){const i=a.length,o=r.length,l=i<o?i:o;for(let u=0;u<l;++u){const c=q(a[u],r[u]);if(c!==0)return c}return i===o?0:i<o?-1:1}(n,e)}}catch{}return NaN}function Cn(n){const e=typeof n;if(e!=="object")return e;if(ArrayBuffer.isView(n))return"binary";const t=Mt(n);return t==="ArrayBuffer"?"binary":t}function Sn(n){return n instanceof Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(n)}class Ea{_read(e,t){var s=this._ctx;return s.error?s.table._trans(null,F.bind(null,s.error)):s.table._trans("readonly",e).then(t)}_write(e){var t=this._ctx;return t.error?t.table._trans(null,F.bind(null,t.error)):t.table._trans("readwrite",e,"locked")}_addAlgorithm(e){var t=this._ctx;t.algorithm=ye(t.algorithm,e)}_iterate(e,t){return st(this._ctx,e,t,this._ctx.table.core)}clone(e){var t=Object.create(this.constructor.prototype),s=Object.create(this._ctx);return e&&$(s,e),t._ctx=s,t}raw(){return this._ctx.valueMapper=null,this}each(e){var t=this._ctx;return this._read(s=>st(t,e,s,t.table.core))}count(e){return this._read(t=>{const s=this._ctx,a=s.table.core;if(Ee(s,!0))return a.count({trans:t,query:{index:pt(s,a.schema),range:s.range}}).then(i=>Math.min(i,s.limit));var r=0;return st(s,()=>(++r,!1),t,a).then(()=>r)}).then(e)}sortBy(e,t){const s=e.split(".").reverse(),a=s[0],r=s.length-1;function i(u,c){return c?i(u[s[c]],c-1):u[a]}var o=this._ctx.dir==="next"?1:-1;function l(u,c){var p=i(u,r),d=i(c,r);return p<d?-o:p>d?o:0}return this.toArray(function(u){return u.sort(l)}).then(t)}toArray(e){return this._read(t=>{var s=this._ctx;if(s.dir==="next"&&Ee(s,!0)&&s.limit>0){const{valueMapper:a}=s,r=pt(s,s.table.core.schema);return s.table.core.query({trans:t,limit:s.limit,values:!0,query:{index:r,range:s.range}}).then(({result:i})=>a?i.map(a):i)}{const a=[];return st(s,r=>a.push(r),t,s.table.core).then(()=>a)}},e)}offset(e){var t=this._ctx;return e<=0||(t.offset+=e,Ee(t)?At(t,()=>{var s=e;return(a,r)=>s===0||(s===1?(--s,!1):(r(()=>{a.advance(s),s=0}),!1))}):At(t,()=>{var s=e;return()=>--s<0})),this}limit(e){return this._ctx.limit=Math.min(this._ctx.limit,e),At(this._ctx,()=>{var t=e;return function(s,a,r){return--t<=0&&a(r),t>=0}},!0),this}until(e,t){return St(this._ctx,function(s,a,r){return!e(s.value)||(a(r),t)}),this}first(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)}last(e){return this.reverse().first(e)}filter(e){var t,s;return St(this._ctx,function(a){return e(a.value)}),t=this._ctx,s=e,t.isMatch=ye(t.isMatch,s),this}and(e){return this.filter(e)}or(e){return new this.db.WhereClause(this._ctx.table,e,this)}reverse(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this}desc(){return this.reverse()}eachKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(s,a){e(a.key,a)})}eachUniqueKey(e){return this._ctx.unique="unique",this.eachKey(e)}eachPrimaryKey(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(s,a){e(a.primaryKey,a)})}keys(e){var t=this._ctx;t.keysOnly=!t.isMatch;var s=[];return this.each(function(a,r){s.push(r.key)}).then(function(){return s}).then(e)}primaryKeys(e){var t=this._ctx;if(t.dir==="next"&&Ee(t,!0)&&t.limit>0)return this._read(a=>{var r=pt(t,t.table.core.schema);return t.table.core.query({trans:a,values:!1,limit:t.limit,query:{index:r,range:t.range}})}).then(({result:a})=>a).then(e);t.keysOnly=!t.isMatch;var s=[];return this.each(function(a,r){s.push(r.primaryKey)}).then(function(){return s}).then(e)}uniqueKeys(e){return this._ctx.unique="unique",this.keys(e)}firstKey(e){return this.limit(1).keys(function(t){return t[0]}).then(e)}lastKey(e){return this.reverse().firstKey(e)}distinct(){var e=this._ctx,t=e.index&&e.table.schema.idxByName[e.index];if(!t||!t.multi)return this;var s={};return St(this._ctx,function(a){var r=a.primaryKey.toString(),i=W(s,r);return s[r]=!0,!i}),this}modify(e){var t=this._ctx;return this._write(s=>{var a;if(typeof e=="function")a=e;else{var r=T(e),i=r.length;a=function(g){for(var y=!1,f=0;f<i;++f){var h=r[f],w=e[h];se(g,h)!==w&&(G(g,h,w),y=!0)}return y}}const o=t.table.core,{outbound:l,extractKey:u}=o.schema.primaryKey,c=this.db._options.modifyChunkSize||200,p=[];let d=0;const m=[],v=(g,y)=>{const{failures:f,numFailures:h}=y;d+=g-h;for(let w of T(f))p.push(f[w])};return this.clone().primaryKeys().then(g=>{const y=f=>{const h=Math.min(c,g.length-f);return o.getMany({trans:s,keys:g.slice(f,f+h),cache:"immutable"}).then(w=>{const k=[],L=[],E=l?[]:null,x=[];for(let _=0;_<h;++_){const j=w[_],S={value:Ye(j),primKey:g[f+_]};a.call(S,S.value,S)!==!1&&(S.value==null?x.push(g[f+_]):l||q(u(j),u(S.value))===0?(L.push(S.value),l&&E.push(g[f+_])):(x.push(g[f+_]),k.push(S.value)))}const C=Ee(t)&&t.limit===1/0&&(typeof e!="function"||e===Rt)&&{index:t.index,range:t.range};return Promise.resolve(k.length>0&&o.mutate({trans:s,type:"add",values:k}).then(_=>{for(let j in _.failures)x.splice(parseInt(j),1);v(k.length,_)})).then(()=>(L.length>0||C&&typeof e=="object")&&o.mutate({trans:s,type:"put",keys:E,values:L,criteria:C,changeSpec:typeof e!="function"&&e}).then(_=>v(L.length,_))).then(()=>(x.length>0||C&&e===Rt)&&o.mutate({trans:s,type:"delete",keys:x,criteria:C}).then(_=>v(x.length,_))).then(()=>g.length>f+h&&y(f+c))})};return y(0).then(()=>{if(p.length>0)throw new gt("Error modifying one or more objects",p,d,m);return g.length})})})}delete(){var e=this._ctx,t=e.range;return Ee(e)&&(e.isPrimKey&&!wa||t.type===3)?this._write(s=>{const{primaryKey:a}=e.table.core.schema,r=t;return e.table.core.count({trans:s,query:{index:a,range:r}}).then(i=>e.table.core.mutate({trans:s,type:"deleteRange",range:r}).then(({failures:o,lastResult:l,results:u,numFailures:c})=>{if(c)throw new gt("Could not delete some values",Object.keys(o).map(p=>o[p]),i-c);return i-c}))}):this.modify(Rt)}}const Rt=(n,e)=>e.value=null;function ka(n,e){return n<e?-1:n===e?0:1}function Ia(n,e){return n>e?-1:n===e?0:1}function z(n,e,t){var s=n instanceof rs?new n.Collection(n):n;return s._ctx.error=t?new t(e):new TypeError(e),s}function ke(n){return new n.Collection(n,()=>as("")).limit(0)}function La(n,e,t,s,a,r){for(var i=Math.min(n.length,s.length),o=-1,l=0;l<i;++l){var u=e[l];if(u!==s[l])return a(n[l],t[l])<0?n.substr(0,l)+t[l]+t.substr(l+1):a(n[l],s[l])<0?n.substr(0,l)+s[l]+t.substr(l+1):o>=0?n.substr(0,o)+e[o]+t.substr(o+1):null;a(n[l],u)<0&&(o=l)}return i<s.length&&r==="next"?n+t.substr(n.length):i<n.length&&r==="prev"?n.substr(0,t.length):o<0?null:n.substr(0,o)+s[o]+t.substr(o+1)}function at(n,e,t,s){var a,r,i,o,l,u,c,p=t.length;if(!t.every(g=>typeof g=="string"))return z(n,ts);function d(g){a=function(f){return f==="next"?h=>h.toUpperCase():h=>h.toLowerCase()}(g),r=function(f){return f==="next"?h=>h.toLowerCase():h=>h.toUpperCase()}(g),i=g==="next"?ka:Ia;var y=t.map(function(f){return{lower:r(f),upper:a(f)}}).sort(function(f,h){return i(f.lower,h.lower)});o=y.map(function(f){return f.upper}),l=y.map(function(f){return f.lower}),u=g,c=g==="next"?"":s}d("next");var m=new n.Collection(n,()=>re(o[0],l[p-1]+s));m._ondirectionchange=function(g){d(g)};var v=0;return m._addAlgorithm(function(g,y,f){var h=g.key;if(typeof h!="string")return!1;var w=r(h);if(e(w,l,v))return!0;for(var k=null,L=v;L<p;++L){var E=La(h,w,o[L],l[L],i,u);E===null&&k===null?v=L+1:(k===null||i(k,E)>0)&&(k=E)}return y(k!==null?function(){g.continue(k+c)}:f),!1}),m}function re(n,e,t,s){return{type:2,lower:n,upper:e,lowerOpen:t,upperOpen:s}}function as(n){return{type:1,lower:n,upper:n}}class rs{get Collection(){return this._ctx.table.db.Collection}between(e,t,s,a){s=s!==!1,a=a===!0;try{return this._cmp(e,t)>0||this._cmp(e,t)===0&&(s||a)&&(!s||!a)?ke(this):new this.Collection(this,()=>re(e,t,!s,!a))}catch{return z(this,J)}}equals(e){return e==null?z(this,J):new this.Collection(this,()=>as(e))}above(e){return e==null?z(this,J):new this.Collection(this,()=>re(e,void 0,!0))}aboveOrEqual(e){return e==null?z(this,J):new this.Collection(this,()=>re(e,void 0,!1))}below(e){return e==null?z(this,J):new this.Collection(this,()=>re(void 0,e,!1,!0))}belowOrEqual(e){return e==null?z(this,J):new this.Collection(this,()=>re(void 0,e))}startsWith(e){return typeof e!="string"?z(this,ts):this.between(e,e+me,!0,!0)}startsWithIgnoreCase(e){return e===""?this.startsWith(e):at(this,(t,s)=>t.indexOf(s[0])===0,[e],me)}equalsIgnoreCase(e){return at(this,(t,s)=>t===s[0],[e],"")}anyOfIgnoreCase(){var e=ee.apply(Ie,arguments);return e.length===0?ke(this):at(this,(t,s)=>s.indexOf(t)!==-1,e,"")}startsWithAnyOfIgnoreCase(){var e=ee.apply(Ie,arguments);return e.length===0?ke(this):at(this,(t,s)=>s.some(a=>t.indexOf(a)===0),e,me)}anyOf(){const e=ee.apply(Ie,arguments);let t=this._cmp;try{e.sort(t)}catch{return z(this,J)}if(e.length===0)return ke(this);const s=new this.Collection(this,()=>re(e[0],e[e.length-1]));s._ondirectionchange=r=>{t=r==="next"?this._ascending:this._descending,e.sort(t)};let a=0;return s._addAlgorithm((r,i,o)=>{const l=r.key;for(;t(l,e[a])>0;)if(++a,a===e.length)return i(o),!1;return t(l,e[a])===0||(i(()=>{r.continue(e[a])}),!1)}),s}notEqual(e){return this.inAnyRange([[Wt,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})}noneOf(){const e=ee.apply(Ie,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return z(this,J)}const t=e.reduce((s,a)=>s?s.concat([[s[s.length-1][1],a]]):[[Wt,a]],null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})}inAnyRange(e,t){const s=this._cmp,a=this._ascending,r=this._descending,i=this._min,o=this._max;if(e.length===0)return ke(this);if(!e.every(h=>h[0]!==void 0&&h[1]!==void 0&&a(h[0],h[1])<=0))return z(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",P.InvalidArgument);const l=!t||t.includeLowers!==!1,u=t&&t.includeUppers===!0;let c,p=a;function d(h,w){return p(h[0],w[0])}try{c=e.reduce(function(h,w){let k=0,L=h.length;for(;k<L;++k){const E=h[k];if(s(w[0],E[1])<0&&s(w[1],E[0])>0){E[0]=i(E[0],w[0]),E[1]=o(E[1],w[1]);break}}return k===L&&h.push(w),h},[]),c.sort(d)}catch{return z(this,J)}let m=0;const v=u?h=>a(h,c[m][1])>0:h=>a(h,c[m][1])>=0,g=l?h=>r(h,c[m][0])>0:h=>r(h,c[m][0])>=0;let y=v;const f=new this.Collection(this,()=>re(c[0][0],c[c.length-1][1],!l,!u));return f._ondirectionchange=h=>{h==="next"?(y=v,p=a):(y=g,p=r),c.sort(d)},f._addAlgorithm((h,w,k)=>{for(var L=h.key;y(L);)if(++m,m===c.length)return w(k),!1;return!!function(E){return!v(E)&&!g(E)}(L)||(this._cmp(L,c[m][1])===0||this._cmp(L,c[m][0])===0||w(()=>{p===a?h.continue(c[m][0]):h.continue(c[m][1])}),!1)}),f}startsWithAnyOf(){const e=ee.apply(Ie,arguments);return e.every(t=>typeof t=="string")?e.length===0?ke(this):this.inAnyRange(e.map(t=>[t,t+me])):z(this,"startsWithAnyOf() only works with strings")}}function Q(n){return D(function(e){return ze(e),n(e.target.error),!1})}function ze(n){n.stopPropagation&&n.stopPropagation(),n.preventDefault&&n.preventDefault()}const We="storagemutated",oe="x-storagemutated-1",ue=Ne(null,We);class Ba{_lock(){return Me(!B.global),++this._reculock,this._reculock!==1||B.global||(B.lockOwnerFor=this),this}_unlock(){if(Me(!B.global),--this._reculock==0)for(B.global||(B.lockOwnerFor=null);this._blockedFuncs.length>0&&!this._locked();){var e=this._blockedFuncs.shift();try{Re(e[1],e[0])}catch{}}return this}_locked(){return this._reculock&&B.lockOwnerFor!==this}create(e){if(!this.mode)return this;const t=this.db.idbdb,s=this.db._state.dbOpenError;if(Me(!this.idbtrans),!e&&!t)switch(s&&s.name){case"DatabaseClosedError":throw new P.DatabaseClosed(s);case"MissingAPIError":throw new P.MissingAPI(s.message,s);default:throw new P.OpenFailed(s)}if(!this.active)throw new P.TransactionInactive;return Me(this._completion._state===null),(e=this.idbtrans=e||(this.db.core?this.db.core.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}):t.transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability}))).onerror=D(a=>{ze(a),this._reject(e.error)}),e.onabort=D(a=>{ze(a),this.active&&this._reject(new P.Abort(e.error)),this.active=!1,this.on("abort").fire(a)}),e.oncomplete=D(()=>{this.active=!1,this._resolve(),"mutatedParts"in e&&ue.storagemutated.fire(e.mutatedParts)}),this}_promise(e,t,s){if(e==="readwrite"&&this.mode!=="readwrite")return F(new P.ReadOnly("Transaction is readonly"));if(!this.active)return F(new P.TransactionInactive);if(this._locked())return new I((r,i)=>{this._blockedFuncs.push([()=>{this._promise(e,t,s).then(r,i)},B])});if(s)return le(()=>{var r=new I((i,o)=>{this._lock();const l=t(i,o,this);l&&l.then&&l.then(i,o)});return r.finally(()=>this._unlock()),r._lib=!0,r});var a=new I((r,i)=>{var o=t(r,i,this);o&&o.then&&o.then(r,i)});return a._lib=!0,a}_root(){return this.parent?this.parent._root():this}waitFor(e){var t=this._root();const s=I.resolve(e);if(t._waitingFor)t._waitingFor=t._waitingFor.then(()=>s);else{t._waitingFor=s,t._waitingQueue=[];var a=t.idbtrans.objectStore(t.storeNames[0]);(function i(){for(++t._spinCount;t._waitingQueue.length;)t._waitingQueue.shift()();t._waitingFor&&(a.get(-1/0).onsuccess=i)})()}var r=t._waitingFor;return new I((i,o)=>{s.then(l=>t._waitingQueue.push(D(i.bind(null,l))),l=>t._waitingQueue.push(D(o.bind(null,l)))).finally(()=>{t._waitingFor===r&&(t._waitingFor=null)})})}abort(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new P.Abort))}table(e){const t=this._memoizedTables||(this._memoizedTables={});if(W(t,e))return t[e];const s=this.schema[e];if(!s)throw new P.NotFound("Table "+e+" not part of transaction");const a=new this.db.Table(e,s,this);return a.core=this.db.core.table(e),t[e]=a,a}}function Gt(n,e,t,s,a,r,i){return{name:n,keyPath:e,unique:t,multi:s,auto:a,compound:r,src:(t&&!i?"&":"")+(s?"*":"")+(a?"++":"")+is(e)}}function is(n){return typeof n=="string"?n:n?"["+[].join.call(n,"+")+"]":""}function os(n,e,t){return{name:n,primKey:e,indexes:t,mappedClass:null,idxByName:Kn(t,s=>[s.name,s])}}let Ge=n=>{try{return n.only([[]]),Ge=()=>[[]],[[]]}catch{return Ge=()=>me,me}};function Qt(n){return n==null?()=>{}:typeof n=="string"?function(e){return e.split(".").length===1?s=>s[e]:s=>se(s,e)}(n):e=>se(e,n)}function An(n){return[].slice.call(n)}let Pa=0;function He(n){return n==null?":id":typeof n=="string"?n:`[${n.join("+")}]`}function Ca(n,e,t){function s(l){if(l.type===3)return null;if(l.type===4)throw new Error("Cannot convert never type to IDBKeyRange");const{lower:u,upper:c,lowerOpen:p,upperOpen:d}=l;return u===void 0?c===void 0?null:e.upperBound(c,!!d):c===void 0?e.lowerBound(u,!!p):e.bound(u,c,!!p,!!d)}const{schema:a,hasGetAll:r}=function(l,u){const c=An(l.objectStoreNames);return{schema:{name:l.name,tables:c.map(p=>u.objectStore(p)).map(p=>{const{keyPath:d,autoIncrement:m}=p,v=H(d),g=d==null,y={},f={name:p.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:g,compound:v,keyPath:d,autoIncrement:m,unique:!0,extractKey:Qt(d)},indexes:An(p.indexNames).map(h=>p.index(h)).map(h=>{const{name:w,unique:k,multiEntry:L,keyPath:E}=h,x={name:w,compound:H(E),keyPath:E,unique:k,multiEntry:L,extractKey:Qt(E)};return y[He(E)]=x,x}),getIndexByKeyPath:h=>y[He(h)]};return y[":id"]=f.primaryKey,d!=null&&(y[He(d)]=f.primaryKey),f})},hasGetAll:c.length>0&&"getAll"in u.objectStore(c[0])&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)}}(n,t),i=a.tables.map(l=>function(u){const c=u.name;return{name:c,schema:u,mutate:function({trans:p,type:d,keys:m,values:v,range:g}){return new Promise((y,f)=>{y=D(y);const h=p.objectStore(c),w=h.keyPath==null,k=d==="put"||d==="add";if(!k&&d!=="delete"&&d!=="deleteRange")throw new Error("Invalid operation type: "+d);const{length:L}=m||v||{length:1};if(m&&v&&m.length!==v.length)throw new Error("Given keys array must have same length as given values array.");if(L===0)return y({numFailures:0,failures:{},results:[],lastResult:void 0});let E;const x=[],C=[];let _=0;const j=V=>{++_,ze(V)};if(d==="deleteRange"){if(g.type===4)return y({numFailures:_,failures:C,results:[],lastResult:void 0});g.type===3?x.push(E=h.clear()):x.push(E=h.delete(s(g)))}else{const[V,O]=k?w?[v,m]:[v,null]:[m,null];if(k)for(let M=0;M<L;++M)x.push(E=O&&O[M]!==void 0?h[d](V[M],O[M]):h[d](V[M])),E.onerror=j;else for(let M=0;M<L;++M)x.push(E=h[d](V[M])),E.onerror=j}const S=V=>{const O=V.target.result;x.forEach((M,we)=>M.error!=null&&(C[we]=M.error)),y({numFailures:_,failures:C,results:d==="delete"?m:x.map(M=>M.result),lastResult:O})};E.onerror=V=>{j(V),S(V)},E.onsuccess=S})},getMany:({trans:p,keys:d})=>new Promise((m,v)=>{m=D(m);const g=p.objectStore(c),y=d.length,f=new Array(y);let h,w=0,k=0;const L=x=>{const C=x.target;f[C._pos]=C.result,++k===w&&m(f)},E=Q(v);for(let x=0;x<y;++x)d[x]!=null&&(h=g.get(d[x]),h._pos=x,h.onsuccess=L,h.onerror=E,++w);w===0&&m(f)}),get:({trans:p,key:d})=>new Promise((m,v)=>{m=D(m);const g=p.objectStore(c).get(d);g.onsuccess=y=>m(y.target.result),g.onerror=Q(v)}),query:function(p){return d=>new Promise((m,v)=>{m=D(m);const{trans:g,values:y,limit:f,query:h}=d,w=f===1/0?void 0:f,{index:k,range:L}=h,E=g.objectStore(c),x=k.isPrimaryKey?E:E.index(k.name),C=s(L);if(f===0)return m({result:[]});if(p){const _=y?x.getAll(C,w):x.getAllKeys(C,w);_.onsuccess=j=>m({result:j.target.result}),_.onerror=Q(v)}else{let _=0;const j=y||!("openKeyCursor"in x)?x.openCursor(C):x.openKeyCursor(C),S=[];j.onsuccess=V=>{const O=j.result;return O?(S.push(y?O.value:O.primaryKey),++_===f?m({result:S}):void O.continue()):m({result:S})},j.onerror=Q(v)}})}(r),openCursor:function({trans:p,values:d,query:m,reverse:v,unique:g}){return new Promise((y,f)=>{y=D(y);const{index:h,range:w}=m,k=p.objectStore(c),L=h.isPrimaryKey?k:k.index(h.name),E=v?g?"prevunique":"prev":g?"nextunique":"next",x=d||!("openKeyCursor"in L)?L.openCursor(s(w),E):L.openKeyCursor(s(w),E);x.onerror=Q(f),x.onsuccess=D(C=>{const _=x.result;if(!_)return void y(null);_.___id=++Pa,_.done=!1;const j=_.continue.bind(_);let S=_.continuePrimaryKey;S&&(S=S.bind(_));const V=_.advance.bind(_),O=()=>{throw new Error("Cursor not stopped")};_.trans=p,_.stop=_.continue=_.continuePrimaryKey=_.advance=()=>{throw new Error("Cursor not started")},_.fail=D(f),_.next=function(){let M=1;return this.start(()=>M--?this.continue():this.stop()).then(()=>this)},_.start=M=>{const we=new Promise((U,pe)=>{U=D(U),x.onerror=Q(pe),_.fail=pe,_.stop=De=>{_.stop=_.continue=_.continuePrimaryKey=_.advance=O,U(De)}}),_e=()=>{if(x.result)try{M()}catch(U){_.fail(U)}else _.done=!0,_.start=()=>{throw new Error("Cursor behind last entry")},_.stop()};return x.onsuccess=D(U=>{x.onsuccess=_e,_e()}),_.continue=j,_.continuePrimaryKey=S,_.advance=V,_e(),we},y(_)},f)})},count({query:p,trans:d}){const{index:m,range:v}=p;return new Promise((g,y)=>{const f=d.objectStore(c),h=m.isPrimaryKey?f:f.index(m.name),w=s(v),k=w?h.count(w):h.count();k.onsuccess=D(L=>g(L.target.result)),k.onerror=Q(y)})}}}(l)),o={};return i.forEach(l=>o[l.name]=l),{stack:"dbcore",transaction:n.transaction.bind(n),table(l){if(!o[l])throw new Error(`Table '${l}' not found`);return o[l]},MIN_KEY:-1/0,MAX_KEY:Ge(e),schema:a}}function Yt({_novip:n},e){const t=e.db,s=function(a,r,{IDBKeyRange:i,indexedDB:o},l){return{dbcore:function(c,p){return p.reduce((d,{create:m})=>({...d,...m(d)}),c)}(Ca(r,i,l),a.dbcore)}}(n._middlewares,t,n._deps,e);n.core=s.dbcore,n.tables.forEach(a=>{const r=a.name;n.core.schema.tables.some(i=>i.name===r)&&(a.core=n.core.table(r),n[r]instanceof n.Table&&(n[r].core=a.core))})}function wt({_novip:n},e,t,s){t.forEach(a=>{const r=s[a];e.forEach(i=>{const o=rn(i,a);(!o||"value"in o&&o.value===void 0)&&(i===n.Transaction.prototype||i instanceof n.Transaction?ne(i,a,{get(){return this.table(a)},set(l){Mn(this,a,{value:l,writable:!0,configurable:!0,enumerable:!0})}}):i[a]=new n.Table(a,r))})})}function Jt({_novip:n},e){e.forEach(t=>{for(let s in t)t[s]instanceof n.Table&&delete t[s]})}function Sa(n,e){return n._cfg.version-e._cfg.version}function Aa(n,e,t,s){const a=n._dbSchema,r=n._createTransaction("readwrite",n._storeNames,a);r.create(t),r._completion.catch(s);const i=r._reject.bind(r),o=B.transless||B;le(()=>{B.trans=r,B.transless=o,e===0?(T(a).forEach(l=>{Dt(t,l,a[l].primKey,a[l].indexes)}),Yt(n,t),I.follow(()=>n.on.populate.fire(r)).catch(i)):function({_novip:l},u,c,p){const d=[],m=l._versions;let v=l._dbSchema=Zt(l,l.idbdb,p),g=!1;const y=m.filter(h=>h._cfg.version>=u);function f(){return d.length?I.resolve(d.shift()(c.idbtrans)).then(f):I.resolve()}return y.forEach(h=>{d.push(()=>{const w=v,k=h._cfg.dbschema;en(l,w,p),en(l,k,p),v=l._dbSchema=k;const L=ls(w,k);L.add.forEach(x=>{Dt(p,x[0],x[1].primKey,x[1].indexes)}),L.change.forEach(x=>{if(x.recreate)throw new P.Upgrade("Not yet support for changing primary key");{const C=p.objectStore(x.name);x.add.forEach(_=>Xt(C,_)),x.change.forEach(_=>{C.deleteIndex(_.name),Xt(C,_)}),x.del.forEach(_=>C.deleteIndex(_))}});const E=h._cfg.contentUpgrade;if(E&&h._cfg.version>u){Yt(l,p),c._memoizedTables={},g=!0;let x=On(k);L.del.forEach(S=>{x[S]=w[S]}),Jt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],T(x),x),c.schema=x;const C=on(E);let _;C&&Ae();const j=I.follow(()=>{if(_=E(c),_&&C){var S=ae.bind(null,null);_.then(S,S)}});return _&&typeof _.then=="function"?I.resolve(_):j.then(()=>_)}}),d.push(w=>{(!g||!xa)&&function(k,L){[].slice.call(L.db.objectStoreNames).forEach(E=>k[E]==null&&L.db.deleteObjectStore(E))}(h._cfg.dbschema,w),Jt(l,[l.Transaction.prototype]),wt(l,[l.Transaction.prototype],l._storeNames,l._dbSchema),c.schema=l._dbSchema})}),f().then(()=>{var h,w;w=p,T(h=v).forEach(k=>{w.db.objectStoreNames.contains(k)||Dt(w,k,h[k].primKey,h[k].indexes)})})}(n,e,r,t).catch(i)})}function ls(n,e){const t={del:[],add:[],change:[]};let s;for(s in n)e[s]||t.del.push(s);for(s in e){const a=n[s],r=e[s];if(a){const i={name:s,def:r,recreate:!1,del:[],add:[],change:[]};if(""+(a.primKey.keyPath||"")!=""+(r.primKey.keyPath||"")||a.primKey.auto!==r.primKey.auto&&!Et)i.recreate=!0,t.change.push(i);else{const o=a.idxByName,l=r.idxByName;let u;for(u in o)l[u]||i.del.push(u);for(u in l){const c=o[u],p=l[u];c?c.src!==p.src&&i.change.push(p):i.add.push(p)}(i.del.length>0||i.add.length>0||i.change.length>0)&&t.change.push(i)}}else t.add.push([s,r])}return t}function Dt(n,e,t,s){const a=n.db.createObjectStore(e,t.keyPath?{keyPath:t.keyPath,autoIncrement:t.auto}:{autoIncrement:t.auto});return s.forEach(r=>Xt(a,r)),a}function Xt(n,e){n.createIndex(e.name,e.keyPath,{unique:e.unique,multiEntry:e.multi})}function Zt(n,e,t){const s={};return ft(e.objectStoreNames,0).forEach(a=>{const r=t.objectStore(a);let i=r.keyPath;const o=Gt(is(i),i||"",!1,!1,!!r.autoIncrement,i&&typeof i!="string",!0),l=[];for(let c=0;c<r.indexNames.length;++c){const p=r.index(r.indexNames[c]);i=p.keyPath;var u=Gt(p.name,i,!!p.unique,!!p.multiEntry,!1,i&&typeof i!="string",!1);l.push(u)}s[a]=os(a,o,l)}),s}function en({_novip:n},e,t){const s=t.db.objectStoreNames;for(let a=0;a<s.length;++a){const r=s[a],i=t.objectStore(r);n._hasGetAll="getAll"in i;for(let o=0;o<i.indexNames.length;++o){const l=i.indexNames[o],u=i.index(l).keyPath,c=typeof u=="string"?u:"["+ft(u).join("+")+"]";if(e[r]){const p=e[r].idxByName[c];p&&(p.name=l,delete e[r].idxByName[c],e[r].idxByName[l]=p)}}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&R.WorkerGlobalScope&&R instanceof R.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(n._hasGetAll=!1)}class Ra{_parseStoresSpec(e,t){T(e).forEach(s=>{if(e[s]!==null){var a=e[s].split(",").map((i,o)=>{const l=(i=i.trim()).replace(/([&*]|\+\+)/g,""),u=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Gt(l,u||null,/\&/.test(i),/\*/.test(i),/\+\+/.test(i),H(u),o===0)}),r=a.shift();if(r.multi)throw new P.Schema("Primary key cannot be multi-valued");a.forEach(i=>{if(i.auto)throw new P.Schema("Only primary key can be marked as autoIncrement (++)");if(!i.keyPath)throw new P.Schema("Index must have a name and cannot be an empty string")}),t[s]=os(s,r,a)}})}stores(e){const t=this.db;this._cfg.storesSource=this._cfg.storesSource?$(this._cfg.storesSource,e):e;const s=t._versions,a={};let r={};return s.forEach(i=>{$(a,i._cfg.storesSource),r=i._cfg.dbschema={},i._parseStoresSpec(a,r)}),t._dbSchema=r,Jt(t,[t._allTables,t,t.Transaction.prototype]),wt(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],T(r),r),t._storeNames=T(r),this}upgrade(e){return this._cfg.contentUpgrade=un(this._cfg.contentUpgrade||A,e),this}}function mn(n,e){let t=n._dbNamesDB;return t||(t=n._dbNamesDB=new be(kt,{addons:[],indexedDB:n,IDBKeyRange:e}),t.version(1).stores({dbnames:"name"})),t.table("dbnames")}function fn(n){return n&&typeof n.databases=="function"}function tn(n){return le(function(){return B.letThrough=!0,n()})}function Da(){var n;return!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(e){var t=function(){return indexedDB.databases().finally(e)};n=setInterval(t,100),t()}).finally(function(){return clearInterval(n)}):Promise.resolve()}function ja(n){const e=n._state,{indexedDB:t}=n._deps;if(e.isBeingOpened||n.idbdb)return e.dbReadyPromise.then(()=>e.dbOpenError?F(e.dbOpenError):n);Y&&(e.openCanceller._stackHolder=xe()),e.isBeingOpened=!0,e.dbOpenError=null,e.openComplete=!1;const s=e.openCanceller;function a(){if(e.openCanceller!==s)throw new P.DatabaseClosed("db.open() was cancelled")}let r=e.dbReadyResolve,i=null,o=!1;const l=()=>new I((u,c)=>{if(a(),!t)throw new P.MissingAPI;const p=n.name,d=e.autoSchema?t.open(p):t.open(p,Math.round(10*n.verno));if(!d)throw new P.MissingAPI;d.onerror=Q(c),d.onblocked=D(n._fireOnBlocked),d.onupgradeneeded=D(m=>{if(i=d.transaction,e.autoSchema&&!n._options.allowEmptyDB){d.onerror=ze,i.abort(),d.result.close();const g=t.deleteDatabase(p);g.onsuccess=g.onerror=D(()=>{c(new P.NoSuchDatabase(`Database ${p} doesnt exist`))})}else{i.onerror=Q(c);var v=m.oldVersion>Math.pow(2,62)?0:m.oldVersion;o=v<1,n._novip.idbdb=d.result,Aa(n,v/10,i,c)}},c),d.onsuccess=D(()=>{i=null;const m=n._novip.idbdb=d.result,v=ft(m.objectStoreNames);if(v.length>0)try{const y=m.transaction((g=v).length===1?g[0]:g,"readonly");e.autoSchema?function({_novip:f},h,w){f.verno=h.version/10;const k=f._dbSchema=Zt(0,h,w);f._storeNames=ft(h.objectStoreNames,0),wt(f,[f._allTables],T(k),k)}(n,m,y):(en(n,n._dbSchema,y),function(f,h){const w=ls(Zt(0,f.idbdb,h),f._dbSchema);return!(w.add.length||w.change.some(k=>k.add.length||k.change.length))}(n,y)||console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")),Yt(n,y)}catch{}var g;Oe.push(n),m.onversionchange=D(y=>{e.vcFired=!0,n.on("versionchange").fire(y)}),m.onclose=D(y=>{n.on("close").fire(y)}),o&&function({indexedDB:y,IDBKeyRange:f},h){!fn(y)&&h!==kt&&mn(y,f).put({name:h}).catch(A)}(n._deps,p),u()},c)}).catch(u=>u&&u.name==="UnknownError"&&e.PR1398_maxLoop>0?(e.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),l()):I.reject(u));return I.race([s,(typeof navigator>"u"?I.resolve():Da()).then(l)]).then(()=>(a(),e.onReadyBeingFired=[],I.resolve(tn(()=>n.on.ready.fire(n.vip))).then(function u(){if(e.onReadyBeingFired.length>0){let c=e.onReadyBeingFired.reduce(un,A);return e.onReadyBeingFired=[],I.resolve(tn(()=>c(n.vip))).then(u)}}))).finally(()=>{e.onReadyBeingFired=null,e.isBeingOpened=!1}).then(()=>n).catch(u=>{e.dbOpenError=u;try{i&&i.abort()}catch{}return s===e.openCanceller&&n._close(),F(u)}).finally(()=>{e.openComplete=!0,r()})}function nn(n){var e=r=>n.next(r),t=a(e),s=a(r=>n.throw(r));function a(r){return i=>{var o=r(i),l=o.value;return o.done?l:l&&typeof l.then=="function"?l.then(t,s):H(l)?Promise.all(l).then(t,s):t(l)}}return a(e)()}function Ma(n,e,t){var s=arguments.length;if(s<2)throw new P.InvalidArgument("Too few arguments");for(var a=new Array(s-1);--s;)a[s-1]=arguments[s];return t=a.pop(),[n,Nn(a),t]}function cs(n,e,t,s,a){return I.resolve().then(()=>{const r=B.transless||B,i=n._createTransaction(e,t,n._dbSchema,s),o={trans:i,transless:r};if(s)i.idbtrans=s.idbtrans;else try{i.create(),n._state.PR1398_maxLoop=3}catch(p){return p.name===cn.InvalidState&&n.isOpen()&&--n._state.PR1398_maxLoop>0?(console.warn("Dexie: Need to reopen db"),n._close(),n.open().then(()=>cs(n,e,t,null,a))):F(p)}const l=on(a);let u;l&&Ae();const c=I.follow(()=>{if(u=a.call(i,i),u)if(l){var p=ae.bind(null,null);u.then(p,p)}else typeof u.next=="function"&&typeof u.throw=="function"&&(u=nn(u))},o);return(u&&typeof u.then=="function"?I.resolve(u).then(p=>i.active?p:F(new P.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))):c.then(()=>u)).then(p=>(s&&i._resolve(),i._completion.then(()=>p))).catch(p=>(i._reject(p),F(p)))})}function rt(n,e,t){const s=H(n)?n.slice():[n];for(let a=0;a<t;++a)s.push(e);return s}const Ta={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(n){return{...n,table(e){const t=n.table(e),{schema:s}=t,a={},r=[];function i(c,p,d){const m=He(c),v=a[m]=a[m]||[],g=c==null?0:typeof c=="string"?1:c.length,y=p>0,f={...d,isVirtual:y,keyTail:p,keyLength:g,extractKey:Qt(c),unique:!y&&d.unique};return v.push(f),f.isPrimaryKey||r.push(f),g>1&&i(g===2?c[0]:c.slice(0,g-1),p+1,d),v.sort((h,w)=>h.keyTail-w.keyTail),f}const o=i(s.primaryKey.keyPath,0,s.primaryKey);a[":id"]=[o];for(const c of s.indexes)i(c.keyPath,0,c);function l(c){const p=c.query.index;return p.isVirtual?{...c,query:{index:p,range:(d=c.query.range,m=p.keyTail,{type:d.type===1?2:d.type,lower:rt(d.lower,d.lowerOpen?n.MAX_KEY:n.MIN_KEY,m),lowerOpen:!0,upper:rt(d.upper,d.upperOpen?n.MIN_KEY:n.MAX_KEY,m),upperOpen:!0})}}:c;var d,m}return{...t,schema:{...s,primaryKey:o,indexes:r,getIndexByKeyPath:function(c){const p=a[He(c)];return p&&p[0]}},count:c=>t.count(l(c)),query:c=>t.query(l(c)),openCursor(c){const{keyTail:p,isVirtual:d,keyLength:m}=c.query.index;return d?t.openCursor(l(c)).then(v=>v&&function(g){return Object.create(g,{continue:{value:function(f){f!=null?g.continue(rt(f,c.reverse?n.MAX_KEY:n.MIN_KEY,p)):c.unique?g.continue(g.key.slice(0,m).concat(c.reverse?n.MIN_KEY:n.MAX_KEY,p)):g.continue()}},continuePrimaryKey:{value(f,h){g.continuePrimaryKey(rt(f,n.MAX_KEY,p),h)}},primaryKey:{get:()=>g.primaryKey},key:{get(){const f=g.key;return m===1?f[0]:f.slice(0,m)}},value:{get:()=>g.value}})}(v)):t.openCursor(c)}}}}}};function gn(n,e,t,s){return t=t||{},s=s||"",T(n).forEach(a=>{if(W(e,a)){var r=n[a],i=e[a];if(typeof r=="object"&&typeof i=="object"&&r&&i){const o=Mt(r);o!==Mt(i)?t[s+a]=e[a]:o==="Object"?gn(r,i,t,s+a+"."):r!==i&&(t[s+a]=e[a])}else r!==i&&(t[s+a]=e[a])}else t[s+a]=void 0}),T(e).forEach(a=>{W(n,a)||(t[s+a]=e[a])}),t}const Fa={stack:"dbcore",name:"HooksMiddleware",level:2,create:n=>({...n,table(e){const t=n.table(e),{primaryKey:s}=t.schema;return{...t,mutate(r){const i=B.trans,{deleting:o,creating:l,updating:u}=i.table(e).hook;switch(r.type){case"add":if(l.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"put":if(l.fire===A&&u.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"delete":if(o.fire===A)break;return i._promise("readwrite",()=>c(r),!0);case"deleteRange":if(o.fire===A)break;return i._promise("readwrite",()=>function(d){return p(d.trans,d.range,1e4)}(r),!0)}return t.mutate(r);function c(d){const m=B.trans,v=d.keys||function(g,y){return y.type==="delete"?y.keys:y.keys||y.values.map(g.extractKey)}(s,d);if(!v)throw new Error("Keys missing");return(d=d.type==="add"||d.type==="put"?{...d,keys:v}:{...d}).type!=="delete"&&(d.values=[...d.values]),d.keys&&(d.keys=[...d.keys]),function(g,y,f){return y.type==="add"?Promise.resolve([]):g.getMany({trans:y.trans,keys:f,cache:"immutable"})}(t,d,v).then(g=>{const y=v.map((f,h)=>{const w=g[h],k={onerror:null,onsuccess:null};if(d.type==="delete")o.fire.call(k,f,w,m);else if(d.type==="add"||w===void 0){const L=l.fire.call(k,f,d.values[h],m);f==null&&L!=null&&(f=L,d.keys[h]=f,s.outbound||G(d.values[h],s.keyPath,f))}else{const L=gn(w,d.values[h]),E=u.fire.call(k,L,f,w,m);if(E){const x=d.values[h];Object.keys(E).forEach(C=>{W(x,C)?x[C]=E[C]:G(x,C,E[C])})}}return k});return t.mutate(d).then(({failures:f,results:h,numFailures:w,lastResult:k})=>{for(let L=0;L<v.length;++L){const E=h?h[L]:v[L],x=y[L];E==null?x.onerror&&x.onerror(f[L]):x.onsuccess&&x.onsuccess(d.type==="put"&&g[L]?d.values[L]:E)}return{failures:f,results:h,numFailures:w,lastResult:k}}).catch(f=>(y.forEach(h=>h.onerror&&h.onerror(f)),Promise.reject(f)))})}function p(d,m,v){return t.query({trans:d,values:!1,query:{index:s,range:m},limit:v}).then(({result:g})=>c({type:"delete",keys:g,trans:d}).then(y=>y.numFailures>0?Promise.reject(y.failures[0]):g.length<v?{failures:[],numFailures:0,lastResult:void 0}:p(d,{...m,lower:g[g.length-1],lowerOpen:!0},v)))}}}}})};function us(n,e,t){try{if(!e||e.keys.length<n.length)return null;const s=[];for(let a=0,r=0;a<e.keys.length&&r<n.length;++a)q(e.keys[a],n[r])===0&&(s.push(t?Ye(e.values[a]):e.values[a]),++r);return s.length===n.length?s:null}catch{return null}}const Ka={stack:"dbcore",level:-1,create:n=>({table:e=>{const t=n.table(e);return{...t,getMany:s=>{if(!s.cache)return t.getMany(s);const a=us(s.keys,s.trans._cache,s.cache==="clone");return a?I.resolve(a):t.getMany(s).then(r=>(s.trans._cache={keys:s.keys,values:s.cache==="clone"?Ye(r):r},r))},mutate:s=>(s.type!=="add"&&(s.trans._cache=null),t.mutate(s))}}})};function bn(n){return!("from"in n)}const Z=function(n,e){if(!this){const t=new Z;return n&&"d"in n&&$(t,n),t}$(this,arguments.length?{d:1,from:n,to:arguments.length>1?e:n}:{d:0})};function Qe(n,e,t){const s=q(e,t);if(isNaN(s))return;if(s>0)throw RangeError();if(bn(n))return $(n,{from:e,to:t,d:1});const a=n.l,r=n.r;if(q(t,n.from)<0)return a?Qe(a,e,t):n.l={from:e,to:t,d:1,l:null,r:null},Rn(n);if(q(e,n.to)>0)return r?Qe(r,e,t):n.r={from:e,to:t,d:1,l:null,r:null},Rn(n);q(e,n.from)<0&&(n.from=e,n.l=null,n.d=r?r.d+1:1),q(t,n.to)>0&&(n.to=t,n.r=null,n.d=n.l?n.l.d+1:1);const i=!n.r;a&&!n.l&&_t(n,a),r&&i&&_t(n,r)}function _t(n,e){bn(e)||function t(s,{from:a,to:r,l:i,r:o}){Qe(s,a,r),i&&t(s,i),o&&t(s,o)}(n,e)}function Oa(n,e){const t=sn(e);let s=t.next();if(s.done)return!1;let a=s.value;const r=sn(n);let i=r.next(a.from),o=i.value;for(;!s.done&&!i.done;){if(q(o.from,a.to)<=0&&q(o.to,a.from)>=0)return!0;q(a.from,o.from)<0?a=(s=t.next(o.from)).value:o=(i=r.next(a.from)).value}return!1}function sn(n){let e=bn(n)?null:{s:0,n};return{next(t){const s=arguments.length>0;for(;e;)switch(e.s){case 0:if(e.s=1,s)for(;e.n.l&&q(t,e.n.from)<0;)e={up:e,n:e.n.l,s:1};else for(;e.n.l;)e={up:e,n:e.n.l,s:1};case 1:if(e.s=2,!s||q(t,e.n.to)<=0)return{value:e.n,done:!1};case 2:if(e.n.r){e.s=3,e={up:e,n:e.n.r,s:0};continue}case 3:e=e.up}return{done:!0}}}}function Rn(n){var e,t;const s=(((e=n.r)===null||e===void 0?void 0:e.d)||0)-(((t=n.l)===null||t===void 0?void 0:t.d)||0),a=s>1?"r":s<-1?"l":"";if(a){const r=a==="r"?"l":"r",i={...n},o=n[a];n.from=o.from,n.to=o.to,n[a]=o[a],i[a]=o[r],n[r]=i,i.d=Dn(i)}n.d=Dn(n)}function Dn({r:n,l:e}){return(n?e?Math.max(n.d,e.d):n.d:e?e.d:0)+1}Se(Z.prototype,{add(n){return _t(this,n),this},addKey(n){return Qe(this,n,n),this},addKeys(n){return n.forEach(e=>Qe(this,e,e)),this},[Tt](){return sn(this)}});const Na={stack:"dbcore",level:0,create:n=>{const e=n.schema.name,t=new Z(n.MIN_KEY,n.MAX_KEY);return{...n,table:s=>{const a=n.table(s),{schema:r}=a,{primaryKey:i}=r,{extractKey:o,outbound:l}=i,u={...a,mutate:d=>{const m=d.trans,v=m.mutatedParts||(m.mutatedParts={}),g=E=>{const x=`idb://${e}/${s}/${E}`;return v[x]||(v[x]=new Z)},y=g(""),f=g(":dels"),{type:h}=d;let[w,k]=d.type==="deleteRange"?[d.range]:d.type==="delete"?[d.keys]:d.values.length<50?[[],d.values]:[];const L=d.trans._cache;return a.mutate(d).then(E=>{if(H(w)){h!=="delete"&&(w=E.results),y.addKeys(w);const x=us(w,L);x||h==="add"||f.addKeys(w),(x||k)&&function(C,_,j,S){function V(O){const M=C(O.name||"");function we(U){return U!=null?O.extractKey(U):null}const _e=U=>O.multiEntry&&H(U)?U.forEach(pe=>M.addKey(pe)):M.addKey(U);(j||S).forEach((U,pe)=>{const De=j&&we(j[pe]),Lt=S&&we(S[pe]);q(De,Lt)!==0&&(De!=null&&_e(De),Lt!=null&&_e(Lt))})}_.indexes.forEach(V)}(g,r,x,k)}else if(w){const x={from:w.lower,to:w.upper};f.add(x),y.add(x)}else y.add(t),f.add(t),r.indexes.forEach(x=>g(x.name).add(t));return E})}},c=({query:{index:d,range:m}})=>{var v,g;return[d,new Z((v=m.lower)!==null&&v!==void 0?v:n.MIN_KEY,(g=m.upper)!==null&&g!==void 0?g:n.MAX_KEY)]},p={get:d=>[i,new Z(d.key)],getMany:d=>[i,new Z().addKeys(d.keys)],count:c,query:c,openCursor:c};return T(p).forEach(d=>{u[d]=function(m){const{subscr:v}=B;if(v){const g=k=>{const L=`idb://${e}/${s}/${k}`;return v[L]||(v[L]=new Z)},y=g(""),f=g(":dels"),[h,w]=p[d](m);if(g(h.name||"").add(w),!h.isPrimaryKey){if(d!=="count"){const k=d==="query"&&l&&m.values&&a.query({...m,values:!1});return a[d].apply(this,arguments).then(L=>{if(d==="query"){if(l&&m.values)return k.then(({result:x})=>(y.addKeys(x),L));const E=m.values?L.result.map(o):L.result;m.values?y.addKeys(E):f.addKeys(E)}else if(d==="openCursor"){const E=L,x=m.values;return E&&Object.create(E,{key:{get:()=>(f.addKey(E.primaryKey),E.key)},primaryKey:{get(){const C=E.primaryKey;return f.addKey(C),C}},value:{get:()=>(x&&y.addKey(E.primaryKey),E.value)}})}return L})}f.add(t)}}return a[d].apply(this,arguments)}}),u}}}};class be{constructor(e,t){this._middlewares={},this.verno=0;const s=be.dependencies;this._options=t={addons:be.addons,autoOpen:!0,indexedDB:s.indexedDB,IDBKeyRange:s.IDBKeyRange,...t},this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange};const{addons:a}=t;this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this;const r={dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:A,dbReadyPromise:null,cancelOpen:A,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3};var i;r.dbReadyPromise=new I(o=>{r.dbReadyResolve=o}),r.openCanceller=new I((o,l)=>{r.cancelOpen=l}),this._state=r,this.name=e,this.on=Ne(this,"populate","blocked","versionchange","close",{ready:[un,A]}),this.on.ready.subscribe=Tn(this.on.ready.subscribe,o=>(l,u)=>{be.vip(()=>{const c=this._state;if(c.openComplete)c.dbOpenError||I.resolve().then(l),u&&o(l);else if(c.onReadyBeingFired)c.onReadyBeingFired.push(l),u&&o(l);else{o(l);const p=this;u||o(function d(){p.on.ready.unsubscribe(l),p.on.ready.unsubscribe(d)})}})}),this.Collection=(i=this,je(Ea.prototype,function(o,l){this.db=i;let u=ss,c=null;if(l)try{u=l()}catch(v){c=v}const p=o._ctx,d=p.table,m=d.hook.reading.fire;this._ctx={table:d,index:p.index,isPrimKey:!p.index||d.schema.primKey.keyPath&&p.index===d.schema.primKey.name,range:u,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:c,or:p.or,valueMapper:m!==$e?m:null}})),this.Table=function(o){return je(_a.prototype,function(l,u,c){this.db=o,this._tx=c,this.name=l,this.schema=u,this.hook=o._allTables[l]?o._allTables[l].hook:Ne(null,{creating:[ua,A],reading:[ca,$e],updating:[pa,A],deleting:[da,A]})})}(this),this.Transaction=function(o){return je(Ba.prototype,function(l,u,c,p,d){this.db=o,this.mode=l,this.storeNames=u,this.schema=c,this.chromeTransactionDurability=p,this.idbtrans=null,this.on=Ne(this,"complete","error","abort"),this.parent=d||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new I((m,v)=>{this._resolve=m,this._reject=v}),this._completion.then(()=>{this.active=!1,this.on.complete.fire()},m=>{var v=this.active;return this.active=!1,this.on.error.fire(m),this.parent?this.parent._reject(m):v&&this.idbtrans&&this.idbtrans.abort(),F(m)})})}(this),this.Version=function(o){return je(Ra.prototype,function(l){this.db=o,this._cfg={version:l,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})}(this),this.WhereClause=function(o){return je(rs.prototype,function(l,u,c){this.db=o,this._ctx={table:l,index:u===":id"?null:u,or:c};const p=o._deps.indexedDB;if(!p)throw new P.MissingAPI;this._cmp=this._ascending=p.cmp.bind(p),this._descending=(d,m)=>p.cmp(m,d),this._max=(d,m)=>p.cmp(d,m)>0?d:m,this._min=(d,m)=>p.cmp(d,m)<0?d:m,this._IDBKeyRange=o._deps.IDBKeyRange})}(this),this.on("versionchange",o=>{o.newVersion>0?console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`):console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`),this.close()}),this.on("blocked",o=>{!o.newVersion||o.newVersion<o.oldVersion?console.warn(`Dexie.delete('${this.name}') was blocked`):console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${o.oldVersion/10}`)}),this._maxKey=Ge(t.IDBKeyRange),this._createTransaction=(o,l,u,c)=>new this.Transaction(o,l,u,this._options.chromeTransactionDurability,c),this._fireOnBlocked=o=>{this.on("blocked").fire(o),Oe.filter(l=>l.name===this.name&&l!==this&&!l._state.vcFired).map(l=>l.on("versionchange").fire(o))},this.use(Ta),this.use(Fa),this.use(Na),this.use(Ka),this.vip=Object.create(this,{_vip:{value:!0}}),a.forEach(o=>o(this))}version(e){if(isNaN(e)||e<.1)throw new P.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new P.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);const t=this._versions;var s=t.filter(a=>a._cfg.version===e)[0];return s||(s=new this.Version(e),t.push(s),t.sort(Sa),s.stores({}),this._state.autoSchema=!1,s)}_whenReady(e){return this.idbdb&&(this._state.openComplete||B.letThrough||this._vip)?e():new I((t,s)=>{if(this._state.openComplete)return s(new P.DatabaseClosed(this._state.dbOpenError));if(!this._state.isBeingOpened){if(!this._options.autoOpen)return void s(new P.DatabaseClosed);this.open().catch(A)}this._state.dbReadyPromise.then(t,s)}).then(e)}use({stack:e,create:t,level:s,name:a}){a&&this.unuse({stack:e,name:a});const r=this._middlewares[e]||(this._middlewares[e]=[]);return r.push({stack:e,create:t,level:s??10,name:a}),r.sort((i,o)=>i.level-o.level),this}unuse({stack:e,name:t,create:s}){return e&&this._middlewares[e]&&(this._middlewares[e]=this._middlewares[e].filter(a=>s?a.create!==s:!!t&&a.name!==t)),this}open(){return ja(this)}_close(){const e=this._state,t=Oe.indexOf(this);if(t>=0&&Oe.splice(t,1),this.idbdb){try{this.idbdb.close()}catch{}this._novip.idbdb=null}e.dbReadyPromise=new I(s=>{e.dbReadyResolve=s}),e.openCanceller=new I((s,a)=>{e.cancelOpen=a})}close(){this._close();const e=this._state;this._options.autoOpen=!1,e.dbOpenError=new P.DatabaseClosed,e.isBeingOpened&&e.cancelOpen(e.dbOpenError)}delete(){const e=arguments.length>0,t=this._state;return new I((s,a)=>{const r=()=>{this.close();var i=this._deps.indexedDB.deleteDatabase(this.name);i.onsuccess=D(()=>{(function({indexedDB:o,IDBKeyRange:l},u){!fn(o)&&u!==kt&&mn(o,l).delete(u).catch(A)})(this._deps,this.name),s()}),i.onerror=Q(a),i.onblocked=this._fireOnBlocked};if(e)throw new P.InvalidArgument("Arguments not allowed in db.delete()");t.isBeingOpened?t.dbReadyPromise.then(r):r()})}backendDB(){return this.idbdb}isOpen(){return this.idbdb!==null}hasBeenClosed(){const e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"}hasFailed(){return this._state.dbOpenError!==null}dynamicallyOpened(){return this._state.autoSchema}get tables(){return T(this._allTables).map(e=>this._allTables[e])}transaction(){const e=Ma.apply(this,arguments);return this._transaction.apply(this,e)}_transaction(e,t,s){let a=B.trans;a&&a.db===this&&e.indexOf("!")===-1||(a=null);const r=e.indexOf("?")!==-1;let i,o;e=e.replace("!","").replace("?","");try{if(o=t.map(u=>{var c=u instanceof this.Table?u.name:u;if(typeof c!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return c}),e=="r"||e===Pt)i=Pt;else{if(e!="rw"&&e!=Ct)throw new P.InvalidArgument("Invalid transaction mode: "+e);i=Ct}if(a){if(a.mode===Pt&&i===Ct){if(!r)throw new P.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");a=null}a&&o.forEach(u=>{if(a&&a.storeNames.indexOf(u)===-1){if(!r)throw new P.SubTransaction("Table "+u+" not included in parent transaction.");a=null}}),r&&a&&!a.active&&(a=null)}}catch(u){return a?a._promise(null,(c,p)=>{p(u)}):F(u)}const l=cs.bind(null,this,i,o,a,s);return a?a._promise(i,l,"lock"):B.trans?Re(B.transless,()=>this._whenReady(l)):this._whenReady(l)}table(e){if(!W(this._allTables,e))throw new P.InvalidTable(`Table ${e} does not exist`);return this._allTables[e]}}const Ha=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable";class Va{constructor(e){this._subscribe=e}subscribe(e,t,s){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:s})}[Ha](){return this}}function ds(n,e){return T(e).forEach(t=>{_t(n[t]||(n[t]=new Z),e[t])}),n}function qa(n){let e,t=!1;const s=new Va(a=>{const r=on(n);let i=!1,o={},l={};const u={get closed(){return i},unsubscribe:()=>{i=!0,ue.storagemutated.unsubscribe(m)}};a.start&&a.start(u);let c=!1,p=!1;function d(){return T(l).some(g=>o[g]&&Oa(o[g],l[g]))}const m=g=>{ds(o,g),d()&&v()},v=()=>{if(c||i)return;o={};const g={},y=function(f){r&&Ae();const h=()=>le(n,{subscr:f,trans:null}),w=B.trans?Re(B.transless,h):h();return r&&w.then(ae,ae),w}(g);p||(ue(We,m),p=!0),c=!0,Promise.resolve(y).then(f=>{t=!0,e=f,c=!1,i||(d()?v():(o={},l=g,a.next&&a.next(f)))},f=>{c=!1,t=!1,a.error&&a.error(f),u.unsubscribe()})};return v(),u});return s.hasValue=()=>t,s.getValue=()=>e,s}let an;try{an={indexedDB:R.indexedDB||R.mozIndexedDB||R.webkitIndexedDB||R.msIndexedDB,IDBKeyRange:R.IDBKeyRange||R.webkitIDBKeyRange}}catch{an={indexedDB:null,IDBKeyRange:null}}const he=be;function ht(n){let e=te;try{te=!0,ue.storagemutated.fire(n)}finally{te=e}}Se(he,{...ot,delete:n=>new he(n,{addons:[]}).delete(),exists:n=>new he(n,{addons:[]}).open().then(e=>(e.close(),!0)).catch("NoSuchDatabaseError",()=>!1),getDatabaseNames(n){try{return function({indexedDB:e,IDBKeyRange:t}){return fn(e)?Promise.resolve(e.databases()).then(s=>s.map(a=>a.name).filter(a=>a!==kt)):mn(e,t).toCollection().primaryKeys()}(he.dependencies).then(n)}catch{return F(new P.MissingAPI)}},defineClass:()=>function(n){$(this,n)},ignoreTransaction:n=>B.trans?Re(B.transless,n):n(),vip:tn,async:function(n){return function(){try{var e=nn(n.apply(this,arguments));return e&&typeof e.then=="function"?e:I.resolve(e)}catch(t){return F(t)}}},spawn:function(n,e,t){try{var s=nn(n.apply(t,e||[]));return s&&typeof s.then=="function"?s:I.resolve(s)}catch(a){return F(a)}},currentTransaction:{get:()=>B.trans||null},waitFor:function(n,e){const t=I.resolve(typeof n=="function"?he.ignoreTransaction(n):n).timeout(e||6e4);return B.trans?B.trans.waitFor(t):t},Promise:I,debug:{get:()=>Y,set:n=>{Vn(n,n==="dexie"?()=>!0:ns)}},derive:Be,extend:$,props:Se,override:Tn,Events:Ne,on:ue,liveQuery:qa,extendObservabilitySet:ds,getByKeyPath:se,setByKeyPath:G,delByKeyPath:function(n,e){typeof e=="string"?G(n,e,void 0):"length"in e&&[].map.call(e,function(t){G(n,t,void 0)})},shallowClone:On,deepClone:Ye,getObjectDiff:gn,cmp:q,asap:Fn,minKey:Wt,addons:[],connections:Oe,errnames:cn,dependencies:an,semVer:Ln,version:Ln.split(".").map(n=>parseInt(n)).reduce((n,e,t)=>n+e/Math.pow(10,2*t))}),he.maxKey=Ge(he.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(ue(We,n=>{if(!te){let e;Et?(e=document.createEvent("CustomEvent"),e.initCustomEvent(oe,!0,!0,n)):e=new CustomEvent(oe,{detail:n}),te=!0,dispatchEvent(e),te=!1}}),addEventListener(oe,({detail:n})=>{te||ht(n)}));let te=!1;if(typeof BroadcastChannel<"u"){const n=new BroadcastChannel(oe);typeof n.unref=="function"&&n.unref(),ue(We,e=>{te||n.postMessage(e)}),n.onmessage=e=>{e.data&&ht(e.data)}}else if(typeof self<"u"&&typeof navigator<"u"){ue(We,e=>{try{te||(typeof localStorage<"u"&&localStorage.setItem(oe,JSON.stringify({trig:Math.random(),changedParts:e})),typeof self.clients=="object"&&[...self.clients.matchAll({includeUncontrolled:!0})].forEach(t=>t.postMessage({type:oe,changedParts:e})))}catch{}}),typeof addEventListener<"u"&&addEventListener("storage",e=>{if(e.key===oe){const t=JSON.parse(e.newValue);t&&ht(t.changedParts)}});const n=self.document&&navigator.serviceWorker;n&&n.addEventListener("message",function({data:e}){e&&e.type===oe&&ht(e.changedParts)})}I.rejectionMapper=function(n,e){if(!n||n instanceof Pe||n instanceof TypeError||n instanceof SyntaxError||!n.name||!_n[n.name])return n;var t=new _n[n.name](e||n.message,n);return"stack"in n&&ne(t,"stack",{get:function(){return this.inner.stack}}),t},Vn(Y,ns);class $a extends be{constructor(){super("VetCalcDB");b(this,"users");this.version(2).stores({users:"++id, email, isPremium"})}}const it=new $a;class Ua{constructor(){b(this,"currentUser",null);const e=localStorage.getItem("vetcalc_current_user");if(e)try{const t=JSON.parse(e);this.currentUser=t,Le.setStatus(t.isPremium)}catch{}}async register(e,t,s){if(await it.users.where("email").equals(e).first())return{success:!1,message:"El email ya está registrado"};const r={email:e,password:t,isPremium:!1,name:s,createdAt:new Date};return await it.users.add(r),{success:!0,message:"Registro exitoso"}}async login(e,t){const s=await it.users.where("email").equals(e).first();return!s||s.password!==t?{success:!1,message:"Credenciales incorrectas"}:(this.currentUser=s,localStorage.setItem("vetcalc_current_user",JSON.stringify(s)),Le.setStatus(s.isPremium),{success:!0,message:"Login exitoso"})}logout(){this.currentUser=null,localStorage.removeItem("vetcalc_current_user"),Le.setStatus(!1)}isLoggedIn(){return this.currentUser!==null}getCurrentUser(){return this.currentUser}async upgradeToPremium(){!this.currentUser||!this.currentUser.id||(this.currentUser.isPremium=!0,await it.users.update(this.currentUser.id,{isPremium:!0}),localStorage.setItem("vetcalc_current_user",JSON.stringify(this.currentUser)),Le.setStatus(!0))}}const It=new Ua;class za extends de{constructor(){super();b(this,"view");this.view=new Xs}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onLoginClick(async()=>{const t=this.view.getEmail(),s=this.view.getPassword(),a=await It.login(t,s);a.success?await K.navigate("home"):this.view.showError(a.message)}),this.view.onRegisterLinkClick(async()=>{await K.navigate("register")})}destroy(){console.log("[LoginController] Destroyed")}}const Wa=`
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
`;class Ga{constructor(){b(this,"nameInput",null);b(this,"emailInput",null);b(this,"passwordInput",null);b(this,"confirmInput",null);b(this,"registerBtn",null);b(this,"loginLink",null)}render(){const e=document.getElementById("app");e&&(e.innerHTML=Wa),this.cacheElements()}cacheElements(){this.nameInput=document.getElementById("reg-name"),this.emailInput=document.getElementById("reg-email"),this.passwordInput=document.getElementById("reg-password"),this.confirmInput=document.getElementById("reg-confirm"),this.registerBtn=document.getElementById("register-btn"),this.loginLink=document.getElementById("go-to-login")}getName(){var e;return((e=this.nameInput)==null?void 0:e.value)||""}getEmail(){var e;return((e=this.emailInput)==null?void 0:e.value)||""}getPassword(){var e;return((e=this.passwordInput)==null?void 0:e.value)||""}getConfirm(){var e;return((e=this.confirmInput)==null?void 0:e.value)||""}onRegisterClick(e){var t;(t=this.registerBtn)==null||t.addEventListener("click",e)}onLoginLinkClick(e){var t;(t=this.loginLink)==null||t.addEventListener("click",e)}showError(e){alert(e)}}class Qa extends de{constructor(){super();b(this,"view");this.view=new Ga}async init(){this.view.render(),this.setupEventListeners()}setupEventListeners(){this.view.onRegisterClick(async()=>{const t=this.view.getName(),s=this.view.getEmail(),a=this.view.getPassword(),r=this.view.getConfirm();if(!t||!s||!a){this.view.showError("Todos los campos son obligatorios");return}if(a!==r){this.view.showError("Las contraseñas no coinciden");return}const i=await It.register(s,a,t);i.success?(alert("Registro exitoso. Ahora inicia sesión."),await K.navigate("login")):this.view.showError(i.message)}),this.view.onLoginLinkClick(async()=>{await K.navigate("login")})}destroy(){console.log("[RegisterController] Destroyed")}}let Ve=null;function ps(){Ve&&(Ve.destroy(),Ve=null)}function jn(n,e){K.register(n,async()=>{ps();const t=e();Ve=t,await t.init()})}function X(n,e){K.register(n,async()=>{if(!It.isLoggedIn()){await K.navigate("login");return}ps();const t=e();Ve=t,await t.init()})}class Ya{async init(){if(K.register("splash",async()=>{await new vs().init()}),jn("login",()=>new za),jn("register",()=>new Qa),X("home",()=>new Ls),X("patients",()=>new Ws),X("library",()=>new $s),X("history",()=>new Hs),X("fluidotherapy",()=>new Ks),X("dosage",()=>new Ms),X("converter",()=>new Cs),X("anesthesia",()=>new Rs),X("premium",()=>new Ys),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("[SW] OK",t)).catch(t=>console.log("[SW] ERROR",t))}),!(sessionStorage.getItem("vetcalc-splash-shown")==="true"))sessionStorage.setItem("vetcalc-splash-shown","true"),await K.navigate("splash");else{let t=K.resolveInitialRoute();!It.isLoggedIn()&&t!=="splash"&&t!=="login"&&t!=="register"&&(t="login"),await K.navigate(t)}}}new Ya().init();
