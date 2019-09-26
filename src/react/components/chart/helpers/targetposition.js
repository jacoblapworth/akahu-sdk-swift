const getTargetValueThunk = event => reference => {
  let value;

  try {
    ({ value } = event.target[reference].baseVal);
  } catch (e) {
    value = 0;
  }

  return value;
};

const getTargetPosition = event => {
  const getValue = getTargetValueThunk(event);
  const left = getValue('x');
  const top = getValue('y');
  const height = getValue('height');
  const width = getValue('width');

  return {
    left,
    top,
    width,
    height,
  };
};

export default getTargetPosition;
