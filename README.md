XUI
===

[![TC_build_status](https://teamcity1.inside.xero-support.com/app/rest/builds/buildType:id:Xui_Style_Master/statusIcon)](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_Master)
![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)

## Make things people know and love
XUI is a design system for Xero web applications. It includes standard approaches and patterns plus the front-end code to implement them. XUI lets us focus on user problems over UI problems, keep a large codebase healthy, and get to market quickly.

### Always get the latest versions here:
* XUI Guide: https://github.dev.xero.com/pages/UXE/xui/
* XUI on GitHub: https://github.dev.xero.com/UXE/xui

[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/working-with-xui.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/section-getting-started.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/fundamentals.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/section-fundamentals.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/building-blocks.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/section-building-blocks.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/react.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/react/)
[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/update.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/section-updates.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/breaking-changes/.github/feedback.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/section-feedback.html)

## Setting up XUI for local development

### Requirements

You'll need:

 * Node.js [nvm](https://github.com/creationix/nvm) (MacOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) is recommended. If you don't use `nvm`, check the `.nvmrc` file to see which version of node to use.
 * [ESLint](http://eslint.org/)j plugin installed and configured [for your code editor or IDE](http://eslint.org/docs/user-guide/integrations). If possible, you should configure it to run `--fix` every time you save.  It'll make your life easier.
 * [Editorconfig](http://editorconfig.org/) plugin installed and configured for you code editor or IDE
 * A command line. Bash/zsh/etc MacOs. Git Bash Windows.



### Clone and install

From the command line:

```
git clone git@github.dev.xero.com:UXE/xui.git xui
cd xui
```

Set the correct Node.js version (may require `nvm install x.x.x`).

```
# MacOS
nvm use
```

```
# nvm-windows requires the exact version of node to be specified
cat .nvmrc
nvm list [available]
nvm use x.x.x
```

Install dependencies and start development server.

```
npm install
npm start
```

Open http://localhost:6060 to view the docs.

This is running a webpack dev server for the docs site and watches to automatically rebuild. The CSS uses livereload and React docs use hot module replacement.

#### npm Scripts

XUI has a lot of npm scripts. These are under review. `npm start` should be enough for most development. If the watches or dev server give you troubles you will need to run the following commands that will have a similar result to `npm start`, the built files will live in the `docs` directory and you'll need to use [http-server]() or [serve]() as a test webserver.

```
# Build CSS docs
npm run lint:sass && npm run build && npm run doc
```

```
# Build Component docs
npm run lint:js && npm run styleguide:build
```


Script              | Description
--------------------|-------------
`npm install`       | Installs dependencies; required for other steps
`npm run lint`             | Lints the React components and SCSS files
`npm run lint:js`          | Lints the React components
`npm run lint:js:fix`      | Runs ESLint with the [autofix feature](http://eslint.org/docs/user-guide/command-line-interface#--fix) enabled
`npm run lint:sass` | Lints the stylesheet
`npm run build`     | Compiles the stylesheet
`npm run dist`      | Creates a minified version of the stylesheet (assumes you have run `build` first)
`npm run doc`       | Compiles the style guide documentation into the `docs` folder
`npm run watch`     | Watches for changes in SCSS files and live reloads them if you have the docs open.
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

## Releasing XUI

The UXE team manage releasing XUI via a CI/CD pipeline run on Team City.

## Contributing to XUI

We welcome contributions from anyone.
See [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md) for details on how to contribute.

## Help

For general Q & A ask a question in the [#xui-development](https://xero.slack.com/messages/C565NP1A5) Slack or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have a UXE team member on interrupts each week who can provide a prompt response to any specific questions or issues. Check Slack for who's on duty.

XUI's Roadmap and backlog live within the [UX Engineering teams's page](https://confluence.inside.xero.com/display/PLAT/UX+Engineering) on Confluence.
