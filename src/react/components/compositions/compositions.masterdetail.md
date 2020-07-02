<!-- Master detail -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-masterdetail.html" isDocLink>Master Detail Composition in the XUI Documentation</a>
</div>

The master detail composition is useful for layouts that consist of a set of options or controls that affect content within the main content container. The Master container holds the options/controls in a left side column, or is hidden when horizontal space is restricted. The Detail area houses the main content. To provide access to the Master content while viewing the small layout, we recommend encapsulating it and also passing it as a prop to one of the other content areas, where it can populate the panel of a Dropdown.

```jsx harmony
import { PureComponent } from 'react';
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUICompositionMasterDetail } from '@xero/xui/react/compositions';
import { XUIIconButton } from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

class DetailContent extends PureComponent {
  render() {
    return (
      <div style={{ background: '#C5C5F6', height: '100px' }} className="xui-padding">
        <XUIDropdownToggled
          className="xui-u-hidden-medium-up"
          trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
          dropdown={<XUIDropdown>{this.props.masterContent}</XUIDropdown>}
        />
      </div>
    );
  }
}

const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;

<XUICompositionMasterDetail
  master={masterContent}
  detail={<DetailContent masterContent={masterContent} />}
/>;
```

#### Master detail with header

```jsx harmony
import { PureComponent } from 'react';
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUICompositionMasterDetailHeader } from '@xero/xui/react/compositions';
import { XUIIconButton } from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;

class DetailContent extends PureComponent {
  render() {
    return (
      <div style={{ background: '#C5C5F6', height: '100px' }} className="xui-padding">
        <XUIDropdownToggled
          className="xui-u-hidden-medium-up"
          trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
          dropdown={<XUIDropdown>{this.props.masterContent}</XUIDropdown>}
        />
      </div>
    );
  }
}

<XUICompositionMasterDetailHeader
  header={headerContent}
  master={masterContent}
  detail={<DetailContent masterContent={masterContent} />}
/>;
```
