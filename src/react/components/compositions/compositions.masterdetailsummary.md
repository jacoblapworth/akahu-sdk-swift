<!-- Master detail summary -->

```js

const XUICompositionMasterDetailSummary = require('./XUICompositionMasterDetailSummary').default;

const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummary master={masterContent} detail={detailContent} summary={summaryContent} />

```

#### Master detail summary with header

```js

const XUICompositionMasterDetailSummaryHeader = require('./XUICompositionMasterDetailSummaryHeader').default;

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummaryHeader header={headerContent} detail={detailContent} master={masterContent} summary={summaryContent} />
```
