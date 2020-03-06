import React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface Props {
  /**
   * Content to be displayed with the icon.
   *
   * Recommended English value: *No results found*
   */
  children: React.ReactNode;
  className?: string;
  icon?: XUIIconData;
  id?: string;
  qaHook?: string;
}

declare const XUIAutocompleterEmptyState: React.FunctionComponent<Props>;
export default XUIAutocompleterEmptyState;
