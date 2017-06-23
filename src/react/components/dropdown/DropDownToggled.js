import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Positioning from '../positioning/Positioning';
import { compose, lockScroll, unlockScroll, isNarrowViewport, isScrollLocked } from './private/helpers';

function focusTrigger(virtualTrigger, triggerDOM) {
	// if there is a focus API, use it, else set focus to the given trigger
	if (virtualTrigger && typeof virtualTrigger.focus === 'function') {
		virtualTrigger.focus();
	} else if (triggerDOM != null && typeof triggerDOM.focus === 'function') {
		triggerDOM.focus();
	}
}

/**
 * HOC to wrap the passed in Dropdown & TriggerComponent elements. Adds functionality to toggle the list open/closed
 * based on click of the TriggerComponent.
 */
export default class DropDownToggled extends PureComponent {
	constructor(props) {
		super(props);
		const ddt = this;

		ddt.state = {
			isHidden: props.isHidden,
			isPortalHidden: props.isHidden,
			activeDescendant: null,
			isNarrowViewport: isNarrowViewport(),
			isOpening: false
		};
		[
			'openDropDown',
			'closeDropDown',
			'toggle',
			'onMouseDown',
			'onTriggerKeyDown',
			'onKeyDown',
			'onSelect',
			'onHighlightChange',
			'onCloseAnimationEnd',
			'onOpen',
			'onResize',
			'triggerClickHandler'
		].forEach(fn => {
			ddt[fn] = ddt[fn].bind(ddt);
		});

		ddt.onDropDownKeyDown = ddt.onDropDownKeyDown.bind(ddt);
	}

	/**
	 * @public
	 *
	 * Attaches the event listeners based on state.
	 * Listeners attached on keydown and mousedown to control the open/close keyboard shortcuts of the list.
	 */
	componentDidMount() {
		const ddt = this;
		if (!ddt.state.isHidden) {
			window.addEventListener('mousedown', ddt.onMouseDown);
			window.addEventListener('resize', ddt.onResize);
			ddt.forceUpdate();
		}
	}

	/**
	 * @public
	 *
	 * Remove the event listeners attached in componentDidMount.
	 */
	componentWillUnmount() {
		window.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('resize', this.onResize);
	}

	/**
	 * @public
	 *
	 * Call onOpen and onClosed callbacks based on hidden state.
	 * We're doing this here as we should call these after they've actually
	 * rendered open or closed, not just with the state change.
	 *
	 * @param {Object} prevProps
	 * @param {Object} prevState
	 */
	componentDidUpdate(prevProps, prevState) {
		const ddt = this;
		const { props, state } = ddt;

		!state.isHidden && !props.disableScrollLocking && isNarrowViewport() && !isScrollLocked() && lockScroll();

		if (state.isHidden !== prevState.isHidden) {
			const callback = state.isHidden ? props.onClose : ddt.onOpen;
			if (callback) {
				callback();
			}

			if (!state.isHidden) {
				window.addEventListener('mousedown', ddt.onMouseDown);
				window.addEventListener('resize', ddt.onResize);
			} else {
				window.removeEventListener('mousedown', ddt.onMouseDown);
				window.removeEventListener('resive',ddt.onResize);
			}
		}
	}

	onOpen() {
		const ddt = this;
		const { onOpen } = ddt.props;

		ddt.setState({
			isOpening: true
		});

		onOpen && onOpen();
	}


	/**
	 * @public
	 * Set the state as not hidden in order to toggle the list open.
	 */
	openDropDown() {
		this.setState({
			isHidden: false,
			isPortalHidden: false
		});
	}

	/**
	 * @public
	 * Set the state as not hidden in order to toggle the list open.
	 */
	closeDropDown() {
		const ddt = this;
		const { firstChild: trigger } = ddt.wrapper;

		//Timeout to give any callbacks a chance to fire before the dropdown is hidden.
		setTimeout(() => {
			focusTrigger(ddt.trigger, trigger);
			ddt.setState({
				isHidden: true,
				isOpening: false
			});

		}, 80);
	}

	/**
	 * Determine if the dropdown is currently open.
	 *
	 * @public
	 * @returns {boolean}
	 */
	isDropDownOpen() {
		return !this.state.isHidden;
	}

