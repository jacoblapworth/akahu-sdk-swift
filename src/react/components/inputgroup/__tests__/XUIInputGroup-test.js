import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { v4 as uuidv4 } from 'uuid';
import XUIInputGroup from '../XUIInputGroup';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('uuid');
uuidv4.mockImplementation(() => 'testInputGroupId');

describe('<XUIInputGroup/>', () => {
  it('renders expected markup', () => {
    const testGroup = mount(<XUIInputGroup>Test</XUIInputGroup>);

    expect(toJson(testGroup)).toMatchSnapshot();
  });
  it('renders extra classes and qaHook, if supplied', () => {
    const testHook = 'testHook';
    const testGroup = mount(
      <XUIInputGroup fieldClassName="testClass" qaHook={testHook}>
        Testing bar content
      </XUIInputGroup>,
    );

    expect(testGroup.find('div').first().hasClass('testClass')).toBeTruthy();
    expect(testGroup.find(`.xui-inputgroup[data-automationid="${testHook}"]`).length).toBe(1);
  });
  it('renders expected markup for vertical variant with non-default props', () => {
    const testGroup = mount(
      <XUIInputGroup
        ariaRole="radioGroup"
        hintMessage="Group hint"
        isLabelHidden
        isLockedVertical
        label="Group label"
      >
        Test
      </XUIInputGroup>,
    );

    expect(toJson(testGroup)).toMatchSnapshot();
  });
});
