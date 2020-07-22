<div class="xui-margin-vertical">
	<a href="../section-fundamentals-layout.html#fundamentals-layout-3-1" isDocLink>Rows in the XUI Documentation</a>
</div>

`XUIRow` components are used to wrap `XUIColumn` components. The row variant determines how columns are spaced.

```jsx harmony
import { XUIRow, XUIColumn } from '@xero/xui/react/structural';

const rowStyle = { backgroundColor: '#028DDE' };
const colStyle = { backgroundColor: 'RGBA(255,255,255,0.5)' };

<div>
  <XUIRow style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>
  <XUIRow variant={'flex'} style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>
  <XUIRow variant={'grid'} style={rowStyle} className="xui-padding-small">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>
</div>;
```
