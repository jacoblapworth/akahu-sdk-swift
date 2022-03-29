import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import overflow from '@xero/xui-icon/icons/overflow';
import React from 'react';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import XUIActions from '../../actions/XUIActions';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import XUIPanel from '../../panel/XUIPanel';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIRolloverCheckbox from '../../rollovercheckbox/XUIRolloverCheckbox';
import XUITag from '../../tag/XUITag';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

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

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addParameters({ layout: 'fullscreen' });
storiesWithKnobs.add('Playground', () => {
  const leftContentType = select(
    'Left content type',
    ['', 'checkbox', 'avatar', 'rollover'],
    'avatar',
  );
  const leftContent = () => {
    const avatar = <XUIAvatar size="small" value="Bobs Burger" />;
    switch (leftContentType) {
      case 'avatar':
        return avatar;
      case 'checkbox':
        return <XUICheckbox />;
      case 'rollover':
        return (
          <XUIRolloverCheckbox
            isCheckboxHidden
            label="Avatar rollover checkbox"
            rolloverComponent={avatar}
          />
        );
      default:
        return undefined;
    }
  };
  const hasAction = boolean('Has action', false);
  const hasOverflow = boolean('Has overflow', false);
  const hasTag = boolean('Has tag', false);
  return (
    <div style={{ maxWidth: '1000px' }}>
      <XUIContentBlock className="xui-panel">
        <XUIContentBlockItem
          action={
            hasAction ? (
              <XUIActions secondaryAction={<XUIButton size="small">Edit</XUIButton>} />
            ) : undefined
          }
          description={text('description', 'Deadline 1 Feb 2023  •  Estimate 10,000.00')}
          hasLayout={boolean('hasLayout', true)}
          href={text('href', '')}
          isRowLink={boolean('isRowLink', false)}
          leftContent={leftContent()}
          overflow={
            hasOverflow ? (
              <XUIDropdownToggled
                dropdown={
                  <XUIDropdown>
                    <XUIPicklist>
                      <XUIPickitem id="edit">Duplicate project</XUIPickitem>
                      <XUIPickitem id="submit">Delete</XUIPickitem>
                    </XUIPicklist>
                  </XUIDropdown>
                }
                trigger={<XUIIconButton ariaLabel="Overflow" icon={overflow} />}
              />
            ) : undefined
          }
          pinnedValue={text('pinnedValue', '')}
          primaryHeading={text('primaryHeading', 'Bob’s Burger')}
          secondaryHeading={text('secondaryHeading', 'Website design')}
          tagPosition={select('tagPosition', ['', 'description', 'right', 'inline'])}
          tags={
            hasTag
              ? [
                  <XUITag
                    className="xui-margin-right"
                    key="negative-tag"
                    size="small"
                    variant="negative"
                  >
                    Overdue
                  </XUITag>,
                ]
              : undefined
          }
        />
      </XUIContentBlock>
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  const { storyTitle, storyKind, items, ...variationMinusStoryDetails } = variation;

  storiesWithVariations.add(storyTitle, () => (
    <XUIPanel>
      <div {...variationMinusStoryDetails}>{buildExampleContentblockItem(items)}</div>
    </XUIPanel>
  ));
});
