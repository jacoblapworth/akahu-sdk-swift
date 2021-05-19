import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import XUIButton from '../../button/XUIButton';
import { defaultFileList } from '../private/helpers';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIFileUploader';
const fileList = defaultFileList.slice(1);

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as disabled',
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with fileList',
    fileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with custom rightContent for uploaded file',
    fileList: [
      {
        uid: uuidv4(),
        status: 'done',
        originalFile: {
          name: 'hello.pdf',
          type: 'application/pdf',
          size: 12345678,
        },
        rightContent: (
          <XUIButton size="small" variant="borderless-primary">
            Action
          </XUIButton>
        ),
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with single line fileList',
    showFilesAsMultiline: false,
    fileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no icon fileList',
    showIcon: false,
    fileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no icon single line fileList',
    showIcon: false,
    showFilesAsMultiline: false,
    fileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'drag and drop',
    hasDragAndDrop: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'disabled drag and drop',
    hasDragAndDrop: true,
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'drag and drop with fileList',
    hasDragAndDrop: true,
    fileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long text',
    defaultErrorMessage: 'Erroooooooooooooooooooooooooooooor!!!!!!!!',
    hasDragAndDrop: true,
    fileList: [
      {
        uid: uuidv4(),
        status: 'error',
        originalFile: {
          name: 'I am test333333333333333333333333tset ma I.zip',
          type: 'application/zip',
          size: 44444444,
        },
      },
    ],
    dropZoneMessage: 'Droooooooooooooooooooooop drooooop drooop your file',
    viewports: desktopPlus320,
  },
];

[false, true].forEach(hasDragAndDrop => {
  [false, true].forEach(isInvalid => {
    isInvalid &&
      variations.push({
        storyKind: storiesWithVariationsKindName,
        storyTitle: `${hasDragAndDrop ? 'drag and drop ' : ''}with long validation message`,
        isInvalid,
        hasDragAndDrop,
        viewports: desktopPlus320,
        validationMessage:
          isInvalid && 'Validation message is longer longer longer here and could wrap wrap wrap',
      });
    [false, true].forEach(isLabelHidden => {
      const hasDragAndDropTitle = hasDragAndDrop ? 'drag and drop ' : '';
      const isInvalidTitle = isInvalid ? 'with validation error' : 'with hint text';
      const isLabelHiddenTitle = isLabelHidden ? ' and hidden label' : '';

      variations.push({
        storyKind: storiesWithVariationsKindName,
        storyTitle: `${hasDragAndDropTitle}${isInvalidTitle}${isLabelHiddenTitle}`,
        isInvalid,
        isLabelHidden,
        hasDragAndDrop,
        hintMessage: !isInvalid ? 'Hint text' : '',
        validationMessage: isInvalid ? 'Validation message' : '',
      });
    });
  });
});

export { storiesWithVariationsKindName, variations };
