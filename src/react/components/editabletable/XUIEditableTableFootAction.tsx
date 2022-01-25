import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIButton from '../../button';
import { tableVariantClassNames } from './private/constants';
import XUIEditableTableUtilityBar from './XUIEditableTableUtilityBar';

const baseName = `${tableVariantClassNames.editable}foot--action`;

interface BaseProps {
  addButtonContent: string;
  buttonProps?: React.ComponentProps<typeof XUIButton>;
  className?: string;
  onAdd?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

const XUIEditableTableFootAction: React.FunctionComponent<Props> = ({
  addButtonContent,
  buttonProps,
  className,
  onAdd,
  qaHook,
  ...spreadProps
}) => (
  <XUIEditableTableUtilityBar className={cn(baseName, className)} qaHook={qaHook} {...spreadProps}>
    <XUIButton
      {...buttonProps}
      onClick={onAdd}
      qaHook={qaHook && `${qaHook}--addbutton`}
      size="small"
      variant="borderless-main"
    >
      {addButtonContent}
    </XUIButton>
  </XUIEditableTableUtilityBar>
);

XUIEditableTableFootAction.propTypes = {
  /**
   * Content for row-adding button
   * <br />
   * Recommended English value: *Add new row*
   */
  addButtonContent: PropTypes.string.isRequired,
  /**
   * Props for the row-adding button
   */
  buttonProps: PropTypes.object,
  className: PropTypes.string,
  /**
   * Function to be fired when the row-adding button is clicked
   */
  onAdd: PropTypes.func,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFootAction;
