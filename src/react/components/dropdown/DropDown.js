import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Guid from 'guid';
import cn from 'classnames';
import DropDownListBox from './DropDownListBox';
import DropDownPanel from './DropDownPanel';
import * as helpers from './private/helpers.js';

import './scss/_dropDown.scss';

export default class DropDown extends PureComponent {
	constructor(props) {
		super(props);

		const dropdown = this;
		const { isHidden, restrictFocus } = dropdown.props

		dropdown.dropdownId = props.id || Guid.raw();
		dropdown.onKeyDown = dropdown.onKeyDown.bind(dropdown);
		dropdown.onHighlightChange = dropdown.onHighlightChange.bind(dropdown);
		dropdown.highlightItem = dropdown.highlightItem.bind(dropdown);
		dropdown.lockScroll = dropdown.lockScroll.bind(dropdown);
		dropdown.unlockScroll = dropdown.unlockScroll.bind(dropdown);
		dropdown._restrictFocus = dropdown._restrictFocus.bind(dropdown);

		if (!isHidden && restrictFocus) {
			window.addEventListener('focus', dropdown._restrictFocus, true);
		}
	}

	componentDidUpdate(prevProps) {
		const dropdown = this;
		const { isHidden, hasKeyboardEvents, restrictFocus } = dropdown.props;
		if (!isHidden) {
			if (hasKeyboardEvents) {
				dropdown.listBox.focus();
			}
			const id = dropdown.panel && dropdown.panel.getHighlightedId();
			if (id) {
				dropdown.listBox.scrollIdIntoView(id);
			}
			if (prevProps.isHidden && restrictFocus) {
				window.addEventListener('focus', dropdown._restrictFocus, true);
			}
		} else if (!prevProps.isHidden) {
			window.removeEventListener('focus', dropdown._restrictFocus, true);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('focus', this._restrictFocus, true);
	}

	onKeyDown(e) {
		const dropdown = this;
		if (e.target === dropdown.listBox.rootNode || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 27) {
			dropdown.panel && dropdown.panel.onKeyDown(e);
			if (typeof dropdown.props.onKeyDown === 'function') {
				dropdown.props.onKeyDown(e);
			}
		}
	}

	// TODO: This should be extracted into a separate consumable once we go monorepo
	/**
	 * @private
	 * @param {Object} event - A focus change event which is set to be listened to by the window
	 * Limits the focusable elements to those within the dropdown
	 **/
	_restrictFocus(event) {
		const dropdown = this;
		const rootNode = dropdown.listBox.rootNode;
		const targetIsWindow = event.target === window;
		if (targetIsWindow || !rootNode.contains( event.target )) {
			event.stopPropagation();
			rootNode.focus();
		}
	}

	onHighlightChange(item) {
		const dropdown = this;
		if (typeof item !== 'undefined') {
			dropdown.listBox.scrollIdIntoView(item.props.id);
		}
		dropdown.props.onHighlightChange && dropdown.props.onHighlightChange(item);
	}

	highlightItem(item, event) {
		this.panel.highlightItem(item, event);
	}

	unlockScroll(){
		helpers.unlockScroll();
	}

	lockScroll(){
		helpers.lockScroll()
	}

	render() {
		const dropdown = this;
		const {
			size,
			footer,
			className,
			isHidden,
			children,
			qaHook,
			onSelect,
			ignoreKeyboardEvents,
			style,
			header,
			onCloseAnimationEnd
		} = dropdown.props;

		const dropdownClasses = cn( {'xui-dropdown-fullheight' : header}, className)
		return (
			<DropDownListBox
				id={dropdown.dropdownId}
				isHidden={isHidden}
				footer={footer}
				header={header}
				className={dropdownClasses}
				size={size}
				qaHook={qaHook}
				ref={c => dropdown.listBox = c}
				onKeyDown={dropdown.onKeyDown}
				style={style}
				onCloseAnimationEnd={onCloseAnimationEnd}
			>
				<DropDownPanel
					onSelect={onSelect}
					ignoreKeyboardEvents={ignoreKeyboardEvents}
					onHighlightChange={dropdown.onHighlightChange}
					ref={dp => dropdown.panel = dp}>
					{children}
				</DropDownPanel>
			</DropDownListBox>
		);
	}
}

DropDown.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	style: PropTypes.object,

	/** @property {Boolean} [isHidden] default false*/
	isHidden: PropTypes.bool,

	/** @property {String} [size] Takes 'small', 'medium' or 'large' and applies correct XUI class based on these. Default will fits to children's width*/
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** @property {Array} [ignoreKeyboardEvents] Pass in an array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** @property {String} id of the list */
	id: PropTypes.string,

	/** @property {Element} [header] The header element */
	header: PropTypes.element,

	/** @property {Element} [footer] Items to be added to the menu's footer */
	footer: PropTypes.element,

	/** @property {Function} enable a generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** @property {boolean} [hasKeyboardEvents=true] Whether or not the dropdown should take focus and handle keyboard events automatically */
	hasKeyboardEvents: PropTypes.bool,

	/** @property {Function} [onKeyDown] Callback for adding additional onKeyPress funcitonality */
	onKeyDown: PropTypes.func,

	/** @property {Boolean} [restrictFocus=true] Whether focus should be restricted to the dropdown while it's open */
	restrictFocus: PropTypes.bool,

	/** @property {function} [onHighlightChange] Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func,
	onCloseAnimationEnd: PropTypes.func
};

DropDown.defaultProps = {
	ignoreKeyboardEvents: [],
	isHidden: false,
	hasKeyboardEvents: true,
	restrictFocus: true
};
