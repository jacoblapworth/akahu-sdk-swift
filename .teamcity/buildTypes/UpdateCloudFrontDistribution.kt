package buildTypes
import com.xero.kotlin.v2019_2.buildSteps.assumeRole
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType

open class UpdateCloudFrontDistribution(
  init: BuildType.() -> Unit = {}
): BuildType({
  name = "Update CloudFront distribution"

  // This init function ensures that the parameters defined in the closure are applied
  init()

  params {
    param("aws.account_id", "966283773129")
    param("aws.role_name", "xui-cloudfront-updater")
    param("aws.assumed_role","arn:aws:iam::%aws.account_id%:role/%aws.role_name%")
    param("aws.cloudfront_id", "E3BO2QUTYBTUOU")
    param("build.node.version", "")
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
    step {
      name = "load .nvmrc"
      type = "NvmMetaRunner"
    }
    step {
      name = "nvm install"
      type = "jonnyzzz.nvm"
      param("fromURL", "%nvm_path%")
      param("version", "%build.node.version%")
    }
    assumeRole {
      roleArn = "%aws.assumed_role%"
    }
    script {
      name = "Update CloudFront distribution"
      scriptContent = "npm run docs:pipeline:cloudfront %aws.cloudfront_id%"
    }
  }
})
