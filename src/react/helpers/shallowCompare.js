/**
 * Checks equality by iterating through keys on an object and returning false when any key has
 * values which are not strictly equal.
 *
 * @param object1 The first object to compare.
 * @param object2 The second object to compare.
 *
 * @returns {boolean} True when the objects pass a shallow compare, false when the objects fail a
 * shallow compare.
 */
export default function shallowCompare(object1, object2) {
  return (
    object1 &&
    object2 &&
    Object.keys(object1).length === Object.keys(object2).length &&
    Object.keys(object1).every(key => object1[key] === object2[key])
  );
}
