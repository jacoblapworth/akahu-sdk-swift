import jetbrains.buildServer.configs.kotlin.v2019_2.*
import buildTypes.BuildDocs
import com.xero.teamcityhelpers.build.report.Report
import com.xero.teamcityhelpers.buildtype.trigger.addSnapshotDependencies
import com.xero.teamcityhelpers.deploy.s3.DeployToS3

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.
VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.
To debug settings scripts in command-line, run the
    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate
command and attach your debugger to the port 8000.
To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2020.2"

project {
  params {
    param("github.user", "%svc-comms-user-xui%")
    password("github.token", "%svc-comms-user-xui-access-token%")
    param("git.url", "https://github.dev.xero.com/UXE/xui")

    param("aws.region", "ap-southeast-2")

    // This makes it impossible to change the build settings through the UI
    param("teamcity.ui.settings.readOnly", "true")

    param("slack.deployment.channel", "uxe-pr")

    param("deploytrack.url", "https://deploytrack-stable.xero.dev/api/v1/deployments")

    // Artifactory params
    param("artifactory.username", "xui_docs_deployer")
    param("artifactory.target", "xui-docs-generic-common/xui-docs/")
    param("artifactory.file.target", "%artifactory.target%")
    param("artifactory.pattern", "*.tgz")

    // Kotahi params
    param("component.name", "xui")
    param("component.modulename", "xui")
    param("component.uuid", "isy7E6ztp42dwGSig23qBP")
    param("component.owner", "UXE")
    param("component.owner_email", "uxengineering@xero.com")
    param("component.portfolio", "Platform Engineering")
    param("component.dist_folder", "dist/docs")
    param("component.directory", ".")

    // DeployToArtifactory params
    param("deployment.user", "xui_docs_deployer")
  }

  val buildDocs = BuildDocs()

  val deployToStaging = DeployToS3(buildDocs, "staging") {
    name = "Staging – Deploy XUI docs"
    artifactRules = "+:dist/docs => xui-docs-build-%build.counter%.tgz"
    params {
      param("component.deployment_environment", "staging")

      param("release.artifact.rules", "+:%component.dist_folder% => %component.dist_folder%")

      // region and account id used in assume role before deploying
      param("aws.region", "ap-southeast-2")
      param("aws.account_id", "991343174383")
      param("aws.role_name", "uxe-deploy-role")
      param("aws.s3.bucket.name", "xui-docs-pipeline-test") // bucket name to deploy too (must be accessible by aws.account_id)
      param("aws.s3.destination.folder", "") // destination folder relative to the root
    }
    addSnapshotDependencies(arrayOf(buildDocs))
  }

//  val deployToProd = DeployToS3(npmBuild,"production") {
//    manualDeploy = true
//    params {
//      param("aws.region", "")
//      param("aws.account_id", "")
//      param("aws.s3.bucket.name", "")
//      param("aws.s3.destination.folder", "product-directory/%component.deployment_environment%/%deployment.version%")
//      param("aws.s3.cp.parameters", "--cache-control max-age=300 --metadata-directive REPLACE")
//    }
//    addSnapshotDependencies(arrayOf(deployToStaging))
//  }

  buildType(buildDocs)
  buildType(deployToStaging)

  val documentStable = Report(buildDocs, deployToStaging) {
    name = "Staging – Report deployment status"
  }

  buildType(documentStable)
}
