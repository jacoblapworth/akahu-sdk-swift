import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIPicklistDivider from '../XUIPicklistDivider';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPicklistDivider />', () => {
  it('basic example', () => {
    const header = renderer.create(<XUIPicklistDivider />);
    expect(header).toMatchSnapshot();
  });

  it('with custom class', () => {
    const header = renderer.create(<XUIPicklistDivider className="custom-divider" />);
    expect(header).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <ul>
        <XUIPicklistDivider />
      </ul>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
