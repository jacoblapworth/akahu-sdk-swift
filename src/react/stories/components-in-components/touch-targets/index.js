// Libs
import React from 'react';
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUICompositionDetail } from '../../../compositions';
import { XUIIconButton } from '../../../button';
import XUICheckbox, { XUICheckboxGroup } from '../../../checkbox';
import XUIDatePicker from '../../../datepicker';
import { Pickitem as XUIPickItem } from '../../../picklist';
import XUIPill from '../../../pill';
import XUIRadio, { XUIRadioGroup } from '../../../radio';
import { XUIPanel, XUIPanelSection } from '../../../panel';
import XUISwitch, { XUISwitchGroup } from '../../../switch';
import XUITable, { XUITableColumn, XUITableCell } from '../../../table';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import revealTouchTargets from '../../../../../.storybook/decorators/xuiRevealTouchTargets';

import { storyNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { withReadme } from 'storybook-readme';
// import readme from './README.md';

const NOOP = () => {};
const displayMonth = new Date('Nov 01 2019 00:00:00');

const test = storiesOf(compositionKind, module);

test.addDecorator(revealTouchTargets);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(withReadme(readme));

test.add(storyNames.touchTargets, () => {
  class TouchTargets extends React.Component {
    render() {
      return (
        <XUICompositionDetail
          detail={
            <XUIPanel>
              <XUIPanelSection className="xui-padding-xlarge">
                <XUIIconButton
                  ariaLabel="Overflow menu"
                  className="xui-margin-right"
                  icon={overflowIcon}
                />
                <XUIIconButton
                  ariaLabel="Overflow menu"
                  className="xui-margin-right"
                  icon={overflowIcon}
                  size="small"
                />
                <XUIIconButton
                  ariaLabel="Overflow menu"
                  className="xui-margin-right"
                  icon={overflowIcon}
                  size="xsmall"
                />
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <div className="xui-margin-bottom-large">
                  <XUICheckbox>Medium checkbox</XUICheckbox>
                  <XUICheckbox>Medium checkbox</XUICheckbox>
                  <XUICheckbox isReversed>Medium checkbox</XUICheckbox>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUICheckbox size="small">Small checkbox</XUICheckbox>
                  <XUICheckbox size="small">Small checkbox</XUICheckbox>
                  <XUICheckbox isReversed size="small">
                    Small checkbox
                  </XUICheckbox>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUICheckbox size="xsmall">Extra small checkbox</XUICheckbox>
                  <XUICheckbox size="xsmall">Extra small checkbox</XUICheckbox>
                  <XUICheckbox isReversed size="xsmall">
                    Extra small checkbox
                  </XUICheckbox>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUICheckboxGroup label="Checkbox group">
                    <XUICheckbox>Grouped checkbox</XUICheckbox>
                    <XUICheckbox>Grouped checkbox</XUICheckbox>
                    <XUICheckbox isReversed>Grouped checkbox</XUICheckbox>
                  </XUICheckboxGroup>
                </div>
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <div className="xui-margin-bottom-large">
                  <XUIRadio>Medium radio</XUIRadio>
                  <XUIRadio>Medium radio</XUIRadio>
                  <XUIRadio isReversed>Medium radio</XUIRadio>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUIRadio size="small">Small radio</XUIRadio>
                  <XUIRadio size="small">Small radio</XUIRadio>
                  <XUIRadio isReversed size="small">
                    Small radio
                  </XUIRadio>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUIRadio size="xsmall">Extra small radio</XUIRadio>
                  <XUIRadio size="xsmall">Extra small radio</XUIRadio>
                  <XUIRadio isReversed size="xsmall">
                    Extra small radio
                  </XUIRadio>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUIRadioGroup label="Radio group">
                    <XUIRadio>Grouped radio</XUIRadio>
                    <XUIRadio>Grouped radio</XUIRadio>
                    <XUIRadio isReversed>Grouped radio</XUIRadio>
                  </XUIRadioGroup>
                </div>
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <div className="xui-margin-bottom-large">
                  <XUISwitch>Inline switch</XUISwitch>
                  <XUISwitch>Inline switch</XUISwitch>
                  <XUISwitch isReversed>Inline switch</XUISwitch>
                </div>
                <div className="xui-margin-bottom-large">
                  <XUISwitchGroup label="Switch group">
                    <XUISwitch>Inline switch</XUISwitch>
                    <XUISwitch>Inline switch</XUISwitch>
                    <XUISwitch isReversed>Inline switch</XUISwitch>
                  </XUISwitchGroup>
                </div>
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <div className="xui-margin-bottom-large">
                  <XUIPill
                    avatarProps={{
                      value: 'M',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    value="Medium"
                  />
                  <XUIPill
                    avatarProps={{
                      value: 'M',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    value="Medium"
                  />
                  <XUIPill
                    avatarProps={{
                      value: 'M',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    value="Medium"
                  />
                </div>
                <div className="xui-margin-bottom-large">
                  <XUIPill
                    avatarProps={{
                      value: 'Small',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    size="small"
                    value="Small"
                  />
                  <XUIPill
                    avatarProps={{
                      value: 'Small',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    size="small"
                    value="Small"
                  />
                  <XUIPill
                    avatarProps={{
                      value: 'Small',
                    }}
                    deleteButtonLabel="Delete"
                    onDeleteClick={NOOP}
                    size="small"
                    value="Small"
                  />
                </div>
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <XUITextInput
                  isFieldLayout
                  leftElement={
                    <XUITextInputSideElement type="pill">
                      <XUIPill
                        avatarProps={{ value: 'Pill' }}
                        deleteButtonLabel="Delete"
                        onDeleteClick={NOOP}
                        value="Pill"
                      />
                    </XUITextInputSideElement>
                  }
                  placeholder="Pill"
                  rightElement={
                    <XUITextInputSideElement type="icon">
                      <XUIIconButton ariaLabel="Overflow menu" icon={overflowIcon} />
                    </XUITextInputSideElement>
                  }
                />
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <div className="xui-panel xui-dropdown-medium">
                  <XUIDatePicker displayedMonth={displayMonth} onSelectDate={NOOP} />
                </div>
              </XUIPanelSection>
              <XUIPanelSection className="xui-padding-xlarge">
                <XUITable
                  checkAllRowsAriaLabel="Select all rows"
                  checkedIds={{ abc123: true, def456: false }}
                  checkOneRowAriaLabel="Select row"
                  createOverflowMenu={() => [<XUIPickItem>Edit</XUIPickItem>]}
                  data={{
                    abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
                    def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false },
                  }}
                  hasCheckbox
                  hasOverflowMenu
                  overflowMenuTitle="More row options"
                >
                  <XUITableColumn
                    body={({ fruit }) => <XUITableCell>{fruit}</XUITableCell>}
                    head={<XUITableCell>Fruit</XUITableCell>}
                  />

                  <XUITableColumn
                    body={({ color }) => <XUITableCell>{color}</XUITableCell>}
                    head={<XUITableCell>Color</XUITableCell>}
                  />

                  <XUITableColumn
                    body={({ price }) => <XUITableCell>{`$${price}`}</XUITableCell>}
                    head={<XUITableCell>Price / kg</XUITableCell>}
                  />
                </XUITable>
              </XUIPanelSection>
            </XUIPanel>
          }
        />
      );
    }
  }

  return <TouchTargets />;
});
