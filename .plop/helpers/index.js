// Lower case, no spaces, e.g. ‘displayname’
const pathCase = displayName =>
  displayName
    .split(/[\s-]+/)
    .join('')
    .toLowerCase();

// ‘XUI case’, e.g. ‘XUIDisplayName’
const xuiCase = displayName => {
  const splitDisplayName = displayName.split(/[\s-]+/);
  const splitFileName = splitDisplayName.map(
    displayNamePart => displayNamePart[0].toUpperCase() + displayNamePart.substr(1).toLowerCase(),
  );

  return `XUI${splitFileName.join('')}`;
};

module.exports = { pathCase, xuiCase };
