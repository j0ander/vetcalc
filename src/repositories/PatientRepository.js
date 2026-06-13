import { db } from '@/database/VetCalcDB';
export class PatientRepository {
    async findById(id) {
        return db.patients.get(id);
    }
    async findAll() {
        return db.patients.orderBy('updatedAt').reverse().toArray();
    }
    async findByStatus(status) {
        return db.patients.where('status').equals(status).toArray();
    }
    async findRecent(limit = 5) {
        return db.patients.orderBy('updatedAt').reverse().limit(limit).toArray();
    }
    async save(patient) {
        await db.patients.put(patient);
        return patient.id;
    }
    async delete(id) {
        await db.patients.delete(id);
    }
    async count() {
        return db.patients.count();
    }
    async countByStatus(status) {
        return db.patients.where('status').equals(status).count();
    }
}
export const patientRepository = new PatientRepository();
