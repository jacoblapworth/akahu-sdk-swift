// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';

// Components we need to test with
import overflow from '@xero/xui-icon/icons/overflow';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIActions from '../../actions/XUIActions';
import XUIPanel from '../../panel/XUIPanel';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIRolloverCheckbox from '../../rollovercheckbox/XUIRolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';

import { variations, storiesWithVariationsKindName } from './variations';

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
      child.leftContent = <XUIAvatar size="small" value="Pixar" />;
    } else if (child.leftContent === 'rollover') {
      child.leftContent = (
        <XUIRolloverCheckbox
          isCheckboxHidden
          label="contentBlockItem rollover"
          rolloverComponent={<XUIAvatar size="small" value="Tim Redmond" />}
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
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => {
  const staticItems = [
    {
      primaryHeading: 'Item 2 Primary (checkbox)',
      secondaryHeading: 'Item 2 Secondary',
      leftContent: 'checkbox',
      overflow: true,
    },
    {
      primaryHeading: 'Item 3 Primary (rollover)',
      leftContent: 'rollover',
      overflow: true,
    },
    {
      primaryHeading: 'Item 4 Primary',
      secondaryHeading: 'Item 4 Secondary',
      tag: true,
      overflow: true,
      description: 'Many people were hoping that if the Democrats won control of Congress',
    },
  ];
  const leftContent = select('left content', ['rollover', 'checkbox', 'avatar', 'none'], 'none');
  const hasTag = boolean('Has tag?', false);
  const dynamicSettings = {
    primaryHeading: text('primaryHeading', 'Item 1 Primary'),
    secondaryHeading: text('secondaryHeading', '') || undefined,
    overflow: boolean('Has overflow menu?', false) ? (
      <XUIIconButton ariaLabel="Overflow menu" icon={overflow} />
    ) : undefined,
    action: boolean('Has action?', false) ? (
      <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>} />
    ) : undefined,
    description: text('description', '') || undefined,
    leftContent: leftContent === 'none' ? undefined : leftContent,
    tag: hasTag,
    tagPosition:
      (hasTag && select('Tag position', ['description', 'right', 'inline'], 'description')) ||
      undefined,
    pinnedValue: boolean('Pinned value', false) || undefined,
  };
  return (
    <XUIContentBlock className="xui-panel">
      {buildExampleContentblockItem([dynamicSettings])}
      {buildExampleContentblockItem(staticItems)}
    </XUIContentBlock>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  const { storyTitle, storyKind, items, ...variationMinusStoryDetails } = variation;

  storiesWithVariations.add(storyTitle, () => {
    return (
      <XUIPanel>
        <XUIContentBlock {...variationMinusStoryDetails}>
          {buildExampleContentblockItem(items)}
        </XUIContentBlock>
      </XUIPanel>
    );
  });
});
