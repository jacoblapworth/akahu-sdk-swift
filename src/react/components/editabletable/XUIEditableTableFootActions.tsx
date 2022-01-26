import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { tableVariantClassNames } from './private/constants';
import XUIEditableTableUtilityBar from './XUIEditableTableUtilityBar';

const baseName = `${tableVariantClassNames.editable}foot--action`;

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

const XUIEditableTableFootAction: React.FunctionComponent<Props> = ({
  children,
  className,
  qaHook,
  ...spreadProps
}) => (
  <XUIEditableTableUtilityBar className={cn(baseName, className)} qaHook={qaHook} {...spreadProps}>
    {children}
  </XUIEditableTableUtilityBar>
);

XUIEditableTableFootAction.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFootAction;
