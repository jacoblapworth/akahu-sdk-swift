// Libs
import React from 'react';
import { XUICompositionDetail } from '../../../compositions';
import { XUIPanel, XUIPanelHeading, XUIPanelSection, XUIColumn, XUIRow } from '../../../structural';
import XUIButton, { XUIButtonCaret } from '../../../button';
import XUIRolloverCheckbox from '../../../rollovercheckbox';
import XUIAvatar from '../../../avatar';
import XUIToggle, { XUIToggleOption } from '../../../toggle';
import { XUIRadioGroup } from '../../../radio';
import { XUICheckboxGroup } from '../../../checkbox';
import { XUISwitchGroup } from '../../../switch';
import {
  DetailedListExample,
  SecondarySearchExample,
} from '../../../components/autocompleter/stories/stories';
import Picklist, { Pickitem, PicklistHeader } from '../../../picklist';
import XUIIcon from '../../../icon';
import XUIPill from '../../../pill';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import DropDownDateRange from '../helpers/daterangedropdown';
import view from '@xero/xui-icon/icons/view';
import { nonBackstopStoryNames, compositionKind } from '../tests';
import {
  TooltipWrapper,
  RangeWrapper,
  createRadios,
  createCheckboxes,
  switches,
  createSizedIconButtons,
  createSizedLoggingButtons,
  createPicklist,
  multiSelectItems,
} from './helpers';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const sizes = ['medium', 'small', 'xsmall'];
const avatarSizeMap = {
  medium: 'xlarge',
  small: 'medium',
  xsmall: '2xsmall',
};

const test = storiesOf(compositionKind, module);

test.addDecorator(withReadme(readme));

