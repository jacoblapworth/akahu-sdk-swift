package helpers

import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType

fun removeAgentRegionRequirement(build: BuildType) {
  build.requirements.items.removeIf { it.value == "%aws.region%" }
}
