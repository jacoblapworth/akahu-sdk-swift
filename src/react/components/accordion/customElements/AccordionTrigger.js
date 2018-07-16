import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from "../../helpers/xuiClassNamespace";
import arrowPath from '@xero/xui-icon/icons/arrow';
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

		const primaryHeadingScaffold = primaryHeading && (
			<div className={`${ns}-accordiontrigger-new--primaryheading`}>
				{primaryHeading}
			</div>);

		const secondaryHeadingScaffold = secondaryHeading && (
			<div className={`${ns}-accordiontrigger-new--secondaryheading`}>
				{secondaryHeading}
			</div>);

		const pinnedValueScaffold = pinnedValue && (
			<div className={`${ns}-accordiontrigger-new--pinnedvalue`}>
				{pinnedValue}
			</div>);

		const builtRightContent = (pinnedValueScaffold || action || overflow) && (
			<div className={`${ns}-accordiontrigger-new--rightcontent`}>
				{pinnedValueScaffold}
				{action}
				{overflow}
			</div>);

		return (
			<div
				data-automationid={qaHook}
				onClick={onClick}
				onKeyDown={this.onKeyDown}
				tabIndex="0"
				role="button"
				className={cn(`${ns}-accordiontrigger-new`, {
					[`${ns}-accordiontrigger-new-is-open`]: isOpen,
				})}>
				<div className={`${ns}-accordiontrigger-new--arrow`}>
					<XUIIcon
						path={arrowPath}
						rotation={isOpen ? 180 : null}
					/>
				</div>

				{leftContent}

				<div className={`${ns}-accordiontrigger-new--content`}>
					<div className={`${ns}-accordiontrigger-new--headings`}>
						{primaryHeadingScaffold}
						{secondaryHeadingScaffold}
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
