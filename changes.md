# XUI 18 Changes

## Table of Contents

- [Dependencies](#Dependencies)
  - [React 17](#React-17)
  - [Nanoid](#Nanoid-migration)
- [IE11 Support Removed](#IE11-support-removed)
- [CSS Changes](#XUI-CSS)
- [React Component Changes](#XUI-React-components)
  - [Prop Changes](#Component-props)
- [Other changes](#Other-changes)

## Dependencies

Please take some time to check that your projects' `package.json` dependencies match those of XUI's `package.json` dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyser after upgrading (and regularly in general).

### React 17

React has been updated to version 17. Please ensure your repo's version of `react`, `react-dom` and `@types/react` are adjusted to version `^17.0.0` to match XUI's version of React.

React 17 has several breaking changes and these will be separate from breaking changes that XUI includes. If you are upgrading from previous versions of React we advise you to read the [official react 17 blog post](https://reactjs.org/blog/2020/10/20/react-v17.html) before upgrading.

For Enzyme users, please note before upgrading that there is currently no official enzyme adapter and `enzyme-adapter-react-16` will no longer work with React 17 (as of March 2021). We recommend that you take one of the following options:

1. [**Use the unofficial `enzyme-adapter-react-17` package**](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17): While this is not officially endorsed by the Enzyme maintainers, it is a popular package used by many developers using React 17. We are using this library internally after upgrading.

2. [**Migrate to React Testing Library**](https://testing-library.com/): This is the testing library officially endorsed by the React team. We are beginning to trial this library internally, and are seeing some positive results in terms of ease of development.

### Nanoid migration

XUI React components now use `nanoid` instead of `uuid` to generate ids. This package has been chosen as it is [significantly faster than `uuid` and is a much smaller package while maintaining comparable randomisation capabilities](https://github.com/ai/nanoid#comparison-with-uuid).
If you are currently mocking the `uuid` package to change ids used by XUI components in your unit tests you will need to install the [`nanoid` package](https://www.npmjs.com/package/nanoid) and change your code to use this package instead.

## IE11 support removed

We have removed IE11 support for XUI in line with [Xero's decision to discontinue IE11 support for all products (except WFM and XPM) effective as of 1 December 2020](https://xero.slack.com/archives/C63PJSH25/p1606789311155600). The changes in this release includes alterations to existing components, styles and documents to remove workarounds and content specifically made for IE11 support.

_Note: This will mean that many key functionalities that worked for IE11 users prior to this version will no longer function as before._

## XUI CSS

### File Uploader

- `xui-fileuploader--fileitem--loading` now presents a static progress icon
- `xui-fileuploader--fileitem--loading-indeterminate` can be applied alongside `xui-fileuploader--fileitem--loading` to present a spinning progress icon

### Carets

- `xui-button--caret` and `xui-iconwrapper` are no longer used together
  - Use `xui-button--caret` for carets that sit alongside other content
  - Use `xui-iconwrapper` for carets that sit on their own, such as those in split buttons

### PickItems

- `xui-pickitem--body-has-leftelement` should be added to the pickitem body element when a left element is present (not required if using React `XUIPickitem` component)
- `xui-pickitem--body-has-rightelement` should be added to the pickitem body element when a right element is present (not required if using React `XUIPickitem` component)

### Control Groups

- `xui-styledcheckboxradio-group` should appear alongside `xui-controlgroup` plus a modifier class of `xui-controlgroup-vertical`. This will be addressed by the codemod.
- `xui-switch-group` should appear alongside `xui-controlgroup` plus a modifier class of `xui-controlgroup-vertical`. This will be addressed by the codemod.

### XUIAutocompleter

- The wrapping div of an autocompleter will now have a class of `xui-autocompleter` applied. This will be used for styling when it appears inside a control group, in an upcoming release. This will NOT be addressed by the codemod.

### XUITextInput and all consuming components

- The element with a class of `xui-textinputwrapper` will additionally have a class of `xui-textinputwrapper-is-invalid`, when invalid. This will be used for styling when the component appears inside a control group, in an upcoming release. This will NOT be addressed by the codemod.

### XUISelectBox and all consuming components

- The wrapping div of a select box will now have a class of `xui-selectwrapper` applied. When the contained select box is invalid, this element will also get a class of `xui-selectwrapper-is-invalid`. These new classes will be used for styling when the component appears inside a control group, in an upcoming release. They will NOT be addressed by the codemod.
- Addtionally, the element that often has a class of `xui-select-layout` will now also have a root class of `xui-select` applied. This will be used for styling when the component appears inside a control group, in an upcoming release. This will be addressed by the codemod, where possible, however `xui-select-layout` is not always present.

### XUIEditableTable

- Default colour and font weight have been removed from `XUIEditableTableFoot`
- `xui-editabletable--column-hidden` has been removed from the docs, because it was not implemented nor used anywhere

### XUITable

- Captions are now handled by adding an `aria-label` to the table element
- XUITable's cell contents will now vertically align to the top of the cell instead of the middle

#### XUITable classes

- `xui-table--*` classes have been renamed to `xui-readonlytable*`
  - `xui-table-wrapper` -> `xui-readonlytablewrapper`
  - `xui-table` -> `xui-readonlytable`
  - `xui-table--head` -> `xui-readonlytablehead`
  - `xui-table--body` -> `xui-readonlytablebody`
  - `xui-table--row` -> `xui-readonlytablerow`
  - `xui-table--cell` -> `xui-readonlytablecell`
  - `xui-table--row-link` -> `xui-readonlytablerow-link`
  - `xui-table--cell-link` -> `xui-readonlytablecell-link`
  - `xui-table--cell-action` -> `xui-readonlytablecell-action`
  - `xui-table--checkbox-head` -> `xui-readonlytable--checkbox-head`
  - `xui-table--checkbox-body` -> `xui-readonlytable--checkbox-head`
- `xui-heading-separator` has been replaced with `xui-readonlytableheadingcell` (only for tables)
- `xui-panel` has been replaced with `xui-readonlytable-hasborder` (only for tables)
- `xui-table-responsive` has been replaced with `xui-readonlytablewrapper--scrollcontainer` and should be nested under `xui-readonlytable-hasborder` when applicable (see [our XUITable documentation](https://xui.xero.com/18.0.0/section-components-displayingdata-table.html#components-displayingdata-table-4) for examples)
- `xui-table--cell-divider` has been removed and is no longer needed
- `xui-readonlytableheadingcell--placeholder` and `xui-readonlytablecell--placeholder` have been added
  - Used to set the size of checkboxes and/or overflow menu cells in rows without checkboxes and/or overflow menus
- Classes for pinned actions have also been renamed
  - `xui-table-pinleft` -> `xui-readonlytable-pinfirst`
  - `xui-table-pinright` -> `xui-readonlytable-pinright`
  - `xui-table-overflowleft` -> `xui-readonlytableoverflow-pinoverflowleft`
  - `xui-table-overflowright` -> `xui-readonlytableoverflow-pinoverflowright`

### ToggleOptions

XUIToggleOption now includes updated padding, horizontal and vertical, for both medium and small variants. If you currently apply utility classes to provide your own horizontal padding, they are expected to still take precedence, but you may be able to remove them to leverage the default layout. You will see a change to the overall height of ALL "small" toggles and all "medium" toggles that have multi-line content.

### Typography variables updates

All `font-size` and `line-height` variables are now using the `rem` unit to support browser-based text sizing.

### Mixins updates

- Inset version of `xui-shadow-border-*` mixins now show up on the right side. You need to update the mixin to the opposite direction to make sure they keep the same.
  - e.g. `xui-shadow-border-bottom($xui-standard-border-color, true)` should be updated to `xui-shadow-border-top($xui-standard-border-color, true)`

## XUI React components

### Refs implementation made consistent across XUI

The following components have had refs updated to be implemented with `React.createRef()`, for a more consistent approach across the library. If you are calling or manipulating any of these refs, you may need to update those references to use `nameOfRef.current`.

- `XUIAutocompleter` refs: `dropdown` and `inputNode`
- `XUIAutocompleterSecondarySearch` refs: `ddt` and `dropdown`
- `XUIButton` refs: `rootNode`
- `XUIDropdownToggled` refs: `trigger` and `dropdown`
- `XUIIconButton` refs: `rootNode`
- `XUIModal` ref: `_maskNode` and `_modalNode` (applications should not be using these internal properties)
- `XUINestedPicklistTrigger` refs: `rootNode`
- `XUIRolloverCheckbox` refs: `_checkbox` (applications should not be using this internal property)
- `XUISelectBox` refs: `ddt` and `trigger`
- `XUIStepper` refs: `rootNode`
- `XUITable` refs: `rootNode`, `wrapperNode` and `tableNode`

TypeScript types have also been made slightly more strict for instances of rootNode, as a result of this cleanup.

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

### Component props

Please note we strongly recommend use of the codemod for this upgrade, as a large number of props have been renamed. The codemod will automate this renaming process, which should reduce a lot of overhead in the upgrade process.

#### Prop Replacements

- `XUIPicklist`
  - `onMouseDown` replaced with `onClick`

#### Prop Renaming

- `XUIAutocompleter`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`
  - `loading` renamed to `isLoading`
- `XUIAutocompleterSecondarySearch`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`
- `XUIBanner`
  - `defaultLayout` renamed to `hasDefaultLayout`
- `XUIButton`
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`
- `XUIDropdown`
  - `fixedWidth` renamed to `hasFixedWidth`
- `XUIDropdownLayout`
  - `fixedWidth` renamed to `hasFixedWidth`
- `XUIEditableTableCellAutocompleter`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`
  - `loading` renamed to `isLoading`
- `XUIEditableTableCellSelectBox`
  - `buttonClasses` renamed to `buttonClassName`
  - `containerClasses` renamed to `containerClassName`
  - `defaultLayout` renamed to `hasDefaultLayout`
  - `dropDownClasses` renamed to `dropdownClassName`
  - `inputGroupClasses` renamed to `inputGroupClassName`
- `XUIEditableTableCellTextInput`
  - `focusByDefault` renamed to `focusOnMount`
- `XUIIconButton`
  - `desc` renamed to `description`
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`
- `XUIIcon`
  - `desc` renamed to `description`
- `XUILoader`
  - `defaultLayout` renamed to `hasDefaultLayout`
- `XUIModal`
  - `defaultLayout` renamed to `hasDefaultLayout`
- `XUINestedDropdown`
  - `fixedWidth` renamed to `hasFixedWidth`
- `XUIPicklist`
  - `defaultLayout` renamed to `hasDefaultLayout`
- `XUIStatefulPicklist`
  - `canFocus` renamed to `isFocusable`
- `XUIRange`
  - `containerClasses` renamed to `containerClassName`
  - `inputClasses` renamed to `inputClassName`
- `XUISecondaryButton`
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`
- `XUISelectBox`
  - `buttonClasses` renamed to `buttonClassName`
  - `containerClasses` renamed to `containerClassName`
  - `defaultLayout` renamed to `hasDefaultLayout`
  - `dropDownClasses` renamed to `dropdownClassName`
  - `inputGroupClasses` renamed to `inputGroupClassName`
- `XUISelectBoxOption`
  - `optionClasses` renamed to `optionClassName`
  - `truncatedText` renamed to `truncateText`
- `XUITextInput`
  - `focusByDefault` renamed to `focusOnMount`
- `XUIToast`
  - `defaultLayout` renamed to `hasDefaultLayout`
- `XUITooltip`
  - `limitWidth` renamed to `hasLimitedWidth`

_Note. The codemod will resolve most prop differences automatically when run._

## Other changes

### Accessibility

- Corrections to `role` attributes to meet WCAG 2.1 AA Standard, these changes may influence your snapshot tests
  - `XUITag`: `role=”status”` has been removed
  - `XUISelectBox`: default `role` value has been updated to `listbox`
  - `XUIDropdownPanel`: `role="presentation` and `role="listbox"` have been removed
  - `XUIDropdownToggled`: default `role="presentation"` has been removed
  - `XUIDropdown`: If children `XUIPicklist` / `XUIPickitem` components are provided, they will now have a role of `listbox` / `option`
  - `XUIPicklist`:
    - Default `role` value has been removed
    - `role` value `tree` will be applied if it has a child `XUINestedPicklistContainer`
  - `XUIPickitem`: default `role` value has been removed
  - `XUINestedPicklist`
    - Default `role` value has been updated to `group`
    - If a child `XUIPickitem` component is provided, this will now have a role of `treeitem`
  - `XUIStatefulPicklist`: default `role` value has been removed
  - `XUINestedPicklistTrigger`: `role="button"` has been removed
  - `XUIControlWrapperInline`: `role="presentation"` has been removed
    - This element is a control wrapper used in multiple other XUI components. The following XUI components have been affected and your snapshot tests may need to be updated:
      - `XUICheckbox`, `XUIRadio`, `XUIRolloverCheckbox`, `XUISwitch`, `XUIToggleOption`
      - `XUIPickitem` - multiselect variant only (where `isMultiselect` prop has been set to `true`)
      - `XUITable` - checkbox variant only (where `hasCheckbox` prop has been set to `true`)
      - `XUISelectBoxOption` - multiselect variant only (where `showCheckboxes` prop has been set to `true`)
- `XUIAutocompleter`: `aria-expanded={false}`has been added when the dropdown is collapsed, which may require your snapshot tests to be updated
- `XUIStepper`: for variants where a `lockLayout` prop is not provided, the generated ids have been updated to prevent clashes, which may require your snapshot tests to be updated
- `XUIFileUploader`: `errorIconAriaLabel` and `uploadingIconAriaLabel` props have been added in order to supply an `aria-label` to each of the generated `uploading` and `error` progress icons
- `XUIPicklist`: `ariaLabel` prop has been added in order to supply an `aria-label` to the picklist. This is recommended when a picklist is being used inside a `XUIDropdown` or `XUIDropdownPanel`

### Resize observers

A few changes have been made to the XUI `resizeObserver` helper in order to bring the API in line with our `useResizeObserver` Hook.

- `resizeObserver` no longer exports `getWidthClasses`. This has been moved to the `containerQuery` helper. Please refer to the [container queries](https://xui.xero.com/latest/react/#container-queries) section of our docs and update your code to use the `containerQuery` helper if you wish to retain this functionality.
- `resizeObserver` no longer allows custom breakpoints to be set via `_breakpoints`. This has been moved to the `containerQuery` helper. Please refer to the [container queries](https://xui.xero.com/latest/react/#container-queries) section of our docs and update your code to use the `containerQuery` helper if you wish to retain this functionality.
- The `_onResize` function will return the `contentRect` rather than the `contentRect.width`. This will allow the ability to apply changes on resize of other `contentRect` parameters.
