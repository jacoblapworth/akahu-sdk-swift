const fs = require('fs');
const path = require('path');

// 1) Read the current XUI version and distribution config from disk
const distributionConfig = require('../../aws-cf-distribution.json').Distribution
  .DistributionConfig;
const currentVersion = process.env.npm_package_version;

if (!currentVersion) {
  throw new Error('XUI version could not be found');
}

// 2) Update the distribution config with the current XUI version
const originIndex = distributionConfig.Origins.Items.findIndex(
  origin => origin.Id === 'DefaultOrigin',
);
if (originIndex === -1) {
  throw new Error("Could not find origin 'DefaultOrigin'");
}

const latestVersionHeaderIndex = distributionConfig.Origins.Items[
  originIndex
].CustomHeaders.Items.findIndex(item => item.HeaderName === 'LATESTVERSION');

if (latestVersionHeaderIndex === -1) {
  throw new Error("Could not find header 'LATESTVERSION'");
}

distributionConfig.Origins.Items[originIndex].CustomHeaders.Items[
  latestVersionHeaderIndex
].HeaderValue = currentVersion;

// 3) Write the new distribution config back to disk
fs.writeFileSync(
  path.join('scripts', 'pipeline', 'aws-cf-distribution.json'),
  JSON.stringify(distributionConfig, null, 2),
  {
    encoding: 'utf8',
  },
);
