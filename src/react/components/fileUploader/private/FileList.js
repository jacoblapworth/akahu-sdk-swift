import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import { XUIProgressCircular } from '../../../progressindicator';
import trash from '@xero/xui-icon/icons/trash';

import { baseClass, formatBytes, getFileTypeIcon } from './helpers';

const fileItemBaseClass = `${baseClass}--fileitem`;
const iconClassName = `${fileItemBaseClass}--icon`;
const progressProps = {
  progress: 1,
  total: 4,
};

const FileList = ({
  cancelButtonText,
  defaultErrorMessage,
  deleteLabel,
  fileList,
  fileListClassName,
  fileSizeUnits,
  showFilesAsMultiline,
  onCancel,
  onDelete,
  onRetry,
  qaHook,
  retryButtonText,
  uploadingMessage,
  showIcon,
}) => {
  const handleCancel = (file, event) => {
    onDelete(file, fileList, event);
    if (onCancel) {
      onCancel(file, fileList, event);
    }
  };

  return (
    fileList.length > 0 && (
      <ul
        className={cn(fileListClassName, `${baseClass}--filelist`)}
        data-automationid={qaHook && `${qaHook}-filelist`}
      >
        {fileList.map(file => {
          const { uid, status, originalFile = {}, errorMessage, rightContent } = file;

          const { name, size, type } = originalFile;
          return (
            <li className={cn(fileItemBaseClass)} key={uid}>
              {// Once the prop for loading spin of XUIProgressCircular is added,
              // the error and uploading status could be merged
              (status === 'error' && (
                <span className={iconClassName}>
                  <XUIProgressCircular
                    id={`fileuploader-icon-error-${uid}`}
                    isHardError
                    {...progressProps}
                  />
                </span>
              )) ||
                (status === 'uploading' && (
                  <span className={`${fileItemBaseClass}--loading`}>
                    <XUIProgressCircular id={`fileuploader-icon-spin-${uid}`} {...progressProps} />
                  </span>
                )) ||
                (showIcon && (
                  <XUIIcon className={iconClassName} icon={getFileTypeIcon(name, type)} isBoxed />
                ))}
              <div className={`${fileItemBaseClass}--maincontent`}>
                {name}
                {status === 'error' ? (
                  <span className={`${fileItemBaseClass}--error`}>
                    {errorMessage || defaultErrorMessage}
                  </span>
                ) : (
                  showFilesAsMultiline && (
                    <span className={`${fileItemBaseClass}--description`}>
                      {status === 'uploading' && uploadingMessage}
                      {status === 'done' && formatBytes(size, fileSizeUnits)}
                    </span>
                  )
                )}
              </div>
              <div className={`${fileItemBaseClass}--rightcontent`}>
                {status === 'done' && rightContent}
                {status === 'error' && (
                  <XUIButton
                    onClick={event => onRetry(file, fileList, event)}
                    size="small"
                    variant="borderless-primary"
                  >
                    {retryButtonText}
                  </XUIButton>
                )}
                {status === 'uploading' ? (
                  <XUIButton
                    onClick={event => handleCancel(file, event)}
                    size="small"
                    variant="borderless-primary"
                  >
                    {cancelButtonText}
                  </XUIButton>
                ) : (
                  <XUIIconButton
                    ariaLabel={deleteLabel}
                    icon={trash}
                    onClick={event => onDelete(file, fileList, event)}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default FileList;

FileList.propTypes = {
  cancelButtonText: PropTypes.string.isRequired,
  defaultErrorMessage: PropTypes.string.isRequired,
  deleteLabel: PropTypes.string.isRequired,
  fileList: PropTypes.array.isRequired,
  fileListClassName: PropTypes.string,
  fileSizeUnits: PropTypes.array,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  qaHook: PropTypes.string,
  retryButtonText: PropTypes.string.isRequired,
  showFilesAsMultiline: PropTypes.bool,
  showIcon: PropTypes.bool,
  uploadingMessage: PropTypes.string,
};