	/**
	 * @public
	 * A handy method exposed to easily toggle the list based on internal state.
	 */
	toggle() {
		const ddt = this;
		ddt.state.isHidden ? ddt.openDropDown() : ddt.closeDropDown();
	}

	/**
	 * @private
	 * If user clicks on the trigger, we may want to open and/or toggle the dropdown.
	 *
	 * @memberof DropDownToggled
	 */
	triggerClickHandler() {
		switch (this.props.triggerClickAction) {
			case 'toggle':
				this.toggle();
				break;
			case 'open':
				this.openDropDown();
				break;
		}
	}

	/**
	 * @public
	 * @param {KeyboardEvent} e key down event object
	 *
	 * Will close the list if either esc or tab keys are pressed on keydown.
	 * Will tab to next index if tab key is pressed
	 */
	onKeyDown(e) {
		if (!this.state.isHidden && (e.keyCode === 9 || e.keyCode === 27)) {
			// If the user doesn't want to close when the tab key is hit, don't
			if (e.keyCode !== 9 || this.props.closeOnTab) {
				this.closeDropDown();
			}
		}
	}

	/**
	 * @public
	 * @param {KeyboardEvent} e key down event object
	 *
	 * Will close the dropdown if the esc key is pressed within the dropdown.
	 */
	onDropDownKeyDown(e) {
		if (!this.state.isHidden && (e.keyCode === 27 || e.keyCode === 9)) {
			if (e.keyCode !== 9 || this.props.closeOnTab) {
				this.closeDropDown();
			}
		}
	}

	/**
	 * @public
	 * @param {KeyboardEvent} e key down event object
	 *
	 * Will open the list if the down arrow is pressed on keydown.
	 */
	onTriggerKeyDown(e) {
		if (e.keyCode === 40 && this.state.isHidden) {
			e.preventDefault();
			this.openDropDown();
		}
	}

	/**
	 * Fires when the window triggers a mouse down event
	 * @public
	 * @param {MouseEvent} e
	 */
	onMouseDown(e) {
		const ddt = this;
		const { firstChild: trigger } = ddt.wrapper;
		const dropdown = ddt.dropdown && document.getElementById(ddt.dropdown.dropdownId);

		/**
		* Summary fo below checks:
		* - state has marked the portal and dropdown as not hidden
		* - AND the dropdown has rendered and we can match teh click target to the dropdown
		* - AND trigger has also rendered and can match with target
		* - OR if the click target is the mask
		*/
		if (!ddt.state.isHidden && !ddt.state.isPortalHidden
				&& dropdown && !dropdown.contains(e.target)
				&& trigger && !trigger.contains(e.target)
				|| e.target.classList.contains('xui-dropdown--mask')) {
			ddt.closeDropDown();
		}

	}

	/**
	 * Sets the activeDescendant state to be the id of the item selected so this can be set in the corresponding trigger attribute.
	 * @param {Event} e
	 * @param {ReactElement} item
	 */
	onSelect(e, item) {
		const ddt = this;

		ddt.setState({
			activeDescendant: item.props.id
		});

		if (ddt.props.closeOnSelect) {
			ddt.closeDropDown();
		}
	}

	/**
	 * Ensures that the activeDescendant aria attribute changes on the trigger when the highlighted element changes.
	 *
	 * @param {ReactElement} item
	 */
	onHighlightChange(item) {
		this.setState({
			activeDescendant: item.props.id
		});
	}

	/**
	* @public
	*
	* Will fire when the animation is complete on the dropdown so we can tell the portal
	* to remove itself from the DOM.
	*/
	onCloseAnimationEnd() {
		const ddt = this;

		if (ddt.state.isHidden){
			const {disableScrollLocking, onCloseAnimationEnd} = ddt.props;
			!disableScrollLocking && unlockScroll();
			onCloseAnimationEnd && onCloseAnimationEnd();

			ddt.setState({
				isPortalHidden: true
			});
		}
	}

	/**
	* @public
	*
	* Will manage state of isNarrowViewport so we can test if the viewport has changed
	* from a narrow viewport to wider the narrow viewport size or vice versa.
	*/
	onResize(){
		const ddt = this;

		ddt.setState(prevState => {
			if ('prev, new', prevState.isNarrowViewport !== isNarrowViewport()){
				ddt.closeDropDown();

				return {
					isNarrowViewport: isNarrowViewport()
				}
			}
		});
	}

