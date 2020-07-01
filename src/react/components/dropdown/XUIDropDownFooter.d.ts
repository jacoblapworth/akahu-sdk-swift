import * as React from 'react';

import { Props as PickitemProps } from '../picklist/Pickitem';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * An optional array of one or more PickItem components to be added to the `XUIDropDownFooter` in a
   * `PickList` with standardised styling.
   */
  pickItems?: React.ReactElement<PickitemProps> | Array<React.ReactElement<PickitemProps>>;
  qaHook?: string;
}

export default class XUIDropDownFooter extends React.PureComponent<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;
}
