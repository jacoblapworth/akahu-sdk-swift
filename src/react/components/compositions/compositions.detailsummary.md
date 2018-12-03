<!-- Detail summary -->

```js

const XUICompositionDetailSummary = require('./XUICompositionDetailSummary').default;

const detailSummaryMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const detailSummarySummaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionDetailSummary main={detailSummaryMainStyle} summary={detailSummarySummaryStyle}></XUICompositionDetailSummary>

```
#### Detail summary with header

```js
const XUICompositionDetailSummaryHeader = require('./XUICompositionDetailSummaryHeader').default;

const detailSummaryMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const detailSummarySummaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const detailSummaryHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionDetailSummaryHeader header={detailSummaryHeaderStyle} main={detailSummaryMainStyle} summary={detailSummarySummaryStyle}></XUICompositionDetailSummaryHeader>
```
