<!-- Detail -->

```js
const XUICompositionDetail = require('./XUICompositionDetail').default;

const detailMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionDetail main={detailMainStyle}></XUICompositionDetail>

```
#### Detail with header

```js

const XUICompositionDetailHeader = require('./XUICompositionDetailHeader').default;

const detailMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const detailHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;


<XUICompositionDetailHeader header={detailHeaderStyle} main={detailMainStyle}></XUICompositionDetailHeader>

```
