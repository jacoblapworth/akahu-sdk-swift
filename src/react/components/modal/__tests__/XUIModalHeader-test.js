import React from 'react';
import renderer from 'react-test-renderer';
import XUIModalHeader from '../XUIModalHeader';

describe('XUIModalHeader', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(
      <XUIModalHeader qaHook={'test-modal--header'}>
        <div />
      </XUIModalHeader>,
    );

    expect(automationId).toMatchSnapshot();
  });
});
