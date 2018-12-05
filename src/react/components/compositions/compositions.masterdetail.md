<!-- Master detail -->

```js

const XUICompositionMasterDetail = require('./XUICompositionMasterDetail').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetail master={masterStyle} detail={detailStyle}></XUICompositionMasterDetail>

```

#### Master detail with header

```js

const XUICompositionMasterDetailHeader = require('./XUICompositionMasterDetailHeader').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterStyle = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const headerStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionMasterDetailHeader header={headerStyle} detail={detailStyle} master={masterStyle}></XUICompositionMasterDetailHeader>

```
