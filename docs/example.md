## Example
These examples show the two main ways of using this component, with a minimum & maximum number of rows, and with a set number of rows.

```jsx
import XUIInput from 'xui-textarea';

<XUITextArea
	minRows={2}
	maxRows={5}
	maxCharacters={2000}>
	<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
</XUITextArea>
<XUITextArea
	rows={3}
	defaultValue="Potatoes">
	<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
</XUITextArea>
<XUITextArea
	rows={3}
	isDisabled={true}
	defaultValue="This textarea has no label and is disabled">
</XUITextArea>
```
