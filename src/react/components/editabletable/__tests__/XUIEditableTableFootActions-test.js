import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableFootActions from '../XUIEditableTableFootActions';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableFootAction />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableFootActions>
        <button type="button">Add row</button>
      </XUIEditableTableFootActions>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableFootActions className="test-classname">
        <button type="button">Add row</button>
      </XUIEditableTableFootActions>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tfoot>
          <XUIEditableTableFootActions>
            <button type="button">Add row</button>
          </XUIEditableTableFootActions>
        </tfoot>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
