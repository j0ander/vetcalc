import { db } from '@/database/VetCalcDB';
export class CalculationHistoryRepository {
    async findById(id) {
        return db.calculationHistory.get(id);
    }
    async findAll() {
        return db.calculationHistory.orderBy('createdAt').reverse().toArray();
    }
    async findRecent(limit = 10) {
        return db.calculationHistory.orderBy('createdAt').reverse().limit(limit).toArray();
    }
    async findByType(type) {
        return db.calculationHistory.where('type').equals(type).reverse().sortBy('createdAt');
    }
    async findByPatient(patientId) {
        return db.calculationHistory.where('patientId').equals(patientId).reverse().sortBy('createdAt');
    }
    async save(record) {
        await db.calculationHistory.put(record);
        return record.id;
    }
    async delete(id) {
        await db.calculationHistory.delete(id);
    }
    async count() {
        return db.calculationHistory.count();
    }
    async countToday() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        return db.calculationHistory
            .where('createdAt')
            .aboveOrEqual(startOfDay)
            .count();
    }
}
export const calculationHistoryRepository = new CalculationHistoryRepository();
