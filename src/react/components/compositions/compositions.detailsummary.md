<!-- Detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-detailsummary.html" isDocLink>Detail Summary Composition in the XUI Documentation</a>
</div>

```jsx harmony
import { XUICompositionDetailSummary } from '../../compositions';

const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }} />;
const summaryContent = (
  <div style={{ background: '#ADADF3', minWidth: '250px', height: '100px', width: '100%' }} />
);

<XUICompositionDetailSummary detail={detailContent} summary={summaryContent} />;
```

#### Detail summary with header

```jsx harmony
import { XUICompositionDetailSummaryHeader } from '../../compositions';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }} />;
const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }} />;
const summaryContent = (
  <div style={{ background: '#ADADF3', minWidth: '250px', height: '100px', width: '100%' }} />
);

<XUICompositionDetailSummaryHeader
  header={headerContent}
  detail={detailContent}
  summary={summaryContent}
/>;
```
