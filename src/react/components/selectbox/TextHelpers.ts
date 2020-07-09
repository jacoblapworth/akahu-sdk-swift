/**
 * Sort multiple selections into best order for display. Put the shortest length strings
 * first so that we can show items in the display text in as many situations as we
 * possibly can.
 *
 * @private
 * @param  {*} a item to compare
 * @param  {*} b second item to compare
 * @return {Number}   Value used by javaScript's native sort to determine order for items a, b
 */
function compareValuesByLength(a: string, b: string): number {
  // By length of stings
  if (a.length < b.length) {
    return -1;
  }
  if (a.length > b.length) {
    return 1;
  }

  // Alphabetically if comparing two strings of same length
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  }

  // Otherwise compare size of numbers
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  // Default
  return 0;
}

/**
 * If the select box has multiple selections, determine the appropriate string to display
 *
 * @private
 * @param  {String[]} values
 * @return {String}
 */
function createMultipleSelectionText(values: string[]): string {
  return values.sort(compareValuesByLength).join(', ');
}

/**
 * determine the value displayed as button content for dropdown
 *
 * @public
 * @param  {String | Array} value to display or array of values
 * @param {String} placeholder
 * @return {String}
 */
function getText(value: string | string[], placeholder: string): string {
  let text;
  if (Array.isArray(value)) {
    if (value.length > 1) {
      text = createMultipleSelectionText(value);
    } else {
      text = value[0];
    }
  } else {
    text = value;
  }

  return text || placeholder || '';
}

export default {
  getText,
};
