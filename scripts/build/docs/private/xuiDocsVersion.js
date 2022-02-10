/**
 * Determines the folder name for this docs build based on the version in `package.json`.
 *
 * @returns The version of XUI to build the docs for (x.x.x[-(alpha|beta).x])
 */
function getXuiDocsVersion() {
  // eslint-disable-next-line global-require
  return require('../../../../package.json').version;
}

module.exports = getXuiDocsVersion();
