import React from 'react';
import XUIButtonGroup from '../XUIButtonGroup';
import renderer from 'react-test-renderer';

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
});
