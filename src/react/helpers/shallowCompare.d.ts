/**
 * Checks equality by iterating through keys on an object and returning false when any key has
 * values which are not strictly equal.
 *
 * @param object1 The first object to compare.
 * @param object2 The second object to compare.
 *
 * @returns True when the objects pass a shallow compare, false when the objects fail a
 * shallow compare.
 */
export default function shallowCompare(
  object1?: { [index: string]: unknown },
  object2?: { [index: string]: unknown },
): boolean;
