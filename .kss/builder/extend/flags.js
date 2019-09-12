const flagDefinitions = {
  sunsetting: {
    label: 'Sunsetting',
    desc:
      'This component will be removed in a future major release. Not recommended for development.',
  },
  updatesComing: {
    label: 'Updates coming',
    desc:
      'Significant changes related to this component are likely to be included in the next major release.',
  },
  wip: {
    label: 'Work in progress',
    desc: 'Subject to breaking changes at any time, including patch and minor releases.',
  },
  new: {
    label: 'New',
    desc: 'This component was added since the prior major version.',
  },
  updated: {
    label: 'Updated',
    desc: 'This component was significantly changed since the prior major version.',
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

module.exports = function(handlebars) {
  handlebars.registerHelper('renderFlags', renderFlags);
};