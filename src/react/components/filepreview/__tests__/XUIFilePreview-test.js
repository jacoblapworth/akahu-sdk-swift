import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIFilePreview from '../XUIFilePreview';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUIFilePreview {...props}>
    <div />
  </XUIFilePreview>
);

describe('<XUI FilePreview/>', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'test-preview' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders any additional classes provided through the className prop', () => {
    const { asFragment } = render(createComponent({ className: 'filepreview-class' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders passed header and footer nodes', () => {
    const { asFragment } = render(
      createComponent({ footer: <footer></footer>, header: <header></header> }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
