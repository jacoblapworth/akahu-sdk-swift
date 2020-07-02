import React from 'react';
import renderer from 'react-test-renderer';
import XUIDropdownFooter from '../XUIDropdownFooter.js';
import Pickitem from '../../picklist/Pickitem';

describe('<XUIDropdownFooter />', () => {
  it('should render an automation id when a qaHook is passed', () => {
    const automationId = renderer.create(
      <XUIDropdownFooter qaHook="dropdownfooter-example">content</XUIDropdownFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });
  it('should render a picklist with context class when pickItems are passed', () => {
    const automationId = renderer.create(
      <XUIDropdownFooter pickItems={<Pickitem id="footerAction">Add New Person</Pickitem>} />,
    );

    expect(automationId).toMatchSnapshot();
  });
});
