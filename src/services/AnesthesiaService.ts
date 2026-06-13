// ─── AnesthesiaService ────────────────────────────────────────────────────────
// Implemented in Phase 2 – Month 2 (Premium).

export interface AnesthesiaInputs {
  weightKg: number
  asaClass: 1 | 2 | 3 | 4 | 5
  drugs: Array<{ name: string; dosePerKg: number; concentrationMgMl: number }>
}

export interface AnesthesiaResult {
  preMedications: Array<{ drug: string; totalMg: number; volumeMl: number }>
  inductionAgent: { drug: string; totalMg: number; volumeMl: number } | null
  maintenance: { agent: string; pctRange: string }
  oxygenFlowInduction: number
  oxygenFlowMaintenance: number
  estimatedFluidsMlHr: number
}

export class AnesthesiaService {
  calculate(_inputs: AnesthesiaInputs): AnesthesiaResult {
    throw new Error('AnesthesiaService.calculate not yet implemented – Premium feature')
  }
}

export const anesthesiaService = new AnesthesiaService()