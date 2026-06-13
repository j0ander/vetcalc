// ─── BaseRepository ───────────────────────────────────────────────────────────
// Generic CRUD contract – all concrete repos implement this.

export interface IRepository<T, TKey = string> {
  findById(id: TKey): Promise<T | undefined>
  findAll(): Promise<T[]>
  save(entity: T): Promise<TKey>
  delete(id: TKey): Promise<void>
  count(): Promise<number>
}