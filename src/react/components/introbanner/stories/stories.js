import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import external from '@xero/xui-icon/icons/external';
import videoIcon from '@xero/xui-icon/icons/social-youtube';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import XUIButton from '../../button/XUIButton';
import NOOP from '../../helpers/noop';
import XUIIcon from '../../icon/XUIIcon';
import XUIIntroBanner from '../XUIIntroBanner';
import XUIIntroBannerBody from '../XUIIntroBannerBody';
import XUIIntroBannerFooter from '../XUIIntroBannerFooter';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const body = (
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about{' '}
      <a aria-label="setting up tracked inventory - opens in a new tab" href="">
        setting up tracked inventory <XUIIcon icon={external} />
      </a>{' '}
      and{' '}
      <a aria-label="managing your inventory items - opens in a new tab" href="">
        managing your inventory items <XUIIcon icon={external} />
      </a>
    </p>
  </XUIIntroBannerBody>
);

const footer = (hasVideoIllustration, videoButtonLabel) => (
  <XUIIntroBannerFooter>
    {hasVideoIllustration ? (
      <XUIButton leftIcon={videoIcon} onClick={NOOP} size="small" variant="standard">
        {videoButtonLabel || 'Watch video  [3:26]'}
      </XUIButton>
    ) : (
      <XUIButton onClick={NOOP} rightIcon={external} size="small" variant="standard">
        {videoButtonLabel || 'Watch video on Xero TV'}
      </XUIButton>
    )}
  </XUIIntroBannerFooter>
);

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const dismissButtonText = text('dismissButtonText', 'Hide');
  const hasFooter = boolean('Has footer', true);
  const headerTitle = text('headerTitle', 'Learn how to manage your inventory');
  const illustrationUrl = text(
    'illustrationUrl',
    'https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg',
  );
  const illustrationAltText = text(
    'illustrationAltText',
    'Two people sitting at a table looking at a laptop',
  );
  const hasVideoIllustration = boolean('Has video illustration', false);
  const videoButtonLabel = text('videoButtonLabel');

  return (
    <XUIIntroBanner
      dismissButtonText={dismissButtonText}
      footer={hasFooter ? footer(hasVideoIllustration, videoButtonLabel) : undefined}
      headerTitle={headerTitle}
      illustrationAltText={illustrationAltText}
      illustrationUrl={illustrationUrl}
      onDismiss={NOOP}
      onVideoClick={hasVideoIllustration ? NOOP : undefined}
      videoButtonLabel={hasVideoIllustration ? videoButtonLabel : undefined}
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
    const { dismissButtonText, hasFooter, hasIllustration, hasVideo, headerTitle } =
      variationMinusStoryDetails;

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
