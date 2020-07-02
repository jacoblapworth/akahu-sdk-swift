import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Pickitem from '../Pickitem';
import TabDropdown from '../private/TabDropdown';

Enzyme.configure({ adapter: new Adapter() });

describe('<TabDropdown />', () => {
  it('renders correctly', () => {
    const tabDropdown = renderer.create(
      <TabDropdown
        className="custom-class"
        dropdownList={[<Pickitem primaryElement="Item 1" id="pi1" isSelected />]}
      />,
    );
    expect(tabDropdown).toMatchSnapshot();
  });
});
