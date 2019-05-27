export const eventKeyValues = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  space: ' ',
  enter: 'Enter',
  escape: 'Escape',
  tab: 'Tab',
  backspace: 'Backspace',
};

const arrowKeys = [
  eventKeyValues.left,
  eventKeyValues.right,
  eventKeyValues.up,
  eventKeyValues.down,
];
const clickKeys = [eventKeyValues.space, eventKeyValues.enter];

/**
 * Based on the React SyntheticEvent's standard properties, determine whether a keyboard event matches any of a set of keys, as described in keyMap.
 *
 * @private
 * @param {SyntheticEvent} event
 * @param {Array} keysToCheck
 * @returns {boolean}
 */
export const matchOneOfKeys = (event, keysToCheck) => keysToCheck.indexOf(event.key) > -1;

/**
 * Is the keyboard event triggered by a directional arrow key
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyArrow = event => matchOneOfKeys(event, arrowKeys);

/**
 * Is the keyboard event from a spacebar or enter press
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyClick = event => matchOneOfKeys(event, clickKeys);

/**
 * Is the keyboard event from a spacebar
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeySpacebar = event => event.key === eventKeyValues.space;

/**
 * Is the keyboard event a press of the Tab with shift held.
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyShiftTab = event => event.key === eventKeyValues.tab && event.shiftKey;
