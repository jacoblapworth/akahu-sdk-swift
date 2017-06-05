import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Portal from 'react-portal';
import cross from '@xero/xui-icon/icons/cross';
import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import XUIModalHeader from './XUIModalHeader';
import { modalSizes } from './private/sizes';
import { lockScroll, unlockScroll } from './private/helpers';

export default class XUIModal extends Component {
	componentDidMount() {
		const modal = this;
		const { onClose, keyListenerTarget, restrictFocus, hideOnEsc, isHidden } = modal.props;
		if (onClose && hideOnEsc) {
			modal._keyUpHandler = modal._keyUpHandler.bind(modal);
			keyListenerTarget.addEventListener('keyup', modal._keyUpHandler);
		}
		if (restrictFocus) {
			modal._restrictFocus = modal._restrictFocus.bind(modal);
			keyListenerTarget.addEventListener('focus', modal._restrictFocus, true);
		}
		if(!isHidden) {
			lockScroll();
			this._isScrollLocked = true;
		}
	}

	componentWillUnmount() {
		const modal = this;
		const { keyListenerTarget, hideOnEsc, restrictFocus } = modal.props;
		const listenerTarget = keyListenerTarget;
		/*
		 * When the component unmounts, we need to remove any key listeners that were listening
		 * for the esc key press
		 */
		if (hideOnEsc) {
			listenerTarget.removeEventListener('keyup', modal._keyUpHandler);
		}
		if (restrictFocus) {
			listenerTarget.removeEventListener('focus', modal._restrictFocus, true);
		}

		unlockScroll();
		modal._isScrollLocked = false;
	}

	componentDidUpdate(prevProps) {
		const modal = this;
		const { isHidden, restrictFocus } = modal.props;

		if(!isHidden && !modal._isScrollLocked) {
			lockScroll();
			modal._isScrollLocked = true;
		}

		if(isHidden && modal._isScrollLocked) {
			unlockScroll();
			modal._isScrollLocked = false;
		}

		if (!isHidden && restrictFocus && (prevProps.isHidden || !prevProps.restrictFocus)){
			if (!modal._maskNode.contains(document.activeElement)){
				modal._modalNode.focus();
			}
		}
	}

	/**
	 * @private
	 * @param {Object} event - A keyUp event which is set to be listened to by componentDidMount.
	 * If the modal needs to close when the user presses the esc key, we need to attach a key
	 * listener to a parent (`window` by default) to catch this key press
	 */
	_keyUpHandler(event) {
		const {isHidden, onClose} = this.props;
		const escapeKeyCode = 27;
		if(event.keyCode === escapeKeyCode && !isHidden && onClose) {
			onClose();
		}
	};

	/**
	 * @private
	 * @param {Object} event - A focus change event which is set to be listened to by componentDidMount
	 * Limits the focusable elements to those within the modal
	 **/
	_restrictFocus(event) {
		const modal = this;
		const { isHidden, restrictFocus } = modal.props;
		if (!isHidden && restrictFocus) {
			const maskNode = modal._maskNode;
			const targetIsWindow = event.target === window;
			if (targetIsWindow || !maskNode.contains( event.target )) {
				event.stopPropagation();
				modal._modalNode.focus();
			}
		}
	};

