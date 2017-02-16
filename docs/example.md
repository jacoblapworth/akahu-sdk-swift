## Example

```js
import XUIAvatar from 'xui-avatar';

(function() {
	ReactDOM.render(
		<div>
            <XUIAvatar
                size="small"
                value="Joe the Plumber"
                identifier="12345"
            />

            <XUIAvatar
                size="large"
                imageUrl="logo.png"
            />
		</div>,
		document.getElementById('app')
	);
})();
```
