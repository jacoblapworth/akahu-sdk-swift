import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import verge from 'verge';
import {
	maxWidthDropdownSizes,
	fixedWidthDropdownSizes,
} from './private/constants';
import {
	isVisible,
	intervalRunner,
	scrollTopPosition,
	isRendered,
	compose,
	isNarrowViewport,
} from './private/helpers';

/**
 * Taking the max height passed in through the style prop, we check it's defined and not null. If so, subtract the
 * height of the rendered footer to return the true max height of the dropdown body.
 *
 * @private
 * @param {DropDownListBox} listBox
 * @returns {Number|null}
 */
const calculateBodyMaxHeight = listBox => {
	const { style } = listBox.props;

	/*
	For mobile dropdowns, we have some different requirements.
	1. If a header is present, the maxHeight of the entire dropdown is 100vh.
	2. If a header is not present, the maxHeight of the entire dropdown is 80vh to allow
			users to cancel by clicking on the mask.
	3. If a footer is present, we need to account for that in the maxHeight of the body.
	*/
	if (isNarrowViewport()) {
		let maxHeight = verge.viewportH();
		if (listBox.header == null) {
			maxHeight *= 0.8;
		}
		if (listBox.footer != null) {
			maxHeight -= listBox.footer.rootNode.offsetHeight;
		}
		return maxHeight;
	}

	if (style == null || style.maxHeight == null) {
		return null;
	}

	const maxHeight = style.maxHeight;
	const footerHeight = listBox.footer != null ? listBox.footer.rootNode.offsetHeight : 0;
	const headerHeight = listBox.header != null ? listBox.header.rootNode.offsetHeight : 0;

	return maxHeight - footerHeight - headerHeight;
};

/**
 * Attempts to set the maxHeight state so it can be set on the dropdown body element. If the footer isn't yet
 * rendered the component will check again several times over 5 seconds. If after that it's still not rendered, it
 * will check again several time over half a second. If after this it's still not rendered it will no longer keep
 * checking.
 *
 * If successfully rendered, we will immediately stop checking if the footer is rendered and go calculate the
 * max height.
 *
 * @private
 * @param {DropDownListBox} listBox
 */
const setBodyMaxHeight = listBox => {
	const isFooterRendered = () => isRendered(listBox.footer.rootNode);
	const isHeaderRendered = () => isNarrowViewport() ? isRendered(listBox.header.rootNode): true;
	const isScrollableContentRendered = () => isRendered(listBox._scrollableContent);
	const maxHeight = calculateBodyMaxHeight(listBox);

	const setter = () => {
		listBox.setState({
			maxHeight,
			height: isNarrowViewport() && listBox.header ? maxHeight : 'auto'
		});
	};

	//Return true if both the footer and header are renderered. However, we may
	//only have either a header or footer. Therefore just return true if there
	//isn't an element to check is rendered.
	const areElementsRendered = () => (listBox.footer ? isFooterRendered() : true) && (listBox.header ? isHeaderRendered() : true) && isScrollableContentRendered();

	intervalRunner(areElementsRendered, setter);
};

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

	componentDidUpdate() {
		setBodyMaxHeight(this);
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

		const bodyStyles = {
			maxHeight: listBox.state.maxHeight,
			height: listBox.state.height
		};

		const clonedFooter = footer != null && cloneElement(footer, {
			ref: compose(footer.ref, c => listBox.footer = c)
		});

		const clonedHeader = header != null && cloneElement(header, {
			ref: compose(header.ref, c => listBox.header = c)
		});

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
				<div ref={n => this.bodyNode = n} className="xui-dropdown--body">
					{clonedHeader}
					<div
						className="xui-dropdown--scrollable-content"
						style={bodyStyles}
						ref={sc => this._scrollableContent = sc}
					>
						{children}
					</div>
					{clonedFooter}
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
