import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PickitemBody from './private/PickitemBody';
import PickitemMultiselect from './private/PickitemMultiselect';
import { pickitemClassName, sideElementClassName, sizeVariants } from './private/constants';

/**
 * Presentational (aka dumb) component used to display a selectable item in a
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
			size,
			primaryElement,
			secondaryElement,
			isInvalid,
			pinnedElement,
			_isHorizontal,
		} = pickItem.props;

		const validatedMultiselect = isMultiselect && size !== 'xsmall'; // No multiselect for xsmall;
		const classes = cn(
			`${pickitemClassName}`,
			className,
			shouldTruncate && `${pickitemClassName}-text-truncated`,
			isHighlighted && `${pickitemClassName}-is-hovered`,
			_isHorizontal && `${pickitemClassName}-is-horizontal`,
			(isSelected && !disableSelectedStyles) && `${pickitemClassName}-is-selected`,
			validatedMultiselect && `${pickitemClassName}-multiselect`,
			isSplit && `${pickitemClassName}-split`,
			isDisabled && `${pickitemClassName}-is-disabled`,
			size && `${pickitemClassName}-${size}`,
			isInvalid && `${pickitemClassName}-is-invalid`,
		);
		const listeners = !isDisabled ? {
			onClick,
			onBlur,
			onFocus,
			onKeyDown,
			onMouseOver,
		} : null;

		const Tag = isSplit ? 'div' : 'li';
		const BodyComponent = validatedMultiselect ? PickitemMultiselect : PickitemBody;
		const itemRole = isSplit ? undefined : ariaRole;

		const wrappedLeft = leftElement && (
			<span className={sideElementClassName}>
				{leftElement}
			</span>
		);
		const wrappedRight = rightElement && (
			<span className={sideElementClassName}>
				{rightElement}
			</span>
		);
		const secondaryWrapped =
			secondaryElement &&
				<span
					className={cn(
						`${pickitemClassName}--secondary`,
						shouldTruncate && `${pickitemClassName}-text-truncated`,
					)}
				>
					{secondaryElement}
				</span>;
		const pinnedWrapped = pinnedElement &&
			<span
				className={cn(
					`${pickitemClassName}--pinned`,
					shouldTruncate && `${pickitemClassName}-text-truncated`,
				)}
			>
				{pinnedElement}
			</span>;

		return (
			<Tag
				className={classes}
				aria-selected={validatedMultiselect ? isSelected : null}
				role={itemRole}
				id={id}
				data-automationid={qaHook}
				aria-label={ariaLabel}
			>
				<BodyComponent
					{...{
						shouldTruncate,
						isSelected,
						isDisabled,
						href,
						checkboxClassName,
						target,
						size,
						primaryElement,
						...pickitemBodyProps,
						...listeners,
					}}
					leftElement={wrappedLeft}
					qaHook={qaHook && `${qaHook}--body`}
					rightElement={wrappedRight}
					secondaryElement={secondaryWrapped}
					pinnedElement={pinnedWrapped}
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
	/** When true a checkbox will be added to the layout of the child component. */
	isMultiselect(props, propName) {
		if (props[propName] && props.size && props.size === 'xsmall') {
			return new Error('Multiselect is not supported for xsmall pickitems.');
		}
		return null;
	},
	/** Classes can be passed toe the XUICheckbox component in PickItemBody. */
	checkboxClassName: PropTypes.string,
	/** The automation-id to add to the item */
	qaHook: PropTypes.string,
	/** The disabled behaviour and styles are applied when this is true. */
	isDisabled: PropTypes.bool,
	/** Whether or not this pickitem sits next to a NestedPicklistToggle */
	isSplit: PropTypes.bool,
	/** Optional label to add to a pickitem */
	ariaLabel: PropTypes.string,
	/** When a link is preferred, this target prop can be used on the <a> tag */
	target: PropTypes.string,
	/** Whether to truncate text instead of wrapping. Where possible, please set this on the
	 * containing picklist, which will override any per-item settings. */
	shouldTruncate: PropTypes.bool,
	/** Props to pass to the pickitem body */
	pickitemBodyProps: PropTypes.object,
	/** Size variant. Where possible, please set this on the containing picklist,
	 * which will override any per-item settings. */
	size: PropTypes.oneOf(sizeVariants),
	/** Content to be added to the left of the pickitem. */
	leftElement: PropTypes.node,
	/** Content to be added to the right of the pickitem. */
	rightElement: PropTypes.node,
	/** Standard text. Can be plain text. */
	primaryElement: PropTypes.node,
	/** Less important text to appear beside primary. Can be plain text. */
	secondaryElement: PropTypes.node,
	/** Less important text to appear pinned at the right. Can be plain text. */
	pinnedElement: PropTypes.node,
	/** Inherited. Whether parent list is set to render horizontal pickitems. Do not set directly. */
	_isHorizontal: PropTypes.bool,
};

Pickitem.defaultProps = {
	ariaRole: 'option',
	isSelected: false,
	disableSelectedStyles: false,
	isSplit: false,
	isDisabled: false,
	size: 'standard',
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this
	 component as a menu item.
	 */
	_isMenuItem: true, // eslint-disable-line
};
