// Libs
import React from 'react';

// Components we need to test with
import XUIDropDown from '../XUIDropDown';
import XUIDropDownFooter from '../XUIDropDownFooter';
import XUIDropDownHeader from '../XUIDropDownHeader';
import XUIDropDownPanel from '../XUIDropDownPanel';
import XUIDropDownToggled from '../XUIDropDownToggled';
import XUINestedDropDown from '../XUINestedDropDown';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
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
    <Pickitem {...items.props} key={items.props.id} value={items.props.id}>
      {items.text}
    </Pickitem>
  );
}

const toggledItems = AddIdPropsToTextList(LongListLongItems);
const toggledShort = AddIdPropsToTextList(ShortListShortItems);

const trigger = <XUIButton hasCaret>Open for goodies</XUIButton>;
const header = (
  <XUIDropDownHeader
    onPrimaryButtonClick={NOOP}
    onSecondaryButtonClick={NOOP}
    primaryButtonContent="Apply"
    secondaryButtonContent="Cancel"
    title="Dropdown header"
  />
);
const footer = (
  <XUIDropDownFooter
    pickItems={[
      <Pickitem
        id="aa"
        key="aa"
        leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} />}
        value="aa"
      >
        Item 1
      </Pickitem>,
      <Pickitem
        id="bb"
        key="bb"
        leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} />}
        value="bb"
      >
        Item 2
      </Pickitem>,
    ]}
    title="Dropdown footer"
  />
);
const picklist = <Picklist>{createItems(toggledItems)}</Picklist>;

const datePickerDate = new Date('Dec 02 2017 00:00:00 GMT+1300');
const datepicker = <XUIDatePicker displayedMonth={datePickerDate} onSelectDate={NOOP} />;
const plaintext = <p>Some content that appears in a dropdown panel would go here.</p>;
const nested = (
  <XUINestedDropDown currentPanelId="customDate" isHidden={false}>
    <XUIDropDownPanel panelId="samplePicklist">{picklist}</XUIDropDownPanel>
    <XUIDropDownPanel
      header={
        <XUIDropDownHeader
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
    </XUIDropDownPanel>
  </XUINestedDropDown>
);

const nestedScrollable = (
  <XUINestedDropDown currentPanelId="samplePicklist" isHidden={false}>
    <XUIDropDownPanel
      header={
        <XUIDropDownHeader
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
    </XUIDropDownPanel>
  </XUINestedDropDown>
);

const sideBySide = (
  <div className="xui-panel xui-row-flex xui-padding-large">
    <XUIDropDownToggled
      className="xui-margin-right-large"
      dropdown={
        <XUIDropDown fixedWidth restrictFocus={false} size="medium">
          <Picklist>{createItems(toggledItems, 'one')}</Picklist>
        </XUIDropDown>
      }
      isHidden={false}
      isLegacyDisplay={false}
      preferredPosition="bottom-right"
      trigger={trigger}
    />
    <XUIDropDownToggled
      dropdown={
        <XUIDropDown restrictFocus={false} size="medium">
          <Picklist>{createItems(toggledItems, 'two')}</Picklist>
        </XUIDropDown>
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
    <XUIDropDownToggled
      closeOnSelect={boolean('closeOnSelect', true)}
      closeOnTab={boolean('closeOnTab', true)}
      disableScrollLocking={boolean('disableScrollLocking', false)}
      dropdown={
        <XUIDropDown
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
        </XUIDropDown>
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

function buildDropDown(ddSettings) {
  let children = [];
  if (!ddSettings.children) {
    children = picklist;
  } else if (ddSettings.children === 'datepicker') {
    children = datepicker;
  } else if (ddSettings.children === 'plaintext') {
    children = plaintext;
  } else if (ddSettings.children === 'nested') {
    // Nested dropdowns do not get wrapped in a `XUIDropDown` component.
    return nested;
  } else if (ddSettings.children === 'nestedScrollable') {
    return nestedScrollable;
  }

  if (ddSettings.headerAndFooter) {
    ddSettings.header = header;
    ddSettings.footer = footer;
    delete ddSettings.headerAndFooter;
  }

  return <XUIDropDown {...ddSettings}>{children}</XUIDropDown>;
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
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'a')}</Picklist>
            </XUIDropDown>
          }
          trigger={createTriggerInput()}
          {...props}
        />
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'b')}</Picklist>
            </XUIDropDown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'c')}</Picklist>
            </XUIDropDown>
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
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'g')}</Picklist>
            </XUIDropDown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'h')}</Picklist>
            </XUIDropDown>
          }
          isBlock
          trigger={createTriggerIcon()}
          {...props}
        />
        <XUIDropDownToggled
          dropdown={
            <XUIDropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'i')}</Picklist>
            </XUIDropDown>
          }
          trigger={createTriggerLink()}
          {...props}
        />
      </div>
    </div>
  );
};

const hintLabel = props => (
  <XUIDropDownToggled
    className="xui-margin-right-large"
    isHidden={false}
    trigger={createTriggerInput(props.triggerSettings)}
    {...props}
    dropdown={
      <XUIDropDown fixedWidth restrictFocus={false} size="medium">
        <Picklist>{createItems(toggledItems, 'seven')}</Picklist>
      </XUIDropDown>
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
      <XUIDropDownToggled
        {...variationMinusStoryDetails}
        dropdown={buildDropDown(ddSettings)}
        isHidden={false}
        trigger={trigger}
      />
    );
  });
});
