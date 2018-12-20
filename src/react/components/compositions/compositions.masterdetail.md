<!-- Master detail -->

```js

const XUICompositionMasterDetail = require('./XUICompositionMasterDetail').default;

const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionMasterDetail master={masterContent} detail={detailContent} />

```

#### Master detail with header

```js

const XUICompositionMasterDetailHeader = require('./XUICompositionMasterDetailHeader').default;

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionMasterDetailHeader header={headerContent} detail={detailContent} master={masterContent} />

```
