import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'generatedHeaderId');

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

// NOTE: The esc key functionality has not been tested here as event listeners don't work very well in React testing
describe('XUIModal', () => {
  it('Should be possible to do snapshot testing on the modal', () => {
    const component = renderer.create(
      <XUIModal isUsingPortal={false} id="test-modal" qaHook="xui-modal" onClose={NOOP}>
        <XUIModalHeader>Test header</XUIModalHeader>
        <div>test</div>
      </XUIModal>,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render with any additional classes provided through the className, maskClassName and closeClassName props', function() {
    const component = mount(
      <XUIModal
        isUsingPortal={false}
        id="test-modal"
        className="classyMcClassFace"
        maskClassName="maskClassyMcClassFace"
        onClose={NOOP}
        closeClassName="closeClassyMcClassFace"
      />,
    );

    const domNode = component.find('.xui-modal');
    const maskNode = component.find('.xui-mask');

    expect(domNode.hasClass('classyMcClassFace')).toBeTruthy();
    expect(maskNode.hasClass('maskClassyMcClassFace')).toBeTruthy();
    expect(domNode.find('button').hasClass('closeClassyMcClassFace')).toBeTruthy();
  });

  it('Should render with the appropriate size modifier', function() {
    const component = mount(
      <div>
        <XUIModal isUsingPortal={false} id="test-modal-small" size="small" onClose={NOOP} />
        <XUIModal isUsingPortal={false} id="test-modal-medium" size="medium" onClose={NOOP} />
        <XUIModal isUsingPortal={false} id="test-modal-large" size="large" onClose={NOOP} />
        <XUIModal isUsingPortal={false} id="test-modal-xlarge" size="xlarge" onClose={NOOP} />
        <XUIModal
          isUsingPortal={false}
          id="test-modal-fullscreen"
          size="fullscreen"
          onClose={NOOP}
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

  it('Should correctly pass close handlers to the close button and mask', function() {
    let clicked = false;
    const demoFunction = () => {
      clicked = true;
    };

    const component = mount(
      <XUIModal
        isUsingPortal={false}
        onClose={demoFunction}
        isOpen={true}
        hideOnOverlayClick={true}
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

  it('Should not fire onClose on mask click if hideOnOverlayClick is set to false', function() {
    let maskClicked = false;
    const demoFunction = () => {
      maskClicked = true;
    };

    const component = mount(
      <XUIModal
        isUsingPortal={false}
        id="test-modal-overlayClick"
        onClose={demoFunction}
        hideOnOverlayClick={false}
        isOpen={true}
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
        isUsingPortal={false}
        id="test-modal-overlayClick"
        onClose={demoFunction}
        isOpen={true}
      />,
    );
    const maskNode = component.find('.xui-mask');
    maskNode.simulate('click');
    setTimeout(() => {
      expect(maskClicked).toBeTruthy();
    }, 0);
  });

  it('Should only add default layout classes if defaultLayout is explicitly set to true or by default', function() {
    const component = mount(
      <div>
        <XUIModal
          isUsingPortal={false}
          id="test-modal-nolayout"
          defaultLayout={false}
          isOpen={true}
          onClose={NOOP}
        />
        <XUIModal isUsingPortal={false} id="test-modal-layout" onClose={NOOP} />
      </div>,
    );
    const firstModal = component.find('#test-modal-nolayout .xui-modal');
    const secondModal = component.find('#test-modal-layout .xui-modal');

    expect(firstModal.hasClass('xui-modal-layout')).toBeFalsy();
    expect(secondModal.hasClass('xui-modal-layout')).toBeTruthy();
  });

  it('Should not add margin or padding classes to subcomponents if defaultLayout is set to false', function() {
    const component = mount(
      <XUIModal
        isUsingPortal={false}
        defaultLayout={false}
        id="test-modal-layoutSecond"
        isOpen={true}
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

  it('Should render as a form when isForm is true', function() {
    const component = mount(
      <XUIModal isUsingPortal={false} isForm={true} id="test-modal" isOpen={true}>
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
      <XUIModal isUsingPortal={false} id="test-modal">
        <XUIModalHeader />
        <XUIModalBody />
        <XUIModalFooter />
      </XUIModal>,
    );

    const domNode = component.find('.xui-modal');
    expect(domNode.is('form')).toBeFalsy();

    const componentSet = mount(
      <XUIModal isUsingPortal={false} isForm={false} id="test-modal">
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
      <XUIModal isUsingPortal={false} qaHook="xui-modal" onClose={NOOP}>
        <div>test</div>
      </XUIModal>,
    );

    expect(automationid).toMatchSnapshot();
  });

  it('should lock the scroll of a window when mounted and unlocked when unmounted', () => {
    const modalMounted = mount(
      <XUIModal isUsingPortal={false} onClose={NOOP} isOpen={true}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.instance()._isScrollLocked).toBeTruthy();

    modalMounted.setProps({ isOpen: false });

    expect(modalMounted.instance()._isScrollLocked).toBeFalsy();
  });

  it('should render closed by default', () => {
    const modalMounted = shallow(
      <XUIModal isUsingPortal={false} onClose={NOOP}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.hasClass('xui-mask-is-active')).toBeFalsy();
  });

  it('should render open when isOpen is set to true', () => {
    const modalMounted = mount(
      <XUIModal isUsingPortal={false} onClose={NOOP} isOpen={true}>
        <div>test</div>
      </XUIModal>,
    );

    expect(modalMounted.find('.xui-mask').hasClass('xui-mask-is-active')).toBeTruthy();
  });
});
