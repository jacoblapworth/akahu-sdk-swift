import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { nanoid } from 'nanoid';

import XUIEditableTableBody from '../XUIEditableTableBody';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testBodyId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableBody />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <table>
        <XUIEditableTableBody>
          <tr>
            <td>XUIEditableTableBody</td>
          </tr>
        </XUIEditableTableBody>
      </table>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = mount(
      <table>
        <XUIEditableTableBody className="test-classname" />
      </table>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <XUIEditableTableBody>
          <tr>
            <td>XUIEditableTableBody</td>
          </tr>
        </XUIEditableTableBody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
