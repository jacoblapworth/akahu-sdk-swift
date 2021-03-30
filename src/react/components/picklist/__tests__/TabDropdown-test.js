import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIPickitem from '../XUIPickitem';
import TabDropdown from '../private/TabDropdown';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

// clientWidth in jsdom is 0, so the dropdown will apply mobile styles
// but the animation of dropdown opening/closing doesn't work well in jsdom
// so simulate desktop environment here
Object.defineProperties(window.document.documentElement, {
  clientWidth: { value: 1000 },
});

describe('<TabDropdown />', () => {
  it('renders correctly', () => {
    const tabDropdown = renderer.create(
      <TabDropdown
        className="custom-class"
        dropdownList={[<XUIPickitem primaryElement="Item 1" id="pi1" isSelected />]}
      />,
    );
    expect(tabDropdown).toMatchSnapshot();
  });

  it('closes the tab-styled dropdown when an item is selected', () => {
    const wrapper = mount(
      <TabDropdown dropdownList={[<XUIPickitem primaryElement="Item 1" id="pi1" />]} />,
    );

    wrapper.find('.xui-pickitem--body').first().simulate('click');

    document.querySelector('.xui-portal .xui-pickitem--body').click();

    expect(document.querySelector('.xui-portal .xui-container')).toBeFalsy();
  });

  it('does not close the dropdown on select if closeOnSelect is set to false', function () {
    const wrapper = mount(
      <TabDropdown
        closeOnSelect={false}
        dropdownList={[<XUIPickitem primaryElement="Item 1" id="pi1" />]}
      />,
    );

    wrapper.find('.xui-pickitem--body').first().simulate('click');

    document.querySelector('.xui-portal .xui-pickitem--body').click();

    expect(document.querySelector('.xui-portal .xui-container')).toBeTruthy();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <TabDropdown dropdownList={[<XUIPickitem id="pi1" isSelected primaryElement="Item 1" />]} />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
