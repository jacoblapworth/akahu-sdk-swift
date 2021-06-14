// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

// Components we need to test with
import external from '@xero/xui-icon/icons/external';
import videoIcon from '@xero/xui-icon/icons/social-youtube';
import XUIIcon from '../../icon/XUIIcon';
import XUIIntroBanner from '../XUIIntroBanner';
import XUIIntroBannerBody from '../XUIIntroBannerBody';
import XUIIntroBannerFooter from '../XUIIntroBannerFooter';
import XUIButton from '../../button/XUIButton';

import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import NOOP from '../../helpers/noop';
import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';

const body = (
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about{' '}
      <a href="">
        setting up tracked inventory <XUIIcon icon={external} />
      </a>{' '}
      and{' '}
      <a href="">
        managing your inventory items <XUIIcon icon={external} />
      </a>
    </p>
  </XUIIntroBannerBody>
);

const footer = hasVideoIllustration => (
  <XUIIntroBannerFooter>
    {hasVideoIllustration ? (
      <XUIButton leftIcon={videoIcon} onClick={NOOP} size="small" variant="standard">
        Watch video [3:26]
      </XUIButton>
    ) : (
      <XUIButton onClick={NOOP} rightIcon={external} size="small" variant="standard">
        Watch video on Xero TV
      </XUIButton>
    )}
  </XUIIntroBannerFooter>
);

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const hasFooter = boolean('Has footer', true);
  const hasIllustration = boolean('Has illustration', true);
  const hasVideoIllustration = boolean('Has video illustration', false);

  const settings = {
    footer: hasFooter ? footer(hasVideoIllustration) : undefined,
    illustrationUrl: hasIllustration
      ? 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg'
      : undefined,
    onVideoClick: hasVideoIllustration ? NOOP : undefined,
  };
  return (
    <XUIIntroBanner
      {...settings}
      dismissButtonText="Hide"
      headerTitle="Learn how to manage your inventory"
      onDismiss={NOOP}
      videoButtonLabel={hasVideoIllustration ? 'Watch video' : undefined}
    >
      {body}
    </XUIIntroBanner>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);
variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const {
      dismissButtonText,
      hasFooter,
      hasIllustration,
      hasVideo,
      headerTitle,
    } = variationMinusStoryDetails;

    return (
      <XUIIntroBanner
        dismissButtonText={dismissButtonText || 'Hide'}
        footer={hasFooter ? footer(hasVideo) : undefined}
        headerTitle={headerTitle || 'Learn how to manage your inventory'}
        illustrationUrl={
          hasIllustration
            ? 'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg'
            : undefined
        }
        onDismiss={NOOP}
        onVideoClick={hasVideo ? NOOP : undefined}
        videoButtonLabel={hasVideo ? 'Watch video' : undefined}
      >
        {body}
      </XUIIntroBanner>
    );
  });
});
