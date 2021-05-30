import * as React from 'react';

import XUIButton from './XUIButton';

type Props = Omit<
  React.ComponentProps<typeof XUIButton>,
  'children' | 'fullWidth' | 'isGrouped' | 'isInverted' | 'hasMinLoaderWidth' | 'retainLayout'
>;

export default class XUISecondaryButton extends React.PureComponent<Props> {}
