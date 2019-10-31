<!-- Master detail summary -->
<div class="xui-margin-vertical">
	<a href="../section-compositions-masterdetailsummary.html" isDocLink>Master Detail Summary Composition in the XUI Documentation</a>
</div>

The master detail summary composition is useful for a layout that requires a list of content which controls or defines what is viewed in the main area, as well as a summary of the content within said main area. When the browser is narrower than `$xui-breakpoint-medium` the Master container is hidden, and the Summary and Detail containers are stacked, with the Summary container on top. At `$xui-breakpoint-medium-to-large` the Master container is a column to the left of the Detail container, and the Summary container sits above the two. From `xui-breakpoint-large` the Summary container is a column to the right of the Master and Detail containers. The entire composition has a max-width of 1200px. To provide access to the Master content while viewing the small layout, we recommend encapsulating it and also passing it as a prop to one of the other content areas, where it can populate the panel of a DropDown.

```jsx harmony
import { PureComponent } from 'react';
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUICompositionMasterDetailSummary } from '../../compositions';
import { XUIIconButton } from '../../button';
import DropDown, { DropDownToggled } from '../../dropdown';

const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;
const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);

class DetailContent extends PureComponent {
  render() {
    return (
      <div style={{ background: '#C5C5F6', height: '100px' }} className="xui-padding">
        <DropDownToggled
          className="xui-u-hidden-medium-up"
          trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
          dropdown={<DropDown>{this.props.masterContent}</DropDown>}
        />
      </div>
    );
  }
}

<XUICompositionMasterDetailSummary
  master={masterContent}
  detail={<DetailContent masterContent={masterContent} />}
  summary={summaryContent}
/>;
```

#### Master detail summary with header

```jsx harmony
import { PureComponent } from 'react';
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUICompositionMasterDetailSummaryHeader } from '../../compositions';
import { XUIIconButton } from '../../button';
import DropDown, { DropDownToggled } from '../../dropdown';

const headerContent = <div style={{ background: '#B446C8', height: '60px' }}></div>;
const masterContent = <div style={{ background: '#5A5AE6', height: '100px', width: '100%' }}></div>;
const summaryContent = (
  <div style={{ background: '#ADADF3', height: '100px', width: '100%' }}></div>
);

class DetailContent extends PureComponent {
  render() {
    return (
      <div style={{ background: '#C5C5F6', height: '100px' }} className="xui-padding">
        <DropDownToggled
          className="xui-u-hidden-medium-up"
          trigger={<XUIIconButton ariaLabel="Show master" icon={overflowIcon} />}
          dropdown={<DropDown>{this.props.masterContent}</DropDown>}
        />
      </div>
    );
  }
}

<XUICompositionMasterDetailSummaryHeader
  header={headerContent}
  master={masterContent}
  detail={<DetailContent masterContent={masterContent} />}
  summary={summaryContent}
/>;
```
