import React from 'react';
import renderer from 'react-test-renderer';
import XUIDropDownFooter from '../XUIDropDownFooter.js';
import Pickitem from '../../picklist/Pickitem';

describe('<XUIDropDownFooter />', () => {
  it('should render an automation id when a qaHook is passed', () => {
    const automationId = renderer.create(
      <XUIDropDownFooter qaHook="dropdownfooter-example">content</XUIDropDownFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });
  it('should render a picklist with context class when pickItems are passed', () => {
    const automationId = renderer.create(
      <XUIDropDownFooter pickItems={<Pickitem id="footerAction">Add New Person</Pickitem>} />,
    );

    expect(automationId).toMatchSnapshot();
  });
});
