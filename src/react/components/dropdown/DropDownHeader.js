import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import back from '@xero/xui-icon/icons/back';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';

/**
 * Wrapper component for the content of a dropdown header.  Certain elements (back button, title, etc)
 * are added and controlled via props, but children nodes are also allowed for extra customization.
 *
 * @export
 * @class DropDownHeader
 * @extends {PureComponent}
 */
export default class DropDownHeader extends PureComponent {
	render() {
		const {
			children,
			className,
			qaHook,
			title,
			onPrimaryButtonClick,
			onSecondaryButtonClick,
			primaryButtonContent,
			secondaryButtonContent,
			isPrimaryButtonDisabled,
			isSecondaryButtonDisabled,
			onBackButtonClick,
			onlyShowForMobile,
			leftContent,
			rightContent
		} = this.props;

		const classes = cn('xui-dropdown--header', className);
		const headerClasses = cn(
			'xui-dropdown--header-container',
			{ 'xui-u-hidden-medium xui-u-hidden-wide': onlyShowForMobile }
		);

		const backButton = onBackButtonClick ?
			<XUIButton
				variant="icon"
				className="xui-button-icon-large xui-u-flex-none"
				onClick={onBackButtonClick}
				qaHook={qaHook != null ? `${qaHook}--button-back` : null}
			>
				<XUIIcon path={back} />
			</XUIButton> : null;

		const secondaryButton = onSecondaryButtonClick ?
			<XUIButton
				size="small"
				onClick={onSecondaryButtonClick}
				isDisabled={isSecondaryButtonDisabled}
				qaHook={qaHook != null ? `${qaHook}--button-secondary` : null}
			>
				{secondaryButtonContent}
			</XUIButton> : null;

		const primaryButton = onPrimaryButtonClick ?
			<XUIButton
				className={cn({'xui-margin-left-small': secondaryButtonContent})}
				size="small"
				variant="primary"
				onClick={onPrimaryButtonClick}
				isDisabled={isPrimaryButtonDisabled}
				qaHook={qaHook != null ? `${qaHook}--button-primary` : null}
			>
				{primaryButtonContent}
			</XUIButton> : null;

		const titleSection = titleSection ?
			<div
				className="xui-heading-small xui-margin-left-small xui-text-truncated"
				data-automationid={qaHook != null ? `${qaHook}-title`: null}
			>
				{title}
			</div> : null;

		const leftHeader = (backButton || title || leftContent) ?
			(
				<div className="xui-dropdown--header-leftcontent">
					{backButton}
					{leftContent}
					{title}
				</div>
			) : null;

		const rightHeader = (secondaryButton || primaryButton || rightContent) ?
			(
				<div className="xui-dropdown--header-rightcontent">
					<div className="xui-margin-right-xsmall xui-dropdown--header-rightcontent">
						{rightContent}
						{secondaryButton}
						{primaryButton}
					</div>
				</div>
			) : null;

		const header = (leftHeader || rightHeader) ?
			(
				<div className={headerClasses}>
					{leftHeader}
					{rightHeader}
				</div>
			) : null;

		return (
			<div
				ref={h => this.rootNode = h}
				className={classes}
				data-automationid={qaHook}
			>
				{header}
				{Children.map(children, child => (
					<div className="xui-dropdown--header-container">
						{child}
					</div>
				))}
			</div>
		)
	}
}

DropDownHeader.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,

	/** If present, is used in the header */
	title: PropTypes.string,

	/** Callback for when the primary button is clicked */
	onPrimaryButtonClick: PropTypes.func,

	/** Callback for when the secondary button is clicked */
	onSecondaryButtonClick: PropTypes.func,

	/** Content to render within the primary button */
	primaryButtonContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.element
	]),

	/** Content to render within the secondary button */
	secondaryButtonContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.element
	]),

	/** Whether the primary button is disabled */
	isPrimaryButtonDisabled: PropTypes.bool,

	/** Whether the primary button is disabled */
	isSecondaryButtonDisabled: PropTypes.bool,

	/** Callback for when the back button is pressed (back button will not be rendered if this is not provided) */
	onBackButtonClick: PropTypes.func,

	/** Whether the header should only be shown at mobile sizes. */
	onlyShowForMobile: PropTypes.bool,

	/** Content to be added on the left side of the header, will come after the back button if one is present */
	leftContent: PropTypes.node,

	/** Content to be added on the right side of the header, will come before the primary/secondary button present */
	rightContent: PropTypes.node
};

DropDownHeader.defaultProps = {
	primaryButtonContent: 'Apply',
	secondaryButtonContent: 'Cancel',
	onlyShowForMobile: false,
};
