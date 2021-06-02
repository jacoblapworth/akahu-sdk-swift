// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

// Components we need to test with
import info from '@xero/xui-icon/icons/info';
import plusIcon from '@xero/xui-icon/icons/plus';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownFooter from '../XUIDropdownFooter';
import XUIDropdownHeader from '../XUIDropdownHeader';
import XUIDropdownPanel from '../XUIDropdownPanel';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUINestedDropdown from '../XUINestedDropdown';
import XUIIconButton from '../../button/XUIIconButton';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIDatePicker from '../../datepicker/XUIDatePicker';
import XUIIcon from '../../icon/XUIIcon';
import XUITextInput from '../../textinput/XUITextInput';
import XUIPanel from '../../panel/XUIPanel';
import { XUIButton, XUISplitButtonGroup, XUISecondaryButton } from '../../../button';
import { XUIRow, XUIColumn } from '../../../structural';
import { XUICheckbox, XUICheckboxGroup } from '../../../checkbox';

import NOOP from '../../helpers/noop';
import { storiesWithVariationsKindName, variations, storiesWithKnobsKindName } from './variations';
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
    backButtonAriaLabel="Back"
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
const datepicker = (
  <XUIDatePicker
    displayedMonth={datePickerDate}
    locale="en"
    nextButtonAriaLabel="Next month"
    onSelectDate={NOOP}
    prevButtonAriaLabel="Previous month"
  />
);
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
          backButtonAriaLabel="Back"
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
        <XUIDropdown hasFixedWidth restrictFocus={false} size="medium">
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

const DropdownInDropdown = () => {
  const [selectedSubItem, setSelectedSubitem] = React.useState('Select One');
  return (
    <XUIDropdownToggled
      closeOnTab={false}
      dropdown={
        <XUIDropdown hasFixedWidth size="large">
          <XUIPanel className="xui-padding">
            <XUITextInput fieldClassName="xui-column-6-of-12" />
            <XUIDropdownToggled
              closeOnTab={false}
              dropdown={
                <XUIDropdown
                  onSelect={selected => setSelectedSubitem(selected)}
                  restrictFocus={false}
                >
                  <XUIPicklist>{createItems(toggledShort, 'i')}</XUIPicklist>
                </XUIDropdown>
              }
              trigger={<XUIButton>{selectedSubItem}</XUIButton>}
            />
          </XUIPanel>
        </XUIDropdown>
      }
      isHidden={false}
      trigger={<XUIButton>howdy</XUIButton>}
    />
  );
};

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
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
          footer={showFooter ? footer : undefined}
          forceDesktop={forceDesktop}
          hasFixedWidth={boolean('hasFixedWidth', false)}
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

const createTriggerLink = () => <a href="#">A link</a>;
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
        padding: '10px',
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
      <XUIDropdown hasFixedWidth restrictFocus={false} size="medium">
        <XUIPicklist>{createItems(toggledItems, 'seven')}</XUIPicklist>
      </XUIDropdown>
    }
  />
);

const rightGutter = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '90vw', marginRight: '50px' }}>
    <XUIDropdownToggled
      className="xui-margin-right-large"
      dropdown={
        <XUIDropdown>
          <XUIRow className="xui-padding-xsmall">
            <XUIColumn className="xui-padding-xsmall" gridColumnsLargeUp={3}>
              <XUICheckboxGroup label="Plan type">
                <XUICheckbox>All</XUICheckbox>
                <XUICheckbox>Starter another long one</XUICheckbox>
                <XUICheckbox>Standard</XUICheckbox>
              </XUICheckboxGroup>
            </XUIColumn>
            <XUIColumn className="xui-padding-xsmall" gridColumnsLargeUp={3}>
              <XUICheckboxGroup label="Plan type">
                <XUICheckbox>All</XUICheckbox>
                <XUICheckbox>Starter</XUICheckbox>
                <XUICheckbox>Standard</XUICheckbox>
              </XUICheckboxGroup>
            </XUIColumn>
            <XUIColumn className="xui-padding-xsmall" gridColumnsLargeUp={3}>
              <XUICheckboxGroup label="Plan type">
                <XUICheckbox>All</XUICheckbox>
                <XUICheckbox>Starter</XUICheckbox>
                <XUICheckbox>Standard and something much longer</XUICheckbox>
              </XUICheckboxGroup>
            </XUIColumn>
            <XUIColumn className="xui-padding-xsmall" gridColumnsLargeUp={3}>
              <XUICheckboxGroup label="Plan type">
                <XUICheckbox>All</XUICheckbox>
                <XUICheckbox>Starter</XUICheckbox>
                <XUICheckbox>Standard</XUICheckbox>
              </XUICheckboxGroup>
            </XUIColumn>
          </XUIRow>
        </XUIDropdown>
      }
      isHidden={false}
      trigger={trigger}
    />
  </div>
);

const splitButtonInline = () => (
  <XUISplitButtonGroup variant="primary">
    <XUIButton>Split action</XUIButton>
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown hasFixedWidth size="small">
          <XUIPicklist>{createItems(toggledShort, 'split')}</XUIPicklist>
        </XUIDropdown>
      }
      isHidden={false}
      isLegacyDisplay={false}
      preferredPosition="bottom-right"
      trigger={<XUISecondaryButton aria-label="Other actions" key="split" variant="primary" />}
    />
  </XUISplitButtonGroup>
);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { ddSettings } = variationMinusStoryDetails;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.ddSettings;

    if (ddSettings.children === 'side-by-side') {
      return sideBySide;
    }
    if (ddSettings.children === 'positioning-test') {
      return getPositioningTest();
    }
    if (ddSettings.children === 'hint-label') {
      delete ddSettings.children;
      return hintLabel(ddSettings);
    }
    if (ddSettings.children === 'dropdown-in-dropdown') {
      return DropdownInDropdown();
    }
    if (ddSettings.children === 'right-gutter') {
      return rightGutter();
    }
    if (ddSettings.children === 'splitButton-inline') {
      return splitButtonInline();
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
