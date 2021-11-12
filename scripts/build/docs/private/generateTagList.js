const parseSemver = require('./parseSemver');
const shouldExcludeThisVersion = require('./shouldExcludeThisVersion');

/**
 * Generate list of versions we want to see in the version selector
 * @param {array} allTags - Unfiltered version tags in descending order
 * @returns {array}
 */
const generateTagList = allTags => {
  let newestMajor;
  const majorVersionsCollected = {};

  return allTags.reduce((tags, tag) => {
    const { majorVersion, prerelease } = parseSemver(tag);

    if (newestMajor == null || (newestMajor > majorVersion && prerelease == null)) {
      newestMajor = majorVersion;
    }

    if (
      newestMajor != null &&
      shouldExcludeThisVersion(newestMajor, majorVersion, majorVersionsCollected, prerelease)
    ) {
      return tags;
    }

    majorVersionsCollected[majorVersion] = true;
    tags.push(tag);
    return tags;
  }, []);
};

module.exports = generateTagList;
