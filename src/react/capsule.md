<div class="xui-margin-vertical">
	<a href="../section-components-identifiers-capsule.html" isDocLink>Capsule in the XUI documentation</a>
</div>

Capsules are used to draw attention to placeholders that will be replaced with data.

## Examples

### Default capsules

A default capsule is inline text with a border that can receive focus. Capsules inherit font size and colour.

```jsx harmony
import XUICapsule from '@xero/xui/react/capsule';

<div>
  <div className="xui-heading-large">
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
  <div className="xui-heading">
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
  <div className="xui-heading-small">
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
  <div className="xui-heading-xsmall">
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
  <div>
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
  <div className="xui-text-minor">
    Compilation Report to the Directors Of <XUICapsule>Legal or Trading Name</XUICapsule>
  </div>
</div>;
```

### Interactive capsules

Capsules can trigger actions passed in through the `onClick` and `href` props. These props will be triggered if the user clicks anywhere on the capsule.

```jsx harmony
import XUICapsule from '@xero/xui/react/capsule';

<div>
  Compilation Report to the Directors Of
  <XUICapsule href="/" isLink target="_blank">
    Legal or Trading Name
  </XUICapsule>
</div>;
```

### Invalid capsules

Invalid capsules, such as those containing incomplete formulas, are produced by setting the `isValid` property to `false`

```jsx harmony
import XUICapsule from '@xero/xui/react/capsule';

<div>
  Compilation Report to the Directors Of
  <XUICapsule isValid={false}>Legal or Trading Name</XUICapsule>
</div>;
```
