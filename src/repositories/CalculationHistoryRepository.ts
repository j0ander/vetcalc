import { db } from '@/database/VetCalcDB'
import type { CalculationRecord, CalculationType } from '@/types'
import type { IRepository } from './BaseRepository'

export class CalculationHistoryRepository implements IRepository<CalculationRecord> {
  async findById(id: string): Promise<CalculationRecord | undefined> {
    return db.calculationHistory.get(id)
  }

  async findAll(): Promise<CalculationRecord[]> {
    return db.calculationHistory.orderBy('createdAt').reverse().toArray()
  }

  async findRecent(limit = 10): Promise<CalculationRecord[]> {
    return db.calculationHistory.orderBy('createdAt').reverse().limit(limit).toArray()
  }

  async findByType(type: CalculationType): Promise<CalculationRecord[]> {
    return db.calculationHistory.where('type').equals(type).reverse().sortBy('createdAt')
  }

  async findByPatient(patientId: string): Promise<CalculationRecord[]> {
    return db.calculationHistory.where('patientId').equals(patientId).reverse().sortBy('createdAt')
  }

  async save(record: CalculationRecord): Promise<string> {
    await db.calculationHistory.put(record)
    return record.id
  }

  async delete(id: string): Promise<void> {
    await db.calculationHistory.delete(id)
  }

  async count(): Promise<number> {
    return db.calculationHistory.count()
  }

  async countToday(): Promise<number> {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    return db.calculationHistory
      .where('createdAt')
      .aboveOrEqual(startOfDay)
      .count()
  }
}

export const calculationHistoryRepository = new CalculationHistoryRepository()