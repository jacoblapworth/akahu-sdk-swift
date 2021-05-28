import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableVariantClassNames } from './private/constants';

const baseName = `${tableVariantClassNames.editable}foot`;

const XUIEditableTableFoot = ({ children, className, qaHook, ...spreadProps }) => (
  <tfoot className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
    {children}
  </tfoot>
);

XUIEditableTableFoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFoot;
