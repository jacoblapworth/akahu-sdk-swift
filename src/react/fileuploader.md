<div class="xui-margin-vertical">
  <a href="../section-components-controls-fileuploader.html" isDocLink>File Uploader in the XUI Documentation</a>
</div>

## Examples

`XUIFileUploader` is responsible for the file input and file list rendering, not the actual uploading process.

`onFilesChange` (`(fileList, event) => {}`) is called when the file input is changed (open or drop files). `fileList` is controlled by implementors and is passed to `XUIFileUploader`. `fileList` should be an array of `FileObject`s:

```js static
{
  uid: String, // Unique identifier used as a file key. This value is generated when the file input changed, and should not be modified
  status: String, // User could change it to: uploading / done / error
  originalFile: File, // Original File object
  errorMessage: String, // Optional, custom error message, will overwrite prop `defaultErrorMessage`
  rightContent: ReactNode, // Optional, custom rightContent for files with `done` status, shows in the left of delete icon
  uploadProgressPercentage: Number // Optional, percentage of upload completed. When present, the progress icon will illustrate completion amount. Must be an integer between 0 and 100 inclusive.
  hideRetryButton: Boolean // Optional, if set to true the retry button will not display. Use only for cases where you would not want the user to attempt the same upload again.
}
```

```jsx harmony
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIFileUploader from '@xero/xui/react/fileuploader';
import { defaultProps, fakeUpload } from './components/fileuploader/private/helpers';

const defaultFileList = [
  {
    uid: nanoid(10),
    status: 'uploading',
    originalFile: new File([new ArrayBuffer(123456)], 'test1.jpg', { type: 'image/jpeg' })
  },
  {
    uid: nanoid(10),
    status: 'done',
    originalFile: new File([new ArrayBuffer(12345678)], 'test2.pdf', { type: 'application/pdf' }),
    rightContent: (
      <XUIButton size="small" variant="borderless-main">
        Action
      </XUIButton>
    )
  },
  {
    uid: nanoid(10),
    status: 'error',
    originalFile: new File([new ArrayBuffer(12345)], 'test3.zip', { type: 'application/zip' })
  },
  {
    uid: nanoid(10),
    status: 'uploading',
    originalFile: new File([new ArrayBuffer(12345)], 'test4.zip', { type: 'application/zip' }),
    uploadProgressPercentage: 0
  }
];

const Example = () => {
  const [fileList, setFileList] = useState(defaultFileList);

  useEffect(() => {
    const incrementUpload = setInterval(() => {
      let newFileList = fileList;
      if (newFileList[3]) {
        newFileList[3].uploadProgressPercentage += 10;
        if (newFileList[3].uploadProgressPercentage === 100) {
          newFileList[3].uploadProgressPercentage = 0;
        }
      }
      setFileList([...newFileList]);
    }, 2000);
    return () => {
      clearInterval(incrementUpload);
    };
  });

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
      errorIconAriaLabel="Error"
      label="Upload file(s)"
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
      uploadingIconAriaLabel="Uploading"
    />
  );
};
<Example />;
```

### Communicating Upload Progress

If your users may be uploading large files, it's a good idea to visually communicate the upload progress to them, so they know it's making progress.
You can achieve this by supplying the `uploadProgressPercentage` value a percentage of upload completed in your `FileObject`.

```jsx harmony static
{
    uid: nanoid(10),
    status: 'uploading',
    originalFile: { name: 'test1.jpg', type: 'image/jpeg', size: 11111 },
    uploadProgressPercentage: 50,
},
```

**Note:** Currently, the native `fetch` method does not support tracking the progress of the upload. You can achieve this via Axios or XHR, examples of each can be found [here](https://xero.atlassian.net/l/c/uWa7NXTc).

## Drag and Drop

Set `hasDragAndDrop` to true to support dragging files to upload, and use `dropZoneMessage` to set the message inside the drop zone.

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileuploader';
import { defaultProps, fakeUpload } from './components/fileuploader/private/helpers';

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
      errorIconAriaLabel="Error"
      label="Upload file(s)"
      hasDragAndDrop
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
      uploadingIconAriaLabel="Uploading"
    />
  );
};
<Example />;
```

## Disabled

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileuploader';
import {
  defaultFileList,
  defaultProps,
  fakeUpload
} from './components/fileuploader/private/helpers';

<div>
  <XUIFileUploader
    {...defaultProps}
    errorIconAriaLabel="Error"
    isDisabled
    isFieldLayout
    label="Upload file(s)"
    uploadingIconAriaLabel="Uploading"
  />
  <XUIFileUploader
    {...defaultProps}
    errorIconAriaLabel="Error"
    hasDragAndDrop
    isDisabled
    label="Upload file(s)"
    uploadingIconAriaLabel="Uploading"
  />
</div>;
```

## Validation

Validation messages and styling should be added to XUIFileUploader using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to XUIFileUploader using the `hintMessage` prop. It's best to set `isFieldLayout` to true to ensure consistent spacing between fields.

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileuploader';
import {
  defaultFileList,
  defaultProps,
  fakeUpload
} from './components/fileuploader/private/helpers';

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
      errorIconAriaLabel="Error"
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
      uploadingIconAriaLabel="Uploading"
    />
  );
};

<div>
  <Example label="With a hint" hasDragAndDrop hintMessage="Hint text" />
  <Example label="Invalid" hasDragAndDrop isInvalid validationMessage="Validation message" />
</div>;
```

## File List Styles

Prop `showFilesAsMultiline` and `showIcon` are used to change the style of fileList.

**Note:** The styles for error status will not be influenced by these two props, and the uploading spinner will not be influenced by the `showIcon` prop.

```jsx harmony
import { nanoid } from 'nanoid';
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileuploader';
import { defaultProps, fakeUpload } from './components/fileuploader/private/helpers';

const defaultFileList = [
  {
    uid: nanoid(10),
    status: 'uploading',
    originalFile: new File([new ArrayBuffer(123456)], 'test1.jpg', { type: 'image/jpeg' })
  },
  {
    uid: nanoid(10),
    status: 'done',
    originalFile: new File([new ArrayBuffer(12345678)], 'test2.pdf', { type: 'application/pdf' })
  },
  {
    uid: nanoid(10),
    status: 'error',
    originalFile: new File([new ArrayBuffer(12345)], 'test3.zip', { type: 'application/zip' })
  }
];

const Example = () => {
  const [fileList, setFileList] = useState(defaultFileList);

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
      errorIconAriaLabel="Error"
      label="Upload file(s)"
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
      showFilesAsMultiline={false}
      showIcon={false}
      uploadingIconAriaLabel="Uploading"
    />
  );
};
<Example />;
```
