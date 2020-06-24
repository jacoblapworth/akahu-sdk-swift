import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIDropdown from '../XUIDropdown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
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
        <Picklist>
          <Pickitem onClick={setClick} id="item1">
            Item 1
          </Pickitem>
        </Picklist>
      </XUIDropdown>,
    );
  });

  it('renders with the correct classes', () => {
    expect(wrapper.find('.xui-dropdown-layout')).toHaveLength(1);
  });

  it('handles an undefined or null menu item', () => {
    wrapper = mount(
      <XUIDropdown>
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
      </XUIDropdown>,
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
