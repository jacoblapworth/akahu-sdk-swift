# XUI 17 Changes

## Dependency updates

## XUI CSS

- `xui-button--lefticon` and `xui-button--righticon` are now provided to help with icon placement inside buttons. These should be used with `xui-button-has-icon` and an icon wrapper – see the button documentation for full details.
- `xui-iconwrapper-medium`’s width and height have been updated to 32px (from 30px)
- `xui-iconwrapper-small` and `xui-iconwrapper-xsmall` have been added
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
- `XUIPagination`
  - Numbers in `createPagingContent` and `createCountContent` won't be formatted for internationalization, product teams need to implement it themselves.
- `XUIIcon`
  - `small` and `xsmall` size variants have been added. These change the size of the wrapper _only_ – the icon itself is the same size as the `medium` variant for legibility purposes.
- `XUITable`
  - The arrow icon for sorting from the header row has been corrected to point up when the values are sorted in ascending order (A -> Z, low -> high), and down when descending. This has never been correct.

### Removals

- `XUIButtonCaret` has been removed in favour of the prop `hasCaret` on `XUIButton`.

### Component props

- `NestedDropDown` prop `currentPanel` has been renamed to `currentPanelId`.

## Other changes

- For accessibility purposes, components with prop `validationMessage` now have an "invalid" icon in the left of the message.
