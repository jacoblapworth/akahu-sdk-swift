// Libs
import React from 'react';

// Components we need to test with
import XUIIsolationHeader from '../XUIIsolationHeader';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

/* eslint-disable react/prop-types */
function getComponent({
  actionIcon,
  hasActionsPrimaryButton,
  hasActionsSecondaryButton,
  hasAvatar,
  hasTag,
  navigationIcon,
  secondaryTitle,
  title,
}) {
  const navigationButton = navigationIcon && (
    <XUIIconButton ariaLabel="navigate" icon={flattenedIconMap[navigationIcon]} />
  );
  const avatar = hasAvatar && <XUIAvatar size="small" value="ABC" />;
  const tags = hasTag
    ? [
        <XUITag key="tag-1" size="medium" variant="positive">
          Tag
        </XUITag>,
      ]
    : undefined;

  const primaryAction = hasActionsPrimaryButton && (
    <XUIButton size="small" variant="primary">
      Primary
    </XUIButton>
  );
  const secondaryAction = hasActionsSecondaryButton && (
    <XUIButton size="small" variant="standard">
      Secondary
    </XUIButton>
  );
  const iconAction = actionIcon && (
    <XUIIconButton ariaLabel="action" icon={flattenedIconMap[actionIcon]} />
  );

  const actions = (
    <React.Fragment>
      {secondaryAction}
      {primaryAction}
      {iconAction}
    </React.Fragment>
  );

  return (
    <div style={{ maxWidth: '600px' }}>
      <XUIIsolationHeader
        actions={actions}
        avatar={avatar}
        navigationButton={navigationButton}
        qaHook="isolationheader"
        secondary={secondaryTitle}
        tags={tags}
        title={title}
      />
    </div>
  );
}
/* eslint-enable react/prop-types */

storiesWithKnobs.add('Playground', () =>
  getComponent({
    title: text('Title', ''),
    secondaryTitle: text('Secondary title', ''),
    isPositionFixed: boolean('Is position fixed', false),
    navigationIcon: select('Navigation icon', flattenedIconList, 'cross'),
    actionIcon: select('Action icon', flattenedIconList, 'overflow'),
    hasActionsPrimaryButton: boolean('Has primary action button', false),
    hasActionsSecondaryButton: boolean('Has secondary action button', false),
    hasTag: boolean('Has tag', false),
    hasAvatar: boolean('Has avatar', false),
  }),
);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    return getComponent(variationMinusStoryDetails);
  });
});
