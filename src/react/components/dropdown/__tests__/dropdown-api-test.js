import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import XUIDropdown from '../XUIDropdown';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let click = false;
const setClick = () => (click = true);

describe('<XUIDropdown /> API Methods', () => {
  beforeEach(() => {
    click = false;
    wrapper = mount(
      <XUIDropdown className="test">
        <XUIPicklist>
          <XUIPickitem onClick={setClick} id="item1">
            Item 1
          </XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>,
    );
  });

  it('renders with the correct classes', () => {
    expect(wrapper.find('.xui-dropdown-layout')).toHaveLength(1);
  });

  it('handles an undefined or null menu item', () => {
    wrapper = mount(
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem onClick={setClick} id="item1">
            Item 1
          </XUIPickitem>
          {undefined}
        </XUIPicklist>
        <XUIPicklist>
          <XUIPickitem onClick={setClick} id="item2">
            Item 2
          </XUIPickitem>
          {null}
        </XUIPicklist>
      </XUIDropdown>,
      { attachTo: div },
    );

    expect(wrapper).toBeDefined();
    wrapper.detach();
  });

  it('fires the callback when you click on a pickitem', () => {
    wrapper.find(XUIPickitem).find('button').simulate('click');
    expect(click).toBeTruthy();
  });
});
