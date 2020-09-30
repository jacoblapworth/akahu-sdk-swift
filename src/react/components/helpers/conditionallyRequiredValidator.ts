/**
 * Custom proptype validator that makes a prop required when a condition is met and allows an
 * expected type for the prop.
 *
 * @param {*} props List of props as provided by `prop-types`
 * @param {*} propName Name of the prop being validated as provided by `prop-types`
 * @param {*} componentName Name of the component being validated as provided by `prop-types`
 * @param {*} condition The condition that when true makes this prop required
 * @param {*} conditionName A name to help users identify the condition that makes this prop required
 * @param {*} propType The prop's expected `typeof` (e.g. "string", "function", "number", "object", etc.)
 */
const conditionallyRequiredValidator = (
  props: { [index: string]: unknown },
  propName: string,
  componentName: string,
  condition: boolean,
  conditionName: string,
  propType: string,
) => {
  // eslint-disable-next-line valid-typeof
  if (!condition && (typeof props[propName] === propType || props[propName] === undefined)) {
    return null;
  }

  if (props[propName] === undefined || props[propName] === null) {
    return new Error(
      `The prop \`${propName}\` is required by \`${componentName}\` when using \`${conditionName}\`, but its value is \`${props[propName]}\`.`,
    );
  }

  // eslint-disable-next-line valid-typeof
  if (typeof props[propName] !== propType) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof props[
        propName
      ]}\` supplied to \`${componentName}\`, expected \`${propType}\`.`,
    );
  }

  return null;
};

export default conditionallyRequiredValidator;
