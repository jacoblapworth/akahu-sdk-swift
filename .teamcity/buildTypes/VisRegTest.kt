package buildTypes

import com.xero.teamcityhelpers.buildtype.addPullRequestSupport
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

object VisRegTest : BuildType({
  id("PrBuildVisualRegressions")
  name = "Visual regression tests"
  description = "Run visual regression tests and deploy report to AWS for code review and approval"

  allowExternalStatus = true
  artifactRules = ".visual-testing => .visual-testing"

  addPullRequestSupport {
    triggers.items.clear()
    triggers {
      vcs {
        perCheckinTriggering = false
        groupCheckinsByCommitter = false
        branchFilter = """
          +:*
          -:<default>
          -:refs/heads/master
          -:refs/heads/patch
          -:refs/heads/minor
          -:refs/heads/breaking-changes
        """.trimIndent()
      }
    }
  }

  params {
    param("git.repo.name", "xui")
    param("git.org", "UXE")
    param("github.token", "%svc-comms-user-xui-access-token%")

    param("aws.account_id", "991343174383")
    param("aws.role_name", "xui-code-build-role-test")
    param("test_s3_bucket_uri", "xero-xui-test")
    param("test_assumed_role", "arn:aws:iam::%aws.account_id%:role/%aws.role_name%")
    param("build.node.version", "")
  }

  vcs {
    root(DslContext.settingsRoot.id!!)

    checkoutMode = CheckoutMode.ON_SERVER
    cleanCheckout = true
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
    step {
      name = "install"
      type = "jonnyzzz.npm"
      param("npm_execution_args", "--no-color")
      param("npm_commands", "ci --prefer-offline")
    }
    step {
      name = "test:visual"
      type = "jonnyzzz.npm"
      param("npm_commands", "run test:visual")
    }
    step {
      type = "assumerolelinux"
      executionMode = BuildStep.ExecutionMode.RUN_ON_FAILURE
      param("RoleArn", "%test_assumed_role%")
      param("SessionName", "teamcity-upload-artifacts")
    }
    script {
      name = "Deploy AWS"
      executionMode = BuildStep.ExecutionMode.RUN_ON_FAILURE
      scriptContent = """
                env | grep AWS
                aws s3 sync .visual-testing s3://%test_s3_bucket_uri%/build/%build.vcs.number%/visual-testing/ --cache-control max-age=300 --exact-timestamps --delete || exit 1
            """.trimIndent()
    }
    script {
      name = "Report"
      executionMode = BuildStep.ExecutionMode.RUN_ON_FAILURE
      scriptContent = """
                URL="https://xui.xero-test.com/build/%build.vcs.number%/visual-testing/web-report/"

                PR_URL="https://github.dev.xero.com/%git.org%/%git.repo.name%/pull/%teamcity.build.branch%"

                PR_TITLE=${'$'}(curl -H "Authorization: token %github.token%" https://github.dev.xero.com/api/v3/repos/%git.org%/%git.repo.name%/pulls/%teamcity.build.branch% | jq -r '.title')

                curl -X POST -H 'Content-type: application/json' --data \
                "{\"text\":\":github: *${'$'}{PR_TITLE}* \n :negative-space:  :chrome:  <${'$'}{URL}|Visual regression report>    :github:  <${'$'}{PR_URL}|Pull Request>\"}" \
                %uxe.pr.webhook.url%

                echo "Visual regression report now available at: ${'$'}{URL}"
            """.trimIndent()
    }
  }

  requirements {
    exists("node.js.npm")
    equals("aws.region", "ap-southeast-2")
    exists("node.js")
  }
})