	render() {
		const {
			hideOnOverlayClick,
			onClose,
			size,
			isHidden,
			className,
			maskClassName,
			closeClassName,
			children,
			defaultLayout,
			ariaLabelledBy,
			ariaDescribedBy,
			qaHook,
			id,
			isForm,
			isUsingPortal
		} = this.props;

		const maskClasses = cn(
			'xui-mask',
			maskClassName,
			{ ['xui-u-hidden'] : isHidden },
			{ ['xui-mask-is-active'] : !isHidden }
		);
		const modalClasses = cn(
			'xui-modal',
			modalSizes[size],
			{ ['xui-modal-layout'] : defaultLayout },
			className
		);
		const overlayClickHandler = hideOnOverlayClick && onClose ?
			function(event){
				if (event.target.classList.contains('xui-mask') && !isHidden) {
					onClose();
				}
			} : null;

		const closeButton = onClose ?
			<XUIButton
				onClick={onClose}
				title="Close"
				className={ cn( 'xui-margin-small', 'xui-button-icon', closeClassName) }
				key="close-button"
				type="button"
				variant="unstyled">
				<XUIIcon path={cross}/>
			</XUIButton> : null;
		let containsHeader = false;
		const finalChildren = Children.map(children, (child, i) => {
			if (child && child.type === XUIModalHeader) {
				containsHeader = true;
				return cloneElement(child, {...child.props, key: undefined, ref: undefined}, [child.props.children,closeButton]);
			} else {
				return child;
			}
		});
		const MainElement = isForm ? 'form' : 'div';
		const childNodes = (
			<div
				id={id}
				className={maskClasses}
				onClick={overlayClickHandler}
				aria-hidden={isHidden}
				data-automationid={`${qaHook}-mask`}
				ref={m => this._maskNode = m}
			>
				<MainElement
					className={modalClasses}
					tabIndex={ !isHidden ? 0 : -1 }
					role={ !isHidden ? 'dialog' : null }
					aria-labelledby={ariaLabelledBy}
					aria-describedby={ariaDescribedBy}
					data-automationid={qaHook}
					ref={m => this._modalNode = m}
				>
					{!containsHeader ? closeButton : null}
					{finalChildren}
				</MainElement>
			</div>);

		return (
			isUsingPortal ? <Portal isOpen={!isHidden}>{childNodes}</Portal> : childNodes
		);
	}
}



XUIModal.propTypes = {
	/**
	 * @property {boolean} [closeOnEsc=true] If the modal will be hidden when the user presses the Esc key
	 */
	hideOnEsc: PropTypes.bool,

	/**
	 * @property {boolean} [hideOnOverlayClick=true] If the modal will be hidden when the user clicks the overlay
	 */
	hideOnOverlayClick: PropTypes.bool,

	/**
	 * @property {function} [onClose] Bind a function to fire when the modal requests to be hidden
	 */
	onClose: PropTypes.func,

	/**
	 * @property {string} [size='medium'] The size of this modal. `small`, `medium`, `large`, or `fullscreen` Defaults to `medium`
	 */
	size: PropTypes.oneOf(Object.keys(modalSizes)),

	/**
	 * @property {boolean} [isHidden=true] Whether the modal is hidden
	 */
	isHidden: PropTypes.bool,

	/**
	 * @property {boolean} [isForm=false] Whether the modal wrapping element should be a `<form>` rather than a `<div>`. Allows the enter key to activate the submit button inside native form controls.
	 */
	isForm: PropTypes.bool,

	/** @property {Object} [keyListenerTarget=window] The target that should listen to key presses. Defaults to the window */
	keyListenerTarget: PropTypes.object,

	/** @property {string} maskClassName Optional custom classes for the mask */
	maskClassName: PropTypes.string,

	/** @property {string} closeClassName Optional custom classes for the close button */
	closeClassName: PropTypes.string,

	/**
	 * @property {boolean} [restrictFocus=true] Restricts focus to elements within the modal while it is open
	 */
	restrictFocus: PropTypes.bool,

	/**
	 * @property {string} [ariaLabelledBy] ID for the element containing an appropriate label for screen readers
	 */
	ariaLabelledBy: PropTypes.string,

	/**
	 * @property {string} [ariaDescribedBy] ID for the element containing an appropriate description for screen readers
	 */
	ariaDescribedBy: PropTypes.string,

	/**
	 * @property {boolean} [isUsingPortal=true] Renders the modal to the bottom of the current document when true. Otherwise inline.
	 */
	isUsingPortal: PropTypes.bool,

	children: PropTypes.node,
	defaultLayout: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string
};

XUIModal.defaultProps = {
	hideOnEsc: true,
	hideOnOverlayClick: false,
	isHidden: true,
	keyListenerTarget: window,
	size: 'medium',
	defaultLayout: true,
	restrictFocus: true,
	qaHook: 'xui-modal',
	isUsingPortal: true,
	isForm: false
};
