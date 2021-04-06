import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import XUIButton from '../button/XUIButton';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

import FileList from './private/FileList';
import { ns } from '../helpers/xuiClassNamespace';
import { baseClass } from './private/helpers';
import checkRequiredProps from '../../helpers/checkRequiredProps';

const XUIFileUploader = ({
  acceptedFileExtensions,
  acceptsMultipleFiles = true,
  buttonText,
  cancelButtonText,
  className,
  defaultErrorMessage,
  deleteLabel,
  dropZoneMessage,
  errorIconAriaLabel,
  fieldClassName,
  fileList,
  fileListClassName,
  fileSizeUnits,
  hasDragAndDrop,
  hintMessage,
  isDisabled,
  isFieldLayout,
  isInvalid,
  isLabelHidden,
  label,
  labelClassName,
  labelId,
  onCancel,
  onFilesChange,
  onDelete,
  onRetry,
  qaHook,
  retryButtonText,
  showFilesAsMultiline = true,
  showIcon = true,
  uploadingIconAriaLabel,
  uploadingMessage,
  validationMessage,
}) => {
  const inputEl = useRef();
  const [dragState, setDragState] = useState();
  const invalidState = isInvalid && !isDisabled;

  const onClick = () => {
    inputEl.current.click();
  };

  const handleOnChange = (files, event) => {
    const enhancedFileList = [...files].map(file => ({
      uid: nanoid(10), // A unique identifier used as the key of file items
      status: '', // user could change it to: uploading / error / done
      originalFile: file, // original File object
    }));
    onFilesChange(enhancedFileList, event);
  };

  const onDragChange = event => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    if (isDisabled) {
      return;
    }
    const { type, dataTransfer } = event;
    setDragState(type);
    if (type === 'drop') {
      handleOnChange(dataTransfer.files, event);
    }
  };

  const onInputChange = event => {
    const { target } = event;
    handleOnChange(event.target.files, event);
    // Make sure users can upload the same file
    target.value = '';
  };

  const dropZoneClassNames = hasDragAndDrop
    ? cn(
        `${baseClass}--dropzone`,
        dragState === 'dragover' && `${baseClass}--dropzone-active`,
        isDisabled && `${baseClass}--dropzone-disabled`,
        invalidState && dragState !== 'dragover' && `${baseClass}--dropzone-invalid`,
      )
    : '';

  const wrapperIds = generateIds(labelId);
  const wrapperProps = {
    labelClassName,
    label,
    labelId,
    isLabelHidden,
    isInvalid: invalidState,
    validationMessage,
    hintMessage,
  };
  const inputProps = {
    accept: acceptedFileExtensions,
    disabled: isDisabled,
    multiple: acceptsMultipleFiles,
    ref: inputEl,
    type: 'file',
    ...getAriaAttributes(wrapperIds, wrapperProps),
  };

  return (
    <div
      className={cn(className, baseClass, isFieldLayout && `${ns}-field-layout`)}
      data-automationid={qaHook}
    >
      <XUIControlWrapper fieldClassName={fieldClassName} wrapperIds={wrapperIds} {...wrapperProps}>
        <div
          className={dropZoneClassNames}
          onDragLeave={onDragChange}
          onDragOver={onDragChange}
          onDrop={onDragChange}
        >
          <input className={`${baseClass}--input`} {...inputProps} onChange={onInputChange} />
          {hasDragAndDrop && <span>{dropZoneMessage}</span>}
          <XUIButton isDisabled={isDisabled} onClick={onClick} size="small">
            {buttonText}
          </XUIButton>
        </div>
      </XUIControlWrapper>
      <FileList
        cancelButtonText={cancelButtonText}
        defaultErrorMessage={defaultErrorMessage}
        deleteLabel={deleteLabel}
        errorIconAriaLabel={errorIconAriaLabel}
        fileList={fileList}
        fileListClassName={fileListClassName}
        fileSizeUnits={fileSizeUnits}
        onCancel={onCancel}
        onDelete={onDelete}
        onRetry={onRetry}
        qaHook={qaHook}
        retryButtonText={retryButtonText}
        showFilesAsMultiline={showFilesAsMultiline}
        showIcon={showIcon}
        uploadingIconAriaLabel={uploadingIconAriaLabel}
        uploadingMessage={uploadingMessage}
      />
    </div>
  );
};

export default XUIFileUploader;

