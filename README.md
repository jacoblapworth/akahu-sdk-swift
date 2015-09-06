Avatar
===========

The React implementation of the [Avatar component](https://github.dev.xero.com/pages/Style/xui/section-avatars.html) from XUI.

## Getting Started ##

```
$ npm install && npm test
```

## Usage ##

Install via bower
```bash
$ bower install --save git@github.dev.xero.com:FutureRobot/avatar.git
```

```js
import Avatar from 'Avatar';

(function() {
	React.render(
		<div>
			<Avatar className="my-comp"
				value="Magic Unicorn's Fairy Dust"
				size="medium"
				colour= "#800080"
				identifier="XfCqgf"
				imageUrl="logo.png"/>
		</div>, 
		document.getElementById('app')
	);
})();
```

**Config Properties:**

`value`: The text to display in the avatar.

`imageUrl`: The image the component should render. Image will always be used if imageUrl is specified.

`size`: The size of the avatar. Can be small, medium or large. Default size is medium. 

`colour`:The background colour of the avatar. Default colour is blue. Colour will be used if there is no imageUrl and the first letter of the value property will be rendered.

`identifier`: An unique string that will be used to generate the colour of the avatar. Colour generated using the identifier will be used if there is no imageUrl or colour, and the first letter of the value property will be rendered.

## Example ##

**Avatar with identifier**

![](example/avatar_identifier.PNG)

**Avatar with imageUrl**

![](example/avatar_imageUrl.PNG)
