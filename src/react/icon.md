### Usage

1. Import required icon paths (the below examples use require, you should use es2015 import).
2. Instance `<XUIIcon /> with imported icon path.

```
	const star = require ('@xero/xui-icon/icons/star').default;
	const arrow = require ('@xero/xui-icon/icons/arrow').default;
	const fileWord = require ('@xero/xui-icon/icons/file-word').default;
	const fileExcel = require ('@xero/xui-icon/icons/file-excel').default;
	const filePdf = require ('@xero/xui-icon/icons/file-pdf').default;
	<section>
		<h3>Standard Icon</h3>
		<XUIIcon path={star} />
		<h3>Rotated</h3>
		<XUIIcon path={arrow} rotation="90" />
		<h3>Coloured</h3>
		<XUIIcon path={fileWord} color="blue"/>
		<XUIIcon path={fileExcel} color="file_spreadsheet"/>
		<XUIIcon path={filePdf} color="file_pdf"/>
	</section>
```
