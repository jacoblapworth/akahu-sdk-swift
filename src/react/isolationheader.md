<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-isolation-header.html" isDocLink>Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.
See the [implementation details section in the XUI docs](../section-compounds-navigation-isolation-header.html#compounds-navigation-isolation-header-4-1)
for behavioural aspects.

## Examples

```jsx harmony
import cross from '@xero/xui-icon/icons/cross';

import XUIIsolationHeader from './isolationheader';
import XUIButton, { XUIIconButton } from './button';

const navigationButton = <XUIIconButton icon={cross} ariaLabel="close" />;
const title = 'Main Title';
const secondary = 'Secondary Title';
const actions = (
  <XUIButton ariaLabel="Primary action" variant="primary" size="small">
    Primary
  </XUIButton>
);

<XUIIsolationHeader
  actions={actions}
  navigationButton={navigationButton}
  secondary={secondary}
  title={title}
/>;
```
