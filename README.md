xui-avatar
===========

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_UxeXuiAvatar)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_UxeXuiAvatar)
![](https://img.shields.io/badge/XUI-^10.15.0-blue.svg)
![](https://img.shields.io/badge/React-^15.3.0-blue.svg)

A React implementation of the [XUI Avatar component](https://github.dev.xero.com/pages/UXE/xui/#10.18.0/section-avatars.html).

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

## xui-avatar prop types

### XUIAvatar
`onError`: (func, Optional) Function to be used if the avatar renders an image and the image load fails

`value`: (string, Required)  The text to display in the avatar. In the simple avatar component, it is optional, but here it is mandatory


### XUIAvatarCounter
`qaHook`: (string, Optional) 

`className`: (string, Optional) 

`count`: (union, Optional) The count to display. If this is a string, it is passed through transparently. If it is a number, it will render with a + prefix

`size`: (enum, Optional, Default='medium') The size of the counter. Can be small, medium, large or xlarge


### XUIAvatarGroup
`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`children`: (node, Optional) 

`avatarSize`: (enum, Optional) The size to apply to all avatars contained within the group. This will override any individual avatar's size settings.

`maxAvatars`: (custom, Optional) The maximum number of avatars to show


### XUISimpleAvatar
`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`variant`: (enum, Optional) The avatar variant

`value`: (custom, Optional) The text to display in the avatar

`imageUrl`: (string, Optional) the image the component should render. Initials rendered otherwise

`size`: (enum, Optional, Default='medium') The size of the avatar. Can be small, medium, large or xlarge

`identifier`: (string, Optional) A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier.

`onError`: (func, Optional) Error handler if the avatar image fails to load


## Testing

### Running the Unit Tests
`$ npm run test`
This simply runs the Unit Tests found in the `__tests__` directory. Reports the results in the command line using the spec reporter.

### Running the UI Tests
`$ npm run test-ui`
This script generates a html page at `test/ui/index.html` so you can view the component as well as running the unit tests.

### Generating a code coverage report
`$ npm run test-coverage`
Generates a coverage report in `build/coverage/PhantomJS/index.html`.


**This README has been automatically generated. Please mark any changes in the docs folder.**

