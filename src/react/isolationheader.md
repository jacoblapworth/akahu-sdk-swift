<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-isolation-header.html" isDocLink>Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.
See the [implementation details section in the XUI docs](../section-compounds-navigation-isolation-header.html#compounds-navigation-isolation-header-4-1)
for behavioural aspects.

## Examples

```jsx harmony
import cross from '@xero/xui-icon/icons/cross';
import overflow from '@xero/xui-icon/icons/overflow';

import XUIIsolationHeader, {
  XUIIsolationHeaderNavigation,
  XUIIsolationHeaderTitle,
  XUIIsolationHeaderSecondaryTitle,
  XUIIsolationHeaderActions
} from './isolationheader';
import { XUIIconButton } from './button';

<XUIIsolationHeader>
  <XUIIsolationHeaderNavigation>
    <XUIIconButton icon={cross} ariaLabel="close" className="xui-margin-right-small" />
    <XUIIsolationHeaderTitle>Main Title</XUIIsolationHeaderTitle>
    <XUIIsolationHeaderSecondaryTitle>Secondary Title</XUIIsolationHeaderSecondaryTitle>
  </XUIIsolationHeaderNavigation>
  <XUIIsolationHeaderActions>
    <XUIIconButton icon={overflow} ariaLabel="more options" />
  </XUIIsolationHeaderActions>
</XUIIsolationHeader>;
```
