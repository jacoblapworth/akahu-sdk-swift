package buildTypes
import com.xero.teamcityhelpers.buildtype.versioning.identifyFrontendBuild
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType

object BuildDocs : BuildType({
  name = "Build XUI docs"
  publishArtifacts = PublishMode.SUCCESSFUL
  artifactRules = "+:dist/docs => dist/docs"
  identifyFrontendBuild()

  params {
    param("component.dist_folder", "dist/docs")
    param("node.version", " ")
  }

  vcs {
    // Use the source code from the same VCS root that the Kotlin DSL came from
    root(DslContext.settingsRoot.id!!)
    cleanCheckout = true
  }

  requirements {
    exists("node.js.npm")
    exists("node.js.nvm")
  }

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
      name = "Remove package-lock.json file"
      scriptContent = "rm ./package-lock.json"
    }
    script {
      name = "Install dependencies"
      scriptContent = "npm install"
    }
    script {
      name = "Build XUI docs"
      scriptContent = "npm run docs:build"
    }
  }
})
