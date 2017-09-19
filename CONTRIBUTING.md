# Want to contribute?

## First Timers

XUI is built using [nodejs](https://nodejs.org/) and we recommend using [Node version Manager](https://github.com/creationix/nvm) or similar ([nvm-windows](https://github.com/coreybutler/nvm-windows)) to manage node versions as the minimum version required does change from time to time.

XUI currently has two build pipelines, one for CSS and one for React components. For now there are two separate CONTRIBUTING.md docs for getting a local build up and running these are linked bellow in the [Development Workflow](#development-workflow) section.

We use an "up-for-grabs" label to indicate issues that are suitable for first timers and new contributers these shoud be relatively straight forward. You can [filter issues to show just up-for-grabs](https://github.dev.xero.com/UXE/xui/issues?q=is%3Aopen+is%3Aissue+label%3Aup-for-grabs) and look out for ones you might like to try.

We always want help improving documentation, examples and test coverage. Even if we don't have specific issues for these if you see something you want to improve, [raise and issue](https://github.dev.xero.com/UXE/xui/issues/new), assign yourself and give it a go.

**Some useful info**

* If you are working on an issue, assign it to yourself in Github so we know you're having a look at it.
* Ensure you're working on a forked copy of XUI and preferably a sensibly named branch.
* Include relevant documentation updates and tests in along with any code changes.
* Write meaningful commit and PR messages ([Anatomy Of a Good Commit Message](https://adamcod.es/2012/07/03/anatomy-of-a-good-commit-message.html) has some good info).
* Always add a "rel|ref|fixes:" issue reference and always ensure an issue exists before opening a PR.
* cc @UXE/uxe-team or @UXE/developers for code reviews.
* Ask questions on issues, PRs or in Slack.

## Bugs

### Where to Find Issues

We use [GitHub Issues](https://github.dev.xero.com/UXE/xui/issues) to track our bugs. We keep a close eye on the issues and try to make it clear when we'll have a fix. Before filing a new issue, please check that it hasn't already been reported.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. If possible please provide this test case along side a [new issue](https://github.dev.xero.com/UXE/xui/issues/new).

### Proposing a Change

If you intend to introduce something new, or something old doesn't quite fit your needs, feel free to [raise an issue](https://github.dev.xero.com/UXE/xui/issues/new) and we will be more than happy to look at it. Alternatively feel free to talk to us on #platform-fed-xui on slack.

If you're only fixing a bug, it's fine to submit a pull request right away.

## Development Workflow

* [SCSS contributing guide](src/sass/CONTRIBUTING.md)
* [React contributing guide](src/react/CONTRIBUTING.md)

## Releases

The [UXE team](https://github.dev.xero.com/orgs/UXE/teams/uxe-team) coordinate releases.

The release description should provide clear documentation describing what has changed since the last release.

All releases from `breaking-changes` should also supply an up-to-date list of all changes since the last major release.

The release notes can be organised under the following sections:
 * New features
 * Bug fixes
 * Deprecations
 * Any notable documentation updates
 * Removals (`breaking-changes` only)

### Need help?

Slack: #platform-fed-xui
