interface Props {
  /**
   * File extensions accepted by the file input
   */
  acceptedFileExtensions?: string;
  /**
   * Whether to support selecting multiple files
   */
  acceptsMultipleFiles?: boolean;
  /**
   * Button text
   * <br />
   * Recommended English value: *Select file*
   */
  buttonText: string;
  /**
   * Cancel button text
   * <br />
   * Recommended English value: *Cancel*
   */
  cancelButtonText: string;
  /**
   * Class names to be added to the div wrapping the select button/drop zone and file list
   */
  className?: string;
  /**
   * Default error message
   * <br />
   * Recommended English value: *Failed to upload file*
   */
  defaultErrorMessage: string;
  /**
   * Label for “delete” icon for accessibility
   * <br />
   * Recommended English value: *Delete File*
   */
  deleteLabel: string;
  /**
   * The message that shows in the drop zone
   * <br />
   * Recommended English value: *Drag and drop file(s) or select manually*
   */
  dropZoneMessage: string;
  /**
   * Class names to be added to the div wrapping the select button/drop zone
   */
  fieldClassName?: string;
  /**
   * Array of the following format Object:
   * <br />
   * {
   *   uid: String, // Unique identifier used as a file key. This value is generated when the file input changed, and should not be modified
   *   status: String, // User could change it to: uploading / done / error
   *   originalFile: File, // Original File object
   *   errorMessage: String, // Optional, custom error message, will overwrite prop `defaultErrorMessage`
   *   rightContent: ReactNode, // Optional, custom rightContent for files with `done` status, shows in the left of delete icon
   * }
   */
  fileList: FileObject[];
  /**
   * Class names to be added to the div wrapping filelist
   */
  fileListClassName?: string;
  /**
   * The file size units array. Required if the `showFilesAsMultiline` prop is set to `true`
   * <br />
   * Recommended English value: *['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']*
   */
  fileSizeUnits?: [string, string, string, string, string, string, string, string, string];
  /**
   * Whether to support the drag and drop to upload
   */
  hasDragAndDrop?: boolean;
  /**
   * Hint message to show under the input
   */
  hintMessage?: string;
  /**
   * Whether the fileUploader is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to use the field layout classes
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid
   */
  isInvalid?: boolean;
  /**
   * Prevents the label element from being displayed on the page. Label is still accessible to screen readers
   */
  isLabelHidden?: boolean;
  /**
   * Label to show above the input
   */
  label?: string;
  /**
   * Class names to add to the label
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the aria-labelledby property
   */
  labelId?: string;
  /**
   * Called when the cancel button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onCancel?: FileHandler;
  /**
   * Called when the delete button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onDelete: FileHandler;
  /**
   * Called when a file is opened or dropped
   * <br />
   * `(fileList, event) => {}`
   */
  onFilesChange: (fileList: FileObject[], event: InteractionEvent) => void;
  /**
   * Called when retry button is clicked
   * <br />
   * `(file, fileList, event) => {}`
   */
  onRetry: FileHandler;
  qaHook?: string;
  /**
   * Retry button text
   * <br />
   * Recommended English value: *Retry*
   */
  retryButtonText: string;
  /**
   * Show multi line in the file list item
   */
  showFilesAsMultiline?: boolean;
  /**
   * Show icon in the file list item
   */
  showIcon?: boolean;
  /**
   * Message to display while the file is uploading. Required if the `showFilesAsMultiline` prop is set to `true`
   * <br />
   * Recommended English value: *Uploading...*
   */
  uploadingMessage?: string;
  /**
   * Validation message to show under the input if `isInvalid` is true
   */
  validationMessage?: string;
}

export type FileObject = {
  errorMessage?: string;
  hideRetryButton?: boolean;
  originalFile: File;
  rightContent?: React.ReactNode;
  status: string;
  uid: string;
  uploadProgressPercentage?: number;
};

export type FileHandler = (
  file: FileObject,
  fileList: FileObject[],
  event: InteractionEvent,
) => void;

type InteractionEvent = React.MouseEvent | React.KeyboardEvent;

declare const XUIFileUploader: React.FunctionComponent<Props>;
export { XUIFileUploader as default, XUIFileUploader };
