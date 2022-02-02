package projects

import buildTypes.BuildDocs
import com.xero.teamcityhelpers.build.report.Report
import com.xero.teamcityhelpers.buildtype.trigger.addSnapshotDependencies
import com.xero.teamcityhelpers.buildtype.trigger.addFinishBuildTrigger
import com.xero.teamcityhelpers.deploy.s3.DeployToS3
import jetbrains.buildServer.configs.kotlin.v2019_2.Project

object XUIDocs:  Project({
  name = "XUI Docs"
  description = "Build configuration for XUI Docs"

  params {
    param("github.user", "%svc-comms-user-xui%")
    password("github.token", "%svc-comms-user-xui-access-token%")
    param("aws.region", "ap-southeast-2")
    param("deploytrack.url", "https://deploytrack-stable.xero.dev/api/v1/deployments")

    // Artifactory params
    param("artifactory.username", "xui_docs_deployer")
    param("artifactory.target", "xui-docs-generic-common/xui-docs/")
    param("artifactory.file.target", "%artifactory.target%")
    param("artifactory.pattern", "*.tgz")

    // Kotahi params
    param("component.dist_folder", "dist/docs")

    // DeployToArtifactory params
    param("deployment.user", "xui_docs_deployer")
  }

  val deployToTest = DeployToS3(BuildDocs, "Test") {
    name = "Test – Deploy XUI docs"
    artifactRules = "+:dist/docs => xui-docs-build-%build.counter%.tgz"
    manualDeploy = true
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
    addSnapshotDependencies(arrayOf(BuildDocs))
    // This is a dependency upon deployXUITest to automatically trigger the docs deployment
    addFinishBuildTrigger(XUIArtifacts.buildTypes.first { it.id.toString().contains("DeployXUITest") }) {
      successfulOnly = true
    }
  }

  val deployToProd = DeployToS3(BuildDocs, "Prod") {
    name = "Prod – Deploy XUI docs"
    artifactRules = "+:dist/docs => xui-docs-build-%build.counter%.tgz"
    manualDeploy = true
    params {
      param("component.deployment_environment", "prod")

      param("release.artifact.rules", "+:%component.dist_folder% => %component.dist_folder%")

      param("aws.region", "us-east-1")
      param("aws.account_id", "510694909772")
      param("aws.role_name", "xui-shipto-docs")
      param("aws.s3.bucket.name", "xero-xui")
      param("aws.s3.destination.folder", "")
    }
    addSnapshotDependencies(arrayOf(BuildDocs))
    // This is a dependency upon deployXUIProd to automatically trigger the docs deployment
    addFinishBuildTrigger(XUIArtifacts.buildTypes.first { it.id.toString().contains("DeployXUIProd") }) {
      successfulOnly = true
    }
  }

  val documentStableTest = Report(BuildDocs, deployToTest)
  val documentStableProd = Report(BuildDocs, deployToProd)

  deployToProd.requirements.items.removeIf { it.value == "%aws.region%" }
  documentStableProd.requirements.items.removeIf { it.value == "%aws.region%" }

  buildType(BuildDocs)
  buildType(deployToTest)
  buildType(deployToProd)

  buildType(documentStableTest)
  buildType(documentStableProd)
})
