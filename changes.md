# XUI 15 Changes

## Build changes for consumers of React components

XUI's React components now import the CSS they require.
This enables you to only bundle the CSS from XUI that your apps use (based on the components they use).

If you choose to take advantage of this, please replace the `<link>` element that points at `xui.css` to point
at `xui-base.css` instead. Please ensure this is in the `<head>` element as it contains element selectors
and styles for `xui-html` and `xui-body` classes.

We will continue to support the xui.css stylesheet. If you wish to continue using it, please take the necessary steps to
ensure that XUI's CSS won't be bundled with your application's CSS.

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## Removals

* `xui-pickitem--multiselect` has been removed. Use `xui-picklist-multiselect` instead.
* `xui-pickitem--split` has been removed. Use `xui-picklist-split` instead.
* `xui-banner--link` has been removed. There is no replacement.
* `xui-pageheading--breadcrumbs` has been removed. Use `xui-breadcrumbs` instead.
* `xui-verticalinputgroup` has been removed. Use `xui-verticaltextinputgroup` instead.
* `xui-dropdown--force-desktop` has been removed. Use `xui-dropdown-force-desktop` instead.
* `xui-dropdownToggled--innerWrap` has been removed. There is no replacement as this undocumented class was internal to a component and is no longer used.
* `xui-popover--arrow` has been removed. Apply `xui-popover-arrow` on the parent popover component instead.
* `xui-stepper-tests` class has been removed. This was a hidden and internal class, but if you were referring to it, use `xui-stepper-hidden-content` instead.
* `xui-pill-is-deleteable` has been removed. Use `xui-pill-is-deletable` instead.
* `xui-breakpoint-medium-and-wide` mixin has been removed. Use `xui-breakpoint-small-up` instead
* `xui-breakpoint-wide` mixin has been removed. Use `xui-breakpoint-medium-up` instead.
* `xui-breakpoint-huge` mixin has been removed. Use `xui-breakpoint-large-up` instead.
* `xui-breakpoint-narrow` mixin has been removed. Use `xui-breakpoint-xsmall-only` instead.
* `xui-breakpoint-medium` mixin has been removed. Use `xui-breakpoint-small-only` instead.

## Breakpoint variable name & value changes

- Old breakpoint variable names & values

- `xui-breakpoint-wide: 520px`
- `xui-breakpoint-medium: 940px`
- `xui-breakpoint-narrow: 1160px`

- New breakpoint variable names & values

	- `xui-breakpoint-small: 600px`
	- `xui-breakpoint-medium: 800px`
	- `xui-breakpoint-large: 1000px`
	- `xui-breakpoint-xlarge: 1200px`

## Mixin renames

* `addTotalTrackColor` has been renamed to `xui-stepper-add-total-track-color`
* `addCurrentTrackColor` has been renamed to `xui-stepper-add-current-track-color`
* `stepperLinkColor` has been renamed to `xui-stepper-link-color`
* `xui-suports-css-grid` has been renamed to `xui-supports-css-grid`

### Components

- Icons in `XUIButton`
	- Should not use the `isBoxed` prop (including when they're in icon button variants, you can also remove usages of the `xui-icon-inline` class)
	- Buttons with `variant="icon"` or `variant="icon-inverted"` should receive the `size="small"` prop
	- Buttons with `variant="icon-large"` or `variant="icon-inverted-large` should have `size="standard"` (or can be left undefined) and have their variant name switched to `variant="icon"` or `variant="icon-inverted"`
- TextInput side element contents should have their size checked (they should always have a size 1 smaller than the parent input - i.e. 'standard' `XUITextInput` contains 'small' `XUIButton`s)
- Check for uses of `XUIPill` outside of `XUITextInput`. The codemod for this upgrade automatically adds `size="small"`, which should be removed in cases where `XUIPill` isn't in a text input
- SelectBox prop `islabelHidden` case has been fixed to be `isLabelHidden`, for real this time.
- Pill prop `defaultLayout` has been removed.
- Pill `onDeleteClick` no longer has the component instance bound to `this`.
- Switch no longer always maintains internal checked state. The API is now very similar to XUICheckbox and XUIRadio in that the component can be either used as a controlled or uncontrolled input.
  If users provide an isChecked value, the component will not maintain its own internal state. If users provide no isChecked value, the isDefaultChecked value will be used to populate the initial internally-managed state.


### Utility classes

The following size classes have been changed:

| Old value | New value |
|-----------|-----------|
| xsmall    | 2xsmall   |
| 3xlarge   | 2xlarge   |
| 4xlarge   | 3xlarge   |
| 5xlarge   | 4xlarge   |
| 6xlarge   | 5xlarge   |

All other existing values stay as they are (including `2xlarge`)

| Removed       | Replacement    |
| ------------- | :------------- |


---

### Component classes


### Component prop name changes


## Additions


### Component classes


### Component props

* Pill now has a `size` prop
* Text input now has a `size` prop

## Other changes
