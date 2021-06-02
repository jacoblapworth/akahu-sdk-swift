import React from 'react';
import XUIAvatar from '../../avatar/XUIAvatar';

const storiesWithKnobsKindName = 'Components/XUIRange';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const leftElement = {
  leftElement: (
    <XUIAvatar
      className="xui-margin-small"
      imageUrl="https://i.picsum.photos/id/1033/100/100.jpg?hmac=tomT-dDv5vivqHh5P2NCXMYcsD8G3D4-hAqxbdQ7O2c"
      value="left"
    />
  ),
};
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'disabled',
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'isInvalid',
    isInvalid: true,
    hintMessage: 'hintMessage',
    validationMessage: 'validationMessage',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Max/Min values and step',
    max: '88',
    min: '22',
    step: '11',
    defaultValue: '33',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'left and right Elements',
    leftElement: leftElement.leftElement,
    rightElement: leftElement.leftElement,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'medium',
    size: 'medium',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small',
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall',
    size: 'xsmall',
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
