import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIButtonGroup from '../XUIButtonGroup';
import renderer from 'react-test-renderer';
import XUIButton from '../XUIButton';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIButtonGroup', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIButtonGroup qaHook="buttongroup">
        <div />
        <div />
      </XUIButtonGroup>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIButtonGroup qaHook="buttongroup">
        <XUIButton onClick={() => {}}>test</XUIButton>
        <XUIButton onClick={() => {}}>test</XUIButton>
      </XUIButtonGroup>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
