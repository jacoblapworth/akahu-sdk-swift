<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-fundamentals-icons.html#icons">Icon in the XUI Documentation</a>
</div>

## How to use the XUI Icon

1. Import required icon paths (the below examples use require; you should use es2015 import).
1. Instance `XUIIcon` with imported icon path.

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

### Migrating to XUI 11 Icons from previous versions of XUIIcon

#### Before
```js
import XUIIcon from 'xui-icon';
...
<XUIIcon icon="accessibility" />
```
#### After (v11)
```js
import XUIIcon from '@xero/xui/react/icon';
import accessibility from '@xero/xui-icon/icons/accessibility';
...
<XUIIcon path={accessibility} />
```

#### Notes

1. `XUICustomIcon` has now become the default icon component for XUI. `XUICustomIcon` has been renamed to `XUIIcon` and the previous `XUIIcon` implementation has been removed.
1. The icon paths themselves are still in a separate repository called `xui-icon`.  To use these icons in your project, you'll need to install `@xero/xui-icon` >=5.0.0.  This is the version that exports individual icon paths.

`XUIIcon` should be provided a `path` prop, the value of which should be imported from `@xero/xui-icon/icons/[icon name]`. The icon name in your import statement is the same as the `icon` prop used in prior versions of `XUIIcon`.

### Reasons for xui-icon not being in the monorepo

First of all, **we still need to keep the `iconBlob` around** for non-React customers and legacy projects.  That requires custom build steps which we don't want to maintain from the XUI repo.

Secondly, and more importantly, **SVG icon paths are truly separate from the implementation of the React icon**.  Having a separate Github repository with an associated deployed artifact in Artifactory allows consumers to request and use new icons without necessarily having to update to the latest version of XUI.  This should allow our icon library to grow and adapt quickly without requiring high maintenance costs for our customers.

### Explanation for the XUIIcon component change

A common issue that consumers had with icons in the past is that **they were required to add every single SVG icon into their built artifact** if they wanted to add a single icon on their page.  This caused the size of their JS artifacts to explode, and it was often the largest part of their deployed JavaScript asset.

We recently **took that feedback on board and created the `XUICustomIcon` component that accepted only the path of the icon** that you wanted to use, decoupling the SVG icon itself from the React component that output the SVG icon.

Unfortunately, `XUICustomIcon` wasn't a good final solution.  XUI components often didn't use `XUICustomIcon` and if just a single instance of the older `XUIIcon` was anywhere in your build dependencies, you got every single SVG path in your final asset.

With XUI v11, we've decided to take the plunge and **remove the old implementation of XUIIcon that depended on the iconBlob.** `XUICustomIcon` has been renamed to `XUIIcon` and we use this internally as well.  We're hoping this leads to substantial file size savings for our consumers.
