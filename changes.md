# XUI 20 Changes

## Table of Contents

- [Dependencies](#Dependencies)
- [CSS Changes](#XUI-CSS)
  - [Removals](#CSS-Removals)
  - [Other Changes](#Other-CSS-changes)
- [React Component Changes](#XUI-React-components)
  - [New Components](#New-components)
  - [Prop Changes](#Component-props)
- [Other Changes](#Other-changes)

## Dependencies

Please take some time to check that your projects' `package.json` dependencies match those of XUI's `package.json` dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyser after upgrading (and regularly in general).

## XUI CSS

### CSS Removals

- Removed `xui-switch-group-is-invalid` and `xui-styledcheckboxradio-group-is-invalid` classes. Use `xui-controlgroup-is-invalid` instead. This will be addressed by the codemod.
- Removed `xui-verticaltextinputgroup`. Use `xui-controlgroup xui-controlgroup-vertical` instead. This will be addressed by the codemod, but additional adjustments may be required.
- Removed `xui-textinputgroup` and `xui-inputgroup`. Replace with `xui-controlgroup xui-controlgroup-horizontal`. This will be addressed by the codemod, but additional adjustments may be required.
- Removed `xui-selectwrapper` with no replacement, as it is no longer necessary.

### Other CSS changes

- React components for `XUIAutocompleter` `XUISelectBox` and `XUIDateInput` have had their markup slightly modified, such that any visible labels are now sibling elements of the trigger. This should not result in any behaviour change.
- For `XUIDateRangeInput`, markup has been significantly modified to support a more robust CSS grid layout, under the hood. The new structure supports greater flexibility in the lengths of labels, hints, and validation messages, while maintaining alignment between the controls. See the [examples in the Guide](https://xui.xero.com/20.0.0/section-components-collectinginput-dateinput.html) to construct these with hand-coded HTML.
- The way element IDs are generated has changed slightly for `XUIAutocompleter`. You may need to update your tests.
- Focus state was updated across whole XUI. Affected components: `XUICheckbox`, `XUIEditableTable`, `XUIRadio`, `XUIButton`, `XUITextInput`, `XUIAccordion`, `XUIDatePicker`, `XUIRange`, `XUISwitch`, `XUIBreadcrumb`, `XUIPickItem`, `XUIPill`, `XUIStepper`, `XUITable`, `XUIToggle` and other components using the listed ones.

## XUI React components

- `XUIDateInput` default visual appearance has changed to show the `date-start` icon next to the input. This can be changed using the new `inputIcon` prop.

- `XUIDateRangeInput` default visual appearance has changed to show the `date-start` icon next to the first input, and the `date-end` icon next to the second input.

- `XUICheckboxGroup`, `XUIRadioGroup`, and `XUISwitchGroup` now support horizontal grouping and the `swapAtBreakpoint` to dictate when the group switches from horizontal to vertical grouping. Default behaviour remains unchanged from prior versions.

- `XUIEditableTableFootAction` has been split into two components: `XUIEditableTableFootActions` (the table row) and `XUIEditableTableFootAction` (the action button). This enables multiple action components to be placed inside an editable table footer, where previously only one action was possible.
  - If you have been using `XUIEditableTableFootAction`, you will need to update your React code. The correct new structure is:
    ```
    <XUIEditableTableFoot>
      <XUIEditableTableFootActions>
        <XUIEditableTableFootAction .../>
      </XUIEditableTableFootActions>
    </XUIEditableTableFoot>
    ```
  - If you were providing `className` and `qaHook` props to `XUIEditableTableFootAction`, these props should now be provided to `XUIEditableTableFootActions` instead.
    - `XUIEditableTableFootAction` now has its own separate `className` and `qaHook` props

### New components

- `XUIControlGroup` has been introduced. It allows visual and accessible grouping of `XUITextInput`, `XUIDateInput`, `XUIAutocompleter`, `XUISelectBox`, `XUIButton`, `XUIButtonGroup`, and `XUISplitButton`. Additionally, `XUIControlGroup` can be used to group `XUICheckbox`, `XUIRadio`, and `XUISwitch` accessibly but _without_ the visual styling added when using their respective `*Group` components. This replaces the prior CSS-only feature associated with `xui-inputgroup` and `xui-textinputgroup`.

### Updated focus/tab navigation for dropdowns

The new focus/navigation behaviour for dropdown components that we added in 19.2.0 is now the default behaviour. This new behaviour fixes a number of navigation bugs in these components, and shifts them to behave as more of a `combobox` role, rather than a `modal` role.

As part of this change we have deprecated `useNewFocusBehaviour`, `isLegacyDisplay`, `restrictFocus` and `closeOnTab` props.

We have also amended the default values of some of these deprecated props:

- `useNewFocusBehaviour` is set to `true` by default
- `restrictFocus` is set to `false` by default
- `closeOnTab` is set to `false` by default

You will still be able to access these deprecated props, but just keep in mind that these will be removed in XUI 21.

To apply the old dropdown behaviour, set the following props in `XUIDropdown` and `XUIDropdownToggled`:

- `useNewFocusBehaviour` to `false`
- `restrictFocus` to `true`
- `closeOnTab` to `true`

The following components that use `XUIDropdown` and `XUIDropdownToggled` under the hood are affected by this change:

- `XUIDropdown`, `XUIDropdownToggled`, `XUISelectBox`, `XUISelectBoxOption`, `XUIAutocompleter`, `XUIAutocompleterSecondarySearch`, `XUISplitButtonGroup`, `XUIEditableTableCellSelectBox`, `XUIEditableTableCellAutocompleter`and `XUIEditableTableCellAutocompleterSecondarySearch`: by setting `useNewFocusBehaviour`, `XUIDateInputItem`, `XUIDateRangeInput` and overflow dropdowns in `XUITable`.

### Component props

_Note. The codemod will resolve most prop differences automatically when run._

- `XUIDateInput`
  - Now has an `inputIcon` prop to allow the icon displayed next to the input to be changed
- `XUIEditableTableFootAction`
  - `addButtonContent` has been renamed to `buttonContent`
  - `onAdd` has been renamed to `onClick`

## Other changes

### Accessibility
