import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableFootAction from '../XUIEditableTableFootAction';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableFootAction />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableFootAction buttonContent="test button" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call the onAdd callback when the add button is clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <XUIEditableTableFootAction
        buttonContent="test button"
        qaHook="test-footaction"
        onClick={onClickMock}
      />,
    );

    wrapper.find('[data-automationid="test-footaction"]').simulate('click');
    expect(onClickMock).toBeCalled();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIEditableTableFootAction buttonContent="test button" />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
