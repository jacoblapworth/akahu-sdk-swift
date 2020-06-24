import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDropdown from '../XUIDropdown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
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
  it('do not wrap children in StatefulPicklist if is not a Picklist children', () => {
    const wrapper = mount(
      <XUIDropdown>
        <p>Panel Content</p>
      </XUIDropdown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(0);
  });

  it('force wrap children in StatefulPicklist even if is not a Picklist children', () => {
    const wrapper = mount(
      <XUIDropdown forceStatefulPicklist>
        <p>Panel Content</p>
      </XUIDropdown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('handles null elements without throwing', () => {
    const check = null;
    const wrapper = mount(
      <XUIDropdown>
        {check}
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </XUIDropdown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('wrap children in StatefulPicklist when Picklist is children', () => {
    const wrapper = mount(
      <XUIDropdown>
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </XUIDropdown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('renders a automation id when a qaHook is passed', () => {
    const automationid = renderer.create(
      <XUIDropdown qaHook="dropdown-test" id="1">
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
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
