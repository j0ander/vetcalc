// ─── Routes ───────────────────────────────────────────────────────────────────

export type AppRoute =
  | 'splash'
  | 'home'
  | 'patients'
  | 'library'
  | 'history'
  | 'fluidotherapy'
  | 'dosage'
  | 'converter'
  | 'anesthesia'
  | 'premium'
  | 'login'
  | 'register';
// ─── Patient ──────────────────────────────────────────────────────────────────

export type Species = 'canine' | 'feline' | 'equine' | 'bovine' | 'avian' | 'exotic'

export type PatientStatus = 'stable' | 'in-surgery' | 'critical' | 'discharged' | 'observation'

export interface Patient {
  id: string
  name: string
  species: Species
  breed: string
  weightKg: number
  ageMonths: number
  ownerName: string
  status: PatientStatus
  observations: string
  createdAt: Date
  updatedAt: Date
}

// ─── Calculation History ──────────────────────────────────────────────────────

export type CalculationType =
  | 'fluidotherapy'
  | 'dosage'
  | 'converter'
  | 'anesthesia'

export interface CalculationRecord {
  id: string
  type: CalculationType
  patientId?: string
  patientName?: string
  patientSpecies?: Species
  patientWeightKg?: number
  inputs: Record<string, unknown>
  result: Record<string, unknown>
  summary: string
  createdAt: Date
}

// ─── App State ────────────────────────────────────────────────────────────────

export interface AppState {
  isOnline: boolean
  isReady: boolean
  currentRoute: AppRoute
  previousRoute: AppRoute | null
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  route: AppRoute
  icon: string
  label: string
  isPremium?: boolean
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  activeCases: number
  inSurgery: number
  todayCalculations: number
}

export interface VetTip {
  id: string
  text: string
  category: 'fluid' | 'dosage' | 'anesthesia' | 'general'
}

// ─── Module Card ──────────────────────────────────────────────────────────────

export interface ModuleCard {
  route: AppRoute
  icon: string
  title: string
  subtitle: string
  isPremium: boolean
  iconBgClass: string
  iconColorClass: string
}