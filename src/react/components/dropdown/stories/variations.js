import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const privateConsts = require('../private/constants');

const storiesWithKnobsKindName = 'Components/XUIDropdown';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as default',
    ddSettings: {},
    viewports: commonViewports,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Matched to Trigger Width',
    ddSettings: {},
    matchTriggerWidth: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'matching trigger min-width with short content and max width',
    ddSettings: {
      children: 'shortText',
      size: 'large',
    },
    matchTriggerWidth: 'min',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'matching trigger min-width with long content and max width',
    ddSettings: {
      size: 'large',
    },
    matchTriggerWidth: 'min',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with Header and Footer',
    viewports: desktopPlus320,
    ddSettings: {
      headerAndFooter: true,
    },
    closeOnSelect: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a DatePicker',
    viewports: desktopPlus320,
    ddSettings: {
      children: 'datepicker',
    },
    restrictToViewPort: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with Text Content',
    ddSettings: {
      children: 'plaintext',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with Nested Dropdown',
    ddSettings: {
      children: 'nested',
    },
    closeOnSelect: false,
    restrictToViewPort: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with scrollable Nested Dropdown',
    ddSettings: {
      children: 'nestedScrollable',
    },
    closeOnSelect: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'side by side',
    ddSettings: {
      children: 'side-by-side',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with positioning test',
    ddSettings: {
      children: 'positioning-test',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with maxHeight',
    ddSettings: {},
    maxHeight: 200,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'textInput trigger with msg only (portaled)',
    ddSettings: {
      children: 'hint-label',
      triggerSettings: {
        isInvalid: true,
        validationMessage: 'Rut roh',
      },
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'textInput trigger with label only (portaled)',
    ddSettings: {
      children: 'hint-label',
      triggerSettings: {
        isLabelHidden: false,
      },
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'textInput trigger with hint and label (portaled)',
    ddSettings: {
      children: 'hint-label',
      triggerSettings: {
        isLabelHidden: false,
        hintMessage: 'This is a hint',
      },
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'dropdown in dropdown',
    ddSettings: {
      children: 'dropdown-in-dropdown',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'dropdown against right gutter',
    ddSettings: {
      children: 'right-gutter',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'dropdown inline from split button',
    ddSettings: {
      children: 'splitButton-inline',
    },
  },
];

Object.keys(privateConsts.fixedWidthDropdownSizes).forEach(size => {
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `as Fixed-Width ${size}`,
    ddSettings: {
      hasFixedWidth: true,
      size,
    },
  });
});

privateConsts.dropdownPositionOptions.forEach(position => {
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `as preferredPosition ${position}`,
    preferredPosition: position,
    ddSettings: {},
  });
});

privateConsts.dropdownPositionOptions.forEach(position => {
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `as inline with preferredPosition ${position}`,
    preferredPosition: position,
    isLegacyDisplay: false,
    ddSettings: {
      hasFixedWidth: true,
      size: 'large',
    },
  });
});

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
