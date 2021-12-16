package projects

import buildTypes.DeployXUI
import buildTypes.PRBuild
import buildTypes.VisRegTest
import com.xero.teamcityhelpers.build.npm.NpmBuild
import com.xero.teamcityhelpers.buildtype.yarn.addNpmLibraryArtifacts
import jetbrains.buildServer.configs.kotlin.v2019_2.Project
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.ScriptBuildStep
import com.xero.teamcityhelpers.build.report.Report
import com.xero.teamcityhelpers.project.addCoverageReport

object XUIArtifacts: Project({
  name = "XUI Artifacts"
  description = "Build configuration for XUI artifacts"

  params {
    param("component.dist_folder", "dist")
  }

  val buildXUI = NpmBuild {
    name = "Build XUI"
    addNpmLibraryArtifacts()
  }

  // NpmBuild only runs `npm run build` by default, so we must add our own pack step
  val packXUI = ScriptBuildStep {
    name = "Pack XUI"
    scriptContent = "npm pack"
  }

  buildXUI.steps.items.add(packXUI)

  val deployXUITest = DeployXUI(buildXUI, "Test") {
    id("DeployXUITest")
    params {
      param("aws.s3.account_id", "991343174383")
      param("aws.s3.role_name", "uxe-deploy-role")
      param("aws.s3.bucket.name", "xui-docs-pipeline-test")
      param("aws.region", "ap-southeast-2")
      param("artifactory.repo", "xui-npm-test")
    }
  }

//  val deployXUIProd = DeployXUI(buildXUI, "Prod") {
//    id("DeployXUIProd")
//
//    params {
//      param("aws.s3.account_id", "966283773129")
//      param("aws.s3.role_name", "xui-code-build-role-prod")
//      param("aws.s3.bucket.name", "xero-edge")
//      param("artifactory.repo", "npm-dev")
//      param("aws.region", "us-east-1")
//    }
//  }

  val documentStable = Report(buildXUI, deployXUITest)

  buildType(buildXUI)
  buildType(deployXUITest)
//  buildType(deployXUIProd)
  buildType(documentStable)

  buildTypesOrder = listOf(
    buildXUI,
    deployXUITest,
//    deployXUIProd,
    documentStable
  )

  buildType(PRBuild)
  buildType(VisRegTest)
  addCoverageReport()
})
