package buildTypes

import com.xero.kotlin.v2019_2.buildSteps.assumeRole
import com.xero.teamcityhelpers.buildtype.requireParam
import com.xero.teamcityhelpers.deploy.DeploymentBuild
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script

fun DeploymentBuild.addMannyFest() {
  requireParam("mannyfest.aws.assumed_role")
  requireParam("mannyfest.aws.region")
  requireParam("mannyfest.modulename")
  requireParam("mannyfest.aws.bucket.name")
  requireParam("mannyfest.s3.dest")

  deploymentSteps {
    assumeRole {
      roleArn = "%mannyfest.aws.assumed_role%"
      region = "%mannyfest.aws.region%"
    }
    step {
      name = "Install Node.js"
      type = "jonnyzzz.nvm"
      param("version", "%node.mannyfest.version%")
    }
    script {
      name = "Install Mannyfest"
      scriptContent = "npm install git+ssh://git@github.dev.xero.com/XeroJS/mannyfest.git"
    }
    script {
      name = "Run Mannyfest"
      scriptContent = "./node_modules/.bin/mannyfest --region %mannyfest.aws.region% --module %mannyfest.modulename% --bucket %mannyfest.aws.bucket.name% --dest %mannyfest.s3.dest% --preferMin --upload --override"
    }
  }

  return params{
    param("node.mannyfest.version","10")
  }
}
