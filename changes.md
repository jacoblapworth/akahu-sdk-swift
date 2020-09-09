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

### Consistent styling for switch, radio, and checkbox

Switch, radio, and checkbox now have consistent styling when checked and unchecked. Specifically when checked, all three components have the same focus, hover and active styles. When unchecked, radio and checkbox have the same styling, while switch has further hover and active styles added. Padding for a reversed radio and checkbox has been updated from 7px to 15px when when it is under a `xui-styledcheckboxradio-group` and the left margin is removed. Affected classes are:

- `xui-styledcheckboxradio-reversed`.
- `xui-styledcheckboxradio--label`.
- `xui-styledcheckboxradio--input + xui-iconwrapper`.
- `xui-styledcheckboxradio--radio`.
- `xui-switch--control`.

### Safari margin collapse fix

Safari’s margin collapse behavior causes compositions to bump up against the bottom of the page even when using the `hasAutoSpaceAround` property.

To fix this we added `-webkit-margin-bottom-collapse: separate;` to `xui-body`.

There should not be any regressions, but please check that the bottom of your pages still look correct after updating to XUI 17, even if you do not use compositions.

### Banner layout changes

`xui-banner-layout` previously had its `layout` property set to `inline-block`. This has been changed to `block`.

### Typography changes

A new `2xlarge` typography scale has been added with `font-size: 30px` and `line-height: 44px`. The existing `2xlarge` and `3xlarge` type scales have been renamed to `3xlarge` and `4xlarge` respectively.

There have been changes to the typography Sass variables and mixins, so any teams consuming these will need to update any styling using these, as they won't be covered by the codemod.

Added classes/variables/mixins are:

- `xui-font-size-2xlarge`
- `xui-line-height-2xlarge`
- `xui-heading-2xlarge`
- `xui-text-2xlarge`

Changed classes/variables/mixins are:

- `xui-font-size-2xlarge` > `xui-font-size-3xlarge`
- `xui-font-size-3xlarge` > `xui-font-size-4xlarge`
- `xui-line-height-2xlarge` > `xui-line-height-3xlarge`
- `xui-line-height-3xlarge` > `xui-line-height-4xlarge`
- `xui-heading-2xlarge` > `xui-heading-3xlarge`
- `xui-heading-3xlarge` > `xui-heading-4xlarge`
- `xui-text-2xlarge` > `xui-text-3xlarge`
- `xui-text-3xlarge` > `xui-text-4xlarge`

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
    - `SelectBox` → `XUISelectBox`
    - `SelectBoxOption` → `XUISelectBoxOption`
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
    - `XUISelectBox`
      - `isDropDownOpen` → `isDropdownOpen`
- `XUIRolloverCheckbox`
  - Changed the component’s filename and associated import paths to match the exported component name. The main XUI export file remains unchanged; so if you import from `@xero/xui/react/rollovercheckbox`, this will not affect you.
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
- `XUITable` has long supported a `qaHook`, but if provided, this value will now also be added to a unique `data-automationid` for each row and checkboxes and overflow menus for each row. If you are using markup snapshots, they may need to be updated accordingly.

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
  - XUIPanelSection
    - `headerText` has been renamed to `heading` and now can accept a node for better internationalisation support.

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
  - XUISelectBox
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
  - We've removed the `width: 100%` CSS property from table headers containing a sort button. The sortable column will no longer squash other columns to get the most width possible.
- In a previous minor release 16.4.0, we added internationalisation support for various icons. We subsequently identified that the changes were not required for many of these icons as they are internationally recognised symbols. We have corrected this here by reverting all of the unneeded changes. This leaves the following icons still available for internationalisation:

  - `emptyIcon` in XUIAccordion
  - `emptyStateIcon` in XUIBarChart
  - `emptyStateIcon` in Table

### TypeScript support

With XUI 16.2.0 we are shipping TypeScript definitions for our components with XUI.

`xui-types` will no longer be actively maintained as of XUI 16.2.0, so while your current implementation will likely continue to work for a while, we recommend upgrading to embedded XUI types at your earliest convenience. You can do this by deleting any pre-existing reference to `xui-types` in the `paths` attribute in the `CompilerOptions` of your `tsconfig.json` file.

The type definitions we provide are slightly different from those of `xui-types`, below are things you might need to change.

1. The shape of our component's props are not exported. You can still access these types by using React's ComponentProps helper.

```diff
interface Props {
- spreadProps?: XUIComponentProps;
+ spreadProps?: React.ComponentProps<typeof XUIComponent>`.
}
```

2. We do not export types for our private helpers. These types are usually used to copy the type of
   a prop for a component. To do this, we recommend the following approach instead.

```diff
interface Props {
- size?: SizeClassNamesKeys;
+ size?: React.ComponentProps<typeof XUIComponent>['size'];
}
```

If this doesn't meet your needs you can also access these types by using `keyof` and `typeof`.

```diff
interface Props {
- size?: SizeClassNamesKeys;
+ size?: keyof typeof sizeClassNames;
}
```

### Invisible touch targets

Components with a fixed with and height now have an invisible touch target around them that has a minimum width and height of 40px. Visit [our documentation for touch targets](https://xui.xero.com/16.0.0/section-getting-started-responsive.html#getting-started-responsive-3) for more information. If you use our CSS components please refer to [this list of components that will need updating](#invisible-touch-targets). If you use our React components then touch targets have been added already.

Components with invisible touch targets:

- [XUIIconButton](https://xui.xero.com/16.0.0/react/#icon-button)
- [XUICheckbox](https://xui.xero.com/16.0.0/react/#checkbox) and [XUIRolloverCheckbox](https://xui.xero.com/16.0.0/react/#rollover-checkbox)
- [XUIRadio](https://xui.xero.com/16.0.0/react/#radio)
- [XUISwitch](https://xui.xero.com/16.0.0/react/#switch)
