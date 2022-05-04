<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-picklist.html" isDocLink>Picklist in the XUI Documentation</a>
</div>

## What is a picklist?

A set of components that brings in the XUI styles to render a list of items. `XUIPicklist` and `XUIPickitem`s are presentational components, and `XUIStatefulPicklist` is a wrapper available to handle keyboard navigation.

## Examples

### Standard picklist

```jsx harmony
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

<div className="xui-panel" style={{ width: '300px' }}>
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem ariaRole="menuitem" id="personal-details" isSelected>
      Personal details
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="employment-information">
      Employment information
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="payment-information">
      Payment information
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="payslips">
      Payslips
    </XUIPickitem>
  </XUIPicklist>
</div>;
```

### Horizontal variant

In horizontal variant, you can use the prop `swapAtBreakpoint` to define the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

<div className="xui-panel" style={wrapperStyles}>
  <XUIPicklist isHorizontal secondaryProps={{ role: 'menu' }} swapAtBreakpoint="small">
    <XUIPickitem ariaRole="menuitem" id="all" isSelected shouldTruncate>
      All
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="fy-2020" shouldTruncate>
      FY 2020
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="fy-2019" shouldTruncate>
      FY 2019
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="fy-2018" shouldTruncate>
      FY 2018
    </XUIPickitem>
  </XUIPicklist>
</div>;
```
