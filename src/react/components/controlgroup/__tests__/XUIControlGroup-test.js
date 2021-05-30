import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { nanoid } from 'nanoid';
import XUIControlGroup from '../XUIControlGroup';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testControlGroupId');

describe('<XUIControlGroup/>', () => {
  it('renders expected markup', () => {
    const testGroup = mount(<XUIControlGroup>Test</XUIControlGroup>);

    expect(toJson(testGroup)).toMatchSnapshot();
  });
  it('renders extra classes and qaHook, if supplied', () => {
    const testHook = 'testHook';
    const testGroup = mount(
      <XUIControlGroup fieldClassName="testClass" qaHook={testHook}>
        Testing bar content
      </XUIControlGroup>,
    );

    expect(testGroup.find('div').first().hasClass('testClass')).toBeTruthy();
    expect(testGroup.find(`.xui-controlgroup[data-automationid="${testHook}"]`).length).toBe(1);
  });
  it('renders expected markup for vertical variant with non-default props', () => {
    const testGroup = mount(
      <XUIControlGroup
        ariaRole="radioGroup"
        hintMessage="Group hint"
        isLabelHidden
        isLockedVertical
        label="Group label"
      >
        Test
      </XUIControlGroup>,
    );

    expect(toJson(testGroup)).toMatchSnapshot();
  });
  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIControlGroup>Test</XUIControlGroup>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
