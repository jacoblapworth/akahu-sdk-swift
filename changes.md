# XUI 19 Changes

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

### XUITable

- For heading cells, use `xui-readonlytableheadingcell-rightaligned` instead of `xui-readonlytablecell-rightaligned`

### Mixins updates

- `xui-readonlytable-overflow` and `xui-editabletable-overflow` mixins have been removed, use `xui-table-overflow` instead

## XUI React components

### Component props

#### Prop Replacements

#### Prop Renaming

_Note. The codemod will resolve most prop differences automatically when run._

## Other changes
