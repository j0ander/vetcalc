// ─── FluidotherapyService ─────────────────────────────────────────────────────
// Implemented in Phase 2 – Month 1.

export interface FluidotherapyInputs {
  species: string
  weightKg: number
  dehydrationPct: number   // 0–15
  maintenanceMlKgDay: number
  lossesMlDay: number
  dripFactor: 10 | 15 | 60
  treatmentHours: number
}

export interface FluidotherapyResult {
  deficitMl: number
  maintenanceMl: number
  totalMl: number
  mlPerHour: number
  dropsPerMin: number
}

export class FluidotherapyService {
  calculate(_inputs: FluidotherapyInputs): FluidotherapyResult {
    throw new Error('FluidotherapyService.calculate not yet implemented')
  }
}

export const fluidotherapyService = new FluidotherapyService()