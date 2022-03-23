import React from 'react';

import view from '@xero/xui-icon/icons/view';
import XUIButton from '../XUIButton';
import XUIButtonGroup from '../XUIButtonGroup';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import XUIIconButton from '../XUIIconButton';
import XUISplitButton from '../XUISecondaryButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';

const dropdownWithTrigger = (
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown>
        <p className="xui-padding-small">hello</p>
      </XUIDropdown>
    }
    key="ddt"
    trigger={<XUISplitButton aria-label="Other actions" key="split3" variant="main" />}
  />
);

const buttonContents = {
  withCaret: ['Caret button'],
  withIcon: ['Icon in a button'],
  asGroup: [<XUIButton key="one">One</XUIButton>, <XUIButton key="two">Two</XUIButton>],
  asMultiGroup: [
    <XUIButton key="one">Some significantly longer content in the first button</XUIButton>,
    <XUIButton key="two">Additional very long content in a second button</XUIButton>,
  ],
  asSplitGroup: [
    <XUIButton key="main1">Main</XUIButton>,
    <XUISplitButton aria-label="Other actions" key="split1" />,
  ],
  asSplitGroupMulti: [
    <XUIButton key="main2">
      This is a bunch of multi line text to make sure the icon displays correctly
    </XUIButton>,
    <XUISplitButton aria-label="Other actions" key="split2" />,
  ],
  asSplitGroupDropdown: [<XUIButton key="main3">Main</XUIButton>, dropdownWithTrigger],
};

const addVariations = (variations, storiesWithVariations) => {
  variations.forEach(variation => {
    storiesWithVariations.add(variation.storyTitle, () => {
      const variationMinusStoryDetails = { ...variation };
      const value =
        variationMinusStoryDetails.value || buttonContents[variationMinusStoryDetails.contentsKey];
      const componentType = variationMinusStoryDetails.componentType;
      delete variationMinusStoryDetails.storyKind;
      delete variationMinusStoryDetails.storyTitle;
      delete variationMinusStoryDetails.componentType;
      delete variationMinusStoryDetails.contentsKey;
      variationMinusStoryDetails.value = undefined;

      const width =
        !variationMinusStoryDetails.fullWidth || variationMinusStoryDetails.fullWidth === 'never'
          ? 'auto'
          : '';
      const ButtonWrapper = ({ children }) => (
        <div style={{ maxWidth: '600px', width }}>{children}</div>
      );

      let buttonContent;

      switch (componentType) {
        case 'XUIButtonGroup':
          buttonContent = <XUIButtonGroup {...variationMinusStoryDetails}>{value}</XUIButtonGroup>;
          break;
        case 'XUISplitButtonGroup':
          buttonContent = (
            <div style={{ maxWidth: '150px' }}>
              <XUISplitButtonGroup {...variationMinusStoryDetails}>{value}</XUISplitButtonGroup>
            </div>
          );
          break;
        case 'XUIIconButton':
          buttonContent = (
            <XUIIconButton icon={view} {...variationMinusStoryDetails} ariaLabel="View" />
          );
          break;
        default:
          buttonContent = <XUIButton {...variationMinusStoryDetails}>{value}</XUIButton>;
      }
      return <ButtonWrapper>{buttonContent}</ButtonWrapper>;
    });
  });
};

export default addVariations;
