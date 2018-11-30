#### Detail composition

```js
const XUICompositionDetail = require('./components/compositions/XUICompositionDetail').default;

const detailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;

<XUICompositionDetail main={detailMainStyle}></XUICompositionDetail>

```
#### Detail composition with header

```js

const XUICompositionDetailHeader = require('./components/compositions/XUICompositionDetailHeader').default;

const detailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const detailHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;


<XUICompositionDetailHeader header={detailHeaderStyle} main={detailMainStyle}></XUICompositionDetailHeader>

```

#### Detail split

```js

const XUICompositionDetailSplit = require('./components/compositions/XUICompositionDetailSplit').default;

const detailSplitMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const detailSplitMediaStyle = <div style={{background: '#ff6496', height: '100px'}}></div>;

<XUICompositionDetailSplit main={detailSplitMainStyle} media={detailSplitMediaStyle}></XUICompositionDetailSplit>

```
#### Detail split with header

```js
const XUIDetailSplitHeader = require('./components/compositions/XUICompositionDetailSplitHeader').default;

const detailSplitMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const detailSplitHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;
const detailSplitMediaStyle = <div style={{background: '#ff6496', height: '100px'}}></div>;

<XUIDetailSplitHeader header={detailSplitHeaderStyle} main={detailSplitMainStyle} media={detailSplitMediaStyle}></XUIDetailSplitHeader>

```

#### Master detail

```js

const XUICompositionMasterDetail = require('./components/compositions/XUICompositionMasterDetail').default;

const masterDetailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const masterDetailNavStyle = <div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetail nav={masterDetailNavStyle} main={masterDetailMainStyle}></XUICompositionMasterDetail>

```

#### Master detail with header

```js

const XUICompositionMasterDetailHeader = require('./components/compositions/XUICompositionMasterDetailHeader').default;

const masterDetailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const masterDetailNavStyle = <div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailHeader header={masterDetailHeaderStyle} main={masterDetailMainStyle} nav={masterDetailNavStyle}></XUICompositionMasterDetailHeader>

```

#### Master detail summary

```js

const XUICompositionMasterDetailSummary = require('./components/compositions/XUICompositionMasterDetailSummary').default;

const masterDetailSummaryMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const masterDetailSummaryNavStyle = <div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummarySummaryStyle = <div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummary nav={masterDetailSummaryNavStyle} main={masterDetailSummaryMainStyle} summary={masterDetailSummarySummaryStyle}></XUICompositionMasterDetailSummary>

```

#### Master detail summary with header

```js

const XUICompositionMasterDetailSummaryHeader = require('./components/compositions/XUICompositionMasterDetailSummaryHeader').default;

const masterDetailSummaryMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const masterDetailSummaryNavStyle = <div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummarySummaryStyle = <div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailSummaryHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailSummaryHeader header={masterDetailSummaryHeaderStyle} main={masterDetailSummaryMainStyle} nav={masterDetailSummaryNavStyle} summary={masterDetailSummarySummaryStyle}></XUICompositionMasterDetailSummaryHeader>
```

#### Summary detail

```js

const XUICompositionSummaryDetail = require('./components/compositions/XUICompositionSummaryDetail').default;

const summaryDetailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const summaryDetailSummarySummaryStyle = <div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionSummaryDetail main={summaryDetailMainStyle} summary={summaryDetailSummarySummaryStyle}></XUICompositionSummaryDetail>

```
#### Summary detail with header

```js
const XUICompositionSummaryDetailHeader = require('./components/compositions/XUICompositionSummaryDetailHeader').default;

const summaryDetailMainStyle = <div style={{background: '#0078C8', height: '100px' }}></div>;
const summaryDetailSummarySummaryStyle = <div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryDetailSummaryHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionSummaryDetailHeader header={summaryDetailSummaryHeaderStyle} main={summaryDetailMainStyle} summary={summaryDetailSummarySummaryStyle}></XUICompositionSummaryDetailHeader>
```
