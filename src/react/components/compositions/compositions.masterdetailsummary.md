<!-- Master detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-masterdetailsummary.html" isDocLink>Master Detail Summary Composition in the XUI Documentation</a>
</div>

The master detail summary composition is useful for a layout that requires a list of content which controls or defines what is viewed in the main area, as well as a summary of the content within said main area. When the browser is narrower than `$xui-breakpoint-medium` the Master container is hidden, and the Summary and Detail containers are stacked, with the Summary container on top. At `$xui-breakpoint-medium-to-large` the Master container is a column to the left of the Detail container, and the Summary container sits above the two. From `xui-breakpoint-large` the Summary container is a column to the right of the Master and Detail containers. The entire composition has a max-width of 1200px. To provide access to the Master content while viewing the small layout, we recommend encapsulating it and also passing it as a prop to one of the other content areas, where it can populate the panel of a Dropdown.

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUIIconButton } from '@xero/xui/react/button';
import { XUICompositionMasterDetailSummary } from '@xero/xui/react/compositions';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;

const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);

const detailContent = (
  <div className="xui-padding" style={{ background: '#C5C5F6', height: '100px' }}>
    <XUIDropdownToggled
      className="xui-u-hidden-medium-up"
      dropdown={<XUIDropdown>{masterContent}</XUIDropdown>}
      trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
    />
  </div>
);

<XUICompositionMasterDetailSummary
  detail={detailContent}
  master={masterContent}
  summary={summaryContent}
/>;
```

#### Master detail summary with header

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUIIconButton } from '@xero/xui/react/button';
import { XUICompositionMasterDetailSummaryHeader } from '@xero/xui/react/compositions';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;
const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);
const detailContent = (
  <div className="xui-padding" style={{ background: '#C5C5F6', height: '100px' }}>
    <XUIDropdownToggled
      className="xui-u-hidden-medium-up"
      dropdown={<XUIDropdown>{masterContent}</XUIDropdown>}
      trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
    />
  </div>
);

<XUICompositionMasterDetailSummaryHeader
  detail={detailContent}
  header={headerContent}
  master={masterContent}
  summary={summaryContent}
/>;
```
