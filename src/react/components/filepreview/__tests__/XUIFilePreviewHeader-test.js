import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

import cross from '@xero/xui-icon/icons/cross';
import importIcon from '@xero/xui-icon/icons/import';
import XUIFilePreviewHeader from '../XUIFilePreviewHeader';
import { XUIButton, XUIIconButton } from '../../../button';
import { XUIIcon } from '../../../icon';

expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUIFilePreviewHeader title="test title" {...props}></XUIFilePreviewHeader>
);

const navigationButton = <XUIIconButton ariaLabel="close" icon={cross} onClick={() => {}} />;
const downloadAction = (
  <XUIButton size="small" variant="borderless-main">
    <XUIIcon icon={importIcon} />
    Download
  </XUIButton>
);

describe('<XUI XUIFilePreviewHeader/>', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'test-filepreviewheader' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders any additional classes provided through the className prop', () => {
    const { asFragment } = render(createComponent({ className: 'filepreviewheader-class' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders alternate wrapping element, if provided', () => {
    const { asFragment } = render(createComponent({ headerTag: 'article' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with all content supplied', () => {
    const { asFragment } = render(
      createComponent({
        actions: downloadAction,
        children: <a>link</a>,
        headingLevel: 3,
        navigationButton,
        secondary: 'Secondary title',
        title: 'Required title',
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
