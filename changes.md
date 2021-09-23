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

### XUIAccordion

- `XUIAccordion` continues to support a `qaHook` property, however this value will no longer be passed down to its `XUIAccordionItem` child component/s. This allows each individual `XUIAccordionItem` to have its own unique `data-automationid`. If you are using markup snapshots or using these generated `data-automationid`s for your testing, these will need to be updated accordingly.
- `XUIAccordionItem` now supports its own `qaHook` property which, if provided, will add a `data-automationid` to the accordion item itself, as well as its child `trigger` and `content` elements.
- All `XUIAccordion`-related `qaHook`s have been updated to use a `--` instead of a single `-`, in line with XUI naming conventions.
  - e.g. `{qaHook}-empty` has been renamed to `{qaHook}--empty`

### XUIBanner

- Removed hard-coded English-language string for the close button label. This must now be provided by the implementer in order to enable a better localised experience.
- A new `closeButtonLabel` prop has been added, which is required when an `onCloseClick` prop has been provided. This prop will provide the `title` and `aria-label` for the close button. Recommended English value is "Close".

### XUIDateInput

- `locale`, `nextButtonAriaLabel`, and `prevButtonAriaLabel` are now required to reflect the same changes in `XUIDatePicker`.
- Labels are now required on inputs, but not input groups.

### XUIDatePicker

- `XUIDatePicker` will now localise month and day names, text direction, and first day of the week automatically based on the `locale` you pass in, which is now required. Defaults for these props have been removed accordingly, and some new QA hooks have been added to assist in testing this functionality.
- `nextButtonAriaLabel` and `prevButtonAriaLabel` are now required. This aligns with how labels are handled in other components.

### XUIEditableTable

- Drag and drop can now be triggered with the `enter` key. The recommended text for XUIEditableTable's `dndInstructions` is now:
  - "Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the
    item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass
    through key."
- Support for sorting table rows by column has been added

### XUIFileUploader

- `FileObject` now accepts an `uploadProgressPercentage` prop for visually communicating the upload progress
- `FileObject` now accepts a `hideRetryButton` prop to hide the retry button where it doesn't make sense to have it

### XUIRange

- Now accepts a `labelId` prop, as many other controls do, to allow accessibly connecting a label that exists outside the component.

### XUISelectBox

- qaHooks have been tidied up. Triple hyphens on sub-elements' hooks have been converted to double hyphens, and `--label--label` has been updated to `--label`.

### XUITextInput

- If no label is provided, but a XUITextInputSideElement is supplied with a type of "text", the rendered markup will adjust to make the side element the implied label for the input. This is an accessibility improvement.

### XUITable

- Captions are now handled by adding an `ariaLabel` to the table element
- XUITable's cell contents will now vertically align to the top of the cell instead of the middle
- XUITable now supports server side rendering
- XUITable now has the `hiddenColumns` prop which can be used to show/hide columns

### XUIToast

- Removed hard-coded English-language string for the close button label. This must now be provided by the implementer in order to enable a better localised experience.
- A new `closeButtonLabel` prop has been added, which is required when an `onCloseClick` prop has been provided. This prop will provide the `title` and `aria-label` for the close button. Recommended English value is "Close".

### XUICheckboxRangeSelector

- `XUICheckboxRangeSelector` has been added to allow selecting multiple checkboxes at once while holding `Shift`
  - `XUICheckbox` has 2 new optional props for range selection:
    - `excludeFromRangeSelection` allows individual checkboxes to be excluded from range-select (e.g. "Select all" checkboxes)
    - `rangeSelectionGroup` allows multiple groups of checkboxes to be nested under one `XUICheckboxRangeSelector`
  - `XUICheckboxGroup`, `XUIPicklist`, `XUIEditableTable`, and `XUITable` make use of `XUICheckboxRangeSelector` out of the box

### Component props

_Note. The codemod will resolve most prop differences automatically when run._

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
