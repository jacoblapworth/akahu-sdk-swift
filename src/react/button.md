### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-buttons.html#buttons">Button</a></span>
	</div>
</div>

Default:

```
	<XUIButton>Click me!</XUIButton>
```

With `props.size` as `full-width`:

```
	function onClick() { alert('Clicked!'); }
	<XUIButton
			onClick={onClick}
			variant='create'
			size='full-width'
	>
			Click me
	</XUIButton>
```

With a default `<XUIButtonCaret />`:

```
	<XUIButton>
		Default button <XUIButtonCaret />
	</XUIButton>
```

With a custom icon:

```
	const XUIIcon = require('./components/icon/XUIIcon').default;
	const icon = require('@xero/xui-icon/icons/checkbox-check').default;
	<XUIButton>
		Default button <XUIIcon path={icon} className="xui-icon-inline" />
	</XUIButton>
```
