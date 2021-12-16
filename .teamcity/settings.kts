import com.xero.teamcityhelpers.build.teamcity.ValidateTeamcityConfigs
import com.xero.teamcityhelpers.buildtype.github.addGithubStatusPublisher
import com.xero.teamcityhelpers.buildtype.trigger.addTeamCityTriggers
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import projects.XUIArtifacts
import projects.XUIDocs

version = "2020.2"

project {
  description = "Build configuration for XUI"

  params {
    // This makes it impossible to change the build settings through the UI
    param("teamcity.ui.settings.readOnly", "true")

    param("git.url", "https://github.dev.xero.com/UXE/xui")
    param("slack.deployment.channel", "uxe-pr")
    param("component.name", "XUI")
    param("component.modulename", "xui")
    param("component.uuid", "isy7E6ztp42dwGSig23qBP")
    param("component.directory", ".")
    param("component.owner", "UXE")
    param("component.owner_email", "uxengineering@xero.com")
    param("component.portfolio", "Platform Engineering")

    param("aws.region", "ap-southeast-2") // default region for builds, should be overridden for deployments
  }

  subProject(XUIArtifacts)
  subProject(XUIDocs)

  val validateTeamcity = ValidateTeamcityConfigs()
  validateTeamcity.addTeamCityTriggers()
  validateTeamcity.addGithubStatusPublisher()

  buildType(validateTeamcity)

  subProjectsOrder = listOf(XUIArtifacts, XUIDocs)
}
