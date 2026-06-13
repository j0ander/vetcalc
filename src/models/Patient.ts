// src/models/Patient.ts
import type { Patient as PatientType, Species, PatientStatus } from '@/types'

export class Patient implements PatientType {
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
  
  constructor(data: Partial<PatientType>) {
    this.id = data.id || crypto.randomUUID()
    this.name = data.name || ''
    this.species = data.species || 'canine'
    this.breed = data.breed || ''
    this.weightKg = data.weightKg || 0
    this.ageMonths = data.ageMonths || 0
    this.ownerName = data.ownerName || ''
    this.status = data.status || 'stable'
    this.observations = data.observations || ''
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }
  
  getWeightInLbs(): number {
    return this.weightKg * 2.20462
  }
  
  getAgeInYears(): number {
    return this.ageMonths / 12
  }
  
  isCritical(): boolean {
    return this.status === 'critical' || this.status === 'in-surgery'
  }
}