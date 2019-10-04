const flagDefinitions = {
  sunsetting: {
    label: 'Sunsetting',
    desc:
      'This feature will be removed in the next major release. Not recommended for development.',
  },
  updatesComing: {
    label: 'Updates coming',
    desc:
      'Significant changes related to this feature are likely to be included in the next major release.',
  },
  wip: {
    label: 'Work in progress',
    desc: 'Subject to breaking changes at any time, including patch and minor releases.',
  },
  new: {
    label: 'New',
    desc: 'This feature was added since the prior major version.',
  },
  updated: {
    label: 'Updated',
    desc: 'This feature was significantly changed since the prior major version.',
  },
  reactOnly: {
    label: 'React only',
    desc: 'This feature relies on React and will be difficult to accomplish with CSS alone.',
  },
};

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
