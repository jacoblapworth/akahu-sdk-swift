import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIIntroBannerBody from '../XUIIntroBannerBody';

import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUIIntroBannerBody {...props}>
    <p>Intro Banner Body Text</p>
  </XUIIntroBannerBody>
);

describe('XUIIntroBannerBody', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'introbanner-body' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders extra classes when passed to the className prop', () => {
    const { asFragment } = render(createComponent({ className: 'introbanner-body-class' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
