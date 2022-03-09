<div class="xui-margin-vertical">
	<a href="../section-components-navigation-isolation-header.html" isDocLink>Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.
See the [implementation details section in the XUI docs](../section-components-navigation-isolation-header.html#components-navigation-isolation-header-4-1)
for behavioural aspects.

[Container Queries](#container-queries) could be used to detect the container size and adjust the layout of IsolationHeader responsively.

## Examples

```jsx harmony
import cross from '@xero/xui-icon/icons/cross';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIIsolationHeader from '@xero/xui/react/isolationheader';

const navigationButton = <XUIIconButton icon={cross} ariaLabel="close" />;
const title = 'New tasks & expenses invoice';
const secondary = 'Draft';
const actions = [
  <XUIButton key="saveDraft" size="small">
    Save draft
  </XUIButton>,
  <XUIButton key="saveAndOpen" size="small" variant="main">
    Save and open draft invoice
  </XUIButton>
];

<XUIIsolationHeader
  actions={actions}
  navigationButton={navigationButton}
  secondary={secondary}
  title={title}
/>;
```
