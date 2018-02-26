<div class="xui-margin-vertical">
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
			<use xlink:href="#xui-icon-bookmark" role="presentation"/>
		</svg>
		<a href="../section-building-blocks-progress-indicator.html">Progress Indicator in the XUI Documentation</a>
</div>

The Progress Indicator comes in two main variants (**Circular**, **Linear**). They are isolated as individual components `import { XUIProgressCircular, XUIProgressLinear } from '@xero/xui/react/progressindicator';`.

There are a multitude of props that can augment the specifics of each main variant. Most of the functionality is at parity between Circular and Linear layouts however there are some additional aesthetic enhancements that only the Circular version inherits *(see below)*.

**Note:** The unique `id` prop specifically relates to things like defining `<svg />` masks and *ARIA* Tool Tip attributes. Because the ID associations can be ambiguous we require a unique ID for all component instances to ensure maximum compatibility.

## Examples

### Standard

A single Circular or Linear track showing `progress` vs `total` values.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="standard-circular" total={5} progress={3} />
```

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="standard-linear" total={5} progress={3} />
```

### Segments

Track is split up into evenly spaced segments *(based on the `total` value)* with the `isSegmented` prop.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="segments-circular" total={5} progress={3} isSegmented />
```

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="segments-linear" total={5} progress={3} isSegmented />
```

### Grow

#### Circular

Set the Circular UI to fill the width of its parent container with the `isGrow` prop.

**Note:**
+ The height will automatically resize proportionally to retain the components circular shape.
+ The `stroke` attribute on the `<svg />` will automatically resize based on the components dimensions.

```
const {XUIProgressCircular} = require('./progressindicator');
<div style={{ maxWidth: '300px', width: 'calc(50vw / 4)' }}>
	<XUIProgressCircular id="grow-circular" total={5} progress={3} isGrow />
</div>
```

#### Linear

Sets the Linear UI to fill the height of its parent container.

**Note:** The Linear UI fills its parent containers width by default.

```
const {XUIProgressLinear} = require('./progressindicator');
<div style={{ height: 'calc(50vw / 20)', maxHeight: '50px' }}>
	<XUIProgressLinear id="grow-linear" total={5} progress={3} isGrow />
</div>
```

### Tool Tip

Create a Tool Tip that is visible when a mouse cursor enters the component with the `hasToolTip` prop.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="tooltip-circular" total={5} progress={3} hasToolTip />
```

You can supply the `toolTipMessage` prop a customised message to replace the default Tool Tip text.

**Note:** The `aria-valuetext` attribute will also inherit the custom Tool Tip text.

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="tooltip-linear" total={5} progress={3} hasToolTip toolTipMessage="Answered 3 of 5 questions" />
```

## Overflow

Change the UI to illustrate when the `progress` exceeds the `total` value.

**Note:** When `isOverflow` is not active the component ensures `progress` cannot be greater than the `total`.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="overflow-circular" total={5} progress={7} isSegmented isOverflow />
```

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="overflow-linear" total={5} progress={7} isSegmented isOverflow />
```

### Soft Error

Change the `progress` track into an error state with the `isSoftError` prop.

**Note:** The soft error will not activate when the UI is in an active *overflow* state *(as the overflow automatic soft error will already be in effect)*.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="soft-circular" total={5} progress={3} isSoftError />
```

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="soft-linear" total={5} progress={3} isSoftError />
```

### Colors

Change the color of the `total` and `progress` track by supplying the `totalColor` and `progressColor` props one of the following predefined color keys:

+ `orange`
+ `yellow`
+ `green`
+ `mint`
+ `turquoise`
+ `blue`
+ `violet`
+ `grape`
+ `pink`
+ `grey`

**Note:** The `error` color cannot be changed from the standard `$xui-progress-error-color`.

#### Circular
```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="color-circular" total={5} progress={3} totalColor="grape" progressColor="mint" />
```

#### Linear
```
const {XUIProgressLinear} = require('./progressindicator');
<XUIProgressLinear id="color-linear" total={5} progress={3} totalColor="yellow" progressColor="violet" />
```

## Circular Only Examples

### Complete Icon

Show a complete icon when the `progress` equals the `total` value with the `isAlertOnComplete` prop.

```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="complete-circular" total={5} progress={5} isAlertOnComplete />
```

### Hard Error

Show an error icon with the `isHardError` prop.

```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="hard-circular" total={5} progress={3} isHardError />
```

You can supply the `hardErrorAlert` prop some custom content *(JSX, String, Number)* to override the default error icon.

```
const {XUIProgressCircular} = require('./progressindicator');
<XUIProgressCircular id="hard-custom-circular" total={5} progress={3} isHardError hardErrorAlert=":-("/>
```

### Central Content

Supply content to reside in the center of the progress indicator circle using a traditional nested `children` format.

```
const {XUIProgressCircular} = require('./progressindicator');
<div style={{ width: '100px' }}>
	<XUIProgressCircular id="central-content-circular" total={5} progress={3} isGrow>
		<img style={{ width: '100%', height: 'auto' }} src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg" />
	</XUIProgressCircular>
</div>
```
