import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIButton from '../XUIButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';
import XUISecondaryButton from '../XUISecondaryButton';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUISplitButtonGroup', () => {
  it('XUISplitButtonGroup + XUISecondaryButton should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUISplitButtonGroup>
        <XUIButton>Split action</XUIButton>
        <XUIDropdownToggled
          dropdown={<div />}
          trigger={<XUISecondaryButton aria-label="Other actions" />}
        />
      </XUISplitButtonGroup>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
