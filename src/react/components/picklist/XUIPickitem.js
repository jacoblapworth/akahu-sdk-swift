import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PickitemBody from './private/PickitemBody';
import PickitemMultiselect from './private/PickitemMultiselect';
import { pickitemClassName, sideElementClassName } from './private/constants';
import { verticalOnlyProp } from './private/helpers';
import shouldRender from '../helpers/shouldRender';

/**
 * Presentational component used to display a selectable item in a
 * list of items.
 *
 * @export
 * @class XUIPickitem
 * @extends {PureComponent}
 */
export default class XUIPickitem extends PureComponent {
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
      onMouseUp,
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
          onMouseUp,
        }
      : null;

    const Tag = isSplit ? 'div' : 'li';
    const BodyComponent = isMultiselect ? PickitemMultiselect : PickitemBody;
    const itemRole = isSplit ? undefined : ariaRole;

    const wrappedLeft = leftElement && <span className={sideElementClassName}>{leftElement}</span>;
    const wrappedRight = rightElement && (
      <span className={sideElementClassName}>{rightElement}</span>
    );
    const secondaryWrapped = shouldRender(secondaryElement) && (
      <span className={cn(`${pickitemClassName}--secondary`, truncationClassName)}>
        {secondaryElement}
      </span>
    );
    const pinnedWrapped = shouldRender(pinnedElement) && (
      <span className={cn(`${pickitemClassName}--pinned`, truncationClassName)}>
        {pinnedElement}
      </span>
    );
    const headingWrapped = shouldRender(headingElement) && (
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

XUIPickitem.propTypes = {
  /**
   * Inherited. Whether parent list is set to render horizontal pickitems. Do not set directly.
   * @ignore
   */
  _isHorizontal: PropTypes.bool,
  /** Optional label to add to a pickitem */
  ariaLabel: PropTypes.string,
  /** ARIA attribute defining what purpose this item serves. */
  ariaRole: PropTypes.string,
  /**
   * Classes can be passed to the `XUICheckbox` component in `XUIPickitemBody`.<br>
   * ⚠️ *Vertical picklists only*
   */
  checkboxClassName(...parameters) {
    return verticalOnlyProp(PropTypes.string, ...parameters);
  },
  children: PropTypes.node,
  className: PropTypes.string,
  /** For nested children such as checkboxes, icons or groups selected styles should be disabled. */
  disableSelectedStyles: PropTypes.bool,
  /**
   * Text to appear bolded as the first line. Pushes secondary to a new line.<br>
   * ⚠️ *Vertical picklists only*
   */
  headingElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /** Link to be used in child, will render an a tag if used and button if not */
  href: PropTypes.string,
  /** id must be unique and unchangeable  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** The disabled behaviour and styles are applied when this is true. */
  isDisabled: PropTypes.bool,
  /** Is the item highlighted? */
  isHighlighted: PropTypes.bool,
  /** Is the item invalid? */
  isInvalid: PropTypes.bool,
  /**
   * Allows flex-wrap, achieving a look much like content-block. Use for AutoCompleter.<br>
   * ⚠️ *Vertical picklists only*
   */
  isMultiline(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /**
   * When true a checkbox will be added to the layout of the child component.<br>
   * ⚠️ *Vertical picklists only*
   */
  isMultiselect(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /** Is the item selected? */
  isSelected: PropTypes.bool,
  /**
   * Whether or not this pickitem sits next to a `XUINestedPicklistToggle`.<br>
   * ⚠️ *Vertical picklists only*
   */
  isSplit(...parameters) {
    return verticalOnlyProp(PropTypes.bool, ...parameters);
  },
  /** Content to be added to the left of the pickitem. */
  leftElement: PropTypes.node,
  /** Callback on blur of the pickitem */
  onBlur: PropTypes.func,
  /** Callback when the pickitem is clicked. */
  onClick: PropTypes.func,
  /** Callback on focus of the pickitem */
  onFocus: PropTypes.func,
  /** Callback on keydown of the pickitem */
  onKeyDown: PropTypes.func,
  /** Callback on mouseup of the pickitem */
  onMouseUp: PropTypes.func,
  /** Callback when this item is selected by a parent component */
  onSelect: PropTypes.func,
  /** Props to pass to the pickitem body */
  pickitemBodyProps: PropTypes.object,
  /**
   * Less important text to appear pinned at the right. Can be plain text.<br>
   * ⚠️ *Vertical picklists only*
   */
  pinnedElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /** Standard text. Can be plain text. */
  primaryElement: PropTypes.node,
  /** The automation-id to add to the item */
  qaHook: PropTypes.string,
  /**
   * Content to be added to the right of the pickitem.<br>
   * ⚠️ *Vertical picklists only*
   */
  rightElement(...parameters) {
    return verticalOnlyProp(PropTypes.node, ...parameters);
  },
  /** Less important text to appear beside primary. Can be plain text. */
  secondaryElement: PropTypes.node,
  /** Whether to truncate text instead of wrapping. Where possible, please set this on the
   * containing picklist, which will override any per-item settings. */
  shouldTruncate: PropTypes.bool,
  /** When a link is preferred, this target prop can be used on the <a> tag */
  target: PropTypes.string,
  /** The value associated with this PickItem which will be passed to the onSelect callbacks
   * here and in the stateful picklist */
  value: PropTypes.any,
};

XUIPickitem.defaultProps = {
  ariaRole: 'option',
  disableSelectedStyles: false,
  isDisabled: false,
  isSelected: false,
  isSplit: false,
  /*
	 DO NOT REMOVE
	 This property is needed so that the stateful picklist will properly recognize this
	 component as a menu item.
	 */
  _isMenuItem: true, // eslint-disable-line
};
