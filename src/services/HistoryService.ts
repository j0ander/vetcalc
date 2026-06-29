import { db, type CalculationRecord } from '@/database/VetCalcDB';

export interface HistoryInput {
    type: string;
    patientId?: string;
    patientName?: string;
    patientSpecies?: string;
    patientWeightKg?: number;
    inputs: any;
    result: any;
    summary: string;
}

export async function saveToHistory(data: Omit<CalculationRecord, 'id' | 'createdAt'>): Promise<void> {
    const record: CalculationRecord = {
        ...data,
        createdAt: new Date()
    };
    await db.calculationHistory.add(record);
}

export async function getHistory(): Promise<CalculationRecord[]> {
    return await db.calculationHistory.toArray();
}

export async function getHistoryByType(type: string): Promise<CalculationRecord[]> {
    return await db.calculationHistory.where('type').equals(type).toArray();
}

export async function clearHistory(): Promise<void> {
    await db.calculationHistory.clear();
}