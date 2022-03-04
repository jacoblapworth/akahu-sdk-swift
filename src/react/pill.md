<div class="xui-margin-vertical">
	<a href="../section-components-identifiers-pill.html" isDocLink>Pills in the XUI documentation</a>
</div>

Pills are used for signifying a selection has been made, either single or multiple. They can include the option to remove the selection with a delete button. To see pills used in context, refer to the [`Autocompleter` section](#autocompleter).

## Examples

### Click actions

Pills can trigger actions passed in through the `onDeleteClick`, `onClick`, and `href` props.

If `onDeleteClick` is added, a delete button will be rendered inside the pill, and a `deleteButtonLabel` will be required for accessibility.

`onClick` and `href` will be triggered if the user clicks anywhere on the pill other than the delete button.

```jsx harmony
import XUIPill from '@xero/xui/react/pill';

const handleDelete = () => {
  console.log('onDeleteClick');
};
const handleClick = () => {
  console.log('onClick');
};

<div>
  <XUIPill
    className="xui-margin-right-xsmall"
    deleteButtonLabel="Delete"
    onDeleteClick={handleDelete}
    value="Jane Smith"
  />
  <XUIPill className="xui-margin-right-xsmall" onClick={handleClick} value="Jane Smith" />
  <XUIPill
    href="/"
    deleteButtonLabel="Delete"
    onDeleteClick={handleDelete}
    target="_blank"
    value="Jane Smith"
  />
</div>;
```

### Pill Avatars

Avatars can be added to `XUIPill` by passing an object to `avatarProps` matching the API for <a href="#avatar">Avatar</a>.

**Note:** Avatars will inherit a size modifier that is one step smaller than the size of pill you choose. E.g Medium pill gets a Small avatar

```jsx harmony
import XUIPill from '@xero/xui/react/pill';

<div>
  <XUIPill
    avatarProps={{
      imageUrl: 'https://picsum.photos/id/1011/100/100',
      value: 'Jane Smith'
    }}
    className="xui-margin-right-xsmall"
    value="Jane Smith"
  />
  <XUIPill avatarProps={{ value: 'Jane Smith' }} value="Jane Smith" />
</div>;
```

### Pill sizes

Pills can be `medium` or `small` size, by passing one of these values to the `size` prop.

```jsx harmony
import XUIPill from '@xero/xui/react/pill';

const handleDelete = () => {
  console.log('onDeleteClick');
};

<div>
  <XUIPill
    avatarProps={{
      value: 'Jane Smith'
    }}
    className="xui-margin-right-xsmall"
    deleteButtonLabel="Delete"
    onDeleteClick={handleDelete}
    value="Jane Smith"
  />
  <XUIPill
    avatarProps={{
      value: 'Jane Smith'
    }}
    deleteButtonLabel="Delete"
    onDeleteClick={handleDelete}
    size="small"
    value="Jane Smith"
  />
</div>;
```

### Invalid pills

Pills can be rendered as invalid by passing the `isInvalid` prop.

```jsx harmony
import XUIPill from '@xero/xui/react/pill';

<XUIPill value="Jane Smith" isInvalid />;
```

### Secondary text

Content passed to `secondaryText` will be rendered using a secondary text modifier.

```jsx harmony
import XUIPill from '@xero/xui/react/pill';

<XUIPill secondaryText="Primary Contact:" value="Jane Smith" />;
```
