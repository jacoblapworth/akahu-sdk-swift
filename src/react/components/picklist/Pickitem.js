import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PickitemBody from './private/PickitemBody';
import PickitemMultiselect from './private/PickitemMultiselect';
import { pickitemClassName, sideElementClassName } from './private/constants';
import { verticalOnlyProp } from './private/helpers';

/**
 * Presentational component used to display a selectable item in a
 * list of items.
 *
 * @export
 * @class Pickitem
 * @extends {PureComponent}
 */
export default class Pickitem extends PureComponent {
  render() {
    const pickItem = this;
    const {
      id,
      isSelected,
      className,
      onBlur,
      onFocus,
      onKeyDown,
      onClick,
      onMouseOver,
      ariaRole,
      disableSelectedStyles,
      isMultiselect,
      href,
      children,
      qaHook,
      checkboxClassName,
      isHighlighted,
      isDisabled,
      isSplit,
      ariaLabel,
      target,
      shouldTruncate,
      pickitemBodyProps,
      leftElement,
      rightElement,
      primaryElement,
      secondaryElement,
      isInvalid,
      pinnedElement,
      headingElement,
      isMultiline,
      _isHorizontal,
    } = pickItem.props;

    const truncationClassName = (shouldTruncate && `${pickitemClassName}-text-truncated`) || '';

    let pickItemMinWidthClassName; // This is used to set min-width for pickItem when truncating
    if (shouldTruncate && !rightElement && !pinnedElement && (leftElement || secondaryElement)) {
      const leftElementClassName = cn(leftElement && '-leftelement');
      const secondaryElementClassName = cn(secondaryElement && '-secondarytext');
      pickItemMinWidthClassName = `${pickitemClassName}-has${leftElementClassName}${secondaryElementClassName}`;
    }
    const classes = cn(
      `${pickitemClassName}`,
      className,
      truncationClassName,
      isHighlighted && `${pickitemClassName}-is-hovered`,
      isMultiline && `${pickitemClassName}-multiline`,
      _isHorizontal && `${pickitemClassName}-is-horizontal`,
      isSelected && !disableSelectedStyles && `${pickitemClassName}-is-selected`,
      isMultiselect && `${pickitemClassName}-multiselect`,
      isSplit && `${pickitemClassName}-split`,
      isDisabled && `${pickitemClassName}-is-disabled`,
      `${pickitemClassName}-medium`,
      isInvalid && `${pickitemClassName}-is-invalid`,
      pickItemMinWidthClassName,
    );
    const listeners = !isDisabled
      ? {
          onClick,
          onBlur,
          onFocus,
          onKeyDown,
          onMouseOver,
        }
      : null;

    const Tag = isSplit ? 'div' : 'li';
    const BodyComponent = isMultiselect ? PickitemMultiselect : PickitemBody;
    const itemRole = isSplit ? undefined : ariaRole;

    const wrappedLeft = leftElement && <span className={sideElementClassName}>{leftElement}</span>;
    const wrappedRight = rightElement && (
      <span className={sideElementClassName}>{rightElement}</span>
    );
    const secondaryWrapped = secondaryElement && (
      <span className={cn(`${pickitemClassName}--secondary`, truncationClassName)}>
        {secondaryElement}
      </span>
    );
    const pinnedWrapped = pinnedElement && (
      <span className={cn(`${pickitemClassName}--pinned`, truncationClassName)}>
        {pinnedElement}
      </span>
    );
    const headingWrapped = headingElement && (
      <span className={cn(`${pickitemClassName}--heading`, truncationClassName)}>
        {headingElement}
      </span>
    );

    return (
      <Tag
        aria-label={ariaLabel}
        aria-selected={isMultiselect ? isSelected : null}
        className={classes}
        data-automationid={qaHook}
        id={id}
        role={itemRole}
      >
        <BodyComponent
          {...{
            shouldTruncate,
            isSelected,
            isDisabled,
            href,
            checkboxClassName,
            target,
            primaryElement,
            ...pickitemBodyProps,
            ...listeners,
          }}
          headingElement={headingWrapped}
          leftElement={wrappedLeft}
          pinnedElement={pinnedWrapped}
          qaHook={qaHook && `${qaHook}--body`}
          rightElement={wrappedRight}
          secondaryElement={secondaryWrapped}
        >
          {children}
        </BodyComponent>
      </Tag>
    );
  }
}

