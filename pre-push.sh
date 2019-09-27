#!/bin/sh

# exit when any command fails
set -e

echo "running pre-push hook"
npm run test
