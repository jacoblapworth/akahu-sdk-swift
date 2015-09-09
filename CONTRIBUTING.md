# Getting Started

You'll need:

* [NodeJS](https://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)

[nvm](https://github.com/creationix/nvm) is recommended, but not required.

# Conventions

All classes should be prefixed with `xui-`.

Be sure to `npm run lint` before you commit.

Classes should follow the format: 
* `xui-component`
* `xui-component-modifier`
* `xui-component--subcomponent`
* `xui-component--subcomponent-modifier`
* `xui-component-is-state`
* `xui-is-globalstate`

Use class selectors. Do not use ids or element selectors.

Avoid nesting as much as possible; if you really need to, nest up to a maximum of 3 levels deep.

Layout styling should be separate to component styling. Individual components should not make assumptions about their layout (e.g. by setting margins, or position).