<div class="xui-margin-vertical">
		<a href="../section-components-identifiers-avatar.html" isDocLink>Avatar in the XUI Documentation</a>
</div>

Avatars come in two variants: Circular, used to represent people, and Rectangular, used to represent businesses. Both variants support the use of images.

XUI provides ten approved colours for Avatars. `XUIAvatar` handles selecting a colour for you based on its contents and calculating the abbreviated text value from the full value you pass it.

`XUIAvatar`s can be grouped together using `XUIAvatarGroup`.

### How to use avatars

Avatars alone are not meant to communicate the full identity of a person or business, but to provide an additional visual representation that is easy to recognise.

- Use avatars alongside an entity's entire name
- Use a group of avatars to show a brief thumbnail view of a group of entities
- Don't use avatars without a full entity-name, if the name is critical to the value of the information being shown

## Examples

### Avatar variants

Circular avatars are used to represent people. This is the default avatar variant.

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';

<XUIAvatar value="Roisin Pearson" />;
```

Rectangular avatars are used to represent businesses (a company, a practice, etc). Use the `variant` "business" to get a rectangular avatar. Rectangular avatars display up to three letters.

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';

<XUIAvatar value="Capital Cab Co" variant="business" />;
```

### Images

You can use an image instead of a block of colour by providing an `imageUrl`.

Although the CSS will attempt to scale the image to fit, as best practice we recommend using pre-scaled/resized images.

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';

<XUIAvatar value="Jane Smith" imageUrl="https://picsum.photos/id/1011/100/100" />;
```

If the image supplied to `XUIAvatar` fails to load, the default avatar will be displayed as a fallback using the required `value` prop. If you need to handle other behaviour, you can also provide an `onError` handler.

```jsx harmony
import { useState } from 'react';
import XUIAvatar from '@xero/xui/react/avatar';

const XUIAvatarExample = () => {
  const [message, setMessage] = useState('');

  const onError = () => {
    setMessage('The image for this contact failed to load');
  };

  return (
    <div>
      <XUIAvatar
        imageUrl="/this/is/a/broken/path/to/an/image.jpg"
        onError={onError}
        value="Jane Smith"
      />
      <span className="xui-margin-left-small">{message}</span>
    </div>
  );
};

<XUIAvatarExample />;
```

### Colours

The colour of `XUIAvatar` is determined by the contents of either the `value` or `identifier` props. It is recommended that you provide an `identifier` key so that a unique attribute of the entity determines the colour – different entities with the same value (e.g. name) should have different colours.

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';

<div>
  <XUIAvatar className="xui-margin-right-small" identifier="js1" value="Jane Smith" />
  <XUIAvatar className="xui-margin-right-small" identifier="js2" value="Jane Smith" />
  <XUIAvatar className="xui-margin-right-small" identifier="js3" value="Jane Smith" />
  <XUIAvatar className="xui-margin-right-small" identifier="js4" value="Jane Smith" />
  <XUIAvatar className="xui-margin-right-small" identifier="js5" value="Jane Smith" />
  <XUIAvatar identifier="js6" value="Jane Smith" />
</div>;
```

### Sizes

The `size` prop is an enum, it takes sizes from `2xsmall` to `xlarge`.

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';

<div>
  <div className="xui-padding-bottom-small">
    <XUIAvatar className="xui-margin-right-small" size="2xsmall" value="Jane Smith" />
    <XUIAvatar className="xui-margin-right-small" size="xsmall" value="Jane Smith" />
    <XUIAvatar className="xui-margin-right-small" size="small" value="Jane Smith" />
    <XUIAvatar className="xui-margin-right-small" value="Jane Smith" />
    <XUIAvatar className="xui-margin-right-small" size="large" value="Jane Smith" />
    <XUIAvatar size="xlarge" value="Jane Smith" />
  </div>
  <div>
    <XUIAvatar
      className="xui-margin-right-small"
      size="2xsmall"
      value="Capital Cab Co"
      variant="business"
    />
    <XUIAvatar
      className="xui-margin-right-small"
      size="xsmall"
      value="Capital Cab Co"
      variant="business"
    />
    <XUIAvatar
      className="xui-margin-right-small"
      size="small"
      value="Capital Cab Co"
      variant="business"
    />
    <XUIAvatar className="xui-margin-right-small" value="Capital Cab Co" variant="business" />
    <XUIAvatar
      className="xui-margin-right-small"
      size="large"
      value="Capital Cab Co"
      variant="business"
    />
    <XUIAvatar size="xlarge" value="Capital Cab Co" variant="business" />
  </div>
</div>;
```
