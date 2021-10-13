import { nanoid } from 'nanoid';
import attach from '@xero/xui-icon/icons/attach';
import image from '@xero/xui-icon/icons/image';
import fileCsvIcon from '@xero/xui-icon/icons/file-csv';
import fileDocumentIcon from '@xero/xui-icon/icons/file-document';
import fileEmailIcon from '@xero/xui-icon/icons/email';
import fileExcelIcon from '@xero/xui-icon/icons/file-excel';
import filePdfIcon from '@xero/xui-icon/icons/file-pdf';
import fileSpreadsheetIcon from '@xero/xui-icon/icons/file-spreadsheet';
import fileWordIcon from '@xero/xui-icon/icons/file-word';
import fileZipIcon from '@xero/xui-icon/icons/file-zip';
import { ns } from '../../helpers/xuiClassNamespace';
import { logWarning } from '../../helpers/developmentConsole';

export const baseClass = `${ns}-fileuploader`;

// Accepted file types listed in Xero Central
// https://central.xero.com/s/article/Manage-your-file-library#Aboutthefilelibrary
const fileExtensions = {
  // archives
  '7z': { icon: fileZipIcon, color: 'black-muted' },
  rar: { icon: fileDocumentIcon, color: 'black-muted' },
  xzip: { icon: fileZipIcon, color: 'black-muted' },
  zip: { icon: fileZipIcon, color: 'black-muted' },
  zipx: { icon: fileZipIcon, color: 'black-muted' },

  // documents
  csv: { icon: fileCsvIcon, color: 'file_spreadsheet' },
  doc: { icon: fileWordIcon, color: 'blue' },
  docx: { icon: fileWordIcon, color: 'blue' },
  key: { icon: fileDocumentIcon, color: 'black-muted' },
  keynote: { icon: fileDocumentIcon, color: 'black-muted' },
  numbers: { icon: fileSpreadsheetIcon, color: 'file_spreadsheet' },
  'numbers-tef': { icon: fileSpreadsheetIcon, color: 'file_spreadsheet' },
  odf: { icon: fileDocumentIcon, color: 'black-muted' },
  ods: { icon: fileSpreadsheetIcon, color: 'file_spreadsheet' },
  odt: { icon: fileDocumentIcon, color: 'black-muted' },
  pages: { icon: fileDocumentIcon, color: 'black-muted' },
  'pages-tef': { icon: fileDocumentIcon, color: 'black-muted' },
  pdf: { icon: filePdfIcon, color: 'file_pdf' },
  ppt: { icon: fileDocumentIcon, color: 'black-muted' },
  pptx: { icon: fileDocumentIcon, color: 'black-muted' },
  rtf: { icon: fileDocumentIcon, color: 'black-muted' },
  txt: { icon: fileDocumentIcon, color: 'black-muted' },
  xls: { icon: fileExcelIcon, color: 'file_spreadsheet' },
  xlsx: { icon: fileExcelIcon, color: 'file_spreadsheet' },

  // email
  eml: { icon: fileEmailIcon, color: 'black-muted' },
  msg: { icon: fileEmailIcon, color: 'black-muted' },
};

export const formatBytes = (bytes, fileSizeUnits) => {
  if (bytes === 0) return `0 ${fileSizeUnits[0]}`;

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(2))} ${fileSizeUnits[i]}`;
};

export const getFileTypeIcon = (name, mimeType) => {
  const defaultIcon = { color: 'black-muted', icon: attach };
  if (typeof name !== 'string' || typeof mimeType !== 'string') {
    return defaultIcon;
  }
  // All types of images use the same icon, so it's easier to know from the MIME type
  if (mimeType.includes('image')) {
    return { color: 'black-muted', icon: image };
  }

  const fileType = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
  return fileExtensions[fileType] || defaultIcon;
};

// originalFile should be File, but File API isn't implemented in Node.js (when running vis-reg tests)
// so just use the object here for tests
export const defaultFileList = [
  {
    uid: nanoid(10),
    status: 'uploading',
    originalFile: { name: 'test1.jpg', type: 'image/jpeg', size: 11111 },
  },
  {
    uid: nanoid(10),
    status: 'done',
    originalFile: { name: 'test2.pdf', type: 'application/pdf', size: 2222 },
  },
  {
    uid: nanoid(10),
    status: 'error',
    originalFile: { name: 'test3.zip', type: 'application/zip', size: 33333 },
  },
  {
    uid: nanoid(10),
    status: 'uploading',
    originalFile: { name: 'test4.zip', type: 'application/zip', size: 44444 },
    uploadProgressPercentage: 50,
  },
];

export const acceptedFileList = Object.keys(fileExtensions).map((extension, i) => ({
  uid: nanoid(10),
  status: 'done',
  originalFile: { name: `filetype${i}.${extension}`, type: 'application/zip', size: 44444 },
}));

// This is just for tests/docs use
export const defaultProps = {
  buttonText: 'Select file',
  cancelButtonText: 'Cancel',
  defaultErrorMessage: 'Failed to upload file',
  deleteLabel: 'Delete file',
  dropZoneMessage: 'Drag and drop file(s) or select manually',
  errorIconAriaLabel: 'Error',
  fileList: [],
  // Usually the file won't be that large, but it's better to include all units
  fileSizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  label: 'Label',
  retryButtonText: 'Retry',
  uploadingIconAriaLabel: 'Uploading',
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
