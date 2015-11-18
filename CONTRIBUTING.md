
Getting Started
===============

You'll need:

 * [NodeJS](https://nodejs.org/)
 * [Ruby](https://www.ruby-lang.org/en/)
 * [Bundler](http://bundler.io/)

[nvm](https://github.com/creationix/nvm) and [Grunt](http://gruntjs.com/) are recommended, but not required.


npm scripts
-----------

Script          | Description
----------------|-------------
`npm install`   | Installs dependencies; required for other steps.
`npm run lint`  | Lints the stylesheet.
`npm run build` | Compiles the stylesheet
`npm run dist`  | Creates a minified version of the stylesheet (assumes you have run `build` first)
`npm run doc`   | Compiles the style guide documentation.
`npm run watch` | Watches for changes in SCSS files.
`npm run watch -- --livereload` | Enables livereload on port 35729.


Conventions
-----------

All classes should be prefixed with `xui-`.

Be sure to `npm run lint` before you commit.

If you are bumping the version, please update the usage example in [README.md](README.md)
to point at your new version.

Classes should follow the format:

 * `xui-component`
 * `xui-component-modifier`
 * `xui-component--subcomponent`
 * `xui-component--subcomponent-modifier`
 * `xui-component-is-state`
 * `xui-is-globalstate`

This format is a [BEM](https://en.bem.info/)-inspired evolution of [SMACSS](https://smacss.com/).

 * `xui-component` represents the higher level of an abstraction or component.
 * `xui-component-modifier` represents a different state or version of `xui-component`.
 * `xui-component--subcomponent` represents a descendant of `xui-component` that
   helps form `xui-component` as a whole.

Use class selectors. Do not use ids or element selectors.

Avoid nesting as much as possible; if you really need to, nest up to a maximum
of 2 levels deep.

Layout styling should be separate to component styling. Individual components
should not make assumptions about their layout (e.g. by setting margins, or position).

Avoid the anti-pattern of applying styles in a generic class and then undoing them in a
more specific class.


Patterns
--------

When you have one set of styles for the first item and a different set of styles for all
other items, use `nth-of-type(n+2)` or `:nth-child(n+2)` as appropriate.

See: [How nth-child works](https://css-tricks.com/how-nth-child-works/) and
[nth-child Tester](https://css-tricks.com/examples/nth-child-tester/)

If you used `:first-child` to target the first item and a more general class selector for all
other items, it is likely you would need to undo some styles for the `:first-child`, which would
violate our conventions.


Making Contributions
--------------------

Contributions can be made via issues and pull requests. For [breaking changes](#breaking-changes),
please open PRs against the `breaking-changes` branch. Otherwise open your PR against master.

You should cc [@UXE/uxe-team](https://github.dev.xero.com/orgs/UXE/teams/uxe-team)
on pull requests for prompt feedback.

If you are submitting a pull request, please include a screenshot of your change
to aid the review process.

Do not bump the version in package.json as part of your PR. If you would like a release to be made
once your change has been merged, please highlight that in your PR's description. The UXE team will 
coordinate releases.

Breaking Changes
----------------

A change is considered to be breaking if:

* It removes existing classes. All our classes are public and should be considered XUI's "API"
* It alters existing classes in a way that could break layouts implementing the existing classes.
Since projects may subscribe to a semver range (either patch or minor), we do not want layouts
breaking unexpectedly.

New CSS classes are not considered breaking changes.

If you're not sure, [ask on the UXE flow](https://www.flowdock.com/app/xero/ux-engineering).
