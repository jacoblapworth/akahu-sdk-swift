const NUMBER_OF_MAJORS_TO_INCLUDE = 3;
const LAST_MAJOR_TO_INCLUDE_MINORS = 18;
const NUMBER_OF_MAJORS_TO_INCLUDE_PRERELEASES = 2;

/**
 * If the version should appear in the list or not
 * @param {number} newestMajor - Most recent major version
 * @param {number} majorVersion - Major version from the passed-in tag
 * @param {object} majorVersionsCollected - Accumulator for minor versions
 * @param {string} prerelease - Prerelease version from the passed-in tag (alpha, beta, etc.)
 * @returns {boolean}
 */
const shouldExcludeThisVersion = (
  newestMajor,
  majorVersion,
  majorVersionsCollected,
  prerelease,
) => {
  const majorVersionsBehind = newestMajor - majorVersion;

  const excludeThisMajor = majorVersionsBehind > NUMBER_OF_MAJORS_TO_INCLUDE;
  const excludeThisMinor =
    majorVersion !== LAST_MAJOR_TO_INCLUDE_MINORS && majorVersionsCollected[majorVersion];
  const excludeThisPrerelease =
    !!prerelease && majorVersionsBehind >= NUMBER_OF_MAJORS_TO_INCLUDE_PRERELEASES;

  return excludeThisMajor || excludeThisMinor || excludeThisPrerelease;
};

module.exports = shouldExcludeThisVersion;
