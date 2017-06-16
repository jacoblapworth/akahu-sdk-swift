# Styleguidist Notes

## JSS and components.

The presecribed method for customising the layout is copy the components and alias them in. via the webpack config

The CSS is done using JSS which is preparing a JS object and then using a hoc to merge it into the react component.
This uses an issolate mode to prevent styles leaking into component examples, but it also means all components have
this massive list of explixcitly inherited and set styles. Its quite yuk.

Imports in MD examples need to be done using require (cjs) and often the default attribute needs surfacing see input.md for an example

XUI SASS is being imported in the overwritten components/StyleGuide.js, this enables the current version of XUI to be rendered on the page by default/inlined etc.

Component Demos are targeted with `xui-container` and `xui-body` is not currently globally applied.
