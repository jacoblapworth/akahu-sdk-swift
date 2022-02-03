import { version as xuiDocsVersion } from '../../../../package.json';

/**
 * Determines the folder name for this docs build based on the version in `package.json`.
 *
 * @returns The version of XUI to build the docs for (x.x.x[-(alpha|beta).x])
 */
function getXuiDocsVersion() {
  return xuiDocsVersion;
}

module.exports = getXuiDocsVersion();
