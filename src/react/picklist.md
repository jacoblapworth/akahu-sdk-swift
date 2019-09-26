<div class="xui-margin-vertical">
	<a href="../section-compounds-displayingdata-picklist.html" isDocLink>Picklist in the XUI Documentation</a>
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

```jsx harmony
import Picklist, { Pickitem } from './picklist';

<Picklist secondaryProps={{ role: 'menu' }} isHorizontal>
  <Pickitem ariaRole="menuitem" id="plain1" isSelected shouldTruncate>
    Projects
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plain2" shouldTruncate>
    Timesheets
  </Pickitem>
  <Pickitem ariaRole="menuitem" id="plain3" shouldTruncate>
    Other things
  </Pickitem>
</Picklist>;
```
