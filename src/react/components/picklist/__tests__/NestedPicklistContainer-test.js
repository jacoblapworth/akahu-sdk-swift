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

const setup = (props = {}) => {
  return mount(
    <StatefulPicklist>
      <Picklist>
        <NestedPicklistContainer id="nested" {...props}>
          <NestedPicklistTrigger ariaLabel="Toggle submenu" id="nestedTrigger">
            Nested List
          </NestedPicklistTrigger>
          <NestedPicklist>
            <Pickitem ariaRole="treeitem" id="a">
              A
            </Pickitem>
          </NestedPicklist>
        </NestedPicklistContainer>
      </Picklist>
    </StatefulPicklist>,
  );
};

describe('<PicklistContainer />', () => {
  it('calls onOpen when the picklist is opened programatically', () => {
    const onOpenMock = jest.fn();

    const wrapper = setup({ onOpen: onOpenMock });

    wrapper
      .find('NestedPicklistContainer')
      .instance()
      .open();

    expect(onOpenMock).toBeCalledTimes(1);
  });

  it('calls onClose when the picklist is closed programatically', () => {
    const onCloseMock = jest.fn();

    const wrapper = setup({ isOpen: true, onClose: onCloseMock });

    wrapper
      .find('NestedPicklistContainer')
      .instance()
      .close();

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('does not call onOpen if the picklist is already open', () => {
    const onOpenMock = jest.fn();

    const wrapper = setup({ isOpen: true, onOpen: onOpenMock });

    wrapper
      .find('NestedPicklistContainer')
      .instance()
      .close();

    expect(onOpenMock).not.toBeCalled();
  });

  it('does not call onClose if the picklist is already closed', () => {
    const onCloseMock = jest.fn();

    const wrapper = setup({ onClose: onCloseMock });

    wrapper
      .find('NestedPicklistContainer')
      .instance()
      .close();

    expect(onCloseMock).not.toBeCalled();
  });
});
