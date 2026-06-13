import Dexie, { type Table } from 'dexie'
import type { Patient, CalculationRecord } from '@/types'
import { DB_NAME, DB_VERSION } from '@/constants'

// ─── VetCalc Database ─────────────────────────────────────────────────────────
// Schema prepared for all future modules.
// Only patients + calculationHistory are needed for MVP; add tables per phase.

export class VetCalcDB extends Dexie {
  patients!: Table<Patient, string>
  calculationHistory!: Table<CalculationRecord, string>

  constructor() {
    super(DB_NAME)

    this.version(DB_VERSION).stores({
      // Primary key + indexed fields
      patients: 'id, name, species, status, createdAt, updatedAt',
      calculationHistory: 'id, type, patientId, createdAt',
    })
  }
}

// Singleton instance
export const db = new VetCalcDB()