import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableCellReadOnly from '../XUIEditableTableCellReadOnly';
import XUIEditableTableCell from '../XUIEditableTableCell';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCellReadOnly />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellReadOnly>XUIEditableTableCellReadOnly</XUIEditableTableCellReadOnly>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellReadOnly cellProps={{ className: 'test-classname' }} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellReadOnly>
              XUIEditableTableCellReadOnly
            </XUIEditableTableCellReadOnly>
          </tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('spreading props', () => {
    it('spreads cellProps onto the table cell', () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellReadOnly cellProps={{ width: '50px' }} />
            </tr>
          </tbody>
        </table>,
      );
      expect(wrapper.find(XUIEditableTableCell).getDOMNode().getAttribute('width')).toBe('50px');
    });

    it('spreads everything else, too', () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellReadOnly id="testId" />
            </tr>
          </tbody>
        </table>,
      );
      expect(wrapper.find(XUIEditableTableCell).props().id).toBe('testId');
    });
  });
});
