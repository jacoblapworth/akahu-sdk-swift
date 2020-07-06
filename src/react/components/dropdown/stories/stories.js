// Libs
import React from 'react';

// Components we need to test with
import XUIDropdown from '../XUIDropdown';
import XUIDropdownFooter from '../XUIDropdownFooter';
import XUIDropdownHeader from '../XUIDropdownHeader';
import XUIDropdownPanel from '../XUIDropdownPanel';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUINestedDropdown from '../XUINestedDropdown';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIDatePicker from '../../datepicker/XUIDatePicker';
import XUIIcon from '../../icon/XUIIcon';
import XUITextInput from '../../textInput/XUITextInput';
import info from '@xero/xui-icon/icons/info';
import plusIcon from '@xero/xui-icon/icons/plus';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { storiesWithVariationsKindName, variations, NOOP } from './variations';
import { ShortListShortItems, LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';
import { maxWidthDropdownSizes, dropdownPositionOptions } from '../private/constants';

function createItems(items, suffix) {
  if (Array.isArray(items)) {
    return items.map(i => createItems(i, suffix));
  }
  items.props.id += suffix || '';
  return (
    <XUIPickitem {...items.props} key={items.props.id} value={items.props.id}>
      {items.text}
    </XUIPickitem>
  );
}

const toggledItems = AddIdPropsToTextList(LongListLongItems);
const toggledShort = AddIdPropsToTextList(ShortListShortItems);

const trigger = <XUIButton hasCaret>Open for goodies</XUIButton>;
const header = (
  <XUIDropdownHeader
    onPrimaryButtonClick={NOOP}
    onSecondaryButtonClick={NOOP}
    primaryButtonContent="Apply"
    secondaryButtonContent="Cancel"
    title="Dropdown header"
  />
);
const footer = (
  <XUIDropdownFooter
    pickItems={[
      <XUIPickitem
        id="aa"
        key="aa"
        leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} />}
        value="aa"
      >
        Item 1
      </XUIPickitem>,
      <XUIPickitem
        id="bb"
        key="bb"
        leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} />}
        value="bb"
      >
        Item 2
      </XUIPickitem>,
    ]}
    title="Dropdown footer"
  />
);
const picklist = <XUIPicklist>{createItems(toggledItems)}</XUIPicklist>;

const datePickerDate = new Date('Dec 02 2017 00:00:00 GMT+1300');
const datepicker = <XUIDatePicker displayedMonth={datePickerDate} onSelectDate={NOOP} />;
const plaintext = <p>Some content that appears in a dropdown panel would go here.</p>;
const nested = (
  <XUINestedDropdown currentPanelId="customDate" isHidden={false}>
    <XUIDropdownPanel panelId="samplePicklist">{picklist}</XUIDropdownPanel>
    <XUIDropdownPanel
      header={
        <XUIDropdownHeader
          backButtonAriaLabel="Back"
          onBackButtonClick={NOOP}
          onSecondaryButtonClick={NOOP}
          secondaryButtonContent="Cancel"
          title="Example Title"
        />
      }
      panelId="customDate"
    >
      {datepicker}
    </XUIDropdownPanel>
  </XUINestedDropdown>
);

const nestedScrollable = (
  <XUINestedDropdown currentPanelId="samplePicklist" isHidden={false}>
    <XUIDropdownPanel
      header={
        <XUIDropdownHeader
          backButtonLabel="Back"
          onBackButtonClick={NOOP}
          onSecondaryButtonClick={NOOP}
          secondaryButtonContent="Cancel"
          title="Example Title"
        />
      }
      panelId="samplePicklist"
    >
      {picklist}
    </XUIDropdownPanel>
  </XUINestedDropdown>
);

