import React from 'react';
import { pickitemClassName } from '../../picklist/private/constants';
import { ns } from '../../helpers/xuiClassNamespace';

export const suggestedDatesHeader = (
  <div className={`${ns}-dateinput-suggesteddates--header`}>
    <span>Suggested dates</span>
  </div>
);

export const suggestedDatesSecondaryText = description => (
  <span className={`${pickitemClassName}--secondary ${ns}-dateinput-suggesteddates--rightelement`}>
    {description}
  </span>
);
