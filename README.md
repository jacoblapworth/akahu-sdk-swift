# xui-textarea

A React text area which provides basic XUI styling, autosizing (within a min/max number of rows), and a counter which shows characters remaining (if maximum number of characters is set).

## Installation
`bower install --save git@github.dev.xero.com:ReactLabs/xui-avatar.git`

## Auto-resize
This component provides an auto-resizing capability. This behaviour is enabled whenever `minRows` and/or `maxRows` is set to a value other than 0. To disable this behaviour, either exclude these props or set them to 0. 

If `minRows` or `maxRows` is not set, the css property for `min-height` or `max-height` will be used in their place. Otherwise `min-height` and `max-height` will be overriden.

## Example
These examples show the two main ways of using this component, with a minimum & maximum number of rows, and with a set number of rows.

```jsx
import XUIInput from 'xui-text-area';

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
![examples](/examples/examples.png)


### Properties
`XUITextArea` will map any default input attributes that are passed as props. I.e required which isn't listed but can still be used. Any labels you want to provide the textarea should be provided as a child element.


`isDisabled`: (Boolean, Default = false) Whether the input should be disabled 

`rows`: (Number, Default = 3) The number of lines the input should display without scrolling (should not be used in conjunction with `minRows` and/or `maxRows`)

`minRows`: (Number, Optional) The minimum number of rows for the text area should make space for

`maxRows`: (Number, Optional) The maximum number of rows for the text area to expand to

`onChange`: (Function, Optional) Function to execute when the input's value has been changed

`manualResize`: (Boolean, Default = false) Whether the user should be able to manually resize the field

`readOnly`: (Boolean, Default = false) Whether the text input should be read-only

`defaultValue`: (String, Optional) The initial value of the input

`maxCharacters`: (Number, Optional) The maximum number of characters for the text area, if given a value, a character counter and validation will be added

`error`: (Boolean, Default = false) Whether the text area should have error state invalid styling

`defaultLayout`: (Boolean, Default = true) Whether default field layout should be applied to the container

`fieldClassName`: (String, Optional) Additional class(es) to add to the wrapping div

`id`: (String, Optional) ID to be set for the textarea

`className`: (String, Optional)
`qaHook`: (String, Default="xui-textarea")
`children`: (Node, Optional)
