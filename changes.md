# XUI 16 Changes

For a step-by-step guide to upgrading, refer to the [Upgrade Guide](https://docs.google.com/document/d/1A2kCB_etKBJhO7oGMPCzKFkKE56p9-tpGoZJl5qsZmI/edit?usp=sharing).

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## XUI CSS

Button, TextInput, Pill, Table, Range, Tag, Progress indicator, Picklist, and Horizontal Pickitem have all had style adjustments (often setting a min-width of 40px on some part of the component), to improve the size of their interactive targets for touch devices. Be sure to check these components for visual regressions in your application.

XUI had previously provided a set of z-index variables to indicate where elements should stack in the third dimension, but those variables had not actually been used internally to style XUI components. Components now use them, and variables and documentation have been updated to better reflect how stacking occurs in XUI. See [the Z-index documentation](https://xui.xero.com/16.0.0/section-fundamentals-layout.html#fundamentals-layout-6) for the latest.

### Removals

- BreadcrumbTrail
  - `xui-pageheading--breadcrumbs` and `xui-breadcrumbs` have been replaced with `xui-pageheading--breadcrumbtrail` and `xui-breadcrumbtrail`, respectively.
- The `xui-heading-medium` mixin no longer has an `emphasis` parameter.
- Z-index variables `$xui-z-index-tooltip` and `$xui-z-index-mask` have been removed without replacement. `
- `$xui-z-index-overlay` has been renamed to the more-apt `$xui-z-index-sheetmask`
- The class `xui-pickitem-link--body` has been removed from `a` tags in `XUIPickItem`s. From now on flexbox handles the correct alignment of tabs in `XUIPageHeader`.
- Toggle
  - `xui-toggle-option` and `xui-toggle-optionwrapper` have been replaced with `xui-toggle--option` and `xui-toggle--optionwrapper`, respectively.

Following classes have been **removed** because they don't meet [XUI touch target standards](https://xui.xero.com/16.0.0/section-getting-started-responsive-guidelines.html#getting-started-responsive-guidelines-4):

- Pill: `xui-pill-single` and `xui-pill-xsmall`
  - The look of `xui-pill-single` can be achieved using a textInput with side elements
  - `xui-pill-xsmall` should be replaced with a larger size variant (eg.`xui-pill-small`)
- Datepicker: `xui-datepicker-compact`
  - `xui-datepicker-compact` should be deleted and use `xui-datepicker` alone
- Page Layout: All classes with a prefix of `xui-page-layout`
  - Those classes should be reimplemented with Compositions
- Picklist / Pickitem: `xui-picklist-small`, `xui-picklist-xsmall`, `xui-pickitem-small` and `xui-pickitem-xsmall`
  - `small` and `xsmall` variants should be replaced with `medium` variant

### Typography changes

- Headings: large, xlarge, 2xlarge, 3xlarge
  - updated line height to `28px` for large (**removed** `1.3077`), `32px` for xlarge (**removed** `1.15`), `72px` for 2xlarge (**removed** `1.15`), `96px` for 3xlarge headings (**removed** `1.15`)
- `xui-avatar-2xsmall`
  - `xui-avatar-2xsmall` uses now line height corresponding to its font-size (12px instead of 16px).

## XUI CSS components

- Non-linked text items appearing as part of a BreadcrumbTrail should now have the `xui-breadcrumb-no-link` class applied to them
- Truncated Pickitems with a leftElement and/or secondaryText now require one of the following classes:
  - For Pickitems with a leftElement and secondaryText.
    - `xui-pickitem-has-leftelement-secondarytext`
  - For Pickitems with leftElement and no secondaryText.
    - `xui-pickitem-has-leftelement`
  - For Pickitems with secondaryText and no leftElement.
    - `xui-pickitem-has-secondarytext`
- Significant changes have been made to the markup and CSS for Page Headers to support an improved responsive experience. Please see the [documentation](https://xui.xero.com/16.0.0/section-components-navigation-page-header.html) for details on the new structure for page headers that have content more complex than a title alone.
- Isolation Headers have been overhauled to largely match the new structure of Page Headers. Please see the [documentation](https://xui.xero.com/16.0.0/section-components-navigation-isolation-header.html) for details.
- Updated HTML structure for `Tag` component. Tags will be truncated instead of wrapping its content can't fit available space. When truncated, a tooltip will be added to display full text. Tags also now require a `xui-tagcontent` element to wrap the inner text.

### Invisible touch targets

Several CSS components require a new child element with the `.xui-touchtarget` class. This class will add an invisible touch target with a minimum width and height of 40px. The following CSS components will need to be updated manually (If you are using the React components you do not need to do this).

- [Icon button](https://xui.xero.com/16.0.0/section-components-controls-button.html#components-controls-button-6)
- [Checkbox](https://xui.xero.com/16.0.0/section-components-controls-checkbox.html) and [Rollover Checkbox](https://xui.xero.com/16.0.0/section-components-controls-checkbox.html#components-controls-checkbox-11)
- [Radio](https://xui.xero.com/16.0.0/section-components-controls-radio.html)
- [Switch](https://xui.xero.com/16.0.0/section-components-controls-switch.html)

## XUI React components

- Many of the exports previously exported from `structural.js` have been moved out to their own, more specific exports. The codemod will resolve as many of these path updates as it can and inform you of any it is unable to handle.
  - XUIBreadcrumbTrail and XUIPageHeader are now exported from `pageheader.js`
  - XUIActions is now **the default export** from `actions.js`
  - XUIContentBlock and XUIContentBlockItem are now exported from `contentblock.js`
  - XUIOverviewBlock and XUIOverviewSection are now exported from `overviewblock.js`
  - XUIPanel, XUIPanelHeading, XUIPanelFooter, and XUIPanelSection are now exported from `panel.js`
  - XUIColumn and XUIRow **have not** been moved and are still exported from `structural.js`

### Removals

- icons in `XUIButton`
  - `icon` and `icon-inverted` variants of `XUIButton` have been **removed**. As a replacement, you can use `XUIIconButton` for buttons that only contain an icon.
- `XUIBreadcrumb` has been renamed to `XUIBreadcrumbTrail`
- `XUIIsolationHeaderNavigation`, `XUIIsolationHeaderTitle`, `XUIIsolationHeaderSecondaryTitle`, and `XUIIsolationHeaderActions` have been **removed**. `XUIIsolationHeader` now accepts `navigationButton`, `title`, `secondary`, and `actions` as props instead.
- Correspondingly, the Sass variables `$xui-isolationheader-bg-color`, `$xui-isolationheader-color`, and `$xui-isolationheader-inverted-bg-color` have been **removed**. Please use `$xui-pageheading-bg-color`, `$xui-text-primary-color`, and `$xui-color-grey-2`, respectively, instead.

Following props have been **removed** because they don't meet [XUI touch target standards](https://xui.xero.com/16.0.0/section-getting-started-responsive-guidelines.html#getting-started-responsive-guidelines-4):

- `XUIPill`: `xsmall` size variant
- `XUIAutocompleter`: prop `inputSize`
- `XUIDatePicker`: prop `isCompact`
- `Picklist` / `Pickitem`: prop `size`
- `NestedPicklist` / `NestedPicklistContainer`: prop `size`
- `SelectBoxOption`: prop `size`

### Component props

- `XUIAvatar` now requires the value prop for accessibility and for cases in which images have not loaded
- `XUIPageHeader` now requires that `breadcrumbs` only be used in combination with `title`, where previously the two could _not_ be used together.
- `XUIIsolationHeader` has a new API similar to that of `XUIPageHeader`. It still accepts `children`; but for best results, we recommend updating your project to use the new API.
- `Picklist` added a prop `swapAtBreakpoint`, which defines the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.
- `XUIBreadcrumbTrail` has a new prop `swapAtBreakpoint`, which defines the pageHeader width at which the component will condense early breadcrumb items into a dropdown. This behaviour is optional, and will not occur if no `swapAtBreakpoint` is supplied, or if the set of breadcrumbs is only one or two items.
- `XUIAutocompleterSecondarySearch` requires previously optional `onSearch` function for every single use
- `XUIRadio` and `XUICheckbox` now accepts `inputProps` object with attributes that will be set on the HTML input node.

### Internationalisation

Going forward, XUI will no longer provide default English values with its React components. This was a difficult decision to make, but we ultimately believe that localisation is a responsibility best handled by product teams.

To help ease this transition, we are providing a codemod that will add all of the missing English values to your application. Instructions for using the codemod are [available in our GitHub repo](https://github.dev.xero.com/UXE/xui/#upgrading-between-versions-of-xui).

Below is a list of components that have been affected by this change. The codemod will make all these changes for you, but you can use this list as a reference if needed.

- `<XUIAccordion />`
  - `toggleLabel`: "Toggle"
  - `emptyMessage`: "Nothing available to show"
- `<XUIAutocompleter />`
  - `loadingLabel`: "Loading"
- `<XUIAutocompleterEmptyState />`
  - `children`: "No results found"
- `<XUIBarChart />`
  - `keyTitle`: "Graph key"
  - `emptyMessage`: "There is no data to display"
  - `paginationNextTitle`: "Next page"
  - `paginationPreviousTitle`: "Previous page"
  - `loadingLabel`: "Loading"
- `<DropDownHeader />`
  - `primaryButtonContent`: "Apply"
  - `secondaryButtonContent`: "Cancel"
  - `backButtonLabel`: "Back"
- `<XUIModal />`
  - `closeButtonLabel`: "Close"
- `<NestedPicklistTrigger />`
  - `ariaLabel`: "Toggle submenu"
- `<XUILoader />`
  - `ariaLabel`: "Loading"
- `<XUIPill />`
  - `deleteButtonLabel`: "Delete"
- `<SelectBox />`
  - `caretTitle`: "Toggle list"
- `<XUITable />`
  - `loaderLabel`: "Loading more data"
  - `emptyMessage`: "Nothing to show here"
  - `checkOneRowLabel`: "Select row"
  - `checkAllRowsLabel`: "Select all rows"
  - `overflowMenuTitle`: "More row options"

## Other changes

### TypeScript support

With XUI 16.2.0 we are shipping TypeScript definitions for our components with XUI.

`xui-types` will no longer be actively maintained as of XUI 16.2.0, so while your current implementation will likely continue to work for a while, we recommend upgrading to embedded XUI types at your earliest convenience.

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
