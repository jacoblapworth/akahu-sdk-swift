# XUI ❤️ KSS

XUI has been built on KSS a living style guide system that works by annotating CSS or SASS and producing an interactive documentation system that makes use of it's own CSS.

- [ ] Add reference info to KSS and how we are using it / have it configured eg everything is in the kss directory, kss-assets gets copied across etc.
- [ ] Add info on KSS tooling
- [ ] Add info on bespoke template
- [ ] Add info on custom CSS (responsive, making certain examples work (margin, position relative overrides, etc))
- [ ] improve the customisation docs
- [ ] spell check

## Customisations

KSS supports custom properties and we have a number all pre-defined in our [config.json](https://github.dev.xero.com/UXE/xui/blob/master/kss/config.json#L3) these allow us to push KSS beyond it's initial design by adding custom handlebars templates and helpers when these props are used.

### XUI custom KSS props

* `heading` {bool}
* `tokens` 
* `colorTokens` 
* `noExample`
* `classes`
* `markdown`

### Heading

The `Heading` prop is used for navigation it marks a KSS block as a heading and will render a collapsable menu of sub elements. Headings are all defined in [xui.scss](https://github.dev.xero.com/UXE/xui/blob/master/src/sass/xui.scss#L75) but may move to a navigation.scss or ia.scss partial. Headings are positioned using the KSS `Weight` property and the convention is to set the Heading as the x.0 and all sections inside a heading get marked as x.1 weight and are alpha ordered.

### Tokens & ColorTokens

Tokens and color tokens parse out the following style code comments. 
These are all generated in a pre-parse step that creates src/sass/tmp/_colors.scss files with the following code comment format that is passed into KSS.

```
// Tokens:
// $xui-font-size-heading : 22px : font-size
// $xui-font-size-page-title : 18px : font-size
// $xui-font-size-section-title : 15px : font-size
```

```
// ColorTokens:
// $xui-color-grey-1 : #32465a : color
// $xui-color-grey-2 : #657483 : color
// $xui-color-grey-3 : #99a3ad : color
```

### NoExample

Used by `tokens` and `colorTokens` to prevent KSS from rendering certain token blocks.

### Classes

Classes processes a : separate list of class names and descriptions and places them in a table. It uses the custom helper [classes.js](https://github.dev.xero.com/UXE/xui/blob/master/kss/builder/extend/classes.js) to extract colon separated key value pairs of classes and descriptions.

## Markdown

Allows authoring of markdown documents to be included with KSS blocks.

* Markdown docs come immediately after headings and precede description blocks.
* files are referenced as relative paths to the src/docs directory

Example of adding in `overview.md` into the toast section.
https://github.dev.xero.com/UXE/xui/pull/1678/files#diff-96f1935c2eb02812d31a3ada2243c1fdR12