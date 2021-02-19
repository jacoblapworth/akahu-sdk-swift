import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import star from '@xero/xui-icon/icons/star';

import XUIEditableTableCellIconButton from '../XUIEditableTableCellIconButton';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellIconButton ariaLabel="test-aria-label" iconReference={star} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellIconButton
        ariaLabel="test-aria-label"
        cellProps={{
          className: 'test-classname',
        }}
        iconReference={star}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellIconButton ariaLabel="test-aria-label" iconReference={star} />
          </tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
