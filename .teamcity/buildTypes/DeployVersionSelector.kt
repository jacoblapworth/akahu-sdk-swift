package buildTypes

import buildSteps.deployToS3Custom
import com.xero.kotlin.v2019_2.buildSteps.assumeRole
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script

class DeployVersionSelector(init: BuildType.() -> Unit): BuildType({
  name = "Build & Deploy Version Selector"

  init()

  steps {
    script {
      name = "Read Node version from .nvmrc"
      scriptContent = """
            read -r node_version < .nvmrc
            echo "Project Node version from .nvmrc is ${'$'}nvm_version"
            echo "##teamcity[setParameter name='node.version' value='${'$'}node_version']";
        """.trimIndent()
    }
    step {
      name = "Install Node"
      type = "jonnyzzz.nvm"
      param("version", "%node.version%")
    }
    script {
      name = "Install dependencies"
      scriptContent = "npm ci"
    }
    script {
      name = "Build version selector"
      scriptContent = "npm run docs:build:selector"
    }
    assumeRole {
      roleArn = "arn:aws:iam::%aws.account_id%:role/%aws.role_name%"
      region = "%aws.region%"
    }
    deployToS3Custom {
      source = "dist/docs/versionSelector.min.css"
      dest = "docs"
    }
    deployToS3Custom {
      source = "dist/docs/versionSelector.min.js"
      dest = "docs"
    }
  }
})
