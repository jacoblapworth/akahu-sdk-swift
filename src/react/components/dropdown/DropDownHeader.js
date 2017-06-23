import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import back from '@xero/xui-icon/icons/back';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';

export default class DropDownHeader extends Component {
	constructor() {
		super();
		const header = this;

		header.onSecondaryClick = header.onSecondaryClick.bind(header);
		header.onPrimaryClick = header.onPrimaryClick.bind(header);
	}

	onSecondaryClick() {
		const { onSecondaryButtonClick } = this.props;
		onSecondaryButtonClick && onSecondaryButtonClick();
	}

	onPrimaryClick() {
		const { onPrimaryButtonClick } = this.props;
		onPrimaryButtonClick && onPrimaryButtonClick();
	}

	render() {
		const header = this;
		const {
			title,
			primaryButtonContent,
			isPrimaryButtonDisabled,
			displayPrimaryButton,
			secondaryButtonContent,
			onBackButtonClick,
			className,
			children,
			onlyShowForMobile
		} = header.props;
		const classes = cn('xui-dropdown--header', className);
		const headerClasses = cn(
			'xui-dropdown--header-container',
			{'xui-u-hidden-mobile-up': onlyShowForMobile}
		);

		const backButton = onBackButtonClick &&
			<XUIButton
				variant="icon"
				className="xui-button-icon-large xui-u-flex-none"
				onClick={()=>onBackButtonClick()}>
				<XUIIcon
					path={back}
				/>
			</XUIButton>;

		const secondaryButton = secondaryButtonContent &&
			<XUIButton
				size="small"
				onClick={header.onSecondaryClick}>
				{secondaryButtonContent}
			</XUIButton>;

		const primaryButton = displayPrimaryButton &&
			<XUIButton
				className={cn({"xui-margin-left-small": secondaryButtonContent})}
				size="small"
				variant="primary"
				onClick={header.onPrimaryClick}
				isDisabled={isPrimaryButtonDisabled} >
				{primaryButtonContent}
			</XUIButton>

		return (
			<div ref={h => header.rootNode = h} className={classes}>
				<div className={headerClasses}>
					<div className="xui-dropdown--header-leftcontent">
						{backButton}
						<div className="xui-heading-small xui-margin-left-small xui-text-truncated">
							{title}
						</div>
					</div>
					<div className="xui-dropdown--header-rightcontent">
						<div className="xui-margin-right-xsmall xui-dropdown--header-rightcontent">
							{secondaryButton}
							{primaryButton}
						</div>
					</div>
				</div>
				{Children.map(children, child => {
					return cloneElement(child, {
						className: child.props.className + " xui-dropdown--header-container"
					});
				})}
			</div>
		)
	}
}

DropDownHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/** @property {String} [title] If present, is used in the header. If non is present no header will be returned*/
	title: PropTypes.string.isRequired,

	/** @property {Function} [onPrimaryButtonClick] Callback for when the primary button is clicked */
	onPrimaryButtonClick: PropTypes.func,

	/** @property {[String, Node, Object]} [primaryButtonContent='Apply'] Content to render within the primary button */
	primaryButtonContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.element
	]),

	/** @property {Boolean} [displayPrimaryButton=true] Whether to display the primary button */
	displayPrimaryButton: PropTypes.bool,

	/** @property {Boolen} [isPrimaryButtonDisabled] Whether the primary button is disabled */
	isPrimaryButtonDisabled: PropTypes.bool,

	/** @property {Function} [onSecondaryButtonClick] Callback for when the secondary button is clicked */
	onSecondaryButtonClick: PropTypes.func.isRequired,

	/** @property {[String, Node, Object]} [secondaryButtonContent='Cancel'] Content to render within the secondary button */
	secondaryButtonContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.element
	]),

	/** @property {Function} [onBackButtonClick] Callback for when the back button is pressed (back button will not be rendered if this is not provided) */
	onBackButtonClick: PropTypes.func,

	/** @property {Boolean} [onlyShowForMobile=true] Whether the header should only be shown at mobile sizes. */
	onlyShowForMobile: PropTypes.bool
}

DropDownHeader.defaultProps = {
	primaryButtonContent: 'Apply',
	isApplyDisabled: false,
	secondaryButtonContent: 'Cancel',
	onlyShowForMobile: true
}
