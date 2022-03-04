<div class="xui-margin-vertical">
	<a href="../section-components-identifiers-tag.html" isDocLink>Tags in the XUI documentation</a>
</div>

Tags are used to categorise content or indicate sentiment.

```jsx harmony
import XUITag from '@xero/xui/react/tag';

<div>
  <XUITag className="xui-margin-right-xsmall" variant="positive">
    Paid
  </XUITag>
  <XUITag className="xui-margin-right-xsmall" variant="warning">
    Due
  </XUITag>
  <XUITag className="xui-margin-right-xsmall" variant="negative">
    Overdue
  </XUITag>
  <XUITag className="xui-margin-right-xsmall" variant="neutral">
    Draft
  </XUITag>
  <XUITag>New</XUITag>
</div>;
```
