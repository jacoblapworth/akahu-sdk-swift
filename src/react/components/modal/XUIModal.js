import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Portal from 'react-portal';
import cross from '@xero/xui-icon/icons/cross';
import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import XUIModalHeader from './XUIModalHeader';
import { lockScroll, unlockScroll } from '../helpers/lockScroll';

const modalSizes = {
	small: 'xui-modal-width-small',
	medium: 'xui-modal-width-medium',
	large: 'xui-modal-width-large',
	xlarge: 'xui-modal-width-xlarge',
	fullscreen: 'xui-modal-fullscreen'
};

/**
 * Predicate to determine if the props of a modal have changed in such as way as to necessitate
 * adding/removing global event listeners.
 *
 * @private
 * @param {Object} props
 * @param {Object} otherProps
 * @returns {Boolean}
 */
function shouldUpdateListeners(props, otherProps) {
	return (!!props.onClose !== !!otherProps.onClose)
		|| props.hideOnEsc !== otherProps.hideOnEsc
		|| props.restrictFocus !== otherProps.restrictFocus
		|| props.keyListenerTarget !== otherProps.keyListenerTarget;
}

/**
 * Add the global event listeners necessary to ensure that props like hideOnEsc
 * can function properly.
 *
 * @private
 * @param {XUIModal} modal
 */
function addListeners(modal) {
	const { onClose, keyListenerTarget, restrictFocus, hideOnEsc } = modal.props;
	const listenerTarget = keyListenerTarget == null ? window : keyListenerTarget;

	// Be paranoid.  Some test environments won't have a window object.
	if (listenerTarget != null) {
		if (onClose && hideOnEsc) {
			modal._keyUpHandler = modal._keyUpHandler.bind(modal);
			listenerTarget.addEventListener('keyup', modal._keyUpHandler);
		}
		if (restrictFocus) {
			modal._restrictFocus = modal._restrictFocus.bind(modal);
			listenerTarget.addEventListener('focus', modal._restrictFocus, true);
		}
	}
}

/**
 * Remove any global event listeners associated with a given modal.
 *
 * @private
 * @param {XUIModal} modal
 */
function removeListeners(modal) {
	const { keyListenerTarget } = modal.props;
	const listenerTarget = keyListenerTarget == null ? window : keyListenerTarget;

	// Be paranoid.  Some test environments won't have a window object.
	if (listenerTarget != null) {
		listenerTarget.removeEventListener('keyup', modal._keyUpHandler);
		listenerTarget.removeEventListener('focus', modal._restrictFocus, true);
	}
}

export default class XUIModal extends Component {
	componentDidMount() {
		addListeners(this);
		if (!this.props.isHidden) {
			lockScroll();
			this._isScrollLocked = true;
		}
	}

	componentWillUnmount() {
		removeListeners(this);

		unlockScroll();
		this._isScrollLocked = false;
	}

	componentWillReceiveProps(nextProps) {
		if (shouldUpdateListeners(this.props, nextProps)) {
			removeListeners(this);
		}
	}

	componentDidUpdate(prevProps) {
		const modal = this;
		const { isHidden, restrictFocus } = modal.props;

		if (shouldUpdateListeners(this.props, prevProps)) {
			addListeners(this);
		}

		if (!isHidden && !modal._isScrollLocked) {
			lockScroll();
			modal._isScrollLocked = true;
		}

		if (isHidden && modal._isScrollLocked) {
			unlockScroll();
			modal._isScrollLocked = false;
		}

		if (!isHidden && restrictFocus && (prevProps.isHidden || !prevProps.restrictFocus)) {
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
		const { isHidden, onClose } = this.props;
		const escapeKeyCode = 27;
		if (event.keyCode === escapeKeyCode && !isHidden && onClose) {
			onClose();
		}
	}

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
	}

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
				qaHook={`${qaHook}-close`}
				onClick={onClose}
				title="Close"
				className={ cn( 'xui-margin-small', 'xui-button-icon', closeClassName) }
				key="close-button"
				type="button"
				variant="unstyled"
			>
				<XUIIcon path={cross}/>
			</XUIButton> : null;
		let containsHeader = false;
		const finalChildren = Children.map(children, child => {
			if (child && child.type === XUIModalHeader) {
				containsHeader = true;
				return cloneElement(child, {...child.props}, [child.props.children,closeButton]);
			} else {
				return child;
			}
		});
		const MainElement = isForm ? 'form' : 'section';
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
			isUsingPortal ? <Portal isOpened={!isHidden}><div className="xui-container">{childNodes}</div></Portal> : childNodes
		);
	}
}



XUIModal.propTypes = {
	/** If the modal will be hidden when the user presses the Esc key */
	hideOnEsc: PropTypes.bool,

	/** If the modal will be hidden when the user clicks the overlay */
	hideOnOverlayClick: PropTypes.bool,

	/** Bind a function to fire when the modal requests to be hidden */
	onClose: PropTypes.func,

	/** The size (aka width) of this modal */
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'fullscreen']),

	/** Whether the modal is hidden */
	isHidden: PropTypes.bool,

	/** Whether the modal wrapping element should be a `<form>` rather than a `<section>`. Allows the enter key to activate the submit button inside native form controls. */
	isForm: PropTypes.bool,

	/** The target that should listen to key presses. Defaults to the window. */
	keyListenerTarget: PropTypes.object,

	/** Custom classes for the mask */
	maskClassName: PropTypes.string,

	/** Custom classes for the close button */
	closeClassName: PropTypes.string,

	/** Restricts focus to elements within the modal while it is open */
	restrictFocus: PropTypes.bool,

	/** ID for the element containing an appropriate label for screen readers */
	ariaLabelledBy: PropTypes.string,

	/** ID for the element containing an appropriate description for screen readers */
	ariaDescribedBy: PropTypes.string,

	/** Renders the modal to the bottom of the current document when true. Otherwise inline. */
	isUsingPortal: PropTypes.bool,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool,

	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string,
	qaHook: PropTypes.string
};

XUIModal.defaultProps = {
	hideOnEsc: true,
	hideOnOverlayClick: false,
	isHidden: true,
	size: 'medium',
	defaultLayout: true,
	restrictFocus: true,
	qaHook: 'xui-modal',
	isUsingPortal: true,
	isForm: false
};
