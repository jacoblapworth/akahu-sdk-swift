<div class="xui-margin-vertical">
	<a href="../section-fundamentals-layout.html#fundamentals-layout-2-1" isDocLink>Rows in the XUI Documentation</a>
</div>

`XUIRow` components are used to wrap `XUIColumn` components. The row variant determines how columns are spaced.

```jsx harmony
import { XUIRow, XUIColumn } from '@xero/xui/react/structural';

const rowStyle = { backgroundColor: '#028DDE' };
const colStyle = { backgroundColor: 'RGBA(255,255,255,0.5)' };

<div>
  <XUIRow style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
  </XUIRow>
  <XUIRow variant={'flex'} style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
  </XUIRow>
  <XUIRow variant={'grid'} style={rowStyle} className="xui-padding-small">
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
    </XUIColumn>
    <XUIColumn gridColumns="third" className="xui-padding-small" style={colStyle}>
      4 out of 12 columns wide.
      <br />
      More text.
    </XUIColumn>
  </XUIRow>
</div>;
```
