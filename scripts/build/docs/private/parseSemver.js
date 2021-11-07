/**
 * Break apart a semver string into chunks we can do things with
 * @param {string} tag - A version tag
 * @returns {object}
 */
const parseSemver = tag => {
  const result = /((\d+)\.(\d+)\.(\d+))(\-?[0-9A-Za-z-\.]*)$/.exec(tag);

  return {
    majorVersion: (result && parseInt(result[2])) || 0,
    minorVersion: (result && parseInt(result[3])) || 0,
    patchVersion: (result && parseInt(result[4])) || 0,
    prerelease: result && result[5].substring(1),
    versionWithoutPrerelease: result && result[1],
  };
};

module.exports = parseSemver;
