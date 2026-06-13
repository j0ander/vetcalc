import Dexie from 'dexie';
import { DB_NAME, DB_VERSION } from '@/constants';
// ─── VetCalc Database ─────────────────────────────────────────────────────────
// Schema prepared for all future modules.
// Only patients + calculationHistory are needed for MVP; add tables per phase.
export class VetCalcDB extends Dexie {
    constructor() {
        super(DB_NAME);
        Object.defineProperty(this, "patients", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "calculationHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.version(DB_VERSION).stores({
            // Primary key + indexed fields
            patients: 'id, name, species, status, createdAt, updatedAt',
            calculationHistory: 'id, type, patientId, createdAt',
        });
    }
}
// Singleton instance
export const db = new VetCalcDB();
