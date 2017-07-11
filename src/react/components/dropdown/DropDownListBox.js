import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
	maxWidthDropdownSizes,
	fixedWidthDropdownSizes,
} from './private/constants';
import {
	isVisible,
	intervalRunner,
	scrollTopPosition,
	isNarrowViewport,
} from './private/helpers';

/**
 * Utilize the intervalRunner to execute a callback when the list box and its children become visible to the user.
 *
 * @private
 * @param {DropDownListBox} listBox
 * @param {Function} callback
 */
function whenVisible(listBox, callback) {
	intervalRunner(() => isVisible(listBox.rootNode), callback);
}

/**
 * Presentational component that ensures the the contents of a dropdown are rendered with the
 * correct CSS classes.  This component is also what addes the mask to the DOM when going into
 * narrow viewport.
 *
 * @class DropDownListBox
 * @extends {PureComponent}
 */
class DropDownListBox extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			maxHeight: (props.style && props.style.maxHeight) || null,
		};
	}

	/**
	 * When -webkit-overflow-scrolling: touch is set in iOS, scrolling elements inside of a fixed
	 * position div have a decent (aka > 75%) chance of simply not updating when clicking on a
	 * checkbox after scrolling the content.  However, divs without this property don't have this
	 * problem.  I experimented with some CSS solutions, but didn't find anything that helped.
	 * That's why I've gone with this approach.  It's simple, -webkit-overflow-scrolling: touch
	 * causes the problem, so get rid of it while DOM updates happen, then add it back.
	 *
	 * I've added some simple safety checks to prevent JS errors and prevent this code from running
	 * in non-iOS browsers.  After all, creating a timer does actually affect performance...
	 *
	 * @author dev-johnsanders
	 *
	 * @memberof DropDownListBox
	 */
	iOSHack = () => {
		const content = this._scrollableContent;
		if (
			content != null &&
			content.style.hasOwnProperty('webkitOverflowScrolling') &&
			navigator != null &&
			navigator.userAgent.indexOf('Edge/') === -1
		) {
			content.style.webkitOverflowScrolling = 'auto';
			this._scrollStyleTimer = setTimeout(() => {
				content.style.webkitOverflowScrolling = '';
			}, 600);
		}
	}

	onAnimationEnd = event => {
		if (event.target === this.bodyNode) {
			if (this.props.animateOpen && this.props.onOpenAnimationEnd != null) {
				this.props.onOpenAnimationEnd(event);
			}
			if (this.props.animateClosed && this.props.onCloseAnimationEnd != null) {
				this.props.onCloseAnimationEnd(event);
			}
		}
	}

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
		whenVisible(this, () => this.rootNode.focus());
	}

	/**
	 * Find the child DOM node with given ID and adjust the list box's scroll position to
	 * ensure that it's in view.
	 *
	 * @public
	 * @param {String} id
	 */
	scrollIdIntoView(id) {
		whenVisible(this, () => {
			const element = document.getElementById(id);
			if (element != null) {
				const newScrollTop = scrollTopPosition(element, this._scrollableContent);
				// If you don't do this inside a setTimeout 0, it won't happen.  Not sure why
				// yet...
				setTimeout(() => this._scrollableContent.scrollTop = newScrollTop, 0);
			}
		});
	}

	/**
	 * Determine if the currently focused DOM node a child of this component.
	 *
	 * @public
	 * @returns {Boolean}
	 * @memberof DropDownListBox
	 */
	hasFocus() {
		return this.rootNode && this.rootNode.contains(document.activeElement);
	}

	render() {
		const listBox = this;
		const {
			className,
			isHidden,
			size,
			children,
			footer,
			id,
			qaHook,
			onKeyDown,
			style,
			header,
			fixedWidth,
			animateClosed,
			animateOpen,
			forceDesktop,
		} = listBox.props;
		const dropdownSizes = fixedWidth ? fixedWidthDropdownSizes : maxWidthDropdownSizes;
		const sizeClass = size ? dropdownSizes[size] : null;
		const classNames = cn('xui-dropdown-layout', sizeClass, className, {
			'xui-dropdown-is-open': !isHidden,
			'xui-dropdown-is-closing': animateClosed,
			'xui-dropdown-is-opening': animateOpen,
			'xui-dropdown--force-desktop': forceDesktop,
		});

		let maxHeight = null;
		if (isNarrowViewport()) {
			maxHeight = header == null ? '80vh' : '100vh';
		}

		return (
			<div
				data-automationid={qaHook}
				className={classNames}
				aria-hidden={isHidden}
				id={id}
				role="listbox"
				tabIndex={0}
				ref={n => listBox.rootNode = n}
				onKeyDown={onKeyDown}
				style={style}
				onAnimationEnd={listBox.onAnimationEnd}
			>
				<div className="xui-dropdown--mask"></div>
				<div
					ref={n => this.bodyNode = n}
					onMouseUp={this.iOSHack}
					className="xui-dropdown--body"
					style={{
						maxHeight
					}}
				>
					{header}
					<div
						className="xui-dropdown--scrollable-content"
						ref={sc => this._scrollableContent = sc}
					>
						{children}
					</div>
					{footer}
				</div>
			</div>
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
