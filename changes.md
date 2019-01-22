# XUI 15 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## Removals

* `xui-pickitem--multiselect` has been removed. Use `xui-pickitem-multiselect` instead.
* `xui-pickitem--split` has been removed. Use `xui-pickitem-split` instead.
* `xui-banner--link` has been removed. There is no replacement.
* `xui-pageheading--breadcrumbs` has been removed. Use `xui-breadcrumbs` instead.
* `xui-verticalinputgroup` has been removed. Use `xui-verticaltextinputgroup` instead.
* `xui-dropdown--force-desktop` has been removed. Use `xui-dropdown-force-desktop` instead.
* `xui-dropdownToggled--innerWrap` has been removed. There is no replacement as this undocumented class was internal to a component and is no longer used.
* `xui-popover--arrow` has been removed. Apply `xui-popover-arrow` on the parent popover component instead.
* `xui-stepper-tests` class has been removed. This was a hidden and internal class, but if you were referring to it, use `xui-stepper-hidden-content` instead.
* `xui-pill-is-deleteable` has been removed. Use `xui-pill-is-deletable` instead.
* `xui-dropdown-show-mobile-only` has been removed. Use `xui-dropdown-hide-small-up` instead.
* `xui-column-#-of-12-medium` classes have been removed. Use `xui-column-#-of-12-small-up` instead.
* `xui-column-#-of-12-wide` classes have been removed. Use `xui-column-#-of-12-large-up` instead.
* `xui-breakpoint-narrow` mixin has been removed. Use `xui-breakpoint-small-down` instead.
* `xui-breakpoint-medium` mixin has been removed. Use `xui-breakpoint-medium-only` instead.
* `xui-breakpoint-wide` mixin has been removed. Use `xui-breakpoint-large-up` instead.
* `xui-breakpoint-huge` mixin has been removed. Use `xui-breakpoint-xlarge-up` instead.
* `xui-breakpoint-medium-and-narrow` mixin has been removed. Use `xui-breakpoint-small-up` instead
* `xui-breakpoint-medium-and-wide` mixin has been removed. Use `xui-breakpoint-large-up` instead
* `xui-disabled-form` mixin has been removed. Use `xui-disabled-form-control` instead.

## Breakpoint variable name & value changes

- Old breakpoint variable names & values

	- `xui-breakpoint-narrow: 520px`
	- `xui-breakpoint-medium: 940px`
	- `xui-breakpoint-wide: 1160px`

- New breakpoint variable names & values

	- `xui-breakpoint-small: 600px`
	- `xui-breakpoint-medium: 800px`
	- `xui-breakpoint-large: 1000px`
	- `xui-breakpoint-xlarge: 1200px`
	- `xui-breakpoint-2xlarge: 1600px`

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
- TextInput side element contents should have their size checked (they should always have a size 1 smaller than the parent input - i.e. 'medium' `XUITextInput` contains 'small' `XUIButton`s)
- Check for uses of `XUIPill` outside of `XUITextInput`. The codemod for this upgrade automatically adds `size="small"`, which should be removed in cases where `XUIPill` isn't in a text input
- SelectBox prop `islabelHidden` case has been fixed to be `isLabelHidden`, for real this time.
- Pill prop `defaultLayout` has been removed.
- Pill `onDeleteClick` no longer has the component instance bound to `this`.
- Switch no longer always maintains internal checked state. The API is now very similar to XUICheckbox and XUIRadio in that the component can be either used as a controlled or uncontrolled input.
  If users provide an isChecked value, the component will not maintain its own internal state. If users provide no isChecked value, the isDefaultChecked value will be used to populate the initial internally-managed state.
- Autocompleter uses a debounce rather than throttle for searching. The `searchThrottleInterval` prop is superceded by `searchDebounceTimeout`. The default value for this has been set to 200 (was previously 0). To disable debouncing, set this value to 0.
- Stepper prop `updateCurrentStep` has been included into the main component API in favour of `handleClick` callbacks in every tab instance.
- Modal no longer supports `default` as a size value. The default prop value is `medium` (unchanged).
- `Picklist`, `Pickitem`, and related components
	- Have a new `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`. Size can be set at either the item or list level, and will be applied to the entire list.
	- `isMultiselect` and `shouldTruncate` can now be set at the list level and will set those properties for all items in the list. `isMultiselect` is not supported at the `xsmall` size.
	- Pickitem in React has reached parity with what had been supported by CSS. `primaryElement`, `secondaryElement`, and `pinnedElement` accept text or nodes to generate content with opinionated styling. `leftElement` and `rightElement` will display content such as avatars or icons at either side of the item (`leftElement` will be superseded by `isMultiselect`).
	- The new Pickitem prop `isInvalid` styles the item in an invalid state
	- `NestedPicklistTrigger` also supports a `leftElement`
	- In support of the more contentblock-style Autocompleter picklists, Pickitems also have new `headerElement` and `isMultiline` props.
