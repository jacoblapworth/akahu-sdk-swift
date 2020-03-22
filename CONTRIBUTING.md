# Want to contribute?

## First Timers

XUI is built using [Node.js](https://nodejs.org/). Checkout [README.md](README.md) for info on setting up your local development environment.

We use an "up-for-grabs" label to indicate issues that are suitable for first timers and new contributers these shoud be relatively straight forward. You can [filter issues to show just up-for-grabs](https://github.dev.xero.com/UXE/xui/issues?q=is%3Aopen+is%3Aissue+label%3Aup-for-grabs) and look out for ones you might like to try.

We always want help improving documentation, examples and test coverage. Even if we don't have specific issues for these if you see something you want to improve, [raise an issue](https://github.dev.xero.com/UXE/xui/issues/new), assign yourself and give it a go.

**Some useful info**

- If you are working on an issue, assign it to yourself in Github so we know you're having a look at it.
- Ensure you're working on a forked copy of XUI and preferably a sensibly named branch.
- Include relevant documentation updates and tests in along with any code changes.
- Write meaningful commit and PR messages ([Anatomy Of a Good Commit Message](https://adamcod.es/2012/07/03/anatomy-of-a-good-commit-message.html) has some good info).
- Always add a "rel|ref|fixes:" issue reference and always ensure an issue exists before opening a PR.
- cc @UXE/uxe-team or @UXE/developers or use the Reviewers github functionality for code reviews.
- Ask questions on issues, PRs or in [Slack](https://xero.slack.com/messages/C565NP1A5).

## Bugs

### Finding Issues

We use [GitHub Issues](https://github.dev.xero.com/UXE/xui/issues) to track our bugs. We keep a close eye on the issues and try to make it clear when we'll have a fix. Before filing a new issue, please check that it hasn't already been reported.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. If possible please provide this test case along side a [new issue](https://github.dev.xero.com/UXE/xui/issues/new).

### Proposing a Change

If you intend to introduce something new, or something old doesn't quite fit your needs, feel free to [raise an issue](https://github.dev.xero.com/UXE/xui/issues/new) and we will be more than happy to look at it. Alternatively feel free to talk to us on #platform-fed-xui on slack.

If you're only fixing a bug, it's fine to submit a pull request right away.

# Conventions and standards

## ESLint

ESLint helps us catch common errors that cause bugs in many programs. XUI extends a simple rule set based on `eslint:recommended` and `react:recommended`.

## Prettier

We use [Prettier](https://github.com/prettier/prettier) to format our JavaScript code.

If you want realtime code formatting in your editor, there are [Prettier integrations available for all popular editors](https://github.com/prettier/prettier#editor-integration).

We recommend setting up your editor to format on save, in VSCode this is the `editor.formatOnSave` setting.

If you don't format your code in your editor, you can run `npm run prettier:fix` to run Prettier over your changes.

## SCSS

All classes must be prefixed with the namespace variable (which resolves to `xui` by default), e.g. `.#{$ns}-component`

Classes should follow the format:

- `xui-component`
- `xui-component-modifier`
- `xui-component--subcomponent`
- `xui-component--subcomponent-modifier`
- `xui-component-is-state`
- `xui-is-globalstate`

This format is a [BEM](https://en.bem.info/)-inspired evolution of [SMACSS](https://smacss.com/).

- `xui-component` represents the highest level of an abstraction or component.
- `xui-component-modifier` represents a different state or variation of `xui-component`. It is used in conjunction with the high-level class.
- `xui-component--subcomponent` represents a subcomponent of `xui-component` that
  helps form `xui-component` as a whole.

Use class selectors wherever possible. Use attribute selectors only if absolutely required.
Do not use ids or element selectors.

[Nesting selectors is bad](http://markdotto.com/2015/07/20/css-nesting/); we allow 2 levels max with some exceptions when absolutely required.

Layout styling should be separate to component styling. Individual components
should not make assumptions about their layout (e.g. by setting margins, padding or position).
Examples in the documentation can make use of layout primitive classes.

A modifier class with the `-layout` suffix may be provided for the purpose of providing the most common layout
configuration for that component, including responsive styling. More info on layout styling can be found in this blog post: [Styling Components in XUI 10](https://confluence.inside.xero.com/x/ww0YCQ).

Avoid the anti-pattern of applying styles in a generic class and then undoing them in a more specific class.

If you are contributing a new component, be sure to provide ample documentation, which should include any
applicable ARIA attributes, and demonstrate at least 2 different examples of the same component with
different classes, children, or using different elements
(e.g. showing the component classes when used with a `<div>` parent and a `<ul>` parent)

### Patterns

When you have one set of styles for the first item and a different set of styles for all
other items, use `nth-of-type(n+2)` or `:nth-child(n+2)` as appropriate.

See: [How nth-child works](https://css-tricks.com/how-nth-child-works/) and
[nth-child Tester](https://css-tricks.com/examples/nth-child-tester/)

If you used `:first-child` to target the first item and a more general class selector for all
other items, it is likely you would need to undo some styles for the `:first-child`, which would
violate our conventions.

## React Components

When developing components that use XUI CSS classes, use the namespace variable instead of hard-coding `xui`:

```
import {ns} from 'src/react/components/helpers/xuiClassNamespace'

export default function MyComponent({children}) {
	return <div className={`${ns}-container`}>{children}</div>
}
```

## TypeScript

We have a [styleguide for writting TypeScript](TypeScript-style-guide.md).

## Unit Tests

### Conventions

We have some naming/file structure conventions around test files. All test files should have a name that ends with `-test.js`. Second, they should be included in a `__tests__` folder inside the component's folder. e.g. unit tests for the SelectBox component live at `src/react/components/select-box/__tests__/SelectBox-test.js`.

When adding new unit test files, you should follow this convention to prevent side effects e.g. tests might end up being deployed to Artifactory or just not run.

### Jest Test Runner

We use the [Jest Test Runner](http://facebook.github.io/jest/) developed by Facebook. If you're unfamiliar with Jest or just want to read up on specific APIs you come across, hit up the [Jest documentation](http://facebook.github.io/jest/docs/en/api.html). Jest's configuration lives in `jest.config.js` in the root folder of this project.

### Enzyme

Many unit tests for React components require checking the state and/or props of child components, simulating DOM events, and traversing the DOM to make sure DOM elements look the way they're supposed to. For this we use the [Enzyme library](http://airbnb.io/enzyme/) developed by AirBnB. It has a very clean, jQuery'esque API that makes finding and testing React components much easier.

## Coverage

Test coverage reports are generated as part of the [Pull Request builds](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_PullRequest). The Reports are available via Artifacts > Icov-report > index.html in Team City.

## Development UI Test Pages

Linting and unit tests are an extremely important part of ensuring code quality for XUI, but they both have their limitations. UI test pages provide interactive pages for each component to test various configurations manually in the browser.

### npm Script

`npm run storybook` creates a full working application which serves up the demo's for each component and compositions.

### Viewing test pages

To view the test pages, your CLI will tell you the URL but it's http://localhost:9001 by default.

# Build targets

XUI has three build targets for external consumption.

1. Minified CSS for deployment to the edge CDN.
2. React components as ES6 modules for deployment to Artifactory.
3. A UMD bundle of all React components for prototyping.

## CSS build

### npm scripts

`npm run dist` will do a minified SCSS build down to a single CSS file.

## ES6 modules for Artifactory deployment

React components use JSX and ES2017. We need to transpile our ES2017 source code down to ES5 compatible JavaScript. [Babel](https://babeljs.io/) allows us to transpile our components without bundling up anything, which will ensure the smallest possible built artifact for our consumers.

### npm scripts

`npm run build:prepublish` is the build task that is executed just before we deploy to Artifactory. It combines several other build tasks to create our Artifactory deployable build artifacts.

`npm run clean:babel` is run first and removes any artifacts left over from a previous prepublish build. This ensures that deleted source files don't accidentally live on in the built artifact.

`npm run build:babel` transpiles the raw source in `src/react` down to ES5 and puts the output into a new folder called `react` in the root folder of the project. This folder is listed in the `files` property of the `package.json`, so it'll be bundled up for publishing.

`npm run copy:sass` is run last and just copies the raw SCSS files into a folder called `scss` in the root folder of the project. Many consumers use the variables and mixins we provide to ensure that they are using the right colors and/or consistent spacing within their application. Moving this up to a root level folder allows consumers to import the SCSS variables and mixins from the more appropriate `@xero/xui/scss` path.

## UMD module for prototyping

The [UMD specification](http://bob.yexley.net/umd-javascript-that-runs-anywhere/) is a module format that allows module code to be used in any or no module system. This makes it an ideal target for creating a build of all the XUI components that can be used for demos, bug reports, and any other non-production use case.

For the UMD build we want to bundle everything up and attach it to the `window` object or a single module export. We have a script to import everything and re-export it as a flat object.

`umd/createEntryPoint.js` reads the file system and manually imports everything from the `src/react` folder and creates `src/react/umd.js` that exports everything as a flat object.

### npm scripts

`npm run build` will create a new UMD build of all the React components at `dist/umd/assets/xui.umd.js`.

### Testing a UMD build

A simple test page exists at `dist/umd/index.html` which will load up the build UMD file attempt to use the global library at `window.XUI` to show a button on the page. If you want to go a bit further on that test, feel free (the JavaScript is inline on the page).

# Making contributions and releases

Contributions can be made via issues and pull requests. Please be aware of what we consider to be
[breaking changes](#breaking-changes) and avoid making them if possible.

If you are confident that you do not have breaking changes, open your PR against `master`.
Otherwise, prefix your PR title with `[breaking-changes]` (or other feature branch), add the `breaking change` label,
and open your PR against the `breaking-changes` branch (or other feature branch).

The XUI documentation is generated from annotations of our SCSS, JavaScript and markdown files. Please ensure that your change
is also correctly reflected in the generated documentation. Things to check:

- CSS class names have descriptions
- XUI Guide examples are updated
- Components and examples are updated to use any new CSS
- Relevant deprecation notices with recomended replacements

You should cc [@UXE/uxe-team](https://github.dev.xero.com/orgs/UXE/teams/uxe-team)
on pull requests for prompt feedback.

If you are submitting a pull request, please include a screenshot of your change (if your change is visual)
to aid the review process.

Do not bump the version in package.json as part of your PR. If you would like a release to be made
once your change has been merged, please highlight that in your PR's description. The UXE team will
coordinate releases, which adhere to the following guidelines.

| Version                  | Release content                                       | Release cadence     |
| ------------------------ | ----------------------------------------------------- | ------------------- |
| Patch                    | Bugs, other low-risk changes                          | As needed - 2 wks\* |
| Minor                    | New features/components that are backwards-compatible | 30 - 60 days\*      |
| Major (Breaking changes) | Updates that will cause regressions to older versions | 3 - 6 months\*      |

\*Longest times depend on relevant changes having been merged to the working branch. If there are no changes awaiting release, time between releases could be longer. [Read more on this release strategy.](https://confluence.teamxero.com/display/PLAT/2019/11/28/The+evolution+of+release+strategy+for+XUI)

## Breaking changes

**If it requires consumers to make changes to their code, then it's a breaking change**.

This includes:

- Removing or renaming existing classes. All our classes are public and should be considered XUI's "API"
- Removing or renaming existing mixins, variables or anything else that would be available if XUI's individual
  SCSS files were imported by a project
- Modifying properties of existing classes in a way that could break standard web layouts implemented with those classes.
  Since projects may subscribe to a semver range (either patch or minor), we do not want layouts breaking unexpectedly.
- Changes to Component APIs

New CSS classes are not considered breaking changes. Changes to existing classes that do not impact
layout are also not considered breaking changes (e.g. font-weight, color, border-color, box-shadow, etc).

If you're unsure, ask on the UXE slack channel: #platform-fed-xui

To submit a PR that contains a breaking change, make sure that it is made against the
[breaking-changes branch](https://github.dev.xero.com/UXE/xui/tree/breaking-changes). If it is merged,
it will be included in the next major release.

### Documenting current breaking changes

The `breaking-changes` branch should contain `changes.md`, a markdown file with two main sections. One detailing changes to React components, and the other detailing changes to CSS.

Both sections should cover renames, additions, removals, or altered behaviour.

### Deprecations

- All deprecations should come with a suggested alternative. This may mean just changing classes used, DOM structure, or the Component used.
- Search through the docs and components of the version the deprecation is being made at to make sure all usage of the deprecated item is replaced with the suggested alternative.
- Add TODO comments next to the deprecations to highlight their future removal.
- Deprecations may be introduced in patch releases so long as they are documentation-only (e.g. signaling that something will be removed in a future version).

#### CSS deprecation documentation

CSS deprecations should be detailed in a 5th level KSS block, with a 'sunsetting' flag applied. If the deprecated classes are in the same page as their suggested replacement, they should appear beneath their replacement. Alternatively, they should be positioned at the bottom of the page.

e.g.

```
// Sentiment colours
//
// Definitions:
// Positive: `xui-color-positive`:	<div class="xui-container"><span class="xui-color-positive">21.3% decrease</span></div>
// Negative: `xui-color-negative`:	<div class="xui-container"><span class="xui-color-negative">Yes, delete this invoice</span></div>
//
// Styleguide: Fundamentals.Typography.30.2
```

## Documentation style guide

Our documentation writing style is based on [the Financial Times Origami documentation style guide](https://origami.ft.com/docs/principles/tone-and-language/). It exists as guidance to help keep our documentation consistent.

1. Be conversational
   - Use contractions: "we're" over "we are"
   - Starting sentences with conjunctions like 'but' or 'so' is allowed
1. Prefer "we" to "I"
   - **good**: "we recommend you do X"
   - **bad**: "I recommend you do X"
1. Use the active voice. If you need help with this one, use [http://www.hemingwayapp.com/](http://www.hemingwayapp.com/)
   - **good**: "we recommend you do X"
   - **bad**: "it is recommended you do X"
1. Omit fluff. Avoid qualifiers like "pretty", "mostly", "probably"
1. Prefer short sentences to long sentences
1. Use British English
   - **good**: organise, favour
   - **bad**: organize, favor
1. Avoid metaphors or turns of phrase that non-native English speakers may not be familiar with
   - **good**: "this site has everything you need to know"
   - **bad**: "this site is a one stop shop for XUI"
1. [Avoid "simply" and other words that trivialise concepts and ideas that might not be trivial](https://css-tricks.com/words-avoid-educational-writing/)
1. When referring to XUI React components; use back-ticks, correct capitalisation, and no spaces
   - **good**: `XUIButton`, `DropDown`
   - **bad**: `XUI Button`, DropDown
1. Structure documentation for skim readers
   - Code variables go in `back-ticks`
   - Use tables
   - Use asides for extra tidbits
   - Use **strong** and _emphasis_ where appropriate
   - Use lists
   - Break things up with informative headings
1. Always capitalise XUI when referring to the product
1. Never capitalise modules
   - **good**: avatar, button
   - **bad**: Avatar, Button

### Need help?

Slack: [#xui-development](https://xero.slack.com/messages/C565NP1A5)
