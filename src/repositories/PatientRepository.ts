import { db } from '@/database/VetCalcDB'
import type { Patient, PatientStatus } from '@/types'
import type { IRepository } from './BaseRepository'

export class PatientRepository implements IRepository<Patient> {
  async findById(id: string): Promise<Patient | undefined> {
    return db.patients.get(id)
  }

  async findAll(): Promise<Patient[]> {
    return db.patients.orderBy('updatedAt').reverse().toArray()
  }

  async findByStatus(status: PatientStatus): Promise<Patient[]> {
    return db.patients.where('status').equals(status).toArray()
  }

  async findRecent(limit = 5): Promise<Patient[]> {
    return db.patients.orderBy('updatedAt').reverse().limit(limit).toArray()
  }

  async save(patient: Patient): Promise<string> {
    await db.patients.put(patient)
    return patient.id
  }

  async delete(id: string): Promise<void> {
    await db.patients.delete(id)
  }

  async count(): Promise<number> {
    return db.patients.count()
  }

  async countByStatus(status: PatientStatus): Promise<number> {
    return db.patients.where('status').equals(status).count()
  }
}

export const patientRepository = new PatientRepository()