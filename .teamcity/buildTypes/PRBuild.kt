package buildTypes
import com.xero.teamcityhelpers.buildtype.addPullRequestSupport
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

object PRBuild : BuildType({
  name = "PR build + lint + test"
  description = "Build XUI and deploy to AWS for code review and approval"

  allowExternalStatus = true
  artifactRules = """
        dist => dist
        coverage => coverage
    """.trimIndent()

  addPullRequestSupport {
    triggers.items.clear()
    triggers {
      vcs {
        perCheckinTriggering = false
        groupCheckinsByCommitter = false
        branchFilter = "+:*"
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
      param("npm_commands", "ci -—prefer-offline")
    }
    step {
      name = "lint"
      type = "jonnyzzz.npm"
      param("npm_execution_args", "--no-color")
      param("npm_commands", "run lint")
    }
    step {
      name = "test"
      type = "jonnyzzz.node"
      param("node_file", "scripts/test/ci.js")
      param("node_execution_mode", "file")
    }
    script {
      name = "Manual Build"
      scriptContent = """
                node ./scripts/build/sass/kss.js
                node ./scripts/build/xui.js
                node ./scripts/build/styleguidist.js
                node ./scripts/build/storybook.js
                node ./scripts/build/kss.js
                node ./scripts/build/postcss/tokens.js
                node ./scripts/build/umd_webpack.js
                node ./scripts/build/serviceworker.js
            """.trimIndent()
    }
    step {
      type = "assumerolelinux"
      param("RoleArn", "%test_assumed_role%")
      param("SessionName", "teamcity-upload-artifacts")
    }
    script {
      name = "Deploy AWS"
      scriptContent = """
                env | grep AWS
                aws s3 sync dist s3://%test_s3_bucket_uri%/build/%build.vcs.number%/ --cache-control max-age=300 --exact-timestamps --delete || exit 1
            """.trimIndent()
    }
    script {
      name = "Report"
      scriptContent = """
                TEST_URL="https://xui.xero-test.com/build/%build.vcs.number%/docs/"

                PR_URL="https://github.dev.xero.com/%git.org%/%git.repo.name%/pull/%teamcity.build.branch%"

                PR_TITLE=${'$'}(curl -H "Authorization: token %github.token%" https://github.dev.xero.com/api/v3/repos/%git.org%/%git.repo.name%/pulls/%teamcity.build.branch% | jq -r '.title')

                curl -X POST -H 'Content-type: application/json' --data \
                "{\"text\":\":github: *${'$'}{PR_TITLE}* \n :negative-space:  :xui:  <${'$'}{TEST_URL}|XUI Guide>    :react:  <${'$'}{TEST_URL}react/|React Docs>    📚  <${'$'}{TEST_URL}storybook/|Storybook>    :github:  <${'$'}{PR_URL}|Pull Request>\"}" \
                %uxe.pr.webhook.url%

                echo "Docs now available at: ${'$'}{TEST_URL}"
            """.trimIndent()
    }
  }

  failureConditions {
    executionTimeoutMin = 120
  }

  requirements {
    exists("node.js")
    exists("node.js.npm")
    equals("aws.region", "ap-southeast-2")
  }
})
