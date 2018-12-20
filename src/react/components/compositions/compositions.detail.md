<!-- Detail -->

```js
const XUICompositionDetail = require('./XUICompositionDetail').default;

const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionDetail detail={detailContent} />

```
#### Detail with header

```js

const XUICompositionDetailHeader = require('./XUICompositionDetailHeader').default;

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;


<XUICompositionDetailHeader header={headerContent} detail={detailContent} />

```
