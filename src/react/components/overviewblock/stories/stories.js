// Libs
import React from 'react';

// Components we need to test with
import XUIOverviewBlock from '../XUIOverviewBlock';
import XUIOverviewSection from '../XUIOverviewSection';
import { overviewSentiments } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import XUIProgressLinear from '../../progressindicator/XUIProgressLinear';

const buildExampleSections = children =>
  children.map((child, index) => <XUIOverviewSection key={index} {...child} />);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {
  const indicator = (
    <XUIProgressLinear
      hasToolTip
      id="testId"
      progress={4}
      toolTipMessage="4 out of 10"
      total={10}
    />
  );
  const includeProgress = boolean('include progress?', false);
  const blockTextAlignment = select('textAlignment', ['left', 'center', 'right'], 'center');
  return (
    <XUIOverviewBlock
      hasBackground={boolean('hasBackground', true)}
      hasBorder={boolean('hasBorder', true)}
      textAlignment={blockTextAlignment}
    >
      <XUIOverviewSection
        label="Draft"
        sentiment={select(
          'sentiment for first',
          Object.keys(overviewSentiments),
          Object.keys(overviewSentiments)[0],
        )}
        textAlignment={select(
          'alignment for first',
          ['left', 'center', 'right'],
          blockTextAlignment,
        )}
        value="$1,234.56"
      >
        {includeProgress && indicator}
      </XUIOverviewSection>
      <XUIOverviewSection label="Paid" value="$5,432.10">
        {includeProgress && indicator}
      </XUIOverviewSection>
      <XUIOverviewSection label="Overdue" value="$34.56">
        {includeProgress && indicator}
      </XUIOverviewSection>
    </XUIOverviewBlock>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const { storyTitle, storyKind, sections, ...variationMinusStoryDetails } = variation;

  storiesWithVariations.add(storyTitle, () => {
    return (
      <div style={variationMinusStoryDetails.style || { minWidth: '500px' }}>
        <XUIOverviewBlock {...variationMinusStoryDetails}>
          {buildExampleSections(sections)}
        </XUIOverviewBlock>
      </div>
    );
  });
});