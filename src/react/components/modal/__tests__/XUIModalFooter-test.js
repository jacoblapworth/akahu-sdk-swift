import React from 'react';
import renderer from 'react-test-renderer';
import XUIModalFooter from '../XUIModalFooter';

describe('XUIModalFooter', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalFooter qaHook={'test-modal--footer'}>
        <div />
      </XUIModalFooter>,
    );

    expect(automationId).toMatchSnapshot();
  });
});
