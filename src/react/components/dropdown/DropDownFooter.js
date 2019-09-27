import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Picklist from '../picklist/Picklist';
import { baseClass } from './private/constants';

/**
 * Wrapper component for contents of a dropdown footer.  DropDown does expect this to be the
 * wrapper, so it's use is mandatory. It can accept pickItems directly, or you can custom
 * build the content.
 *
 * @export
 * @class DropDownFooter
 * @extends {PureComponent}
 */
export default class DropDownFooter extends PureComponent {
  rootNode = React.createRef();

  render() {
    const { children, className, qaHook, pickItems } = this.props;

    const footerClass = `${baseClass}--footer`;
    const classes = cn(footerClass, className);
    const pickList = pickItems && (
      <Picklist className={`${footerClass}--picklist`}>{pickItems}</Picklist>
    );
    return (
      <div className={classes} data-automationid={qaHook} ref={this.rootNode}>
        {pickList}
        {children}
      </div>
    );
  }
}

DropDownFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** An optional array of one or more PickItem components to be added to the DropDownFooter
   * in a PickList with standardised styling.
   */
  pickItems: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
