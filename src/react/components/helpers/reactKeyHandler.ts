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
  shift: 'Shift',
  meta: 'Meta',
  control: 'Control',
  alt: 'Alt',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End',
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
export const matchOneOfKeys = (event: React.KeyboardEvent, keysToCheck: string[]) =>
  keysToCheck.indexOf(event.key) > -1;
/**
 * Is the keyboard event triggered by a directional arrow key
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyArrow = (event: React.KeyboardEvent) => matchOneOfKeys(event, arrowKeys);

/**
 * Is the keyboard event from a spacebar or enter press
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyClick = (event: React.KeyboardEvent) => matchOneOfKeys(event, clickKeys);

/**
 * Is the keyboard event from a spacebar
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeySpacebar = (event: React.KeyboardEvent) => event.key === eventKeyValues.space;

/**
 * Is the keyboard event a press of the Tab with shift held.
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyShiftTab = (event: React.KeyboardEvent) =>
  event.key === eventKeyValues.tab && event.shiftKey;

/**
 * Is the keyboard event from a functional key (tab, enter, escape, backspace, shift, control, alt or meta).
 *
 * @export
 * @param {SyntheticEvent} event
 * @returns {boolean}
 */
export const isKeyFunctional = (event: React.KeyboardEvent) =>
  matchOneOfKeys(event, [
    eventKeyValues.tab,
    eventKeyValues.enter,
    eventKeyValues.escape,
    eventKeyValues.backspace,
    eventKeyValues.shift,
    eventKeyValues.control,
    eventKeyValues.alt,
    eventKeyValues.meta,
  ]);