	render() {
		const ddt = this;
		const { className, trigger, dropdown, restrictToViewPort } = ddt.props;
		const ariaProps = {
			'aria-activedescendant': ddt.state.activeDescendant,
			'aria-haspopup': true,
			'aria-controls': dropdown.dropdownId
		};

		const clonedTrigger = React.cloneElement(trigger, {
			ref: compose(trigger.ref, c => ddt.trigger = c),
			onClick: compose(trigger.props.onClick, ddt.triggerClickHandler),
			onKeyDown: compose(trigger.props.onKeyDown, ddt.onTriggerKeyDown),
			...ariaProps
		});

		const clonedDropdown = React.cloneElement(dropdown, {
			ref: compose(dropdown.ref, c => ddt.dropdown = c),
			isHidden: ddt.state.isHidden,
			onSelect: compose(dropdown.props.onSelect, ddt.onSelect),
			onHighlightChange: compose(dropdown.props.onHighlightChange, ddt.onHighlightChange),
			onCloseAnimationEnd: compose(dropdown.onCloseAnimationEnd, ddt.onCloseAnimationEnd),
			onKeyDown: compose(dropdown.props.onKeyDown, ddt.onDropDownKeyDown),
			className: cn(dropdown.props.className, {
				'xui-dropdown-is-opening': ddt.state.isOpening
			})
		});

		return (
			<div
				ref={c => ddt.wrapper = c}
				className={cn('dropdown-toggled-wrapper', className)}
				onKeyDown={ddt.onKeyDown}
				data-ref='toggled-wrapper'
			>
				{clonedTrigger}
				<Positioning
					parentRef={ddt.wrapper}
					renderHidden={ddt.state.isPortalHidden}
					setMaxHeight={restrictToViewPort}
				>
						{clonedDropdown}
				</Positioning>
			</div>
		);
	}
}

DropDownToggled.propTypes = {
	className: PropTypes.string,

	/** @property {Boolean} [isHidden=true] Whether the dropdown is hidden on initial render */
	isHidden: PropTypes.bool,

	/** @property {Function} [onOpen] Callback that gets triggered on dropdown opening */
	onOpen: PropTypes.func,

	/** @property {Function} [onClose] Callback that gets triggered on dropdown closing */
	onClose: PropTypes.func,

	/** @property {Element} [trigger] Element used to trigger the dropdown opening/closing (typically a button) */
	trigger: PropTypes.element.isRequired,

	/** @property {Element} [dropdown] The dropdown that will be rendered when triggered */
	dropdown: PropTypes.element.isRequired,

	/** @property {Boolean} [closeOnSelect=true] Whether or not the dropdown should be automatically hidden when the user selects something */
	closeOnSelect: PropTypes.bool,

	/** @prop {Boolean} [closeOnTab=true] Whether or not the dropdown should be automatically hidden when the user hits the tab key.  Good to turn this off if you've got a date picker, nested dropd down, form, or other complex component inside of a dropdown. */
	closeOnTab: PropTypes.bool,

	/** @property {Boolean} [restrictToViewPort=true] Whether or not we should set a maxHeight on the dropdown to restrict it to the window */
	restrictToViewPort: PropTypes.bool,

	/** @property {Boolean} [disableScrollLocking=true] Whether scroll locking behaviour should be disabled */
	disableScrollLocking: PropTypes.bool,

	/** @property {Function} [onCloseAnimationEnd] Function to be called once the closing animation has finished */
	onCloseAnimationEnd: PropTypes.func,

	/** @property {String} [triggerClickAction='toggle'] What action to take when the user clicks the trigger.  Default is to toggle the dropdown open/close.  Can just open ('open') or do nothing ('none'). */
	triggerClickAction: PropTypes.oneOf(['none', 'toggle', 'open']),
};

DropDownToggled.defaultProps = {
	isHidden: true,
	closeOnSelect: true,
	closeOnTab: true,
	restrictToViewPort: true,
	disableScrollLocking: false,
	triggerClickAction: 'toggle',
};
