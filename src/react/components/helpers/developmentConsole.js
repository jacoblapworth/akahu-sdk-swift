import flagDefinitions from './../../../../.kss/builder/extend/flagDefinitions';

// These functions will log a warning or an error to the browser console,
// when in a dev environment. Pass them the name of the logging component
// plus a flagType (defined in the Guide), a message string, or both.

export const logWarning = ({ componentName, flagType, message }) => {
  if (process.env.NODE_ENV === 'development') {
    const flagDef =
      flagDefinitions[flagType] &&
      `${flagDefinitions[flagType].label} - ${flagDefinitions[flagType].desc}`;
    // eslint-disable-next-line no-console
    console.warn(`${componentName}: ${[flagDef, message].join(' ')}`);
  }
};

export const logError = ({ componentName, flagType, message }) => {
  if (process.env.NODE_ENV === 'development') {
    const flagDef =
      flagDefinitions[flagType] &&
      `${flagDefinitions[flagType].label} - ${flagDefinitions[flagType].desc}`;
    // eslint-disable-next-line no-console
    console.error(`${componentName}: ${[flagDef, message].join(' ')}`);
  }
};
