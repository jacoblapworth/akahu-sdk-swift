import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Picklist from '../picklist/Picklist';
import { baseClass } from './private/constants';

/**
 * Wrapper component for contents of a dropdown footer.  `XUIDropdown` does expect this to be the
 * wrapper, so its use is mandatory. It can accept pickitems directly, or you can custom
 * build the content.
 *
 * @export
 * @function XUIDropdownFooter
 */
const XUIDropdownFooter = ({ children, className, qaHook, pickItems }) => {
  const rootNode = React.createRef();
  const footerClass = `${baseClass}--footer`;
  const classes = cn(footerClass, className);
  const pickList = pickItems && (
    <Picklist className={`${footerClass}--picklist`}>{pickItems}</Picklist>
  );

  return (
    <div className={classes} data-automationid={qaHook} ref={rootNode}>
      {pickList}
      {children}
    </div>
  );
};

XUIDropdownFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** An optional array of one or more PickItem components to be added to the `XUIDropdownFooter`
   * in a PickList with standardised styling.
   */
  pickItems: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default React.memo(XUIDropdownFooter);
