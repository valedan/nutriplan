interface Orderable {
  order?: number | null;
}

export const sortByOrder = <T extends Orderable>(orderables: T[]): T[] =>
  orderables.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
