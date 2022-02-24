<div class="xui-margin-vertical">
	<a href="../section-fundamentals-layout.html#fundamentals-layout-3-1" isDocLink>Rows in the XUI Documentation</a>
</div>

`XUIRow` components are used to wrap `XUIColumn` components. The row variant determines how columns are spaced.

```jsx harmony
import { XUIColumn, XUIRow } from '@xero/xui/react/structural';

const colStyle = { backgroundColor: 'RGBA(255,255,255,0.5)', padding: '12px' };
const rowStyle = { backgroundColor: '#028DDE', padding: '12px' };

<div>
  <h3>Flex variant</h3>
  <XUIRow style={rowStyle} variant="flex">
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>

  <h3>Grid variant</h3>
  <XUIRow style={rowStyle} variant="grid">
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>

  <h3>Float variant</h3>
  <XUIRow style={rowStyle} variant="float">
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns="third" style={colStyle}>
      4 / 12 columns
    </XUIColumn>
  </XUIRow>
</div>;
```
