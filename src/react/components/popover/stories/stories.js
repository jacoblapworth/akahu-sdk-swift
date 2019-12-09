// Libs
import React from 'react';

// Components we need to test with
import XUIButton, { XUIIconButton } from '../../../button';
import cross from '@xero/xui-icon/icons/cross';

// Story book things
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.subVariants = undefined;
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return (
      <div
        aria-describedby="feature-description"
        aria-labelledby="feature-header"
        className="xui-popover xui-popover-arrow xui-popover-arrow-lefttop"
        role="dialog"
      >
        <div className="xui-u-flex xui-u-flex-align-center xui-padding-top xui-padding-right xui-padding-left-large">
          <div className="xui-heading-item" id="feature-header">
            New view modes
          </div>
          <XUIIconButton
            ariaLabel="Close"
            className="xui-margin-left-auto"
            icon={cross}
            key="close-button"
            onClick={() => {}}
            size="small"
            title="Close"
            type="button"
          />
        </div>
        <div
          className="xui-textcolor-muted xui-padding-top-xsmall xui-padding-horizontal-large"
          id="feature-description"
        >
          Choose how much detail you see by switching between simple or advanced view modes here.
        </div>
        <div className="xui-u-flex xui-u-flex-align-center xui-u-flex-justify-space-between xui-padding-top-small xui-padding-right xui-padding-bottom xui-padding-left-large">
          <div className="xui-text-small xui-textcolor-muted">Step 1 of 3</div>
          <XUIButton key="main" size="small" variant="borderless-primary">
            Next
          </XUIButton>
        </div>
      </div>
    );
  });
});
