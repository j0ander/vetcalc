// src/database/VetCalcDB.ts
import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  email: string;
  password: string;
  isPremium: boolean;
  name: string;
  createdAt: Date;
}

export interface Patient {
  id?: number;
  name: string;
  species: string;
  breed: string;
  weightKg: number;
  ageMonths: number;
  ownerName: string;
  status: string;
  observations: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalculationRecord {
  id?: number;
  type: string; // 'dosage', 'fluidotherapy', 'anesthesia', 'converter'
  patientId?: string;
  patientName?: string;
  patientSpecies?: string;
  patientWeightKg?: number;
  inputs: any;
  result: any;
  summary: string;
  createdAt: Date;
}

export interface Appointment {
  id?: number;
  petName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  description: string;
  createdAt: Date;
}

export class VetCalcDB extends Dexie {
  users!: Table<User>;
  patients!: Table<Patient>;
  calculationHistory!: Table<CalculationRecord>;
  appointments!: Table<Appointment>;

  constructor() {
    super('VetCalcDB');
    this.version(50).stores({
      users: '++id, email, isPremium',
      patients: '++id, name, species, ownerName',
      calculationHistory: '++id, type, patientId, createdAt',
      appointments: '++id, petName, date, time, createdAt'
    });
  }
}

export const db = new VetCalcDB();