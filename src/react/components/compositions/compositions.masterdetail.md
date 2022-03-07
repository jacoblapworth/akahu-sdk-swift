<!-- Master detail -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-masterdetail.html" isDocLink>Master Detail Composition in the XUI Documentation</a>
</div>

The master detail composition is useful for layouts that consist of a set of options or controls that affect content within the main content container. The Master container holds the options/controls in a left side column, or is hidden when horizontal space is restricted. The Detail area houses the main content. To provide access to the Master content while viewing the small layout, we recommend encapsulating it and also passing it as a prop to one of the other content areas, where it can populate the panel of a Dropdown.

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUIIconButton } from '@xero/xui/react/button';
import { XUICompositionMasterDetail } from '@xero/xui/react/compositions';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;

const detailContent = (
  <div className="xui-padding" style={{ background: '#C5C5F6', height: '100px' }}>
    <XUIDropdownToggled
      className="xui-u-hidden-medium-up"
      dropdown={<XUIDropdown>{masterContent}</XUIDropdown>}
      trigger={<XUIIconButton ariaLabel="Show master content" icon={overflowIcon} />}
    />
  </div>
);

<XUICompositionMasterDetail master={masterContent} detail={detailContent} />;
```

#### Master detail with header

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUIIconButton } from '@xero/xui/react/button';
import { XUICompositionMasterDetailHeader } from '@xero/xui/react/compositions';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;

const detailContent = (
  <div className="xui-padding" style={{ background: '#C5C5F6', height: '100px' }}>
    <XUIDropdownToggled
      className="xui-u-hidden-medium-up"
      dropdown={<XUIDropdown>{masterContent}</XUIDropdown>}
      trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
    />
  </div>
);

<XUICompositionMasterDetailHeader
  detail={detailContent}
  header={headerContent}
  master={masterContent}
/>;
```
