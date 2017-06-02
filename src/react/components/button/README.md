xui-button
==========
[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiButton)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiButton)
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.3.0-blue.svg)

A React UI component that creates buttons from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.18.0/section-buttons.html). This includes single buttons and grouped buttons.

### Example
```js
import XUIButton, {XUIButtonGroup, XUIButtonCaret} from 'src/components/button';

<XUIButton
	isDisabled={true}
	onClick={this.handleClick}
	variant='create'
	size='full-width'
>
	Click me
</XUIButton>
```

## xui-button prop types

### XUIButton

### XUIButtonCaret
`className`: (string, Optional)


### XUIButtonGroup
`children`: (node, Optional)

`className`: (string, Optional)


### XUISecondaryButton

### XUISplitButtonGroup
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)

`isDisabled`: (custom, Optional, Default=ButtonDefaultProps.isDisabled)

`variant`: (custom, Optional, Default=ButtonDefaultProps.variant)


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

### Migrating from v2 Buttons

1. The `isSplit` prop (and all associated secondary button props) of the button component has been removed.  There's a new `XUISecondaryButton` component for that. Check out the Split Button Example below to see how to accomplish the same thing now.
2. If you want to output a link (aka `<a>` tag), you should no longer use the `type` prop.  Set the `isLink` prop to true instead.
3. The `buttonType` prop has been renamed to `type` (more intuitive) and the default has changed from `submit` to `button`.  Most people were manually setting `button` or just didn't have the button inside of a form, so it was changed.


**This README has been automatically generated. Please mark any changes in the docs folder.**
