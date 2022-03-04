// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

// Components we need to test with
import XUICapsule from '../XUICapsule';

import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const capsuleContent = text('Capsule content', 'Client’s name');
  const hasOnClickHandler = boolean('Has onClick handler', false);
  const href = text('href', 'https://go.xero.com/ReportPacks/OrganisationReportFields.aspx');
  return (
    <XUICapsule
      className={text('className', '')}
      href={href === '' ? null : href}
      isLink={boolean('isLink', true)}
      isValid={boolean('isValid', true)}
      onClick={hasOnClickHandler ? () => {} : undefined}
      target={text('target', '_blank')}
    >
      {capsuleContent}
    </XUICapsule>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.value;

    return <XUICapsule {...variationMinusStoryDetails}>{variation.value}</XUICapsule>;
  });
});
