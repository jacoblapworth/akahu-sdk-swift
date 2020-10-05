<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-picklist.html" isDocLink>Picklist in the XUI Documentation</a>
</div>

## What is a picklist?

A set of components that brings in the XUI styles to render a list of items. `XUIPicklist` and `XUIPickitem`s are presentational components, and `XUIStatefulPicklist` is a wrapper available to handle keyboard navigation.

## Examples

### Standard picklist

```jsx harmony
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

<XUIPicklist secondaryProps={{ role: 'menu' }}>
  <XUIPickitem ariaRole="menuitem" id="plainpi1" isSelected>
    An empty item
  </XUIPickitem>
  <XUIPickitem ariaRole="menuitem" id="plainpi2">
    Next Item
  </XUIPickitem>
  <XUIPickitem ariaRole="menuitem" id="plainpi3">
    Another Item
  </XUIPickitem>
  <XUIPickitem ariaRole="menuitem" id="plainpi4" href="http://xero.com">
    This is a link to xero.com
  </XUIPickitem>
  <XUIPickitem ariaRole="menuitem" id="plainpi5">
    Last Item
  </XUIPickitem>
</XUIPicklist>;
```

### Horizontal variant

In horizontal variant, you can use the prop `swapAtBreakpoint` to define the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

<div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
  <XUIPicklist secondaryProps={{ role: 'menu' }} isHorizontal swapAtBreakpoint="small">
    <XUIPickitem ariaRole="menuitem" id="plain1" isSelected shouldTruncate>
      Projects
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="plain2" shouldTruncate>
      Timesheets
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="plain3" shouldTruncate>
      Other things
    </XUIPickitem>
  </XUIPicklist>
</div>;
```
