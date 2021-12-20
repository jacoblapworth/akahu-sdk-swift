package buildTypes

import buildSteps.deployToS3Custom
import com.xero.kotlin.v2019_2.buildSteps.assumeRole
import com.xero.teamcityhelpers.buildtype.requireParam
import com.xero.teamcityhelpers.buildtype.trigger.addArtifactDependencies
import com.xero.teamcityhelpers.deploy.DeploymentBuild
import com.xero.teamcityhelpers.deploy.artifactory.DeployToArtifactory
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType

open class DeployXUI(
  releaseBuild: BuildType,
  deploymentEnv: String,
  init: DeploymentBuild.() -> Unit = {}
): DeployToArtifactory(releaseBuild, deploymentEnv, {
  name = "$deploymentEnv - Deploy XUI Artifacts"
  manualDeploy = true

  // This init function ensures that the parameters defined in the closure are applied
  init()

  // Pulls through the tarball and individual required files from the build step
  addArtifactDependencies(arrayOf(releaseBuild)) {
    artifactRules = """
        +:%xui.tarball%
        +:%component.name%-%deployment.version%.zip!/css => dist/css
        +:%component.name%-%deployment.version%.zip!/tokens/tokens.scss => dist/tokens/tokens.scss
        +:%component.name%-%deployment.version%.zip!/umd => dist/umd
      """.trimIndent()
  }

  // Required parameters for test or prod deployments, to be defined in the closure
  requireParam("aws.s3.account_id")
  requireParam("aws.s3.role_name")
  requireParam("aws.s3.bucket.name")
  requireParam("aws.region")
  requireParam("artifactory.repo")

  params {
    param("xui.tarball", "xero-%component.modulename%-%deployment.version%.tgz")

    // DeployToS3 parameters
    param("aws.s3.assumed_role","arn:aws:iam::%aws.s3.account_id%:role/%aws.s3.role_name%")
    param("aws.s3.cp.parameters", "")

    // DeployToArtifactory parameters
    param("artifactory.username", "xui_deployer")
    param("artifactory.target", "%artifactory.repo%/%component.modulename%/")
    param("artifactory.file.target","%artifactory.target%")
    param("artifactory.pattern", "%xui.tarball%")

    // addMannyfest parameters
    param("mannyfest.modulename", "XUI")
    param("mannyfest.s3.dest", "style/xui")
    param("mannyfest.aws.bucket.name", "%aws.s3.bucket.name%")
    param("mannyfest.aws.assumed_role", "%aws.s3.assumed_role%")
    param("mannyfest.aws.region", "%aws.region%")
  }

  // These steps occur in the middle of DeployToS3's 'deployment steps'
  // i.e. within the functional steps between DeployTrack and other path to prod commands
  deploymentSteps {
    assumeRole {
      roleArn = "%aws.s3.assumed_role%"
      region = "%aws.region%"
    }
    deployToS3Custom {
      source = "%component.dist_folder%/css"
      dest = "style/xui/%deployment.version%"
    }
    deployToS3Custom {
      source = "%component.dist_folder%/tokens/tokens.scss"
      dest = "style/xui-tokens/%deployment.version%"
    }
    deployToS3Custom {
      source = "%component.dist_folder%/umd"
      dest = "style/xui-umd/%deployment.version%"
    }
  }
  addMannyFest()
})
