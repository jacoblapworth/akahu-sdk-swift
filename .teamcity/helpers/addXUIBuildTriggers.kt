package helpers

import com.xero.teamcityhelpers.buildtype.trigger.addFinishBuildTrigger
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.FinishBuildTrigger

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
