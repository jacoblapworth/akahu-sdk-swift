// Libs
import React from 'react';
import cross from '@xero/xui-icon/icons/cross';
import importIcon from '@xero/xui-icon/icons/import';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';

// Components we need to test with
import FullPageStoryWrapper from '../../../stories/helpers/FullPageStoryWrapper';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

import XUIFilePreview from '../XUIFilePreview';
import XUIFilePreviewHeader from '../XUIFilePreviewHeader';
import XUIButton, { XUIIconButton } from '../../../button';
import XUIIcon from '../../../icon';
import ExampleFooter from './helpers/ExampleFooter';

const Example = ({ previewContainer }) => {
  const hasNavBtn = boolean('navigationButton?', true);
  const hasAction = boolean('actions?', true);

  const navigationButton =
    (hasNavBtn && <XUIIconButton ariaLabel="close" icon={cross} onClick={() => {}} />) || undefined;
  const downloadAction =
    (hasAction && (
      <>
        <XUIButton className="xui-text-truncated" size="small" variant="borderless-main">
          <XUIIcon className="xui-margin-right-xsmall" icon={importIcon} />
          Download
        </XUIButton>
        <XUIButton size="small" variant="create">
          New
        </XUIButton>
      </>
    )) ||
    undefined;
  const header = (
    <XUIFilePreviewHeader
      actions={downloadAction}
      navigationButton={navigationButton}
      secondary={text('secondary', 'from Hornblower Enterprises')}
      title={text('title', 'illustration_casual-meeting-01_casual-meeting-01.svg')}
    />
  );

  const wrapperStyles =
    previewContainer === 'full'
      ? { height: '100vh' }
      : {
          width: '50%',
          maxHeight: '70vh',
          overflow: 'auto',
          position: 'absolute',
          bottom: '0',
        };
  const imgSettings =
    previewContainer === 'full'
      ? {
          alt: 'Conversation at table',
          src: 'https://edge.xero.com/illustration/casual-meeting-01/casual-meeting-01.svg',
          style: { maxHeight: '100%', maxWidth: '100%' },
        }
      : {
          alt: 'Person running',
          src: 'https://edge.xero.com/illustration/person-running-01/person-running-01.svg',
          style: { maxWidth: '100%' },
        };

  return (
    <FullPageStoryWrapper>
      <div style={wrapperStyles}>
        <XUIFilePreview footer={<ExampleFooter />} header={header}>
          <img alt="" {...imgSettings} />
        </XUIFilePreview>
      </div>
    </FullPageStoryWrapper>
  );
};
<Example />;

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => (
  <Example previewContainer={select('Preview container', ['side container', 'full'], 'full')} />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const { storyKind, storyTitle, ...variationMinusStoryDetails } = variation;
    return (
      <Example previewContainer={variation.storyTitle === 'default' ? 'full' : 'side container'} />
    );
  });
});
