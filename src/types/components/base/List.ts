export interface List<T> {
  items: Map<number, T>;
  insert(item: T): number;
  remove(id: number): T;
  updateIndexes(): void;
}