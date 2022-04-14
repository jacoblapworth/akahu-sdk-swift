import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import { flattenedIconMap } from '../../helpers/icons';
import XUITag from '../../tag/XUITag';
import XUIIsolationHeader from '../XUIIsolationHeader';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
/* eslint-disable react/prop-types */
function getComponent({
  hasActionIcon,
  hasActionsPrimaryButton,
  hasActionsSecondaryButton,
  hasAvatar,
  hasTag,
  hasNavigationButton,
  navigationIcon,
  secondaryTitle,
  supplementaryText,
  title,
  ...spreadProps
}) {
  const navigationButton = hasNavigationButton && (
    <XUIIconButton ariaLabel="navigate" icon={flattenedIconMap.cross} />
  );
  const avatar = hasAvatar && <XUIAvatar size="small" value="ABC" />;
  const tags = hasTag
    ? [
        <XUITag key="tag-1" size="small" variant="positive">
          Draft
        </XUITag>,
      ]
    : undefined;

  const primaryAction = hasActionsPrimaryButton && (
    <XUIButton size="small" variant="main">
      Save and open draft invoice
    </XUIButton>
  );
  const secondaryAction = hasActionsSecondaryButton && (
    <XUIButton size="small" variant="standard">
      Save draft
    </XUIButton>
  );
  const iconAction = hasActionIcon && (
    <XUIIconButton ariaLabel="action" icon={flattenedIconMap.overflow} />
  );

  const actions = (
    <>
      {secondaryAction}
      {primaryAction}
      {iconAction}
    </>
  );

  return (
    <div style={{ maxWidth: '1000px' }}>
      <XUIIsolationHeader
        actions={actions}
        avatar={avatar}
        navigationButton={navigationButton}
        qaHook="isolationheader"
        secondary={secondaryTitle}
        supplementary={supplementaryText}
        tags={tags}
        title={title}
        {...spreadProps}
      />
    </div>
  );
}
/* eslint-enable react/prop-types */

storiesWithKnobs.add('Playground', () =>
  getComponent({
    hasActionIcon: boolean('Has action icon', true),
    hasActionsPrimaryButton: boolean('Has primary action button', true),
    hasActionsSecondaryButton: boolean('Has secondary action button', true),
    hasAvatar: boolean('Has avatar', true),
    hasNavigationButton: boolean('Has navigation button', true),
    hasTag: boolean('Has tag', true),
    isPositionFixed: boolean('isPositionFixed', false),
    secondaryTitle: text('secondary', undefined),
    supplementaryText: text('supplementary', undefined),
    title: text('title', 'New task invoice'),
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
