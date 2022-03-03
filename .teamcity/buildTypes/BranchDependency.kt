package buildTypes
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType

object BranchDependency : BuildType({
  name = "Branch dependency"
  id("BranchDependency")
})
