import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIDropDown from '../XUIDropDown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let click = false;
const setClick = () => (click = true);

describe('<XUIDropDown /> API Methods', () => {
  beforeEach(() => {
    click = false;
    wrapper = mount(
      <XUIDropDown className="test">
        <Picklist>
          <Pickitem onClick={setClick} id="item1">
            Item 1
          </Pickitem>
        </Picklist>
      </XUIDropDown>,
    );
  });

  it('renders with the correct classes', () => {
    expect(wrapper.find('.xui-dropdown-layout')).toHaveLength(1);
  });

  it('handles an undefined or null menu item', () => {
    wrapper = mount(
      <XUIDropDown>
        <Picklist>
          <Pickitem onClick={setClick} id="item1">
            Item 1
          </Pickitem>
          {undefined}
        </Picklist>
        <Picklist>
          <Pickitem onClick={setClick} id="item2">
            Item 2
          </Pickitem>
          {null}
        </Picklist>
      </XUIDropDown>,
      { attachTo: div },
    );

    expect(wrapper).toBeDefined();
    wrapper.detach();
  });

  it('fires the callback when you click on a pick item', () => {
    wrapper.find(Pickitem).find('button').simulate('click');
    expect(click).toBeTruthy();
  });
});
