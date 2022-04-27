import React from 'react';

import { infoIcon } from '@xero/xui-icon/';

import XUIDatePicker from '../../datepicker/XUIDatePicker';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownHeader from '../XUIDropdownHeader';
import XUIDropdownPanel from '../XUIDropdownPanel';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUIIconButton from '../../button/XUIIconButton';
import XUINestedDropdown from '../XUINestedDropdown';
import XUIPanel from '../../panel/XUIPanel';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUITextInput from '../../textinput/XUITextInput';
import { XUIButton, XUISplitButtonGroup, XUISecondaryButton } from '../../../button';
import { XUICheckbox, XUICheckboxGroup } from '../../../checkbox';
import { XUIRow, XUIColumn } from '../../../structural';

import { ShortListShortItems, LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';
import NOOP from '../../helpers/noop';

const createItems = (items, suffix) => {
  if (Array.isArray(items)) {
    return items.map(i => createItems(i, suffix));
  }
  items.props.id += suffix || '';
  return (
    <XUIPickitem {...items.props} key={items.props.id} value={items.props.id}>
      {items.text}
    </XUIPickitem>
  );
};

const createTriggerInput = props => (
  <XUITextInput isLabelHidden label="Input label" placeholder="Placeholder text" {...props} />
);

const toggledItems = AddIdPropsToTextList(LongListLongItems);

const toggledShort = AddIdPropsToTextList(ShortListShortItems);

export const picklist = <XUIPicklist>{createItems(toggledItems)}</XUIPicklist>;

export const plaintext = <p>Some content that appears in a dropdown panel would go here.</p>;

export const datepickerVariation = (
  <XUIDatePicker
    displayedMonth={new Date('Dec 02 2017 00:00:00 GMT+1300')}
    locale="en"
    nextButtonAriaLabel="Next month"
    onSelectDate={NOOP}
    prevButtonAriaLabel="Previous month"
  />
);

export const DropdownInDropdownVariation = () => {
  const [selectedSubItem, setSelectedSubitem] = React.useState('Select One');
  return (
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown hasFixedWidth size="large">
          <XUIPanel className="xui-padding">
            <XUITextInput fieldClassName="xui-column-6-of-12" />
            <XUIDropdownToggled
              dropdown={
                <XUIDropdown onSelect={selected => setSelectedSubitem(selected)}>
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

export const HintLabelVariation = props => (
  <XUIDropdownToggled
    className="xui-margin-right-large"
    isHidden={false}
    trigger={createTriggerInput(props.triggerSettings)}
    {...props}
    dropdown={
      <XUIDropdown hasFixedWidth size="medium">
        <XUIPicklist>{createItems(toggledItems, 'seven')}</XUIPicklist>
      </XUIDropdown>
    }
  />
);

export const nestedVariation = (
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
      {datepickerVariation}
    </XUIDropdownPanel>
  </XUINestedDropdown>
);

export const nestedScrollableVariation = (
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

export const PositioningVariation = () => {
  const props = {
    preferredPosition: 'bottom-left',
    isHidden: false,
  };
  const ddProps = {
    isHidden: true,
    size: 'small',
  };

  const createTriggerButton = () => <XUIButton fullWidth="always">A button</XUIButton>;

  const createTriggerLink = () => <a href="#">A link</a>;

  const createTriggerIcon = () => <XUIIconButton ariaLabel="Info" icon={infoIcon} />;

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

export const RightGutterVariation = () => (
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
      trigger={<XUIButton>Trigger</XUIButton>}
    />
  </div>
);

export const shortTextVariation = (
  <XUIDropdown>
    <XUIPicklist>{createItems(toggledShort, 'a')}</XUIPicklist>
  </XUIDropdown>
);

export const SideBySideVariation = () => (
  <div className="xui-panel xui-row-flex xui-padding-large">
    <XUIDropdownToggled
      className="xui-margin-right-large"
      dropdown={
        <XUIDropdown hasFixedWidth size="medium">
          <XUIPicklist>{createItems(toggledItems, 'one')}</XUIPicklist>
        </XUIDropdown>
      }
      isHidden={false}
      isLegacyDisplay={false}
      preferredPosition="bottom-right"
      trigger={<XUIButton>howdy</XUIButton>}
    />
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown hasFixedWidth size="medium">
          <XUIPicklist>{createItems(toggledItems, 'two')}</XUIPicklist>
        </XUIDropdown>
      }
      isHidden={false}
      trigger={<XUIButton hasCaret>Open for even more goodies</XUIButton>}
    />
  </div>
);

export const SplitButtonInlineVariation = () => (
  <XUISplitButtonGroup variant="main">
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
      trigger={<XUISecondaryButton aria-label="Other actions" key="split" variant="main" />}
    />
  </XUISplitButtonGroup>
);
