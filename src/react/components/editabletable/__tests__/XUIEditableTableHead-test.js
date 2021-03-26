import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableHead from '../XUIEditableTableHead';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableHead />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableHead>
        <div>XUIEditableTableHead</div>
      </XUIEditableTableHead>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableHead className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <XUIEditableTableHead />
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
