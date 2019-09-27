import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import XUIToastWrapper from '../XUIToastWrapper';

describe('<XUIToastWrapper />', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('should render a passed qaHook as an automation id', () => {
    const toastWrapper = renderer.create(
      <XUIToastWrapper qaHook="toast-actions">Wrapper</XUIToastWrapper>,
    );

    expect(toastWrapper).toMatchSnapshot();
  });

  it('should render a passed custom class', () => {
    const toastWrapper = renderer.create(
      <XUIToastWrapper className="custom-class">Message Content</XUIToastWrapper>,
    );

    expect(toastWrapper).toMatchSnapshot();
  });

  it('should render closed', () => {
    const toastWrapper = renderer.create(<XUIToastWrapper />);

    expect(toastWrapper).toMatchSnapshot();
  });
});
