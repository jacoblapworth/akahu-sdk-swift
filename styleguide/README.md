# Styleguidist Notes

## JSS and components.

The presecribed method for customising the layout is copy the components and alias them in. via the webpack config

The CSS is done using JSS which is preparing a JS object and then using a hoc to merge it into the react component.
This uses an issolate mode to prevent styles leaking into component examples, but it also means all components have
this massive list of explixcitly inherited and set styles. Its quite yuk.

Imports in MD examples need to be done using require (cjs) and often the default attribute needs surfacing see input.md for an example

Styleguidist will add the JSDoc comments of any component APIs that you explicitly mark as `@public` to the docs page.  However, there are some caveats:

1. The description has to come before the `@public` notation
2. You can't use the `method = () => {` code style to automatically bind the method.  Looks like react-docgen executes **after** the babel-loader, which means that the function has been moved into the constructor (that's how it does the automatic binding.  Take a look at the transpiled code if you'd like.) and the JSDoc comments end up just hanging out in the middle of the file....

XUI SASS is being imported in the overwritten components/StyleGuide.js, this enables the current version of XUI to be rendered on the page by default/inlined etc.

Component Demos are targeted with `xui-container` and `xui-body` is not currently globally applied.
