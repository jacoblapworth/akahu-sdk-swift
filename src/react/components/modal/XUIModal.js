import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import verge from 'verge';
import { Portal } from 'react-portal';
import cross from '@xero/xui-icon/icons/cross';
import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import XUIModalHeader from './XUIModalHeader';
import { lockScroll, unlockScroll } from '../helpers/lockScroll';
import portalContainer, { portalClass } from '../helpers/portalContainer';
import {baseClass} from './constants';
import {ns} from "../helpers/xuiClassNamespace";

export const modalSizes = {
	default: `${baseClass}-width-default`,
	small: `${baseClass}-width-small`,
	medium: `${baseClass}-width-medium`,
	large: `${baseClass}-width-large`,
	xlarge: `${baseClass}-width-xlarge`,
	fullscreen: `${baseClass}-fullscreen`
};

const maskClass = `${ns}-mask`;

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
	return (
		!!props.onClose !== !!otherProps.onClose ||
		props.hideOnEsc !== otherProps.hideOnEsc ||
		props.restrictFocus !== otherProps.restrictFocus ||
		props.keyListenerTarget !== otherProps.keyListenerTarget
	);
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

	state = { positionSettings: null }

	componentDidMount() {
		const modal = this;
		addListeners(this);
		if (modal.props.isOpen) {
			lockScroll();
			modal._isScrollLocked = true;

			this.calcOffsetTop();

			if (!modal._maskNode.contains(document.activeElement)) {
				modal._modalNode.focus();
			}
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
		const { isOpen, restrictFocus } = modal.props;


		if (shouldUpdateListeners(this.props, prevProps)) {
			addListeners(this);
		}

		if (isOpen && !modal._isScrollLocked) {
			lockScroll();
			modal._isScrollLocked = true;

			this.calcOffsetTop();

		}

		if (!isOpen && modal._isScrollLocked) {
			unlockScroll();
			modal._isScrollLocked = false;
		}

		if (
			isOpen &&
			restrictFocus &&
			(!prevProps.isOpen || !prevProps.restrictFocus) &&
			!modal._maskNode.contains(document.activeElement)
		) {
			modal._modalNode.focus();
		}
	}

	calcOffsetTop = () => {
		const viewportH = verge.viewportH();
		const modalHeight = this._modalNode.getBoundingClientRect().height;
		const calculatedOffsetTop = Math.max(((viewportH - modalHeight) / 2) - 15, 0); // subtracts 15px ($xui-s-standard) from `top` to take into account XUIMask's (wrapping component) existing padding
		const positionSettings = {
			top: `${calculatedOffsetTop}px`
		};
		this.setState({
			positionSettings
		});
	}

	/**
	 * @private
	 * @param {Object} event - A keyUp event which is set to be listened to by componentDidMount.
	 * If the modal needs to close when the user presses the esc key, we need to attach a key
	 * listener to a parent (`window` by default) to catch this key press
	 */
	_keyUpHandler(event) {
		const { isOpen, onClose } = this.props;
		const escapeKeyCode = 27;
		if (event.keyCode === escapeKeyCode && isOpen && onClose) {
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
		const { isOpen, restrictFocus } = modal.props;
		if (isOpen && restrictFocus) {
			// Need to check if the focus is within this modal mask, or in another portalled element (e.g. dropdowns)
			const maskAndPortalNodes = [...document.querySelectorAll(`.${portalClass}, .${maskClass}`)];
			const targetIsWindow = event.target === window;
			if (targetIsWindow || !maskAndPortalNodes.some(node => node.contains(event.target))) {
				event.stopPropagation();
				if (modal._modalNode) {
					modal._modalNode.focus();
				}
			}
		}
	}

	render() {
		const {
			hideOnOverlayClick,
			onClose,
			size,
			isOpen,
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
		const {
			positionSettings
		} = this.state;

		const maskClasses = cn(
			maskClass,
			maskClassName,
			isOpen && `${maskClass}-is-active`
		);
		const modalClasses = cn(
			baseClass,
			modalSizes[size],
			defaultLayout && `${baseClass}-layout`,
			className
		);
		const overlayClickHandler =
			hideOnOverlayClick && onClose
				? function(event) {
						if (event.target.classList.contains(maskClass) && isOpen) {
							onClose();
						}
					}
				: null;

		const closeButton = onClose ? (
			<XUIButton
				qaHook={qaHook && `${qaHook}--close`}
				onClick={onClose}
				title="Close"
				className={cn(`${baseClass}--close`, closeClassName)}
				key="close-button"
				type="button"
				variant="icon"
			>
				<XUIIcon icon={cross} isBoxed />
			</XUIButton>
		) : null;
		let headerElement;
		const finalChildren = Children.map(children, child => {
			if (child && child.type === XUIModalHeader) {
				headerElement = cloneElement(child, { ...child.props }, [
					child.props.children,
					closeButton
				]);
				return null;
			} else {
				return child;
			}
		});
		// Our CSS requires that the modal close button sits inside a header element
		if (headerElement == null && closeButton != null) {
			headerElement = (
				<XUIModalHeader qaHook={qaHook && `${qaHook}--header`}>
					{closeButton}
				</XUIModalHeader>
			);
		}
		const MainElement = isForm ? 'form' : 'section';
		const childNodes = (
			<div
				id={id}
				className={maskClasses}
				onClick={overlayClickHandler}
				aria-hidden={!isOpen}
				data-automationid={qaHook && `${qaHook}--mask`}
				ref={m => (this._maskNode = m)}
				role="presentation"
			>
				<MainElement
					className={modalClasses}
					tabIndex={isOpen ? 0 : -1}
					role={isOpen ? 'dialog' : null}
					style={positionSettings}
					aria-labelledby={ariaLabelledBy}
					aria-describedby={ariaDescribedBy}
					data-automationid={qaHook}
					ref={m => (this._modalNode = m)}
				>
					{headerElement}
					{finalChildren}
				</MainElement>
			</div>
		);

		return isUsingPortal ? (
			isOpen ? (
				<Portal node={portalContainer()}>
					<div
						className={`${ns}-container`}
						data-automationid={qaHook && `${qaHook}--container`}
					>
						{childNodes}
					</div>
				</Portal>
			) : null
		) : (
			childNodes
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
	size: PropTypes.oneOf(['default', 'small', 'medium', 'large', 'xlarge', 'fullscreen']),

	/** Whether the modal is visible */
	isOpen: PropTypes.bool,

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
	isOpen: false,
	size: 'medium',
	defaultLayout: true,
	restrictFocus: true,
	isUsingPortal: true,
	isForm: false
};
