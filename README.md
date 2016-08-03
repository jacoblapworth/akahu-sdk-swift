xui-avatar
===========

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_UxeXuiAvatar)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_UxeXuiAvatar)
![](https://img.shields.io/badge/XUI-%5E10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^0.14.2 || ^15.0.0-blue.svg)

A React implementation of the [XUI Avatar component](https://github.dev.xero.com/pages/UXE/xui/section-avatars.html).

Renders an avatar either as an image (with the image URL provided) or as the first character of the value representing the entity in a coloured circle.

It can also render avatars in a group.

## Installation

```
bower install --save git@github.dev.xero.com:ReactLabs/xui-avatar.git
```

## Example

```js
import XUIAvatar from 'xui-avatar';

(function() {
	ReactDOM.render(
		<div>
            <XUIAvatar
                size="small"
                value="Donald Trump"
                identifier="m4k34m4r1c4gr84g41n"
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

### Avatar with identifier

![](example/avatar_identifier.PNG)

### Avatar with imageUrl

![](example/avatar_imageUrl.PNG)

## Components

### XUIAvatar

A higher order component wrapping `XUISimpleAvatar` (see below) which falls back to a text avatar if the image provided cannot load.

This component transparently passes its props to `XUISimpleAvatar`, with the exception that the `value` prop is required (in order to have a fallback)

### XUISimpleAvatar

A simple, stateless avatar

Although all the properties are marked as optional, one of either `value` or `imageUrl` must be provided. The component will throw if neither are provided, or if either is falsy (e.g. empty string).

`className`: (String, Optional)

`qaHook`: (String, Optional)

`value`: (String, Optional) The text that represents the entity for which the avatar is being shown. If no `imageUrl` is supplied, the first character from the value will be used.

`imageUrl`: (String, Optional) The image URL to use in the avatar. If a `value` is supplied in addition to the `imageUrl`, it will be ignored (as will `identifier`)

`size`: (One of: ['small', 'medium', 'large', 'xlarge'], Optional, default: 'medium') The size of the avatar.

`identifier`: (String, Optional) A unique string that will be used to generate the colour of the avatar. Note that if `identifier` is not supplied, `value` will be used in its place. Doing this is not recommended since if different entities with the same value exist, they will end up looking identical.

`className`: (String, Optional) Any custom CSS class(es) you want to add to this component

`onError`: (Function, Optional) Error handler if the image does not load. If no `imageUrl` prop is provided but `onError` is, then the `onError` function will be ignored.

### XUIAvatarGroup

A container for many avatars.

`className`: (String, Optional)

`qaHook`: (String, Optional)

`children`: (Node, Optional)

`maxAvatars`: (Number, Optional) The maximum number of avatars to show

`avatarSize`: (One of: ['small', 'medium', 'large', 'xlarge'], Optional) The size to apply to all avatars contained within the group. This will override any individual avatar's size settings.

### XUIAvatarCounter

An avatar-like component intended to display the count of additional avatars in a confined space.

`className`: (String, Optional)

`qaHook`: (String, Optional)

`size`: (One of: ['small', 'medium', 'large', 'xlarge'], Optional, default: 'medium') The size of the avatar.

`count`: (String or Number, Required) The value to display inside the counter avatar. If this is a positive number (not a string), the number will be shown prefixed with a '+'. If this is a string, the string value will be used directly.
