package buildSteps

import jetbrains.buildServer.configs.kotlin.v2019_2.BuildSteps
import com.xero.teamcityhelpers.buildstep.s3.DeployToS3Step

open class DeployToS3Custom() : DeployToS3Step() {
  var source = "%component.dist_folder%"
  var dest = "%aws.s3.destination.folder%"
  constructor(init: DeployToS3Custom.() -> Unit): this() {
    init()
    name = "Deploy to S3"
    scriptContent = """
      aws s3 cp $source s3://%aws.s3.bucket.name%/$dest --acl bucket-owner-full-control --recursive %aws.s3.cp.parameters% || exit 1
    """.trimIndent()
  }
}

fun BuildSteps.deployToS3Custom(init: DeployToS3Custom.() -> Unit): DeployToS3Custom {
  val result = DeployToS3Custom(init)
  step(result)
  return result
}
