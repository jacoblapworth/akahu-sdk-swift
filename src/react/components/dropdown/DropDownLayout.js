import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
	maxWidthDropdownSizes,
	fixedWidthDropdownSizes,
} from './private/constants';

/**
 * Presentational component that ensures the contents of a dropdown are rendered with the
 * correct CSS classes.  This component is also what adds the mask to the DOM when going into
 * narrow viewport.
 *
 * @class DropDownLayout
 * @extends {PureComponent}
 */
export default class DropDownLayout extends PureComponent {
	onAnimationEnd = event => {
		if (
			this.props.animateOpen &&
			this.props.onOpenAnimationEnd != null &&
			event.animationName === 'xui-dropdown-mobile-show'
		) {
			this.props.onOpenAnimationEnd(event);
		}
		if (
			this.props.animateClosed &&
			this.props.onCloseAnimationEnd != null &&
			event.animationName === 'xui-dropdown-mobile-hide'
		) {
			this.props.onCloseAnimationEnd(event);
		}
	}

	render() {
		const {
			animateClosed,
			animateOpen,
			children,
			className,
			fixedWidth,
			forceDesktop,
			id,
			isHidden,
			style,
			size,
			qaHook,
		} = this.props;
		const dropdownSizes = fixedWidth ? fixedWidthDropdownSizes : maxWidthDropdownSizes;
		const sizeClass = size ? dropdownSizes[size] : null;
		const classNames = cn('xui-dropdown-layout', sizeClass, className, {
			'xui-dropdown-is-open': !isHidden,
			'xui-dropdown-is-closing': animateClosed,
			'xui-dropdown-is-opening': animateOpen,
			'xui-dropdown--force-desktop': forceDesktop,
		});

		return (
			<div
				data-automationid={qaHook}
				className={classNames}
				id={id}
				onAnimationEnd={this.onAnimationEnd}
				style={style}
			>
				<div className="xui-dropdown--mask"></div>
				{children}
			</div>
		);
	}
}

DropDownLayout.defaultProps = {
	animateOpen: false,
	animateClosed: false,
	isHidden: false,
	fixedWidth: false,
	forceDesktop: false,
};


DropDownLayout.propTypes = {
	id: PropTypes.string,

	/** Whether or not the list box is hidden. */
	isHidden: PropTypes.bool,

	/** Callback for when animation has ended on open. */
	onOpenAnimationEnd: PropTypes.func,

	/** Callback for when animation has ended on close. */
	onCloseAnimationEnd: PropTypes.func,

	/** Will add the closing animation class */
	animateClosed: PropTypes.bool,

	/** Will add an opening animation class */
	animateOpen: PropTypes.bool,

	className: PropTypes.string,

	/** Applies the correct XUI class based on the chose size. Default will fits to children's width. */
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** Whether the fixed width class variant should be used for the size prop.  Does nothing without the size prop. */
	fixedWidth: PropTypes.bool,

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	style: PropTypes.object,

	children: PropTypes.node.isRequired,
	qaHook: PropTypes.string,
};