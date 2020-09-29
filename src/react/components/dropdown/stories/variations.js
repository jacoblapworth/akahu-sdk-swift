import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';
import NOOP from '../../helpers/noop';

const privateConsts = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/Dropdown';

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
    storyTitle: 'with Header and Footer',
    viewports: desktopPlus320,
    ddSettings: {
      headerAndFooter: true,
    },
    closeOnTab: false,
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
    closeOnTab: false,
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
    storyTitle: 'with NestedDropDown',
    ddSettings: {
      children: 'nested',
    },
    closeOnTab: false,
    closeOnSelect: false,
    restrictToViewPort: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with scrollable NestedDropDown',
    ddSettings: {
      children: 'nestedScrollable',
    },
    closeOnTab: false,
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
];

Object.keys(privateConsts.fixedWidthDropdownSizes).forEach(size => {
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `as Fixed-Width ${size}`,
    ddSettings: {
      fixedWidth: true,
      size,
    },
  });
});

export { storiesWithVariationsKindName, variations, NOOP };
