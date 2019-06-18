const classMap = {};

const headingSizeMap = {
  xsmall: 'small',
  small: 'medium',
  medium: 'large',
  large: 'xlarge',
};

Object.keys(headingSizeMap).forEach(size => {
  classMap[`xui-heading-${size}`] = `xui-heading-${headingSizeMap[size]}`;
});

module.exports = classMap;
