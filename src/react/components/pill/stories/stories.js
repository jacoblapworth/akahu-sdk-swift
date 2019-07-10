// Libs
import React from 'react';

// Components we need to test with
import XUIPill from '../XUIPill';
import { sizeClasses } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import NOOP from '../../helpers/noop';
import { variations, avatarProps, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <XUIPill
    value={text('value', 'Plain pill')}
    secondaryText={text('secondaryText', '')}
    title={text('title', '')}
    target={text('target', '')}
    qaHook={text('qaHook', '')}
    onDeleteClick={NOOP}
    onClick={NOOP}
    isInvalid={boolean('isInvalid', false)}
    href={text('href', '')}
    deleteButtonLabel={text('deleteButtonLabel', undefined)}
    className={text('className', '')}
    avatarProps={object('avatarProps', avatarProps)}
    size={select('Size', Object.keys(sizeClasses), 'medium')}
    isLimitedWidth={boolean('isLimitedWidth', false)}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

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

    if (variationMinusStoryDetails.isSingle) {
      delete variationMinusStoryDetails.isSingle;
      return (
        <div className="xui-textinput" style={{ width: '200px' }}>
          <XUIPill {...variationMinusStoryDetails} />
        </div>
      );
    }

    return <XUIPill {...variationMinusStoryDetails} />;
  });
});
