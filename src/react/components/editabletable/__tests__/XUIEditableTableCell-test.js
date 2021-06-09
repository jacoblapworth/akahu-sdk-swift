import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import XUIEditableTableCell from '../XUIEditableTableCell';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableCell>XUIEditableTableCell</XUIEditableTableCell>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableCell className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCell>XUIEditableTableCell</XUIEditableTableCell>
          </tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('renders end-aligned cells', () => {
    // Arrange
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCell qaHook="testId" inlineAlignment="end" />
          </tr>
        </tbody>
      </table>,
    );

    // Assert
    expect(screen.getByTestId('testId')).toHaveClass('xui-editabletablecell-rightaligned');
  });
});
