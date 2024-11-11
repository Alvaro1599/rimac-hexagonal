export interface Repository<T> {
  save(entity: T): Promise<T>
}
