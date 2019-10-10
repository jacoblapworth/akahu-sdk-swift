// Libs
import React from 'react';

// Components we need to test with
import XUIIcon from '../../icon/XUIIcon';
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import XUIPageHeader from '../XUIPageHeader';
import XUIBreadcrumb from '../XUIBreadcrumb';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIActions from '../XUIActions';
import XUIOverviewBlock from '../XUIOverviewBlock';
import XUIOverviewSection from '../XUIOverviewSection';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIRolloverCheckbox from '../../rolloverCheckbox/rolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';
import { rowVariants } from '../private/constants';
import { userBreakpoints } from '../../helpers/breakpoints';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import {
  gridColumnsVariations,
  pageHeaderVariations,
  overviewBlockVariations,
  panelVariations,
  contentBlockVariations,
  storiesWithVariationsKindName,
} from './variations';
import XUIProgressLinear from '../../progressindicator/XUIProgressLinear';

const buildColumns = widths =>
  widths.map((width, index) => (
    <XUIColumn
      className="xui-padding-small"
      gridColumns={width}
      gridColumnsLargeUp={width}
      gridColumnsSmallUp={width}
      key={index}
      style={{ backgroundColor: 'RGBA(255,255,255,0.5)' }}
    >
      Content of a column with width {width}, here.
    </XUIColumn>
  ));

const exampleTabs = breakpoint => (
  <XUIPicklist isHorizontal secondaryProps={{ role: 'menu' }} swapAtBreakpoint={breakpoint}>
    <XUIPickitem ariaRole="menuitem" id="1">
      Tab 1
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="2" isSelected>
      Tab 2
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="3">
      This is tab 3
    </XUIPickitem>
  </XUIPicklist>
);
const longExampleTabs = breakpoint => (
  <XUIPicklist isHorizontal secondaryProps={{ role: 'menu' }} swapAtBreakpoint={breakpoint}>
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
        <XUIButton className="xui-margin-left-xsmall" size="small" variant="primary">
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

const sampleBreadcrumb = [
  <span
    className="testy-mctesterson"
    key="1"
    onClick={() => alert('hello')}
    onKeyDown={() => {}}
    role="link"
    tabIndex="0"
  >
    hello
  </span>,
  { label: 'hiya I have multiple words', href: '#2' },
  { label: 'yo' },
];
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
const exampleBreadcrumb = <XUIBreadcrumb breadcrumbs={sampleBreadcrumb} />;
const buildExampleSections = children =>
  children.map((child, index) => <XUIOverviewSection key={index} {...child} />);

const buildExampleContentblockItem = children =>
  children.map((child, index) => {
    if (child.overflow) {
      child.overflow = <XUIIconButton ariaLabel="Overflow menu" icon={overflow} />;
    }
    if (child.tag) {
      child.tags = (
        <XUITag className="xui-margin-left-small" variant="positive">
          Positive
        </XUITag>
      );
    }
    if (child.tags) {
      child.tags = [
        <XUITag
          className="xui-margin-right-xsmall"
          key="positive-tag"
          size="small"
          variant="positive"
        >
          Positive
        </XUITag>,
        <XUITag className="xui-margin-right" key="negative-tag" size="small" variant="negative">
          Negative
        </XUITag>,
      ];
    }
    if (child.leftContent === 'checkbox') {
      child.leftContent = <XUICheckbox isLabelHidden>Row checkbox</XUICheckbox>;
    } else if (child.leftContent === 'avatar') {
      child.leftContent = <XUIAvatar value="Pixar" />;
    } else if (child.leftContent === 'rollover') {
      child.leftContent = (
        <XUIRolloverCheckbox
          isCheckboxHidden
          label="contentBlockItem rollover"
          rolloverComponent={<XUIAvatar value="Tim Redmond" />}
        />
      );
    }
    if (child.action) {
      child.action = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>} />;
    }
    if (child.pinnedValue) {
      child.pinnedValue = '0.00';
    }
    return <XUIContentBlockItem key={index} {...child} onClick={exampleClickHandler} />;
  });

const exampleClickHandler = () => console.log('clicked');

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Columns Playground', () => {
  const columnCount = number('number of columns', 3);
  const columnWidths = text('list of column widths', '2 8 2');
  function buildColumnsArray() {
    let widthsArr = columnWidths.split(/[,\s]+/);
    if (!widthsArr || !widthsArr.length || widthsArr[0] === '') {
      widthsArr = [];
    }
    if (widthsArr.length === columnCount) {
      return widthsArr;
    }
    if (widthsArr.length > columnCount) {
      return widthsArr.slice(0, columnCount);
    }
    while (widthsArr.length < columnCount) {
      widthsArr.push('1');
    }
    return widthsArr;
  }
  return (
    <XUIRow
      className="xui-padding-small"
      style={{ backgroundColor: '#028DDE' }}
      variant={select('variant', Object.keys(rowVariants), 'standard')}
    >
      {buildColumns(buildColumnsArray())}
    </XUIRow>
  );
});

