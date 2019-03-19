# XUI 15 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## Removals

- `xui-pickitem--multiselect` has been removed. Use `xui-pickitem-multiselect` instead.
- `xui-pickitem--split` has been removed. Use `xui-pickitem-split` instead.
- `xui-banner--link` has been removed. There is no replacement.
- `xui-pageheading--breadcrumbs` has been removed. Use `xui-breadcrumbs` instead.
- `xui-verticalinputgroup` has been removed. Use `xui-verticaltextinputgroup` instead.
- `xui-dropdown--force-desktop` has been removed. Use `xui-dropdown-force-desktop` instead.
- `xui-dropdownToggled--innerWrap` has been removed. There is no replacement as this undocumented class was internal to a component and is no longer used.
- `xui-popover--arrow` has been removed. Apply `xui-popover-arrow` on the parent popover component instead.
- `xui-stepper-tests` class has been removed. This was a hidden and internal class, but if you were referring to it, use `xui-stepper-hidden-content` instead.
- `xui-pill-is-deleteable` has been removed. Use `xui-pill-is-deletable` instead.
- `xui-contentblockitem--links` has been removed. Use `xui-contentblockitem--maincontent` instead.
- `xui-contentblockitem--toplinks` has been removed. The nearest replacement is `xui-contentblockitem--headings`, which should wrap primary and secondary headings.
- `xui-dropdown-show-mobile-only` has been removed. Use `xui-dropdown-hide-small-up` instead.
- `xui-column-#-of-12-medium` classes have been removed. Use `xui-column-#-of-12-small-up` instead.
- `xui-column-#-of-12-wide` classes have been removed. Use `xui-column-#-of-12-large-up` instead.
- `xui-breakpoint-narrow` mixin (not variable) has been removed. Use `xui-breakpoint-small-down` instead.
- `xui-breakpoint-medium` mixin (not variable) has been removed. Use `xui-breakpoint-medium-to-large` instead.
- `xui-breakpoint-wide` mixin (not variable) has been removed. Use `xui-breakpoint-large-up` instead.
- `xui-breakpoint-huge` mixin has been removed. Use `xui-breakpoint-xlarge-up` instead.
- `xui-breakpoint-medium-and-narrow` mixin has been removed. Use `xui-breakpoint-small-up` instead
- `xui-breakpoint-medium-and-wide` mixin has been removed. Use `xui-breakpoint-large-up` instead
- `xui-disabled-form` mixin has been removed. Use `xui-disabled-form-control` instead.

### Breakpoint variable name & value changes

- Old breakpoint variable (not mixin) names & values
  - `xui-breakpoint-narrow: 520px`
  - `xui-breakpoint-medium: 940px`
  - `xui-breakpoint-wide: 1160px`
- New breakpoint variable (not mixin) names & values
  - `xui-breakpoint-small: 600px`
  - `xui-breakpoint-medium: 800px`
  - `xui-breakpoint-large: 1000px`
  - `xui-breakpoint-xlarge: 1200px`
  - `xui-breakpoint-2xlarge: 1600px`

### Mixin renames

- `addTotalTrackColor` has been renamed to `xui-stepper-add-total-track-color`
- `addCurrentTrackColor` has been renamed to `xui-stepper-add-current-track-color`
- `stepperLinkColor` has been renamed to `xui-stepper-link-color`
- `xui-suports-css-grid` has been renamed to `xui-supports-css-grid`

### Components

- Icons in `XUIButton`
  - Should not use the `isBoxed` prop nor have the `xui-icon-inline` class applied.
  - Buttons with `"icon"` or `"icon-inverted"` variants should now have `size="small"`. Buttons with `"icon-large"` and `"icon-inverted-large"` variants should have `size="medium"` (or can be left undefined).
  - Buttons should use the `"icon"` or `"icon-inverted"` variants, rather than size-specific variants. The `"icon-large"` and `"icon-inverted-large"` variants have been removed, and sizes are now handled via the `size` prop.
- Icon's iconwrapper class set now requires a size class to be used alongside the base class. The size `medium` is the default, other options are `large` and `xlarge`.
- XUIIcon `size` prop now has a default of `medium`, instead of `standard`
- SelectBox prop `islabelHidden` case has been fixed to be `isLabelHidden`, for real this time.
- Pill prop `defaultLayout` has been removed.
- Single Pills are now deprecated in favour of using XUITextinputs with left and right elements in Read only mode.
- Pill `onDeleteClick` no longer has the component instance bound to `this`.
- Pill `size` prop now has a default of `medium`, instead of `standard`. This size is visually the same as XUI 14 aside from the font size changes. Other available values are `small` and `xsmall`.
- Switch no longer always maintains internal checked state. The API is now very similar to XUICheckbox and XUIRadio in that the component can be either used as a controlled or uncontrolled input.
  - If users provide an isChecked value, the component will not maintain its own internal state.
  - If users provide no isChecked value, the isDefaultChecked value will be used to populate the initial internally-managed state.
