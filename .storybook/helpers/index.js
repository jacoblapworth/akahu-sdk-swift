import { date } from '@storybook/addon-knobs';

/**
 * Default date knob returns a string, but we want a ‘Date’ date.
 * https://github.com/storybookjs/addon-knobs#date
 *
 * @param {string} name - Name of the knob
 * @param {Date} defaultValue - Default knob value
 * @param {string} groupId - Optional ID for property grouping purposes
 * @returns {Date}
 */
export const dateKnob = (name, defaultValue, groupId) => {
  const dateString = date(name, defaultValue, groupId);

  return new Date(dateString);
};
