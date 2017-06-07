import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { isVisible,
	intervalRunner,
	scrollTopPosition,
	isRendered,
	compose,
	isNarrowViewport
} from './private/helpers';


const maxWidthDropdownSizes = {
	small: 'xui-dropdown-small',
	medium: 'xui-dropdown-medium',
	large: 'xui-dropdown-large',
	xlarge: 'xui-dropdown-xlarge'
};

const fixedWidthDropdownSizes = {
	small: 'xui-dropdown-fixed-small',
	medium: 'xui-dropdown-fixed-medium',
	large: 'xui-dropdown-fixed-large',
	xlarge: 'xui-dropdown-fixed-xlarge'
}

/**
 * Taking the max height passed in through the style prop, we check it's defined and not null. If so, subtract the
 * height of the rendered footer to return the true max height of the dropdown body.
 *
 * @private
 * @param {DropDownListBox} listBox
 * @returns {Number|null}
 */
const calculateMaxHeight = listBox => {
	const { style } = listBox.props;

	if (!style || style.maxHeight == null ){
		return null;
	}

	const maxHeight = style && style.maxHeight;
	const footerHeight = listBox.footer ? listBox.footer.rootNode.offsetHeight : (maxHeight/100) * 20;
	// When a header is provided we know we should allow the 20vh buffer for the
	// mask so base the header height on 20% of the max height, which is 100vh.
	// Creating the 20vh buffer we need to display the mask.
	const headerHeight = listBox.header ? listBox.header.rootNode.offsetHeight : 0;

	if(!listBox.header){
		return maxHeight - ((maxHeight/100) * 20);
	}

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
const setMaxHeight = listBox => {
	const isFooterRendered = () => isRendered(listBox.footer.rootNode);
	const isHeaderRendered = () => isNarrowViewport() ? isRendered(listBox.header.rootNode): true;
	const isScrollableContentRendered = () => isRendered(listBox._scrollableContent);
	const maxHeight = calculateMaxHeight(listBox);

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

class DropDownListBox extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			maxHeight: (props.style && props.style.maxHeight) || null
		};
	}

	componentDidUpdate(nextProps) {
		const listBox = this;

		//The timeout length of 1010 is to allow for the XUI animations to end when
		// the dropdown when teh dropdown is closing
		if(listBox.props.isHidden && !nextProps.isHidden) {
			setTimeout(() => {
				listBox.props.onCloseAnimationEnd && listBox.props.onCloseAnimationEnd();
			}, 1010);
		}

		setMaxHeight(listBox);
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
	 * Find the child DOM node with given ID and adjust the list box's scroll position to ensure that it's in view.
	 *
	 * @param {String} id
	 */
	scrollIdIntoView(id) {
		whenVisible(this, () => {
			const element = document.getElementById(id);
			if (element) {
				this._scrollableContent.scrollTop = scrollTopPosition(element, this._scrollableContent);
			}
		});
	}

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
			fixedWidth } = listBox.props;
		const dropdownSizes = fixedWidth ? fixedWidthDropdownSizes : maxWidthDropdownSizes;
		const sizeClass = size ? dropdownSizes[size] : null;
		const classNames = cn(
			'xui-dropdown-layout',
			sizeClass,
			{
				'xui-dropdown-is-open': !isHidden,
				'xui-dropdown-is-open xui-dropdown-is-closing': isHidden
			},
			className);
		/*
		Clone the style attributes passed in so we can set the maxHeight to null, effectively removing it from the dropdown
		container. Instead adding this from state to the dropdown body element.
		 */
		const outerStyle = {...style};
		outerStyle.maxHeight = null;

		const bodyStyles = {
			maxHeight: listBox.state.maxHeight,
			height: listBox.state.height
		};

		const clonedFooter = footer && cloneElement(footer, {
			ref: compose(footer.ref, c => listBox.footer = c)
		});

		const clonedHeader = header && cloneElement(header, {
			ref: compose(header.ref, c => listBox.header = c)
		});

		return (
			<div
				data-automationid={qaHook}
				className={classNames}
				aria-hidden={isHidden}
				id={id}
				role='listbox'
				tabIndex={0}
				ref={n => listBox.rootNode = n}
				onKeyDown={onKeyDown}
				style={outerStyle}
			>
				<div className="xui-dropdown--mask"></div>
				<div className="xui-dropdown--body">
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
	style: PropTypes.object,

	/** @property {Boolean} [isHidden=false] default false*/
	isHidden: PropTypes.bool,

	/** @property {String} [size] Takes 'small', 'medium', 'large', 'xlarge', and applies correct XUI class based on these. Default will fit to children's width */
	size: PropTypes.oneOf(Object.keys(maxWidthDropdownSizes)),

	/** @property {Element} [footer] Items to be added to the menu's footer */
	footer: PropTypes.element,

	/** @property {Element} [header] Items to be added to the menu's header in narrow view */
	header: PropTypes.element,

	/** @property {String} [id] Given id of the menu */
	id: PropTypes.string,

	/** @property {Function} [onKeyDown] keydown event handler */
	onKeyDown: PropTypes.func,

	/** @property {Function} [onCloseAnimationEnd] callback for when animation has ended on close. */
	onCloseAnimationEnd: PropTypes.func,

	/** @property {Boolean} [fixedWidth] Whether the fixed width class variant should be used */
	fixedWidth: PropTypes.bool,
};

DropDownListBox.defaultProps = {
	isHidden: false
};

export { DropDownListBox as default, maxWidthDropdownSizes as dropdownSizes };
