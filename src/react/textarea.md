<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-forms.html#forms-4">Textarea in the XUI Documentation</a></span>
	</div>
</div>

TextArea is an enhanced version of the HTML `<textarea />` element. It supports auto grow, fixed row height and validation styling.

## Examples

### Min/Max Rows

Adding the `minRows` and/or `maxRows` props will enable the `TextArea` to automatically resize as users type into them.

```
<XUITextArea
	minRows={2}
	maxRows={5}
	defaultLayout={false}>
	<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
</XUITextArea>
```
### Fixed Height

Alternatively, a fixed height can be set using the `rows` prop.

```
<XUITextArea
	rows={3}
	defaultLayout={false}
	defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Vivamus eget pretium mauris, eu tempus velit. Etiam dolor nunc, tincidunt eget ex in, gravida varius est. Nullam vitae pretium leo. Curabitur eros odio, bibendum at diam quis, facilisis tincidunt quam. Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed posuere pulvinar nisl, eget fringilla arcu iaculis in. Etiam mauris ante, euismod ac ligula faucibus, varius auctor eros odio, est.  Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Curabitur eros odio,tincidunt non ipsum quis ieros odio, imperdiet. Proin et tortor bibendum, commodo eros ut, lobortis lorem.">
	<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
</XUITextArea>
```
### Character Limit

A character limit counter can be added to the `TextArea` by passing a number to the `maxCharacters` prop. The input text will not be truncated if the character limit is exceeded. Instead, the character counter will go into negative values, and the `TextArea` will be rendered as invalid.

```
<XUITextArea
	maxCharacters={140}
	defaultLayout={false}
	placeholder="Kinda like twitter">
	<label className="xui-text-label xui-fieldlabel-layout">Character counter</label>
</XUITextArea>
```
### Validation

Validation errors can be shown to the user by passing in the `isInvalid` and `validationMessage`.

```
<XUITextArea
	rows={2}
	defaultValue="I know words, I have the best words. I have the best, but there is no better word than stupid."
	isInvalid
	validationMessage="Those words aren't great"
	defaultLayout={false}
/>
```
### Disabled

A `TextArea` can be rendered as disabled by passing in the `isDisabled` prop.

```
<XUITextArea
	rows={3}
	isDisabled
	defaultValue="This textarea has no label and is disabled"
	defaultLayout={false}
/>
```
