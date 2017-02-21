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

