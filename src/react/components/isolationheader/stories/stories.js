// Libs
import React from 'react';

// Components we need to test with
import XUIIsolationHeader from '../XUIIsolationHeader';
import XUIIsolationHeaderNavigation from '../XUIIsolationHeaderNavigation';
import XUIIsolationHeaderActions from '../XUIIsolationHeaderActions';
import XUIIsolationHeaderTitle from '../XUIIsolationHeaderTitle';
import XUIIsolationHeaderSecondaryTitle from '../XUIIsolationHeaderSecondaryTitle';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

/* eslint-disable react/prop-types */
function getComponent({
  isPositionFixed,
  title,
  secondaryTitle,
  navigationIcon,
  actionIcon,
  hasTag,
  hasAvatar,
  hasActionsPrimaryButton,
  hasActionsSecondaryButton,
}) {
  return (
    <div style={{ maxWidth: '600px' }}>
      <XUIIsolationHeader isPositionFixed={isPositionFixed}>
        <XUIIsolationHeaderNavigation>
          {navigationIcon && (
            <XUIIconButton ariaLabel="navigate" icon={flattenedIconMap[navigationIcon]} />
          )}
          {hasAvatar && <XUIAvatar className="xui-margin-right-small" size="small" value="ABC" />}
          {title && <XUIIsolationHeaderTitle>{title}</XUIIsolationHeaderTitle>}
          {secondaryTitle && (
            <XUIIsolationHeaderSecondaryTitle>{secondaryTitle}</XUIIsolationHeaderSecondaryTitle>
          )}
          {hasTag && (
            <XUITag size="small" variant="positive">
              Tag
            </XUITag>
          )}
        </XUIIsolationHeaderNavigation>
        <XUIIsolationHeaderActions>
          {hasActionsSecondaryButton && (
            <XUIButton className="xui-isolationheader--button" size="small" variant="standard">
              Secondary
            </XUIButton>
          )}
          {hasActionsPrimaryButton && (
            <XUIButton className="xui-isolationheader--button" size="small" variant="primary">
              Primary
            </XUIButton>
          )}
          {actionIcon && <XUIIconButton ariaLabel="action" icon={flattenedIconMap[actionIcon]} />}
        </XUIIsolationHeaderActions>
      </XUIIsolationHeader>
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
