var flagDefinitions = require('/src/react/helpers/flagDefinitions');

const renderFlags = (data, block) => {
  const flags = data.split(' ');
  let newBlock = '';

  if (!flagDefinitions[flags[0]] && !flagDefinitions[flags[0].toLowerCase()]) {
    // If the flag content starts out with something unmatched,
    // assume the whole thing is non-standard, and just toss it in a label.
    this.flag = {
      label: data,
    };
    newBlock += block.fn(this);
  } else {
    flags.forEach(flag => {
      const lowerCaseFlag = flag.toLowerCase();
      const flagDetails = flagDefinitions[flag] || flagDefinitions[lowerCaseFlag];
      if (!flagDetails) {
        return; // If we find a non-listed flag somewhere in the middle of the set, skip it.
      }
      this.flag = {
        shortName: lowerCaseFlag,
        ...flagDetails,
      };
      newBlock += block.fn(this);
    });
  }
  return newBlock;
};

const renderFlagDefs = block => {
  let newBlock = '';

  for (let flag in flagDefinitions) {
    this.definition = {
      dt: flagDefinitions[flag].label,
      dd: flagDefinitions[flag].desc,
    };
    newBlock += block.fn(this);
  }
  return newBlock;
};

module.exports = function(handlebars) {
  handlebars.registerHelper('renderFlags', renderFlags);
  handlebars.registerHelper('renderFlagDefs', renderFlagDefs);
};