storiesWithKnobs.add('OverviewBlock Playground', () => {
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
          ['positive', 'negative', 'muted', 'standard'],
          'standard',
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

storiesWithKnobs.add('PageHeader Playground', () => {
  const showTabs = boolean('include tabs?', false);
  const showActions = boolean('include actions?', false);
  const showBreadcrumb = boolean('include breadcrumb?', false);
  const showSecondary = boolean('include secondary?', false);
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
          <XUIBreadcrumb breadcrumbs={longSampleBreadcrumb} swapAtBreakpoint={bcSwapPoint} />
        )
      }
      hasLayout={boolean('hasLayout?', true)}
      secondary={showSecondary ? 'Secondary content here' : ''}
      tabs={showTabs ? exampleTabs(tabsSwapPoint) : undefined}
      tags={showTags ? sampleTags : undefined}
      title={text('Title text (if any)', 'Title goes here')}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module).addDecorator(
  centered,
);
const storiesWithFullFlexibility = storiesOf(storiesWithVariationsKindName, module).addDecorator(
  customCentered,
);

const handleVariation = (variationSet, renderer) => {
  variationSet.forEach(variation => {
    const { storyTitle, ...variationMinusStoryDetails } = variation;
    const targetStories = variation.customDecorator
      ? storiesWithFullFlexibility
      : storiesWithVariations;

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.customDecorator;
    targetStories.add(storyTitle, () => renderer(variationMinusStoryDetails));
  });
};

handleVariation(gridColumnsVariations, variationMinusStoryDetails => (
  <XUIRow
    {...variationMinusStoryDetails}
    className="xui-padding-small"
    style={{ backgroundColor: '#028DDE' }}
  >
    {buildColumns(variationMinusStoryDetails.columnWidths)}
  </XUIRow>
));

handleVariation(pageHeaderVariations, variationMinusStoryDetails => {
  const {
    longContent,
    breadcrumbSwapPoint,
    tabsSwapPoint,
    clickSelector,
    hoverSelector,
    ...variation
  } = variationMinusStoryDetails;

  const sampleTitle = longContent
    ? 'Testing a longer title Testing a longer title Testing a longer title Testing a longer title'
    : 'Title text for testing';
  const sampleSecondary = longContent
    ? 'Longer secondary title would go Longer secondary title would go Longer secondary title would go here'
    : 'Secondary text for testing';

  variation.breadcrumb = variation.breadcrumb && (
    <XUIBreadcrumb
      breadcrumbs={
        (typeof variation.breadcrumb !== 'boolean' && variation.breadcrumb) || longSampleBreadcrumb
      }
      swapAtBreakpoint={breadcrumbSwapPoint}
    />
  );
  variation.title = typeof variation.title === 'string' ? variation.title : sampleTitle;
  variation.secondary =
    variation.secondary &&
    (typeof variation.secondary === 'string' ? variation.secondary : sampleSecondary);

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
    variation.tabs = longContent ? longExampleTabs(tabsSwapPoint) : exampleTabs(tabsSwapPoint);
  }
  if (variation.actions) {
    variation.actions = buildActions({
      hasLayout: false,
      longContent,
    });
  }

  return <XUIPageHeader {...variation} />;
});

handleVariation(overviewBlockVariations, variationMinusStoryDetails => (
  <div style={variationMinusStoryDetails.style || { minWidth: '500px' }}>
    <XUIOverviewBlock {...variationMinusStoryDetails}>
      {buildExampleSections(variationMinusStoryDetails.sections)}
    </XUIOverviewBlock>
  </div>
));

handleVariation(panelVariations, variationMinusStoryDetails => {
  if (variationMinusStoryDetails.type === 'panel') {
    const heading = (
      <XUIPanelHeading>
        Hello there <XUIIcon icon={overflow} />
      </XUIPanelHeading>
    );
    return (
      <XUIPanel heading={heading}>
        <XUIPanelSection className="xui-padding-large" headerText="I'm a section header">
          <p>Some important text might go here.</p>
        </XUIPanelSection>
      </XUIPanel>
    );
  }
  if (variationMinusStoryDetails.type === 'panel-sidebar') {
    const heading = <XUIPanelHeading>{exampleBreadcrumb}</XUIPanelHeading>;
    const footer = <XUIPanelFooter className="xui-padding-small">{buildActions()}</XUIPanelFooter>;
    return (
      <div style={{ minWidth: '700px' }}>
        <XUIPanel footer={footer} heading={heading} sidebar={exampleTabs()}>
          <XUIPanelSection className="xui-padding-large" headerText="I'm a section header">
            <p>Some important text might go here.</p>
          </XUIPanelSection>
          <XUIPanelSection className="xui-padding-large">
            <p>Other critical info would go here.</p>
          </XUIPanelSection>
        </XUIPanel>
      </div>
    );
  }
});

handleVariation(contentBlockVariations, variationMinusStoryDetails => (
  <XUIPanel>
    <XUIContentBlock {...variationMinusStoryDetails}>
      {buildExampleContentblockItem(variationMinusStoryDetails.items)}
    </XUIContentBlock>
  </XUIPanel>
));