- XUIStepper
  - Prop `updateCurrentStep` has been included into the main component API in favour of `handleClick` callbacks in every tab instance.
  - Each "step" now has a max-width of 300px. Text will truncate, by default, or you can set the new `isTruncated` prop to `false`, to cause text to wrap, instead.
- Modal no longer supports `default` as a size value. The default prop value is `medium` (unchanged).
- `XUIModalHeader` prop `defaultLayout` has been removed.
- `XUIModalFooter` prop `defaultLayout` has been removed.
- ContentBlockItem has new `description` and `tagPosition` props. Description is styled similarly to the prior `secondaryHeading` content (which has now become more prominent), and `tagPosition` allows you to specify where tags will be placed. `pinnedValue`, `href`, `primaryHeading`, and `secondaryHeading` now only accept strings. The `tag` property has been changed to accept multiple tags, and is now labeled `tags`, accordingly.
- Loader size options have been switched from 'large', 'standard', and 'small' to be consistent with other component sizes. New size options are 'medium', 'small', and 'xsmall', and will be converted automatically if using the codemod. The largest size, 'medium' is now the default.
- `SelectBox`
  - No longer shrinks to a standard width when a `buttonVariant` is supplied. To prevent your `SelectBox` from going full-width, set the `fullWidth` prop to `never`.
- `XUIButton`
  - The `size` prop now has a default of `medium` instead of `standard`. This size is visually the same as XUI 14 aside from the font size changes.
    - Other available values are `small` and `xsmall`.
  - The `size` prop no longer accepts `full-width` or `full-width-mobile`.
    - To get full-width buttons, set `fullWidth` to `always` or `small-down`
- `RolloverCheckbox`
  - The `size` prop has been removed, and the size of the rollover target is now determined by the size of the `rolloverComponent` content.
- `XUIAutocompleter`
  - Uses a debounce rather than throttle for searching. The `searchThrottleInterval` prop is superceded by `searchDebounceTimeout`. The default value for this has been set to 200 (was previously 0). To disable debouncing, set this value to 0.
- `XUIColumn` props `gridColumnsMedium` and `gridColumnsWide` have been renamed to `gridColumnsSmallUp` and `gridColumnsLargeUp`, respectively.

### Utility classes

The following size classes have been changed:

| Old value | New value |
| --------- | --------- |
| xsmall    | 2xsmall   |
| 3xlarge   | 2xlarge   |
| 4xlarge   | 3xlarge   |
| 5xlarge   | 4xlarge   |
| 6xlarge   | 5xlarge   |

All other existing values stay as they are (including `2xlarge`)

Utility classes with breakpoint suffixes have been updated to reflect the new breakpoint naming convention.

| Removed             | Replacement             |
| ------------------- | ----------------------- |
| xui-u-flex-?-narrow | xui-u-flex-?-small-down |
| xui-u-flex-?-medium | xui-u-flex-?-small-up   |
| xui-u-flex-?-wide   | xui-u-flex-?-large-up   |
| xui-u-hidden-narrow | xui-u-hidden-small-down |
| xui-u-hidden-medium | xui-u-hidden-small-up   |
| xui-u-hidden-wide   | xui-u-hidden-large-up   |

- `xui-page-width-<size>` classes have been deprecated, the sizes have been adjusted and replacements come in the form of compositions.
  - `width-standard` XUI 14 size was 940px, this is now 1000px
  - `width-large` XUI 14 size was 1160px, this is now 1200px.

---

### Component classes

- `SelectBox` without React
  - Additional class `xui-button-standard` is now required when building a SelectBox without React.
  - Additional class `xui-select--button-no-variant` is now required when building a SelectBox without React.
  - `xui-button-fullwidth` is now required to make the SelectBox match the width of its container when building a SelectBox without React.
- `XUISwitch` requires the addition of `xui-switch-medium`, as well as `-medium` classes on the label and control sub elements for a medium-sized display when building a XUISwitch without React.
- `XUITag` requires the addition of `xui-tag-medium` for a medium-sized display when building a XUITag without React.
- `XUIToggle` requires the addition of `xui-toggle-medium` for a medium-sized display when building a XUIToggle without React.

## Additions

### Component props

- `XUIAutocompleter`
  - Has a new `inputSize` prop. The default value is `medium`. The other available size is `small`.
- `XUIDropDown` and `XUINestedDropDown` has new values for `size` prop; `xsmall`, `small`, `medium` and `large`.
  - `XUIAutocompleter`'s `dropdownSize` prop also uses these new values.
  - `XUIAutocompleterSecondarySearch`'s `dropdownSize` prop also uses these new values.
- Pill has a new `isLimitedWidth` prop to replace the `isMaxContentWidth` prop. The default for pills is now to fit their content, and you can apply `isLimitedWidth` to cap them at 200px. This prop change will be handled automatically by the upgrade codemod for existing Pills in your app.
- XUIIcon, when `isBoxed` is true, now adds a class called `xui-iconwrapper-medium` by default. Use the `size` prop to alter this to `large` or `xlarge` at your discretion.
- Text input now has a `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`.
- Tag has a new `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`.
- Checkbox and Radio have a new `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`.
- `XUIButton`
  - Will inherit the `size` of `<XUISplitButtonGroup>` and `<XUIButtonGroup>`.
  - Has a new `fullWidth` prop. The default value is `never`.
    - The available values are `always`, `small-down`, and `never`.
