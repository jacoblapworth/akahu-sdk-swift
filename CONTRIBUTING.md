# Getting Started

You'll need:

* [NodeJS](https://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)

[nvm](https://github.com/creationix/nvm) is recommended, but not required.

# npm scripts

Script          | Description
----------------|-------------
`npm install`   | Installs dependencies; required for other steps.
`npm run lint`  | Lints the stylesheet.
`npm run build` | Compiles the stylesheet
`npm run dist`  | Creates a minified version of the stylesheet (assumes you have run `build` first)
`npm run doc`   | Compiles the style guide documentation.
`npm run watch` | Watches for changes in SCSS files.
`npm run watch -- --livereload` | Enables livereload on port 35729.

# Conventions

All classes should be prefixed with `xui-`.

Be sure to `npm run lint` before you commit.

If you are bumping the version, please update the usage example in [README.md](README.md) to point at your new version.

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
* `xui-component--subcomponent` represents a descendant of `xui-component` that helps form `xui-component` as a whole.

Use class selectors. Do not use ids or element selectors.

Avoid nesting as much as possible; if you really need to, nest up to a maximum of 2 levels deep.

Layout styling should be separate to component styling. Individual components should not make assumptions about their layout (e.g. by setting margins, or position).

# Making Contributions

Contributions can be made via issues and pull requests.

You should cc [@Style/uxe-team](https://github.dev.xero.com/orgs/Style/teams/uxe-team) on pull requests for prompt feedback.

If you are submitting a pull request, please include a screenshot of your change to aid the review process.