test.add(nonBackstopStoryNames.touchInteractions, () => {
  class TouchInteractions extends React.Component {
    state = {
      isSelectedById: {},
      overallSize: 'medium',
    };
    datePickerDate = new Date('Dec 02 2017 00:00:00 GMT+1300');

    toggleSelection(id) {
      const isSelectedById = { ...this.state.isSelectedById, [id]: !this.state.isSelectedById[id] };
      this.setState({
        isSelectedById,
      });
    }

    render() {
      const { overallSize } = this.state;
      const noXsmallSize = overallSize === 'xsmall' ? 'small' : overallSize;
      return (
        <XUICompositionDetail
          detail={
            <XUIPanel>
              <XUIPanelSection id="size-toggle" className="xui-padding-xlarge">
                <XUIToggle
                  label="Size (where applicable)"
                  isFieldLayout
                  layout="fullwidth"
                  hintMessage="Not all controls are available in small or xsmall"
                  size={noXsmallSize}
                >
                  {sizes.map(size => (
                    <XUIToggleOption
                      key={`toggle-${size}`}
                      isDefaultChecked={size === 'medium'}
                      type="radio"
                      name="size-toggle"
                      onChange={() => {
                        this.setState({ overallSize: size });
                      }}
                    >
                      {size}
                    </XUIToggleOption>
                  ))}
                </XUIToggle>
              </XUIPanelSection>
              {/* Dropdowns */}
              <XUIPanelSection id="dropdowns" className="xui-padding-xlarge">
                <XUIPanelHeading hasLayout={false}>Dropdown-type controls</XUIPanelHeading>
                <DetailedListExample
                  placeholder="e.g. Mario"
                  validationMessage="Pick a valid person"
                  hintMessage="Enter a name"
                  inputLabel="Autocompleter test"
                  isInputLabelHidden={false}
                  inputSize={noXsmallSize}
                  picklistSize={overallSize}
                />
                <SecondarySearchExample
                  isClosed
                  className="xui-field-layout"
                  listSize={overallSize}
                  trigger={
                    <XUIButton fullWidth="small-down" size={overallSize}>
                      Secondary Search
                      <XUIButtonCaret />
                    </XUIButton>
                  }
                />
                <DropDownDateRange size={overallSize} />
              </XUIPanelSection>
              {/* Hover interaction */}
              <XUIPanelSection id="hover" className="xui-padding-xlarge">
                <XUIPanelHeading hasLayout={false}>Things with hover states</XUIPanelHeading>
                <div>
                  <TooltipWrapper
                    buttonContent="Click for tooltip"
                    tipContent="Hello. I am a click-only tip."
                    triggers={['click']}
                    size={overallSize}
                  />
                  <TooltipWrapper
                    buttonContent="Focus for tooltip"
                    tipContent="Hello. I am a focus-only tip."
                    triggers={['focus']}
                    size={overallSize}
                  />
                  <TooltipWrapper
                    buttonContent="Hover for tooltip"
                    tipContent="Hello. I am a hover-only tip."
                    triggers={['hover']}
                    size={overallSize}
                  />
                </div>
                <div>
                  <TooltipWrapper
                    buttonContent="Click or hover"
                    tipContent="Hello. I am a click-hover tip."
                    triggers={['hover', 'click']}
                    size={overallSize}
                  />
                  <TooltipWrapper
                    buttonContent="Focus or click"
                    tipContent="Hello. I am a focus-click tip."
                    triggers={['focus', 'click']}
                    size={overallSize}
                  />
                  <TooltipWrapper
                    buttonContent="Hover or focus"
                    tipContent="Hello. I am a hover-focus tip."
                    triggers={['focus', 'hover']}
                    size={overallSize}
                  />
                </div>
                <div>
                  <TooltipWrapper
                    buttonContent="Any action"
                    tipContent="Hello. I am a click-hover-focus tip."
                    triggers={['focus', 'hover', 'click']}
                    size={overallSize}
                  />
                </div>
                <XUIRow>
                  <XUIColumn gridColumns="half">
                    Rollover checkbox
                    <br />
                    Avatar - {avatarSizeMap[overallSize]}
                    <br />
                    Checkbox - {overallSize}
                  </XUIColumn>
                  <XUIColumn gridColumns="half">
                    <XUIRolloverCheckbox
                      className="xui-margin-left-small"
                      isCheckboxHidden
                      rolloverComponent={
                        <XUIAvatar value="Finn Clark" size={avatarSizeMap[overallSize]} />
                      }
                      checkboxSize={overallSize}
                      label="Rollover checkbox"
                    />
                  </XUIColumn>
                </XUIRow>
              </XUIPanelSection>
              {/* Basic controls */}
              <XUIPanelSection id="simple" className="xui-padding-xlarge">
                <XUIPanelHeading hasLayout={false}>Simpler controls</XUIPanelHeading>
                <div className="xui-field-layout">
                  <RangeWrapper size={overallSize} step={0} label="Smooth" />
                  <RangeWrapper size={overallSize} step={10} label="Stepped" />
                </div>
                <XUIRadioGroup isFieldLayout label="Choose a city">
                  {createRadios(noXsmallSize)}
                </XUIRadioGroup>
                <div className="xui-field-layout">{createRadios(overallSize)}</div>
                <XUICheckboxGroup isFieldLayout label="Favourite Birds">
                  {createCheckboxes(noXsmallSize)}
                </XUICheckboxGroup>
                <div className="xui-field-layout">{createCheckboxes(overallSize)}</div>
                <XUISwitchGroup isFieldLayout>{switches}</XUISwitchGroup>
                <div className="xui-field-layout">{switches}</div>
              </XUIPanelSection>
              {/* Big-finger tests */}
              <XUIPanelSection id="hit-areas" className="xui-padding-xlarge">
                <XUIPanelHeading hasLayout={false}>Hit-area tests</XUIPanelHeading>
                <XUITextInput
                  isFieldLayout
                  label="Text input for size and focus"
                  rightElement={
                    <XUITextInputSideElement type="icon">
                      <XUIButton
                        variant="icon"
                        size={overallSize}
                        onClick={() => console.log('Textinput button fire')}
                      >
                        <XUIIcon icon={view} />
                      </XUIButton>
                    </XUITextInputSideElement>
                  }
                  size={overallSize}
                />
                Buttons (incl unstyled):
                <XUIRow id="buttons" variant="flex">
                  <XUIColumn gridColumns="half" className="xui-field-layout">
                    {createSizedLoggingButtons({
                      stringArray: ['1', '2', '3', '4', '5', '6'],
                      size: overallSize,
                    })}
                  </XUIColumn>
                  <XUIColumn gridColumns="half" className="xui-field-layout">
                    {/* These are unstyled links, simulating text */}
                    {createSizedLoggingButtons({
                      stringArray: ['one ', 'two ', 'three', 'four ', 'five ', 'six'],
                      customProps: {
                        isLink: true,
                        variant: 'unstyled',
                        className: 'xui-margin-right-2xsmall',
                        size: overallSize,
                      },
                    })}
                  </XUIColumn>
                  <XUIColumn gridColumns="full" className="xui-field-layout">
                    {createSizedIconButtons(overallSize)}
                  </XUIColumn>
                </XUIRow>
                <div id="pills" className="xui-field-layout">
                  Pills:
                  <br />
                  <XUIPill
                    value="Just a delete"
                    onDeleteClick={() => console.log('delete pill 1')}
                    size={overallSize}
                  />
                  <XUIPill
                    value="Link and delete"
                    onDeleteClick={() => console.log('delete pill 2')}
                    href="#pills"
                    size={overallSize}
                  />
                  <XUIPill
                    value="Onclick and delete"
                    onDeleteClick={() => console.log('delete pill 3')}
                    onClick={() => console.log('clicking pill 3')}
                    size={overallSize}
                  />
                  <XUIPill value="Just a link" href="#pills" size={overallSize} />
                  <XUIPill
                    value="All the things"
                    avatarProps={{ value: 'Hi Mom' }}
                    onDeleteClick={() => console.log('delete pill 5')}
                    onClick={() => console.log('clicking pill 5')}
                    size={overallSize}
                  />
                </div>
                <div className="xui-field-layout">
                  Horizontal picklist:
                  <div style={{ width: 'max-content' }}>
                    {createPicklist({
                      prefix: '3',
                      customProps: { isHorizontal: true },
                      size: overallSize,
                    })}
                  </div>
                </div>
                Vertical picklists:
                <XUIRow
                  id="vertical-picklists"
                  variant="flex"
                  className="xui-u-flex-align-stretch xui-margin-bottom-small"
                >
                  <XUIColumn gridColumns="full" gridColumnsSmallUp="half" className="xui-panel">
                    {createPicklist({
                      prefix: '1',
                      customProps: { sizeHeader: true },
                      size: overallSize,
                    })}
                  </XUIColumn>
                  <XUIColumn gridColumns="full" gridColumnsSmallUp="half" className="xui-panel">
                    <Picklist isMultiselect size={noXsmallSize}>
                      <PicklistHeader>{noXsmallSize}</PicklistHeader>
                      {multiSelectItems.map(id => (
                        <Pickitem
                          id={`2_${id}`}
                          key={`2_${id}`}
                          isSelected={this.state.isSelectedById[`2_${id}`]}
                          onClick={this.toggleSelection.bind(this, `2_${id}`)}
                        >
                          {id}
                        </Pickitem>
                      ))}
                    </Picklist>
                  </XUIColumn>
                </XUIRow>
              </XUIPanelSection>
            </XUIPanel>
          }
        />
      );
    }
  }

  return <TouchInteractions />;
});
