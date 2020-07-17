# XUI

[![TC_build_status](https://teamcity1.inside.xero-support.com/app/rest/builds/buildType:id:Xui_Style_Master/statusIcon)](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_Master)
[![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)](https://slack.com/app_redirect?channel=C565NP1A5)

## Make things people know and love

XUI is a design system for Xero web applications. It includes standard approaches and patterns plus the front-end code to implement them. XUI lets us focus on user problems over UI problems, keep a large codebase healthy, and get to market quickly.

### Always get the latest versions here:

- XUI Guide: https://xui.xero.com/
- XUI on GitHub: https://github.dev.xero.com/UXE/xui

## Setting up XUI for local development

### Requirements

You'll need:

- Node.js [nvm](https://github.com/creationix/nvm) (MacOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) is recommended. If you don't use `nvm`, check the `.nvmrc` file to see which version of node to use.
- [ESLint](http://eslint.org/) plugin installed and configured [for your code editor or IDE](http://eslint.org/docs/user-guide/integrations). If possible, you should configure it to run `--fix` every time you save. It'll make your life easier.
- [Editorconfig](http://editorconfig.org/) plugin installed and configured for you code editor or IDE.
- [Prettier](https://prettier.io/) plugin installed for you code editor or IDE. Configure your code editor or IDE to format on save.
- A command line. Bash/zsh/etc MacOs. Git Bash Windows.
- Docker for [Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) or [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) to run visual regression tests.
  - _At the time of writing, those downloads are behind a login wall. There is an [ongoing discussion on GitHub](https://github.com/docker/docker.github.io/issues/6910), which currently includes [direct download links](https://github.com/docker/docker.github.io/issues/6910#issuecomment-558605879)._

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

This is running a webpack dev server for the docs site and watches to automatically rebuild. The CSS uses livereload and React docs use hot module replacement. It uses storybook for component development.

#### Folder structure

XUI has a number of top level folders. When contributing all the interesting files are under the `src` folder.

- `src/docs/` contain SCSS and markdown files used by the documentation system.
- `src/react/` has entry points for all the components.
- Each component has a sub folder inside `src/react/components/`.
  - Only public UI components should live in the root of the associated component folder.
  - Tests should always live in the `__tests__` folder.
  - Stories should always live in the `stories` folder.
  - Private helpers, constants, etc should live in a `private` folder.
  - This convention makes it easier to target only our components, exclude unit tests, etc in our various build tasks.
- `src/sass/` contains all the SCSS partials and is organised following ITCSS conventions.

```
src/
├─ docs/
│  ├─ components/
│  ├─ compositions/
│  ├─ fundamentals/
│  ├─ getting-started/
│  ├─ patterns/
│  └─ react/
├─ react/
│  └─ components/
│     ├─ component1/
│     │  ├─ __tests__/
│     │  ├─ helpers/
│     │  ├─ private/
│     │  └─ stories/
│     └─ component2/
└─ sass/
   ├─ 1-vars/
   ├─ 2-mixins/
   ├─ 3-reset/
   ├─ 4-base/
   ├─ 5-structure/
   ├─ 6-containers/
   ├─ 7-components/
   └─ 99-utils/
```

#### npm scripts

XUI has a few npm scripts. `npm start` should be enough for all development tasks.

| Script                           | Description                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm install`                    | Installs dependencies; Typically only needed to run after you clone the repo for the first time or change any dependencies.                                                                                                                      |
| `npm start`                      | Builds all the sites, and outputs such as the XUI css files, and starts up servers for each site for you to start developing on.                                                                                                                 |
| `npm run lint`                   | Lints the React components to ensure code quality.                                                                                                                                                                                               |
| `npm run lint:fix`               | Lints the React components to ensure code quality and automatically fixes problems where possible.                                                                                                                                               |
| `npm run prettier`               | Checks code and documentation formatting with Prettier.                                                                                                                                                                                          |
| `npm run prettier:fix`           | Formats code and documentation with Prettier.                                                                                                                                                                                                    |
| `npm run test`                   | Runs all the React component unit tests to ensure components meet their prescribed definitions.                                                                                                                                                  |
| `npm run test:visual`            | Runs visual regression tests to flag visual changes in components.                                                                                                                                                                               |
| `npm run test:visual button`     | Only runs the visual regression tests for the specified component (e.g. replace `button` with the name of the component you want to test). This uses regex to match partial names.                                                               |
| `npm run test:visual -- --clean` | Rebuilds the Docker image and container before running the visual regression tests. Try running this if you have any problems.                                                                                                                   |
| `npm run test:visual:approve`    | Accepts the changes flagged by the visual regression tests.                                                                                                                                                                                      |
| `npm run test -- -i`             | Runs the interactive variant of the test script which gives you additional test options including visual regression, code coverage and more.                                                                                                     |
| `npm run review`                 | Runs React unit tests and visual regression tests and lints the React components, intended to be run before opening a pull request. This double-checks for visual regressions and ensures the TeamCity build will be successful.                 |
| `npm run build`                  | Compiles the stylesheet, Builds the KSS docs, Styleguide and Storybook apps. Compiles tokens and creates the UMD bundle. Used for creating a release.                                                                                            |
| `npm run release`                | This script is reserved for running before we plan on doing a release on a local and before doing the release PR. Updates all versions of XUI in package(-lock).json, and a few other files where required to the new version we plan to release |

## Hooks

We use [Husky](https://www.npmjs.com/package/husky) to run **Git Hooks** for the following scenarios:

**Note:** If you are using a clone of the XUI repo from < 2018 then you may need to remove our legacy Git hooks for Husky to work _(Husky will **not** overwrite existing Git hooks)_. Please run the snippet below or reach out on our [Slack channel](https://xero.slack.com/messages/C565NP1A5) for assistance.

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

Many of these are "part of the build chain". Many are small independent scripts that perform one task. Further documentation on these can be found at [scripts/README.md](scripts/README.md)

## Developer Documentation

XUI is a living design system that uses source annotations and markdown files to document itself. XUI provides three layers of documentation. XUI Guide contains the best practices and CSS examples and XUI React Docs contain component documentation and examples, finally XUI Storybook gives us the system we need to properly apply a visual regression test over our components. All systems provide running example code and in the React Docs this can be edited in the browser. These tools are configured separately and we have a number of customisations that are unique to Xero.

### XUI Guide (KSS)

Configured in `.kss/` folder. Checkout our [.kss/README.md](.kss/README.md) for notes on our customisation and configuration.

### React Docs (react-styleguidist)

Configured in `.styleguidist/` folder. Checkout our [.styleguidist/README.md](.styleguidist/README.md) for notes on customisation and configuration.

[react-styleguidist](https://react-styleguidist.js.org/) provides our component specific documenation including descriptions, interactive and editable component examples and API documenation. This is authored using markdown descriptions, short example code snippets, and automatic generation of PropType documentation using [react-docgen](https://www.npmjs.com/package/react-docgen).

### Storybook

Configured in `.storybook/` folder.

#### Debugging

XUI's React components can be debugged in Storybook with Visual Studio Code.

To get started, install the [Debugger for chrome](https://github.com/Microsoft/vscode-chrome-debug) extension for Visual Studio Code.

Next, go to the Debug panel and click the start button at the top of the panel.

You can now add breakpoints that will be triggered by the Chrome window that opened automatically.

## Releasing XUI

[Please use the checklist form](https://forms.gle/DhuTT6yrz6EMfBdH9) which will walk you through the process and create a record of the release. The general process will be:

1. [Draft up the Release notes in GitHub](https://github.dev.xero.com/UXE/xui/releases/new).
   - The release description should provide clear documentation describing what has changed since the last release. Best practice is to include PR numbers per change.
     - The release notes can be organised under the following sections:
     - New features
     - Bug fixes
     - Deprecations
     - Any notable documentation updates
     - Removals (`breaking-changes` only)
2. Ensure locally, you're on the latest commit on the branch; patch, minor or breaking-changes; that you want to release.
3. Run `npm run release` on your branch and choose the appropriate release type. Verify the version you want to release matches the intended release type.
4. Open a PR to the upstream branch with your changes post `npm run release`
5. PR the updated upstream branch: patch; minor; breaking-changes; into master.
6. Tag the release in Github matching the updated version in package.json
7. [Log into AWS](https://ap-southeast-2.console.aws.amazon.com/codepipeline/home?region=ap-southeast-2#/view/xui-code-pipeline) and approve the release. Note: You'll need `Developer @ xero-platformdevelopment-test` as minimum permissions to approve the release.
8. Once the release is finalised, you will need to verify everything has been released correctly.
   - XUI CSS : hit https://edge.xero.com/style/xui/[your-new-version]/xui.css, expect 200
   - Sherlock JSON: hit https://edge.xero.com/style/xui/sherlock.json, expect 200 and version exists in JSON
   - Check you can install expected XUI version into test app, or your own app.
   - Check docs branch has been updated in github
   - Check docs have been released on the website https://xui.xero.com/[your-new-version]/

### Alpha/beta releases

All releases from `breaking-changes` should also supply an up-to-date list of all changes since the last major release.

### CI & CD builds

The UXE team manage releases of XUI via AWS Codepipeline. Following are the common builds that make up the continuous integration and continuous deployment pipeline.

- [Pull request](https://ap-southeast-2.console.aws.amazon.com/codebuild/home?region=ap-southeast-2#/projects/xui-pull-requests/view) all pull requests run lint test scripts. Triggered by new or updated Pull Request.
- [Deploy to Production](https://ap-southeast-2.console.aws.amazon.com/codepipeline/home?region=ap-southeast-2#/view/xui-code-pipeline) deploy a release build of XUI to production. Triggered by new tags against the repository.

### Upgrading between versions of XUI

When you upgrade XUI, please check [changes.md](./changes.md) to see what shared dependencies have changed in XUI and check which dependencies you need to update in your projects - otherwise you may end up bundling multiple versions of xui-icon or other dependencies and bloating your application artifacts.

As of XUI 15, we also offer [upgrade guides](https://drive.google.com/drive/search?q=upgrade%20guide:%20xui) to provide a step-by-step walkthrough of upgrading your project across a major version.

To make the upgrade process between versions of XUI easier, we maintain a codemod to automate some of the API changes in your code. The codemod runs using [jscodeshift](https://github.com/facebook/jscodeshift) (which currently does not support TypeScript).

The codemod contains transforms for moving from the previous major version of XUI.

How to run the codemod:

1. Install jscodeshift

```bash
npm i -g jscodeshift@~0.10.0
```

2. Run the codemod

```bash
jscodeshift -t node_modules/@xero/xui/codemod src/
```

3. If your imported components are not from @xero/xui/react/, you can pass an alternate base path.

```bash
jscodeshift --importBasePath=@xero/xui/react-es6/ -t node_modules/@xero/xui/codemod src/
```

4. If you've already upgraded to the current major version and wish to run a supplemental codemod from a minor/patch

```bash
jscodeshift -t node_modules/@xero/xui/codemod/<version> src/
```

**NB** There are several other configuration settings you may need to set for your project, including --extensions and --parser. By default, codeshift examines .js files with babel.

For example:

```bash
jscodeshift -t ./node_modules/@xero/xui/codemod/index.js src/ --parser=tsx --extensions=ts,tsx
```

## Contributing to XUI

We welcome contributions from anyone.
See [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md) for details on how to contribute.

## Help

For general Q & A ask a question in the [#xui-development](https://xero.slack.com/messages/C565NP1A5) Slack or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have a UXE team member on interrupts each week who can provide a prompt response to any specific questions or issues. Check Slack for who's on duty.

XUI's Roadmap and backlog live within the [UX Engineering teams's page](https://confluence.inside.xero.com/display/PLAT/UX+Engineering) on Confluence.
