# XUI 18 Changes

## Dependency updates

Please take some time to check that your projects' package.json dependencies match those of XUI's package.json dependencies to avoid multiple versions of a dependency being bundled in your projects.

We recommend running a bundles analyzer after upgrading (and regularly in general).

## XUI CSS

### File Uploader

- `xui-fileuploader--fileitem--loading` now presents a static progress icon.
- `xui-fileuploader--fileitem--loading-indeterminate` can be applied alongside `xui-fileuploader--fileitem--loading` to present a spinning progress icon.
- `FileObject` now accepts an `uploadProgressPercentage` prop for visually communicating the upload progress.

### Removals

## XUI React components

### Removals

### Component props

_Note. The codemod will resolve most prop differences automatically when run._

## Other changes
