# XUI 18 Changes

## React 17

React has been updated to version 17. Please ensure your repo's version of `react`, `react-dom` and `@types/react` are adjusted to version `^17.0.0` to match XUI's version of React.

React 17 has several breaking-changes and these will be separate from breaking changes that XUI includes. If you are upgrading from previous versions of React we advise you to read the [official react 17 blog post](https://reactjs.org/blog/2020/10/20/react-v17.html) before upgrading.

For Enzyme users, please note before upgrading that there is currently no official enzyme adapter and `enzyme-adapter-react-16` will no longer work with React 17 (as of March 2021). We recommend that you take one of the following options:

1. [**Use the unofficial `enzyme-adapter-react-17` package**](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17): While this is not officially endorsed by the Enzyme maintainers, it is a popular package used by many developers using React 17.

2. [**Migrate to using the React Testing Library **](https://testing-library.com/): This is the testing library officially endorsed by the React team.

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundles analyzer after upgrading (and regularly in general).

### Nanoid

- XUI react components now use `nanoid` instead of `uuid` to generate ids. This package has been chosen as it [is significantly faster than `uuid` and is a much smaller package while maintaining comparable randomisation capabilities](https://github.com/ai/nanoid#comparison-with-uuid). If you are currently mocking the `uuid` package to change ids used by XUI components in your unit tests you will need to install the [`nanoid` package](https://www.npmjs.com/package/nanoid) and change your code to use this package instead.

## IE 11 support removed

We have removed IE11 support for XUI in line with [Xero's decision to discontinue IE11 support for all products (except WFM and XPM) effective as of 1 December 2020](https://xero.slack.com/archives/C63PJSH25/p1606789311155600). The changes in this release includes alterations to existing components, styles and documents to remove workarounds and content specifically made for IE11 support.

_Note: This will mean that many key functionalities that worked for IE11 users prior to this version will no function as before._

## XUI CSS

### File Uploader

- `xui-fileuploader--fileitem--loading` now presents a static progress icon.
- `xui-fileuploader--fileitem--loading-indeterminate` can be applied alongside `xui-fileuploader--fileitem--loading` to present a spinning progress icon.
- `FileObject` now accepts an `uploadProgressPercentage` prop for visually communicating the upload progress.

### Carets

- `xui-button--caret` and `xui-iconwrapper` are no longer used together.
  - Use `xui-button--caret` for carets that sit alongside other content.
  - Use `xui-iconwrapper` for carets that sit on their own, such as those in split buttons.

### PickItems

- `xui-pickitem--body-has-leftelement` should be added to the pickitem body element when a left element is present (not required if using React `XUIPickitem` component).
- `xui-pickitem--body-has-rightelement` should be added to the pickitem body element when a right element is present (not required if using React `XUIPickitem` component).

### XUITable

- Captions are now handled by adding an `aria-label` to the table element.
- XUITable's cell contents will now vertically align to the top of the cell instead of the middle.

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

- All `font-size` and `line-height` variables are using `rem` unit now to support browser-based text sizing.

### Removals

## XUI React components

### Refs implementation made consistent across XUI

The following components have had refs updated to be implemented with `React.createRef()` so this approach is used to instantiate refs more consistently across the library. If you are calling or manipulating any of these refs, you may need to update those references to use `nameOfRef.current`

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
- All `XUIAccordion`-related `qahook`s have been updated to use a `--` instead of a single `-`, in line with XUI naming conventions.
  - e.g. `{qaHook}-empty` has been renamed to `{qaHook}--empty`

### XUITable

- Captions are now handled by adding an `ariaLabel` to the table element.
- XUITable's cell contents will now vertically align to the top of the cell instead of the middle.

### Removals

### Component props

#### Replacements

- `XUIPicklist`
  - `onMouseDown` replaced with `onClick`.

#### Renaming

- `XUIAutocompleter`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`.
  - `loading` renamed to `isLoading`.
- `XUIAutocompleterSecondarySearch`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`.
- `XUIBanner`
  - `defaultLayout` renamed to `hasDefaultLayout`.
- `XUIButton`
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`.
- `XUIDropdown`
  - `fixedWidth` renamed to `hasFixedWidth`.
- `XUIDropdownLayout`
  - `fixedWidth` renamed to `hasFixedWidth`.
- `XUIEditableTableCellAutocompleter`
  - `dropdownFixedWidth` renamed to `dropdownHasFixedWidth`.
  - `loading` renamed to `isLoading`.
- `XUIEditableTableCellSelectBox`
  - `buttonClasses` renamed to `buttonClassName`.
  - `containerClasses` renamed to `containerClassName`.
  - `defaultLayout` renamed to `hasDefaultLayout`.
  - `dropDownClasses` renamed to `dropdownClassName`.
  - `inputGroupClasses` renamed to `inputGroupClassName`.
- `XUIEditableTableCellTextInput`
  - `focusByDefault` renamed to `focusOnMount`.
- `XUIIconButton`
  - `desc` renamed to `description`.
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`.
- `XUIIcon`
  - `desc` renamed to `description`.
- `XUILoader`
  - `defaultLayout` renamed to `hasDefaultLayout`.
- `XUIModal`
  - `defaultLayout` renamed to `hasDefaultLayout`.
- `XUINestedDropdown`
  - `fixedWidth` renamed to `hasFixedWidth`.
- `XUIPicklist`
  - `defaultLayout` renamed to `hasDefaultLayout`.
- `XUIStatefulPicklist`
  - `canFocus` renamed to `isFocusable`.
- `XUIRange`
  - `containerClasses` renamed to `containerClassName`.
  - `inputClasses` renamed to `inputClassName`.
- `XUISecondaryButton`
  - `minLoaderWidth` renamed to `hasMinLoaderWidth`.
- `XUISelectBox`
  - `buttonClasses` renamed to `buttonClassName`.
  - `containerClasses` renamed to `containerClassName`.
  - `defaultLayout` renamed to `hasDefaultLayout`.
  - `dropDownClasses` renamed to `dropdownClassName`.
  - `inputGroupClasses` renamed to `inputGroupClassName`.
- `XUISelectBoxOption`
  - `optionClasses` renamed to `optionClassName`.
  - `truncatedText` renamed to `truncateText`.
- `XUITextInput`
  - `focusByDefault` renamed to `focusOnMount`.
- `XUIToast`
  - `defaultLayout` renamed to `hasDefaultLayout`.
- `XUITooltip`
  - `limitWidth` renamed to `hasLimitedWidth`.

_Note. The codemod will resolve most prop differences automatically when run._

## Other changes

- Corrections to `role` attributes to meet WCAG 2.1 AA Standard, these changes may influence your snapshot tests.
  - `XUITag`: `role=”status”` has been removed.
  - `XUIPicklist`: default `role` value has been updated to `tree`.
  - `XUIPickitem`: default `role` value has been updated to `treeitem`.
  - `XUISelectBox`: default `role` value has been updated to `listbox`.
  - `XUIAutocompleter`: `aria-expanded={false}`has been added when the dropdown is collapsed.

### Resize observers

A few changes have been made to the XUI `resizeObserver` helper in order to bring the API in line with our `useResizeObserver` Hook.

- `resizeObserver` no longer exports `getWidthClasses`. This has been moved to the `containerQuery` helper. Please refer to the [container queries](https://xui.xero.com/latest/react/#container-queries) section of our docs and update your code to use the `containerQuery` helper if you wish to retain this functionality.
- `resizeObserver` no longer allows custom breakpoints to be set via `_breakpoints`. This has been moved to the `containerQuery` helper. Please refer to the [container queries](https://xui.xero.com/latest/react/#container-queries) section of our docs and update your code to use the `containerQuery` helper if you wish to retain this functionality.
- The `_onResize` function will return the `contentRect` rather than the `contentRect.width`. This will allow the ability to apply changes on resize of other `contentRect` parameters.
