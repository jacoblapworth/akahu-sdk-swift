/**
 * Simple predicated used to determine if the ListBox's root DOM node can actually be focused.
 *
 * @public
 * @param {HTMLElement} node
 *
 * @returns {boolean}
 */
export const isVisible = node => node && window.getComputedStyle(node).visibility !== 'hidden';

/**
 * Attempts to run the passed predicate, if successful it will run the callback method and clear.
 * If unsuccessful, it will run several times over five seconds. If it's still unsuccessful after
 * that it will try again several times over a half second. If it's still not successful it will
 * stop trying.
 *
 * @public
 * @param {Function} predicate
 * @param {Function} callback
 */
export const intervalRunner = (predicate, callback) => {
  if (predicate()) {
    callback();
  } else {
    let counter = 0;
    let interval = 0;
    const maxCount = 5;
    const delay = 100;
    const checker = () => {
      const check = predicate();
      if (check) {
        callback();
      }
      if (check || counter > maxCount) {
        clearInterval(interval);
      }
      counter += 1;
    };

    interval = setInterval(checker, delay);
  }
};
