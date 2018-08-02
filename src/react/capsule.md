<div class="xui-margin-vertical">
	<a href="../section-building-blocks-identifiers-capsule.html" isDocLink>Capsule in the XUI documentation</a>
</div>

Capsules are used to draw attention to placeholders that will be replaced with data.

## Examples

### Default capsules

A default capsule is inline text with a border that can receive focus.

```
<div>
	<div className="xui-heading-large">Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
	<div className="xui-heading">Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
	<div className="xui-heading-small">Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
	<div className="xui-heading-xsmall">Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
	<div>Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
	<div className="xui-text-minor">Capsules <XUICapsule>inherit</XUICapsule> font size & colour</div>
</div>
```

### Interactive capsules

Capsules can trigger actions passed in through the `onClick` and `href` props. These props will be triggered if the user clicks anywhere on the capsule.

```
<div>
	This <XUICapsule isLink href='https://www.google.com' target='_blank'>capsule</XUICapsule> is interactive; it's a link to Google that will open in a new tab
</div>
```

### Invalid capsules

Invalid capsules, such as those containing incomplete formulas, are produced by setting the `isValid` property to `false`
```
<div>
	This capsule is <XUICapsule isValid={false}>invalid</XUICapsule>
</div>
```
