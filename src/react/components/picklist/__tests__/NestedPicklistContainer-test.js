import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatefulPicklist from '../StatefulPicklist';
import Picklist from '../Picklist';
import NestedPicklistContainer from '../NestedPicklistContainer';
import NestedPicklistTrigger from '../NestedPicklistTrigger';
import NestedPicklist from '../NestedPicklist';
import Pickitem from '../Pickitem';

Enzyme.configure({ adapter: new Adapter() });

const MockNestedPicklistContainer = props => (
  <NestedPicklistContainer id="nested" {...props}>
    <NestedPicklistTrigger id="nestedTrigger" ariaLabel="Toggle submenu">
      Nested List
    </NestedPicklistTrigger>
    <NestedPicklist>
      <Pickitem ariaRole="treeitem" id="a">
        A
      </Pickitem>
    </NestedPicklist>
  </NestedPicklistContainer>
);

const MockStatefulPicklist = props => (
  <StatefulPicklist>
    <Picklist>
      <MockNestedPicklistContainer {...props} />
    </Picklist>
  </StatefulPicklist>
);

const setup = (props = {}) => {
  return mount(MockStatefulPicklist(props));
};

describe('<PicklistContainer />', () => {
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
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .open();

      // Assert
      expect(onOpenMock).toBeCalledTimes(1);
    });

    it('calls onClose when the picklist is closed programatically', () => {
      const onCloseMock = jest.fn();

      const wrapper = setup({ isDefaultOpen: true, onClose: onCloseMock });

      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .close();

      expect(onCloseMock).toBeCalledTimes(1);
    });

    it('does not call onOpen if the picklist is already open', () => {
      // Arrange
      const onOpenMock = jest.fn();
      const wrapper = setup({ isDefaultOpen: true, onOpen: onOpenMock });

      // Act
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .open();

      // Assert
      expect(onOpenMock).not.toBeCalled();
    });

    it('does not call onClose if the picklist is already closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isDefaultOpen: false, onClose: onCloseMock });

      // Act
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .close();

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
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .open();

      // Assert
      expect(onOpenMock).toBeCalled();
    });

    it('calls the onClose method when the toggle is closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isOpen: true, onClose: onCloseMock });

      // Act
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .close();

      // Assert
      expect(onCloseMock).toBeCalled();
    });

    it('does not call onOpen if the picklist is already open', () => {
      // Arrange
      const onOpenMock = jest.fn();
      const wrapper = setup({ isOpen: true, onOpen: onOpenMock });

      // Act
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .open();

      // Assert
      expect(onOpenMock).not.toBeCalled();
    });

    it('does not call onClose if the picklist is already closed', () => {
      // Arrange
      const onCloseMock = jest.fn();
      const wrapper = setup({ isOpen: false, onClose: onCloseMock });

      // Act
      wrapper
        .find('NestedPicklistContainer')
        .instance()
        .close();

      // Assert
      expect(onCloseMock).not.toBeCalled();
    });
  });
});
