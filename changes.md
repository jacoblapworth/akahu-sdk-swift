# XUI 16 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## XUI CSS

- Button
  - Added a `min-width` of 40px in `xui-button`(`xui-icon-button` is not included).
  - Set `text-align: center` in `xui-button` to make sure the content in the anchor is centered.
  - Removed the `min-width` value set in `xui-button-split`.
- Input
  - Added a `min-width` of 40px in `xui-textinput` and `xui-textinput-input`.
- Pill
  - Added a `min-width` of 40px in `xui-pill`.
  - Set `justify-content: center` in `xui-pill--content`.
- Table
  - Added a `min-width` of 40px in `xui-table--sortbutton`.
- Range
  - Added a `min-width` of 40px in `xui-rangeslider-container`.
- Tag
  - Added a `min-width` of 40px to `xui-tag`.
- Progress indicator
  - Added a `min-width` of 40px to `xui-progress-linear`.
- Picklist
  - Added a `min-width` of 80px in truncated `xui-pickitem`.
  - Set `max-width` to 75% instead of 60% and removed `min-width: 20%` in truncated `xui-pickitem--secondary`.
  - Added a `min-width` of 40px in `xui-pickitem-text-truncated` which is under `xui-pickitem--text`.
  - Horizontal Pickitem
    - Removed `xui-padding-vertical` and `xui-text-wordbreak` mixin in `xui-pickitem--text`.
    - Set `justify-content: center`, `text-align: center` and `display: flex` in `xui-pickitem--body`.
    - Set `justify-content: center` and removed `width: 100%` in `xui-pickitem--text`.
    - Added `min-width` in `xui-pickitem--sideelement` for different sizes of pickitems:
      - medium: 40px
      - small: 32px
      - xsmall: 24px

### Removals

### Breakpoint variable name & value changes

### Mixin renames

### Utility classes

### Additions

## XUI CSS components

- Non-linked text items appearing as part of a Breadcrumb should now have the `xui-breadcrumb-no-link` class applied to them
- Truncated Pickitems with a leftElement and/or secondaryText now require one of the following classes:
  - For Pickitems with a leftElement and secondaryText.
    - `xui-pickitem-has-leftelement-secondarytext`
  - For Pickitems with leftElement and no secondaryText.
    - `xui-pickitem-has-leftelement`
  - For Pickitems with secondaryText and no leftElement.
    - `xui-pickitem-has-secondarytext`
- Significant changes have been made to the markup and CSS for Page Headers to support an improved responsive experience. Please see the [documentation](https://xui.xero.com/16.0.0/section-compounds-navigation-page-header.html) for details on the new structure for page headers that have content more complex than a title alone.
- Updated HTML structure for `Tag` component. Tags will be truncated instead of wrapping its content can't fit available space. When truncated, a tooltip will be added to display full text.

### Invisible touch targets

Several CSS components require a new child element with the `.xui-touchtarget` class. This class will add an invisible touch target with a minimum width and height of 40px. The following CSS components will need to be updated manually (If you are using the React components you do not need to do this).

- [Icon button](https://xui.xero.com/16.0.0/section-building-blocks-controls-button.html#building-blocks-controls-button-6)
- [Checkbox](https://xui.xero.com/16.0.0/section-building-blocks-controls-checkbox.html) and [Rollover Checkbox](https://xui.xero.com/16.0.0/section-building-blocks-controls-checkbox.html#building-blocks-controls-checkbox-11)
- [Radio](https://xui.xero.com/16.0.0/section-building-blocks-controls-radio.html)
- [Switch](https://xui.xero.com/16.0.0/section-building-blocks-controls-switch.html)

## XUI React components

### Removals

- icons in `XUIButton`
  - `icon` and `icon-inverted` variants of `XUIButton` have been **removed**. As a replacement, you can use `XUIIconButton` for buttons that only contain an icon.

### Component props

- `XUIAvatar` now requires the value prop for accessibility and for cases in which images have not loaded
- `XUIPageHeader` now requires that `breadcrumb` only be used in combination with `title`, where previously the two could _not_ be used together.

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

### Invisible touch targets

Components with a fixed with and height now have an invisible touch target around them that has a minimum width and height of 40px. Visit [our documentation for touch targets](https://xui.xero.com/16.0.0/section-getting-started-responsive.html#getting-started-responsive-3) for more information. If you use our CSS components please refer to [this list of components that will need updating](#invisible-touch-targets). If you use our React components then touch targets have been added already.

Components with invisible touch targets:

- [XUIIconButton](https://xui.xero.com/16.0.0/react/#icon-button)
- [XUICheckbox](https://xui.xero.com/16.0.0/react/#checkbox) and [XUIRolloverCheckbox](https://xui.xero.com/16.0.0/react/#rollover-checkbox)
- [XUIRadio](https://xui.xero.com/16.0.0/react/#radio)
- [XUISwitch](https://xui.xero.com/16.0.0/react/#switch)
