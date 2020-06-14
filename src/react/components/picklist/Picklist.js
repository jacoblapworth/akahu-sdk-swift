import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { observe, unobserve } from '../helpers/resizeObserver';
import '../helpers/xuiGlobalChecks';
import { picklistClassName } from './private/constants';
import Pickitem from './Pickitem';
import { getPropsFromFirstChildOrList } from './private/helpers';
import { userBreakpoints } from '../helpers/breakpoints';
import NestedPicklistContainer from './NestedPicklistContainer';
import SelectBoxOption from '../select-box/SelectBoxOption';
// eslint-disable-next-line import/no-cycle
import TabDropDown from './private/TabDropDown';

/**
 * Presentational component used to display a selectable list of Pickitems.
 *
 * @export
 * @class Picklist
 * @extends {Component}
 */
export default class Picklist extends Component {
  // All those logic in Lifecycle could be removed when we split the prop `isHorizontal` out (XUI-683)
  state = {};
  _area = React.createRef();

  componentDidMount() {
    this.setBreakpoint();
    this._area.current && observe(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.swapAtBreakpoint !== prevProps.swapAtBreakpoint) {
      this.setBreakpoint();
    }
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  setBreakpoint = () => {
    this._breakpoints = {
      normalPickitems: userBreakpoints[this.props.swapAtBreakpoint],
    };
  };

  render() {
    const {
      children,
      className,
      id,
      onKeyDown,
      onMouseDown,
      secondaryProps,
      defaultLayout,
      isHorizontal,
      qaHook,
      shouldTruncate,
      swapAtBreakpoint,
    } = this.props;

    const listLevelProps = getPropsFromFirstChildOrList(children, this.props);
    const newChildren = React.Children.map(children, child =>
      child &&
      (child.type === Pickitem ||
        child.type === SelectBoxOption ||
        child.type === NestedPicklistContainer)
        ? React.cloneElement(child, {
            size: listLevelProps.listSize,
            isMultiselect: listLevelProps.listMultiselect,
            _isHorizontal: isHorizontal,
            // This is ok to be set at either the item level or the list level.
            shouldTruncate:
              child.props.shouldTruncate === undefined
                ? shouldTruncate
                : child.props.shouldTruncate,
          })
        : child,
    );

    const listClasses = cn(
      `${picklistClassName}`,
      defaultLayout && !isHorizontal && `${picklistClassName}-layout`,
      `${picklistClassName}-${listLevelProps.listSize}`,
    );

    const ulProps = {
      ...secondaryProps,
      id,
      onKeyDown,
      onMouseDown,
      'data-automationid': qaHook,
    };

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    // Deferring the fix for this until we determine how to change the surface
    // of pickitems & picklists
    return (
      <ul
        {...ulProps}
        className={cn(listClasses, className, isHorizontal && `${picklistClassName}-horizontal`)}
        ref={this._area}
      >
        {!isHorizontal || !swapAtBreakpoint || this.state.normalPickitems ? (
          newChildren
        ) : (
          <TabDropDown
            className={className}
            dropdownList={newChildren}
            size={listLevelProps.listSize}
            ulProps={{ ...ulProps, className: listClasses }}
          />
        )}
      </ul>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
  }
}

Picklist.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /** Id to be applied to the root HTML element */
  id: PropTypes.string,
  /** Keydown handler function added to the root HTML element */
  onKeyDown: PropTypes.func,
  /** Mousedown handler function added to the root HTML element */
  onMouseDown: PropTypes.func,
  /** Additional props to pass to the root HTML element */
  secondaryProps: PropTypes.object,
  /** Whether to add the default layout class */
  defaultLayout: PropTypes.bool,
  /** Whether to render as horizontal pickitems */
  isHorizontal: PropTypes.bool,
  /**
   * When true checkboxes will be added to the layout of the child components.<br>
   * ⚠️ *Vertical picklists only*
   */
  isMultiselect: PropTypes.bool,
  /** Whether to truncate text instead of wrapping. */
  shouldTruncate: PropTypes.bool,
  /**
   * Defines the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.
   * Supported breakpoints are `small` (600px), `medium` (800px), `large` (1000px), and `xlarge` (1200px).<br>
   * ⚠️ *Horizontal picklists only*
   */
  swapAtBreakpoint: PropTypes.oneOf(Object.keys(userBreakpoints)),
};

Picklist.defaultProps = {
  defaultLayout: true,
  secondaryProps: {
    role: 'group',
  },
};
