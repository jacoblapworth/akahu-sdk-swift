import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import XUIModalBody from '../XUIModalBody';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIModalBody', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalBody qaHook={'test-modal--body'}>
        <div />
      </XUIModalBody>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIModalBody>
        <h1>Meow</h1>
      </XUIModalBody>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
