import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import arrow from '@xero/xui-icon/icons/arrow';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';
import {
  pickitemClassName,
  sideElementClassName,
  itemTextClassName,
  itemBodyClassName,
} from './private/constants';

export default class XUINestedPicklistTrigger extends PureComponent {
  rootNode = React.createRef();

  render() {
    const {
      className,
      qaHook,
      isHighlighted,
      onClick,
      onMouseOver,
      children,
      isSelected,
      ariaLabel,
      secondaryProps,
      leftElement,
    } = this.props;
    const { id } = this.context;
    const hasChildren = children && (typeof children !== 'string' || children.trim().length > 0);
    const classNames = cn(
      className,
      `${ns}-submenu-uicontrol`,
      hasChildren && itemBodyClassName,
      isHighlighted && `${pickitemClassName}-is-hovered`,
      isSelected && `${pickitemClassName}-is-selected`,
    );
    const wrappedLeft = leftElement && <span className={sideElementClassName}>{leftElement}</span>;

    return (
      <label
        {...secondaryProps}
        aria-label={ariaLabel}
        className={classNames}
        data-automationid={qaHook}
        htmlFor={`${id}-checkbox`}
        onClick={onClick}
        onFocus={onMouseOver}
        onKeyDown={onClick}
        onMouseOver={onMouseOver}
        ref={this.rootNode}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={0}
      >
        {wrappedLeft}
        {hasChildren ? <span className={itemTextClassName}>{children}</span> : null}
        <XUIIcon className={`${ns}-submenu-uicontrol--icon`} icon={arrow} isBoxed />
      </label>
    );
  }
}

XUINestedPicklistTrigger.propTypes = {
  /**
   * Specify an ARIA label for the trigger
   * <br />
   * Recommended English value: *Toggle submenu*
   */
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
  /** Content to be added to the left of the pickitem */
  leftElement: PropTypes.node,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  qaHook: PropTypes.string,
  secondaryProps: PropTypes.object,
};

XUINestedPicklistTrigger.defaultProps = {
  isHighlighted: false,
  secondaryProps: {
    role: 'button',
  },
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize
	 this component as a menu item.
	 */
  _isMenuItem: true, // eslint-disable-line
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize
	 this component a thing that opens and closes nested picklists
	 */
  _isGroupTrigger: true, // eslint-disable-line
};

XUINestedPicklistTrigger.contextTypes = {
  id: PropTypes.string,
};
