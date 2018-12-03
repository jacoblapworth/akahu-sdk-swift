<!-- Master detail -->

```js

const XUICompositionMasterDetail = require('./XUICompositionMasterDetail').default;

const masterDetailMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterDetailNavStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetail nav={masterDetailNavStyle} main={masterDetailMainStyle}></XUICompositionMasterDetail>

```

#### Master detail with header

```js

const XUICompositionMasterDetailHeader = require('./XUICompositionMasterDetailHeader').default;

const masterDetailMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterDetailNavStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const masterDetailHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailHeader header={masterDetailHeaderStyle} main={masterDetailMainStyle} nav={masterDetailNavStyle}></XUICompositionMasterDetailHeader>

```
