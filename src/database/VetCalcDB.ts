import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  email: string;
  password: string; // En demo texto plano, en producción usar hash
  isPremium: boolean;
  name: string;
  createdAt: Date;
}

export class VetCalcDB extends Dexie {
  users!: Table<User>;
  // tus otras tablas (pacientes, historial) ya existentes

  constructor() {
    super('VetCalcDB');
    this.version(2).stores({
      users: '++id, email, isPremium'
      // mantener las versiones anteriores de otras tablas
    });
  }
}

export const db = new VetCalcDB();