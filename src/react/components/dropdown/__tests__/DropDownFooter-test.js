import React from 'react';
import renderer from 'react-test-renderer';
import DropDownFooter from '../DropDownFooter.js';
import Pickitem from '../../picklist/Pickitem';

describe('<DropDownFooter />', () => {
  it('should render an automation id when a qaHook is passed', () => {
    const automationId = renderer.create(
      <DropDownFooter qaHook="dropdownfooter-example">content</DropDownFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });
  it('should render a picklist with context class when pickItems are passed', () => {
    const automationId = renderer.create(
      <DropDownFooter pickItems={<Pickitem id="footerAction">Add New Person</Pickitem>} />,
    );

    expect(automationId).toMatchSnapshot();
  });
});
