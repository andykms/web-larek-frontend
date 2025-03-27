import { List } from "../../types/components/base/List";

export abstract class ListWithIndexes<T> implements List<T> {
  items: Map<number, T> = new Map<number, T>();

  insert(item: T): number {
    const id = this.items.size;
    this.items.set(id, item);
    return id;
  }

  remove(id: number): T {
    const item = this.items.get(id);
    if (item) {
      this.items.delete(id);
      return item;
    }
    throw new Error(`Item with id ${id} not found`);
  }

  updateIndexes(): void {
      Array.from(this.items.values()).forEach((item, index) => {
        this.items.set(index, item);
      });
  }
}