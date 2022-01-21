# XUI Pipeline

[View this pipeline in TeamCity](https://teamcity1.inside.xero-support.com/project/Xui_Xui?mode=builds)

This pipeline was set up using [PaaS' TeamCity Kotlin instructions](https://paas.xero.dev/docs/teamcity/kotlin/kotlin-build-from-scratch)

## XUI Artifacts Pipeline

This pipeline requires a manual start, and will deploy XUI's artifacts, including:

- The `@xero/xui` npm package
- CSS files
- UMD folder
- Tokens file
- `sherlock.json`

### Using the pipeline

Go to the TeamCity project, and click 'Deploy' next to the environment you wish to deploy to.
This should be performed after you have merged all desired changes to `master`, and updated the version via `npm run release` and creating the new git tag.

### Pipeline overview

A more detailed overview with diagram can be found [on Confluence](https://xero.atlassian.net/l/c/x1TQYzuy)

1. Gets code through VCS Root - this being the current master.
2. Builds XUI
   1. Determines the current version from package.json
   2. Builds the library via calling `npm run build`
   3. Adds an `npm pack` step, to create the tarball file
   4. Exports the necessary artifacts via the `addNpmLibraryArtifacts` helper.
3. Deploys XUI
   1. Runs a single `DeployToArtifactory` helper, with custom steps included
   2. A `deployToS3Custom` step deploys our css to s3
   3. A `deployToS3Custom` step deploys our tokens to s3
   4. A `deployToS3Custom` step deploys our umd folder to s3
   5. An `addMannyfest` helper generates and deploys the `sherlock.json`
4. The `DeployToArtifactory` helper informs DeployTrack and the release register of deployment success/failure
5. The docs pipeline is triggered by a successful run of the deploy step.

### Test Deployments

This pipeline supports test deployments of our artifacts.

The CSS, UMD, and `tokens.scss` can be found in the `xui-docs-pipeline-test` S3 bucket, under the `/style` [folder](https://s3.console.aws.amazon.com/s3/buckets/xui-docs-pipeline-test?region=ap-southeast-2&prefix=style/&showversions=false).

The test XUI package can be found within the `xui-npm-test` artifactory [repo](https://artifactory.xero-support.com/xui-npm-test/xui/).

To test this package, you should install it via the direct URL, e.g.
`npm install https://artifactory.xero-support.com/xui-npm-test/xui/xero-xui-19.1.1.tgz`.

This enables us to install the test project under the same `@scope/name` as our real `@xero/xui` package, whilst still
being able to install our own dependencies which live in the main `npm-dev` artifactory repo.

## XUI Docs Pipeline

### Using the pipeline

#### Automatic releases

This pipeline will automatically be triggered at the end of a XUI library release. However, it can also be run independently.

#### Manual releases

You can trigger this pipeline manually to release changes to XUI's documentation site without running a XUI release. To do so, follow the steps below:

- Merge changes to be deployed to the `master` branch
  - Check that the version in `package.json` matches the version of the documentation you want to overwrite
- [Run the pipeline in TeamCity](https://teamcity1.inside.xero-support.com/project/Xui_Xui?mode=builds)
  - Running "Build XUI docs" will automatically trigger the other pipeline steps
- Merge `master` into `patch` once you have finished the release

### Pipeline overview

This pipeline is responsible for building and deploying XUI's documentation site to S3. When ran, it will do the following:

- Run `npm run docs:build`
  - This builds the XUI Guide, React docs, StoryBook, and the version selector in `dist/docs`
  - The XUI Guide, React docs, and StoryBook will be placed in a sub folder reflecting the version in `package.json`
- Deploy `dist/docs` to S3 using the TC S3 helper (this automatically records the deployment in Artifactory)

<img src="pipeline.png">
