# XUI 17 Changes

## Dependency updates

## XUI CSS

- `xui-iconwrapper-medium` width and height updated to 32px (from 30px)

### Removals

### Typography changes

## XUI CSS components

## XUI React components

- `XUIStepper`
  - Updated spacing to match other components and 4px grid
- `XUIButton`, `XUISecondaryButton`, `XUISplitButtonGroup`
  - `link` has been removed as a variant of these button types in favour of `borderless-primary`. The styling remains unchanged.
  - Borderless variants of `XUISecondaryButton` and `XUISplitButtonGroup` have been removed due to possible confusion with non-split buttons containing carets. Use `standard`, `primary`, `create`, or `negative` instead.

### Removals

### Component props

- `NestedDropDown` prop `currentPanel` has been renamed to `currentPanelId`.

## Other changes
