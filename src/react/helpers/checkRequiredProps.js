import PropTypes from 'prop-types';

/**
 * Custom propType validator for checking if a prop is offered when the corresponding `basedProp` is `true`.
 *
 * @param {String} value The name of the corresponding basedProp for checking.
 * @param {String} value The prop type.
 * @param  {...any} parameters All parameters supplied by propTypes.
 */
const checkRequiredProps = (basedProp, propType, ...parameters) => {
  const [props, propName] = parameters;
  if (props[basedProp]) {
    if (props[propName]) {
      PropTypes.checkPropTypes(propType, props[propName]);
    } else {
      return new Error(`${propName} is required when ${basedProp} is true.`);
    }
  }
  return null;
};

export default checkRequiredProps;
