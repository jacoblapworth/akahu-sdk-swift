<div class="xui-margin-vertical">
  <a href="../section-components-controls-fileuploader.html" isDocLink>File Uploader in the XUI Documentation</a>
</div>

## Examples

`XUIFileUploader` is responsible for the file input and file list rendering, not the actual uploading process.

`onFilesChange` (`(fileList, event) => {}`) is called when the file input is changed (open or drop files). `fileList` is controlled by implementors and is passed to `XUIFileUploader`. The structure of `fileList`:

```markup
{
  uid: String, // Unique identifier used as a file key. This value is generated when the file input changed, and should not be modified
  status: String, // User could change it to: uploading / done / error
  originalFile: File, // Original File object
  errorMessage: String, // Optional, custom error message, will overwrite prop `defaultErrorMessage`
  rightContent: ReactNode, // Optional, custom rightContent for files with `done` status, shows in the left of delete icon
}
```

```jsx harmony
import uuid from 'uuid/v4';
import { useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIFileUploader from '@xero/xui/react/fileUploader';
import { defaultProps, fakeUpload } from './components/fileUploader/private/helpers';

const defaultFileList = [
  {
    uid: uuid(),
    status: 'uploading',
    originalFile: new File([new ArrayBuffer(123456)], 'test1.jpg', { type: 'image/jpeg' })
  },
  {
    uid: uuid(),
    status: 'done',
    originalFile: new File([new ArrayBuffer(12345678)], 'test2.pdf', { type: 'application/pdf' }),
    rightContent: (
      <XUIButton size="small" variant="borderless-primary">
        Action
      </XUIButton>
    )
  },
  {
    uid: uuid(),
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
      isLabelHidden
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
    />
  );
};
<Example />;
```

## Drag and Drop

Set `hasDragAndDrop` to true to support dragging files to upload, and use `dropZoneMessage` to set the message inside the drop zone.

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileUploader';
import { defaultProps, fakeUpload } from './components/fileUploader/private/helpers';

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
      isLabelHidden
      hasDragAndDrop
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
    />
  );
};
<Example />;
```

## Disabled

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileUploader';
import {
  defaultFileList,
  defaultProps,
  fakeUpload
} from './components/fileUploader/private/helpers';

<div>
  <XUIFileUploader {...defaultProps} isDisabled isFieldLayout isLabelHidden />
  <XUIFileUploader {...defaultProps} hasDragAndDrop isDisabled isLabelHidden />
</div>;
```

## Validation

Validation messages and styling should be added to XUIFileUploader using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to XUIFileUploader using the `hintMessage` prop. It's best to set `isFieldLayout` to true to ensure consistent spacing between fields.

```jsx harmony
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileUploader';
import {
  defaultFileList,
  defaultProps,
  fakeUpload
} from './components/fileUploader/private/helpers';

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

<div>
  <Example label="With a hint" hasDragAndDrop hintMessage="Hint text" />
  <Example label="Invalid" hasDragAndDrop isInvalid validationMessage="Validation message" />
</div>;
```

## File List Styles

Prop `showFilesAsMultiline` and `showIcon` are used to change the style of fileList.

**Note:** The styles for error status will not be influenced by these two props, and the uploading spinner will not be influenced by the `showIcon` prop.

```jsx harmony
import uuid from 'uuid/v4';
import { useState } from 'react';
import XUIFileUploader from '@xero/xui/react/fileUploader';
import { defaultProps, fakeUpload } from './components/fileUploader/private/helpers';

const defaultFileList = [
  {
    uid: uuid(),
    status: 'uploading',
    originalFile: new File([new ArrayBuffer(123456)], 'test1.jpg', { type: 'image/jpeg' })
  },
  {
    uid: uuid(),
    status: 'done',
    originalFile: new File([new ArrayBuffer(12345678)], 'test2.pdf', { type: 'application/pdf' })
  },
  {
    uid: uuid(),
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
      isLabelHidden
      fileList={fileList}
      onDelete={onDelete}
      onFilesChange={onFilesChange}
      onRetry={onRetry}
      showFilesAsMultiline={false}
      showIcon={false}
    />
  );
};
<Example />;
```
