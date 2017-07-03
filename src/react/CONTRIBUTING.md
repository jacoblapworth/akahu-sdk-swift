# Development Documentation for the XUI React Component Library
======================

## Requirements

You'll need:

 * [NodeJS](https://nodejs.org/)
 * [ESLint](http://eslint.org/)j plugin installed and configured [for your code editor or IDE](http://eslint.org/docs/user-guide/integrations).  If possible, you should configure it to run `--fix` every time you save.  It'll make your life easier.
 * [Editorconfig](http://editorconfig.org/) plugin installed and configured for you code editor or IDE

[nvm](https://github.com/creationix/nvm) is recommended. If you don't use `nvm`, check the `.nvmrc` file to see which version of node to use.

## Important npm scripts

Script                     | Description
---------------------------|-------------
`npm install`              | Installs dependencies; required for other steps
`npm run lint`             | Lints the React components and SCSS files
`npm run lint:js`          | Lints the React components
`npm run lint:js:fix`      | Runs ESLint with the [autofix feature](http://eslint.org/docs/user-guide/command-line-interface#--fix) enabled
`npm run test`             | Runs all the React component unit tests
`npm run test:watch`       | Runs all the React component unit tests and watches for file changes
`npm run test:ui`          | Compiles and sets up the uitest demo page for a given component to do visual testing during development.  See the UI Testing section for more details.
`npm run lint:js:fix`      | Lints the React components and automatically fixes as many issues as possible
`npm run build:prepublish` | Cleans and creates the root level `react` and `sass` folders that will be deployed to Artifactory.
`npm run build:babel`      | Creates a `react` folder containing babel'd code ready to be deployed
`npm run build:umd`        | Creates a single JS artifact that can be dropped into any browser or Codepen sample
`npm run clean`            | Many of our build tasks create temporary files that are ignored by git and can/should be deleted before doing another build.  This task removes those temporary files and is used by other tasks as well.
`styleguide`               | Build and start up the [styleguidist](https://react-styleguidist.js.org/) documentation for all React components.
`styleguide:build`         | Build a static version of the [styleguidist](https://react-styleguidist.js.org/) documentation for all React components that is suitable for deployment.

## File Structure

XUI includes many components, and not every consumer will use every component.  To prevent ensure a smaller build artifact for our consumers, XUI's folder structure has been set up to ensure that people only have to include what they need.  This means that the React components folder has one entry point for each major component.

### Entry Points

Each major component has a single file inside of the `src/react` folder.  Its only job is to import individual component and re-export them.  This ensures an easy transition from the older bower_components, makes it easy to import related components on a single line, and reduces the amount of code that ends up in consumers final built artifact.

### Components folder

The actual source code for the React components live in `src/react/components` with each entry point file having an associated `components` folder.  Source files for the individual components can be found in the component folder along side the `__tests__` folder which contains unit tests, helper functions and constants files which can be found in `helpers` or `private` folders, and a `uitest` folder containing a `demo.js` file that is used for interactive UI development test pages.

Only actual XUI components should live in the root of the associated component folder.  Tests should always live in the `__tests__` folder, and any private helpers, constants, etc should live in a `private` folder.  This makes it easier to target only our components, exclude unit tests, etc in our various build tasks.

## ESLint

As you might imagine, code quality is extremely important for a component library like XUI.  ESLint helps us catch common errors that cause bugs in many programs.  While some extremely opinionated rule sets (ie AirBnB's rule set) are welcome for some, many of those rules don't actually improve code quality and can just get in the way of developer productivity.  That's why we've chosen to extend a simple rule set based on `eslint:recommended` and `react:recommended`.  These rules provide value without making developers want to flip their desks in frustration.

### NPM Scripts

`npm run lint` will run ESLint on all the JavaScript in this repository as well as run csslint on the `src/sass` folder.

`npm run lint:js` will just run ESLint on all the JavaScript.

`npm run lint:js:fix` will also run ESLint, but with the [autofix feature](http://eslint.org/docs/user-guide/command-line-interface#--fix) enabled.  This is an extremely handy feature, especially when a rule has been changed, or outside code has been imported into the project.  While not all errors can be automatically fixed, it does take quite a bit of tedium out of the process.

## Unit Tests

### Conventions

In order to make it easy for us to both target our unit tests and ignore them when doing various build tasks, we have some naming/file structure conventions around test files.  First, all test files should have a name that ends with `-test.js`.  Second, they should be included in a `__tests__` folder inside of the component's folder.  For example, the unit tests for the SelectBox component live at `src/react/components/select-box/__tests__/SelectBox-test.js`.

If you need to create a new unit test file, you should be sure to follow this convention or your tests might end up being deployed to Artifactory or just not run.

### Jest Test Runner

Over the years, there have been many test runners like Mocha and Karma.  However, each has its drawbacks.  Mocha is focused on Node development so many browser APIs will be undefined.  Karma will actually run your tests in a browser, but the CLI isn't great, tests take a while to start, and you have to have the appropriate browsers installed, which makes teasting on TeamCity painful.

This is why we've chosen to use the [Jest Test Runner](http://facebook.github.io/jest/) developed by Facebook.  The CLI is quite excellent, tests run fast, and it comes with its own assertion library.  If you're unfamiliar with Jest or just want to read up on specific APIs you come across, hit up the [Jest documentation](http://facebook.github.io/jest/docs/en/api.html).  Jest's configuration lives in `jest.config.js` in the root folder of this project.

### Enzyme

Many unit tests for React components require checking the state and/or props of child components, simulating DOM events, and traversing the DOM to make sure DOM elements look the way they're supposed to.  Many of our tests use the [Enzyme library](http://airbnb.io/enzyme/) developed by AirBnB to accomplish these tasks.  It has a very clean, jQuery'esque API that makes finding and testing React components much easier.

### NPM Scripts

`npm run test` will do a single pass run of all unit tests and then exit.

`npm run test:watch` will run all the tests with the `--watch` flag set.  Jest will attempt to only run appropriate tests based on which files have been modified.

## Development UI Test Pages

Linting and unit tests are an extremely important part of ensuring code quality for XUI, but they both have their limitations.  Does the DatePicker work well when put inside of a DropDown?  Is a DropDown positioned correctly when the trigger button is in the top-right hand part of the screen?  Does that animation actually look smooth in the browser?  These kinds of questions require you to actually look at and interact with the components on an web page.  To facilitate this, we've created some tools for creating these pages for each component.

### NPM Script

`npm run test:ui -- --env.c=[component name]` uses [webpack](https://webpack.js.org/) build build and bundle the `demo.js` file for the given component name and output the result on the page located at `uitest/index.html`.

Yes, the `-- --env.c=` is the correct syntax.  The first `--` is how arguments are passed to the scripts invoked by an npm script.  The `--env.c` argument tells webpack which component's test page you want to look at.

### demo.js

Code for the UI test pages live in a file called `demo.js` inside of the component's `uitest` folder.  So, the UI test page for button lives at `src/react/components/button/uitest/demo.js`.  This is where you can create however many fanciful test cases you may need.  If you need some extra CSS to set things up, just create a `.scss` file in the `uitest` folder and import it at the top of `demo.js`.

All UI test pages also include the contents of `src/sass` on the page.  This ensures that when you're testing, you're testing against the latests XUI CSS and won't be surprised by CSS differences between latest master and the last release.

### Viewing test pages

Since all the demo.js pages require the exact same HTML scaffolding, a single HTML file at `uitest/index.html` exists.  After each build, you can just open up this HTML in your browser using the `file://` protocol.  For example, if the source code for the XUI project lives at `/source/xui` on your computer, you could visit `file:///source/xui/uitest/index.html` to see the build demo.js page in action.

## Developer Documentation

As a library, we need a way to allow developers to see all of the components that the library offers, read some documentation on what that component does, see a couple of examples, and know which props can be passed to that component to control behavior.  Manually creating this kind of documentation can and is both time consuming and error prone since it means duplicating much of the information already contained in source JSDoc comments used by developers and React PropTypes for runtime validation.  Keeping the two in sync is difficult and, quite frankly, annoying.  But it's very important for consumers of the library.

Past efforts on this front have taught us quite a bit, and we've found a tool that utilizes existing markdown files and JSDoc comments to reduce the amount of work necessary to create these important docs.

### react-styleguidist

[react-styleguidist](https://react-styleguidist.js.org/) is a lovely tool that makes generating these docs easier on the development team.  It allows us to create a single searchable documentation page that combines markdown descriptions, short example code snippets, and automatic generation of PropType documentation using [react-docgen](https://www.npmjs.com/package/react-docgen).

### File Structure

Each component entry point has an accompanying `.md` file with a short description and some examples wrapped in a three backtick block.  Most of your written documentation about what use case componets serve and how they fit together would go here.

react-styleguidist is also configured to scan all of our components and generate automatic documentation using [react-docgen](https://www.npmjs.com/package/react-docgen).  This tool uses static analysis of the component's propTypes object and any associated JSDoc comments to create documentation on props and any public APIs that have JSDoc comments.  Therefore, it's very important to both create and maintain these JSDoc style comments.

## Build Targets

XUI's primary uses are as a stand-alone CSS library and a dependency installed in a consuming application.  However, you might also want to stick all of the React components into a Codepen for a demonstration or bug report.  These various use cases require different build tasks to get us the right build artifact.

### CSS build

Every consumer of XUI includes the CSS library in a `<link>` tag on their page.  This means that the SCSS needs to be compiled down to CSS and deployed to the edge S3 bucket for consumption by users.

`npm run build` will compile the SCSS into a single CSS file.

`npm run dist` will do a minified SCSS build down to a single CSS file.

`npm run doc` will use [KSS](http://warpspire.com/kss/) to create the XUI documentation based on the specially formatted comments at the top of each SCSS file.

### Babel Build for Artifactory Deployment

React components use JSX syntax, ES6 classes, and other features that just aren't available in all our supported browsers.  That means that we need to transpile our raw source code down to ES5 compatible JavaScript.  The [babel CLI](https://babeljs.io/) allows us to transpile all of our components without bundling up anything, which will ensure the smallest possible built artifact for our consumers.

`npm run build:prepublish` is the build task that executed just before we deploy to Artifactory.  It combines several other build tasks to create our Artifactory deployable build artifacts.

`npm run clean:babel` is run first and removes any artifacts left over from a previous prepublish build.  This ensures that deleted source files don't accidentally live on in the built artifact.

`npm run build:babel` transpiles the raw source in `src/react` down to ES5 and puts the output into a new folder called `react` in the root folder of the project.  This folder is listed in the `files` property of the `package.json`, so it'll be bundled up for publishing.

`npm run copy:sass` is run last and just copies the raw SCSS files into a folder called `scss` in the root folder of the project.  Many consumers use the variables and mixins we provide to ensure that they are using the right colors and/or consisten spacing within their application.  Moving this up to a root level folder allows consumers to import the SCSS variables and mixins from the more appropriate `@xero/xui/scss` path.

### UMD Build

The [UMD specification](http://bob.yexley.net/umd-javascript-that-runs-anywhere/) is a module format that allows module code to be used in any or no module system.  This makes it an ideal target for creating a build of all the XUI components that can be used for demos, bug reports, and any other non-production use case.

#### Multiple Entry Point Challenge

As discussed above in the File Structure section, we have multiple entry points for our components to keep final consumer built artifact sizes down.  However, in this situation, we don't want that.  We want to bundle everything up and attach them all to the `window` object or a single module export.  This means we need a file that imports everything and re-exports it as a flat object.  Now, we could simply have that file exist in source control, but it would be annoying to maintain and might create confusion for consumers.  So, like all good developers, we needed to write some scripts...

`umd/createEntryPoint.js` solves this multiple entry point problem by reading the file system and manually importing everything from the `src/react` folder.  It then creates a file at `src/react/umd.js` that exports everything as a single flat object.  In other words, it uses string concatenation to create the JavaScript source code that does the appropriate importing/exporting and writes that file to `src/react/umd.js`.

#### NPM Scripts

`npm run build:umd` will create a new UMD build of all the React components at `umd/assets/xui.umd.js`.  It uses several other tasks to accomplish individual parts of this goal.

`npm run clean:umd` removes any artifacts created by a previous UMD build.

`npm run build:umd:entry` executes the aforementioned `umd/createEntryPoint.js` script to create the UMD entry point for the library.

`npm run build:umd:webpack` then uses webpack to build `src/react/umd.js` as a web library called XUI.

`npm run clean:umd:post-build` is the last script to run and gets rid of the now unnecessary `src/react/umd.js` to make sure that other NPM scripts don't accidentally pick it up as a valid component.

#### Testing a UMD Build

A simple test page exists at `umd/index.html` which will load up the build UMD file attempt to use the global library at `window.XUI` to show a button on the page.  If you want to go a bit further on that test, feel free (the JavaScript is inline on the page).

## Post-Install Scripts

After an install, there are a couple of things we want to do in order to help ensure the quality of our applications.

First, we'll want to make sure that you're using an appropriate version of node and npm, so there's a `npm run check:engines` script that runs.

Second, if we're using a library with a known security vulnerability, we **DEFINITELY** want to know about and fix that.  Luckily, there's a centrally [maintained list of known vulnerabilities](https://nodesecurity.io/advisories/) in node packages.  It may not be exhaustive, but it's better than nothing.  The `npm run check:security` script utilizes the [nsp package](https://www.npmjs.com/package/nsp) to check and see if we're exposed to one of those known vulnerabilities.
