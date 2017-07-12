<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-avatars.html#avatars-1">Avatar in the XUI documentation</a></span>
	</div>
</div>

## Circular and Rectangular avatars

Circular avatars are used to represent people. This is the default avatar variant.

```
<XUIAvatar value="Xero" />
```

Rectangular avatars are used to represent businesses (a company, a practice, etc). Use the `variant` "business" to get a rectangular avatar. Rectangular avatars display up to three letters.

```
<XUIAvatar value="Xero User Interfaces" variant="business" />
```

### Images

You can use an image instead of a block of colour by providing an `imageUrl`.

Although the CSS will attempt to scale the image to fit, as best practice we recommend using pre-scaled/resized images.

```
<XUIAvatar
	value="Xero"
	imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg" />
```

If the image supplied to the avatar fails to load, the default avatar will be displayed as a fallback. If you need to handle other behaviour, you can also provide an `onError` handler.

```
const { Component } = require ('react');

class XUIAvatarWithErrorHandler extends Component {
	constructor() {
		super();
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
				{this.state.message}
			</div>
		);
	}
}
<XUIAvatarWithErrorHandler  />

```


### Colours

The colour of an Avatar is determined by the contents of either the `value` or `identifier` props. It is recommended that you provide an `identifier` key so that a unique attribute of the entity determines the colour – different entities with the same value (e.g. name) should have different colours.

```
<div>
	<XUIAvatar value="Xero" identifier="a" />
	<XUIAvatar value="Xero" identifier="b" />
	<XUIAvatar value="Xero" identifier="c" />
	<XUIAvatar value="Xero" identifier="d" />
	<XUIAvatar value="Xero" identifier="e" />
	<XUIAvatar value="Xero" identifier="f" />
</div>
```

### Sizes

The `size` prop is an enum. The default value is "medium".

```
// Try changing 'size' in this example to 'large' or 'small'.
<XUIAvatar value="xero" size="xlarge" />
```

## Grouped Avatars

Avatars can be collected into groups.

```
<XUIAvatarGroup>
	<XUIAvatar value="Bettong" />
	<XUIAvatar value="Bandicoot" />
	<XUIAvatar value="Quokka" />
	<XUIAvatar value="Wombat" />
	<XUIAvatar value="Pademelon" />
	<XUIAvatar value="Quoll" />
</XUIAvatarGroup>
```

Providing a `maxAvatars` prop will only show a maximum of that many avatar spaces. If there are more than the maximum, the final space will show an indication of how many further avatars are collected in the group.

Providing an `avatarSize` prop will override the sizing of any Avatar in the group.

```
<XUIAvatarGroup maxAvatars="4" avatarSize="large">
	<XUIAvatar value="Bandicoot" />
	<XUIAvatar size="small" value="Quokka" />
	<XUIAvatar size="xlarge" value="Wombat" />
	<XUIAvatar size="small" value="Bettong" />
	<XUIAvatar size="medium" value="Pademelon" />
	<XUIAvatar value="Quoll" />
</XUIAvatarGroup>
```
