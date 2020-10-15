import React from 'react';
import renderer from 'react-test-renderer';
import XUIDropdownFooter from '../XUIDropdownFooter.js';
import XUIPickitem from '../../picklist/XUIPickitem';

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
});
