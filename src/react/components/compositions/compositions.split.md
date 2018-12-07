<!-- Split -->

```js

const XUICompositionSplit = require('./XUICompositionSplit').default;

const primaryStyle = <div style={{background: '#ADADF3', height: '100px'}}></div>;
const secondaryStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionSplit primary={primaryStyle} secondary={secondaryStyle} />

```
#### Split with header

```js
const XUICompositionSplitHeader = require('./XUICompositionSplitHeader').default;

const primaryStyle = <div style={{background: '#ADADF3', height: '100px'}}></div>;
const secondaryStyle = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const headerStyle = <div style={{background: '#B446C8', height: '60px'}}></div>;

<XUICompositionSplitHeader header={headerStyle} primary={primaryStyle} secondary={secondaryStyle} />

```
