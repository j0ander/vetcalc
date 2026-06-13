import type { AppRoute, NavItem, ModuleCard, VetTip } from '@/types'

// ─── App ──────────────────────────────────────────────────────────────────────

export const APP_NAME = 'VetCalc'
export const APP_VERSION = '1.0.0'
export const DB_NAME = 'vetcalc-db'
export const DB_VERSION = 1

// ─── Splash ───────────────────────────────────────────────────────────────────

export const SPLASH_DURATION_MS = 2800
export const SPLASH_MESSAGES = [
  'Calibrating Clinical Toolkit...',
  'Loading drug formularies...',
  'Preparing calculation engines...',
  'Almost ready...',
]

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { route: 'home', icon: 'home', label: 'Home' },
  { route: 'patients', icon: 'pets', label: 'Patients' },
  { route: 'library', icon: 'menu_book', label: 'Library' },
  { route: 'history', icon: 'history', label: 'History' },
]

// ─── Dashboard Module Cards ───────────────────────────────────────────────────

export const MODULE_CARDS: ModuleCard[] = [
  {
    route: 'fluidotherapy',
    icon: 'water_drop',
    title: 'Fluid Therapy',
    subtitle: 'IV rates & deficits',
    isPremium: false,
    iconBgClass: 'bg-secondary-container',
    iconColorClass: 'text-on-secondary-container',
  },
  {
    route: 'dosage',
    icon: 'medication',
    title: 'Dosage Calculator',
    subtitle: 'Mg/kg accurate dosing',
    isPremium: false,
    iconBgClass: 'bg-secondary-container',
    iconColorClass: 'text-on-secondary-container',
  },
  {
    route: 'anesthesia',
    icon: 'air',
    title: 'Anesthesia',
    subtitle: 'Protocols & CRI',
    isPremium: true,
    iconBgClass: 'bg-tertiary-fixed',
    iconColorClass: 'text-on-tertiary-fixed',
  },
  {
    route: 'converter',
    icon: 'sync_alt',
    title: 'Converter',
    subtitle: 'Weight, Temp, Vol',
    isPremium: false,
    iconBgClass: 'bg-secondary-container',
    iconColorClass: 'text-on-secondary-container',
  },
  {
    route: 'library',
    icon: 'menu_book',
    title: 'Library',
    subtitle: 'Reference guides',
    isPremium: false,
    iconBgClass: 'bg-surface-container-highest',
    iconColorClass: 'text-on-surface-variant',
  },
  {
    route: 'patients',
    icon: 'pets',
    title: 'Patients',
    subtitle: 'Active case files',
    isPremium: false,
    iconBgClass: 'bg-surface-container-highest',
    iconColorClass: 'text-on-surface-variant',
  },
]

// ─── Vet Tips ─────────────────────────────────────────────────────────────────

export const VET_TIPS: VetTip[] = [
  {
    id: 't1',
    text: 'Check hydration status before finalizing deficit fluid calculations.',
    category: 'fluid',
  },
  {
    id: 't2',
    text: 'Always verify drug concentration on the vial label before calculating volume.',
    category: 'dosage',
  },
  {
    id: 't3',
    text: 'ASA classification should be confirmed before initiating any anesthetic protocol.',
    category: 'anesthesia',
  },
  {
    id: 't4',
    text: 'Normal feline temperature range: 38.1–39.2 °C (100.5–102.5 °F).',
    category: 'general',
  },
  {
    id: 't5',
    text: 'For small animals, use a microdrip set (60 gtt/mL) for more precise fluid control.',
    category: 'fluid',
  },
  {
    id: 't6',
    text: 'Fasting before anesthesia: 6–8 h food, 2 h water for dogs; 4–6 h food for cats.',
    category: 'anesthesia',
  },
  {
    id: 't7',
    text: 'Always weigh the patient in kg just before drug calculations — estimates cause dosing errors.',
    category: 'dosage',
  },
  {
    id: 't8',
    text: 'Rehydrate before induction: hypotensive patients respond poorly to anesthetic agents.',
    category: 'anesthesia',
  },
]

// ─── Route Titles ─────────────────────────────────────────────────────────────

export const ROUTE_TITLES: Record<AppRoute, string> = {
  splash: 'VetCalc',
  home: 'VetCalc',
  patients: 'Patients',
  library: 'Library',
  history: 'History',
  fluidotherapy: 'Fluid Therapy',
  dosage: 'Dosage Calculator',
  converter: 'Converter',
  anesthesia: 'Anesthesia Protocol',
  premium: 'Go Pro',
}