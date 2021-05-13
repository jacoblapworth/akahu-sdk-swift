import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIIntroBanner from '../XUIIntroBanner';
import NOOP from '../../helpers/noop';
import { fireEvent, render, screen } from '@testing-library/react';

expect.extend(toHaveNoViolations);

const onDismissMock = jest.fn();

const createComponent = props => (
  <XUIIntroBanner
    {...props}
    dismissButtonText="Hide"
    headerTitle="Intro header"
    onDismiss={onDismissMock}
  >
    <div />
  </XUIIntroBanner>
);

describe('XUIIntroBanner', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire onDismiss when the dismiss button is clicked', () => {
    render(createComponent());
    fireEvent.click(screen.getByText('Hide'));
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  test('renders a passed qaHook as an automationId', () => {
    const { asFragment } = render(createComponent({ qaHook: 'introbanner' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders any additional classes provided through the className and headerClassName props', () => {
    const { asFragment } = render(
      createComponent({
        className: 'introbanner-class',
        headerClassName: 'introbanner-header-class',
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders illustration variant correctly', () => {
    const { asFragment } = render(
      createComponent({
        illustrationAltText: 'Image description goes here',
        illustrationUrl: 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg',
        qaHook: 'introbanner',
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders video illustration variant correctly', () => {
    const { asFragment } = render(
      createComponent({
        footer: <div />,
        illustrationAltText: 'Image description goes here',
        illustrationUrl: 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg',
        onVideoClick: NOOP,
        qaHook: 'introbanner',
        videoButtonLabel: 'Watch video',
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire onVideoClick when the video button is clicked', () => {
    const onVideoClick = jest.fn();
    render(
      createComponent({
        footer: <div />,
        illustrationAltText: 'Image description goes here',
        illustrationUrl: 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg',
        onVideoClick,
        qaHook: 'introbanner',
        videoButtonLabel: 'Watch video',
      }),
    );

    fireEvent.click(screen.getByTestId('introbanner--illustration'));

    expect(onVideoClick).toHaveBeenCalledTimes(1);
  });

  test('basic variant should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('video illustration variant should pass accessibility testing', async () => {
    const { container } = render(
      createComponent({
        footer: <div />,
        illustrationAltText: 'Image description goes here',
        illustrationUrl: 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg',
        qaHook: 'introbanner',
        onVideoClick: NOOP,
        videoButtonLabel: 'Watch video',
      }),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
