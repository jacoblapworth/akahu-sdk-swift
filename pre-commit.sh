#!/bin/sh

# exit when any command fails
set -e

echo "running pre-commit hook"
lint-staged
node ./scripts/versions/versions
