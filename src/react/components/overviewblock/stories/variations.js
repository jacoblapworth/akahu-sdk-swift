import React from 'react';
import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';
import XUIProgressLinear from '../../progressindicator/XUIProgressLinear';

const storiesWithVariationsKindName = 'Instances/XUIOverviewBlock';

const buildPI = (total, progress) => (
  <XUIProgressLinear
    hasToolTip
    id="testId"
    progress={progress}
    toolTipMessage={`${progress} out of ${total}`}
    total={total}
  />
);

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `basic`,
    sections: [
      { label: 'hello', value: 'there' },
      { label: 'good', value: 'morning' },
      { label: 'good', value: 'bye' },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `minimalist and left-aligned with progress`,
    viewports: desktopPlus320,
    hasBorder: false,
    hasBackground: false,
    textAlignment: 'left',
    sections: [
      { label: 'paid', value: '1,582.99', children: buildPI(10, 4) },
      { label: 'unpaid', value: '0.68', children: buildPI(10, 6) },
      { label: 'draft', value: '103.75', children: buildPI(10, 8) },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with more sections and colors`,
    sections: [
      { label: 'hello', value: 'there' },
      { label: 'paid', value: '1,582.99', sentiment: 'positive' },
      { label: 'unpaid', value: '0.68', sentiment: 'negative' },
      { label: 'draft', value: '103.75', sentiment: 'muted' },
      { label: 'there', value: 'you go' },
      { label: 'paid', value: '1,582.99', sentiment: 'positive' },
      { label: 'unpaid', value: '0.68', sentiment: 'negative' },
      { label: 'draft', value: '103.75', sentiment: 'muted' },
    ],
    style: { minWidth: '0px' },
    viewports: commonViewports,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `without layout`,
    hasLayout: false,
    sections: [
      { label: 'hello', value: 'there' },
      { label: 'there', value: 'you go' },
    ],
  },
];

export { storiesWithVariationsKindName, variations };
