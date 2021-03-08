// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUIPageHeader from '../XUIPageHeader';
import XUIBreadcrumbTrail from '../XUIBreadcrumbTrail';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../../actions/XUIActions';
import XUITag from '../../tag/XUITag';
import { userBreakpoints } from '../../helpers/breakpoints';

import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';

const exampleTabs = (breakpoint, includeAnchor) => (
  <XUIPicklist
    className="TESTME"
    isHorizontal
    secondaryProps={{ role: 'menu' }}
    swapAtBreakpoint={breakpoint}
  >
    <XUIPickitem ariaRole="menuitem" id="1">
      Tab 1
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="2" isSelected>
      Tab 2
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="3">
      This is tab 3
    </XUIPickitem>
    {includeAnchor && (
      <XUIPickitem ariaRole="menuitem" href="#" id="4">
        Anchor tab
      </XUIPickitem>
    )}
  </XUIPicklist>
);
const longExampleTabs = breakpoint => (
  <XUIPicklist
    className="TESTME"
    isHorizontal
    secondaryProps={{ role: 'menu' }}
    swapAtBreakpoint={breakpoint}
  >
    <XUIPickitem ariaRole="menuitem" id="1">
      Organisation Settings
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="2" isSelected>
      Edit Profile
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="3">
      Invite a New Member
    </XUIPickitem>
  </XUIPicklist>
);
const buildActions = ({ longContent, ...props } = {}) => {
  return (
    <XUIActions
      hasLayout={false}
      primaryAction={
        <XUIButton size="small" variant="primary">
          {longContent ? 'ActionCompletion' : 'One'}
        </XUIButton>
      }
      secondaryAction={
        <XUIButton size="small">{longContent ? 'Action2Completion' : 'Two'}</XUIButton>
      }
      {...props}
    />
  );
};

const longSampleBreadcrumb = [
  <span
    className="testy-mctesterson"
    key="1"
    onClick={() => alert('hello')}
    onKeyDown={() => {}}
    role="link"
    tabIndex="0"
  >
    Organisation settings
  </span>,
  { label: 'Edit organisation', href: '#2' },
  { label: 'Invite new member', href: '#3' },
];

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);

storiesWithKnobs.add('Playground', () => {
  const showTabs = boolean('include tabs?', false);
  const showActions = boolean('include actions?', false);
  const showBreadcrumb = boolean('include breadcrumb?', false);
  const showSecondary = boolean('include secondary?', false);
  const showSupplementary = boolean('include supplementary?', false);
  const showTags = boolean('include tags?', false);
  const bcSwapPoint = select(
    'breadcrumb swap point',
    [null, ...Object.keys(userBreakpoints)],
    null,
  );
  const tabsSwapPoint = select('tabs swap point', [null, ...Object.keys(userBreakpoints)], null);
  const sampleTags = [
    <XUITag key="a" size="small">
      Tag one
    </XUITag>,
    <XUITag key="b" size="small">
      Two
    </XUITag>,
    <XUITag key="c" size="small">
      Another
    </XUITag>,
  ];
  return (
    <XUIPageHeader
      actions={showActions && buildActions()}
      breadcrumb={
        showBreadcrumb && (
          <XUIBreadcrumbTrail breadcrumbs={longSampleBreadcrumb} swapAtBreakpoint={bcSwapPoint} />
        )
      }
      hasLayout={boolean('hasLayout?', true)}
      secondary={showSecondary ? 'Secondary content here' : ''}
      supplementary={showSupplementary ? 'Supplementary content here' : ''}
      tabs={showTabs ? exampleTabs(tabsSwapPoint) : undefined}
      tags={showTags ? sampleTags : undefined}
      title={text('Title text (if any)', 'Title goes here')}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(baseVariation => {
  const { storyTitle, storyKind, ...variationMinusStoryDetails } = baseVariation;

  storiesWithVariations.add(storyTitle, () => {
    const {
      longContent,
      breadcrumbSwapPoint,
      tabsSwapPoint,
      clickSelector,
      hoverSelector,
      includeAnchor,
      ...variation
    } = variationMinusStoryDetails;

    const sampleTitle = longContent
      ? 'Testing a longer title Testing a longer title Testing a longer title Testing a longer title'
      : 'Title text for testing';
    const sampleSecondary = longContent
      ? 'Longer secondary title would go Longer secondary title would go Longer secondary title would go here'
      : 'Secondary text for testing';
    const sampleSupplementary = longContent
      ? 'Longer supplementary text would go Longer supplementary text would go Longer supplementary text would go here'
      : 'Supplementary text for testing';

    variation.breadcrumb = variation.breadcrumb && (
      <XUIBreadcrumbTrail
        breadcrumbs={
          (typeof variation.breadcrumb !== 'boolean' && variation.breadcrumb) ||
          longSampleBreadcrumb
        }
        swapAtBreakpoint={breadcrumbSwapPoint}
      />
    );
    variation.title = typeof variation.title === 'string' ? variation.title : sampleTitle;
    variation.secondary =
      variation.secondary &&
      (typeof variation.secondary === 'string' ? variation.secondary : sampleSecondary);
    variation.supplementary =
      variation.supplementary &&
      (typeof variation.supplementary === 'string' ? variation.supplementary : sampleSupplementary);

    if (variation.tags) {
      variation.tags = [
        <XUITag key="a" size="small">
          {longContent ? 'Invoice RUE67875NHKERMEG6655' : 'Tag one'}
        </XUITag>,
        <XUITag key="b" size="small">
          {longContent ? 'Invoice FURH672348493GGYMBKE' : 'Two'}
        </XUITag>,
        <XUITag key="c" size="small">
          {longContent ? 'Invoice NTU346474HJTEBEF697F' : 'Another'}
        </XUITag>,
      ];
    }
    if (variation.tabs) {
      variation.tabs = longContent
        ? longExampleTabs(tabsSwapPoint)
        : exampleTabs(tabsSwapPoint, includeAnchor);
    }
    if (variation.actions) {
      variation.actions = buildActions({
        hasLayout: false,
        longContent,
      });
    }

    return <XUIPageHeader {...variation} />;
  });
});
