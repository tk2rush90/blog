/**
 * remove array item from array
 * it returns new array without removed item
 * @param array base array
 * @param item item to remove
 */
export function removeArrayItem<T>(array: T[], item: T): T[] {
  return array.filter(i => i !== item);
}

/**
 * splice array item from array
 * it returns spliced index
 * @param array base array
 * @param item item to splice
 */
export function spliceArrayItem<T>(array: T[], item: T): number {
  const i = array.indexOf(item);

  if (i !== -1) {
    array.splice(i, 1);
  }

  return i;
}
