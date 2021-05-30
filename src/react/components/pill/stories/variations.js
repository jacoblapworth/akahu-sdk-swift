import React from 'react';
import XUIAvatar from '../../avatar/XUIAvatar';
import NOOP from '../../helpers/noop';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIPill';

const avatarProps = {
  className: '',
  qaHook: '',
  variant: undefined, // business is the other option
  value: 'Hello', // This has to be populated, or identifier
  imageUrl: '',
  identifier: '',
};

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no Avatar',
    value: 'No Avatar here',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with business Avatar',
    value: 'with business Avatar',
    avatarProps: { ...avatarProps, variant: 'business' },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with business Avatar small',
    value: 'with business Avatar small',
    size: 'small',
    avatar: <XUIAvatar size="xsmall" value="Hello" variant="business" />,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no Delete Button',
    value: 'No Delete Button here',
    omitDeleteBtn: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with short content small',
    value: 'N',
    omitDeleteBtn: true,
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as invalid',
    value: 'Invalid Pill',
    isInvalid: true,
    avatarProps,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has custom class',
    value: 'Custom Class Pill',
    className: 'xui-margin',
    avatarProps,
    onClick: NOOP,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a link',
    value: 'Click Me Pill',
    href: 'https://www.xero.com',
    avatar: <XUIAvatar size="small" value="Hello" />,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'does not have default layout',
    value: 'No default layout',
    hasDefaultLayout: false,
    avatarProps,
    onClick: NOOP,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'can have secondary text',
    value: 'Primary',
    secondaryText: 'Secondary',
    avatarProps,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long text and size limit',
    value: 'I am the primary value, I have long text',
    avatarProps,
    hasLimitedWidth: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long text and auto width',
    viewports: desktopPlus320,
    value: 'I am the primary value, I have long text',
    avatarProps,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with qaHooks',
    value: 'Inspect me',
    qaHook: 'qaHook',
    avatarProps,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as small',
    value: 'Small',
    title: 'Small pill',
    size: 'small',
    onDeleteClick: NOOP,
    onClick: NOOP,
    deleteButtonLabel: 'Delete Button Label',
    avatarProps,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'truncated text and tooltip',
    value: 'I am the primary value, I have long text',
    avatarProps,
    debugShowToolTip: true,
    hasLimitedWidth: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'truncated secondary text and tooltip',
    value: 'I am the primary value, I have long text',
    secondaryText: 'I am secondary text, I am long',
    avatarProps,
    debugShowToolTip: true,
    hasLimitedWidth: true,
  },
];

export { storiesWithVariationsKindName, variations, avatarProps };
