import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import XUIModalFooter from '../XUIModalFooter';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIModalFooter', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalFooter qaHook={'test-modal--footer'}>
        <div />
      </XUIModalFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIModalFooter>
        <h1>Meow</h1>
      </XUIModalFooter>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
