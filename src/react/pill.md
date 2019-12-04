<div class="xui-margin-vertical">
	<a href="../section-components-identifiers-pill.html" isDocLink>Pills in the XUI documentation</a>
</div>

Pills are used for signifying a selection has been made, either single or multiple. They can include the option to remove the selection with a delete button. To see pills used in context, refer to the [`Autocompleter` section](#autocompleter).

## Examples

### Click actions

Pills can trigger actions passed in through the `onDeleteClick`, `onClick`, and `href` props. If `onDeleteClick` is added, a delete button will be rendered inside the pill. `onClick`, and `href` will be triggered if the user clicks anywhere on the pill other than the delete button.

```jsx harmony
import XUIPill from './pill';

const wasDeleted = () => {
  window.alert('deleted');
};
const wasClicked = () => {
  window.alert('clicked');
};
const linkWasDeleted = () => {
  window.alert('deleted link');
};

<div>
  <XUIPill
    value="Deletable selection"
    onDeleteClick={wasDeleted}
    className="xui-margin-right-xsmall"
  />
  <XUIPill value="Undeletable" onClick={wasClicked} className="xui-margin-right-xsmall" />
  <XUIPill href="https://xero.com" value="Link Pill" onDeleteClick={linkWasDeleted} />
</div>;
```

### Pill Avatars

Avatars can be added to `XUIPill` by passing an object to `avatarProps` matching the API for <a href="#avatar">Avatar</a>.

**Note:** Avatars will inherit a size modifier that is one step smaller than the size of pill you choose. E.g Medium pill gets a Small avatar

```jsx harmony
import XUIPill from './pill';

<div>
  <XUIPill
    value="Avatar pill"
    className="xui-margin-right-xsmall"
    avatarProps={{
      value: 'SJ',
      imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/uxe-internal/mario_icon.png'
    }}
  />
  <XUIPill value="Avatar pill" avatarProps={{ value: 'SJ' }} />
</div>;
```

### Pill sizes

Pills can be `medium`, `small`, or `xsmall` size, by passing one of these values to the `size` prop.

**Note:** _The `xsmall` variant now is `sunsetting` because it doesn't meet [XUI touch target standards](../section-getting-started-responsive-guidelines.html#getting-started-responsive-guidelines-4), so it's not recommend to use._

```jsx harmony
import XUIPill from './pill';

const NOOP = () => {};
<div>
  <XUIPill
    value="Medium"
    avatarProps={{
      value: 'M'
    }}
    onDeleteClick={NOOP}
  />
  <XUIPill
    value="Small"
    size="small"
    avatarProps={{
      value: 'Small'
    }}
    onDeleteClick={NOOP}
  />
  <XUIPill
    value="Extra small"
    size="xsmall"
    avatarProps={{
      value: 'Xtra Small'
    }}
    onDeleteClick={NOOP}
  />
</div>;
```

### Invalid pills

Pills can be rendered as invalid by passing the `isInvalid` prop.

```jsx harmony
import XUIPill from './pill';

<XUIPill value="Invalid" isInvalid />;
```

### Secondary text

Content passed to `secondaryText` will be rendered using a secondary text modifier.

```jsx harmony
import XUIPill from './pill';

<XUIPill secondaryText="Secondary" value="Primary" />;
```
