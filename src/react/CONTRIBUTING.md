# Development Documentation for the XUI React Component Library

## File Structure

XUI includes many components, to ensure a smaller build artifact, XUI's folder structure has been set up to enable developers to include only what they need. The React components folder has one entry point for each major component.

### Entry Points

Each component has a single entry point file inside of the `src/react` folder. This imports related components and re-exports them making it easier to import into applications via a single statement.

### Components folder

Component source lives in `src/react/components` with each entry point file having an associated `components` folder. Source files for the individual components can be found in the component folder with one or more of the following subfolders:

* `__tests__` for unit tests
* `uitest` containing a `demo.js` file that is used for interactive UI development test pages.
* `helpers` for helper functions
* `private` for constants

Only public XUI components should live in the root of the associated component folder. Tests should always live in the `__tests__` folder, and any private helpers, constants, etc should live in a `private` folder. This convention makes it easier to target only our components, exclude unit tests, etc in our various build tasks.

## ESLint

ESLint helps us catch common errors that cause bugs in many programs. XUI extends a simple rule set based on `eslint:recommended` and `react:recommended`.

### npm Scripts

`npm run lint` will run ESLint on all the JavaScript in this repository as well as run csslint on the `src/sass` folder.

`npm run lint:js` will just run ESLint on all the JavaScript.

