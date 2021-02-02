import * as React from 'react';

import { Props as PickitemProps } from '../picklist/XUIPickitem';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * An optional array of one or more PickItem components to be added to the `XUIDropdownFooter` in a
   * `PickList` with standardised styling.
   */
  pickItems?: React.ReactElement<PickitemProps> | Array<React.ReactElement<PickitemProps>>;
  qaHook?: string;
}

export default class XUIDropdownFooter extends React.PureComponent<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: React.RefObject<HTMLElement> | null;
}
