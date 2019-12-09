const chalk = require('chalk');

module.exports = async (page, scenario, vp) => {
  const originalLogMethod = console.log;
  const ignoredMessages = ['JSHandle', 'Close Browser'];

  console.log = (...messages) => {
    if (messages[0] && messages[0].includes('Close Browser')) {
      global.backstopProgress = {
        ...global.backstopProgress,
        completed: global.backstopProgress.completed + 1,
      };

      const { completed, total } = global.backstopProgress;

      const incompleteCharacter = chalk.gray('█');
      const completeCharacter = chalk.green('█');
      const width = 50;

      const progressBar = [...Array(width).keys()]
        .map(i => (i / width < completed / total ? completeCharacter : incompleteCharacter))
        .join('');

      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${progressBar} ${completed}/${total} tests completed`);
      if (completed === total) {
        console.log();
      }
    }

    messages[0] && ignoredMessages.some(ignore => messages[0].includes(ignore))
      ? undefined
      : originalLogMethod(...messages);
  };
};
