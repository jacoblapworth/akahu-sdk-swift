const { execSync } = require('child_process');

/**
 * Determines the folder name for this docs build based on the branch name for breaking-changes or
 * the version in package.json for everything else.
 *
 * @returns The version of XUI to build the docs for (x.x.x or breaking-changes)
 */
function getXuiDocsVersion() {
  let xuiDocsVersion = require('../../../../package.json').version;

  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

    if (branch === 'breaking-changes') {
      xuiDocsVersion = branch;
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  return xuiDocsVersion;
}

module.exports = getXuiDocsVersion();
