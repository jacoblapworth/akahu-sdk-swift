import React from 'react';
import renderer from 'react-test-renderer';
import XUIModalBody from '../XUIModalBody';

describe('XUIModalBody', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalBody qaHook={'test-modal--body'}>
        <div />
      </XUIModalBody>,
    );

    expect(automationId).toMatchSnapshot();
  });
});
