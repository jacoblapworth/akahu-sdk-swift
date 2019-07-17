import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import verge from 'verge';
import { Portal } from 'react-portal';
import uuidv4 from 'uuid/v4';
import cross from '@xero/xui-icon/icons/cross';
import XUIIconButton from '../button/XUIIconButton';
import XUIModalHeader from './XUIModalHeader';
import { registerModal, deRegisterTopModal } from '../helpers/modalManager';
import portalContainer, { portalClass } from '../helpers/portalContainer';
import { baseClass, modalSizes } from './constants';
import { ns } from '../helpers/xuiClassNamespace';
import { eventKeyValues } from '../helpers/reactKeyHandler';
import getFocusableDescendants from '../helpers/getFocusableDescendants';

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

export default class XUIModal extends Component {
  state = {
    positionSettings: null,
    isTopModal: null, // This is handled and manipulated by helpers/modalManager
  };

  generatedHeaderId = uuidv4();

  componentDidMount() {
    const { isOpen } = this.props;
    const { isTopModal } = this.state;
    this.addListeners();
    if (isOpen && !isTopModal) {
      const { activeElement } = document;
      this.priorFocusedEl = activeElement;
      registerModal(this);

      this._isScrollLocked = true;

      this.calcOffsetTop();

      if (!this._maskNode.contains(activeElement)) {
        this._modalNode.focus();
      }
    }
  }

