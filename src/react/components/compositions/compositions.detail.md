<!-- Detail -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-detail.html" isDocLink>Detail Composition in the XUI Documentation</a>
</div>

```jsx harmony
import { XUICompositionDetail } from '../../compositions';

const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }} />;

<XUICompositionDetail detail={detailContent} />;
```

#### Detail with header

```jsx harmony
import { XUICompositionDetailHeader } from '../../compositions';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }} />;
const detailContent = <div style={{ background: '#C5C5F6', height: '100px' }} />;

<XUICompositionDetailHeader header={headerContent} detail={detailContent} />;
```
