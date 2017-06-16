`import XUIButton from '@xero/xui/react/button';`

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
