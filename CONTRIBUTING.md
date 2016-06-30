Contributing Icons
==================

This project pulls in it's icon data from `src/iconData.js`. If you wish to add an icon to the set, they may be added here. Simply add a new entry into the json with the icon name and path value for drawing the icon.

### Pre-commit hook
You can add a pre-commit hook to ensure you're building the javascript files before making your PR by running the following command:
```bash
$ ln -s ../../pre-commit.sh .git/hooks/pre-commit
```

### Rollup
Rollup is used to bundle icon blob files and the XUI docs icon display. This process has two main steps, the rollup build step, then a node script `build/build.js` which uses the bundles created by rollup to create plain js files in `dist`.
 - `rollup.config.js` is responsible for bundling `XUIIconBlob`
 - `rollup.config.docs.js` is responsible for bundling the XUI docs icon display
