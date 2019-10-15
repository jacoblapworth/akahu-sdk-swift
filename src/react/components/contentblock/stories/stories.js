// Libs
import React from 'react';

// Components we need to test with
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIActions from '../../actions/XUIActions';
import XUIPanel from '../../panel/XUIPanel';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIRolloverCheckbox from '../../rolloverCheckbox/rolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';

const buildActions = (props = {}) => (
  <XUIActions
    hasLayout={false}
    primaryAction={
      <XUIButton className="xui-margin-left-xsmall" size="small" variant="primary">
        {props.longContent ? 'ActionCompletion' : 'One'}
      </XUIButton>
    }
    secondaryAction={
      <XUIButton size="small">{props.longContent ? 'Action2Completion' : 'Two'}</XUIButton>
    }
    {...props}
  />
);

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

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

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
