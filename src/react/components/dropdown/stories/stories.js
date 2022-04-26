// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { plusIcon } from '@xero/xui-icon';

// Components we need to test with
import XUIButton from '../../../button';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownFooter from '../XUIDropdownFooter';
import XUIDropdownHeader from '../XUIDropdownHeader';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUIIcon from '../../icon/XUIIcon';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIPicklist from '../../picklist/XUIPicklist';

import NOOP from '../../helpers/noop';

import { storiesWithVariationsKindName, variations, storiesWithKnobsKindName } from './variations';
import { maxWidthDropdownSizes, dropdownPositionOptions } from '../private/constants';

import {
  DropdownInDropdownVariation,
  HintLabelVariation,
  PositioningVariation,
  RightGutterVariation,
  SideBySideVariation,
  SplitButtonInlineVariation,
  datepickerVariation,
  nestedScrollableVariation,
  nestedVariation,
  picklist,
  plaintext,
  shortTextVariation,
} from './helpers';

const PlaygroundPicklist = showHeader => {
  const picklistItems = [
    { id: 'customers', text: 'Customers' },
    { id: 'suppliers', text: 'Suppliers' },
    { id: 'overseasClients', text: 'Overseas clients' },
  ];

  const [selectedItems, setSelectedItems] = React.useState({
    customers: false,
    suppliers: false,
    overseasClients: false,
  });

  const onClick = id => {
    setSelectedItems({ ...selectedItems, [id]: !selectedItems[id] });
  };

  return (
    <XUIPicklist isMultiselect={showHeader}>
      {picklistItems.map(({ text, id }) => (
        <XUIPickitem
          id={id}
          isSelected={showHeader && selectedItems[id]}
          onClick={() => onClick(id)}
        >
          {text}
        </XUIPickitem>
      ))}
    </XUIPicklist>
  );
};

const header = (
  <XUIDropdownHeader
    backButtonAriaLabel="Back"
    onPrimaryButtonClick={NOOP}
    onSecondaryButtonClick={NOOP}
    primaryButtonContent="Apply"
    secondaryButtonContent="Cancel"
    title="Add to group"
  />
);

