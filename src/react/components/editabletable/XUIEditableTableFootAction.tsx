import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIButton from '../../button';
import { tableName } from './private/constants';
import EditableTableUtilityBar from './private/EditableTableUtilityBar';

interface BaseProps {
  addButtonContent: string;
  buttonProps?: React.ComponentProps<typeof XUIButton>;
  className?: string;
  onAdd?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

const XUIEditableTableFootAction: React.FunctionComponent<Props> = ({
  addButtonContent,
  buttonProps,
  className,
  onAdd,
  qaHook,
  ...spreadProps
}) => (
  <EditableTableUtilityBar
    className={cn(`${tableName}foot--action`, className)}
    qaHook={qaHook}
    {...spreadProps}
  >
    <XUIButton
      {...buttonProps}
      onClick={onAdd}
      qaHook={qaHook && `${qaHook}--addbutton`}
      size="small"
      variant="borderless-primary"
    >
      {addButtonContent}
    </XUIButton>
  </EditableTableUtilityBar>
);

XUIEditableTableFootAction.propTypes = {
  /**
   * Props for the row-adding button
   */
  buttonProps: PropTypes.object,
  /**
   * Content for row-adding button
   * <br />
   * Recommended English value: *Add new row*
   */
  addButtonContent: PropTypes.string.isRequired,
  className: PropTypes.string,
  /**
   * Function to be fired when the row-adding button is clicked
   */
  onAdd: PropTypes.func,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFootAction;
