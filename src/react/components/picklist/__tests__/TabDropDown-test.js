import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Pickitem from '../Pickitem';
import TabDropDown from '../private/TabDropDown';

Enzyme.configure({ adapter: new Adapter() });

// clientWidth in jsdom is 0, so the dropdown will apply mobile styles
// but the animation of dropdown opening/closing doesn't work well in jsdom
// so simulate desktop environment here
Object.defineProperties(window.document.documentElement, {
  clientWidth: { value: 1000 },
});

describe('<TabDropDown />', () => {
  it('renders correctly', () => {
    const tabDropDown = renderer.create(
      <TabDropDown
        className="custom-class"
        dropdownList={[<Pickitem primaryElement="Item 1" id="pi1" isSelected />]}
      />,
    );
    expect(tabDropDown).toMatchSnapshot();
  });

  it('closes the tab-styled dropdown when an item is selected', () => {
    const wrapper = mount(
      <TabDropDown dropdownList={[<Pickitem primaryElement="Item 1" id="pi1" />]} />,
    );

    wrapper
      .find('.xui-pickitem--body')
      .first()
      .simulate('click');

    document.querySelector('.xui-portal .xui-pickitem--body').click();

    expect(document.querySelector('.xui-portal .xui-container')).toBeFalsy();
  });

  it('does not close the dropdown on select if closeOnSelect is set to false', function() {
    const wrapper = mount(
      <TabDropDown
        closeOnSelect={false}
        dropdownList={[<Pickitem primaryElement="Item 1" id="pi1" />]}
      />,
    );

    wrapper
      .find('.xui-pickitem--body')
      .first()
      .simulate('click');

    document.querySelector('.xui-portal .xui-pickitem--body').click();

    expect(document.querySelector('.xui-portal .xui-container')).toBeTruthy();
  });
});
