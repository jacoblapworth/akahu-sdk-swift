#!/bin/bash
# Parameters: $1=token, $2=merge commit SHA, $3=status, $4=deployer email)

curl -X POST -H "Authorization: Bearer $1" -d "kotahi_id=isy7E6ztp42dwGSig23qBP" -d "environment=prod" -d "commit=$2" -d "status=$3" -d "deployer=$4" -d "url=https://ap-southeast-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/xui-code-pipeline/view" https://deploytrack-stable.xero.dev/api/v1/deployments
