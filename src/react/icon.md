<div class="xui-margin-vertical">
	<a href="../section-fundamentals-icons.html#icons" isDocLink>Icon in the XUI Documentation</a>
</div>

## How to use the XUI Icon

1. Import required icon paths (the below examples use require; you should use es2015 import).
1. Instance `XUIIcon` with imported icon path (for standardised viewbox sizing) or the icon object (for icon-specific sizing that is only as big as the underlying icon)

We recommend supplying values to the `title` and/or `desc` props to include text descriptions of the icon, unless copy in a sibling element provides ample context or the icon is non-functional. For example, descriptive text would probably not be necessary for a bank icon on a select-box with a label of _Select your bank_, but for an overflow menu icon or a file type icon, descriptive text would provide crucial information to assistive technology.

```
	const XUIIcon = require('./components/icon/XUIIcon').default;
	const star = require ('@xero/xui-icon/icons/star').default;
	const arrow = require ('@xero/xui-icon/icons/arrow').default;
	const fileWord = require ('@xero/xui-icon/icons/file-word').default;
	const fileExcel = require ('@xero/xui-icon/icons/file-excel').default;
	const filePdf = require ('@xero/xui-icon/icons/file-pdf').default;
	<section>
		<h3>Standard Icon</h3>
		<XUIIcon icon={star} />
		<h3>Rotated</h3>
		<XUIIcon icon={arrow} rotation="90" />
		<h3>Coloured</h3>
		<XUIIcon icon={fileWord} color="blue"/>
		<XUIIcon icon={fileExcel} color="file_spreadsheet"/>
		<XUIIcon icon={filePdf} color="file_pdf"/>
	</section>
```
