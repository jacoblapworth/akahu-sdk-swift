<div class="xui-margin-vertical">
	<a href="../section-components-identifiers-progressindicator.html" isDocLink>Progress Indicator in the XUI Documentation</a>
</div>

The Progress Indicator comes in two main variants (**Circular**, **Linear**). They are isolated as individual components `import { XUIProgressCircular, XUIProgressLinear } from '@xero/xui/react/progressindicator';`.

There are a multitude of props that can augment the specifics of each main variant. Most of the functionality is at parity between Circular and Linear layouts however there are some additional aesthetic enhancements that are **only** relevant to one UI format _(see below)_.

**Note:** The unique `id` prop specifically relates to things like defining `<svg />` masks and _ARIA_ Tool Tip attributes. Because the ID associations can be ambiguous we require a unique ID for all component instances to ensure maximum compatibility.

## Examples

### Standard

A single Circular or Linear track showing `progress` vs `total` values.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="standard-circular" total={5} progress={3} />;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear id="standard-linear" total={5} progress={3} />;
```

### Segments

Track is split up into evenly spaced segments _(based on the `total` value)_ with the `isSegmented` prop.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="segments-circular" total={5} progress={3} isSegmented />;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear id="segments-linear" total={5} progress={3} isSegmented />;
```

### Thickness

#### Linear

Set the thickness of the track using the `thickness` prop.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear id="thickness-linear" total={5} progress={3} thickness={20} />;
```

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="thickness-circular" total={5} progress={3} thickness={7} />;
```

### Grow

#### Circular

Set the UI to fill the width of its parent container with the `isGrow` prop.

**Note:**

- The height will automatically resize proportionally to retain the components circular shape.
- The track `thickness` will automatically resize based on the components dimensions.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ background: '#F5F6F7', maxWidth: '300px', padding: '10px', width: 'calc(50vw / 4)' }}>
  <XUIProgressCircular id="grow-dynamic-circular" total={5} progress={3} isGrow />
</div>;
```

You can override the generated track thickness with the `thickness` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ background: '#F5F6F7', maxWidth: '300px', padding: '10px', width: 'calc(50vw / 4)' }}>
  <XUIProgressCircular id="grow-static-circular" total={5} progress={3} isGrow thickness={30} />
</div>;
```

#### Linear

Sets the Linear UI to fill the height of its parent container.

**Note:** The Linear UI fills its parent containers width by default.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<div
  style={{ background: '#F5F6F7', height: 'calc(50vw / 10)', maxHeight: '70px', padding: '10px' }}
>
  <XUIProgressLinear id="grow-linear" total={5} progress={3} isGrow />
</div>;
```

You can override the generated track thickness with the `thickness` prop. The track will be vertically centered inside the _grow_ area.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<div style={{ background: '#F5F6F7', height: '100px', padding: '10px' }}>
  <XUIProgressLinear id="grow-linear" total={5} progress={3} isGrow thickness={10} />
</div>;
```

### Tool Tip

Create a Tool Tip that is visible when a mouse cursor enters the component with the `hasToolTip` prop.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="tooltip-circular" total={5} progress={3} hasToolTip />;
```

You can supply the `toolTipMessage` prop a customised message to replace the default Tool Tip text.

**Note:** The `aria-valuetext` attribute will also inherit the custom Tool Tip text.

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  id="tooltip-linear"
  total={5}
  progress={3}
  hasToolTip
  toolTipMessage="Answered 3 of 5 questions"
/>;
```

## Overflow

Change the UI to illustrate when the `progress` exceeds the `total` value.

**Note:** When `isOverflow` is not active the component ensures `progress` cannot be greater than the `total`.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="overflow-circular" total={5} progress={7} isSegmented isOverflow />;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear id="overflow-linear" total={5} progress={7} isSegmented isOverflow />;
```

### Soft Error

Change the `progress` track into an error state with the `isSoftError` prop.

**Note:** The soft error will not activate when the UI is in an active _overflow_ state _(as the overflow automatic soft error will already be in effect)_.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="soft-circular" total={5} progress={3} isSoftError />;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear id="soft-linear" total={5} progress={3} isSoftError />;
```

### Colors

Change the color of the `total` and `progress` track by supplying the `totalColor` and `progressColor` props one of the following predefined color keys:

- `orange`
- `yellow`
- `green`
- `mint`
- `turquoise`
- `blue`
- `violet`
- `grape`
- `pink`
- `grey`

**Note:** The `error` color cannot be changed from the standard `$xui-progress-error-color`.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  id="color-circular"
  total={5}
  progress={3}
  totalColor="grape"
  progressColor="mint"
/>;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  id="color-linear"
  total={5}
  progress={3}
  totalColor="yellow"
  progressColor="violet"
/>;
```

## Circular Only Examples

### Complete Icon

Show a complete icon when the `progress` equals the `total` value with the `isAlertOnComplete` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="complete-circular" total={5} progress={5} isAlertOnComplete />;
```

### Hard Error

Show an error icon with the `isHardError` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular id="hard-circular" total={5} progress={3} isHardError />;
```

You can supply the `hardErrorAlert` prop some custom content _(JSX, String, Number)_ to override the default error icon.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  id="hard-custom-circular"
  total={5}
  progress={3}
  isHardError
  hardErrorAlert=":-("
/>;
```

### Central Content

Supply content to reside in the center of the progress indicator circle using a traditional nested `children` format.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ width: '100px' }}>
  <XUIProgressCircular id="central-content-circular1" total={5} progress={3} isGrow>
    <img
      style={{ width: '100%', height: 'auto' }}
      alt=""
      src="https://xui.xero.com/static/xpert-avatar.png"
    />
  </XUIProgressCircular>
</div>;
```

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ width: '100px' }}>
  <XUIProgressCircular id="central-content-circular2" total={5} progress={3} isGrow>
    <div
      style={{ height: '100%' }}
      className="xui-u-flex xui-u-flex-justify-center xui-u-flex-align-center xui-heading xui-textcolor-faint"
    >
      60%
    </div>
  </XUIProgressCircular>
</div>;
```

## Linear Only Examples

### Segment _Dots_

Change the traditional segment _dashes_ to instead render as circular _dots_ using the `hasSegmentDots` prop.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<div style={{ width: `${30 * 9}px` }}>
  <XUIProgressLinear
    id="dots-linear"
    total={5}
    progress={3}
    thickness={30}
    isSegmented
    hasSegmentDots
  />
</div>;
```
