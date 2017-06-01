### Migrating from v2 Buttons

1. The `isSplit` prop (and all associated secondary button props) of the button component has been removed.  There's a new `XUISecondaryButton` component for that. Check out the Split Button Example below to see how to accomplish the same thing now.
2. If you want to output a link (aka `<a>` tag), you should no longer use the `type` prop.  Set the `isLink` prop to true instead.
3. The `buttonType` prop has been renamed to `type` (more intuitive) and the default has changed from `submit` to `button`.  Most people were manually setting `button` or just didn't have the button inside of a form, so it was changed.
