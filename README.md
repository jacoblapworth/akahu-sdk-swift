XUI
===

[![TC_build_status](https://teamcity1.inside.xero-support.com/app/rest/builds/buildType:id:Xui_Style_Master/statusIcon)](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_Master)
![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)

## Make things people know and love
XUI is a design system for Xero web applications. It includes standard approaches and patterns plus the front-end code to implement them. XUI lets us focus on user problems over UI problems, keep a large codebase healthy, and get to market quickly.

### Always get the latest versions here:
* XUI Guide: https://xui.xero.com/
* XUI on GitHub: https://github.dev.xero.com/UXE/xui

### Jump to the latest docs
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/working-with-xui.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/section-getting-started.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/fundamentals.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/section-fundamentals.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/building-blocks.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/section-building-blocks.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/react.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/react/)
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/update.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/section-updates.html)
[<img src="https://github.dev.xero.com/raw/UXE/xui/master/.github/feedback.png" alt="alt text" width="140px" height="186px"/>](https://xui.xero.com/master/section-feedback.html)

## Setting up XUI for local development

### Requirements

You'll need:

 * Node.js [nvm](https://github.com/creationix/nvm) (MacOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) is recommended. If you don't use `nvm`, check the `.nvmrc` file to see which version of node to use.
 * [ESLint](http://eslint.org/) plugin installed and configured [for your code editor or IDE](http://eslint.org/docs/user-guide/integrations). If possible, you should configure it to run `--fix` every time you save.  It'll make your life easier.
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

Install dependencies and start development servers.

```
npm install
npm start
```

Open http://localhost:6060 to view the docs.

Open http://localhost:9001 to view the storybook.

This is running a webpack dev server for the docs site and watches to automatically rebuild. The CSS uses livereload and React docs use hot module replacement. It uses storybook for component development

#### Folder structure

XUI has a number of top level folders. When contributing all the interesting files are under the `src` folder.
* `src/docs/` contain SCSS and markdown files used by the documentation system.
* `src/react/` has entry points for all the components.
* Each component has a sub folder inside `src/react/components/`.
  * Only public  UI components should live in the root of the associated component folder.
  * Tests should always live in the `__tests__` folder.
	* Stories should always live in the `stories` folder.
  * Private helpers, constants, etc should live in a `private` folder.
  * This convention makes it easier to target only our components, exclude unit tests, etc in our various build tasks.
* `src/sass/` contains all the SCSS partials and is organised following ITCSS conventions.

```
src/
├─ docs/
│  ├─ building-blocks/
│  ├─ fundamentals/
│  ├─ react/
│  └─ working-with-xui/
├─ react/
│  └─ components/
│     ├─ component1/
│     │  ├─ __tests__/
│     │  ├─ helpers/
│     │  ├─ private/
│     │  └─ stories/
│     └─ component2/
└─ sass/
   ├─ components/
   ├─ elements
   ├─ objects/
   ├─ settings/
   ├─ tools/
   └─ trumps
```

#### npm scripts

XUI has a few npm scripts. `npm start` should be enough for all development tasks.


Script              | Description
--------------------|-------------
`npm install`       | Installs dependencies; Typically only needed to run after you clone the repo for the first time or change any dependencies.
`npm start`         | Builds all the sites, and outputs such as the XUI css files, and starts up servers for each site for you to start developing on.
`npm run lint`      | Lints the React components to ensure code quality.
`npm run test`      | Runs all the React component unit tests to ensure components meet their prescribed definitions.
`npm run build`     | Compiles the stylesheet, Builds the KSS docs, Styleguide and Storybook apps. Compiles tokens and creates the UMD bundle. Used for creating a release.

## Hooks

We use [Husky](https://www.npmjs.com/package/husky) to run **Git Hooks** for the following scenarios:

**Note:** If you are using a clone of the XUI repo from < 2018 then you may need to remove our legacy Git hooks for Husky to work *(Husky will **not** overwrite existing Git hooks)*. Please run the snippet below or reach out on our [Slack channel](https://xero.slack.com/messages/C565NP1A5) for assistance.

```
rm .git/hooks/pre-commit .git/hooks/post-commit .git/hooks/pre-push .git/hooks/post-checkout .git/hooks/post-merge\
&& npm install husky --save-dev

```

## Pre-commit

Lint your code and catch problems that will cause your build to fail in the CI environment. This will run automatically before a commit.

## Post-merge

Update your local environment after a merge. This will not trigger when rebasing upstream but is still good to have active.

## Pre-push

Runs `npm run test` before pushing the code up to code repository.

## Prepare

After an install, there are a couple of things we want to do in order to help ensure the quality of our applications.

First, we'll want to make sure that you're using an appropriate version of node and npm, so there's a `check-engines` script that runs.

Second, if we're using a library with a known security vulnerability, we **DEFINITELY** want to know about and fix that. Luckily, there's a centrally [maintained list of known vulnerabilities](https://nodesecurity.io/advisories/) in node packages. It may not be exhaustive, but it's better than nothing. The `nsp` script utilizes the [nsp package](https://www.npmjs.com/package/nsp) to check and see if we're exposed to one of those known vulnerabilities.

## Prepack

This task prepares the `react` and `sass` files for distribution via Artifactory. Used only on CI currently and run as part of the `npm pack` lifecycle.

## Node scripts

XUI uses custom node scripts for automating tasks within the repository. The tasks live in the `scripts` root folder. Each task can be run by calling `node scripts/<folder>/<task>`

Many of these are "part of the build chain". Many are small independent scripts that perform one task. Further documentation on these can be found at `scripts/README.md`

## Developer Documentation

XUI is a living design system that uses source annotations and markdown files to document itself. XUI provides two layers of documentation. XUI Guide contains the best practices and CSS examples and XUI React Docs contain component documentation and examples. Both systems provide running example code and in the React Docs this can be edited in the browser. These tools are configured separatly and we have a number of customisations that are unique to Xero.

### XUI Guide (KSS)

Configured in `kss/` folder. Checkout our [kss/README.md](kss/README.md) for notes on our customisation and configuration.

### React Docs (react-styleguidist)

Configured in `styleguide/` folder. Checkout our [styleguide/README.md](styleguide/README.md) for notes on customisation and configuration.

[react-styleguidist](https://react-styleguidist.js.org/) provides our component specific documenation including descriptions, interactive and editable component examples and API documenation. This is authored using markdown descriptions, short example code snippets, and automatic generation of PropType documentation using [react-docgen](https://www.npmjs.com/package/react-docgen).

## Releasing XUI

1. Draft up the Release notes in GitHub
2. Open a PR with the version bump to package.json (optionally use the `node scripts/release` task to help automate this as there are some files outside package json that need to be version bumped also).

The release description should provide clear documentation describing what has changed since the last release.

The release notes can be organised under the following sections:
 * New features
 * Bug fixes
 * Deprecations
 * Any notable documentation updates
 * Removals (`breaking-changes` only)

### Alpha/beta releases

All releases from `breaking-changes` should also supply an up-to-date list of all changes since the last major release.

### CI & CD builds

The UXE team manage releases of XUI via TeamCity. Following are the common builds that make up the continuous integration and continuous deployment pipeline.

* [Pull request](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_PullRequest) all pull requests run lint test scripts. Triggered by new or updated Pull Request.
* [Update-gh-pages](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_UpdateGhPages) builds and releases documentation for all releases, `master` and `breaking-changes` branches. Triggered by successful merge to `master` or `breaking-changes` branches.
* [Master](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_Master) and [breaking-changes](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_BreakingChanges) build XUI for deployment to edge.xero.com. Triggered on successful merge to `master` or `breaking-changes` branches.
* [Deploy to Production](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_DeployToProduction) deploy a release build of XUI to production. Depends on successful build of master (above). Triggered by successful build of master.
* [Deploy to Production [breaking-changes]](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_DeployS3BreakingChanges) deploy a pre-release build of XUI to production. Depends on successful build of breaking-changes (above). Triggered manually.
* [Deploy Monorepo Components to Artifactory](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_DeployMonorepoComponentsToArtifactory) and [Deploy Monorepo Components to Artifactory [breaking-changes]](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_DeployBreakingChangesMonorepoComponentsToArtifactory) prepare and deploy React components to artifactory.

### Upgrading between versions of XUI

To make the upgrade process between versions of XUI easier, we maintain a codemod to automate some of the API changes in your code. The codemod runs using [jscodeshift](https://github.com/facebook/jscodeshift).

From XUI 14 onwards, the codemod will contain transforms for moving from the previous major version of XUI.

How to run the codemod:

1. Install jscodeshift
 ```bash
 npm i -g jscodeshift
 ```
1. Run the codemod
 ```bash
 jscodeshift -t node_modules/@xero/xui/codemod src/
 ```

## Contributing to XUI

We welcome contributions from anyone.
See [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md) for details on how to contribute.

## Help

For general Q & A ask a question in the [#xui-development](https://xero.slack.com/messages/C565NP1A5) Slack or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have a UXE team member on interrupts each week who can provide a prompt response to any specific questions or issues. Check Slack for who's on duty.

XUI's Roadmap and backlog live within the [UX Engineering teams's page](https://confluence.inside.xero.com/display/PLAT/UX+Engineering) on Confluence.
