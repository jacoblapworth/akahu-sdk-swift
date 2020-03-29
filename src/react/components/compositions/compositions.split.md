<!-- Split -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-split.html" isDocLink>Split Composition in the XUI Documentation</a>
</div>

```jsx harmony
import { XUICompositionSplit } from '@xero/xui/react/compositions';

const primaryContent = <div style={{ background: '#ADADF3', height: '100px' }}></div>;
const secondaryContent = <div style={{ background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionSplit primary={primaryContent} secondary={secondaryContent} />;
```

#### Split with header

```jsx harmony
import { XUICompositionSplitHeader } from '@xero/xui/react/compositions';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const primaryContent = <div style={{ background: '#ADADF3', height: '100px' }}></div>;
const secondaryContent = <div style={{ background: '#C5C5F6', height: '100px' }}></div>;

<XUICompositionSplitHeader
  header={headerContent}
  primary={primaryContent}
  secondary={secondaryContent}
/>;
```
