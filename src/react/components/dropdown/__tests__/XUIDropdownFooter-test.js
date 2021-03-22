import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDropdownFooter from '../XUIDropdownFooter.js';
import XUIPickitem from '../../picklist/XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIDropdownFooter />', () => {
  it('should render an automation id when a qaHook is passed', () => {
    const automationId = renderer.create(
      <XUIDropdownFooter qaHook="dropdownfooter-example">content</XUIDropdownFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });
  it('should render a picklist with context class when pickItems are passed', () => {
    const automationId = renderer.create(
      <XUIDropdownFooter pickItems={<XUIPickitem id="footerAction">Add New Person</XUIPickitem>} />,
    );

    expect(automationId).toMatchSnapshot();
  });
  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIDropdownFooter>content</XUIDropdownFooter>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