const sideBySide = (
  <div className="xui-panel xui-row-flex xui-padding-large">
    <XUIDropdownToggled
      className="xui-margin-right-large"
      dropdown={
        <XUIDropdown fixedWidth restrictFocus={false} size="medium">
          <XUIPicklist>{createItems(toggledItems, 'one')}</XUIPicklist>
        </XUIDropdown>
      }
      isHidden={false}
      isLegacyDisplay={false}
      preferredPosition="bottom-right"
      trigger={trigger}
    />
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown restrictFocus={false} size="medium">
          <XUIPicklist>{createItems(toggledItems, 'two')}</XUIPicklist>
        </XUIDropdown>
      }
      isHidden={false}
      trigger={<XUIButton hasCaret>Open for even more goodies</XUIButton>}
    />
  </div>
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const forceDesktop = boolean('forceDesktop', false);
  const showHeader = boolean('show header?', false);
  const showFooter = boolean('show footer?', false);

  return (
    <XUIDropdownToggled
      closeOnSelect={boolean('closeOnSelect', true)}
      closeOnTab={boolean('closeOnTab', true)}
      disableScrollLocking={boolean('disableScrollLocking', false)}
      dropdown={
        <XUIDropdown
          animateClosed={boolean('animateClosed', false)}
          animateOpen={boolean('animateOpen', false)}
          fixedWidth={boolean('fixedWidth', false)}
          footer={showFooter ? footer : undefined}
          forceDesktop={forceDesktop}
          header={showHeader ? header : undefined}
          restrictFocus={boolean('restrictFocus', false)}
          size={select('dropdown size', Object.keys(maxWidthDropdownSizes), 'large')}
        >
          {picklist}
        </XUIDropdown>
      }
      forceDesktop={forceDesktop}
      isHidden={boolean('is dropdown initially hidden', true)}
      matchTriggerWidth={boolean('matchTriggerWidth', false)}
      preferredPosition={select('preferred position', dropdownPositionOptions, 'bottom-left')}
      repositionOnScroll={boolean('repositionOnScroll', false)}
      restrictToViewPort={boolean('restrictToViewPort', true)}
      trigger={trigger}
    />
  );
});

function buildDropdown(ddSettings) {
  let children = [];
  if (!ddSettings.children) {
    children = picklist;
  } else if (ddSettings.children === 'datepicker') {
    children = datepicker;
  } else if (ddSettings.children === 'plaintext') {
    children = plaintext;
  } else if (ddSettings.children === 'nested') {
    // Nested dropdowns do not get wrapped in a `XUIDropdown` component.
    return nested;
  } else if (ddSettings.children === 'nestedScrollable') {
    return nestedScrollable;
  }

  if (ddSettings.headerAndFooter) {
    ddSettings.header = header;
    ddSettings.footer = footer;
    delete ddSettings.headerAndFooter;
  }

  return <XUIDropdown {...ddSettings}>{children}</XUIDropdown>;
}

const createTriggerInput = props => (
  <XUITextInput isLabelHidden label="Input label" placeholder="Placeholder text" {...props} />
);

const createTriggerButton = () => <XUIButton fullWidth="always">A button</XUIButton>;

const createTriggerLink = () => <a href="javascript:void(0);">A link</a>;
const createTriggerIcon = () => <XUIIconButton ariaLabel="Info" icon={info} />;

const getPositioningTest = () => {
  const props = {
    preferredPosition: 'bottom-left',
    isHidden: false,
  };
  const ddProps = {
    isHidden: true,
    restrictFocus: false,
    size: 'small',
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'inline-flex',
          height: '50%',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'a')}</XUIPicklist>
            </XUIDropdown>
          }
          trigger={createTriggerInput()}
          {...props}
        />
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'b')}</XUIPicklist>
            </XUIDropdown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'c')}</XUIPicklist>
            </XUIDropdown>
          }
          trigger={createTriggerInput()}
          {...props}
        />
      </div>
      <div
        style={{
          alignItems: 'flex-end',
          display: 'inline-flex',
          height: '50%',
          justifyContent: 'space-between',
          justifyItems: 'flex-end',
          width: '100%',
        }}
      >
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'g')}</XUIPicklist>
            </XUIDropdown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'h')}</XUIPicklist>
            </XUIDropdown>
          }
          isBlock
          trigger={createTriggerIcon()}
          {...props}
        />
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown {...ddProps}>
              <XUIPicklist>{createItems(toggledShort, 'i')}</XUIPicklist>
            </XUIDropdown>
          }
          trigger={createTriggerLink()}
          {...props}
        />
      </div>
    </div>
  );
};

const hintLabel = props => (
  <XUIDropdownToggled
    className="xui-margin-right-large"
    isHidden={false}
    trigger={createTriggerInput(props.triggerSettings)}
    {...props}
    dropdown={
      <XUIDropdown fixedWidth restrictFocus={false} size="medium">
        <XUIPicklist>{createItems(toggledItems, 'seven')}</XUIPicklist>
      </XUIDropdown>
    }
  />
);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { ddSettings } = variationMinusStoryDetails;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.ddSettings;

    if (ddSettings.children === 'side-by-side') {
      return sideBySide;
    } else if (ddSettings.children === 'positioning-test') {
      return getPositioningTest();
    } else if (ddSettings.children === 'hint-label') {
      delete ddSettings.children;
      return hintLabel(ddSettings);
    }
    return (
      <XUIDropdownToggled
        {...variationMinusStoryDetails}
        dropdown={buildDropdown(ddSettings)}
        isHidden={false}
        trigger={trigger}
      />
    );
  });
});
