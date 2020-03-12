import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuid from 'uuid/v4';

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
  buttonContent,
  cancelButtonContent,
  className,
  defaultErrorMessage,
  deleteLabel,
  dropZoneMessage,
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
  retryButtonContent,
  showFilesAsMultiline = true,
  showIcon = true,
  uploadingMessage,
  validationMessage,
}) => {
  const inputEl = useRef(null);
  const [dragState, setDragState] = useState(null);
  const invalidState = isInvalid && !isDisabled;

  const onClick = () => {
    inputEl.current.click();
  };

  const handleOnChange = (files, event) => {
    const enhancedFileList = [...files].map(file => ({
      uid: uuid(), // A unique identifier used as the key of file items
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
            {buttonContent}
          </XUIButton>
        </div>
      </XUIControlWrapper>
      <FileList
        cancelButtonContent={cancelButtonContent}
        defaultErrorMessage={defaultErrorMessage}
        deleteLabel={deleteLabel}
        fileList={fileList}
        fileListClassName={fileListClassName}
        fileSizeUnits={fileSizeUnits}
        onCancel={onCancel}
        onDelete={onDelete}
        onRetry={onRetry}
        qaHook={qaHook}
        retryButtonContent={retryButtonContent}
        showFilesAsMultiline={showFilesAsMultiline}
        showIcon={showIcon}
        uploadingMessage={uploadingMessage}
      />
    </div>
  );
};

export default XUIFileUploader;

XUIFileUploader.propTypes = {
  /**
   * File extensions accepted by the file input.
   */
  acceptedFileExtensions: PropTypes.string,
  /**
   * Whether to support select multiple files
   */
  acceptsMultipleFiles: PropTypes.bool,
  /**
   * The content shows in the button
   * <br />
   * Recommended English value: *Select file*
   */
  buttonContent: PropTypes.string.isRequired,
  /**
   * The content shows in the cancel button
   * <br />
   * Recommended English value: *Cancel*
   */
  cancelButtonContent: PropTypes.string.isRequired,
  /**
   * Class names to be added to the div wrapping the select button/drop zone and file list
   */
  className: PropTypes.string,
  /**
   * Adds aria-label to delete icon.
   * <br />
   * Recommended English value: *Delete File*
   */
  deleteLabel: PropTypes.string.isRequired,
  /**
   * The message shows in the drop zone
   * <br />
   * Recommended English value: *Drag and drop file(s) or select manually*
   */
  dropZoneMessage: PropTypes.string.isRequired,
  /**
   * The message shows in the drop zone
   * <br />
   * Recommended English value: *Failed to upload file*
   */
  defaultErrorMessage: PropTypes.string.isRequired,
  /**
   * Class names to be added to the div wrapping the select button/drop zone
   */
  fieldClassName: PropTypes.string,
  /**
   * Array of the following format Object:
   * <br />
   * {
   *   uid: String, //A unique identifier used as the key of file items
   *   status: String, // user could change it to: uploading / done / error
   *   originalFile: file, // original File object
   *   errorMessage: String, // custom error message, will overwrite prop `defaultErrorMessage`
   * }
   */
  fileList: PropTypes.array.isRequired,
  /**
   * Class names to be added to the div wrapping filelist
   */
  fileListClassName: PropTypes.string,
  /**
   * The file size units array. Required if the `showFilesAsMultiline` prop is set to `true`.
   * <br />
   * Recommended English value: *['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']*
   */
  fileSizeUnits(...parameters) {
    return checkRequiredProps('showFilesAsMultiline', 'array', ...parameters);
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
   * Should label be applied as an aria-label, rather than being visibly displayed
   */
  isLabelHidden: PropTypes.bool,
  /**
   * Label to show above the input
   */
  label: PropTypes.string,
  /**
   * Class names to added to the label
   */
  labelClassName: PropTypes.string,
  /**
   * Provide a specific label ID which will be used as the "labelleby" aria property
   */
  labelId: PropTypes.string,
  /**
   * Called when the Cancel button is clicked.
   * <br />
   * `(file, fileList, event) => {}`
   */
  onCancel: PropTypes.func,
  /**
   * Called when the delete icon is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onDelete: PropTypes.func.isRequired,
  /**
   * Called when the file input is change (open or drop files)
   * <br />
   * (fileList, event) => {}
   */
  onFilesChange: PropTypes.func,
  /**
   * Called when the Retry button is clicked
   */
  onRetry: PropTypes.func.isRequired,
  qaHook: PropTypes.string,
  /**
   * The content shows in the retry button
   * <br />
   * Recommended English value: *Retry*
   */
  retryButtonContent: PropTypes.string.isRequired,
  /**
   * Show multi line in the file list item
   */
  showFilesAsMultiline: PropTypes.bool,
  /**
   * Show icon in the file list item
   */
  showIcon: PropTypes.bool,
  /**
   * The content shows in the button. Required if the `showFilesAsMultiline` prop is set to `true`.
   * <br />
   * Recommended English value: *Uploading...*
   */
  uploadingMessage(...parameters) {
    return checkRequiredProps('showFilesAsMultiline', 'string', ...parameters);
  },
  /**
   * Validation message to show under the input if `isInvalid` is true
   */
  validationMessage: PropTypes.string,
};
