<div class="xui-margin-vertical">
		<a href="../section-building-blocks-identifiers-avatar.html" isDocLink>Avatar in the XUI Documentation</a>
</div>

Avatars come in two variants: Circular, used to represent people, and Rectangular, used to represent businesses. Both variants support the use of images.

XUI provides ten approved colours for Avatars. `XUIAvatar` handles selecting a colour for you based on its contents and calculating the abbreviated text value from the full value you pass it.

`XUIAvatar`s can be grouped together using `XUIAvatarGroup`.

### How to use avatars

Avatars alone are not meant to communicate the full identity of a person or business, but to provide an additional visual representation that is easy to recognise.

* Use avatars alongside an entity's entire name
* Use a group of avatars to show a brief thumbnail view of a group of entities
* Don't use avatars without a full entity-name, if the name is critical to the value of the information being shown

## Examples

### Avatar variants

Circular avatars are used to represent people. This is the default avatar variant.

```jsx harmony
import XUIAvatar from './avatar';

<XUIAvatar value="Xero" qaHook="xero-avatar"/>
```

Rectangular avatars are used to represent businesses (a company, a practice, etc). Use the `variant` "business" to get a rectangular avatar. Rectangular avatars display up to three letters.

```jsx harmony
import XUIAvatar from './avatar';

<XUIAvatar value="Xero User Interfaces" variant="business" />
```

### Images

You can use an image instead of a block of colour by providing an `imageUrl`.

Although the CSS will attempt to scale the image to fit, as best practice we recommend using pre-scaled/resized images.

```jsx harmony
import XUIAvatar from './avatar';

<XUIAvatar
	value="Xero"
	imageUrl="https://xui.xero.com/static/xpert-avatar.png" />
```

If the image supplied to `XUIAvatar` fails to load, the default avatar will be displayed as a fallback. If you need to handle other behaviour, you can also provide an `onError` handler.

```jsx harmony
import { Component } from 'react';
import XUIAvatar from './avatar';

class XUIAvatarWithErrorHandler extends Component {
	constructor(...args) {
		super(...args);
		this.state = {
			message: '',
		};
		this.onError = this.onError.bind(this);
	}

	onError() {
		this.setState({
			message: 'The image in this avatar failed to load.',
		});
	}

	render() {
		return (
			<div>
				<XUIAvatar
					value="Failure"
					imageUrl="/this/is/a/broken/path/to/an/image.jpg"
					onError={this.onError} />
				<span className="xui-margin-left-small">{this.state.message}</span>
			</div>
		);
	}
}
<XUIAvatarWithErrorHandler  />

```

### Colours

The colour of `XUIAvatar` is determined by the contents of either the `value` or `identifier` props. It is recommended that you provide an `identifier` key so that a unique attribute of the entity determines the colour – different entities with the same value (e.g. name) should have different colours.

```jsx harmony
import XUIAvatar from './avatar';

<div>
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="a" />
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="b" />
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="c" />
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="d" />
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="e" />
	<XUIAvatar className="xui-margin-right-small" value="Xero" identifier="f" />
</div>
```

### Sizes

The `size` prop is an enum, it takes sizes from `2xsmall` to `xlarge`.

```jsx harmony
import XUIAvatar from './avatar';

<div>
	<div className="xui-padding-bottom-small">
		<XUIAvatar size="2xsmall" value="2 X Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar size="xsmall" value="X Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar size="small" value="Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar value="Medium" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar size="large" value="Large" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar size="xlarge" value="X Large" qaHook="xero-avatar" className="xui-margin-right-small"/>
	</div>
	<div>
		<XUIAvatar variant="business" size="2xsmall" value="2 X Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar variant="business" size="xsmall" value="X Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar variant="business" size="small" value="Small" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar variant="business" value="Medium" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar variant="business" size="large" value="Large" qaHook="xero-avatar" className="xui-margin-right-small"/>
		<XUIAvatar variant="business" size="xlarge" value="X Large" qaHook="xero-avatar" className="xui-margin-right-small"/>
	</div>
</div>
```
