xui-avatar
===========

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_UxeXuiAvatar)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_UxeXuiAvatar)
![](https://img.shields.io/badge/XUI-%5E9.7.0%20%7C%7C%20%5E10.0.0-blue.svg)
![](https://img.shields.io/badge/React-~0.14.2-blue.svg)

A React implementation of the [XUI Avatar component](https://github.dev.xero.com/pages/UXE/xui/section-avatars.html).

Renders an avatar either as an image (with the image URL provided) or as the first character of the value representing the entity in a coloured circle.

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

## Properties

Although all the properties are marked as optional, one of either `value` or `imageUrl` must be provided. The component will throw if neither are provided, or if either is falsy (e.g. empty string).

`value`: (String, Optional) The text that represents the entity for which the avatar is being shown. If no `imageUrl` is supplied, the first character from the value will be used.

`imageUrl`: (String, Optional) The image URL to use in the avatar. If a `value` is supplied in addition to the `imageUrl`, it will be ignored (as will `identifier`)

`size`: (One of: ['small', 'medium', 'large'], Optional, default: 'medium') The size of the avatar.

`identifier`: (String, Optional) A unique string that will be used to generate the colour of the avatar. Note that if `identifier` is not supplied, `value` will be used in its place. Doing this is not recommended since if different entities with the same value exist, they will end up looking identical. 

`className`: (String, Optional) Any custom CSS class(es) you want to add to this component