Pickitem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** id must be unique and unchangeable  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Is the item selected? */
  isSelected: PropTypes.bool,
  /** Is the item highlighted? */
  isHighlighted: PropTypes.bool,
  /** Is the item invalid? */
  isInvalid: PropTypes.bool,
  /** Callback when the pick item is clicked. */
  onClick: PropTypes.func,
  /** Callback on blur of the pick item */
  onBlur: PropTypes.func,
  /** Callback on focus of the pick item */
  onFocus: PropTypes.func,
  /** Callback on keydown of the pick item */
  onKeyDown: PropTypes.func,
  /** Callback when this item is selected by a parent component */
  onSelect: PropTypes.func,
  /** Link to be used in child, will render an a tag if used and button if not */
  href: PropTypes.string,
  /** ARIA attribute defining what purpose this item serves. */
  ariaRole: PropTypes.string,
  /** The value associated with this PickItem which will be passed to the onSelect callbacks
   * here and in the StatefulPicklist */
  value: PropTypes.any,
  /** For nested children such as checkboxes, icons or groups selected styles should be disabled. */
  disableSelectedStyles: PropTypes.bool,
  /**
   * When true a checkbox will be added to the layout of the child component.<br>
   * ⚠️ *Vertical picklists only*
   */
  isMultiselect(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /**
   * Classes can be passed to the XUICheckbox component in PickItemBody.<br>
   * ⚠️ *Vertical picklists only*
   */
  checkboxClassName(...parameters) {
    return verticalOnlyProp(PropTypes.string, ...parameters);
  },
  /** The automation-id to add to the item */
  qaHook: PropTypes.string,
  /** The disabled behaviour and styles are applied when this is true. */
  isDisabled: PropTypes.bool,
  /**
   * Whether or not this pickitem sits next to a NestedPicklistToggle.<br>
   * ⚠️ *Vertical picklists only*
   */
  isSplit(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /** Optional label to add to a pickitem */
  ariaLabel: PropTypes.string,
  /** When a link is preferred, this target prop can be used on the <a> tag */
  target: PropTypes.string,
  /** Whether to truncate text instead of wrapping. Where possible, please set this on the
   * containing picklist, which will override any per-item settings. */
  shouldTruncate: PropTypes.bool,
  /**
   * Allows flex-wrap, achieving a look much like content-block. Use for AutoCompleter.<br>
   * ⚠️ *Vertical picklists only*
   */
  isMultiline(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /** Props to pass to the pickitem body */
  pickitemBodyProps: PropTypes.object,
  /** Content to be added to the left of the pickitem. */
  leftElement: PropTypes.node,
  /**
   * Content to be added to the right of the pickitem.<br>
   * ⚠️ *Vertical picklists only*
   */
  rightElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /** Standard text. Can be plain text. */
  primaryElement: PropTypes.node,
  /** Less important text to appear beside primary. Can be plain text. */
  secondaryElement: PropTypes.node,
  /**
   * Less important text to appear pinned at the right. Can be plain text.<br>
   * ⚠️ *Vertical picklists only*
   */
  pinnedElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /**
   * Text to appear bolded as the first line. Pushes secondary to a new line.<br>
   * ⚠️ *Vertical picklists only*
   */
  headingElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /** Inherited. Whether parent list is set to render horizontal pickitems. Do not set directly. */
  _isHorizontal: PropTypes.bool,
};

Pickitem.defaultProps = {
  ariaRole: 'option',
  isSelected: false,
  disableSelectedStyles: false,
  isSplit: false,
  isDisabled: false,
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this
	 component as a menu item.
	 */
  _isMenuItem: true, // eslint-disable-line
};
