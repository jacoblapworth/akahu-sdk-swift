#!/usr/bin/env bash

# This script is called from TeamCity during a release to automatically update the CloudFront
# distribution (used to redirect xui.xero.com to xui.xero.com/x.x.x).

# Do not continue if a step fails
set -e

# 0) Configure Cloudfront Distribution and temp config file location
CLOUDFRONT_DISTRIBUTION_ID=$1
CLOUDFRONT_DISTRIBUTION_FILE="scripts/pipeline/aws-cf-distribution.json"

# 1) Get the current config, entirely, and put it in a file
aws cloudfront get-distribution --id $CLOUDFRONT_DISTRIBUTION_ID > $CLOUDFRONT_DISTRIBUTION_FILE

# 2) Extract the Etag from the current config (required to update the distribution)
Etag=`node scripts/pipeline/helpers/cloudfront/getEtag.js`

# 3) Update the LATESTVERSION header
node scripts/pipeline/helpers/cloudfront/updateVersion.js

# 4) Update the distribution with the new file
aws cloudfront update-distribution --id $CLOUDFRONT_DISTRIBUTION_ID \
    --distribution-config "file://${CLOUDFRONT_DISTRIBUTION_FILE}" \
    --if-match $Etag \
    > /dev/null

# 5) Clean up
rm -f $CLOUDFRONT_DISTRIBUTION_FILE
