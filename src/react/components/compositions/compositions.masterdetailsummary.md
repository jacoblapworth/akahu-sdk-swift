<!-- Master detail summary -->

```js

const XUICompositionMasterDetailSummary = require('./XUICompositionMasterDetailSummary').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummary master={masterStyle} detail={detailStyle} summary={summaryStyle}></XUICompositionMasterDetailSummary>

```

#### Master detail summary with header

```js

const XUICompositionMasterDetailSummaryHeader = require('./XUICompositionMasterDetailSummaryHeader').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const headerStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailSummaryHeader header={headerStyle} detail={detailStyle} master={masterStyle} summary={summaryStyle}></XUICompositionMasterDetailSummaryHeader>
```

