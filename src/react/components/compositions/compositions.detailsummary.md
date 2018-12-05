<!-- Detail summary -->

```js

const XUICompositionDetailSummary = require('./XUICompositionDetailSummary').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const summaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionDetailSummary detail={detailStyle} summary={summaryStyle}></XUICompositionDetailSummary>

```
#### Detail summary with header

```js
const XUICompositionDetailSummaryHeader = require('./XUICompositionDetailSummaryHeader').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const summaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const headerStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionDetailSummaryHeader header={headerStyle}  detail={detailStyle} summary={summaryStyle}></XUICompositionDetailSummaryHeader>
```
