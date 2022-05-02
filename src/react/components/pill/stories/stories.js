// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, object, select } from '@storybook/addon-knobs';

// Components we need to test with
import { sizeClasses } from '../private/constants';
import XUIPill from '../XUIPill';

import NOOP from '../../helpers/noop';
import {
  variations,
  avatarProps,
  storiesWithVariationsKindName,
  storiesWithKnobsKindName,
} from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => (
  <XUIPill
    avatarProps={object('avatarProps', avatarProps)}
    className={text('className', '')}
    deleteButtonLabel={text('deleteButtonLabel', 'Delete')}
    hasLimitedWidth={boolean('hasLimitedWidth', false)}
    href={text('href', '')}
    isInvalid={boolean('isInvalid', false)}
    isSecondaryTextTruncated={boolean('isSecondaryTextTruncated', true)}
    isValueTruncated={boolean('isValueTruncated', true)}
    onClick={NOOP}
    onDeleteClick={NOOP}
    qaHook={text('qaHook', '')}
    secondaryText={text('secondaryText', '')}
    size={select('Size', Object.keys(sizeClasses), 'medium')}
    target={text('target', '')}
    title={text('title', '')}
    value={text('value', 'Plain pill')}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    variationMinusStoryDetails.title =
      variationMinusStoryDetails.title || 'A reasonable Pill title';

    if (!variationMinusStoryDetails.omitDeleteBtn) {
      variationMinusStoryDetails.onDeleteClick = NOOP;
      variationMinusStoryDetails.deleteButtonLabel =
        variationMinusStoryDetails.deleteButtonLabel || 'Delete Button Label';
    } else {
      delete variationMinusStoryDetails.omitDeleteBtn;
    }

    return <XUIPill {...variationMinusStoryDetails} />;
  });
});
