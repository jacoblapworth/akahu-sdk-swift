# XUI ❤️ KSS

XUI has been built on KSS a living style guide system that works by annotating CSS or SASS and producing an interactive documentation system that makes use of it's own CSS.

## Custom Menu (nodejs)

KSS by design has a very limited page structure. It builds a navigation based on parent and child pages and supports a "grandchild" flag for on page navigation. XUI has a much deeper requirement with at least three levels of nesting. This is done by specifying in the KSS config, pages that have children (`child-pages`). This pattern was based off this issue description: https://github.com/kss-node/kss-node/issues/175.

The custom menu is done by overwriting the `createMenu` method in our custom `kss/builder/index.js` class. We introduce a recursive `buildMenu` function that builds a true nested menu.

## Custom Page Creation (nodejs)

To determine our child pages and correctly render our sections, we've created a custom build for the pages. This class lives alongside the custom menu generation in `kss/builder/index.js`. You can find technical details in the comments of the `buildGuide` function.

This method is unreasonably large and we only need to hook it around line 290 in the `sectionRoots.forEach` and there is not really a simpler way. So it is mostly copy paste. The section inside the `sectionRoots` iteration decides which roots to build as html pages and which content to include on them.

## Customisations (node/handlebars)

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
* `storybook`
* `composition-image`
* `caption`

#### Adding new properties

A new customisation can be created by adding a new property into `kss/config.json` in the `custom` array (look for the above list). Custom properties should be added to the config in lower case and must always be referenced in handlebars as lowercase. The case is not checked in the scss annotations and the KSS convention is to use PascalCase here.

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

Classes processes a colon separated list of class names and descriptions and places them in a table. It uses the custom helper [classes.js](https://github.dev.xero.com/UXE/xui/blob/master/kss/builder/extend/classes.js) to extract colon separated key value pairs of classes and descriptions.

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

Adds a defined introduction wrapped in a `<p/>` tag with a `.ds-intro` class.

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

### Storybook

In some scenarios we want to link from the XUI Guide to specific Storybook examples. This should be done using an absolute link to a `/storybook/`route.

```
// Storybook: /storybook/?knob-Include%20content%20header=false&knob-Show%20example%20content=true&knob-Expand%20width%20infinitely=false&selectedKind=Compositions&selectedStory=Detail&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
```

### Composition-image

For displaying images that illustrate a Composition's behaviour. Place the .svg file in kss-assets/composition-images/ and add `Composition-image: image-name.svg` to the relevant documentation file.

```
// Composition-image: image-name.svg
```

### Caption

Small text used to describe what is shown in the Composition-image. This should be the very next KSS prop following the Composition-image prop.

```
// Caption: How this-particular composition behaves at -small-down, -small-up, -medium-up, and -large-up breakpoints
```

## Handlebars Index Template

The main `index.hbs` file holds the root handlebars template. It pulls in a number of partials from the `kss/builder/extends` folder to build up our documentation. A few key points to understanding this file are below.

* Cards are automatically populated on all pages with children unless whitelisted by the `{{ifStyleguide pageName}}` helper. This currently filters out the 'Building Blocks' and 'Working With XUI' pages.
* The 'Jump to' menu is automatically created on every page with sections and no children.
* A helper `{{renderSectionInMarkdown sectionName}}` can be used to parse any test through `marked` to format as markdown. Currently only used with introductions but flexible enough to be used elsewhere.
* If a section is marked to have a React component associated with it, this is rendered with a generated URL to link to the React documentation.
* Definition tables are handled in two separate partials, `renderTwoCols` and `renderDefinitions`, to create the table output in the documentation.
* Examples and their markup are handled in the index template under a section marked `<!--ds-example-->`.
