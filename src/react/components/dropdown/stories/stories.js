// Libs
import React from 'react';

// Components we need to test with
import DropDownToggled from '../DropDownToggled';
import DropDown from '../DropDown';
import NestedDropDown from '../NestedDropDown';
import DropDownPanel from '../DropDownPanel';
import DropDownHeader from '../DropDownHeader';
import DropDownFooter from '../DropDownFooter';
import XUIButton from '../../button/XUIButton';
import XUIButtonCaret from '../../button/XUIButtonCaret';
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

const trigger = (
  <XUIButton>
    Open for goodies
    <XUIButtonCaret />
  </XUIButton>
);
const header = (
  <DropDownHeader
    onPrimaryButtonClick={NOOP}
    onSecondaryButtonClick={NOOP}
    primaryButtonContent="Apply"
    secondaryButtonContent="Cancel"
    title="Dropdown header"
  />
);
const footer = (
  <DropDownFooter
    pickItems={[
      <Pickitem id="aa" key="aa" value="aa">
        <XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} isBoxed />
        Item 1
      </Pickitem>,
      <Pickitem id="bb" key="bb" value="bb">
        <XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} isBoxed />
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
  <NestedDropDown currentPanel="customDate" isHidden={false}>
    <DropDownPanel panelId="samplePicklist">{picklist}</DropDownPanel>
    <DropDownPanel
      header={
        <DropDownHeader
          backButtonLabel="Back"
          onBackButtonClick={NOOP}
          onSecondaryButtonClick={NOOP}
          secondaryButtonContent="Cancel"
          title="Example Title"
        />
      }
      panelId="customDate"
    >
      {datepicker}
    </DropDownPanel>
  </NestedDropDown>
);

const nestedScrollable = (
  <NestedDropDown currentPanel="samplePicklist" isHidden={false}>
    <DropDownPanel
      header={
        <DropDownHeader
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
    </DropDownPanel>
  </NestedDropDown>
);

const sideBySide = (
  <div className="xui-panel xui-row-flex xui-padding-large">
    <DropDownToggled
      className="xui-margin-right-large"
      dropdown={
        <DropDown fixedWidth restrictFocus={false} size="medium">
          <Picklist>{createItems(toggledItems, 'one')}</Picklist>
        </DropDown>
      }
      isHidden={false}
      isLegacyDisplay={false}
      preferredPosition="bottom-right"
      trigger={trigger}
    />
    <DropDownToggled
      dropdown={
        <DropDown restrictFocus={false} size="medium">
          <Picklist>{createItems(toggledItems, 'two')}</Picklist>
        </DropDown>
      }
      isHidden={false}
      trigger={
        <XUIButton>
          Open for even more goodies
          <XUIButtonCaret />
        </XUIButton>
      }
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
    <DropDownToggled
      closeOnSelect={boolean('closeOnSelect', true)}
      closeOnTab={boolean('closeOnTab', true)}
      disableScrollLocking={boolean('disableScrollLocking', false)}
      dropdown={
        <DropDown
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
        </DropDown>
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
    // Nested DropDowns do not get wrapped in a DropDown component.
    return nested;
  } else if (ddSettings.children === 'nestedScrollable') {
    return nestedScrollable;
  }

  if (ddSettings.headerAndFooter) {
    ddSettings.header = header;
    ddSettings.footer = footer;
    delete ddSettings.headerAndFooter;
  }

  return <DropDown {...ddSettings}>{children}</DropDown>;
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
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'a')}</Picklist>
            </DropDown>
          }
          trigger={createTriggerInput()}
          {...props}
        />
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'b')}</Picklist>
            </DropDown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'c')}</Picklist>
            </DropDown>
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
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'g')}</Picklist>
            </DropDown>
          }
          trigger={createTriggerButton()}
          {...props}
        />
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'h')}</Picklist>
            </DropDown>
          }
          isBlock
          trigger={createTriggerIcon()}
          {...props}
        />
        <DropDownToggled
          dropdown={
            <DropDown {...ddProps}>
              <Picklist>{createItems(toggledShort, 'i')}</Picklist>
            </DropDown>
          }
          trigger={createTriggerLink()}
          {...props}
        />
      </div>
    </div>
  );
};

const hintLabel = props => (
  <DropDownToggled
    className="xui-margin-right-large"
    isHidden={false}
    trigger={createTriggerInput(props.triggerSettings)}
    {...props}
    dropdown={
      <DropDown fixedWidth restrictFocus={false} size="medium">
        <Picklist>{createItems(toggledItems, 'seven')}</Picklist>
      </DropDown>
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
      <DropDownToggled
        {...variationMinusStoryDetails}
        dropdown={buildDropDown(ddSettings)}
        isHidden={false}
        trigger={trigger}
      />
    );
  });
});
