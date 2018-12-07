<!-- Detail -->

```js
const XUICompositionDetail = require('./XUICompositionDetail').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionDetail detail={detailStyle} />

```
#### Detail with header

```js

const XUICompositionDetailHeader = require('./XUICompositionDetailHeader').default;

const detailStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const headerStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;


<XUICompositionDetailHeader header={headerStyle} detail={detailStyle} />

```