XUIFileUploader.propTypes = {
  /**
   * File extensions accepted by the file input
   */
  acceptedFileExtensions: PropTypes.string,
  /**
   * Whether to support selecting multiple files
   */
  acceptsMultipleFiles: PropTypes.bool,
  /**
   * Button text
   * <br />
   * Recommended English value: *Select file*
   */
  buttonText: PropTypes.string.isRequired,
  /**
   * Cancel button text
   * <br />
   * Recommended English value: *Cancel*
   */
  cancelButtonText: PropTypes.string.isRequired,
  /**
   * Class names to be added to the div wrapping the select button/drop zone and file list
   */
  className: PropTypes.string,
  /**
   * Default error message
   * <br />
   * Recommended English value: *Failed to upload file*
   */
  defaultErrorMessage: PropTypes.string.isRequired,
  /**
   * Label for “delete” icon for accessibility
   * <br />
   * Recommended English value: *Delete File*
   */
  deleteLabel: PropTypes.string.isRequired,
  /**
   * The message that shows in the drop zone
   * <br />
   * Recommended English value: *Drag and drop file(s) or select manually*
   */
  dropZoneMessage: PropTypes.string.isRequired,
  /**
   * Aria label for the error progress icon
   */
  errorIconAriaLabel: PropTypes.string,
  /**
   * Class names to be added to the div wrapping the select button/drop zone
   */
  fieldClassName: PropTypes.string,
  /**
   * Array of the following format Object:
   * <br />
   * {
   *   uid: String, // Unique identifier used as a file key. This value is generated when the file input changed, and should not be modified
   *   status: String, // User could change it to: uploading / done / error
   *   originalFile: File, // Original File object
   *   errorMessage: String, // Optional, custom error message, will overwrite prop `defaultErrorMessage`
   *   rightContent: ReactNode, // Optional, custom rightContent for files with `done` status, shows in the left of delete icon
   *   uploadProgressPercentage: Number, // Optional, percentage of upload completed. When present, the progress icon will illustrate completion amount. Must be an integer between 0 and 100 inclusive.
   * }
   */
  fileList: PropTypes.array.isRequired,
  /**
   * Class names to be added to the div wrapping filelist
   */
  fileListClassName: PropTypes.string,
  /**
   * The file size units array. Required if the `showFilesAsMultiline` prop is set to `true`
   * <br />
   * Recommended English value: *['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']*
   */
  fileSizeUnits(...parameters) {
    return checkRequiredProps('showFilesAsMultiline', PropTypes.array.isRequired, ...parameters);
  },
  /**
   * Whether to support the drag and drop to upload
   */
  hasDragAndDrop: PropTypes.bool,
  /**
   * Hint message to show under the input
   */
  hintMessage: PropTypes.string,
  /**
   * Whether the fileUploader is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * Whether to use the field layout classes
   */
  isFieldLayout: PropTypes.bool,
  /**
   * Whether the current input value is invalid
   */
  isInvalid: PropTypes.bool,
  /**
   * Prevents the label element from being displayed on the page. Label is still accessible to screen readers
   */
  isLabelHidden: PropTypes.bool,
  /**
   * Label to show above the input
   */
  label: PropTypes.string,
  /**
   * Class names to add to the label
   */
  labelClassName: PropTypes.string,
  /**
   * Provide a specific label ID which will be used as the aria-labelledby property
   */
  labelId: PropTypes.string,
  /**
   * Called when the cancel button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onCancel: PropTypes.func,
  /**
   * Called when the delete button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onDelete: PropTypes.func.isRequired,
  /**
   * Called when a file is opened or dropped
   * <br />
   * `(fileList, event) => {}`
   */
  onFilesChange: PropTypes.func.isRequired,
  /**
   * Called when retry button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onRetry: PropTypes.func.isRequired,
  qaHook: PropTypes.string,
  /**
   * Retry button text
   * <br />
   * Recommended English value: *Retry*
   */
  retryButtonText: PropTypes.string.isRequired,
  /**
   * Show multi line in the file list item
   */
  showFilesAsMultiline: PropTypes.bool,
  /**
   * Show icon in the file list item
   */
  showIcon: PropTypes.bool,
  /**
   * Aria label for the uploading progress icon
   */
  uploadingIconAriaLabel: PropTypes.string,
  /**
   * Message to display while the file is uploading. Required if the `showFilesAsMultiline` prop is set to `true`
   * <br />
   * Recommended English value: *Uploading...*
   */
  uploadingMessage(...parameters) {
    return checkRequiredProps('showFilesAsMultiline', PropTypes.string.isRequired, ...parameters);
  },
  /**
   * Validation message to show under the input if `isInvalid` is true
   */
  validationMessage: PropTypes.string,
};
