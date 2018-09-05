## Direct size replacements

### Upgrade tasks

- Upgrade to using `XUITextInput` and `XUIContentBlock` (cases with custom input side elements and other workarounds will be harder to upgrade, and using the contentblock component will ensure you're using the classes correctly)
	- With `XUIContentBlock`, make sure to make use of the handy left/right content props for correctly positioning & padding these blocks of content
- Run the codemod - this will mostly be used for swapping margin/padding classes with close equivalents
- Swap SCSS variables using the map below
- Icons in `XUIButton`
	- Should not use the `isBoxed` prop (including when they're in icon button variants, you can also remove usages of the `xui-icon-inline` class)
	- Buttons with `variant="icon"` or `variant="icon-inverted"` should receive the `size="small"` prop
	- Buttons with `variant="icon-large"` or `variant="icon-inverted-large` should have `size="standard"` (or can be left undefined) and have their variant name switched to `variant="icon"` or `variant="icon-inverted"`
- Textinput side element contents should have their size checked (they should always have a size 1 smaller than the parent input - i.e. 'standard' `XUITextInput` contains 'small' `XUIButton`s)
- Check for uses of `XUIPill` outside of `XUITextInput`, the codemod for this upgrade automatically adds `size="small"`, which should be removed in cases where `XUIPill` isn't in a text input

### SCSS variables

```scss
$xui-s-xsmall -> $xui-s-2xsmall
$xui-s-small -> $xui-s-small
$xui-s-standard -> $xui-s-standard
$xui-s-large -> $xui-s-large
$xui-s-xlarge -> $xui-s-xlarge
$xui-s-2xlarge -> $xui-s-2xlarge
$xui-s-3xlarge -> $xui-s-2xlarge
$xui-s-4xlarge -> $xui-s-3xlarge
$xui-s-5xlarge -> $xui-s-4xlarge
$xui-s-6xlarge -> $xui-s-5xlarge
```
