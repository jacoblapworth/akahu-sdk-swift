<!-- Master detail summary -->

```js

const XUICompositionMasterDetailSummary = require('./XUICompositionMasterDetailSummary').default;

const masterDetailSummaryMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterDetailSummaryNavStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummarySummaryStyle = <div style={{background: '#B446C8', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummary nav={masterDetailSummaryNavStyle} main={masterDetailSummaryMainStyle} summary={masterDetailSummarySummaryStyle}></XUICompositionMasterDetailSummary>

```

#### Master detail summary with header

```js

const XUICompositionMasterDetailSummaryHeader = require('./XUICompositionMasterDetailSummaryHeader').default;

const masterDetailSummaryMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterDetailSummaryNavStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummarySummaryStyle = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummaryHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailSummaryHeader header={masterDetailSummaryHeaderStyle} main={masterDetailSummaryMainStyle} nav={masterDetailSummaryNavStyle} summary={masterDetailSummarySummaryStyle}></XUICompositionMasterDetailSummaryHeader>
```

