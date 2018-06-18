import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-contentblockitem`;

export default class XUIContentBlockItem extends PureComponent {
	render() {
		const {
			action,
			leftContent,
			children,
			className,
			hasLayout,
			href,
			overflow,
			pinnedValue,
			secondaryHeading,
			primaryHeading,
			tag
		} = this.props;

		const clonedAction = action && React.cloneElement(action, {
			className: cn(
				action.props.className,
				`${baseClass}--actions`
			)
		});
		
		const builtPrimaryHeadingAndTag = primaryHeading && (
			<span className={`${baseClass}--toplinks`}>
				<span className={`${baseClass}--primaryheading`}>
				{primaryHeading}
				</span>
				{tag}
			</span>
		);
		
		const builtSecondaryHeading = secondaryHeading && 
			<div className={`${baseClass}--secondaryheading`}>
				{secondaryHeading}
			</div>;

		const builtPinnedValue = pinnedValue && 
			<div className={`${baseClass}--pinnedvalue`}>
				{pinnedValue}
			</div>;
		
		const builtLeftContent = leftContent && 
			<div className={`${baseClass}--leftcontent`}>
				{leftContent}
			</div>;

		const Tag = href ? 'a' : 'div';

		const builtMainContent = (builtPrimaryHeadingAndTag || builtSecondaryHeading) && (
			<Tag href={href} className={`${baseClass}--links`}>
				{builtPrimaryHeadingAndTag}
				{builtSecondaryHeading}
			</Tag>		
		);
			

		const builtRightContent = (builtPinnedValue || action || overflow) && (
			<div className={`${baseClass}--rightcontent`}>
				{builtPinnedValue}
				{clonedAction}
				{overflow}
			</div> 
		);

		const divClasses = cn(`${baseClass}`, hasLayout && `${baseClass}-layout`, className);

		return (	
			<li className={divClasses}>
				{builtLeftContent}
				{children}
				{builtMainContent}
				{builtRightContent}
			</li>
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
	 * Left most component option, typically an `avatar`, `checkbox` or `rollover checkbox` component
	 */
	leftContent: PropTypes.element,
	/**
	 * Determines whether to apply default layout styling or not
	 */
	hasLayout: PropTypes.bool,
	/**
	 * The `href` attribute to use on the anchor element
	 */
	href: PropTypes.node,
	/**
	 * Any component passed as right most content, typically a `dropdown toggled` component
	 */
	overflow: PropTypes.element,
	/**
	 * Text pinned to right side of content block
	 */
	pinnedValue: PropTypes.node,
	/**
	 * Plain text heading
	 */
	primaryHeading: PropTypes.node,
	/**
	 * Plain text secondary heading
	 */
	secondaryHeading: PropTypes.node,
	/**
	 * Tag or other user determined node to go to right of primary heading
	 */
	tag: PropTypes.element
};

XUIContentBlockItem.defaultProps = {
	hasLayout: true
};