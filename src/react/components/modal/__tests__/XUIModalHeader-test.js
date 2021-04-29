import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import XUIModalHeader from '../XUIModalHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIModalHeader', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalHeader qaHook={'test-modal--header'}>
        <div />
      </XUIModalHeader>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIModalHeader>
        <h1>Meow</h1>
      </XUIModalHeader>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
