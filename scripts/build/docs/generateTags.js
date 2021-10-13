const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semverSort = require('semver-sort');
const { argv } = require('yargs');

const generateTagList = require('./private/generateTagList');
const { taskRunner, taskRunnerReturns } = require('../../helpers');
const { succeed, fail } = taskRunnerReturns;

function generateTags() {
  return taskRunner(async () => {
    try {
      const tags = execSync('git tag')
        .toString()
        .split('\n')
        .filter(item => item.match(/((\d+)\.(\d+)\.(\d+))(\-?[0-9A-Za-z-\.]*)$/));

      const sortedTags = semverSort.desc(tags);
      const recentTags = generateTagList(sortedTags);

      recentTags.unshift('breaking-changes');

      if (argv.verbose) {
        recentTags.forEach(tag => {
          console.log(tag);
        });
      }

      const outputDirectory = path.join('dist', 'docs');
      const tagsJson = JSON.stringify(recentTags, null, 2);

      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
      }

      fs.writeFileSync(path.join(outputDirectory, 'tags.json'), tagsJson);

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = generateTags;
require('make-runnable/custom')({
  printOutputFrame: false,
});
