import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { nanoid } from 'nanoid';
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'generatedHeaderId');

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

// NOTE: The esc key functionality has not been tested here as event listeners don't work very well in React testing
describe('XUIModal', () => {
  it('Should be possible to do snapshot testing on the modal', () => {
    const component = renderer.create(
      <XUIModal
        closeButtonLabel="Close"
        id="test-modal"
        isUsingPortal={false}
        onClose={NOOP}
        qaHook="xui-modal"
      >
        <XUIModalHeader>Test header</XUIModalHeader>
        <div>test</div>
      </XUIModal>,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render with any additional classes provided through the className, maskClassName and closeClassName props', function () {
    const component = mount(
      <XUIModal
        className="classyMcClassFace"
        closeButtonLabel="Close"
        closeClassName="closeClassyMcClassFace"
        id="test-modal"
        isUsingPortal={false}
        maskClassName="maskClassyMcClassFace"
        onClose={NOOP}
      />,
    );

    const domNode = component.find('.xui-modal');
    const maskNode = component.find('.xui-mask');

    expect(domNode.hasClass('classyMcClassFace')).toBeTruthy();
    expect(maskNode.hasClass('maskClassyMcClassFace')).toBeTruthy();
    expect(domNode.find('button').hasClass('closeClassyMcClassFace')).toBeTruthy();
  });

  it('Should render with the appropriate size modifier', function () {
    const component = mount(
      <div>
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-small"
          isUsingPortal={false}
          onClose={NOOP}
          size="small"
        />
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-medium"
          isUsingPortal={false}
          onClose={NOOP}
          size="medium"
        />
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-large"
          isUsingPortal={false}
          onClose={NOOP}
          size="large"
        />
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-xlarge"
          isUsingPortal={false}
          onClose={NOOP}
          size="xlarge"
        />
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-fullscreen"
          isUsingPortal={false}
          onClose={NOOP}
          size="fullscreen"
        />
      </div>,
    );

    const modal1 = component.find('#test-modal-small .xui-modal');
    const modal2 = component.find('#test-modal-medium .xui-modal');
    const modal3 = component.find('#test-modal-large .xui-modal');
    const modalXLarge = component.find('#test-modal-xlarge .xui-modal');
    const modalFullScreen = component.find('#test-modal-fullscreen .xui-modal');

    expect(modal1.hasClass('xui-modal-width-small')).toBeTruthy();
    expect(modal1.hasClass('xui-modal-width-medium')).toBeFalsy();
    expect(modal1.hasClass('xui-modal-width-large')).toBeFalsy();
    expect(modal1.hasClass('xui-modal-width-xlarge')).toBeFalsy();
    expect(modal1.hasClass('xui-modal-fullscreen')).toBeFalsy();

    expect(modal2.hasClass('xui-modal-width-small')).toBeFalsy();
    expect(modal2.hasClass('xui-modal-width-medium')).toBeTruthy();
    expect(modal2.hasClass('xui-modal-width-large')).toBeFalsy();
    expect(modal2.hasClass('xui-modal-width-xlarge')).toBeFalsy();
    expect(modal2.hasClass('xui-modal-fullscreen')).toBeFalsy();

    expect(modal3.hasClass('xui-modal-width-small')).toBeFalsy();
    expect(modal3.hasClass('xui-modal-width-medium')).toBeFalsy();
    expect(modal3.hasClass('xui-modal-width-large')).toBeTruthy();
    expect(modal3.hasClass('xui-modal-width-xlarge')).toBeFalsy();
    expect(modal3.hasClass('xui-modal-fullscreen')).toBeFalsy();

    expect(modalXLarge.hasClass('xui-modal-width-small')).toBeFalsy();
    expect(modalXLarge.hasClass('xui-modal-width-medium')).toBeFalsy();
    expect(modalXLarge.hasClass('xui-modal-width-large')).toBeFalsy();
    expect(modalXLarge.hasClass('xui-modal-width-xlarge')).toBeTruthy();
    expect(modalXLarge.hasClass('xui-modal-fullscreen')).toBeFalsy();

    expect(modalFullScreen.hasClass('xui-modal-width-small')).toBeFalsy();
    expect(modalFullScreen.hasClass('xui-modal-width-medium')).toBeFalsy();
    expect(modalFullScreen.hasClass('xui-modal-width-large')).toBeFalsy();
    expect(modalFullScreen.hasClass('xui-modal-width-xlarge')).toBeFalsy();
    expect(modalFullScreen.hasClass('xui-modal-fullscreen')).toBeTruthy();
  });

  it('Should correctly pass close handlers to the close button and mask', function () {
    let clicked = false;
    const demoFunction = () => {
      clicked = true;
    };

    const component = mount(
      <XUIModal
        closeButtonLabel="Close"
        hideOnOverlayClick
        isOpen
        isUsingPortal={false}
        onClose={demoFunction}
      />,
    );
    const maskNode = component.find('.xui-mask');
    maskNode.simulate('click');
    expect(clicked).toEqual(true);

    clicked = false;

    const closeButtonNode = maskNode.find('.xui-button');
    closeButtonNode.simulate('click');
    expect(clicked).toEqual(true);
  });

  it('Should not fire onClose on mask click if hideOnOverlayClick is set to false', function () {
    let maskClicked = false;
    const demoFunction = () => {
      maskClicked = true;
    };

    const component = mount(
      <XUIModal
        closeButtonLabel="Close"
        hideOnOverlayClick={false}
        id="test-modal-overlayClick"
        isOpen
        isUsingPortal={false}
        onClose={demoFunction}
      />,
    );
    const maskNode = component.find('.xui-mask');
    maskNode.simulate('click');
    setTimeout(() => {
      expect(maskClicked).toBeFalsy();
    }, 0);
  });

  it('Should fire on close on click of the mask by default', () => {
    let maskClicked = false;
    const demoFunction = () => {
      maskClicked = true;
    };

    const component = mount(
      <XUIModal
        closeButtonLabel="Close"
        id="test-modal-overlayClick"
        isOpen
        isUsingPortal={false}
        onClose={demoFunction}
      />,
    );
    const maskNode = component.find('.xui-mask');
    maskNode.simulate('click');
    setTimeout(() => {
      expect(maskClicked).toBeTruthy();
    }, 0);
  });

  it('Should only add default layout classes if defaultLayout is explicitly set to true or by default', function () {
    const component = mount(
      <div>
        <XUIModal
          closeButtonLabel="Close"
          defaultLayout={false}
          id="test-modal-nolayout"
          isOpen
          isUsingPortal={false}
          onClose={NOOP}
        />
        <XUIModal
          closeButtonLabel="Close"
          id="test-modal-layout"
          isUsingPortal={false}
          onClose={NOOP}
        />
      </div>,
    );
    const firstModal = component.find('#test-modal-nolayout .xui-modal');
    const secondModal = component.find('#test-modal-layout .xui-modal');

    expect(firstModal.hasClass('xui-modal-layout')).toBeFalsy();
    expect(secondModal.hasClass('xui-modal-layout')).toBeTruthy();
  });

  it('Should not add margin or padding classes to subcomponents if defaultLayout is set to false', function () {
    const component = mount(
      <XUIModal
        closeButtonLabel="Close"
        defaultLayout={false}
        id="test-modal-layoutSecond"
        isOpen
        isUsingPortal={false}
      >
        <XUIModalHeader defaultLayout={false} />
        <XUIModalBody defaultLayout={false} />
        <XUIModalFooter defaultLayout={false} />
      </XUIModal>,
    );
    const modal = component.find('#test-modal-layoutSecond .xui-modal');

    for (let i = 0; i < modal.children.length; i++) {
      expect(modal.childAt(i).hasClass('xui-modal-layout')).toBeFalsy();
    }
  });

  it('Should render as a form when isForm is true', function () {
    const component = mount(
      <XUIModal closeButtonLabel="Close" id="test-modal" isForm isOpen isUsingPortal={false}>
        <XUIModalHeader />
        <XUIModalBody />
        <XUIModalFooter />
      </XUIModal>,
    );

    const domNode = component.find('.xui-modal');
    expect(domNode.is('form')).toBeTruthy();
  });

  it('should not render as a form by default, or if isForm is set to false', () => {
    const component = mount(
      <XUIModal closeButtonLabel="Close" id="test-modal" isUsingPortal={false}>
        <XUIModalHeader />
        <XUIModalBody />
        <XUIModalFooter />
      </XUIModal>,
    );

    const domNode = component.find('.xui-modal');
    expect(domNode.is('form')).toBeFalsy();

    const componentSet = mount(
      <XUIModal closeButtonLabel="Close" id="test-modal" isForm={false} isUsingPortal={false}>
        <XUIModalHeader />
        <XUIModalBody />
        <XUIModalFooter />
      </XUIModal>,
    );

    const secondDomNode = componentSet.find('.xui-modal');
    expect(secondDomNode.is('form')).toBeFalsy();
  });

  it('should render an automation id when a qaHook is passed in', () => {
    const automationid = renderer.create(
      <XUIModal closeButtonLabel="Close" isUsingPortal={false} onClose={NOOP} qaHook="xui-modal">
        <div>test</div>
      </XUIModal>,
    );

    expect(automationid).toMatchSnapshot();
  });

  it('should lock the scroll of a window when mounted and unlocked when unmounted', () => {
    const modalMounted = mount(
      <XUIModal closeButtonLabel="Close" isOpen isUsingPortal={false} onClose={NOOP}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.instance()._isScrollLocked).toBeTruthy();

    modalMounted.setProps({ isOpen: false });

    expect(modalMounted.instance()._isScrollLocked).toBeFalsy();
  });

  it('should render closed by default', () => {
    const modalMounted = shallow(
      <XUIModal closeButtonLabel="Close" isUsingPortal={false} onClose={NOOP}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.hasClass('xui-mask-is-active')).toBeFalsy();
  });

  it('should render open when isOpen is set to true', () => {
    const modalMounted = mount(
      <XUIModal closeButtonLabel="Close" isOpen isUsingPortal={false} onClose={NOOP}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.find('.xui-mask').hasClass('xui-mask-is-active')).toBeTruthy();
  });

  it('should close the modal when escape is pressed', () => {
    const onClose = jest.fn();

    const modalMounted = mount(
      <XUIModal closeButtonLabel="Close" isOpen isUsingPortal={false} onClose={onClose}>
        <div>test</div>
      </XUIModal>,
    );

    expect(onClose).not.toHaveBeenCalled();
    modalMounted
      .instance()
      ._keyUpHandler(new KeyboardEvent('keyup', { key: 'Escape', keyCode: 27 }));
    expect(onClose).toHaveBeenCalled();
  });

  it('should close the modal when esc is pressed', () => {
    const onClose = jest.fn();

    const modalMounted = mount(
      <XUIModal closeButtonLabel="Close" isOpen isUsingPortal={false} onClose={onClose}>
        <div>test</div>
      </XUIModal>,
    );

    expect(onClose).not.toHaveBeenCalled();
    modalMounted.instance()._keyUpHandler(new KeyboardEvent('keyup', { key: 'Esc', keyCode: 27 }));
    expect(onClose).toHaveBeenCalled();
  });

  it('removes the existing listener when the keyListenerTarget prop changes', () => {
    // Arrange
    const mockRemoveKeyListener = jest.fn();

    const modalMounted = mount(
      <XUIModal
        closeButtonLabel="Close"
        isUsingPortal={false}
        keyListenerTarget={{
          removeEventListener: mockRemoveKeyListener,
          addEventListener: NOOP,
        }}
      >
        <div>test</div>
      </XUIModal>,
    );

    // Act
    modalMounted.setProps({
      keyListenerTarget: {
        removeEventListener: NOOP,
        addEventListener: NOOP,
      },
    });

    // Assert
    expect(mockRemoveKeyListener).toHaveBeenCalled();
  });

  it('adds a new listener when the keyListenerTarget prop changes', () => {
    const mockNewAddKeyListener = jest.fn();

    const modalMounted = mount(
      <XUIModal
        closeButtonLabel="Close"
        isUsingPortal={false}
        keyListenerTarget={{
          removeEventListener: NOOP,
          addEventListener: NOOP,
        }}
      >
        <div>test</div>
      </XUIModal>,
    );

    // Act
    modalMounted.setProps({
      keyListenerTarget: {
        removeEventListener: NOOP,
        addEventListener: mockNewAddKeyListener,
      },
    });

    // Assert
    expect(mockNewAddKeyListener).toHaveBeenCalled();
  });
});
