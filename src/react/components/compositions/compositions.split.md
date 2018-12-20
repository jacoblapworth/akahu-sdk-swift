<!-- Split -->

```js

const XUICompositionSplit = require('./XUICompositionSplit').default;

const primaryContent = <div style={{background: '#ADADF3', height: '100px'}}></div>;
const secondaryContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionSplit primary={primaryContent} secondary={secondaryContent} />

```
#### Split with header

```js
const XUICompositionSplitHeader = require('./XUICompositionSplitHeader').default;

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const primaryContent = <div style={{background: '#ADADF3', height: '100px'}}></div>;
const secondaryContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionSplitHeader header={headerContent} primary={primaryContent} secondary={secondaryContent} />

```
