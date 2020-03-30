/**
 * Find all case-insensitive matches of a sub-string in a string and replace them with the
 * output of decorateFn. For example, if you wanted to italicize all instances of 'ca' in
 * 'Candy cane', you could:
 *
 * decorateSubStr('Candy cane', 'ca', (subStr) => (<i>{subStr}</i>));
 *
 * // => [<i>Ca</i>, 'ndy ', <i>ca</i>, 'ne'];
 */
export const decorateSubStr: <T>(
  str: string,
  searchStr: string,
  decorateFn: (str: string, key: string) => T,
) => string | Array<string | T>;

/**
 * Decorator function that can be used with decorateSubStr to bold matching
 * selections by wrapping them in a strong tag.
 */
export const boldMatch: (str: string, id: string) => React.Component;
