import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';

import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import XUIInnerPill from './XUIInnerPill';
import {ns} from "../helpers/xuiClassNamespace";

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
			isFocused: false
		};

		this.toggleFocus = this.toggleFocus.bind(this);
	}

	toggleFocus() {
		this.setState(prevState => ({
			isFocused: !prevState.isFocused
		}));
	}

	render() {
		const pill = this;

		const {
			avatarProps,
			className,
			deleteButtonLabel,
			defaultLayout,
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

		const baseClass = `${ns}-pill`;

		const pillClasses = cn(
			className,
			baseClass,
			defaultLayout && `${baseClass}-layout`,
			isInvalid && `${baseClass}-is-invalid`,
			pill.state.isFocused && `${baseClass}-is-focused`,
			onDeleteClick && `${baseClass}-is-deleteable`
		);

		const closeButtonClasses = cn(
			`${baseClass}--button-icon`,
			isInvalid && `${ns}-button-icon-inverted`
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
				className={closeButtonClasses}
				variant="icon"
				onClick={onDeleteCallback}
				title={deleteButtonLabel}
				aria-label={deleteButtonLabel}
				qaHook={qaHook && `${qaHook}--delete`}
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
				<XUIInnerPill {...innerPillProps} />
				{deleteButton}
			</div>
		)
	}
}

const noop = () => {};

XUIPill.defaultProps = {
	deleteButtonLabel: 'Delete',
	defaultLayout: true,
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
	defaultLayout: PropTypes.bool,
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
