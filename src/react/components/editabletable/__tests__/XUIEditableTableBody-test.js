import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { v4 as uuidv4 } from 'uuid';

import XUIEditableTableBody from '../XUIEditableTableBody';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testBodyId');

Enzyme.configure({ adapter: new Adapter() });

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
});