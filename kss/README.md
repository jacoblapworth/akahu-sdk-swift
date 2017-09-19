# XUI ❤️ KSS

XUI has been built on KSS a living style guide system that works by annotating CSS or SASS and producing an interactive documentation system that makes use of it's own CSS.

- [ ] Add reference info to KSS and how we are using it / have it configured eg everything is in the kss directory, kss-assets gets copied across etc.
- [ ] Add info on KSS tooling
- [ ] Add info on bespoke template
- [ ] Add info on custom CSS (responsive, making certain examples work (margin, position relative overrides, etc))

## Custom Menu

We have added a custom Handlebars builder that creates a custom menu object that better supports nesting to support our desired menu structure. The custom menu is built by comparing the KSS weights of sections and building a nested tree. The class lives in `kss/builder/index.js`.

Example Weights:

Weight: 4.0 Building, Blocks – top level, primarily for content overview pages.
Weight: 4.3 Controls, second level, for detail content or landing pages of grouped content.
Weight: 4.35 Toggles, third level, for detail content under landing pages.

This customisation is not fool proof and if second or third level pages are added without the correct parent page they will most probably be hiding in the previous section ordered by weight.

## Custom Page Creation

To determine our child pages and correctly render our sections, we've created a custom build for the pages. This class lives alongside the custom menu generation in `kss/builder/index.js`. You can find technical details in the comments of the `buildGuide` function.


## Customisations

KSS supports custom properties and we have a number all pre-defined in our [config.json](https://github.dev.xero.com/UXE/xui/blob/master/kss/config.json#L3) these allow us to push KSS beyond it's initial design by adding custom handlebars templates and helpers when these props are used.

### XUI custom KSS props

* `tokens`
* `tokenType`
* `classes`
* `markdown`
* `components`
* `definitions`
* `note`
* `teaser`
* `exampleclass`
* `card`
* `introduction`
* `tips`
* `flag`

#### Adding new properties

A new customisation can be cerated by adding a new property into `kss/config.json` in the `custom` array (look for the above list). Custom properties should be added to the config in lower case and must always be referenced in handlebars as lowercase. The case is not checked in the scss annotations and the KSS convention is to use PascalCase here.

### Tokens

PostCSS is used to document information about sass variables.

`@section` can be used to specify a section heading, `@type`, can be used to indicate the type of token that's being rendered, name and description can be passed in the line above each item separated by a colon. These will then be parsed into blocks of KSS which will be rendered by the `rendertokens` handlebars partial.

Files listed in the `templates` section of `kss/builder/parser/constants.js` will be run through the PostCSS parser, with their output placed in a temp folder.

```
// @section Greys
// @type color
//
// Grey 1 : Primary text, some backgrounds.
$xui-color-grey-1: $xui-color-black;
// Grey 2 : Secondary text, some backgrounds.
$xui-color-grey-2: mix($xui-color-grey-1, $xui-color-white, 75%);
```

### Classes

Classes processes a : separate list of class names and descriptions and places them in a table. It uses the custom helper [classes.js](https://github.dev.xero.com/UXE/xui/blob/master/kss/builder/extend/classes.js) to extract colon separated key value pairs of classes and descriptions.

### Markdown

Allows authoring of markdown documents to be included with KSS blocks.

* Markdown docs come immediately after headings and precede description blocks.
* files are referenced as relative paths to the src/docs directory

Example of adding in `overview.md` into the toast section.
https://github.dev.xero.com/UXE/xui/pull/1678/files#diff-96f1935c2eb02812d31a3ada2243c1fdR12

### Components

Creates links under the description of the KSS block to the relevant React Component examples available at `react/`. Component names must match an anchor in the XUI Component Styleguide, e.g. `Select-box`, not `Select Box`. It uses the custom helper [components.js](https://github.dev.xero.com/UXE/xui/blob/master/kss/builder/extend/classes.js) to parse the list of component names.

Supports specifying multiple components separated by commas:
```
// Components: Checkbox, Radio
```

### Definitions

Creates a definition table of "name", "value" and "description" rows. The properties are colon separated and the tables will be two or three columns wide based on the number of columns in the first row.

```
// Definitions:
// Extra small: 5px: `-xsmall`
// Small: 10px: `-small`
...
```

### Note

Creates a note which is simply a paragraph styled at 85%

```
// Note:
// .xui-margin-none applies an !important
```

### Introduction

Adds a defined introduction wrapped in <p/> tag with a `.ds-intro` class.

```
// Introduction: Some wise words
```

### Teaser

Used alongside cards, they appear as the short introduction to its corresponding section inside the card.

```
// Teaser: A short intro to the related card
```

### Example Class

Classes to add to the example wrapper. Common cases are adding a background colour of transparent or removing spacing.

```
// ExampleClass: ds-example-flush ds-example-transparent
```

### Cards

Used in some landing pages to display their children. They are automatically detected with exceptions of the "Working with XUI" and "Building Blocks" pages. These are manually whitelisted in the `index.hbs` page.

### Tips

Or sometimes referred to as "Do's" and "Don'ts", are section displayed alongside icons for quick reference to best practices on that section. There are currently three valid tips outlined in the below example.

```
// Tips:
// Do: Something Good
// Don't: Do something else
// Warning: You have been warned
```

### Flag

For representing a status of that section, the 4 currently supported flags are 'Experimental', 'Deprecated', 'Under Review' and 'Seeking Feedback'.

```
// Flag: Experimental
```

## Handlebars Index Template

The main `index.hbs` file holds the root handlebars template. It pulls in a number of partials from the `kss/builder/extends` folder to build up our documentation. A few key points to understanding this file are below.

* Cards are automatically populated on all pages with children unless whitelisted by the `{{ifStyleguide pageName}}` helper. This currently filters out the 'Building Blocks' and 'Working With XUI' pages.
* The 'Jump to' menu is automatically created on every page with sections and no children.
* A helper `{{renderSectionInMarkdown sectionName}}` can be used to parse any test through `marked` to format as markdown. Currently only used with introductions but flexible enough to be used elsewhere.
* If a section is marked to have a React component associated with it, this is rendered with a generated URL to link to the React documentation.
* Definition tables are handled in two separate partials, `renderTwoCols` and `renderDefinitions`, to create the table output in the documentation.
* Examples and their markup are handled in the index template under a section marked `<!--ds-example-->`.
