// Libs
import React, { useState } from 'react';

// Components we need to test with
import XUIFileUploader from '../XUIFileUploader';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import { defaultFileList, defaultProps, fakeUpload } from '../private/helpers';

const Example = props => {
  const [fileList, setFileList] = useState(props.fileList || defaultProps.fileList);

  const handleFileUpload = (files, newFileList) => {
    files.forEach(file => {
      // Here is a fake upload with random status back
      // In reality, will probably be using something like XHR
      fakeUpload(file)
        .then(() => {
          newFileList.forEach(fileObject => {
            if (fileObject.uid === file.uid) {
              fileObject.status = 'done';
            }
          });
          setFileList([...newFileList]);
        })
        .catch(error => {
          newFileList.forEach(fileObject => {
            if (fileObject.uid === file.uid) {
              fileObject.status = 'error';
              fileObject.errorMessage = error.message; // custom error message
            }
          });
          setFileList([...newFileList]);
        });
    });
  };

  const onFilesChange = files => {
    files.forEach(file => {
      file.status = 'uploading';
    });
    const newFileList = [...files, ...fileList];
    setFileList(newFileList);
    handleFileUpload(files, newFileList);
  };

  const onDelete = (file, fileList) => {
    setFileList(fileList.filter(fileObject => fileObject.uid !== file.uid));
  };

  const onRetry = (file, fileList) => {
    fileList.forEach(fileObject => {
      if (fileObject.uid === file.uid) {
        fileObject.status = 'uploading';
      }
    });
    setFileList([...fileList]);
    handleFileUpload([file], fileList);
  };

  return (
    <XUIFileUploader
      {...defaultProps}
      {...props}
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
    />
  );
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {
  const props = {
    acceptedFileExtensions: text('acceptedFileExtensions', undefined),
    acceptsMultipleFiles: boolean('acceptsMultipleFiles', true),
    buttonText: text('buttonText', 'Select file'),
    cancelButtonText: text('cancelButtonText', 'Cancel'),
    className: text('className', undefined),
    dropZoneMessage: text('dropZoneMessage', 'Drag and drop file(s) or select manually'),
    defaultErrorMessage: text('defaultErrorMessage', 'File failed to upload'),
    fieldClassName: text('fieldClassName', undefined),
    fileListClassName: text('fileListClassName', undefined),
    hasDragAndDrop: boolean('hasDragAndDrop', false),
    hintMessage: text('hintMessage', undefined),
    isDisabled: boolean('isDisabled', false),
    isFieldLayout: boolean('isFieldLayout', false),
    isInvalid: boolean('isInvalid', false),
    label: text('label', 'Label'),
    labelClassName: text('labelClassName', undefined),
    retryButtonText: text('retryButtonText', 'Retry'),
    showFilesAsMultiline: boolean('showFilesAsMultiline', true),
    showIcon: boolean('showIcon', true),
    uploadingMessage: text('uploadingMessage', 'Uploading'),
    validationMessage: text('validationMessage', undefined),
  };
  return <Example {...props} fileList={defaultFileList} />;
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(customCentered);

variations.forEach(variations => {
  const { storyTitle, storyKind, ...variationMinusStoryDetails } = variations;

  storiesWithVariations.add(storyTitle, () => {
    return <Example {...variationMinusStoryDetails} />;
  });
});
