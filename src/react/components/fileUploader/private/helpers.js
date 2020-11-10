import { v4 as uuidv4 } from 'uuid';
import attach from '@xero/xui-icon/icons/attach';
import image from '@xero/xui-icon/icons/image';
import fileCsvIcon from '@xero/xui-icon/icons/file-csv';
import fileExcelIcon from '@xero/xui-icon/icons/file-excel';
import filePdfIcon from '@xero/xui-icon/icons/file-pdf';
import fileWordIcon from '@xero/xui-icon/icons/file-word';
import fileZipIcon from '@xero/xui-icon/icons/file-zip';
import { ns } from '../../helpers/xuiClassNamespace';
import { logWarning } from '../../helpers/developmentConsole';

export const baseClass = `${ns}-fileuploader`;

export const formatBytes = (bytes, fileSizeUnits) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(2))} ${fileSizeUnits[i]}`;
};

export const getFileTypeIcon = (name, mimeType) => {
  if (typeof name !== 'string' || typeof mimeType !== 'string') {
    return attach;
  }
  // All types of images use the same icon, so it's easier to know from the MIME type
  if (mimeType.includes('image')) {
    return image;
  }
  let icon;
  const fileType = name.substring(name.lastIndexOf('.') + 1);
  switch (fileType.toLowerCase()) {
    case 'pdf':
      icon = filePdfIcon;
      break;
    case 'docx':
    case 'doc':
      icon = fileWordIcon;
      break;
    case 'csv':
      icon = fileCsvIcon;
      break;
    case 'xls':
    case 'xlsx':
      icon = fileExcelIcon;
      break;
    case 'zip':
      icon = fileZipIcon;
      break;
    default:
      icon = attach;
  }
  return icon;
};

// originalFile should be File, but File API isn't implemented in Node.js (when running vis-reg tests)
// so just use the object here for tests
export const defaultFileList = [
  {
    uid: uuidv4(),
    status: 'uploading',
    originalFile: { name: 'test1.jpg', type: 'image/jpeg', size: 11111 },
  },
  {
    uid: uuidv4(),
    status: 'done',
    originalFile: { name: 'test2.pdf', type: 'application/pdf', size: 2222 },
  },
  {
    uid: uuidv4(),
    status: 'error',
    originalFile: { name: 'test3.zip', type: 'application/zip', size: 33333 },
  },
  {
    uid: uuidv4(),
    status: 'uploading',
    originalFile: { name: 'test4.zip', type: 'application/zip', size: 44444 },
    uploadProgressPercentage: 50,
  },
];

// This is just for tests/docs use
export const defaultProps = {
  buttonText: 'Select file',
  cancelButtonText: 'Cancel',
  defaultErrorMessage: 'Failed to upload file',
  deleteLabel: 'Delete file',
  dropZoneMessage: 'Drag and drop file(s) or select manually',
  fileList: [],
  // Usually the file won't be that large, but it's better to include all units
  fileSizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  label: 'Label',
  retryButtonText: 'Retry',
  uploadingMessage: 'Uploading...',
  onDelete: () => {},
  onFilesChange: () => {},
  onRetry: () => {},
};

export const fakeUpload = () => {
  const fakeStatus = ['done', 'error'][Math.floor(Math.random() * 2)];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fakeStatus === 'error') {
        reject(new Error('Upload failed'));
      }
      resolve();
    }, 1000);
  });
};

export const parseUploadProgressPercentage = value => {
  if (value === undefined) return undefined;
  if (isNaN(value)) return undefined;

  if (value < 0 || value > 100) {
    const newValue = value < 0 ? 0 : 100;
    logWarning({
      componentName: 'XUIFileUploader',
      message: `uploadProgressPercentage was provided ${value}. This has been rounded to ${newValue}.`,
    });
    return newValue;
  }

  return Math.floor(value);
};
