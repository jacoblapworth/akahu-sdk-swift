Getting Started
===============

You'll need:

 * [NodeJS](https://nodejs.org/)
 * [Editorconfig](http://editorconfig.org/) plugin installed and configured for you code editor or IDE

[nvm](https://github.com/creationix/nvm) is recommended. If you don't use `nvm`, check the `.nvmrc` file to see
which version of node to use.


npm scripts
-----------

Script          | Description
----------------|-------------
`npm install`   | Installs dependencies; required for other steps
`npm run lint`  | Lints the stylesheet
`npm run build` | Compiles the stylesheet
`npm run dist`  | Creates a minified version of the stylesheet (assumes you have run `build` first)
`npm run doc`   | Compiles the style guide documentation into the `docs` folder
`npm run watch` | Watches for changes in SCSS files and live reloads them if you have the docs open.

We recommend that you run the `watch` task as it will lint and compile the SCSS and docs for you.
Otherwise you will manually need to run something like `npm run lint && npm run build && npm run doc`


pre-commit hook
---------------

You can add a pre-commit [hook](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) so that steps that might cause your build to fail in the CI environment are run before you commit.

Install the hook by running the following command:

```bash
$ ln -s ../../pre-commit.sh .git/hooks/pre-commit
```


post-merge hook
---------------

You can also add a post-merge hook so that your local environment is updated after a merge.

Install the hook by running the following command:

```bash
$ ln -s ../../post-merge.sh .git/hooks/post-merge
```


Conventions
-----------

All classes must be prefixed with `xui-`.

Classes should follow the format:

 * `xui-component`
 * `xui-component-modifier`
 * `xui-component--subcomponent`
 * `xui-component--subcomponent-modifier`
 * `xui-component-is-state`
 * `xui-is-globalstate`

This format is a [BEM](https://en.bem.info/)-inspired evolution of [SMACSS](https://smacss.com/).

 * `xui-component` represents the higher level of an abstraction or component.
 * `xui-component-modifier` represents a different state or version of `xui-component`.
 * `xui-component--subcomponent` represents a descendant of `xui-component` that
   helps form `xui-component` as a whole.

Use class selectors wherever possible. Use attribute selectors only if absolutely required.
Do not use ids or element selectors.

[Nesting selectors is bad](http://markdotto.com/2015/07/20/css-nesting/); we only allow 2 levels max.

Layout styling should be separate to component styling. Individual components
should not make assumptions about their layout (e.g. by setting margins, padding or position).
Examples can be shown using the layout primitive classes.

A modifier class with the `-layout` suffix may be provided for the purpose of providing the most common layout
configuration for that component, including responsive styling. More info on layout styling can be found in this blog post: [Styling Components in XUI 10](https://confluence.inside.xero.com/x/ww0YCQ).

Avoid the anti-pattern of applying styles in a generic class and then undoing them in a
more specific class.

If you are adding images, ensure you prefix their path with the `$xui-images-path` variable and use
a leading slash, e.g. `background: url("#{$xui-images-path}/inputs/search.svg")`

If you are contributing a new component, be sure to provide ample documentation, which should include any
applicable ARIA attributes, and demonstrate at least 2 different examples of the same component with
different classes, children, or using different elements
(e.g. showing the component classes when used with a `<div>` parent and a `<ul>` parent)

Be sure to `npm run lint` before you commit. This can be done automatically if you install the [precommit hook](#precommit-hook).


Patterns
--------

When you have one set of styles for the first item and a different set of styles for all
other items, use `nth-of-type(n+2)` or `:nth-child(n+2)` as appropriate.

See: [How nth-child works](https://css-tricks.com/how-nth-child-works/) and
[nth-child Tester](https://css-tricks.com/examples/nth-child-tester/)

If you used `:first-child` to target the first item and a more general class selector for all
other items, it is likely you would need to undo some styles for the `:first-child`, which would
violate our conventions.


Making Contributions
--------------------

Contributions can be made via issues and pull requests. Please be aware of what we consider to be
[breaking changes](#breaking-changes) and avoid making them if possible.

If you are confident that you do not have breaking changes, open your PR against `master`.
Otherwise, prefix your PR title with `[breaking-changes]` (or other feature branch), add the `breaking change` label,
and open your PR against the `breaking-changes` branch (or other feature branch).

We use a pretty OCD linter, so make sure your code passes linting before opening a PR, otherwise
your PR build will fail.

The XUI documentation is generated from the comments in our SCSS files. Please ensure that your change
is also correctly reflected in the generated documentation.

You should cc [@UXE/uxe-team](https://github.dev.xero.com/orgs/UXE/teams/uxe-team)
on pull requests for prompt feedback.

If you are submitting a pull request, please include a screenshot of your change (if your change is visual)
to aid the review process.

Do not bump the version in package.json as part of your PR. If you would like a release to be made
once your change has been merged, please highlight that in your PR's description. The UXE team will
coordinate releases.

Be sure to `npm run lint` before you commit. This can be done automatically if you install the [precommit hook](#precommit-hook).


Breaking Changes
----------------

Determining what constitutes a breaking change in CSS can be tricky.

We want product design to evolve for free over time which may include layout changes that are predictable and which should
have low impact on apps provided they have not used fixed sizes on elements.

The general rule is: **if it requires consumers to make changes to their code, then it's a breaking change**.

This includes:

* Removing or renaming existing classes. All our classes are public and should be considered XUI's "API"
* Removing or renaming existing mixins, variables or anything else that would be available if XUI's individual
SCSS files were imported by a project
* Modifying properties of existing classes in a way that could break standard web layouts implemented with those classes.
Since projects may subscribe to a semver range (either patch or minor), we do not want layouts breaking unexpectedly.

New CSS classes are not considered breaking changes. Changes to existing classes that do not impact
layout are also not considered breaking changes (e.g. font-weight, color, border-color, box-shadow, etc)

If you're unsure, [ask on the UXE flow](https://www.flowdock.com/app/xero/ux-engineering).

To submit a PR that contains a breaking change, make sure that it is made against the
[breaking-changes branch](https://github.dev.xero.com/UXE/xui/tree/breaking-changes). If it is merged,
it will be included in the next major release. See the [roadmap](https://github.dev.xero.com/UXE/xui/wiki#roadmap)
for more details.
