<div class="xui-margin-vertical">
	<a href="../section-building-blocks-identifiers-pill.html" isDocLink>Pills in the XUI documentation</a>
</div>

Pills are used for signifying a selection has been made, either single or multiple. They can include the option to remove the selection with a delete button. To see pills used in context, refer to the [`Autocompleter` section](#autocompleter).

## Examples

### Click actions

Pills can trigger actions passed in through the `onDeleteClick`, `onClick`, and `href` props. If `onDeleteClick` is added, a delete button will be rendered inside the pill. `onClick`, and `href` will be triggered if the user clicks anywhere on the pill other than the delete button.

```
<div>
	<XUIPill
		value="Deleteable selection"
		onDeleteClick={() => window.alert('deleted')}
		className="xui-margin-right-xsmall"
	/>
	<XUIPill
		value="Undeletable"
		onClick={() => window.alert('clicked')}
		className="xui-margin-right-xsmall"
	/>
	<XUIPill
		href="https://xero.com"
		value="Link Pill"
		onDeleteClick={() => window.alert('deleted link')}
	/>
</div>
```

### Pill Avatars

Avatars can be added to `XUIPill` by passing an object to `avatarProps` matching the API for <a href="#avatar">Avatar</a>.

**Note:** the small sized avatar variant should be used.

```
<div>
	<XUIPill
		value="Avatar pill"
		className="xui-margin-right-xsmall"
		avatarProps={{
			value: 'SJ',
			imageUrl: 'logo.png',
			size: 'small'
		}}
	/>
	<XUIPill
		value="Avatar pill"
		avatarProps={{
			value: 'SJ',
			size: 'small'
		}}
	/>
</div>
```

### Invalid pills

Pills can be rendered as invalid by passing the `isInvalid` prop.

```
<XUIPill
	value="Invalid"
	isInvalid
/>
```

### Secondary text

Content passed to `secondaryText` will be rendered using a secondary text modifier.

```
<XUIPill
	secondaryText = {'Status'}
	value="SecondaryText Pill"
/>
```
