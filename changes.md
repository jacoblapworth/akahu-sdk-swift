# XUI 19 Changes

## Table of Contents

- [Dependencies](#Dependencies)
- [CSS Changes](#XUI-CSS)
- [React Component Changes](#XUI-React-components)
  - [Prop Changes](#Component-props)
- [Other changes](#Other-changes)

## Dependencies

Please take some time to check that your projects' `package.json` dependencies match those of XUI's `package.json` dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyser after upgrading (and regularly in general).

## XUI CSS

### Removals

- `xui-styledcheckboxradio--indeterminate` and `xui-styledcheckboxradio--check` have been removed with no replacement. These were obsolete classes and styles that were no longer applied via React and are not required for styling checkboxes in HTML.

### XUITable

- For heading cells, use `xui-readonlytableheadingcell-rightaligned` instead of `xui-readonlytablecell-rightaligned`

### XUIDropdownFooter

- Pickitems inside a XUIDropdownFooter now have a text-black colour, rather than a link-blue colour. This is because blue is used to identify active/selected items. This style change does not require a code change, but will result in a visual change.

### Mixins updates

- `xui-readonlytable-overflow` and `xui-editabletable-overflow` mixins have been removed, use `xui-table-overflow` instead

## XUI React components

- `XUIRow` now uses flexbox by default. As part of this work the `standard` variant has been replaced with an explicit `float` variant. _Note. Codemod will resolve these changes automatically when run._

- `XUITextInput` has been adjusted to make sure that clicking a non-interactive side element which is a icon, text, or avatar focuses the input. _Note. We have purposefully excluded the following side elements from this change: buttons, icon buttons and pills._

### New components

- `XUICheckboxRangeSelector` has been added to allow selecting multiple checkboxes at once while holding `Shift`
  - `XUICheckbox` has 2 new optional props for range selection:
    - `excludeFromRangeSelection` allows individual checkboxes to be excluded from range-select (e.g. "Select all" checkboxes)
    - `rangeSelectionGroup` allows multiple groups of checkboxes to be nested under one `XUICheckboxRangeSelector`
  - `XUICheckboxGroup`, `XUIPicklist`, `XUIEditableTable`, and `XUITable` make use of `XUICheckboxRangeSelector` out of the box

### Improvements to how IDs are built for form controls

The following components have been updated to correctly create a set of accessible element IDs, when supplied with an `id`, a `labelId`, or both. These may cause updates to your snapshots and affect Cypress or Selenium tests.

- `XUIRadio`: IDs passed through the `id` prop will be used as the base for label, hint, and validation element IDs. This previously generated a random base string.
- `XUIRange`: IDs passed through the `id` prop will now be respected and rendered on the control, as well as being used as the base for the IDs on related elements.
- `XUISelectbox` (also affecting `XUIPagination`): If passed an `id`, that ID will be applied to the control itself and used as the root of the related label element ID, rather than the other way around.
- `XUITextInput` (and its consuming components): Only affected if both an `id` and `labelId` are being passed. Both will now be respected, rather than only the `id`.
- `XUIToggleOption`: If passed an `id`, that ID will be applied to the control itself and used as the root of the related label element ID, rather than the other way around.

### Component props

_Note. The codemod will resolve most prop differences automatically when run._

- `XUIButton`, `XUISplitButton` and `XUISplitButtonGroup`
  - The variant `primary` is now called `main`
- `XUIButton`
  - The variant `borderless-primary` is now called `borderless-main`
- `XUICheckbox`
  - `htmlClassName` and `svgClassName` have been combined into `checkboxElementClassName`
  - `checkboxElementClassName` will also be added to the invisible checkbox input element
- `XUIRadio`
  - `htmlClassName` and `svgClassName` have been combined into `radioElementClassName`
  - `radioElementClassName` will also be added to the invisible radio input element
- `XUIDropdownToggled`, `XUIAutocompleter`, `XUIAutocompleterSecondarySearch`, `XUIEditableTableCellAutocompleter`, `XUISelectBox` and `XUIEditableTableCellSelectBox`
  - `matchTriggerWidth` has been converted from a `boolean` into an `enum` of `true | false | 'min'`
  - By setting `matchTriggerWidth` to `'min'`, dropdowns can now have a `min-width` which matches the trigger's width, while also being able to expand to fit longer content

## Other changes

- We have replaced all `/` division operators with `sass:math`'s `math.div()` function. `sass` 2.0 will be removing `/` and this change prevents potential future issues. _Note. This change is under the hood and shouldn't result in any changes required by users._

- The following npm dependencies have had major updates:

  - `autosize`
  - `jest-axe`
  - `victory`

- The public helper method `generateIds` from `helpers/ariaHelpers` now accepts an optional object with properties `labelId` and `id`, rather than an optional string as its argument. Default behaviour when passed no arguments has not changed. The shape of the returned object has not changed, but the internal logic has been updated to handle either a `labelId`, an `id`, or both at the same time.
- The public helper method `generateIdsFromControlId` from `helpers/ariaHelpers` has been removed. Instead, pass the `id` of the control, to `generateIds` as described above.

### Accessibility

- In XUI 18, we introduced console warnings which would be triggered if components did not receive a recommended label prop (for example, a `label`, an `ariaLabel` or a `labelId`).
- In XUI 19, we have escalated these console warnings to console errors. This will require label props to be provided to all affected components under the following scenarios:
  - `XUIEditableTable` and `XUIPagination` require an `ariaLabel`
  - `XUIRange` requires a `label`
  - `XUITable` requires a `caption`
  - `XUIProgressCircular` and `XUIProgressLinear` require an `ariaLabel` or an `ariaLabelledBy`
  - `XUIFileUploader` requires either a `label` or a `labelId`. It also requires an `uploadingIconAriaLabel` and an `errorIconAriaLabel`
  - `XUITextInput` requires either a `label`, a `labelId`, a `placeholder`, or must include a `leftElement` or `rightElement` of `type='text'`
  - `XUICheckbox`, `XUIRadio` and `XUISwitch` require either a child containing text, or a `labelId`
  - `XUIToggleOption` requires a child containing text
  - `XUIAutocompleter` and `XUIButton` require a `loadingAriaLabel` if `isLoading` is true
  - `XUIBarChart` requires a `loadingAriaLabel` if `isLoading` is true, and a `paginationLabel` if `hasPagination` is true
- You may encounter issues if you are using API data to populate these props, if you are rendering these components before the API data has been received. We recommend guarding these API calls, and deferring rendering a component until the required data has been received.
