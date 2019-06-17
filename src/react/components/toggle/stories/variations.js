import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIToggle';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Unstyled',
    label: 'text-label',
    isLabelHidden: true,
    options: [
      {
        name: 'tg2',
        value: 'toggle1',
      },
      {
        name: 'tg2',
        value: 'toggle2',
      },
      {
        name: 'tg2',
        value: 'toggle3',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Toggle Options',
    label: 'text-label',
    labelId: 'testme',
    layout: 'fullwidth',
    options: [
      {
        name: 'tg3',
        value: 'toggle1',
      },
      {
        isDefaultChecked: true,
        name: 'tg3',
        value: 'toggle2',
      },
      {
        isDisabled: true,
        name: 'tg3',
        value: 'toggle3',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Inverted Options',
    label: 'text-label',
    isLabelHidden: true,
    layout: 'fullwidth',
    color: 'inverted',
    options: [
      {
        name: 'tg4',
        value: 'toggle1',
      },
      {
        isDefaultChecked: true,
        name: 'tg4',
        value: 'toggle2',
      },
      {
        isDisabled: true,
        name: 'tg4',
        value: 'toggle3',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked / Disabled',
    label: 'text-label',
    isLabelHidden: true,
    layout: 'fullwidth',
    options: [
      {
        name: 'tg5',
        value: 'toggle1',
      },
      {
        isChecked: true,
        isDisabled: true,
        name: 'tg5',
        value: 'toggle2',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Inverted Checked / Disabled',
    label: 'text-label',
    isLabelHidden: true,
    layout: 'fullwidth',
    color: 'inverted',
    options: [
      {
        name: 'tg6',
        value: 'toggle1',
      },
      {
        isChecked: true,
        isDisabled: true,
        name: 'tg6',
        value: 'toggle2',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Small Size',
    viewports: desktopPlus320,
    label: 'text-label',
    isLabelHidden: true,
    layout: 'fullwidth',
    size: 'small',
    options: [
      {
        name: 'tg7',
        value: 'toggle1',
      },
      {
        name: 'tg7',
        value: 'toggle2',
      },
      {
        isDefaultChecked: true,
        name: 'tg7',
        value: 'toggle3',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checkboxes',
    label: 'text-label',
    isLabelHidden: true,
    layout: 'fullwidth',
    options: [
      {
        name: 'tg8',
        value: 'toggle1',
        type: 'checkbox',
      },
      {
        name: 'tg8',
        value: 'toggle2',
        type: 'checkbox',
      },
      {
        name: 'tg8',
        value: 'toggle3',
        type: 'checkbox',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with hint text',
    viewports: desktopPlus320,
    label: 'Toggle with a hint',
    hintMessage: 'You must pick at least one to proceed',
    layout: 'fullwidth',
    options: [
      {
        isDefaultChecked: true,
        name: 'tg9',
        value: 'toggle1',
        type: 'checkbox',
      },
      {
        name: 'tg9',
        value: 'toggle2',
        type: 'checkbox',
      },
      {
        isDisabled: true,
        name: 'tg9',
        value: 'toggle3',
        type: 'checkbox',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'invalid with message',
    label: 'Invalid with validation message',
    validationMessage: 'Please select an option to proceed',
    isInvalid: true,
    layout: 'fullwidth',
    options: [
      {
        isDefaultChecked: true,
        name: 'tg10',
        value: 'toggle1',
        type: 'checkbox',
      },
      {
        name: 'tg10',
        value: 'toggle2',
        type: 'checkbox',
      },
      {
        isDisabled: true,
        name: 'tg10',
        value: 'toggle3',
        type: 'checkbox',
      },
    ],
  },
];

module.exports = {
  storiesWithVariationsKindName,
  variations,
};
