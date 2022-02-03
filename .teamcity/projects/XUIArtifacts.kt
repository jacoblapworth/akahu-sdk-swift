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
import helpers.addXUIBuildTriggers
import helpers.removeAgentRegionRequirement

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

  val deployXUIProd = DeployXUI(buildXUI, "Prod") {
    id("DeployXUIProd")
    params {
      param("aws.s3.account_id", "966283773129")
      param("aws.s3.role_name", "xui-shipto-style")
      param("aws.s3.bucket.name", "xero-edge")
      param("aws.region", "us-east-1")
      param("artifactory.repo", "npm-dev")
    }
  }

  val documentStableTest = Report(buildXUI, deployXUITest) {
    addXUIBuildTriggers(deployXUITest)
  }
  val documentStableProd = Report(buildXUI, deployXUIProd) {
    addXUIBuildTriggers(deployXUIProd)
  }

  removeAgentRegionRequirement(deployXUIProd)
  removeAgentRegionRequirement(documentStableProd)

  buildType(buildXUI)
  buildType(deployXUITest)
  buildType(documentStableTest)
  buildType(deployXUIProd)
  buildType(documentStableProd)

  buildTypesOrder = listOf(
    buildXUI,
    deployXUITest,
    documentStableTest,
    deployXUIProd,
    documentStableProd
  )

  buildType(PRBuild)
  buildType(VisRegTest)
  addCoverageReport()
})