- `XUISplitButtonGroup`
  - Has a new `size` prop. The default value is `medium`.
    - The available sizes are `medium`, `small`, and `xsmall`.
- `XUIButtonGroup`
  - Has a new `size` prop. The default value is `medium`.
    - The available sizes are `medium`, `small`, and `xsmall`.
- `SelectBox`
  - Has a new `fullWidth` prop. The default value is `always`.
    - The available values are `always`, `small-down`, and `never`.
  - Has a new `size` prop. The default value is `medium`.
    - The available sizes are `medium`, `small`, and `xsmall`.
    - If `SelectBoxOption` is not given a `size` property, it will inherit the `size` of the `SelectBox`.
  - The `isTextTruncated` prop can now be used without a `buttonVariant`.
  - Has a new `caretTitle` prop. This can be used to set the title attribute on the caret. It defaults to `Toggle List`.
- `RolloverCheckbox`has a new `checkboxSize` prop to allow control of the underlying checkbox using the new size variants.
- XUIToggle's `variant` prop has been renamed to `size`. The default value is `medium`. Other available values are `small`.
- `XUIAutocompleter` and `XUIAutocompleterSecondarySearch`
  - Have a new `inputSize` prop. The default value is `medium`. The other available size is `small`.
- XUIStepper has a new `isTruncated` prop which defaults to `true`, truncating each "step" at 300px wide.
- `XUIAutocompleter`, `XUISwitch`, `XUICheckbox`, `XUIRadio`, `XUIRadioGroup`, `XUIRange`, `SelectBox` and`XUIToggle`
  - Have a new validation props.
    - `hintMessage` shows a hint message under the input.
    - `validationMessage` shows a validation message under the input.
    - `isInvalid` switches the `hintMessage` out for the `validationMessage`.
- `XUITooltip` has a new `isBlock` prop that can be used to force the wrapping element to be a `div` instead of a `span`.
- TextInput has a new `size` prop. The default value is `medium`. The other available values are `xsmall` and `small`.
  - Side element contents should have their size checked (they should always have a size 1 smaller than the parent input - i.e. 'medium' `XUITextInput` contains 'small' `XUIButton`s).
- `Picklist`, `Pickitem`, and related components
  - Have a new `size` prop. The default value is `medium`. Other available values are `small` and `xsmall`. Size can be set at either the item or list level, and will be applied to the entire list.
  - `isMultiselect` and `shouldTruncate` can now be set at the list level and will set those properties for all items in the list. `isMultiselect` is not supported at the `xsmall` size.
  - Pickitem in React has reached parity with what had been supported by CSS. `primaryElement`, `secondaryElement`, and `pinnedElement` accept text or nodes to generate content with opinionated styling. `leftElement` and `rightElement` will display content such as avatars or icons at either side of the item (`leftElement` will be superseded by `isMultiselect`).
  - The new Pickitem prop `isInvalid` styles the item in an invalid state
  - `NestedPicklistTrigger` also supports a `leftElement`
  - In support of the more contentblock-style Autocompleter picklists, Pickitems also have new `headerElement` and `isMultiline` props.
  - Pickitem also now supports onBlur and onFocus handlers
- OverviewBlock has new `textAlignment`, `hasBorder`, and `hasBackground` props.
  - `textAlignment` supports left, center, and right alignment.
  - `hasBorder` can be used to toggle the wrapping border on the entire block (defaults to true).
  - `hasBackground` defines whether the block should have a solid background (defaults to true).
- OverviewSection has a new `textAlignment` props. It supports left, center, and right alignment.
- `Range`
  - Range now supports size variants.
  - Range now provides a React component `XUIRange`.

## Other changes

- Modal widths have changed: small is 300px (was 340); medium is 400px (was 460); large is 600px (was 600) and xlarge is 800px (was 860).
- In addition to renaming the utility classes that handle viewport-size-specific behaviour, the behaviour itself has changed, in some cases. `-medium` was previously affecting elements when the viewport was _between_ 520px and 940px. The new `-small-up` replacement classes will affect elements when the viewport is 600px or greater, unless overridden with a `-large-up` class, which will take over at 1000px. This is in line with a mobile-first approach. In many cases, this will mean that developers need fewer classes to get the desired behaviour.
- Along with new sizes being introduced for dropdown, the values of dropdown sizes have also changed: xsmall is 100px (xsmall previously didn't exist); small is 200px (was 140px); medium is 300px (was 220px) and large is 400px (was 300px). xlarge has been removed.
- Accordions will no longer open when clicking in the `overflow` or `action` areas. This wasn't intended behaviour and is considered a bug.
