import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableHeadingCell>XUIEditableTableHeadingCell</XUIEditableTableHeadingCell>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with customized scope', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell scope="rowGroup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell>XUIEditableTableHeadingCell</XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
