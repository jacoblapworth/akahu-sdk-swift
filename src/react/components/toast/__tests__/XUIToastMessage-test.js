import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastMessage from '../XUIToastMessage';

describe('<XUIToastMessage />', () => {
  it('should render a passed qaHook as an automation id', () => {
    const toastMessage = renderer.create(
      <XUIToastMessage qaHook="toast-actions">Message Content</XUIToastMessage>,
    );

    expect(toastMessage).toMatchSnapshot();
  });

  it('should render a passed custom class', () => {
    const toastMessage = renderer.create(
      <XUIToastMessage className="custom-class">Message Content</XUIToastMessage>,
    );

    expect(toastMessage).toMatchSnapshot();
  });
});
