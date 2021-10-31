# Styleguidist Notes

## File Structure

Each component entry point has an accompanying `.md` file with a short description and some examples wrapped in a three backtick block. Most of your written documentation about what use case components serve and how they fit together would go here.

react-styleguidist is configured to scan all of our components and generate automatic API documentation using [react-docgen](https://www.npmjs.com/package/react-docgen). It uses static analysis of the component's propTypes object and any associated JSDoc comments to create documentation on props and any public APIs that have JSDoc comments. Therefore, **It's very important to both create and maintain these JSDoc style comments**.

## JSS and components.

The prescribed method for customising the layout is to copy the components and alias them in via the webpack config.

The CSS is done using JSS which is preparing a JS object and then using a HOC to merge it into the react component.
This uses an isolate mode to prevent styles leaking into component examples, but it also means all components have this massive list of explicitly inherited and set styles. Its quite yuk.

Styleguidist will add the JSDoc comments of any component APIs that you explicitly mark as `@public` to the docs page. However, there are some caveats:

1. The description has to come before the `@public` notation
2. You can't use the `method = () => {` code style to automatically bind the method. Looks like react-docgen executes **after** the babel-loader, which means that the function has been moved into the constructor (that's how it does the automatic binding. Take a look at the transpiled code if you'd like.) and the JSDoc comments end up just hanging out in the middle of the file....

Styleguidist will also pick up on any JSDoc descriptions of your propTypes. However, there is a caveat: You can not use `@prop` or type descriptions or anything like that. It's best to just format your code and comments like so:

```js
MyComponent.propTypes = {
  /** Prop description goes here */
  awesome: PropTypes.bool
};
MyComponent.defaultProps = {
  awesome: true
};
```

XUI SASS is being imported in the overwritten components/StyleGuide.js, which enables the current version of XUI to be rendered on the page by default/inlined etc.

Component Demos are targeted with `xui-container`. `xui-body` is not currently globally applied.

## Version introduced flags

This flag is used for indicating which version of XUI a component or feature was introduced in. It will appear alongside the flags mentioned above with a link to the release notes of the specified version.

The version flag should be used for all new components, features, and classnames introduced in a minor release. All version flags should be removed for a major (breaking-changes) release.

To add a version flag to a section (e.g. Tables) add the `introduced` property to `sections.json`. This property should be added alongside the `name` and `content` properties for the section.

All other headings can be extended to include a version flag by using the following format (where `x.x.x` is the XUI version number):

```md
## Heading | x.x.x
```