  componentWillUnmount() {
    this.removeListeners();
    const { isTopModal } = this.state;
    if (this.props.isOpen && this._isScrollLocked && isTopModal) {
      this._isScrollLocked = false;
      deRegisterTopModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (shouldUpdateListeners(this.props, nextProps)) {
      this.removeListeners();
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen, restrictFocus } = this.props;
    const { isTopModal } = this.state;
    const { activeElement } = document;

    if (shouldUpdateListeners(this.props, prevProps)) {
      this.addListeners();
    }

    if (isOpen && !this._isScrollLocked && !isTopModal) {
      this.priorFocusedEl = activeElement;
      registerModal(this);
      this._isScrollLocked = true;

      this.calcOffsetTop();
    }

    if (!isOpen && this._isScrollLocked && isTopModal) {
      this._isScrollLocked = false;
      deRegisterTopModal();
    }

    if (
      isOpen &&
      restrictFocus &&
      (!prevProps.isOpen || !prevProps.restrictFocus) &&
      !this._maskNode.contains(activeElement)
    ) {
      this._modalNode.focus();
    }
  }

  /**
   * Add the global event listeners necessary to ensure that props like hideOnEsc
   * can function properly.
   */
  addListeners = () => {
    const { onClose, keyListenerTarget, restrictFocus, hideOnEsc } = this.props;
    const listenerTarget = keyListenerTarget == null ? window : keyListenerTarget;

    // Be paranoid.  Some test environments won't have a window object.
    if (listenerTarget != null) {
      if (onClose && hideOnEsc) {
        this._keyUpHandler = this._keyUpHandler.bind(this);
        listenerTarget.addEventListener('keyup', this._keyUpHandler);
      }
      if (restrictFocus) {
        this._restrictFocus = this._restrictFocus.bind(this);
        listenerTarget.addEventListener('focus', this._restrictFocus, true);
      }
    }
  };

  /**
   * Remove any global event listeners associated with a given modal.
   */
  removeListeners = () => {
    const { keyListenerTarget } = this.props;
    const listenerTarget = keyListenerTarget == null ? window : keyListenerTarget;

    // Be paranoid.  Some test environments won't have a window object.
    if (listenerTarget != null) {
      listenerTarget.removeEventListener('keyup', this._keyUpHandler);
      listenerTarget.removeEventListener('focus', this._restrictFocus, true);
    }
  };

  calcOffsetTop = () => {
    const viewportH = verge.viewportH();
    const modalHeight = this._modalNode.getBoundingClientRect().height;
    /* subtracts 15px ($xui-s-standard) from `top` to take into account XUIMask's
     * (wrapping component) existing padding */
    const calculatedOffsetTop = Math.max((viewportH - modalHeight) / 2 - 15, 0);
    const positionSettings = {
      top: `${calculatedOffsetTop}px`,
    };
    this.setState({
      positionSettings,
    });
  };

  /**
   * @param {Object} event - A keyUp event which is set to be listened to by componentDidMount.
   * If the modal needs to close when the user presses the esc key, we need to attach a key
   * listener to a parent (`window` by default) to catch this key press
   */
  _keyUpHandler = event => {
    const { isOpen, onClose } = this.props;
    const { isTopModal } = this.state;
    if (event.key === eventKeyValues.escape && isOpen && onClose && isTopModal) {
      event.stopImmediatePropagation(); // Necessary for nested inline modals event bubbling.
      onClose();
    }
  };

  /**
   * @param {Object} event - A focus change event which is set to be listened to by componentDidMount
   * Limits the focusable elements to those within the modal
   * */
  _restrictFocus = event => {
    const { isOpen, restrictFocus } = this.props;

    if (!this._modalNode || !isOpen || !restrictFocus) {
      return;
    }

    if (event.target === window || event.target === document) {
      return;
    }

    // Need to check if the focus is within this modal mask, or in another portalled element (e.g. dropdowns)
    const maskAndPortalNodes = [...document.querySelectorAll(`.${portalClass}, .${maskClass}`)];
    if (!maskAndPortalNodes.some(node => node.contains(event.target))) {
      event.stopPropagation();
      this._modalNode.focus();
    }
  };

  /**
   * @param {Object} event - A keyDown event
   * Overrides the `Tab` key's default behaviour to allow focusing on a modal with a positive tab
   * index.
   *
   * Giving an element a positive tab index means that reverse tabbing (shift + tab) from it will
   * hand the focus over to the browser.
   */
  _manageTabFocus = event => {
    const { isUsingPortal, restrictFocus } = this.props;
    if (event.key !== 'Tab' || restrictFocus === false) {
      return;
    }

    const focusableDescendants = getFocusableDescendants(this._modalNode);
    const firstFocusableDescendant = focusableDescendants[0];
    const lastFocusableDescendant = [...focusableDescendants].slice(-1)[0];

    if (!event.shiftKey) {
      // Tabbing forwards
      if (event.target === this._modalNode) {
        event.preventDefault();
        firstFocusableDescendant.focus();
      }
    } else {
      // Tabbing backwards
      if (event.target === firstFocusableDescendant) {
        event.preventDefault();
        this._modalNode.focus();
      }
      if (event.target === this._modalNode && !isUsingPortal) {
        event.preventDefault();
        lastFocusableDescendant.focus();
      }
    }
  };

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
      isUsingPortal,
      closeButtonLabel,
      restrictFocus,
    } = this.props;
    const { positionSettings, isTopModal } = this.state;

    const maskClasses = cn(
      maskClass,
      maskClassName,
      isOpen && `${maskClass}-is-active`,
      // unmasks previous modal's mask if there is more than 1 modal open
      !isTopModal && `${ns}-unmask`,
    );
    const modalClasses = cn(
      baseClass,
      modalSizes[size],
      defaultLayout && `${baseClass}-layout`,
      className,
    );
    const overlayClickHandler =
      hideOnOverlayClick && onClose
        ? event => {
            if (event.target.classList.contains(maskClass) && isOpen) {
              onClose();
            }
          }
        : null;

