// Select the responsive options that are most appropriate to the current x-axis label width.
const getResponsiveOptions = (options, params) => {
  const { labelWidth } = params;
  const keys = Object.keys(options);
  const key = keys.reduce(
    (acc, option) => (labelWidth > parseInt(option, 10) ? option : acc),
    keys[0],
  );

  return options[key](params);
};

export default getResponsiveOptions;
