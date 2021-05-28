/**
 * Gets the type for values of object T.
 *
 * Similar to keyof but for retrieving the value type instead of the key type.
 */
type ValueType<T> = T[keyof T];

export default ValueType;
