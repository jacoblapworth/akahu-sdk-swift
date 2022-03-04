package helpers

import com.xero.teamcityhelpers.buildtype.trigger.addFinishBuildTrigger
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.FinishBuildTrigger

// [addFinishBuildTrigger](https://github.dev.xero.com/PathToProduction/TeamcityHelpers/blob/master/src/main/java/com/xero/teamcityhelpers/buildtype/trigger/addFinishBuildTrigger.kt)
// will only work with deployments from the `main` branch by default, this build type adjusts that
// config so that all of the listed branches can be used
fun BuildType.addXUIBuildTriggers(buildType: BuildType, init: FinishBuildTrigger.() -> Unit = {}) {
  triggers.items.clear()
  addFinishBuildTrigger(buildType) {
    branchFilter = """
      +:<default>
      +:refs/heads/master
      +:refs/heads/breaking-changes
      +:refs/heads/minor
      +:refs/heads/patch
      +:refs/heads/*.x.x
      """.trimIndent()
    init()
  }
}
