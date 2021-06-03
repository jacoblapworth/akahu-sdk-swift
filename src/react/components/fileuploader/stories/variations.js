import React from 'react';
import { nanoid } from 'nanoid';

import XUIButton from '../../button/XUIButton';
import { defaultFileList } from '../private/helpers';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIFileUploader';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

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
        uid: nanoid(10),
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
    storyTitle: 'with no retry button fileList',
    fileList: [
      {
        uid: nanoid(10),
        status: 'error',
        errorMessage: `File couldn't be uploaded because it's too large`,
        originalFile: {
          name: 'hideRetryButton.pdf',
          type: 'application/pdf',
          size: 600000000000,
        },
        hideRetryButton: true,
      },
      {
        uid: nanoid(10),
        status: 'error',
        originalFile: {
          name: 'showRetryButton.pdf',
          type: 'application/pdf',
          size: 600,
        },
      },
    ],
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
        uid: nanoid(10),
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
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with various uploadProgressPercentage',
    fileList: [
      {
        uid: nanoid(10),
        status: 'uploading',
        originalFile: {
          name: 'No Progress.zip',
          type: 'application/zip',
          size: 44444444,
        },
        uploadProgressPercentage: 0,
      },
      {
        uid: nanoid(10),
        status: 'uploading',
        originalFile: {
          name: 'Half Progress.zip',
          type: 'application/zip',
          size: 44444444,
        },
        uploadProgressPercentage: 50,
      },
      {
        uid: nanoid(10),
        status: 'uploading',
        originalFile: {
          name: 'Full Progress.zip',
          type: 'application/zip',
          size: 44444444,
        },
        uploadProgressPercentage: 100,
      },
      {
        uid: nanoid(10),
        status: 'done',
        originalFile: {
          name: 'Done.zip',
          type: 'application/zip',
          size: 44444444,
        },
        uploadProgressPercentage: 100,
      },
    ],
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

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
