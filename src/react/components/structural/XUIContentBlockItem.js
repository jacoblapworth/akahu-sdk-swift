import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-contentblockitem`;

export default class XUIContentBlockItem extends PureComponent {
	render() {
		const {
			onClick,
			onKeyDown,
			action,
			leftContent,
			children,
			className,
			hasLayout,
			hasTopRadius,
			hasBottomRadius,
			isRowLink,
			href,
			overflow,
			pinnedValue,
			secondaryHeading,
			primaryHeading,
			description,
			tags,
			tagPosition,
		} = this.props;

		const clonedAction = action && React.cloneElement(action, {
			className: cn(
				action.props.className,
				`${baseClass}--actions`,
			),
		});

		const tagPositionInline = tagPosition === 'inline';

		const builtHeadings = primaryHeading && (
			<div className={`${baseClass}--headings`}>
				<span className={`${baseClass}--primaryheading`}>
					{primaryHeading}
				</span>
				{
					secondaryHeading && (
						<span className={`${baseClass}--secondaryheading`}>
							{secondaryHeading}
						</span>
					)
				}
				{
					tagPositionInline && tags
				}
			</div>
		);

		const tagPositionDescription = tagPosition === 'description';

		let builtDescriptionArea = description && (
			<div className={`${baseClass}--description`}>
				<span className={`${baseClass}--description--text`}>
					{description}
				</span>
				{tagPositionDescription && tags}
			</div>
		);

		if (!description && tags && tagPositionDescription) {
			builtDescriptionArea = (
				<div className={`${baseClass}--description`}>
					{tags}
				</div>
			);
		}

		const builtPinnedValue = pinnedValue && (
			<div className={`${baseClass}--pinnedvalue`}>
				{pinnedValue}
			</div>
		);

		const builtLeftContent = leftContent && (
			<div className={`${baseClass}--leftcontent`}>
				{leftContent}
			</div>
		);

		const Tag = href || onClick || onKeyDown ? 'a' : 'div';

		const builtMainContent = (builtHeadings || builtDescriptionArea) && (
			<Tag href={href} className={`${baseClass}--maincontent`} onClick={onClick} onKeyDown={onKeyDown}>
				{builtHeadings}
				{builtDescriptionArea}
			</Tag>
		);

		const tagPositionRight = tagPosition === 'right';

		const builtRightContent = (
			builtPinnedValue ||
			action ||
			overflow ||
			(tags && tagPositionRight)) && (
				<div className={`${baseClass}--rightcontent`}>
					{tagPositionRight && tags}
					{builtPinnedValue}
					{clonedAction}
					{overflow}
				</div>
			);

		const divClasses = cn(
			`${baseClass}`,
			hasLayout && `${baseClass}-layout`,
			isRowLink && `${baseClass}-rowlink`,
			hasTopRadius && `${baseClass}-has-top-radius`,
			hasBottomRadius && `${baseClass}-has-bottom-radius`,
			className,
		);

		return (
			<div className={divClasses}>
				{builtLeftContent}
				{children}
				{builtMainContent}
				{builtRightContent}
			</div>
		);
	}
}

XUIContentBlockItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/**
	 * Optional actions to be right aligned. Use the XUIActions component.
	 */
	action: PropTypes.element,
	/**
	 * Callback to fire when content block item is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Callback to fire on keyDown for each content block item
	 */
	onKeyDown: PropTypes.func,
	/**
	 * Left most component option, typically an `avatar`, `checkbox` or `rollover checkbox` component
	 */
	leftContent: PropTypes.element,
	/**
	 * Determines whether to apply hover styling on the entire content block item
	 */
	isRowLink: PropTypes.bool,
	/**
	 * Determines whether to apply top left and top right border radius on the content block item
	 */
	hasTopRadius: PropTypes.bool,
	/**
	 * Determines whether to apply bottom left and bottom right border radius on the content block item
	 */
	hasBottomRadius: PropTypes.bool,
	/**
	 * Determines whether to apply default layout styling or not
	 */
	hasLayout: PropTypes.bool,
	/**
	 * The `href` attribute to use on the anchor element
	 */
	href: PropTypes.string,
	/**
	 * Any component passed as right most content, typically a `dropdown toggled` component
	 */
	overflow: PropTypes.element,
	/**
	 * Text pinned to right side of content block
	 */
	pinnedValue: PropTypes.string,
	/**
	 * Plain text heading
	 */
	primaryHeading: PropTypes.string,
	/**
	 * Plain text secondary heading
	 */
	secondaryHeading: PropTypes.string,
	/**
	 * Plain text secondary heading
	 */
	description: PropTypes.string,
	/**
	 * Tag or other user determined node to go to right of primary heading
	 */
	tags: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	/**
	 * Repositions the tags in other places around the component
	 */
	tagPosition: PropTypes.oneOf(['description', 'right', 'inline']),
};

XUIContentBlockItem.defaultProps = {
	hasLayout: true,
	tagPosition: 'description',
};
