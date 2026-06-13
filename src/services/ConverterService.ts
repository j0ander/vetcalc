// ─── ConverterService ─────────────────────────────────────────────────────────
// Implemented in Phase 2 – Month 1.

export type ConversionMode = 'weight' | 'temperature' | 'volume' | 'mass'

export class ConverterService {
  convert(_value: number, _mode: ConversionMode, _direction: 'forward' | 'reverse'): number {
    throw new Error('ConverterService.convert not yet implemented')
  }
}

export const converterService = new ConverterService()