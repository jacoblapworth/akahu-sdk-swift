# XUI 20 Changes

## Table of Contents

- [Dependencies](#Dependencies)
- [CSS Changes](#XUI-CSS)
- [React Component Changes](#XUI-React-components)
  - [Prop Changes](#Component-props)
- [Other changes](#Other-changes)

## Dependencies

Please take some time to check that your projects' `package.json` dependencies match those of XUI's `package.json` dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundle analyser after upgrading (and regularly in general).

## XUI CSS

## XUI React components

- `XUIDateInput` default visual appearance has changed to show the `date-start` icon next to the input. This can be changed using the new `inputIcon` prop.

- `XUIDateRangeInput` default visual appearance has changed to show the `date-start` icon next to the first input, and the `date-end` icon next to the second input.

### New components

### Component props

_Note. The codemod will resolve most prop differences automatically when run._

- `XUIDateInput`
  - Now han an `inputIcon` prop to allow the icon displayed next to the input to be changed

## Other changes

### Accessibility
