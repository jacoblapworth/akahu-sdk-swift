import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDown from '../DropDown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import { maxWidthDropdownSizes, fixedWidthDropdownSizes } from '../private/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('<DropDown size classes />', () => {
  Object.keys(maxWidthDropdownSizes).forEach(size => {
    it(`${size} outputs max-width class by default`, () => {
      const wrapper = mount(
        <DropDown size={size}>
          <strong>test</strong>
        </DropDown>,
      );
      expect(wrapper.getDOMNode().classList.contains(maxWidthDropdownSizes[size])).toBeTruthy();
    });

    it(`${size} outputs fixed-width class when fixedWidth prop is set`, () => {
      const wrapper = mount(
        <DropDown size={size} fixedWidth>
          <strong>test</strong>
        </DropDown>,
      );
      expect(wrapper.getDOMNode().classList.contains(fixedWidthDropdownSizes[size])).toBeTruthy();
    });
  });
});

describe('forceStatefulPicklist prop', () => {
  it('do not wrap children in StatefulPicklist if is not a Picklist children', () => {
    const wrapper = mount(
      <DropDown>
        <p>Panel Content</p>
      </DropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(0);
  });

  it('force wrap children in StatefulPicklist even if is not a Picklist children', () => {
    const wrapper = mount(
      <DropDown forceStatefulPicklist>
        <p>Panel Content</p>
      </DropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('handles null elements without throwing', () => {
    const check = null;
    const wrapper = mount(
      <DropDown>
        {check}
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </DropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('wrap children in StatefulPicklist when Picklist is children', () => {
    const wrapper = mount(
      <DropDown>
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </DropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('renders a automation id when a qaHook is passed', () => {
    const automationid = renderer.create(
      <DropDown qaHook="dropdown-test" id="1">
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </DropDown>,
    );

    expect(automationid).toMatchSnapshot();
  });

  it('renders qaHooks on inner components when stateful picklist is not being used', () => {
    const automationid = renderer.create(
      <DropDown qaHook="dropdown-test" id="1">
        <ul>
          <li id="required-id">List Item</li>
        </ul>
      </DropDown>,
    );

    expect(automationid).toMatchSnapshot();
  });
});

describe('<DropDown /> getHighlighted methods', () => {
  let dropdown;
  let item3;

  beforeEach(() => {
    // Arrange
    item3 = <Pickitem id="item3">Item 3</Pickitem>;
    dropdown = mount(
      <DropDown>
        <Picklist>
          <Pickitem id="item1">Item 1</Pickitem>
          <Pickitem id="item2">Item 2</Pickitem>
          {item3}
          <Pickitem id="item4">Item 4</Pickitem>
        </Picklist>
      </DropDown>,
    );
    dropdown.instance().highlightItem(item3);
  });

  it('gets the highlighted item when getHighlighted is called', () => {
    // Act
    const highlighted = dropdown.instance().getHighlighted();

    // Assert
    expect(highlighted).toEqual(item3);
  });

  it('gets the highlighted item ID when getHighlightedId is called', () => {
    // Act
    const highlightedId = dropdown.instance().getHighlightedId();

    // Assert
    expect(highlightedId).toEqual('item3');
  });
});