    const closeButton = onClose ? (
      <XUIIconButton
        icon={cross}
        ariaLabel={closeButtonLabel}
        qaHook={qaHook && `${qaHook}--close`}
        onClick={onClose}
        title={closeButtonLabel}
        className={cn(`${baseClass}--close`, closeClassName)}
        key="close-button"
        type="button"
      />
    ) : null;
    let headerElement;
    const finalChildren = Children.map(children, child => {
      if (child && child.type === XUIModalHeader) {
        // Use the provided header ID or apply a generated one.
        // This will be used for the label of the modal, if another is not provided.
        const headerId = child.props.id || this.generatedHeaderId;
        headerElement = cloneElement(child, { ...child.props, id: headerId }, [
          child.props.children,
          closeButton,
        ]);
        return null;
      }
      return child;
    });
    // Our CSS requires that the modal close button sits inside a header element
    if (headerElement == null && closeButton != null) {
      headerElement = (
        <XUIModalHeader qaHook={qaHook && `${qaHook}--header`}>{closeButton}</XUIModalHeader>
      );
    }
    const MainElement = isForm ? 'form' : 'section';
    let modalTabIndex = -1;
    if (isOpen && isTopModal) {
      // Setting the tabIndex to a positive integer allows the focus to return to the browser when shift+tabbing out of the modal. We use the highest possible tab index (32767) just incase the modal has a child with a positive tab index.
      const useTabIndexHack = restrictFocus && isUsingPortal;
      modalTabIndex = useTabIndexHack ? 32767 : 0;
    }
    const childNodes = (
      <div
        id={id}
        className={maskClasses}
        onClick={overlayClickHandler}
        aria-hidden={!isOpen || !isTopModal}
        data-automationid={qaHook && `${qaHook}--mask`}
        ref={m => (this._maskNode = m)}
        role="presentation"
      >
        <MainElement
          className={modalClasses}
          tabIndex={modalTabIndex}
          role={isOpen ? 'dialog' : null}
          style={positionSettings}
          // If a modal header has been provided, it can be used for the label.
          aria-labelledby={ariaLabelledBy || (headerElement && headerElement.props.id) || undefined}
          aria-describedby={ariaDescribedBy}
          data-automationid={qaHook}
          ref={m => (this._modalNode = m)}
          onKeyDown={this._manageTabFocus}
        >
          {headerElement}
          {finalChildren}
        </MainElement>
      </div>
    );

    if (!isUsingPortal) {
      return childNodes;
    }
    return isOpen ? (
      <Portal node={portalContainer()}>
        <div className={`${ns}-container`} data-automationid={qaHook && `${qaHook}--container`}>
          {childNodes}
        </div>
      </Portal>
    ) : null;
  }
}

XUIModal.propTypes = {
  /** If the modal will be hidden when the user presses the Esc key */
  hideOnEsc: PropTypes.bool,

  /** If the modal will be hidden when the user clicks the overlay */
  hideOnOverlayClick: PropTypes.bool,

  /** Bind a function to fire when the modal requests to be hidden */
  onClose: PropTypes.func,

  /** Label to be applied to the modal close "X" button, for accessibility. Defaults to "Close" */
  closeButtonLabel: PropTypes.string,

  /** The size (aka width) of this modal */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'fullscreen']),

  /** Whether the modal is visible */
  isOpen: PropTypes.bool,

  /** Whether the modal wrapping element should be a `<form>` rather than a `<section>`.
   * Allows the enter key to activate the submit button inside native form controls. */
  isForm: PropTypes.bool,

  /** The target that should listen to key presses. Defaults to the window. */
  keyListenerTarget: PropTypes.object,

  /** Custom classes for the mask */
  maskClassName: PropTypes.string,

  /** Custom classes for the close button */
  closeClassName: PropTypes.string,

  /** Restricts focus to elements within the modal while it is open */
  restrictFocus: PropTypes.bool,

  /** ID for the element containing an appropriate label for screen readers. If a ModalHeader
   * is provided, it will automatically be used as the labelling element. */
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
  qaHook: PropTypes.string,
};

XUIModal.defaultProps = {
  hideOnEsc: true,
  hideOnOverlayClick: false,
  isOpen: false,
  size: 'medium',
  defaultLayout: true,
  restrictFocus: true,
  isUsingPortal: true,
  isForm: false,
  closeButtonLabel: 'Close',
};
