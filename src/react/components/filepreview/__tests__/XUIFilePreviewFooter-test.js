import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIFilePreviewFooter from '../XUIFilePreviewFooter';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUIFilePreviewFooter {...props}>
    <div />
  </XUIFilePreviewFooter>
);

describe('<XUI XUIFilePreviewFooter/>', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'test-filepreviewfooter' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders any additional classes provided through the className prop', () => {
    const { asFragment } = render(createComponent({ className: 'filepreviewfooter-class' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders alternate wrapping element, if provided', () => {
    const { asFragment } = render(createComponent({ footerTag: 'section' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
