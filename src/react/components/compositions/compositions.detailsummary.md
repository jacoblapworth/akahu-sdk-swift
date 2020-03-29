<!-- Detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-detailsummary.html" isDocLink>Detail Summary Composition in the XUI Documentation</a>
</div>

```jsx harmony
import { XUICompositionDetailSummary } from '@xero/xui/react/compositions';

const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }}></div>;
const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);

<XUICompositionDetailSummary detail={detailContent} summary={summaryContent} />;
```

#### Detail summary with header

```jsx harmony
import { XUICompositionDetailSummaryHeader } from '@xero/xui/react/compositions';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }}></div>;
const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);

<XUICompositionDetailSummaryHeader
  header={headerContent}
  detail={detailContent}
  summary={summaryContent}
/>;
```
