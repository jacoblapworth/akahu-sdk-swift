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

### New components

- `XUICheckboxRangeSelector` has been added to allow selecting multiple checkboxes at once while holding `Shift`
  - `XUICheckbox` has 2 new optional props for range selection
    - `excludeFromRangeSelection` allows individual checkboxes to be excluded from range-select (e.g. "Select all" checkboxes)
    - `rangeSelectionGroup` allows multiple groups of checkboxes to be nested under one `XUICheckboxRangeSelector`
  - `XUICheckboxGroup`, `XUIPicklist`, `XUIEditableTable`, and `XUITable` make use of `XUICheckboxRangeSelector` out of the box

### Component props

#### Prop Replacements

- `XUICheckbox`
  - `htmlClassName` and `svgClassName` have been combined into `checkboxElementClassName`
    - `checkboxElementClassName` will also be added to the invisible checkbox input element
- `XUIRadio`
  - `htmlClassName` and `svgClassName` have been combined into `radioElementClassName`
    - `radioElementClassName` will also be added to the invisible radio input element
- `XUIDropdownToggled`, `XUIAutocompleter`, `XUIAutocompleterSecondarySearch`, `XUIEditableTableCellAutocompleter`, `XUISelectBox` and `XUIEditableTableCellSelectBox`
  - `matchTriggerWidth` has been converted from a `boolean` into an `enum` of `true | false | 'min'`
  - By setting `matchTriggerWidth` to `'min'`, dropdowns can now have a `min-width` which matches the trigger's width, while also being able to expand to fit longer content

#### Prop Renaming

_Note. The codemod will resolve most prop differences automatically when run._

## Other changes
