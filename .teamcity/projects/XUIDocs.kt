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

  val deployToStaging = DeployToS3(BuildDocs, "staging") {
    name = "Staging – Deploy XUI docs"
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
    addFinishBuildTrigger(XUIArtifacts.buildTypes[1]) {
      successfulOnly = true
    }
  }

//  val deployToProd = DeployToS3(npmBuild,"production") {
//    manualDeploy = true
//    params {
//      param("aws.region", "")
//      param("aws.account_id", "")
//      param("aws.role_name", "")
//      param("aws.s3.bucket.name", "")
//      param("aws.s3.destination.folder", "product-directory/%component.deployment_environment%/%deployment.version%")
//      param("aws.s3.cp.parameters", "--cache-control max-age=300 --metadata-directive REPLACE")
//    }
//    addSnapshotDependencies(arrayOf(deployToStaging))
//  }

  buildType(BuildDocs)
  buildType(deployToStaging)
//  buildType(deployToProd)

  val documentStable = Report(BuildDocs, deployToStaging) {
    name = "Staging – Report deployment status"
  }

  buildType(documentStable)
})