const footer = (
  <XUIDropdownFooter
    pickItems={
      <XUIPickitem
        leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} isInline />}
        onClick={NOOP}
      >
        New group
      </XUIPickitem>
    }
    title="New group"
  />
);

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => {
  const storybookPropsGroupId = 'Storybook';
  const dropdownReactPropsGroupId = 'XUIDropdown props';
  const dropdownToggledReactPropsGroupId = 'XUIDropdownToggled props';

  const storybookProps = {
    forceDesktop: boolean('Force desktop view in small viewports', false, storybookPropsGroupId),
    showHeader: boolean('Show header', false, storybookPropsGroupId),
    showFooter: boolean('Show footer', false, storybookPropsGroupId),
  };

  const dropdownReactProps = {
    animateClosed: boolean('animateClosed', false, dropdownReactPropsGroupId),
    animateOpen: boolean('animateOpen', false, dropdownReactPropsGroupId),
    hasFixedWidth: boolean('hasFixedWidth', false, dropdownReactPropsGroupId),
    hasKeyboardEvents: boolean('hasKeyboardEvents', false, dropdownReactPropsGroupId),
    isHidden: boolean('isHidden', true, dropdownReactPropsGroupId),
    restrictFocus: boolean('restrictFocus', false, dropdownReactPropsGroupId),
    size: select(
      'size',
      [...Object.keys(maxWidthDropdownSizes), undefined],
      'large',
      dropdownReactPropsGroupId,
    ),
  };

  const dropdownToggledReactProps = {
    closeOnSelect: boolean('closeOnSelect', true, dropdownToggledReactPropsGroupId),
    closeOnTab: boolean('closeOnTab', true, dropdownToggledReactPropsGroupId),
    disableScrollLocking: boolean('disableScrollLocking', false, dropdownToggledReactPropsGroupId),
    isBlock: boolean('isBlock', false, dropdownToggledReactPropsGroupId),
    isHidden: boolean('isHidden', true, dropdownToggledReactPropsGroupId),
    isLegacyDisplay: boolean('isLegacyDisplay', true, dropdownToggledReactPropsGroupId),
    matchTriggerWidth: select(
      'matchTriggerWidth',
      [true, false, 'min'],
      false,
      dropdownToggledReactPropsGroupId,
    ),
    preferredPosition: select(
      'preferredPosition',
      dropdownPositionOptions,
      'bottom-left',
      dropdownToggledReactPropsGroupId,
    ),
    repositionOnScroll: boolean('repositionOnScroll', false, dropdownToggledReactPropsGroupId),
    restrictToViewPort: boolean('restrictToViewPort', true, dropdownToggledReactPropsGroupId),
    triggerClickAction: select(
      'triggerClickAction',
      ['none', 'toggle', 'open'],
      'toggle',
      dropdownToggledReactPropsGroupId,
    ),
    triggerDropdownGap: number('triggerDropdownGap', 6, {}, dropdownToggledReactPropsGroupId),
    useNewFocusBehaviour: boolean('useNewFocusBehaviour', false, dropdownToggledReactPropsGroupId),
  };

  const { forceDesktop, showHeader, showFooter } = storybookProps;
  const { hasFixedWidth } = dropdownReactProps;
  const { closeOnSelect } = dropdownToggledReactProps;

  return (
    <XUIDropdownToggled
      {...dropdownToggledReactProps}
      closeOnSelect={showHeader ? false : closeOnSelect}
      dropdown={
        <XUIDropdown
          {...dropdownReactProps}
          footer={showFooter && footer}
          forceDesktop={forceDesktop}
          hasFixedWidth={showHeader ? true : hasFixedWidth}
          header={showHeader && header}
        >
          {PlaygroundPicklist(showHeader)}
        </XUIDropdown>
      }
      forceDesktop={forceDesktop}
      trigger={<XUIButton hasCaret>{showHeader ? 'Group' : 'Add'}</XUIButton>}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
variations.forEach(variation => {
  const buildDropdown = ddSettings => {
    let children = [];
    if (!ddSettings.children) {
      children = picklist;
    } else if (ddSettings.children === 'datepicker') {
      children = datepickerVariation;
    } else if (ddSettings.children === 'plaintext') {
      children = plaintext;
    } else if (ddSettings.children === 'nested') {
      // Nested dropdowns do not get wrapped in a `XUIDropdown` component.
      return nestedVariation;
    } else if (ddSettings.children === 'nestedScrollable') {
      return nestedScrollableVariation;
    } else if (ddSettings.children === 'shortText') {
      return shortTextVariation;
    }

    if (ddSettings.headerAndFooter) {
      ddSettings.header = header;
      ddSettings.footer = footer;
      delete ddSettings.headerAndFooter;
    }

    return <XUIDropdown {...ddSettings}>{children}</XUIDropdown>;
  };

  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { ddSettings } = variationMinusStoryDetails;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.ddSettings;

    if (ddSettings.children === 'side-by-side') {
      return <SideBySideVariation />;
    }
    if (ddSettings.children === 'positioning-test') {
      return <PositioningVariation />;
    }
    if (ddSettings.children === 'hint-label') {
      delete ddSettings.children;
      return <HintLabelVariation {...ddSettings} />;
    }
    if (ddSettings.children === 'dropdown-in-dropdown') {
      return <DropdownInDropdownVariation />;
    }
    if (ddSettings.children === 'right-gutter') {
      return <RightGutterVariation />;
    }
    if (ddSettings.children === 'splitButton-inline') {
      return <SplitButtonInlineVariation />;
    }
    return (
      <XUIDropdownToggled
        {...variationMinusStoryDetails}
        dropdown={buildDropdown(ddSettings)}
        isHidden={false}
        trigger={<XUIButton hasCaret>Open for goodies</XUIButton>}
      />
    );
  });
});
