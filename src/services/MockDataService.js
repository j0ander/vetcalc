// ─── Mock Patients ────────────────────────────────────────────────────────────
export const MOCK_PATIENTS = [
    {
        id: 'p-001',
        name: 'Buddy',
        species: 'canine',
        breed: 'Golden Retriever',
        weightKg: 28.5,
        ageMonths: 36,
        ownerName: 'Sarah Connor',
        status: 'stable',
        observations: 'Post-op check; recovering well from orthopaedic surgery.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
        id: 'p-002',
        name: 'Luna',
        species: 'feline',
        breed: 'Siamese Mix',
        weightKg: 4.2,
        ageMonths: 18,
        ownerName: 'James Carter',
        status: 'in-surgery',
        observations: 'Ovariohysterectomy in progress.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
        id: 'p-003',
        name: 'Max',
        species: 'canine',
        breed: 'Beagle',
        weightKg: 11.3,
        ageMonths: 60,
        ownerName: 'Maria López',
        status: 'discharged',
        observations: 'Discharged post dental prophylaxis.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
        id: 'p-004',
        name: 'Bella',
        species: 'canine',
        breed: 'Pomeranian',
        weightKg: 3.1,
        ageMonths: 14,
        ownerName: 'Tom Baker',
        status: 'stable',
        observations: 'Follow-up vaccination and weight check.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        updatedAt: new Date(Date.now() - 1000 * 60 * 45),
    },
];
// ─── Mock History ─────────────────────────────────────────────────────────────
export const MOCK_HISTORY = [
    {
        id: 'h-001',
        type: 'dosage',
        patientId: 'p-001',
        patientName: 'Bella',
        patientSpecies: 'canine',
        patientWeightKg: 12.4,
        inputs: { drug: 'Amoxicilina', dosePerKg: 10, weightKg: 12.4, concentrationMgMl: 50 },
        result: { totalMg: 124, volumeMl: 2.48 },
        summary: 'Amoxicilina — 124 mg · 2.48 mL',
        createdAt: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
        id: 'h-002',
        type: 'fluidotherapy',
        patientId: 'p-002',
        patientName: 'Oliver',
        patientSpecies: 'feline',
        patientWeightKg: 4.5,
        inputs: { weightKg: 4.5, dehydrationPct: 5, maintenanceMlKgDay: 40, lossesMlDay: 0, dripFactor: 15, hours: 24 },
        result: { deficitMl: 225, maintenanceMl: 180, totalMl: 405, mlPerHour: 16.9, dropsPerMin: 4 },
        summary: 'Fluidoterapia LRS — 16.9 mL/h',
        createdAt: new Date(Date.now() - 1000 * 60 * 300),
    },
    {
        id: 'h-003',
        type: 'anesthesia',
        patientId: 'p-003',
        patientName: 'Max',
        patientSpecies: 'equine',
        patientWeightKg: 450,
        inputs: { drug: 'Fentanyl', doseUgKgHr: 3, weightKg: 450 },
        result: { totalUgHr: 1350, mlHr: 2.7 },
        summary: 'CRI Fentanyl — 3 μg/kg/hr',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22),
    },
    {
        id: 'h-004',
        type: 'dosage',
        patientId: 'p-002',
        patientName: 'Luna',
        patientSpecies: 'canine',
        patientWeightKg: 8.9,
        inputs: { drug: 'Propofol', dosePerKg: 4, weightKg: 8.9, concentrationMgMl: 10 },
        result: { totalMg: 35.6, volumeMl: 3.56 },
        summary: 'Propofol Induction — 35.6 mg · 3.56 mL',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
    },
    {
        id: 'h-005',
        type: 'dosage',
        patientId: 'p-004',
        patientName: 'Bear',
        patientSpecies: 'canine',
        patientWeightKg: 25,
        inputs: { drug: '50% Dextrose', dosePerKg: 0.5, weightKg: 25, concentrationMgMl: 500 },
        result: { totalMg: 12500, volumeMl: 12.5 },
        summary: 'Glucose Supplement — 50% Dextrose 12.5 mL',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 27),
    },
];
// ─── Mock Stats ───────────────────────────────────────────────────────────────
export const MOCK_STATS = {
    activeCases: 24,
    inSurgery: 3,
    todayCalculations: 7,
};
// ─── MockDataService ──────────────────────────────────────────────────────────
export class MockDataService {
    getRecentPatients(limit = 4) {
        return MOCK_PATIENTS.slice(0, limit);
    }
    getRecentHistory(limit = 5) {
        return MOCK_HISTORY.slice(0, limit);
    }
    getDashboardStats() {
        return { ...MOCK_STATS };
    }
}
export const mockDataService = new MockDataService();
