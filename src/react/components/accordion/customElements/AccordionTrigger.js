import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import arrow from '@xero/xui-icon/icons/arrow';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';

export default class AccordionTrigger extends PureComponent {
	onKeyDown = event => {
		const spaceBar = 32;
		const enterKey = 13;
		const { keyCode } = event;

		if (keyCode === spaceBar || keyCode === enterKey) {
			this.props.onClick(event);
			event.preventDefault(); // prevent spacebar scroll.
		}
	}

	render() {
		const {
			action,
			custom,
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
					'xui-panel--section',
					'xui-u-flex',
					'xui-u-flex-verticallycentered',
					'xui-accordionitem-new--trigger', {
						'xui-accordionitem-new--trigger-is-open': isOpen,
					},
				)}
			>
				<div className="xui-accordionitem-new--trigger--caret">
					<XUIButton
						className="xui-button-icon-large"
						tabIndex={-1}
						variant="icon">
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
					{custom}
					{builtRightContent}
				</div>
			</div>
		);
	}
}

AccordionTrigger.propTypes = {
	qaHook: PropTypes.string,
	custom: PropTypes.node,
	onClick: PropTypes.func.isRequired,
	isOpen: PropTypes.bool,
	leftContent: PropTypes.node,
	primaryHeading: PropTypes.node,
	secondaryHeading: PropTypes.node,
	pinnedValue: PropTypes.node,
	action: PropTypes.node,
	overflow: PropTypes.node,
};
