<div class="xui-margin-vertical">
	<a href="../section-fundamentals-icons.html#icons" isDocLink>Icon in the XUI Documentation</a>
</div>

## How to use the XUI Icon

1. Import required icon paths.
1. Provide `XUIIcon` with imported icon path (for standardised viewbox sizing) or the icon object (for icon-specific sizing that is only as big as the underlying icon).

We recommend supplying values to the `title` and/or `description` props to include text descriptions of the icon, unless copy in a sibling element provides ample context or the icon is non-functional. For example, descriptive text would probably not be necessary for a bank icon on a select box with a label of _Select your bank_, but for an overflow menu icon or a file type icon, descriptive text would provide crucial information to assistive technology.

```jsx harmony
import arrow from '@xero/xui-icon/icons/arrow';
import fileExcel from '@xero/xui-icon/icons/file-excel';
import filePdf from '@xero/xui-icon/icons/file-pdf';
import invalid from '@xero/xui-icon/icons/invalid';
import star from '@xero/xui-icon/icons/star';

import XUIIcon from '@xero/xui/react/icon';

<div>
  <h3>Standard icon</h3>
  <XUIIcon icon={arrow} />
  <h3>Rotated icons</h3>
  <XUIIcon className="xui-margin-right" icon={arrow} rotation="90" />
  <XUIIcon className="xui-margin-right" icon={arrow} rotation="180" />
  <XUIIcon icon={arrow} rotation="270" />
  <h3>Coloured icons</h3>
  <XUIIcon className="xui-margin-right" color="yellow" icon={star} />
  <XUIIcon className="xui-margin-right" color="file_spreadsheet" icon={fileExcel} />
  <XUIIcon className="xui-margin-right" color="file_pdf" icon={filePdf} />
  <XUIIcon color="red" icon={invalid} />
</div>;
```
