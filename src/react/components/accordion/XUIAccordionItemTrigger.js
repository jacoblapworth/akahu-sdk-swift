import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';
import arrow from '@xero/xui-icon/icons/arrow';

export default class XUIAccordionItemTrigger extends PureComponent {
	onKeyDown = event => {
		const spaceBar = 32;
		const enterKey = 13;
		const { keyCode } = event;

		if (keyCode === spaceBar || keyCode === enterKey) {
			this.props.onClick(event);
			event.preventDefault(); // prevent spacebar scroll
		}
	}

	render() {
		const {
			action,
			children,
			isOpen,
			leftContent,
			onClick,
			overflow,
			pinnedValue,
			qaHook,
			primaryHeading,
			secondaryHeading
		} = this.props;

		const builtPrimaryHeading = primaryHeading && (
			<div className="xui-heading-small xui-text-wordbreak">
				{primaryHeading}
			</div>
		);

		const builtSecondaryHeading = secondaryHeading && (
			<div className="xui-textcolor-muted xui-text-wordbreak">
				{secondaryHeading}
			</div>
		);

		const builtPinnedValue = pinnedValue && (
			<div className="xui-heading-small xui-text-deemphasis xui-padding-vertical-small xui-margin-right-small">
				{pinnedValue}
			</div>
		);

		const builtRightContent = (builtPinnedValue || action || overflow) && (
			<div className="xui-accordionitem-new--trigger--rightcontent">
				{builtPinnedValue}
				{action}
				{overflow}
			</div>
		);

		return (
			<div
				data-automationid={qaHook}
				onClick={onClick}
				onKeyDown={this.onKeyDown}
				tabIndex="0"
				role="button"
				className={cn(
					'xui-panel--section xui-u-flex xui-u-flex-verticallycentered xui-accordionitem-new--trigger',
					{
						'xui-accordionitem-new--trigger-is-open': isOpen,
					},
				)}
			>
				<div className="xui-accordionitem-new--trigger--caret">
					<XUIButton className="xui-button-icon-large" tabIndex={-1} variant="icon">
						<XUIIcon
							className="xui-u-flex-inherit xui-transition"
							path={arrow}
							rotation={isOpen ? 180 : null}
						/>
					</XUIButton>
				</div>
				{leftContent}
				<div className="xui-u-flex xui-u-flex-grow xui-u-flex-verticallycentered">
					<div className="xui-padding-vertical xui-u-flex-grow">
						{builtPrimaryHeading}
						{builtSecondaryHeading}
					</div>
					{children}
					{builtRightContent}
				</div>
			</div>
		);
	}
}

XUIAccordionItemTrigger.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	// Click / keydown callback. When used within XUIAccordion, this should trigger the accordion item to open
	onClick: PropTypes.func.isRequired,
	// Accordion item trigger will display different based on this value
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Left most consumer specified component option, sits to the right of the caret.
	 * Typically an `avatar`, `checkbox` or `rollover checkbox` component
	 */
	leftContent: PropTypes.node,
	// Plain text heading
	primaryHeading: PropTypes.node,
	// Plain text secondary heading
	secondaryHeading: PropTypes.node,
	// Text pinned to right side of the accordion item trigger
	pinnedValue: PropTypes.node,
	// Optional actions to be right aligned. Use the XUIActions component.
	action: PropTypes.node,
	// Any component passed as right most content, typically a `dropdown toggled` component
	overflow: PropTypes.node,
};
