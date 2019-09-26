import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getId, getPropsFromFirstChildOrList } from './private/helpers';
import { picklistClassName, pickitemClassName, sizeVariants } from './private/constants';
import Pickitem from './Pickitem';
import NestedPicklist from './NestedPicklist';
import NestedPicklistTrigger from './NestedPicklistTrigger';

export default class NestedPicklistContainer extends PureComponent {
  constructor(props) {
    super(props);

    const container = this;
    container.state = {
      open: props.isOpen,
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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({
        open: nextProps.isOpen,
      });
    }
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

  open() {
    this.setState({
      open: true,
    });
  }

  close() {
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
      child.type === NestedPicklist ||
      child.type === NestedPicklistTrigger ||
      child.type === Pickitem
        ? React.cloneElement(child, {
            size: listLevelProps.listSize,
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

NestedPicklistContainer.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  secondaryProps: PropTypes.object,
  /** Size variant */
  size: PropTypes.oneOf(sizeVariants),
  /** When true checkboxes will be added to the layout of the child components. */
  isMultiselect: PropTypes.bool,
  /** Whether to truncate text instead of wrapping. */
  shouldTruncate: PropTypes.bool,
};

NestedPicklistContainer.defaultProps = {
  isOpen: false,
  secondaryProps: {
    role: 'treeitem',
  },
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this as the
	 container for a nested list while traversing the children tree.
	 */
  _isGroupContainer: true, // eslint-disable-line
};

NestedPicklistContainer.childContextTypes = {
  id: PropTypes.string,
};
