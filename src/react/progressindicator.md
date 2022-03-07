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

<XUIProgressCircular ariaLabel="Uploading" id="circular" progress={3} total={5} />;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear ariaLabel="Loading next page" id="linear" progress={3} total={5} />;
```

### Segments

Track is split up into evenly spaced segments _(based on the `total` value)_ with the `isSegmented` prop.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="segments-circular"
  isSegmented
  progress={3}
  total={5}
/>;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Loading next page"
  id="segments-linear"
  isSegmented
  progress={3}
  total={5}
/>;
```

### Thickness

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="circular-thickness"
  progress={3}
  thickness={7}
  total={5}
/>;
```

#### Linear

Set the thickness of the track using the `thickness` prop.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Loading next page"
  id="linear-thickness"
  total={5}
  progress={3}
  thickness={20}
/>;
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
  <XUIProgressCircular ariaLabel="Uploading" id="grow-circular" isGrow progress={3} total={5} />
</div>;
```

You can override the generated track thickness with the `thickness` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ background: '#F5F6F7', maxWidth: '300px', padding: '10px', width: 'calc(50vw / 4)' }}>
  <XUIProgressCircular
    ariaLabel="Uploading"
    id="grow-circular-thickness"
    isGrow
    progress={3}
    thickness={30}
    total={5}
  />
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
  <XUIProgressLinear ariaLabel="Loading next page" id="grow-linear" isGrow progress={3} total={5} />
</div>;
```

You can override the generated track thickness with the `thickness` prop. The track will be vertically centered inside the _grow_ area.

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<div style={{ background: '#F5F6F7', height: '100px', padding: '10px' }}>
  <XUIProgressLinear
    ariaLabel="Loading next page"
    id="grow-linear-thickness"
    isGrow
    progress={3}
    total={5}
    thickness={10}
  />
</div>;
```

### Tool Tip

Create a Tool Tip that is visible when a mouse cursor enters the component with the `hasToolTip` prop.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="tooltip-circular"
  hasToolTip
  progress={3}
  total={5}
/>;
```

You can supply the `toolTipMessage` prop a customised message to replace the default Tool Tip text.

**Note:** The `aria-valuetext` attribute will also inherit the custom Tool Tip text.

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Setup progress"
  id="tooltip-linear"
  hasToolTip
  progress={3}
  total={5}
  toolTipMessage="Answered 3 of 5 questions"
/>;
```

## Overflow

Change the UI to illustrate when the `progress` exceeds the `total` value.

**Note:** When `isOverflow` is not active the component ensures `progress` cannot be greater than the `total`.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="overflow-circular"
  isOverflow
  isSegmented
  progress={7}
  total={5}
/>;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Loading"
  id="overflow-linear"
  progress={7}
  total={5}
  isSegmented
  isOverflow
/>;
```

### Soft Error

Change the `progress` track into an error state with the `isSoftError` prop.

**Note:** The soft error will not activate when the UI is in an active _overflow_ state _(as the overflow automatic soft error will already be in effect)_.

#### Circular

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="soft-error-circular"
  isSoftError
  progress={3}
  total={5}
/>;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Loading next page"
  id="soft-error-linear"
  isSoftError
  progress={3}
  total={5}
/>;
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
  ariaLabel="Loading"
  id="color-circular"
  progress={3}
  progressColor="green"
  total={5}
  totalColor="yellow"
/>;
```

#### Linear

```jsx harmony
import { XUIProgressLinear } from '@xero/xui/react/progressindicator';

<XUIProgressLinear
  ariaLabel="Loading next page"
  id="color-linear"
  progress={3}
  progressColor="green"
  total={5}
  totalColor="yellow"
/>;
```

## Circular Only Examples

### Complete Icon

Show a complete icon when the `progress` equals the `total` value with the `isAlertOnComplete` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="complete-circular"
  isAlertOnComplete
  progress={5}
  total={5}
/>;
```

### Hard Error

Show an error icon with the `isHardError` prop.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  id="hard-error-circular"
  isHardError
  progress={3}
  total={5}
/>;
```

You can supply the `hardErrorAlert` prop some custom content _(JSX, String, Number)_ to override the default error icon.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<XUIProgressCircular
  ariaLabel="Uploading"
  hardErrorAlert="X"
  id="hard-custom-circular"
  isHardError
  progress={3}
  total={5}
/>;
```

### Central Content

Supply content to reside in the center of the progress indicator circle using a traditional nested `children` format.

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ width: '100px' }}>
  <XUIProgressCircular
    ariaLabel="Updating contact details"
    id="central-content-image-circular"
    isGrow
    progress={3}
    total={5}
  >
    <img
      alt=""
      src="https://picsum.photos/id/1011/100/100"
      style={{ height: 'auto', width: '100%' }}
    />
  </XUIProgressCircular>
</div>;
```

```jsx harmony
import { XUIProgressCircular } from '@xero/xui/react/progressindicator';

<div style={{ width: '100px' }}>
  <XUIProgressCircular
    ariaLabel="Uploading"
    id="central-content-text-circular"
    isGrow
    progress={3}
    total={5}
  >
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

<div style={{ width: '270px' }}>
  <XUIProgressLinear
    ariaLabel="Loading next page"
    hasSegmentDots
    id="dots-linear"
    isSegmented
    progress={3}
    thickness={30}
    total={5}
  />
</div>;
```
