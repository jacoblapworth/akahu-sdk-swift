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

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';
import XUIProgressLinear from '../../progressindicator/XUIProgressLinear';

const buildColumns = widths =>
  widths.map((width, index) => (
    <XUIColumn
      key={index}
      gridColumns={width}
      className="xui-padding-small"
      style={{ backgroundColor: 'RGBA(255,255,255,0.5)' }}
    >
      Content of a column with width {width}, here.
    </XUIColumn>
  ));

const exampleTabs = (
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem id="1" ariaRole="menuitem">
      Tab 1
    </XUIPickitem>
    <XUIPickitem id="2" ariaRole="menuitem" isSelected>
      Tab 2
    </XUIPickitem>
    <XUIPickitem id="3" ariaRole="menuitem">
      This is tab 3
    </XUIPickitem>
  </XUIPicklist>
);
const buildActions = props => (
  <XUIActions
    primaryAction={
      <XUIButton variant="primary" size="small">
        One
      </XUIButton>
    }
    secondaryAction={<XUIButton size="small">Two</XUIButton>}
    {...props}
  />
);

const sampleBreadcrumb = [
  <span role="link" tabIndex="0" onClick={() => alert('hello')} onKeyDown={() => {}} key="1">
    hello
  </span>,
  { label: 'hiya I have multiple words', href: '#2' },
  { label: 'yo' },
];
const exampleBreadcrumb = <XUIBreadcrumb breadcrumbs={sampleBreadcrumb} />;
const buildExampleSections = children =>
  children.map((child, index) => <XUIOverviewSection key={index} {...child} />);

const buildExampleContentblockItem = children =>
  children.map((child, index) => {
    if (child.overflow) {
      child.overflow = <XUIIconButton icon={overflow} ariaLabel="Overflow menu" />;
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
          variant="positive"
          key="positive-tag"
          size="small"
        >
          Positive
        </XUITag>,
        <XUITag className="xui-margin-right" variant="negative" key="negative-tag" size="small">
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
storiesWithKnobs.addDecorator(centered);
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
      variant={select('variant', Object.keys(rowVariants), 'standard')}
      className="xui-padding-small"
      style={{ backgroundColor: '#028DDE' }}
    >
      {buildColumns(buildColumnsArray())}
    </XUIRow>
  );
});

storiesWithKnobs.add('OverviewBlock Playground', () => {
  const indicator = (
    <XUIProgressLinear
      id="testId"
      total={10}
      progress={4}
      hasToolTip
      toolTipMessage="4 out of 10"
    />
  );
  const includeProgress = boolean('include progress?', false);
  const blockTextAlignment = select('textAlignment', ['left', 'center', 'right'], 'center');
  return (
    <XUIOverviewBlock
      hasBorder={boolean('hasBorder', true)}
      hasBackground={boolean('hasBackground', true)}
      textAlignment={blockTextAlignment}
    >
      <XUIOverviewSection
        label="Draft"
        value="$1,234.56"
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
  const { storyTitle, columnWidths, type, ...variationMinusStoryDetails } = variation;
  delete variationMinusStoryDetails.storyKind;
  storiesWithVariations.add(storyTitle, () => {
    if (type === 'row') {
      return (
        <XUIRow
          {...variationMinusStoryDetails}
          style={{ backgroundColor: '#028DDE' }}
          className="xui-padding-small"
        >
          {buildColumns(columnWidths)}
        </XUIRow>
      );
    }
    if (type === 'pageheader') {
      if (variationMinusStoryDetails.tabs) {
        variationMinusStoryDetails.tabs = exampleTabs;
      }
      if (variationMinusStoryDetails.actions) {
        variationMinusStoryDetails.actions = buildActions();
      }
      if (variationMinusStoryDetails.breadcrumb) {
        variationMinusStoryDetails.breadcrumb = exampleBreadcrumb;
      }
      return (
        <div style={{ minWidth: '700px' }}>
          <XUIPageHeader {...variationMinusStoryDetails} />
        </div>
      );
    }
    if (type === 'overview') {
      const { sections, style } = variationMinusStoryDetails;
      return (
        <div style={style || { minWidth: '500px' }}>
          <XUIOverviewBlock {...variationMinusStoryDetails}>
            {buildExampleSections(sections)}
          </XUIOverviewBlock>
        </div>
      );
    }
    if (type === 'panel') {
      const heading = (
        <XUIPanelHeading>
          Hello there <XUIIcon icon={overflow} />
        </XUIPanelHeading>
      );
      return (
        <XUIPanel heading={heading}>
          <XUIPanelSection headerText="I'm a section header" className="xui-padding-large">
            <p>Some important text might go here.</p>
          </XUIPanelSection>
        </XUIPanel>
      );
    }
    if (type === 'panel-sidebar') {
      const heading = <XUIPanelHeading>Hello there</XUIPanelHeading>;
      const footer = (
        <XUIPanelFooter className="xui-padding-small">{buildActions()}</XUIPanelFooter>
      );
      return (
        <div style={{ minWidth: '700px' }}>
          <XUIPanel heading={heading} footer={footer} sidebar={exampleTabs}>
            <XUIPanelSection headerText="I'm a section header" className="xui-padding-large">
              <p>Some important text might go here.</p>
            </XUIPanelSection>
            <XUIPanelSection className="xui-padding-large">
              <p>Other critical info would go here.</p>
            </XUIPanelSection>
          </XUIPanel>
        </div>
      );
    }
    if (type === 'content block') {
      const { items } = variationMinusStoryDetails;
      return (
        <XUIPanel>
          <XUIContentBlock {...variationMinusStoryDetails}>
            {buildExampleContentblockItem(items)}
          </XUIContentBlock>
        </XUIPanel>
      );
    }
  });
});
