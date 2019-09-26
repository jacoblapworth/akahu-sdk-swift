import React from 'react';
import XUIButtonCaret from '../XUIButtonCaret';
import renderer from 'react-test-renderer';

describe('XUIButtonCaret', () => {
  it('renders a passed qaHook as an automationId', () => {
    const automationId = renderer.create(<XUIButtonCaret qaHook="button-caret" />);

    expect(automationId).toMatchSnapshot();
  });
});
