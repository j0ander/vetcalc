// src/models/CalculationHistory.ts
import type { CalculationRecord, CalculationType, Species } from '@/types'

export class CalculationHistory implements CalculationRecord {
  id: string
  type: CalculationType
  patientId?: string
  patientName?: string
  patientSpecies?: Species
  patientWeightKg?: number
  inputs: Record<string, unknown>
  result: Record<string, unknown>
  summary: string
  createdAt: Date
  
  constructor(data: Partial<CalculationRecord>) {
    this.id = data.id || crypto.randomUUID()
    this.type = data.type || 'dosage'
    this.patientId = data.patientId
    this.patientName = data.patientName
    this.patientSpecies = data.patientSpecies
    this.patientWeightKg = data.patientWeightKg
    this.inputs = data.inputs || {}
    this.result = data.result || {}
    this.summary = data.summary || ''
    this.createdAt = data.createdAt || new Date()
  }
  
  getFormattedDate(): string {
    return this.createdAt.toLocaleDateString()
  }
  
  getRelativeTime(): string {
    const now = new Date()
    const diffMs = now.getTime() - this.createdAt.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    return `${diffDays} days ago`
  }
}