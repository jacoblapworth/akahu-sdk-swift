import uuid from 'uuid/v4';

import { defaultFileList } from '../private/helpers';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIFileUploader';

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
    fileList: defaultFileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with single line fileList',
    showFilesAsMultiline: false,
    fileList: defaultFileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no icon fileList',
    showIcon: false,
    fileList: defaultFileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no icon single line fileList',
    showIcon: false,
    showFilesAsMultiline: false,
    fileList: defaultFileList,
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
    fileList: defaultFileList,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long text',
    defaultErrorMessage: 'Erroooooooooooooooooooooooooooooor!!!!!!!!',
    hasDragAndDrop: true,
    fileList: [
      {
        uid: uuid(),
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
        hasDragAndDropTitle,
        hintMessage: !isInvalid ? 'Hint text' : '',
        validationMessage: isInvalid ? 'Validation message' : '',
      });
    });
  });
});

export { storiesWithVariationsKindName, variations };
