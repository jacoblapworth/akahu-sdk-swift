<!-- Master detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-masterdetailsummary.html" isDocLink>Master Detail Summary Composition in the XUI Documentation</a>
</div>

```jsx harmony
import { XUICompositionMasterDetailSummary } from '../../compositions';

const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummary master={masterContent} detail={detailContent} summary={summaryContent} />

```

#### Master detail summary with header

```jsx harmony
import { XUICompositionMasterDetailSummaryHeader } from '../../compositions';

const headerContent = <div style={{background: '#B446C8', height: '60px'}}></div>;
const detailContent = <div style={{background: '#C5C5F6', height: '100px' }}></div>;
const masterContent = <div style={{background: '#5A5AE6', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;
const summaryContent = <div style={{background: '#ADADF3', 'minWidth': '250px', height: '100px', width: '100%'}}></div>;

<XUICompositionMasterDetailSummaryHeader header={headerContent} detail={detailContent} master={masterContent} summary={summaryContent} />
```

