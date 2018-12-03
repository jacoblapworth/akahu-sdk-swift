<!-- Split -->

```js

const XUICompositionSplit = require('./XUICompositionSplit').default;

const splitMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const splitMediaStyle = <div style={{background: '#ADADF3', height: '100px'}}></div>;

<XUICompositionSplit main={splitMainStyle} media={splitMediaStyle}></XUICompositionSplit>

```
#### Split with header

```js
const XUICompositionSplitHeader = require('./XUICompositionSplitHeader').default;

const splitMainStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const splitHeaderStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;
const splitMediaStyle = <div style={{background: '#ADADF3', height: '100px'}}></div>;

<XUICompositionSplitHeader header={splitHeaderStyle} main={splitMainStyle} media={splitMediaStyle}></XUICompositionSplitHeader>

```
