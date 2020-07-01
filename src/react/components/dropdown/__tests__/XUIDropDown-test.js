import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDropDown from '../XUIDropDown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import { maxWidthDropdownSizes, fixedWidthDropdownSizes } from '../private/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('<Dropdown size classes />', () => {
  Object.keys(maxWidthDropdownSizes).forEach(size => {
    it(`${size} outputs max-width class by default`, () => {
      const wrapper = mount(
        <XUIDropDown size={size}>
          <strong>test</strong>
        </XUIDropDown>,
      );
      expect(wrapper.getDOMNode().classList.contains(maxWidthDropdownSizes[size])).toBeTruthy();
    });

    it(`${size} outputs fixed-width class when fixedWidth prop is set`, () => {
      const wrapper = mount(
        <XUIDropDown size={size} fixedWidth>
          <strong>test</strong>
        </XUIDropDown>,
      );
      expect(wrapper.getDOMNode().classList.contains(fixedWidthDropdownSizes[size])).toBeTruthy();
    });
  });
});

describe('forceStatefulPicklist prop', () => {
  it('do not wrap children in StatefulPicklist if is not a Picklist children', () => {
    const wrapper = mount(
      <XUIDropDown>
        <p>Panel Content</p>
      </XUIDropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(0);
  });

  it('force wrap children in StatefulPicklist even if is not a Picklist children', () => {
    const wrapper = mount(
      <XUIDropDown forceStatefulPicklist>
        <p>Panel Content</p>
      </XUIDropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('handles null elements without throwing', () => {
    const check = null;
    const wrapper = mount(
      <XUIDropDown>
        {check}
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </XUIDropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('wrap children in StatefulPicklist when Picklist is children', () => {
    const wrapper = mount(
      <XUIDropDown>
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </XUIDropDown>,
    );
    expect(wrapper.find('StatefulPicklist').length).toBe(1);
  });

  it('renders a automation id when a qaHook is passed', () => {
    const automationid = renderer.create(
      <XUIDropDown qaHook="dropdown-test" id="1">
        <Picklist>
          <Pickitem id="required-id">List Item</Pickitem>
        </Picklist>
      </XUIDropDown>,
    );

    expect(automationid).toMatchSnapshot();
  });

  it('renders qaHooks on inner components when stateful picklist is not being used', () => {
    const automationid = renderer.create(
      <XUIDropDown qaHook="dropdown-test" id="1">
        <ul>
          <li id="required-id">List Item</li>
        </ul>
      </XUIDropDown>,
    );

    expect(automationid).toMatchSnapshot();
  });
});
