import contact from '@xero/xui-icon/icons/contact';
import React from 'react';

import XUIAutocompleterEmptyState from '../../XUIAutocompleterEmptyState';

const EmptyStateExample = ({ iconComponent, iconProps }) => {
  return iconComponent ? (
    <XUIAutocompleterEmptyState iconComponent={iconComponent}>
      No content found
    </XUIAutocompleterEmptyState>
  ) : (
    <XUIAutocompleterEmptyState icon={contact} iconProps={iconProps}>
      No people found
    </XUIAutocompleterEmptyState>
  );
};

export default EmptyStateExample;
