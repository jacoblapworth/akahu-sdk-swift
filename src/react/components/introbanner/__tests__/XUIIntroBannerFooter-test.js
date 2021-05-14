import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIButton from '../../button/XUIButton';
import XUIIntroBannerFooter from '../XUIIntroBannerFooter';
import NOOP from '../../helpers/noop';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUIIntroBannerFooter {...props}>
    <XUIButton fullWidth="small-down" onClick={NOOP} size="small" variant="standard">
      Read guide
    </XUIButton>
  </XUIIntroBannerFooter>
);

describe('XUIIntroBannerFooter', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'introbanner-footer' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders extra classes when passed to the className prop', () => {
    const { asFragment } = render(createComponent({ className: 'introbanner-footer-class' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
