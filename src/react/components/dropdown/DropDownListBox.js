import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DropDownLayout from './DropDownLayout';
import DropDownPanel from './DropDownPanel';
import {
	maxWidthDropdownSizes,
} from './private/constants';

/**
 * DEPRECATED in XUI 11.  Please use DropDownLayout and/or DropDownPanel instead
 *
 * Presentational component that ensures the contents of a dropdown are rendered with the
 * correct CSS classes.  This component is also what adds the mask to the DOM when going into
 * narrow viewport.
 *
 * @class DropDownListBox
 * @extends {PureComponent}
 */
class DropDownListBox extends PureComponent {
	/**
	 * Attempts to focus this element.  If the element either doesn't exist yet or is set to "visibility: isHidden", the
	 * component will try to focus the element again several times over five seconds.  If it still can't after that
	 * component will try to focus the element again several times over a half second.  If it still can't after that
	 * amount of time, then it'll stop trying.  This is to ensure that the DropDown can set focus on this ListBox while
	 * the DropDown is going from isHidden to visible.  An intermediate stage where the  ListBox's parent is set to
	 * "visibility: isHidden" is necessary to ensure that accurate measurements of the DOM nodes can take place and the
	 * DropDown can be properly positioned.  This will basically attempt to wait that process out and set focus after
	 * everything is done.
	 *
	 * @public
	 */
	focus() {
		return this.panel != null && this.panel.focus();
	}

	/**
	 * Find the child DOM node with given ID and adjust the list box's scroll position to
	 * ensure that it's in view.
	 *
	 * @public
	 * @param {String} id
	 */
	scrollIdIntoView(id) {
		return this.panel != null && this.panel.scrollIdIntoView(id);
	}

	/**
	 * Determine if the currently focused DOM node a child of this component.
	 *
	 * @public
	 * @returns {Boolean}
	 * @memberof DropDownListBox
	 */
	hasFocus() {
		return this.panel != null && this.panel.hasFocus();
	}

	render() {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn('[DEPRECATED] - This component has been deprecated and will be removed in XUI 12.');
		}
		const newProps = {};
		Object.keys(this.props).forEach(name => {
			if (name !== 'children') {
				newProps[name] = this.props[name];
			}
		});
		return (
			<DropDownLayout {...newProps}>
				<DropDownPanel {...newProps} ref={c => this.panel = c}>
					{this.props.children}
				</DropDownPanel>
			</DropDownLayout>
		);
	}

}

DropDownListBox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Inline CSS styles to add to the root DOM node of this component. */
	style: PropTypes.object,

	/** Whether or not the list box is hidden. */
	isHidden: PropTypes.bool,

	/** Will add the closing animation class */
	animateClosed: PropTypes.bool,

	/** Will add an opening animation class */
	animateOpen: PropTypes.bool,

	/** Callback for when animation has ended on open. */
	onOpenAnimationEnd: PropTypes.func,

	/** Callback for when animation has ended on close. */
	onCloseAnimationEnd: PropTypes.func,

	/** Applies the correct XUI class based on the chose size. Default will fits to children's width. */
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** Items to be added to the menu's footer. */
	footer: PropTypes.element,

	/** Items to be added to the menu's header. */
	header: PropTypes.element,

	/** DOM ID of the menu */
	id: PropTypes.string,

	/** keydown event handler */
	onKeyDown: PropTypes.func,

	/** Whether the fixed width class variant should be used for the size prop.  Does nothing without the size prop. */
	fixedWidth: PropTypes.bool,

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,
};

DropDownListBox.defaultProps = {
	animateOpen: false,
	animateClosed: false,
	isHidden: false,
	fixedWidth: false,
	forceDesktop: false,
};

export { DropDownListBox as default, maxWidthDropdownSizes as dropdownSizes };
