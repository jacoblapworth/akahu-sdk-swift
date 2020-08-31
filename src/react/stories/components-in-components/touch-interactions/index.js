// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Libs
import React from 'react';
import view from '@xero/xui-icon/icons/view';
import { XUICompositionDetail } from '../../../compositions';
import { XUIColumn, XUIRow } from '../../../structural';
import { XUIPanel, XUIPanelHeading, XUIPanelSection } from '../../../panel';
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

const sizes = ['medium', 'small', 'xsmall'];
const avatarSizeMap = {
  medium: 'xlarge',
  small: 'medium',
  xsmall: '2xsmall',
};

const test = storiesOf(compositionKind, module);

// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

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
              <XUIPanelSection className="xui-padding-xlarge" id="size-toggle">
                <XUIToggle
                  hintMessage="Not all controls are available in small or xsmall"
                  isFieldLayout
                  label="Size (where applicable)"
                  layout="fullwidth"
                  size={noXsmallSize}
                >
                  {sizes.map(size => (
                    <XUIToggleOption
                      isDefaultChecked={size === 'medium'}
                      key={`toggle-${size}`}
                      name="size-toggle"
                      onChange={() => {
                        this.setState({ overallSize: size });
                      }}
                      type="radio"
                    >
                      {size}
                    </XUIToggleOption>
                  ))}
                </XUIToggle>
              </XUIPanelSection>
              {/* Dropdowns */}
              <XUIPanelSection className="xui-padding-xlarge" id="dropdowns">
                <XUIPanelHeading hasLayout={false}>Dropdown-type controls</XUIPanelHeading>
                <DetailedListExample
                  hintMessage="Enter a name"
                  inputLabel="Autocompleter test"
                  inputSize={noXsmallSize}
                  isInputLabelHidden={false}
                  picklistSize={overallSize}
                  placeholder="e.g. Mario"
                  validationMessage="Pick a valid person"
                />
                <SecondarySearchExample
                  className="xui-field-layout"
                  isClosed
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
              <XUIPanelSection className="xui-padding-xlarge" id="hover">
                <XUIPanelHeading hasLayout={false}>Things with hover states</XUIPanelHeading>
                <div>
                  <TooltipWrapper
                    buttonContent="Click for tooltip"
                    size={overallSize}
                    tipContent="Hello. I am a click-only tip."
                    triggers={['click']}
                  />
                  <TooltipWrapper
                    buttonContent="Focus for tooltip"
                    size={overallSize}
                    tipContent="Hello. I am a focus-only tip."
                    triggers={['focus']}
                  />
                  <TooltipWrapper
                    buttonContent="Hover for tooltip"
                    size={overallSize}
                    tipContent="Hello. I am a hover-only tip."
                    triggers={['hover']}
                  />
                </div>
                <div>
                  <TooltipWrapper
                    buttonContent="Click or hover"
                    size={overallSize}
                    tipContent="Hello. I am a click-hover tip."
                    triggers={['hover', 'click']}
                  />
                  <TooltipWrapper
                    buttonContent="Focus or click"
                    size={overallSize}
                    tipContent="Hello. I am a focus-click tip."
                    triggers={['focus', 'click']}
                  />
                  <TooltipWrapper
                    buttonContent="Hover or focus"
                    size={overallSize}
                    tipContent="Hello. I am a hover-focus tip."
                    triggers={['focus', 'hover']}
                  />
                </div>
                <div>
                  <TooltipWrapper
                    buttonContent="Any action"
                    size={overallSize}
                    tipContent="Hello. I am a click-hover-focus tip."
                    triggers={['focus', 'hover', 'click']}
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
                      checkboxSize={overallSize}
                      className="xui-margin-left-small"
                      isCheckboxHidden
                      label="Rollover checkbox"
                      rolloverComponent={
                        <XUIAvatar size={avatarSizeMap[overallSize]} value="Finn Clark" />
                      }
                    />
                  </XUIColumn>
                </XUIRow>
              </XUIPanelSection>
              {/* Basic controls */}
              <XUIPanelSection className="xui-padding-xlarge" id="simple">
                <XUIPanelHeading hasLayout={false}>Simpler controls</XUIPanelHeading>
                <div className="xui-field-layout">
                  <RangeWrapper label="Smooth" size={overallSize} step={0} />
                  <RangeWrapper label="Stepped" size={overallSize} step={10} />
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
              <XUIPanelSection className="xui-padding-xlarge" id="hit-areas">
                <XUIPanelHeading hasLayout={false}>Hit-area tests</XUIPanelHeading>
                <XUITextInput
                  isFieldLayout
                  label="Text input for size and focus"
                  rightElement={
                    <XUITextInputSideElement type="icon">
                      <XUIButton
                        onClick={() => console.log('Textinput button fire')}
                        size={overallSize}
                        variant="icon"
                      >
                        <XUIIcon icon={view} />
                      </XUIButton>
                    </XUITextInputSideElement>
                  }
                  size={overallSize}
                />
                Buttons (incl unstyled):
                <XUIRow id="buttons" variant="flex">
                  <XUIColumn className="xui-field-layout" gridColumns="half">
                    {createSizedLoggingButtons({
                      stringArray: ['1', '2', '3', '4', '5', '6'],
                      size: overallSize,
                    })}
                  </XUIColumn>
                  <XUIColumn className="xui-field-layout" gridColumns="half">
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
                  <XUIColumn className="xui-field-layout" gridColumns="full">
                    {createSizedIconButtons(overallSize)}
                  </XUIColumn>
                </XUIRow>
                <div className="xui-field-layout" id="pills">
                  Pills:
                  <br />
                  <XUIPill
                    onDeleteClick={() => console.log('delete pill 1')}
                    size={overallSize}
                    value="Just a delete"
                  />
                  <XUIPill
                    href="#pills"
                    onDeleteClick={() => console.log('delete pill 2')}
                    size={overallSize}
                    value="Link and delete"
                  />
                  <XUIPill
                    onClick={() => console.log('clicking pill 3')}
                    onDeleteClick={() => console.log('delete pill 3')}
                    size={overallSize}
                    value="Onclick and delete"
                  />
                  <XUIPill href="#pills" size={overallSize} value="Just a link" />
                  <XUIPill
                    avatarProps={{ value: 'Hi Mom' }}
                    onClick={() => console.log('clicking pill 5')}
                    onDeleteClick={() => console.log('delete pill 5')}
                    size={overallSize}
                    value="All the things"
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
                  className="xui-u-flex-align-stretch xui-margin-bottom-small"
                  id="vertical-picklists"
                  variant="flex"
                >
                  <XUIColumn className="xui-panel" gridColumns="full" gridColumnsSmallUp="half">
                    {createPicklist({
                      prefix: '1',
                      customProps: { sizeHeader: true },
                      size: overallSize,
                    })}
                  </XUIColumn>
                  <XUIColumn className="xui-panel" gridColumns="full" gridColumnsSmallUp="half">
                    <Picklist isMultiselect size={noXsmallSize}>
                      <PicklistHeader>{noXsmallSize}</PicklistHeader>
                      {multiSelectItems.map(id => (
                        <Pickitem
                          id={`2_${id}`}
                          isSelected={this.state.isSelectedById[`2_${id}`]}
                          key={`2_${id}`}
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
