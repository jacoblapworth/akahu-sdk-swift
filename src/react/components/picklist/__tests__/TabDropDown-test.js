import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Pickitem from '../Pickitem';
import TabDropDown from '../private/TabDropDown';

Enzyme.configure({ adapter : new Adapter() });


describe('<TabDropDown />', () => {
	it('renders correctly', () => {
		const tabDropDown = renderer.create(
      <TabDropDown
				className="custom-class"
        dropdownList={[
          <Pickitem primaryElement="Item 1" id="pi1" isSelected/>,
        ]}
      />
    );
		expect(tabDropDown).toMatchSnapshot();
  });
});
