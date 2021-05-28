import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getId, getPropsFromFirstChildOrList } from './private/helpers';
import { picklistClassName, pickitemClassName } from './private/constants';
import XUIPickitem from './XUIPickitem';
import XUINestedPicklist from './XUINestedPicklist';
import XUINestedPicklistTrigger from './XUINestedPicklistTrigger';

export default class XUINestedPicklistContainer extends PureComponent {
  constructor(props) {
    super(props);

    const container = this;

    container.state = {
      open: props.isDefaultOpen || false,
    };
    container.toggle = container.toggle.bind(container);
    container.open = container.open.bind(container);
    container.close = container.close.bind(container);
    container.isOpen = container.isOpen.bind(container);
  }

  getChildContext() {
    return {
      id: getId(this),
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isOpen !== undefined) {
      return {
        open: nextProps.isOpen,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;
    if (prevState.open !== state.open) {
      const callback = state.open ? props.onOpen : props.onClose;
      if (callback) {
        callback();
      }
    }
  }

  isOpen() {
    return !!(this.state && this.state.open);
  }

  isControlledComponent() {
    return this.props.isOpen !== undefined;
  }

  open() {
    if (this.isControlledComponent() && !this.props.isOpen) {
      this.props.onOpen && this.props.onOpen();
    }
    this.setState({
      open: true,
    });
  }

  close() {
    if (this.isControlledComponent() && this.props.isOpen) {
      this.props.onClose && this.props.onClose();
    }
    this.setState({
      open: false,
    });
  }

  toggle() {
    this.state.open ? this.close() : this.open();
  }

  render() {
    const container = this;
    const isExpanded = container.state.open;
    const { className, children, qaHook, id, secondaryProps, shouldTruncate } = container.props;

    const listLevelProps = getPropsFromFirstChildOrList(children, this.props);

    const newChildren = React.Children.map(children, child =>
      child.type === XUINestedPicklist ||
      child.type === XUINestedPicklistTrigger ||
      child.type === XUIPickitem
        ? React.cloneElement(child, {
            isMultiselect: listLevelProps.listMultiselect,
            // This is ok to be set at either the item level or the list level.
            shouldTruncate:
              child.props.shouldTruncate === undefined
                ? shouldTruncate
                : child.props.shouldTruncate,
          })
        : child,
    );
    return (
      <li
        aria-expanded={isExpanded}
        className={cn(className, `${picklistClassName}--nestedcontainer`)}
        data-automationid={qaHook}
        role="treeitem"
      >
        <input
          {...secondaryProps}
          aria-owns={id}
          checked={isExpanded}
          className={`${pickitemClassName}--submenucontrol`}
          data-automationid={qaHook && `${qaHook}--checkbox`}
          id={`${id}-checkbox`}
          onChange={container.toggle}
          tabIndex={-1}
          type="checkbox"
        />
        {newChildren}
      </li>
    );
  }
}

XUINestedPicklistContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** _Uncontrolled only_: Whether the container is open or closed by default.  */
  isDefaultOpen: PropTypes.bool,
  /** When true checkboxes will be added to the layout of the child components. */
  isMultiselect: PropTypes.bool,
  /** _Controlled only_: Whether the container is open or closed.  */
  isOpen: PropTypes.bool,
  /** Callback when the container is closed.  */
  onClose: PropTypes.func,
  /** Callback when the container is opened.  */
  onOpen: PropTypes.func,
  qaHook: PropTypes.string,
  secondaryProps: PropTypes.object,
  /** Whether to truncate text instead of wrapping. */
  shouldTruncate: PropTypes.bool,
};

XUINestedPicklistContainer.defaultProps = {
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this as the
	 container for a nested list while traversing the children tree.
	 */
  _isGroupContainer: true, // eslint-disable-line
};

XUINestedPicklistContainer.childContextTypes = {
  id: PropTypes.string,
};
