import React from 'react';
import XUIFixedFooterWIP from '../XUIFixedFooterWIP';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

// throwing this in to ignore the _intentional_ console warnings and allow tests to run.
jest.mock('console');

describe('<XUIFixedFooterWIP/>', () => {
  it('renders expected markup', () => {
    const testFooter = mount(<XUIFixedFooterWIP>Testing</XUIFixedFooterWIP>);

    expect(toJson(testFooter)).toMatchSnapshot();
  });

  it('renders extra classes and qaHook, if supplied', () => {
    const testHook = 'testHook';
    const testFooter = mount(
      <XUIFixedFooterWIP className="testClass" qaHook={testHook}>
        Testing bar content
      </XUIFixedFooterWIP>,
    );

    expect(testFooter.hasClass('testClass')).toBeTruthy();
    expect(testFooter.find(`.xui-fixedfooter[data-automationid="${testHook}"]`).length).toBe(1);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIFixedFooterWIP>Testing</XUIFixedFooterWIP>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
