/**
 * `doAsync` will call the provided callback just before the next repaint.
 *
 * Wrapping a sequence of expensive calculations in `doAsync` will allow the UI to continue
 * updating.
 *
 * e.g.
 * ```
 * await doAsync(() => expensiveCalculation());
 * await doAsync(() => expensiveCalculation2());
 * ```
 * @param {function} callback The function to call asynchronously
 */
export default function doAsync<T>(callback: () => T, useAnimationFrame = true): Promise<T> {
  /**
   * Using requestAnimationFrame instead of setTimeout allows us to ensure only one `doAsync` is
   * called each frame.
   */
  const asyncMethod = useAnimationFrame ? requestAnimationFrame : setTimeout;
  return new Promise(resolve => asyncMethod(() => resolve(callback())));
}
