# XUI 17 Changes

## Dependency updates

## XUI CSS

- `xui-iconwrapper-medium` width and height updated to 32px (from 30px)
- `xui-styledcheckboxradio-reversed` left padding updated to 15px (from 7px) when it's under `xui-styledcheckboxradio-group`
- `xui-styledcheckboxradio--label` remove the left margin when reversed
- `xui-styledcheckboxradio--input + xui-iconwrapper`
  - For uncheked icon checkbox, remove the background color when hover or active
  - For checked icon checkbox, modify the svg stroke color when it's focused and keep the box-shadow when it's hovered
- `xui-styledcheckboxradio--radio`
  - For unchecked and checked radio, remove the background color when it's hovered and active
  - For checked radio, the background color now will change when it's hovered and active
- `xui-switch--control`
  - For unchecked and checked switch, the background color now will change when it's hovered and active

### Removals

Following classes have been **removed** because left space isn't needed for alignment after the "invalid" icon added:

- `xui-styledcheckboxradio--message-with-label`
- `xui-switch--message-with-label`

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

- For accessibility purposes, components with prop `validationMessage` now have an "invalid" icon in the left of the message.
