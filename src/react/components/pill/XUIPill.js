import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';

import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import InnerPill from './InnerPill';

/**
 * @private
 * @param {Function} callback
 * @param {Object} scope
 * @return {Function} the provided callback with the scope passed in as an argument.
 */
function returnCallbackWithScope(callback, scope) {
	return () => callback(scope);
}

export default class XUIPill extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isFocussed: false
		};

		this.toggleFocus = this.toggleFocus.bind(this);
	}

	toggleFocus() {
		this.setState(prevState => ({
			isFocussed: !prevState.isFocussed
		}));
	}

	render() {
		const pill = this;

		const {
			avatarProps,
			className,
			deleteButtonLabel,
			hasLayout,
			href,
			isInvalid,
			onClick,
			onDeleteClick,
			qaHook,
			secondaryText,
			target,
			title,
			value
		} = pill.props;

		const baseClass = 'xui-newpill';

		const pillClasses = cn(
			className,
			baseClass,
			{
				[`${baseClass}-layout`]: hasLayout,
				[`${baseClass}-is-invalid`] : isInvalid,
				[`${baseClass}-is-focussed`]: pill.state.isFocussed,
				[`${baseClass}-is-deleteable`]: onDeleteClick
			}
		);

		const innerPillProps = {
			avatarProps,
			href,
			onClick,
			qaHook,
			secondaryText,
			target,
			title,
			value
		};

		const onDeleteCallback = onDeleteClick && returnCallbackWithScope(onDeleteClick, pill);

		const deleteButton = onDeleteCallback && (
			<XUIButton
				className={`${baseClass}--button-icon`}
				variant="icon"
				onClick={onDeleteCallback}
				title={deleteButtonLabel}
				aria-label={deleteButtonLabel}
				qaHook={qaHook ? `deletePillButton-${qaHook}` : null}
			>
				<XUIIcon path={crossSmall} />
			</XUIButton>
		);

		return (
			<div
				className={pillClasses}
				onFocus={pill.toggleFocus}
				onBlur={pill.toggleFocus}
				data-automationid={qaHook}>
				<InnerPill {...innerPillProps} />
				{deleteButton}
			</div>
		)
	}
}

const noop = () => {};

XUIPill.defaultProps = {
	deleteButtonLabel: 'Delete',
	hasLayout: true,
	onClick: noop
};

XUIPill.propTypes = {
	/** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
	avatarProps: PropTypes.object,
	/** Apply classes to the outer Pill `div` element. */
	className: PropTypes.string,
	/** Specify an alternate label attribute for the delete button, defaults to 'Delete'. */
	deleteButtonLabel: PropTypes.string,
	/** Remove the XUI layout class by specifiying false. */
	hasLayout: PropTypes.bool,
	/** This will make the value an `anchor` element instead of a `span` element and adds the href as the link. */
	href: PropTypes.string,
	/** When invalid, displays the text in a red colour. */
	isInvalid: PropTypes.bool,
	/** Callback to fire when the main pill content is clicked. */
	onClick: PropTypes.func,
	/** Callback to fire when the delete pill button is clicked. When omitted, the delete button is also ommitted from the view. */
	onDeleteClick: PropTypes.func,
	/**`. */
	qaHook: PropTypes.string,
	/** When an `href` is supplied, adds a target attribute, else is ignored. */
	target: PropTypes.string,
	/** The title attribute to apply on the pill. */
	title: PropTypes.string,
	/** Adds a muted secondary text for the pill, appears before the main value. */
	secondaryText: PropTypes.string,
	/** The text to display inside the pill. */
	value: PropTypes.string
};
