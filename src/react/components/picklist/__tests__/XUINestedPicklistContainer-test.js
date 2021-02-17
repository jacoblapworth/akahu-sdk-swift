import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIStatefulPicklist from '../XUIStatefulPicklist';
import XUIPicklist from '../XUIPicklist';
import XUINestedPicklistContainer from '../XUINestedPicklistContainer';
import XUINestedPicklistTrigger from '../XUINestedPicklistTrigger';
import XUINestedPicklist from '../XUINestedPicklist';
import XUIPickitem from '../XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const MockNestedPicklistContainer = props => (
  <XUINestedPicklistContainer id="nested" {...props}>
    <XUINestedPicklistTrigger id="nestedTrigger" ariaLabel="Toggle submenu">
      Nested List
    </XUINestedPicklistTrigger>
    <XUINestedPicklist>
      <XUIPickitem ariaRole="treeitem" id="a">
        A
      </XUIPickitem>
    </XUINestedPicklist>
  </XUINestedPicklistContainer>
);

const MockStatefulPicklist = props => (
  <XUIStatefulPicklist>
    <XUIPicklist>
      <MockNestedPicklistContainer {...props} />
    </XUIPicklist>
  </XUIStatefulPicklist>
);

const setup = (props = {}) => {
  return mount(MockStatefulPicklist(props));
};

describe('<XUIPicklistContainer />', () => {
  it.skip('should pass accessibility testing', async () => {
    const wrapper = mount(MockNestedPicklistContainer());
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('Uncontrolled component', () => {
    it('updates open state to isDefaultOpen prop value', () => {
      // Arrange
      const setup = (props = {}) => {
        return mount(MockNestedPicklistContainer(props));
      };
      const wrapper = setup({ isDefaultOpen: true });

      // Act
      const openState = wrapper.state().open;

      // Assert
      expect(openState).toBe(true);
    });

    it('calls onOpen when the picklist is opened programatically', () => {
      // Arrange
      const onOpenMock = jest.fn();
      const wrapper = setup({ onOpen: onOpenMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().open();

      // Assert
      expect(onOpenMock).toBeCalledTimes(1);
    });

    it('calls onClose when the picklist is closed programatically', () => {
      const onCloseMock = jest.fn();

      const wrapper = setup({ isDefaultOpen: true, onClose: onCloseMock });

      wrapper.find('XUINestedPicklistContainer').instance().close();

      expect(onCloseMock).toBeCalledTimes(1);
    });

    it('does not call onOpen if the picklist is already open', () => {
      // Arrange
      const onOpenMock = jest.fn();
      const wrapper = setup({ isDefaultOpen: true, onOpen: onOpenMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().open();

      // Assert
      expect(onOpenMock).not.toBeCalled();
    });

    it('does not call onClose if the picklist is already closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isDefaultOpen: false, onClose: onCloseMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().close();

      // Assert
      expect(onCloseMock).not.toBeCalled();
    });
  });

  describe('Controlled component', () => {
    it('opens with open state being set to isOpen value', () => {
      // Arrange
      const setup = (props = {}) => {
        return mount(MockNestedPicklistContainer(props));
      };
      const wrapper = setup({ isOpen: true });

      // Act
      const openState = wrapper.state().open;

      // Assert
      expect(openState).toBe(true);
    });

    it('calls the onOpen method when the toggle is opened', () => {
      // Arrange
      const onOpenMock = jest.fn();

      const wrapper = setup({ isOpen: false, onOpen: onOpenMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().open();

      // Assert
      expect(onOpenMock).toBeCalled();
    });

    it('calls the onClose method when the toggle is closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isOpen: true, onClose: onCloseMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().close();

      // Assert
      expect(onCloseMock).toBeCalled();
    });

    it('does not call onOpen if the picklist is already open', () => {
      // Arrange
      const onOpenMock = jest.fn();
      const wrapper = setup({ isOpen: true, onOpen: onOpenMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().open();

      // Assert
      expect(onOpenMock).not.toBeCalled();
    });

    it('does not call onClose if the picklist is already closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isOpen: false, onClose: onCloseMock });

      // Act
      wrapper.find('XUINestedPicklistContainer').instance().close();

      // Assert
      expect(onCloseMock).not.toBeCalled();
    });
  });
});
