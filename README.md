xui-button
==========
[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiButton)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiButton)
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.3.0-blue.svg)

A React UI component that creates buttons from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.18.0/section-buttons.html). This includes single buttons and grouped buttons.

## Installation

```bash
$ bower install --save git://github.dev.xero.com/UXE/xui-button.git
```                                                                 

### Migrating from v2 Buttons

1. The `isSplit` prop (and all associated secondary button props) of the button component has been removed.  There's a new `XUISecondaryButton` component for that. Check out the Split Button Example below to see how to accomplish the same thing now.
2. If you want to output a link (aka `<a>` tag), you should no longer use the `type` prop.  Set the `isLink` prop to true instead.
3. The `buttonType` prop has been renamed to `type` (more intuitive) and the default has changed from `submit` to `button`.  Most people were manually setting `button` or just didn't have the button inside of a form, so it was changed.

### Example
```js
import XUIButton, {XUIButtonGroup, XUIButtonCaret} from 'xui-button';

<XUIButton
	isDisabled={true}
	onClick={this.handleClick}
	variant='create'
	size='full-width'
>
	Click me
</XUIButton>

<XUIButton>I am a dropdown <XUIButtonCaret /></XUIButton>

<XUIButtonGroup>
	<XUIButton>Grouped one</XUIButton>
	<XUIButton>Grouped two</XUIButton>
</XUIButtonGroup>

```

### Example

![](example/buttons.png)

### Split Button Example
```js
import XUIButton, {XUISplitButtonGroup, XUISecondaryButton} from 'xui-button';

...

<XUISplitButtonGroup variant="primary">
	<XUIButton onClick={clickHandler}>Primary Action</XUIButton>
	<XUISecondaryButton onClick={openMenu} />
</XUISplitButtonGroup>

```

### XUIButton Properties

`className`: (String, Optional)

`qaHook`: (String, Optional)

`children`: (Node, Optional)

`isDisabled`: (Boolean, Optional) Determines if the button is disabled or not. Set to false by default

`isExternalLink` (Boolean, Optional) If true, sets appropriate `rel` values to prevent new page from having access to `window.opener`. Should be used for links pointing at external sites.

`isLoading`: (Boolean, Optional) Whether the button should show a loader inside. If true, this disables the button to prevent clicking.

`isGrouped`: (Boolean, Optional) Automatically set to true when it's a child of XUIButtonGroup. Set to false by default otherwise

`isLink`: (Boolean, Optional) Whether or not to render this button using an <a> tag

`onKeyDown`: (Function, Optional) A keydown event handler for the generated element.

`onClick`: (Function, Required) A function to fire when the button is clicked

`variant`: (String, Optional) Determines what the purpose of this button is. `primary`, `create` or `negative`. If nothing is provided then it is a default button

`size`: (String, Optional) Modifier for the size of the button. `small`, or `full-width`. Else ignored

`type`: (String, Optional) The type attribute of this button. `submit`, `button`, or `reset`. Defaults to `submit`

`href`: (String, Optional) If `isLink` is true, then this will be the hyperlink reference. Else ignored.

`rel`: (String, Optional) The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`)

`target`: (String, Optional) The `target` attribute for the button if `isLink` is `true`. Else ignored

`title`: (String, Optional) The `title` attribute for this button

`tabIndex`: (Boolean, Optional) The HTML `tabIndex` attribute which will go on the node.  Default `0`

### XUIButtonCaret Properties
No properties

### XUIButtonGroup Properties
`children`: (Node, Optional)

`className`: (Node, Optional)

### XUISecondaryButton Properties
All the same props as a button, except it doesn't accept children.

### XUISplitButtonGroup Properties
`children`: (Node, Optional)

`className`: (Node, Optional)

`qaHook`: (String, Optional)

`isDisabled`: (Boolean, Optional) Whether or not ALL children in this group are disabled. This has a default of `false` and will override any `isDisabled` prop on child buttons.

`variant`: (String, Optional) Determines what the purpose of all the child buttons will be. `primary`, `create` or `negative`. This has a default of `standard` and will override any `variant` props on child buttons. 
