import React from 'react';

import { Props as XUIButtonProps } from './XUIButton';

type Props = Omit<
  XUIButtonProps,
  'children' | 'fullWidth' | 'isGrouped' | 'isInverted' | 'minLoaderWidth' | 'retainLayout'
>;

export default class XUISecondaryButton extends React.PureComponent<Props> {}
