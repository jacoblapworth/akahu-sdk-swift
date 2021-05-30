/**
 * Element does not exist during server side rendering.
 *
 * When using Element for propTypes this isn't an issue so we can safely mock it.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default typeof Element !== 'undefined' ? Element : () => {};
