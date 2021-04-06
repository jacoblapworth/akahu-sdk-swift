import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUISwitch from '../XUISwitch';
import XUISwitchGroup from '../XUISwitchGroup';

const NOOP = () => {};

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUISwitchGroup', () => {
  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUISwitchGroup>
        <XUISwitch onChange={NOOP}>Switch</XUISwitch>
      </XUISwitchGroup>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
