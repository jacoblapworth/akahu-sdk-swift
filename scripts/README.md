# Node scripts

The purpose of this directory is to house a set of useful, simple, node utilities that allow us to easily automate some of the more common build and operational tasks we often need to do with our code-base.

You'll find a description of each task at the bottom of this document.

## How do you use these scripts?

From the root of this project, simply call `node scripts/<path to script>`.

## Contributing scripts

If you find yourself in need of automating a task in the code-base, you may add a node script to this section. Note, it's better practice to run small, simple scripts from these set of folders, than it is to create new `npm` "scripts" as these scripts are best served when providing simple, chained sets of tasks for larger more common actions such as: Building the dev environment just after install or preparing for release to production etc.

### Some conventions

> _Conventions are, in fact, a necessary evil_ - TimR

- Treat writing your scripts the same way you would write a lambda, or micro-service; Single use, Single responsibility functions that perform one task.
  - That being said, it's OK to write chains. Chains are functions that use many of your micro-service functions together.
- All modules that export a function, should also make use of the 'make-runnable' npm package. It enables the ability to both export the function for use in other modules as well as run it directly from the command line.
- Make use of the helpers as much as you can. Examples include the `Performance` module for calculating and displaying script run time and `logTaskTitle` module for logging similar titles for tasks etc. They make the experience consistent between scripts.
- File names should best match in english, the actual task you're wanting to perform. For example, I want to watch the xui sass files for changes, then build the xui css when those files change. I would create a script in `scripts/watch` called `xui` and I would create a script in `build/sass` called `xui`. The former would watch for changes and call the second script, the latter would perform the literal build and output.
- Modules that are required, but never exported as workable functions, for example, config files, should be placed relative to the file they're used inside a `private` folder. Global versions of these should be placed in the `scripts/private` folder.
- You can make use of the Promise built-in library at your will. There is a `.eslintrc.js` file in this directory that fixes the global Promise eslint errors for you.

## A little bit of history

This was created originally to replace an older, aging Grunt pipeline. Grunt was seeing less maintenance (not necessarily a bad thing) over time and the extra reliance of having a task runner, when we could quite easily achieve the same / similar by replicating and replacing with node scripts was something the team decided to do. So we embarked on this project in Feb 2018 to switch away from Grunt completely.

## Script checklist

#### backstop

- approve.js : Approves screenshot comparison changes, in relation to visual regression testing. You would typically run this script manually.

#### build

- [x] babel.js
- [x] index.js
- [x] kss.js
- [x] storybook.js
- [x] styleguidist.js
- [x] umd_webpack.js

##### cssmin

- index.js : Builds the XUI css files, then minifies the core distributable

##### kss

- index.js : Creates the KSS site, and outputs it to the `dist/docs` directory
- tmp.js : Outputs some documentation around tokens, into the `src/sass/tmp` directory

##### postcss

- [x] doPostCss.js
- [x] kss.js
- [x] tokens.js
- [x] xui.js

##### sass

- [x] compileSass.js - not a runnable task
- [x] kss.js
- [x] xui.js

#### check-engines

- [x] index.js

#### clean

- [x] css.js
- [x] docs.js
- [x] headless_chrome.js
- [x] react.js
- [x] sass.js
- [x] src_react_umd.js
- [x] src_sass_tmp.js
- [x] umd_assets.js

#### lint

- [x] js_fix.js
- [x] js.js
- [x] sass.js

#### postinstall

- [x] index.js

#### release // N/A

#### start

- [x] index.js

#### storybook

- [x] index.js

#### styleguide

- [x] index.js

#### test // N/A

#### umd

- [x] create_entry_point.js

#### update-versions

- [x] index.js

#### watch // N/A
