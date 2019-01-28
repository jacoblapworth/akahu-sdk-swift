<!-- Detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-detailsummary.html" isDocLink>Detail Summary Composition in the XUI Documentation</a>
</div>

```js

const XUICompositionDetailSummary = require('./XUICompositionDetailSummary').default;

const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionDetailSummary detail={detailContent} summary={summaryContent} />

```
#### Detail summary with header

```js
const XUICompositionDetailSummaryHeader = require('./XUICompositionDetailSummaryHeader').default;

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionDetailSummaryHeader header={headerContent}  detail={detailContent} summary={summaryContent} />
```
