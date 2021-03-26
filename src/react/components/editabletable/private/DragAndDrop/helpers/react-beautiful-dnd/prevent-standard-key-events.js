// This file is a non-Flow version of
// https://github.com/atlassian/react-beautiful-dnd/blob/v13.1.0/src/view/use-sensor-marshal/sensors/util/prevent-standard-key-events.js

import { eventKeyValues } from '../../../../../helpers/reactKeyHandler';

const preventedKeys = {
  // submission
  [eventKeyValues.enter]: true,
  // tabbing
  [eventKeyValues.tab]: true,
};

export default event => {
  if (preventedKeys[event.key]) {
    event.preventDefault();
  }
};