- ContentBlockItem has new `description` and `tagPosition` props. Description is styled similarly to the prior `secondaryHeading` content (which has now become more prominent), and `tagPosition` allows you to specify where tags will be placed. `pinnedValue`, `href`, `primaryHeading`, and `secondaryHeading` now only accept strings. The `tag` property has been changed to accept multiple tags, and is now labeled `tags`, accordingly.
- Loader size options have been switched from 'large', 'standard', and 'small' to be consistent with other component sizes. New size options are 'standard', 'small', and 'xsmall', and will be converted automatically if using the codemod. The largest size, 'standard' is now the default.
- `SelectBox`
	- Has a new `fullWidth` prop. The default value is `always`.
		- The available values are `always`, `small-down`, and `never`.
	- Has a new `size` prop. The default value is `medium`.
		- The available sizes are `medium`, `small`, and `xsmall`.
		- If `SelectBoxOption` is not given a `size` property, it will inherit the `size` of the `SelectBox`.
	- No longer shrinks to a standard width when a `buttonVariant` is supplied. To prevent your `SelectBox` from going full-width, set the `fullWidth` prop to `never`.
	- The `isTextTruncated` prop can now be used without a `buttonVariant`.
	- Has a new `caretTitle` prop. This can be used to set the title attribute on the caret. It defaults to `Toggle List`.
- `XUIButton`
	- Has a new `fullWidth` prop. The default value is `never`.
		- The available values are `always`, `small-down`, and `never`.
		- The `size` prop no longer accepts `full-width` or `full-width-mobile`.
			- To get full-width buttons, set `fullWidth` to `always` or `small-down`
- `RolloverCheckbox`
	- The `size` prop has been removed, and the size of the rollover target is now determined by the size of the `rolloverComponent` content.
	- Has a new `checkboxSize` prop to allow control of the underlying checkbox using the new size variants.

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
| xui-u-flex-*-narrow | xui-u-flex-*-small-down |
| xui-u-flex-*-medium | xui-u-flex-*-small-up |
| xui-u-flex-*-wide | xui-u-flex-*-large-up |
| xui-u-hidden-narrow | xui-u-hidden-small-down |
| xui-u-hidden-medium | xui-u-hidden-small-up |
| xui-u-hidden-wide | xui-u-hidden-large-up |

---

### Component classes
- `SelectBox` without React
	- Additional class `xui-button-standard` is now required when building a SelectBox without React.
	- Additional class `xui-select--button-no-variant` is now required when building a SelectBox without React.
	- `xui-button-fullwidth` is now required to make the SelectBox match the width of its container when building a SelectBox without React.

### Component prop name changes
- `XUIColumn` props `gridColumnsMedium` and `gridColumnsWide` have been renamed to `gridColumnsSmallUp` and `gridColumnsLargeUp`, respectively.


## Additions


### Component props

- Pill has a new `isLimitedWidth` prop to replace the `isMaxContentWidth` prop. The default for pills is now to fit their content, and you can apply `isLimitedWidth` to cap them at 200px. This prop change will be handled automatically by the upgrade codemod for existing Pills in your app.
- Text input now has a `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`.
- Tag has a new `size` prop. The default value is `standard`. Other available values are `small` and `xsmall`.
- Checkbox and Radio have a new `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`.
- XUIButton has a new `fullWidth` prop. The default value is `never`. Other available values are `always`, and `small-only`.
	- This replaces the `full-width` and `full-width-mobile` sizes.
- SelectBox has a new `fullWidth` prop. The default value is `never`. Other available values are `always`, and `small-only`.
	- This replaces the `full-width` and `full-width-mobile` sizes.
- SelectBox has a new `size` prop. The default value is `medium`. Other available values are `small`, and `xsmall`.
- SelectBox has a new `caretTitle` prop. This can be used to set the title attribute on the caret. It defaults to `Toggle List`.
- `RolloverCheckbox`has a new `checkboxSize` prop to allow control of the underlying checkbox using the new size variants.

## Other changes

- Modal widths have changed: small is 300px (was 340); medium is 400px (was 460); large is 600px (was 600) and xlarge is 800px (was 860).
- In addition to renaming the utility classes that handle viewport-size-specific behaviour, the behaviour itself has changed, in some cases. `-medium` was previously affecting elements when the viewport was *between* 520px and 940px. The new `-small-up` replacement classes will affect elements when the viewport is 600px or greater, unless overridden with a `-large-up` class, which will take over at 1000px. This is in line with a mobile-first approach. In many cases, this will mean that developers need fewer classes to get the desired behaviour.
