import { array, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import { defaultFileList, defaultProps, fakeUpload } from '../private/helpers';
import XUIFileUploader from '../XUIFileUploader';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const Example = props => {
  const [fileList, setFileList] = React.useState(props.fileList || defaultProps.fileList);

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

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(customCentered);

storiesWithKnobs.add('Playground', () => {
  const props = {
    acceptedFileExtensions: text('acceptedFileExtensions', undefined),
    acceptsMultipleFiles: boolean('acceptsMultipleFiles', true),
    buttonText: text('buttonText', defaultProps.buttonText),
    cancelButtonText: text('cancelButtonText', defaultProps.cancelButtonText),
    defaultErrorMessage: text('defaultErrorMessage', defaultProps.defaultErrorMessage),
    deleteLabel: text('deleteLabel', defaultProps.deleteLabel),
    dropZoneMessage: text('dropZoneMessage', defaultProps.dropZoneMessage),
    errorIconAriaLabel: text('errorIconAriaLabel', defaultProps.errorIconAriaLabel),
    fileSizeUnits: array('fileSizeUnits', defaultProps.fileSizeUnits),
    hasDragAndDrop: boolean('hasDragAndDrop', false),
    hintMessage: text('hintMessage', undefined),
    isDisabled: boolean('isDisabled', false),
    isFieldLayout: boolean('isFieldLayout', false),
    isInvalid: boolean('isInvalid', false),
    isLabelHidden: boolean('isLabelHidden', false),
    label: text('label', defaultProps.label),
    retryButtonText: text('retryButtonText', defaultProps.retryButtonText),
    showFilesAsMultiline: boolean('showFilesAsMultiline', true),
    showIcon: boolean('showIcon', true),
    uploadingIconAriaLabel: text('uploadingIconAriaLabel', defaultProps.uploadingIconAriaLabel),
    uploadingMessage: text('uploadingMessage', defaultProps.uploadingMessage),
    validationMessage: text('validationMessage', undefined),
  };
  return <Example {...props} fileList={defaultFileList} />;
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(customCentered);

variations.forEach(variations => {
  const { storyTitle, storyKind, ...variationProps } = variations;

  storiesWithVariations.add(storyTitle, () => <Example {...variationProps} />);
});
