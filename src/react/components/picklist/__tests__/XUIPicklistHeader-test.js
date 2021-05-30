import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIPicklistHeader from '../XUIPicklistHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPicklistHeader />', () => {
  it('basic example', () => {
    const header = renderer.create(<XUIPicklistHeader>Some header text</XUIPicklistHeader>);
    expect(header).toMatchSnapshot();
  });

  it('with all options', () => {
    const allOptions = renderer.create(
      <XUIPicklistHeader id="headerId" className="custom-header-class" ariaRole="presentation">
        Some header text
      </XUIPicklistHeader>,
    );
    expect(allOptions).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <ul>
        <XUIPicklistHeader>Some header text</XUIPicklistHeader>
      </ul>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
