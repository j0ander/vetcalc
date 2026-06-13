// ─── DosageService ────────────────────────────────────────────────────────────
// Implemented in Phase 2 – Month 1.

export interface DosageInputs {
  drugName: string
  dosePerKg: number        // mg/kg
  weightKg: number
  concentrationMgMl: number
}

export interface DosageResult {
  totalMg: number
  volumeMl: number
}

export class DosageService {
  calculate(_inputs: DosageInputs): DosageResult {
    throw new Error('DosageService.calculate not yet implemented')
  }
}

export const dosageService = new DosageService()