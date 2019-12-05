<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-picklist.html" isDocLink>Picklist in the XUI Documentation</a>
</div>

## What is a Picklist?

A set of components that brings in the XUI styles to render a list of items. `Picklist` and `Pickitems` are presentational components, and `StatefulPicklist` is a wrapper available to handle keyboard navigation.

## Examples

### Standard Picklist

```jsx harmony
import Picklist, { Pickitem } from './picklist';

<Picklist secondaryProps={{ role: 'menu' }}>
  <Pickitem ariaRole="menuitem" id="plainpi1" isSelected>
    An empty item
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plainpi2">
    Next Item
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plainpi3">
    Another Item
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plainpi4" href="http://xero.com">
    This is a link to xero.com
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plainpi5">
    Last Item
  </Pickitem>
</Picklist>;
```

### Horizontal variant

In horizontal variant, you can use prop `swapAtBreakpoint` to define the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import Picklist, { Pickitem } from './picklist';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

<div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
  <Picklist secondaryProps={{ role: 'menu' }} isHorizontal swapAtBreakpoint="small">
    <Pickitem ariaRole="menuitem" id="plain1" isSelected shouldTruncate>
      Projects
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="plain2" shouldTruncate>
      Timesheets
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="plain3" shouldTruncate>
      Other things
    </Pickitem>
  </Picklist>
</div>;
```
