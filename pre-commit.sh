#!/bin/sh
echo "running pre-commit hook"
lint-staged
node ./scripts/versions/versions
