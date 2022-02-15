import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIButton from '../../button';
import { tableVariantClassNames } from './private/constants';
import EditableTableUtilityBar from './private/EditableTableUtilityBar';

const baseName = `${tableVariantClassNames.editable}foot--action`;

interface BaseProps {
  addButtonContent: string;
  buttonProps?: React.ComponentProps<typeof XUIButton>;
  className?: string;
  onAdd?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
  keyof BaseProps
>;

type Props = BaseProps & SpreadProps;

const XUIEditableTableFootAction: React.FunctionComponent<Props> = ({
  addButtonContent,
  buttonProps,
  className,
  onAdd,
  qaHook,
  ...spreadProps
}) => (
  <EditableTableUtilityBar className={cn(baseName, className)} qaHook={qaHook} {...spreadProps}>
    <XUIButton
      {...buttonProps}
      onClick={onAdd}
      qaHook={qaHook && `${qaHook}--addbutton`}
      size="small"
      variant="borderless-main"
    >
      {addButtonContent}
    </XUIButton>
  </EditableTableUtilityBar>
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
