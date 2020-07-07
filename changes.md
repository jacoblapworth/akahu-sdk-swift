# XUI 17 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundles analyzer after upgrading (and regularly in general).

## XUI CSS

### Button icon placement

- `xui-button--lefticon` and `xui-button--righticon` are now provided to help with icon placement inside buttons. These should be used with `xui-button-has-icon` and an icon wrapper – see the [button documentation](https://xui.xero.com/17.0.0/section-components-controls-button.html#components-controls-button-9) for full details.

### Icon wrapper updates

- `xui-iconwrapper-medium`’s width and height have been updated from 30px to 32px.
- `xui-iconwrapper-small` and `xui-iconwrapper-xsmall` have been added.

### Consistent styling for Switch, Radio and Checkbox

Switch, Radio and Checkbox now has consistent styling when checked and unchecked. Specifically when checked, all three components have the same focus, hover and active styles. When unchecked, radio and checkbox has the same styling, while switch has further hover and active styles added. Padding for a reversed Radio and Checkbox has been updated from 7px to 15px when when it is under a `xui-styledcheckboxradio-group` and the left margin is removed. Affected classes are:

- `xui-styledcheckboxradio-reversed`.
- `xui-styledcheckboxradio--label`.
- `xui-styledcheckboxradio--input + xui-iconwrapper`.
- `xui-styledcheckboxradio--radio`.
- `xui-switch--control`.

### Removals

Following classes have been **removed** because left space isn't needed for alignment after the "invalid" icon added:

- `xui-styledcheckboxradio--message-with-label`
- `xui-switch--message-with-label`

## XUI React components

- A number of React components have been converted from class-based to functional. You may need to make changes accordingly. Here’s [the list of affected components and more information about the change](https://docs.google.com/document/d/1x2vwW-cYZaX2hVmDk4rQBtoP-pp6Q2PNJbFY5-n7t78/edit).
- We’ve renamed some XUI components and associated props and public methods to standardise the naming convention.
  - Renamed components:
    - `DropDown` → `XUIDropdown`
    - `DropDownToggled` → `XUIDropdownToggled`
    - `DropDownHeader` → `XUIDropdownHeader`
    - `DropDownFooter` → `XUIDropdownFooter`
    - `DropDownPanel` → `XUIDropdownPanel`
    - `NestedDropDown` → `XUINestedDropdown`
    - `NestedPicklist` → `XUINestedPicklist`
    - `NestedPicklistContainer` → `XUINestedPicklistContainer`
    - `NestedPicklistTrigger` → `XUINestedPicklistTrigger`
    - `Pickitem` → `XUIPickitem`
    - `Picklist` → `XUIPicklist`
    - `PicklistDivider` → `XUIPicklistDivider`
    - `PicklistHeader` → `XUIPicklistHeader`
    - `StatefulPicklist` → `XUIStatefulPicklist`
  - Renamed public methods:
    - `XUIAutocompleter` and `XUIAutocompleterSecondarySearch`:
      - `closeDropDown` → `closeDropdown`
      - `openDropDown` → `openDropdown`
    - `XUIDropdownToggled`
      - `closeDropDown` → `closeDropdown`
      - `isDropDownOpen` → `isDropdownOpen`
      - `openDropDown` → `openDropdown`
      - `repositionDropDown` → `repositionDropdown`
    - `SelectBox`
      - `isDropDownOpen` → `isDropdownOpen`
- `XUIStepper`
  - Updated spacing to match other components and 4px grid
- `XUIButton`, `XUISecondaryButton`, `XUISplitButtonGroup`
  - `link` has been removed as a variant of these button types in favour of `borderless-primary`. The styling remains unchanged.
  - Borderless variants of `XUISecondaryButton` and `XUISplitButtonGroup` have been removed due to possible confusion with non-split buttons containing carets. Use `standard`, `primary`, `create`, or `negative` instead.
- `XUIPagination`
  - Numbers in `createPagingContent` and `createCountContent` won't be formatted for internationalization, product teams need to implement it themselves.
- `XUIIcon`
  - `small` and `xsmall` size variants have been added. These change the size of the wrapper _only_ – the icon itself is the same size as the `medium` variant for legibility purposes.
- `XUIButton` can now include an icon attached to the left or right of the button text, for more details see the ['Component props'](#Component-props) section below.

### Removals

- `XUIButtonCaret` has been removed in favour of the prop `hasCaret` on `XUIButton`.
- The following icon props have been removed as they were previously incorrectly added to support internationalisation when they were already internationally recognised symbols:
  - `triggerStateIcon` in XUIAccordionItem.
  - `closeIcon` in XUIBanner.
  - `keyIcon` and `paginationIcon` in XUIBarChart.
  - `icon` in ContentPagination.
  - `icon` in NestedPicklistTrigger.
  - `completedIcon` and `errorIcon` in XUIProgressCircular.
  - `headerSortbuttonIcon` in XUITable.

### Component props

_Note. The codemod will resolve the prop differences automatically when run._

- `XUINestedDropdown` prop `currentPanel` has been renamed to `currentPanelId`.

- `XUIButton` now has `leftIcon` and `rightIcon` props that users can add Icons to display on a button. Only one of these props can be used at a time, and if both are provided only the `leftIcon` will be shown, along with an error fired.

- `XUIButton` now has a `hasCaret` prop to toggle whether the button will have a caret.

- All props that are setting an aria-label has been refactored to have the prefix `aria`.
  - XUIAutocompleter and XUIAutocompleterSecondarySearch `loadingLabel` has been renamed to `loadingAriaLabel`
  - XUIButton and XUISecondaryButton `loadingLabel` has been renamed to `loadingAriaLabel`
  - XUIBarChart `loadingLabel` has been renamed to `loadingAriaLabel`
  - XUIDropdownHeader `backButtonLabel` has been renamed to `backButtonAriaLabel`
  - XUITable
    - `loaderLabel` has been renamed to `loaderAriaLabel`
    - `checkOneRowLabel` has been renamed to`checkOneRowAriaLabel`
    - `checkAllRowsLabel` has been renamed to `checkAllRowsAriaLabel`
  - XUIDatePicker
    - `nextButtonLabel` has been renamed to `nextButtonAriaLabel`
    - `prevButtonLabel` has been renamed to `prevButtonAriaLabel`

### Notable minor and patch changes since 16.0.0

- `XUIDropdown`, `XUIDropdownPanel`, `StatefulPicklist`
  - A new `clearHighlightedItem` method has been added to allow clearing of highlighted items in a dropdown.
- Components exported as default export can now be imported using named import as well as default one. Affected components are:
  - XUIAccordion
  - XUIAutocompleter
  - XUIAvatar
  - XUIBanner
  - XUIButton
  - XUICapsule
  - XUICheckbox
  - XUIDatePicker
  - XUIDropdown
  - XUIIcon
  - XUIIllustration
  - XUIIsolationHeader
  - XUILoader
  - XUIModal
  - XUIPicklist
  - XUIPill
  - XUIProgressIndicator (progressTypes)
  - XUIRadio
  - XUIRange
  - XUIRolloverCheckbox
  - SelectBox
  - XUIStepper
  - XUISwitch
  - XUITable
  - XUITag
  - XUITextInput
  - XUIToast
  - XUIToggle
  - XUITooltip
- `XUIPanel` and `XUIPageHeader` received additional default export.

## Other changes

- For accessibility purposes, components with prop `validationMessage` now have an "invalid" icon in the left of the message.
- `XUITable`
  - The arrow icon for sorting from the header row has been corrected to point up when the values are sorted in ascending order (A -> Z, low -> high), and down when descending. This has never been correct.
- In a previous minor release 16.4.0, we added internationalisation support for various icons. We subsequently identified that the changes were not required for many of these icons as they are internationally recognised symbols. We have corrected this here by reverting all of the unneeded changes. This leaves the following icons still available for internationalisation:
  - `emptyIcon` in XUIAccordion
  - `emptyStateIcon` in XUIBarChart
  - `emptyStateIcon` in Table
