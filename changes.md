# XUI 16 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json
dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyzer after upgrading (and regularly in general!)

## XUI CSS

### Removals

### Breakpoint variable name & value changes

### Mixin renames

### CSS components

### Utility classes

### Additions

## XUI React components

- icons in `XUIButton`
  - `icon` and `icon-inverted` variants of `XUIButton` have been **deprecated**. As a replacement, you can use `XUIIconButton` for buttons that only contain an icon.

### Component props

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

- `XUIAvatar` now requires the value prop for accessibility and for cases in which images have not loaded

## Responsive Enhancements

- Button
  - Added a `min-width` of 40px in `xui-button`(`xui-icon-button` is not included).
  - Set `text-align: center` in `xui-button` to make sure the content in the anchor is centered.
  - Removed the `min-width` value set in `xui-button-split`.