`npm run lint:js:fix` will also run ESLint, but with the [autofix feature](http://eslint.org/docs/user-guide/command-line-interface#--fix) enabled. Not all errors can be automatically fixed but it does take quite a bit of tedium out of the process.

## Unit Tests

### Conventions

We have some naming/file structure conventions around test files. All test files should have a name that ends with `-test.js`. Second, they should be included in a `__tests__` folder inside the component's folder. e.g. unit tests for the SelectBox component live at `src/react/components/select-box/__tests__/SelectBox-test.js`.

When adding new unit test files, you should follow this convention to prevent side effects e.g. tests might end up being deployed to Artifactory or just not run.

### Jest Test Runner

We use the [Jest Test Runner](http://facebook.github.io/jest/) developed by Facebook. If you're unfamiliar with Jest or just want to read up on specific APIs you come across, hit up the [Jest documentation](http://facebook.github.io/jest/docs/en/api.html). Jest's configuration lives in `jest.config.js` in the root folder of this project.

### Enzyme

Many unit tests for React components require checking the state and/or props of child components, simulating DOM events, and traversing the DOM to make sure DOM elements look the way they're supposed to. For this we use the [Enzyme library](http://airbnb.io/enzyme/) developed by AirBnB. It has a very clean, jQuery'esque API that makes finding and testing React components much easier.

### npm Scripts

`npm run test` will do a single pass run of all unit tests and then exit.

`npm run test:watch` will run all the tests with the `--watch` flag set. Jest will attempt to only run appropriate tests based on which files have been modified.

## Development UI Test Pages (Under review)

Linting and unit tests are an extremely important part of ensuring code quality for XUI, but they both have their limitations. UI test pages provide interactive pages for each component to test various configurations manually in the browser.

### npm Script

`npm run test:ui -- --env.c=[component name]` uses [webpack](https://webpack.js.org/) to build and bundle the `demo.js` file for the given component name and output the result on the page located at `uitest/index.html`.

The first `--` passes arguments to an npm script. The `--env.c` argument tells webpack which component's test page you want to look at.

### demo.js

Code for the UI test pages live in `demo.js` inside of the component's `uitest` folder.  This is where you can create however many test cases you need. If you need some extra CSS to set things up, just create a `.scss` file in the `uitest` folder and import it at the top of `demo.js`.

All UI test pages also include the contents of `src/sass` on the page. This ensures that when you're testing, you're testing against the latest XUI CSS.

### Viewing test pages

All `demo.js` pages require the same HTML scaffolding, `uitest/index.html`. After each build, you can just open up this file in your browser using the `file://` protocol or your favourite localhost webserver.

## Developer Documentation

### react-styleguidist

[react-styleguidist](https://react-styleguidist.js.org/) provides our component specific documenation including descriptions, interactive and editable component examples and API documenation. This is authored using markdown descriptions, short example code snippets, and automatic generation of PropType documentation using [react-docgen](https://www.npmjs.com/package/react-docgen).

### File Structure

Each component entry point has an accompanying `.md` file with a short description and some examples wrapped in a three backtick block. Most of your written documentation about what use case components serve and how they fit together would go here.

react-styleguidist is configured to scan all of our components and generate automatic API documentation using [react-docgen](https://www.npmjs.com/package/react-docgen). It uses static analysis of the component's propTypes object and any associated JSDoc comments to create documentation on props and any public APIs that have JSDoc comments. Therefore, **It's very important to both create and maintain these JSDoc style comments**.

## Build Targets

XUI's primary uses are as a stand-alone CSS library and as a dependency installed in a consuming application. However, you might also want to stick all of the React components into a Codepen for a demonstration or bug report. These various use cases require different build tasks to get us the right build artifact.

### CSS Build

Every consumer of XUI includes the CSS library in a `<link>` tag on their page. This means that the SCSS needs to be compiled down to CSS and deployed to the edge S3 bucket for consumption by users.

`npm run build` will compile the SCSS into a single CSS file. Note that this file is not production-ready as sass does not dedupe imports and so the resulting file will include many repetitive comments.

`npm run dist` will do a minified SCSS build down to a single CSS file.

`npm run doc` will use [KSS](http://warpspire.com/kss/) to create the XUI documentation based on the specially formatted comments in each SCSS file.

### Babel Build for Artifactory Deployment

React components use JSX syntax, ES6 classes, and other features that aren't available in all our supported browsers. That means that we need to transpile our ES2017 source code down to ES5 compatible JavaScript. The [babel CLI](https://babeljs.io/) allows us to transpile all of our components without bundling up anything, which will ensure the smallest possible built artifact for our consumers.

`npm run build:prepublish` is the build task that is executed just before we deploy to Artifactory. It combines several other build tasks to create our Artifactory deployable build artifacts.

`npm run clean:babel` is run first and removes any artifacts left over from a previous prepublish build. This ensures that deleted source files don't accidentally live on in the built artifact.

`npm run build:babel` transpiles the raw source in `src/react` down to ES5 and puts the output into a new folder called `react` in the root folder of the project. This folder is listed in the `files` property of the `package.json`, so it'll be bundled up for publishing.

`npm run copy:sass` is run last and just copies the raw SCSS files into a folder called `scss` in the root folder of the project. Many consumers use the variables and mixins we provide to ensure that they are using the right colors and/or consisten spacing within their application.  Moving this up to a root level folder allows consumers to import the SCSS variables and mixins from the more appropriate `@xero/xui/scss` path.

### UMD Build

The [UMD specification](http://bob.yexley.net/umd-javascript-that-runs-anywhere/) is a module format that allows module code to be used in any or no module system.  This makes it an ideal target for creating a build of all the XUI components that can be used for demos, bug reports, and any other non-production use case.

#### Multiple Entry Point Challenge

As discussed above in the File Structure section, we have multiple entry points for our components to keep final consumer built artifact sizes down. However, in this situation, we don't want that. We want to bundle everything up and attach them all to the `window` object or a single module export. This means we need a file that imports everything and re-exports it as a flat object.  Now, we could simply have that file exist in source control, but it would be annoying to maintain and might create confusion for consumers. So, like all good developers, we needed to write some scripts...

`umd/createEntryPoint.js` solves this multiple entry point problem by reading the file system and manually importing everything from the `src/react` folder. It then creates a file at `src/react/umd.js` that exports everything as a single flat object. In other words, it uses string concatenation to create the JavaScript source code that does the appropriate importing/exporting and writes that file to `src/react/umd.js`.

#### npm Scripts

`npm run build:umd` will create a new UMD build of all the React components at `umd/assets/xui.umd.js`. It uses several other tasks to accomplish individual parts of this goal.

`npm run clean:umd` removes any artifacts created by a previous UMD build.

`npm run build:umd:entry` executes the aforementioned `umd/createEntryPoint.js` script to create the UMD entry point for the library.

`npm run build:umd:webpack` then uses webpack to build `src/react/umd.js` as a web library called XUI.

`npm run clean:umd:post-build` is the last script to run and gets rid of the now unnecessary `src/react/umd.js` to make sure that other npm scripts don't accidentally pick it up as a valid component.

#### Testing a UMD Build

A simple test page exists at `umd/index.html` which will load up the build UMD file attempt to use the global library at `window.XUI` to show a button on the page. If you want to go a bit further on that test, feel free (the JavaScript is inline on the page).

## Post-Install Scripts

After an install, there are a couple of things we want to do in order to help ensure the quality of our applications.

First, we'll want to make sure that you're using an appropriate version of node and npm, so there's a `npm run check:engines` script that runs.

Second, if we're using a library with a known security vulnerability, we **DEFINITELY** want to know about and fix that. Luckily, there's a centrally [maintained list of known vulnerabilities](https://nodesecurity.io/advisories/) in node packages. It may not be exhaustive, but it's better than nothing. The `npm run check:security` script utilizes the [nsp package](https://www.npmjs.com/package/nsp) to check and see if we're exposed to one of those known vulnerabilities.
