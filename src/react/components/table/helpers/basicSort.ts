function basicSort<Items extends Array<Record<string, unknown>>>(
  items: Items,
  isAscending?: boolean,
  activeSortKey?: string,
): Items {
  const sortedItems = items.sort((a, b) =>
    String(a[activeSortKey]).localeCompare(String(b[activeSortKey])),
  );
  if (isAscending) {
    return sortedItems;
  }
  return sortedItems.reverse() as Items;
}

export default basicSort;
