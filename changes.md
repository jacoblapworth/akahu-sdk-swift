# XUI 15 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## Removals

* `xui-pickitem--multiselect` has been removed. Use `xui-picklist-multiselect` instead.
* `xui-pickitem--split` has been removed. Use `xui-picklist-split` instead.
* `xui-banner--link` has been removed. There is no replacement.
* `xui-pageheading--breadcrumbs` has been removed. Use `xui-breadcrumbs` instead.

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
* Switch: `isReversed`, `labelId`, `labelClassName`, and `isLabelHidden` props have been added, to match the Checkbox and Radio labelling API
* RadioGroup & CheckboxGroup: `labelId`, `labelClassName`, `isLabelHidden`, `fieldClassName`, and `isFieldLayout` have been added
* Toggle: `labelText`, `labelId`, `labelClassName`, `isLabelHidden`, `fieldClassName`, `isDefaultChecked` and `isFieldLayout` have been added
* NestedPicklistTrigger: `ariaLabel` has been added to provide assistive tech with information about the expansion button
* ProgressWrapper, ProgressCircular, & ProgressLinear: `ariaLabel` and `ariaLabelledBy` have been added
* RolloverCheckbox: `ariaLabelledBy` has been added
* Table: `onRowClick` now **only** holds the handler callback with the conditional logic being asserted on each table row through the use of `shouldRowClick`. (see https://github.dev.xero.com/UXE/xui/issues/3278, and the subsequent updates in https://github.dev.xero.com/UXE/xui/pull/3705)


## Other changes
