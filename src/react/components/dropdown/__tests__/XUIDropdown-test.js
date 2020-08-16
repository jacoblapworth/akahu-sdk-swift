import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDropdown from '../XUIDropdown';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import { maxWidthDropdownSizes, fixedWidthDropdownSizes } from '../private/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIDropdown /> size classes', () => {
  Object.keys(maxWidthDropdownSizes).forEach(size => {
    it(`${size} outputs max-width class by default`, () => {
      const wrapper = mount(
        <XUIDropdown size={size}>
          <strong>test</strong>
        </XUIDropdown>,
      );
      expect(wrapper.getDOMNode().classList.contains(maxWidthDropdownSizes[size])).toBeTruthy();
    });

    it(`${size} outputs fixed-width class when fixedWidth prop is set`, () => {
      const wrapper = mount(
        <XUIDropdown size={size} fixedWidth>
          <strong>test</strong>
        </XUIDropdown>,
      );
      expect(wrapper.getDOMNode().classList.contains(fixedWidthDropdownSizes[size])).toBeTruthy();
    });
  });
});

describe('forceStatefulPicklist prop', () => {
  it('does not wrap children in stateful picklist if it is not a picklist child', () => {
    const wrapper = mount(
      <XUIDropdown>
        <p>Panel Content</p>
      </XUIDropdown>,
    );
    expect(wrapper.find('XUIStatefulPicklist').length).toBe(0);
  });

  it('force wraps children in stateful picklist even if it is not a picklist child', () => {
    const wrapper = mount(
      <XUIDropdown forceStatefulPicklist>
        <p>Panel Content</p>
      </XUIDropdown>,
    );
    expect(wrapper.find('XUIStatefulPicklist').length).toBe(1);
  });

  it('handles null elements without throwing', () => {
    const check = null;
    const wrapper = mount(
      <XUIDropdown>
        {check}
        <XUIPicklist>
          <XUIPickitem id="required-id">List Item</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>,
    );
    expect(wrapper.find('XUIStatefulPicklist').length).toBe(1);
  });

  it('wraps children in stateful picklist when picklist is a child', () => {
    const wrapper = mount(
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem id="required-id">List Item</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>,
    );
    expect(wrapper.find('XUIStatefulPicklist').length).toBe(1);
  });

  it('renders a automation id when a qaHook is passed', () => {
    const automationid = renderer.create(
      <XUIDropdown qaHook="dropdown-test" id="1">
        <XUIPicklist>
          <XUIPickitem id="required-id">List Item</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>,
    );

    expect(automationid).toMatchSnapshot();
  });

  it('renders qaHooks on inner components when stateful picklist is not being used', () => {
    const automationid = renderer.create(
      <XUIDropdown qaHook="dropdown-test" id="1">
        <ul>
          <li id="required-id">List Item</li>
        </ul>
      </XUIDropdown>,
    );

    expect(automationid).toMatchSnapshot();
  });
});

describe('<XUIDropdown /> getHighlighted methods', () => {
  let dropdown;
  let item3;

  beforeEach(() => {
    // Arrange
    item3 = <XUIPickitem id="item3">Item 3</XUIPickitem>;
    dropdown = mount(
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem id="item1">Item 1</XUIPickitem>
          <XUIPickitem id="item2">Item 2</XUIPickitem>
          {item3}
          <XUIPickitem id="item4">Item 4</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>,
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
